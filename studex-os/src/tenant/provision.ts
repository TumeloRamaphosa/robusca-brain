import { sql } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { apiKeys, tenantRoutines, tenants } from "../db/schema.js";
import type * as schema from "../db/schema.js";
import type { SandboxProvider } from "../adapters/sandbox.js";
import { OpenClawGateway } from "../adapters/gateway.js";
import { loadCatalogue, renderRoutine, routinesForPlan, type Plan } from "../routines/catalogue.js";
import { issueKey } from "./keys.js";
import { record } from "../ledger/index.js";

type Db = NodePgDatabase<typeof schema>;

export interface ProvisionInput {
  name: string;
  slug: string;
  plan: Plan;
  timezone: string;
  channel: "whatsapp" | "slack" | "discord";
  channelRef?: string;
  dataRegion?: string;
}

export interface ProvisionResult {
  tenantId: string;
  ghostSchema: string;
  /** Shown once. Hand over securely, never by email. */
  workspaceKey: string;
  volumeId: string;
  snapshotId: string;
  gatewayUrl: string;
  routinesRegistered: number;
}

const CREDIT_ALLOWANCE: Record<Plan, number> = {
  day_pass: 500,
  ghost: 1_000,
  standard: 4_000,
  company_builder: 10_000,
  business: 25_000,
  enterprise: 60_000,
};

const AGENT_DOCKERFILE = `FROM ghcr.io/openhands/agent-server:latest
RUN pip install --no-cache-dir httpx pyyaml python-dateutil beautifulsoup4
WORKDIR /workspace
`;

/**
 * Stand up one tenant end to end.
 *
 * Ordered so that a failure leaves as little orphaned as possible: cheap
 * database rows first, billable vendor objects last. Anything created before
 * the failure point is recorded, so cleanup is a query rather than a hunt.
 */
export async function provisionTenant(
  db: Db,
  sandbox: SandboxProvider,
  input: ProvisionInput,
  deps: {
    catalogueDir: string;
    gatewayFor: (slug: string) => Promise<{ url: string; app: string; token: string }>;
  },
): Promise<ProvisionResult> {
  assertSlug(input.slug);
  assertTimezone(input.timezone);

  const ghostSchema = `ghost_${input.slug}`;

  // 1. Registry row.
  const inserted = await db
    .insert(tenants)
    .values({
      slug: input.slug,
      name: input.name,
      plan: input.plan,
      status: "provisioning",
      timezone: input.timezone,
      dataRegion: input.dataRegion ?? "eu-central",
      ghostSchema,
      channel: input.channel,
      channelRef: input.channelRef ?? null,
      creditAllowance: CREDIT_ALLOWANCE[input.plan],
    })
    .returning();

  const tenant = inserted[0];
  if (!tenant) throw new Error(`failed to create tenant row for "${input.slug}"`);

  // 2. Ghost schema. Schema-per-tenant, not a tenant_id column — a forgotten
  //    WHERE clause on a memory product is a cross-client leak, and schema
  //    separation makes that mistake structurally harder to make.
  await db.execute(sql.raw(`CREATE SCHEMA IF NOT EXISTS "${ghostSchema}"`));
  await createGhostTables(db, ghostSchema);

  // 3. Workspace key. Returned once, never recoverable.
  const key = await issueKey(input.slug);
  await db.insert(apiKeys).values({
    tenantId: tenant.id,
    prefix: key.prefix,
    hash: key.hash,
    scopes: ["ghost:read", "ghost:write", "runs:read"],
  });

  // 4. Daytona objects: persistent volume, pre-baked snapshot.
  const volumeId = await sandbox.createVolume(input.slug, 20);
  const snapshotId = await sandbox.createSnapshot(input.slug, AGENT_DOCKERFILE);

  // 5. Gateway. One per tenant, so operator.admin is scoped to one customer.
  const gateway = await deps.gatewayFor(input.slug);
  const client = new OpenClawGateway(gateway.url, gateway.token);

  await db
    .update(tenants)
    .set({
      sandboxVolumeId: volumeId,
      sandboxSnapshotId: snapshotId,
      gatewayApp: gateway.app,
      gatewayUrl: gateway.url,
    })
    .where(sql`${tenants.id} = ${tenant.id}`);

  // 6. Routines for this plan.
  const catalogue = loadCatalogue(deps.catalogueDir);
  const applicable = routinesForPlan(catalogue, input.plan);

  for (const routine of applicable) {
    const rendered = renderRoutine(routine, {
      tenantSlug: input.slug,
      timezone: input.timezone,
    });

    const automationId = await client.addAutomation({
      externalId: `studex-${routine.id}`,
      schedule:
        rendered.schedule.kind === "cron"
          ? { kind: "cron", expr: rendered.schedule.expr, tz: input.timezone }
          : { kind: "every", expr: rendered.schedule.expr },
      session: rendered.session,
      prompt: rendered.prompt,
      delivery: { channel: rendered.delivery.channel, mode: rendered.delivery.mode },
    });

    await db.insert(tenantRoutines).values({
      tenantId: tenant.id,
      routineId: routine.id,
      version: routine.version,
      automationId,
      scheduleExpr: rendered.schedule.expr,
    });
  }

  await db
    .update(tenants)
    .set({ status: "active", updatedAt: new Date() })
    .where(sql`${tenants.id} = ${tenant.id}`);

  await record(db, {
    tenantId: tenant.id,
    kind: "tenant.provisioned",
    actor: "system",
    summary: `${input.name} provisioned on ${input.plan}`,
    detail: {
      plan: input.plan,
      timezone: input.timezone,
      routines: applicable.map((r) => r.id),
      region: input.dataRegion ?? "eu-central",
    },
  });

  return {
    tenantId: tenant.id,
    ghostSchema,
    workspaceKey: key.secret,
    volumeId,
    snapshotId,
    gatewayUrl: gateway.url,
    routinesRegistered: applicable.length,
  };
}

/** The Business Ghost. One set of these per tenant, in the tenant's schema. */
async function createGhostTables(db: Db, schemaName: string): Promise<void> {
  await db.execute(
    sql.raw(`
    CREATE TABLE IF NOT EXISTS "${schemaName}".documents (
      id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      title        text NOT NULL,
      source       text NOT NULL,
      source_ref   text,
      content      text NOT NULL,
      embedding    vector(1536),
      valid_until  date,
      ingested_at  timestamptz NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "${schemaName}".decisions (
      id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      summary     text NOT NULL,
      context     text,
      decided_at  date,
      decided_by  text,
      supersedes  uuid REFERENCES "${schemaName}".decisions(id),
      source_ref  text,
      created_at  timestamptz NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "${schemaName}".opportunities (
      id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      kind          text NOT NULL,
      title         text NOT NULL,
      counterparty  text,
      value_zar     bigint,
      closes_on     date,
      status        text NOT NULL DEFAULT 'open',
      source_url    text,
      last_contact  date,
      created_at    timestamptz NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS "${schemaName}".facts (
      id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      key         text NOT NULL,
      value       text NOT NULL,
      source_ref  text,
      observed_at timestamptz NOT NULL DEFAULT now()
    );

    CREATE INDEX IF NOT EXISTS documents_valid_until_idx
      ON "${schemaName}".documents (valid_until)
      WHERE valid_until IS NOT NULL;
    CREATE INDEX IF NOT EXISTS opportunities_status_idx
      ON "${schemaName}".opportunities (status, closes_on);
    CREATE INDEX IF NOT EXISTS facts_key_idx ON "${schemaName}".facts (key);
  `),
  );
}

function assertSlug(slug: string): void {
  if (!/^[a-z][a-z0-9]{1,20}$/.test(slug)) {
    throw new Error(
      `invalid slug "${slug}": lowercase letters and digits, starting with a letter, 2-21 chars`,
    );
  }
}

/**
 * Timezone must be explicit. OpenClaw defaults to UTC when --tz is omitted,
 * and a morning brief landing two hours off is a bad first impression.
 */
function assertTimezone(tz: string): void {
  try {
    new Intl.DateTimeFormat("en", { timeZone: tz });
  } catch {
    throw new Error(`invalid IANA timezone "${tz}" (e.g. Africa/Johannesburg)`);
  }
}

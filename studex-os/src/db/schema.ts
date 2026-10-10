import { relations, sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

/**
 * Control plane schema.
 *
 * This is the `control` schema only — registry, keys, routines, runs, ledger.
 * Each tenant's Business Ghost lives in its own Postgres schema
 * (`ghost_<tenant_slug>`), created at provisioning time. Tenant memory is
 * deliberately not modelled here: schema separation is what stops a forgotten
 * WHERE clause becoming a cross-client leak.
 */

export const planEnum = pgEnum("plan", [
  "day_pass",
  "ghost",
  "standard",
  "company_builder",
  "business",
  "enterprise",
]);

export const tenantStatusEnum = pgEnum("tenant_status", [
  "provisioning",
  "active",
  "suspended",
  "closed",
]);

export const channelEnum = pgEnum("channel", ["whatsapp", "slack", "discord"]);

export const runStatusEnum = pgEnum("run_status", [
  "queued",
  "running",
  "succeeded",
  "failed",
  "skipped",
]);

/** Every ledger entry is one of these. Append-only, never updated. */
export const ledgerKindEnum = pgEnum("ledger_kind", [
  "tenant.provisioned",
  "tenant.suspended",
  "key.issued",
  "key.rotated",
  "key.revoked",
  "routine.registered",
  "routine.removed",
  "run.started",
  "run.finished",
  "sandbox.created",
  "sandbox.destroyed",
  "credential.granted",
  "credential.revoked",
  "support.access.granted",
  "support.access.expired",
  "credits.consumed",
  "credits.topped_up",
  "deliverable.produced",
]);

export const tenants = pgTable(
  "tenants",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    /** URL/schema-safe short name, e.g. "xyz". Immutable once set. */
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    plan: planEnum("plan").notNull(),
    status: tenantStatusEnum("status").notNull().default("provisioning"),

    /** IANA zone. Never default this silently — routines inherit it. */
    timezone: text("timezone").notNull(),
    /** Where the tenant's records live. Execution region may differ. */
    dataRegion: text("data_region").notNull().default("eu-central"),

    /** Postgres schema holding this tenant's Ghost. */
    ghostSchema: text("ghost_schema").notNull(),

    channel: channelEnum("channel").notNull(),
    /** Phone number / workspace id / guild id depending on channel. */
    channelRef: text("channel_ref"),

    /** OpenClaw Gateway (one per tenant) — Fly app name and base URL. */
    gatewayApp: text("gateway_app"),
    gatewayUrl: text("gateway_url"),

    /** Daytona objects. */
    sandboxSnapshotId: text("sandbox_snapshot_id"),
    sandboxVolumeId: text("sandbox_volume_id"),

    /** Included monthly credit allowance for the plan, in credits. */
    creditAllowance: integer("credit_allowance").notNull().default(0),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => ({
    slugIdx: uniqueIndex("tenants_slug_idx").on(t.slug),
    statusIdx: index("tenants_status_idx").on(t.status),
  }),
);

export const apiKeys = pgTable(
  "api_keys",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),

    /** Display only: "sk_studex_live_XYZ_a41c…". Never the secret. */
    prefix: text("prefix").notNull(),
    /** Argon2/scrypt hash of the full key. The key itself is shown once. */
    hash: text("hash").notNull(),

    scopes: text("scopes").array().notNull().default(sql`ARRAY[]::text[]`),
    lastUsedAt: timestamp("last_used_at", { withTimezone: true }),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => ({
    tenantIdx: index("api_keys_tenant_idx").on(t.tenantId),
    prefixIdx: uniqueIndex("api_keys_prefix_idx").on(t.prefix),
  }),
);

/**
 * A routine registered against a tenant's Gateway. The canonical definition
 * lives in routines/*.yaml; this records the instantiation and lets us detect
 * drift when the catalogue version moves on.
 */
export const tenantRoutines = pgTable(
  "tenant_routines",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),

    routineId: text("routine_id").notNull(),
    /** Catalogue version at registration. Compare to detect drift. */
    version: integer("version").notNull(),
    /** Automation id returned by the tenant's OpenClaw Gateway. */
    automationId: text("automation_id"),

    enabled: boolean("enabled").notNull().default(true),
    /** Resolved schedule, after tenant timezone is applied. */
    scheduleExpr: text("schedule_expr").notNull(),

    lastRunAt: timestamp("last_run_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => ({
    tenantRoutineIdx: uniqueIndex("tenant_routines_unique_idx").on(
      t.tenantId,
      t.routineId,
    ),
  }),
);

export const runs = pgTable(
  "runs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),
    routineId: text("routine_id"),

    status: runStatusEnum("status").notNull().default("queued"),
    /** Daytona sandbox id, when the run used one. */
    sandboxId: text("sandbox_id"),

    startedAt: timestamp("started_at", { withTimezone: true }),
    finishedAt: timestamp("finished_at", { withTimezone: true }),
    durationMs: integer("duration_ms"),

    creditsConsumed: integer("credits_consumed").notNull().default(0),
    /** True when the routine ran and had nothing to report. */
    suppressed: boolean("suppressed").notNull().default(false),
    error: text("error"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => ({
    tenantIdx: index("runs_tenant_idx").on(t.tenantId, t.createdAt),
    statusIdx: index("runs_status_idx").on(t.status),
  }),
);

/**
 * Append-only. No UPDATE, no DELETE — enforce with a DB grant, not convention.
 * This table is the audit claim; if it can be edited it proves nothing.
 */
export const ledger = pgTable(
  "ledger",
  {
    id: bigint("id", { mode: "bigint" }).primaryKey().generatedAlwaysAsIdentity(),
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => tenants.id, { onDelete: "restrict" }),

    kind: ledgerKindEnum("kind").notNull(),
    /** Who caused it: "system", "agent:<name>", "user:<id>", "studex:<staff>". */
    actor: text("actor").notNull(),
    runId: uuid("run_id").references(() => runs.id),

    /** Human-readable one-liner. Shown in the client's Friday report. */
    summary: text("summary").notNull(),
    /** Structured detail. Never put secrets here. */
    detail: jsonb("detail").$type<Record<string, unknown>>(),

    creditsDelta: integer("credits_delta").notNull().default(0),
    /** Cents, ZAR. Our cost, not the client's price. */
    costZarCents: integer("cost_zar_cents").notNull().default(0),

    at: timestamp("at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    tenantIdx: index("ledger_tenant_idx").on(t.tenantId, t.at),
    kindIdx: index("ledger_kind_idx").on(t.kind),
  }),
);

/**
 * Time-boxed grants for a human at Studex to access a tenant's data.
 * Every grant is written to the ledger and visible to the client — that is the
 * point. "Can your staff read our data?" becomes: only if you grant it, only
 * for as long as you grant it, and you will see it in your log.
 */
export const supportGrants = pgTable("support_grants", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id")
    .notNull()
    .references(() => tenants.id, { onDelete: "cascade" }),

  grantedTo: text("granted_to").notNull(),
  reason: text("reason").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  revokedAt: timestamp("revoked_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const tenantsRelations = relations(tenants, ({ many }) => ({
  keys: many(apiKeys),
  routines: many(tenantRoutines),
  runs: many(runs),
  ledgerEntries: many(ledger),
}));

export const runsRelations = relations(runs, ({ one }) => ({
  tenant: one(tenants, { fields: [runs.tenantId], references: [tenants.id] }),
}));

export type Tenant = typeof tenants.$inferSelect;
export type NewTenant = typeof tenants.$inferInsert;
export type Run = typeof runs.$inferSelect;
export type LedgerEntry = typeof ledger.$inferSelect;

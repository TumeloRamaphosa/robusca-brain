import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { and, desc, eq, gte } from "drizzle-orm";
import { ledger } from "../db/schema.js";
import type * as schema from "../db/schema.js";

type Db = NodePgDatabase<typeof schema>;
type LedgerKind = (typeof ledger.kind.enumValues)[number];

export interface LedgerWrite {
  tenantId: string;
  kind: LedgerKind;
  actor: string;
  summary: string;
  detail?: Record<string, unknown>;
  runId?: string;
  creditsDelta?: number;
  costZarCents?: number;
}

/**
 * Append to the ledger. There is deliberately no update or delete here — the
 * ledger is the audit claim, and a log that can be edited proves nothing.
 * Enforce it at the database too: the application role should hold INSERT and
 * SELECT on this table and nothing else.
 */
export async function record(db: Db, entry: LedgerWrite): Promise<void> {
  await db.insert(ledger).values({
    tenantId: entry.tenantId,
    kind: entry.kind,
    actor: entry.actor,
    summary: entry.summary,
    detail: entry.detail ?? null,
    runId: entry.runId ?? null,
    creditsDelta: entry.creditsDelta ?? 0,
    costZarCents: entry.costZarCents ?? 0,
  });
}

/** Entries since a date, newest first. Backs the Friday client report. */
export async function since(db: Db, tenantId: string, from: Date) {
  return db
    .select()
    .from(ledger)
    .where(and(eq(ledger.tenantId, tenantId), gte(ledger.at, from)))
    .orderBy(desc(ledger.at));
}

export interface PeriodSummary {
  creditsConsumed: number;
  costZarCents: number;
  entryCount: number;
  byKind: Record<string, number>;
}

export async function summarise(
  db: Db,
  tenantId: string,
  from: Date,
): Promise<PeriodSummary> {
  const entries = await since(db, tenantId, from);

  const byKind: Record<string, number> = {};
  let creditsConsumed = 0;
  let costZarCents = 0;

  for (const e of entries) {
    byKind[e.kind] = (byKind[e.kind] ?? 0) + 1;
    // creditsDelta is negative for consumption, positive for top-ups.
    if (e.creditsDelta < 0) creditsConsumed += -e.creditsDelta;
    costZarCents += e.costZarCents;
  }

  return { creditsConsumed, costZarCents, entryCount: entries.length, byKind };
}

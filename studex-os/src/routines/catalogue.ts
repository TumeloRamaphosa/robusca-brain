import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import { z } from "zod";

/**
 * The routine catalogue.
 *
 * A routine is a versioned spec in routines/*.yaml, not a hand-typed CLI
 * command. Write once, deploy to every tenant on the right tier — that is what
 * turns delivery labour into a product.
 */

export const planSchema = z.enum([
  "day_pass",
  "ghost",
  "standard",
  "company_builder",
  "business",
  "enterprise",
]);

export const routineSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, "id must be kebab-case"),
  name: z.string(),
  version: z.number().int().positive(),
  applies_to: z.array(planSchema).nonempty(),

  schedule: z.object({
    kind: z.enum(["cron", "every"]),
    expr: z.string(),
  }),

  session: z.string(),

  delivery: z.object({
    channel: z.string(),
    mode: z.enum(["announce", "silent"]),
    /**
     * When true, a run that produces nothing sends nothing. A routine posting
     * "no new matches" three times a day trains the client to ignore the
     * channel, and once they ignore it they stop seeing the product work.
     */
    suppress_if_empty: z.boolean(),
  }),

  credits_estimate: z.number().int().nonnegative(),
  prompt: z.string().min(50),
});

export type Routine = z.infer<typeof routineSchema>;
export type Plan = z.infer<typeof planSchema>;

export function loadCatalogue(dir: string): Routine[] {
  const files = readdirSync(dir).filter((f) => f.endsWith(".yaml"));
  const routines: Routine[] = [];
  const seen = new Set<string>();

  for (const file of files) {
    const raw = parse(readFileSync(join(dir, file), "utf8"));
    const parsed = routineSchema.safeParse(raw);

    if (!parsed.success) {
      throw new Error(
        `${file} is not a valid routine:\n${parsed.error.issues
          .map((i) => `  ${i.path.join(".")}: ${i.message}`)
          .join("\n")}`,
      );
    }

    if (seen.has(parsed.data.id)) {
      throw new Error(`duplicate routine id "${parsed.data.id}" in ${file}`);
    }
    seen.add(parsed.data.id);
    routines.push(parsed.data);
  }

  return routines.sort((a, b) => a.id.localeCompare(b.id));
}

export function routinesForPlan(catalogue: Routine[], plan: Plan): Routine[] {
  return catalogue.filter((r) => r.applies_to.includes(plan));
}

/** Total estimated daily credit burn, for sanity-checking a plan's allowance. */
export function estimateDailyCredits(routines: Routine[]): number {
  return routines.reduce((total, r) => total + r.credits_estimate * runsPerDay(r), 0);
}

function runsPerDay(routine: Routine): number {
  const { kind, expr } = routine.schedule;

  if (kind === "every") {
    const match = /^(\d+)([mhd])$/.exec(expr.trim());
    if (!match) return 1;
    const minutes =
      Number(match[1]) * (match[2] === "m" ? 1 : match[2] === "h" ? 60 : 1440);
    return minutes > 0 ? 1440 / minutes : 1;
  }

  // Cron: count the hour field's expansion, then scale by day-of-week.
  const fields = expr.trim().split(/\s+/);
  const hour = fields[1];
  const dow = fields[4];
  if (hour === undefined || dow === undefined) return 1;

  const perDay = countCronField(hour, 24);
  const daysPerWeek = dow === "*" ? 7 : countCronField(dow, 7);
  return (perDay * daysPerWeek) / 7;
}

function countCronField(field: string, range: number): number {
  if (field === "*") return range;
  if (field.startsWith("*/")) {
    const step = Number(field.slice(2));
    return step > 0 ? Math.ceil(range / step) : range;
  }
  return field.split(",").length;
}

/**
 * Substitute tenant values into a routine. Kept explicit rather than using a
 * template engine — the set of variables is small and should stay that way.
 */
export function renderRoutine(
  routine: Routine,
  vars: { tenantSlug: string; timezone: string; today?: string },
): Routine {
  const map: Record<string, string> = {
    tenant_slug: vars.tenantSlug,
    timezone: vars.timezone,
    today: vars.today ?? new Date().toISOString().slice(0, 10),
  };

  const substitute = (s: string): string =>
    s.replace(/\{\{(\w+)\}\}/g, (_whole, key: string) => {
      const value = map[key];
      if (value === undefined) {
        throw new Error(`unknown template variable {{${key}}}`);
      }
      return value;
    });

  return {
    ...routine,
    session: substitute(routine.session),
    prompt: substitute(routine.prompt),
  };
}

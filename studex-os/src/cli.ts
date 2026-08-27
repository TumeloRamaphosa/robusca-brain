#!/usr/bin/env node
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  estimateDailyCredits,
  loadCatalogue,
  routinesForPlan,
  type Plan,
} from "./routines/catalogue.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const CATALOGUE_DIR = join(HERE, "..", "routines");

const USAGE = `studex — Studex OS control plane

  studex routines list [--plan <plan>]   list the catalogue
  studex routines check                  validate every routine spec
  studex routines budget <plan>          estimated daily credit burn
  studex tenant create --name <n> --slug <s> --plan <p> --tz <zone> \\
                       --channel <whatsapp|slack|discord> [--msisdn <n>]

plans: day_pass ghost standard company_builder business enterprise
`;

function arg(argv: string[], flag: string): string | undefined {
  const i = argv.indexOf(flag);
  return i === -1 ? undefined : argv[i + 1];
}

async function main(): Promise<number> {
  const [group, command, ...rest] = process.argv.slice(2);

  if (!group || group === "--help" || group === "-h") {
    process.stdout.write(USAGE);
    return 0;
  }

  if (group === "routines") {
    const catalogue = loadCatalogue(CATALOGUE_DIR);

    if (command === "check") {
      process.stdout.write(`${catalogue.length} routines, all valid\n`);
      for (const r of catalogue) {
        process.stdout.write(
          `  ${r.id.padEnd(22)} v${r.version}  ${r.schedule.expr.padEnd(16)} ${r.applies_to.join(",")}\n`,
        );
      }
      return 0;
    }

    if (command === "list") {
      const plan = arg(rest, "--plan") as Plan | undefined;
      const list = plan ? routinesForPlan(catalogue, plan) : catalogue;
      for (const r of list) {
        process.stdout.write(`${r.id.padEnd(22)} ${r.name}\n`);
      }
      return 0;
    }

    if (command === "budget") {
      const plan = rest[0] as Plan | undefined;
      if (!plan) {
        process.stderr.write("usage: studex routines budget <plan>\n");
        return 1;
      }
      const list = routinesForPlan(catalogue, plan);
      const daily = estimateDailyCredits(list);
      process.stdout.write(
        `${plan}: ${list.length} routines\n` +
          `  ~${Math.round(daily)} credits/day\n` +
          `  ~${Math.round(daily * 30)} credits/month (R${((daily * 30 * 0.2)).toFixed(0)} at R0.20/credit)\n`,
      );
      return 0;
    }
  }

  if (group === "tenant" && command === "create") {
    // Provisioning touches billable vendor resources, so the CLI refuses to
    // guess. Every field is explicit or it does not run.
    const required = ["--name", "--slug", "--plan", "--tz", "--channel"] as const;
    const missing = required.filter((f) => !arg(rest, f));
    if (missing.length) {
      process.stderr.write(`missing: ${missing.join(" ")}\n\n${USAGE}`);
      return 1;
    }

    process.stdout.write(
      `Would provision:\n` +
        `  name     ${arg(rest, "--name")}\n` +
        `  slug     ${arg(rest, "--slug")}\n` +
        `  plan     ${arg(rest, "--plan")}\n` +
        `  timezone ${arg(rest, "--tz")}\n` +
        `  channel  ${arg(rest, "--channel")} ${arg(rest, "--msisdn") ?? ""}\n\n` +
        `Not wired to live credentials yet. Set DATABASE_URL, DAYTONA_API_KEY\n` +
        `and FLY_API_TOKEN, then call provisionTenant() from src/tenant/provision.ts.\n`,
    );
    return 0;
  }

  process.stderr.write(USAGE);
  return 1;
}

main()
  .then((code) => process.exit(code))
  .catch((err: unknown) => {
    process.stderr.write(`error: ${err instanceof Error ? err.message : String(err)}\n`);
    process.exit(1);
  });

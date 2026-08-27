# Studex OS — Control Plane

The tenancy, memory, routine and ledger layer. This is the part we own; Daytona is
rented execution and OpenClaw is the scheduler.

**Status: scaffold.** Typechecks clean, the routine catalogue validates, and the CLI
runs. Not yet wired to live credentials — see [Wiring up](#wiring-up).

```
studex-os/
├── routines/            10 routine specs — the product
├── src/
│   ├── db/schema.ts     tenants, keys, routines, runs, ledger, support grants
│   ├── adapters/
│   │   ├── sandbox.ts   portable interface + Daytona implementation
│   │   └── gateway.ts   OpenClaw Gateway, one per tenant
│   ├── routines/        catalogue loader, validation, credit estimation
│   ├── tenant/          provisioning, workspace keys
│   ├── ledger/          append-only writes and period summaries
│   └── cli.ts           studex CLI
└── design/              tokens, design language, working preview
```

## Try it

```bash
npm install
npm run check                          # typecheck
npx tsx src/cli.ts routines check      # validate all 10 specs
npx tsx src/cli.ts routines budget company_builder
open design/preview.html               # the design system, applied
```

## Design decisions worth knowing

**Schema per tenant, not a `tenant_id` column.** Each tenant's Ghost lives in
`ghost_<slug>`. A forgotten `WHERE` clause on a memory product is a cross-client leak,
and schema separation makes that mistake structurally harder to make.

**Ephemeral sandbox per task.** `withSandbox()` always tears down. A persistent
2 vCPU / 4 GiB sandbox is ~R1,955/tenant/month; the same work in bursts is ~R184. If
anything ever needs a long-lived sandbox, make it explicit and alarm on it.

**The sandbox interface is deliberately tiny** — create, exec, snapshot, destroy, plus
volumes and secrets. Sandbox providers are a fast-moving competitive category. Swapping
provider should be one file, not a rewrite.

**One OpenClaw Gateway per tenant.** Not just for uptime: automation mutations require
`operator.admin`, so on a shared Gateway there is no way to let a client manage their
own routines without granting admin over everyone's. Per-tenant Gateways scope that to
one customer.

**The ledger is append-only and there is no update or delete path.** Enforce it at the
database too — the application role should hold `INSERT` and `SELECT` on that table and
nothing else. A log that can be edited proves nothing, and this table *is* the audit
claim.

**Timezone is required and validated.** OpenClaw defaults to UTC when `--tz` is omitted.
A morning brief landing two hours off is a bad first impression.

**Credentials never enter a sandbox.** Client tokens go to Daytona Secrets, which holds
plaintext outside the sandbox and substitutes at network egress.

## What running it already told us

`routines budget` against the plan allowances:

| Plan | Routines | Credits/month | Allowance | Used by routines |
|---|---|---|---|---|
| Ghost | 1 | ~180 | 1,000 | 18% |
| Standard | 3 | ~1,059 | 4,000 | 26% |
| **Company Builder** | 10 | ~5,113 | 10,000 | **51%** |
| Business | 10 | ~5,113 | 25,000 | 20% |

Two things fall out of that, both worth acting on:

**Company Builder's routines eat half the allowance before the client asks for
anything.** ~4,900 credits remain for ad-hoc work. Workable, but a client who uses the
agents interactively will run out — which is either a healthy top-up line or a support
complaint depending on how clearly we set the expectation up front. Watch actual
consumption in week one and revisit the allowance if it exceeds 80%.

**Business and Company Builder currently run the identical routine set.** Business costs
twice as much for the same routines plus more credits, which is a weak upgrade story.
Business needs differentiated routines — deeper research cadence, multi-entity support,
custom skills — or the tier is just "same thing, bigger bucket".

## Wiring up

```bash
cp .env.example .env
```

| Variable | For |
|---|---|
| `DATABASE_URL` | Postgres with the `vector` extension |
| `DAYTONA_API_KEY` | Sandboxes, volumes, snapshots, secrets |
| `DAYTONA_REGION` | `eu-central` — closest available, GDPR-aligned. No African region exists |
| `FLY_API_TOKEN` | Provisioning per-tenant Gateways |

Then:

```bash
npm run db:push
```

Before first live provisioning, verify the Daytona SDK call signatures in
`src/adapters/sandbox.ts` against docs.daytona.io. The REST shapes follow the published
examples but the volume, snapshot and secret calls have not been exercised against a
live account.

## Blockers before a paying client

1. **WhatsApp disconnected** — WABA `105198275846951` needs SMS verification
2. **Timezone contradiction** — `USER.md` says Asia/Dubai, `MEMORY.md` and `STUDEX_OS.md`
   say Africa/Johannesburg. Every routine inherits whichever is wrong
3. **June key rotation unconfirmed** — see `KEY_ROTATION_CHECKLIST.md`

## Related

- [Architecture](../studex/deploy/01-ARCHITECTURE-ON-DAYTONA.md)
- [OpenClaw automations](../studex/deploy/02-OPENCLAW-AUTOMATIONS.md)
- [Onboarding runbook](../studex/deploy/03-CLIENT-ONBOARDING-RUNBOOK.md)
- [Design language](design/DESIGN.md)

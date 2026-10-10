# Deployment — Daytona + OpenClaw
**Date:** 2026-08-26 | Follows [`delivery-model/`](../delivery-model/README.md) and [`ecosystem-2026-08/`](../ecosystem-2026-08/README.md)

How to actually host this and stand up the first client.

| Doc | What's in it |
|---|---|
| [`01-ARCHITECTURE-ON-DAYTONA.md`](01-ARCHITECTURE-ON-DAYTONA.md) | The two-plane design, isolation boundary, per-tenant cost, and four things to get right |
| [`02-OPENCLAW-AUTOMATIONS.md`](02-OPENCLAW-AUTOMATIONS.md) | Using OpenClaw for routines, why one Gateway per tenant, the starting routine set |
| [`03-CLIENT-ONBOARDING-RUNBOOK.md`](03-CLIENT-ONBOARDING-RUNBOOK.md) | Step-by-step for "XYZ Group", day 0 to Friday, with real costs |

---

## The short version

**Daytona is a better fit than what I designed earlier, and it corrects one thing I got wrong.**
I previously said run one persistent agent runtime per tenant. Daytona makes a better pattern
practical: **ephemeral sandbox per task, persistent volume per tenant.** Sub-90ms creation,
per-second billing and a 15-minute auto-pause mean bursty agent work costs what it uses —
**about R184/month per tenant instead of R1,955.** That single change is the difference between
39% of revenue going to compute and 3.7%.

**Two planes, and the split matters:** always-on things (tenant registry, memory, ledger, channel
gateway, scheduler) go on Fly.io; bursty execution goes to Daytona. Running an always-on control
plane on per-second sandbox pricing means paying premium rates for something that never pauses.
This also matches the existing `STUDEX_OS.md` rule — Fly.io for always-on, Vercel for dashboards.

**Daytona Secrets solves the credential vault requirement outright** — plaintext credentials stay
outside the sandbox and are substituted at network egress, so a client's Shopify token never lands
in a sandbox filesystem. Combined with container/microVM isolation per sandbox, dedicated
namespaces, network segmentation and per-tenant allow-lists, the isolation table in
[`01`](01-ARCHITECTURE-ON-DAYTONA.md) is now true rather than aspirational. Keep that table — it
is exactly what a buyer's security reviewer asks for, and it is the honest answer to audit
question 8.

**Yes, use OpenClaw for the automations — and it means you don't build a scheduler.** Its
automations system already has cron and interval scheduling, persistence across restarts,
exponential retry backoff, one-shot semantics that don't replay side effects, timezone handling,
webhook and Gmail triggers, and task records. Author routines on the desktop where iteration is
fast, then run them from **one Gateway per tenant on Fly.io.**

Per-tenant Gateways look crude and are genuinely right for the pilot, for a reason beyond uptime:
**automation mutations require `operator.admin`**, so on a shared Gateway there is no way to let a
client manage their own routines without giving them admin over everyone's. A Gateway per tenant
scopes that admin to exactly one client. Cost is roughly R80–240/month each. It gets painful past
about 50 tenants — which is when you will know enough to build the scheduler properly and have
revenue to fund it.

The feature worth knowing about is **`session:<id>`** — a persistent named session where context
carries across runs. That is what makes a daily brief build on yesterday instead of starting
amnesiac each morning.

**Write routines once, version them, deploy to every tenant.** A routine is a YAML spec in
`studex/routines/`, not a hand-typed CLI command. That is what converts delivery labour into a
product and moves margin from 44% toward 67%. Set `suppress_if_empty` on the watch routines — a
routine posting "no new matches" three times a day trains the client to ignore the channel, and
once they ignore it they have stopped seeing the product work.

**Revised per-tenant economics:** infrastructure R715–1,775, human delivery ~R1,850, so
contribution R1,375–2,435 on R5,000 — **28–49% margin.** Wide because inference and human time are
still unmeasured. Week one of the first client narrows it.

---

## Four things to get right on Daytona

**No African region.** Regions are India, EU Central (Frankfurt), EU West (London), US East, US
West. Latency from SA to Frankfurt is ~150–190ms, which is irrelevant for asynchronous agent work
but will feel sluggish for interactive Computer Use. **More importantly, it means I need to
correct last session's advice:** "the data stays in Rwanda" is not achievable on Daytona Cloud.
The defensible version is to keep the Ghost and ledger — the actual client records — in a control
plane hosted where residency requires, and use Daytona only for ephemeral execution that stores
nothing. That claim is true, stronger than most competitors can make, and survives scrutiny. Don't
promise Rwandan residency until it is architecturally real.

**AGPL 3.0 on the open-source platform.** Calling Daytona's hosted API from our own application
creates no copyleft issue. Self-hosting unmodified is fine. Self-hosting *with modifications*
exposed over a network triggers the obligation to release those modifications — a real problem for
a commercial platform. Recommendation: use the managed cloud and treat Daytona as a vendor API.

**The open-source repo may be frozen.** The GitHub repo carries a note that the codebase moved to
a private repository and the public one remains available "without support or warranty." If
accurate, self-hosting is community-supported at best. Worth confirming directly, since
self-hosting is the fallback for residency.

**Keep the sandbox interface behind our own thin adapter** — `create`, `exec`, `snapshot`,
`destroy`. Daytona raised a $24M Series A and is well-regarded (LangChain, SambaNova, n8n, Clay
are cited users), but it is still a vendor. Sandbox providers are becoming a competitive category,
which is exactly when portability is cheap to build and expensive to retrofit. The defensible
parts — memory, ledger, tenancy, channel — stay ours. Execution is the right thing to rent.

---

## Blockers before a paying client

1. **WhatsApp is still disconnected.** WABA `105198275846951` needs SMS verification. Most SA SME clients live there — critical path.
2. **Timezone contradiction in our own files.** `USER.md` says Asia/Dubai (GMT+4); `MEMORY.md` and `STUDEX_OS.md` say Africa/Johannesburg (GMT+2). Every scheduled routine inherits this, and OpenClaw defaults to UTC when `--tz` is omitted. A morning brief landing two hours off is a bad first impression.
3. **June key rotation still unconfirmed** (`KEY_ROTATION_CHECKLIST.md`). Do not onboard a paying client onto infrastructure with known-exposed credentials while selling auditability.

## Do this week

1. **Apply to the Daytona startup programme** — up to $50k in credits, costs an email
2. Create the Daytona account, region EU Central
3. Clear the three blockers above
4. Build **one** routine — the morning brief — on desktop OpenClaw against a real business
5. Promote it to `studex/routines/morning-brief.yaml`
6. Stand up one Fly.io Gateway, register that routine, point it at a test WhatsApp group
7. **Let it run a week untouched.** That week, not a demo, is the gate to client two

# OpenClaw for Automations and Daily Routines
**Prepared by:** Robusca Romanov | **Date:** 2026-08-26

---

## Short answer

**Yes — and it means you don't have to build a scheduler at all.**

Use OpenClaw two ways, and keep them separate in your head:

1. **Desktop, locally — to *author* routines.** Write it, run it, look at the output, fix it.
   This is the fastest way to build a routine and it is what the desktop is good at.
2. **Gateway per tenant, on Fly.io — to *run* them in production.** One Gateway per client gives
   you real isolation, always-on scheduling, and a clean admin boundary, without writing a
   scheduler.

What you must not do is run client routines on your laptop. Reasons below — one of them is a
privilege boundary problem, not just an uptime problem.

---

## What OpenClaw automations actually give you

Confirmed from the docs — this is a real scheduler, not a toy:

| Kind | Flag | Use |
|---|---|---|
| `at` | `--at` | One-shot. ISO 8601 or relative like `20m` |
| `every` | `--every` | Fixed interval — `10m`, `1h`, `1d` |
| `cron` | `--cron` | 5- or 6-field cron expression, with `--tz` |
| `on-exit` | `--on-exit` | Fires once when a watched command exits |
| `stream` | `--stream-command` | Fires from batched output of a long-running command |

**Session targets — this is the important part, and it maps directly onto the loop design:**

| Target | Behaviour | Use for |
|---|---|---|
| `main` | Enqueues a system event into the agent's main session, optionally waking the heartbeat (`--wake now` / `--wake next-heartbeat`) | Reminders, alerts |
| `isolated` | Dedicated agent turn, fresh session. Default for agent-turn jobs | **Reports and background chores.** Won't clutter the client's conversation |
| `current` | Detached run session, bound at creation, reads a bounded tail | Context-aware recurring work |
| `session:<id>` | **Persistent named session — context carries across runs** | **Daily routines that build on yesterday.** This is the one for the morning brief |

`session:<id>` is the feature that makes a "daily routine" actually feel like a routine rather
than an amnesiac re-run. The docs call out daily standups building on previous summaries as the
intended use, which is exactly the client morning brief.

Other operationally relevant facts:

- Runs **inside the Gateway process**, not inside the model
- Jobs **persist** locally (SQLite; older versions used `~/.openclaw/cron/jobs.json`), so restarts don't lose schedules
- Delivery to a **chat channel, a webhook, or nowhere**
- Every execution creates a background task record — useful for the ledger
- One-shot jobs auto-delete only after `completionStatus: "succeeded"`; a failed one stays disabled rather than replaying side effects on restart
- Recurring jobs retry with exponential backoff: 30s, 1m, 5m, 15m, 60m, returning to normal after a success
- `openclaw automations run <id>` force-runs and returns a `runId` you can inspect
- Webhooks and Gmail PubSub triggers are supported as external triggers
- `openclaw cron` is an alias for `openclaw automations`

---

## Why not run client routines on the desktop

Four reasons, in order of severity.

**1. The Gateway has to be running for schedules to fire.** On a desktop that means a closed lid,
a sleeping machine, a dropped connection or a reboot silently stops a paying client's routines.
Nobody gets an alert. You find out when the client asks why they didn't get their brief. For your
own routines that is an annoyance; at R5,000/month it is a refund.

**2. Automation mutations require `operator.admin`.** Add, edit, remove and run all need admin on
the Gateway. So on a single shared Gateway there is no way to let a client — or a client-scoped
agent — manage their own routines without handing them admin over *everyone's* routines. That is
a privilege boundary you cannot patch later.

**3. Jobs are single-instance local state.** One jobs store, one agent workspace, one set of
memory files. There is no tenant concept, so three clients on one Gateway share a namespace.

**4. One OpenClaw instance is one agent workspace.** Same structural limitation as Runable, for
different reasons — it was built to be somebody's assistant, not a multi-tenant platform.

Note that reason 2 also contains the solution.

---

## The pattern: one Gateway per tenant

Give each client their own OpenClaw Gateway on Fly.io. It reads as crude and it is genuinely
correct for the pilot.

```
AUTHORING            OpenClaw desktop (yours, local)
                     write routine → automations run → check output → iterate
                              │
                              │  promote to versioned definition in repo
                              ▼
CATALOGUE            studex/routines/*.yaml   ← the product
                              │
                              │  control plane instantiates per tenant
                              ▼
PRODUCTION           OpenClaw Gateway per tenant · Fly.io · always on
                     ├ own jobs store        ← isolated schedules
                     ├ own operator.admin    ← isolated privilege
                     ├ own workspace/memory  ← isolated context
                     └ own channel binding   ← their WhatsApp/Slack
                              │
                              │  heavy or untrusted work
                              ▼
EXECUTION            Daytona sandbox per task · ephemeral
```

**What this buys:**

- **You don't build a scheduler.** Persistence, cron parsing, retry backoff, timezones, one-shot
  semantics, task records — all already there and already debugged. That is weeks of work you skip.
- **Reason 2 above is solved cleanly.** Each Gateway's `operator.admin` is scoped to exactly one
  tenant. A client can be given admin over their own routines and reach nothing else.
- **Isolation is real, not asserted.** Separate process, separate jobs store, separate workspace.
- **Always-on.** A Fly machine does not close its lid.

**What it costs:** roughly $5–15/month per tenant for a small always-on Fly machine — call it
R80–240. Add the Daytona execution from the [architecture doc](01-ARCHITECTURE-ON-DAYTONA.md) at
about R184 for bursty use, and per-tenant infrastructure lands around **R300–450/month** against
R5,000 revenue. Comfortable.

**Where it breaks:** N Gateways to upgrade, monitor and back up. Fine at 3–20 tenants, painful
somewhere past 50. That is the right trade now — at 50 tenants you will know enough to build the
scheduler properly, and you will have revenue to fund it. Do not build for 50 while proving 1.

**One thing to add on day one:** a health check per Gateway. If a tenant's Gateway stops, you need
to know before they do. `automations list --all` plus a heartbeat check from the control plane is
enough.

---

## Routines as a product, not as configuration

The most valuable thing in this whole approach: **write each routine once, version it, deploy it
to every tenant.** That is what turns delivery work into a product and moves gross margin from
44% toward 67%.

Define them declaratively in the repo — a routine is a spec, not a hand-typed CLI invocation:

```yaml
# studex/routines/tender-watch.yaml
id: tender-watch
version: 3
applies_to: [company-builder, business, enterprise]
schedule:
  kind: cron
  expr: "0 6,12,18 * * *"
  tz: Africa/Johannesburg
session: isolated
prompt: |
  Check eTenders, provincial portals and SOE portals for new tenders matching
  this company's CSD registration, BBBEE level, fleet capacity and geography
  from the Ghost. For each match report: tender ID, closing date, estimated
  value, source URL, and a go/no-go recommendation with one line of reasoning.
  If nothing matches, say "no new matches" and stop.
delivery:
  channel: tenant_primary
  mode: announce
  suppress_if_empty: true
credits_estimate: 12
```

Then provisioning a tenant is: read the catalogue, filter by their tier, and register each
routine against their Gateway. New client, twelve routines, one command.

`suppress_if_empty` matters more than it looks. A routine that posts "no new matches" three times
a day trains the client to ignore the channel, and once they ignore it they have stopped seeing
the product work. Silence when there is nothing to say is a feature.

---

## The starting routine set

These are the loops from the [ecosystem design](../ecosystem-2026-08/05-AGENT-LOOPS-AND-STACK.md),
now with concrete schedules. Every one produces a fact with a source, behind a human decision.

| Routine | Schedule | Session | Delivers |
|---|---|---|---|
| **Morning brief** | `0 6 * * *` | `session:<tenant>-daily` | Yesterday's results, today's priorities. Builds on the previous run |
| **Tender watch** | `0 6,12,18 * * *` | `isolated` | New matching tenders + go/no-go |
| **RFQ watch** | `0 8,16 * * *` | `isolated` | Private RFQs in sector and region |
| **Pipeline decay** | `0 9,15 * * *` | `isolated` | Quotes gone quiet past follow-up window + draft |
| **Document expiry** | `0 7 * * *` | `isolated` | Anything expiring within 60 days |
| **Buyer signals** | `0 10 * * *` | `isolated` | Target buyer posted, hired, raised, expanded |
| **Price watch** | `every 24h` | `isolated` | Tracked prices moved beyond threshold |
| **Content performance** | `0 11 * * *` | `isolated` | Which pieces cleared 3-second retention |
| **Weekly market sweep** | `0 7 * * 1` | `session:<tenant>-market` | `last30days` sweep, sourced |
| **Weekly client report** | `0 16 * * 5` | `isolated` | What the agents did, what it cost |

Note there are no 3-hour loops, per the earlier reasoning — at 50 clients that is 400 runs a day
for one routine and the credit cost lands on our margin, not theirs.

The **Friday client report** is the one I would not skip. It is the artefact that makes the
subscription feel worth paying, it doubles as the ledger extract, and it is the receipt that the
whole launch positioning depends on.

---

## Two things to fix before scheduling anything

**1. Set `--tz` explicitly, every time.** OpenClaw defaults to UTC. A routine meant for 06:00
SAST will fire at 08:00 SAST if the timezone is omitted.

**2. There is a timezone contradiction in your own workspace files.** `USER.md` says
**Asia/Dubai (GMT+4)**. `MEMORY.md` says **Africa/Johannesburg (SAST, GMT+2)**. `STUDEX_OS.md`
says **Africa/Johannesburg**, and the existing daily 8AM cron in `MEMORY.md` is recorded as
"8AM Dubai time." Those cannot all be right, and every scheduled routine inherits the error.
Worth settling before the routine set goes live — otherwise the morning brief lands two hours
off and the client's first impression is that we cannot tell the time.

---

## What OpenClaw is not for here

To keep the boundaries clean:

- **Not the tenant registry, memory store, or ledger.** Those are the product and live in the
  control plane. OpenClaw's workspace files are per-agent, not a multi-tenant database.
- **Not the client's interface.** They talk to a WhatsApp or Slack group. The Gateway is plumbing
  they never see.
- **Not the sandbox.** Command payloads execute in the Gateway process, so anything untrusted,
  heavy, or client-code-adjacent goes to a Daytona sandbox. Keep the Gateway boring.
- **Not the desktop, in production.** Author there, run on Fly.

---

## Do this next

1. Pick **one** routine — the morning brief — and build it on your desktop OpenClaw against a real
   business. Iterate with `automations run` until the output is something you'd be happy for a
   client to receive.
2. Promote it to `studex/routines/morning-brief.yaml`.
3. Settle the timezone question.
4. Stand up one Gateway on Fly.io, register that routine, point it at a test WhatsApp group, and
   let it run for a week unattended. If it survives a week without you touching it, the pattern
   works and you can add the other nine.

One routine running reliably for a week is worth more than ten routines built in a day.

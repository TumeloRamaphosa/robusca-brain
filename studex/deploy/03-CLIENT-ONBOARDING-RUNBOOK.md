# Runbook: Standing Up "XYZ Group"
**Prepared by:** Robusca Romanov | **Date:** 2026-08-26

The end-to-end sequence for taking one client from signature to a working group. Written as the
worked example for the first tenant; by client five it should be one command.

---

## Before any client: one-time setup

Six things, none of which take long. Do them in this order.

| # | Task | Notes |
|---|---|---|
| 1 | **Apply to the Daytona startup programme** | Up to **$50k in credits**. Could fund the entire pilot. Do this today — it costs an email |
| 2 | **Daytona account + API key** | $200 free compute, 5 GiB free storage to start. Region: **EU Central (Frankfurt)** — closest to SA, GDPR-aligned for EU coffee buyers |
| 3 | **Control plane on Fly.io** | Postgres + pgvector, tenant registry, key service, ledger, channel gateway |
| 4 | **Reconnect WhatsApp** | WABA `105198275846951`, phone ID `117882611239791` — needs SMS verification per `STUDEX_OS.md`. **On the critical path** |
| 5 | **Settle the timezone** | `USER.md` says Asia/Dubai, `MEMORY.md` and `STUDEX_OS.md` say Africa/Johannesburg. Every routine inherits this |
| 6 | **Rotate the June keys** | `KEY_ROTATION_CHECKLIST.md`. Still unconfirmed. Do not onboard a paying client onto infrastructure with known-exposed credentials |

Items 4, 5 and 6 are blockers, not chores.

---

## Day 0 — the founder call

Ten minutes, video, you only. Not a demo. Three questions:

1. What didn't get done last month that would have made money?
2. Who is the bottleneck, and what are they doing that a machine could?
3. What's written down about your company, and where does it live?

Question 3 is the Brain ingestion scope, and the answer is almost always "nowhere — it's in my
head and my inbox." That answer *is* the pitch.

**Ends with:** a signed one-page order form, an agreed 48-hour first deliverable, and the WhatsApp
group created before you hang up. Momentum beats paperwork.

---

## Day 0 — provisioning

Target state: one command. For the first client, run it step by step so you learn where it breaks.

```bash
studex tenant create \
  --name "XYZ Group" \
  --slug xyz \
  --plan company-builder \
  --channel whatsapp --msisdn +27XXXXXXXXX \
  --tz Africa/Johannesburg \
  --region eu-central
```

What that does, in order:

**1. Registry row** — tenant `tn_xyz_a41c`, plan, entitlements, status, timezone.

**2. Memory schema** — `ghost_tn_xyz_a41c` in Postgres. **Schema per tenant, not a `tenant_id`
column.** A forgotten `WHERE` clause on a memory product is a cross-client leak, and schema
separation makes that mistake structurally harder.

**3. Daytona objects** — one volume, one snapshot, secrets namespace:

```python
from daytona import Daytona, DaytonaConfig

client = Daytona(DaytonaConfig(api_key=DAYTONA_API_KEY))
# volume for persistent working files; snapshot pre-baked with tools and skills;
# secrets namespace for XYZ's own third-party tokens.
# Verify exact SDK signatures against docs.daytona.io before wiring.
```

The snapshot is the leverage: pre-bake their agent image once and every sandbox boots in under
90ms with tools and skills already present. No per-run setup cost.

**4. Workspace key** — `sk_studex_live_XYZ_...`, scoped to this tenant, revocable in one action,
metered on every call. **This is our key, issued by us.** Never hand a client a vendor's key.

**5. OpenClaw Gateway on Fly.io** — `studex-gw-xyz`, always on. Own jobs store, own
`operator.admin`, own workspace, bound to XYZ's WhatsApp group.

**6. Register routines** from the catalogue, filtered to their tier:

```bash
studex routines sync --tenant xyz
# reads studex/routines/*.yaml where applies_to includes company-builder
# → registers 10 automations against studex-gw-xyz with --tz Africa/Johannesburg
```

**7. Ledger initialised** — append-only. Every action, every cost, from the first minute.
Instrument from now or the receipts never exist.

**8. Health check registered** — if XYZ's Gateway stops, we find out before they do.

**What the client sees:** a WhatsApp group called **XYZ Group × Studex** with four participants —
them, their ops lead, Tumelo, and `Studex Agent`.

**What they never see:** our Daytona key, our model keys, the Runable seat, the control plane, or
any other tenant.

---

## Day 1–2 — Brain ingestion

The step that turns a generic assistant into *their* Ghost. Everything lands in their schema only.

| Source | What to pull |
|---|---|
| Email | 12–24 months of the main operational inbox |
| Documents | Contracts, past proposals, certificates, registrations, rate cards |
| Systems | Accounting, CRM, e-commerce — whatever they actually run |
| Web | Their own site, plus 5–10 competitors |

The client authorises each connection themselves; tokens land in **their** Daytona secrets
namespace, where plaintext stays outside the sandbox and is substituted at network egress. We are
a custodian of their credentials, not a holder — and that should be in the contract, not just the
architecture.

**Then the 48-hour first deliverable.** This is the retention decision and it happens this week.
Whatever they see now sets their expectation for month six. Make it something they can show a
colleague — a tender-ready capability statement plus the live tenders they qualify for, a
competitor teardown with a content plan, a rebuilt proposal with the costing errors flagged. Not
a dashboard tour.

---

## Day 3 — routines live

Turn the schedule on and watch it for a week.

```bash
studex routines list --tenant xyz
studex routines run --tenant xyz --id morning-brief   # force one, check the output
```

**Start with three, not ten.** Morning brief, the one watch routine that matches their actual
business, and the Friday report. Add the rest once you have seen a week of real output. Ten
routines firing into a WhatsApp group on day three is noise, and a client who mutes the group in
week one never comes back to it.

Make sure `suppress_if_empty` is on for the watch routines. A routine that says "no new matches"
three times a day teaches them to ignore the channel.

---

## Week 1 — verify, don't assume

| Check | Why |
|---|---|
| Every routine fired at the intended local time | The timezone bug is the most likely failure |
| No sandbox alive longer than its ceiling | A stuck sandbox is a silent invoice |
| Ledger recording every action and cost | If it isn't, month three has a story and no evidence |
| Credit consumption vs the 10,000 included | Calibrates the whole pricing model |
| Gateway uptime | Confirms the always-on assumption |
| Client actually reading the messages | The only engagement metric that matters |

Week 1's real output is a **measured** cost per tenant. Every number in
[the pricing model](../ecosystem-2026-08/02-PRICING-MODEL.md) is currently an estimate. After
seven days they are measurements, and pricing can be set on evidence.

---

## Friday — the report

The artefact that justifies the subscription. Generated by the `weekly-client-report` routine,
straight from the ledger:

- What the agents did, counted — tenders surfaced, proposals drafted, follow-ups sent
- What was found that they didn't know
- Credits consumed against allowance
- What needs a decision from them
- What failed, and why

Include the failures. It is the single cheapest way to be believed, and being believed is the
entire positioning.

---

## Cost, per tenant per month

| Line | Amount |
|---|---|
| Daytona compute + memory, bursty ~2h/day | R160 |
| Daytona storage, 20 GiB | R25 |
| Fly.io Gateway, always on | R80–240 |
| Control plane share (amortised) | R50–150 |
| WhatsApp conversations | R100–300 |
| Inference (own keys) | R300–900 |
| **Infrastructure total** | **R715–1,775** |
| Human delivery, steady state | R1,850 |
| **Total cost** | **R2,565–3,625** |
| **Revenue** | **R5,000** |
| **Contribution** | **R1,375–2,435** |
| **Margin** | **28–49%** |

Wide, because inference and human time are both unmeasured. Narrow it with real data in week one.
The controllable levers are the routine set (fewer, better) and human hours (contract an
allowance and bill overage).

---

## Rollout order

Do not do three clients at once with a control plane that does not exist yet.

| Step | What | Gate to pass |
|---|---|---|
| **1** | One-time setup, blockers 4–6 cleared | WhatsApp live, keys rotated, timezone settled |
| **2** | **XYZ Group**, manual provisioning, 3 routines | Runs one week unattended |
| **3** | Automate provisioning into one command | Provision a test tenant end to end in under 10 min |
| **4** | Clients 2 and 3 | Real measured cost per tenant |
| **5** | Full routine catalogue, all tiers | Routines are a product, not config |

Step 2's gate is the important one. **A week unattended** is the test — not a successful demo.
Anything that needs you to intervene daily is not deployable to a second client, and finding that
out at client one costs a week; finding out at client ten costs the business.

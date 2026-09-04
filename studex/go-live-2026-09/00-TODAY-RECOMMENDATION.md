# Today's Recommendation — Sell One Thing

**Date:** 4 Sep 2026  
**Evidence:** [PR #17](https://github.com/TumeloRamaphosa/robusca-brain/pull/17), `studex/managed-agents/`, `studex/delivery-model/`, `STUDEX_OS.md`

---

## The call

> ## Sell **Business Ghost — Managed** today.  
> Not the ecosystem. Not NestVM self-serve. Not buzz.xyz markets. Not Execution Exchange.

**Public name:** Business Ghost *(contract name: Studex Memory)*  
**Delivery shape:** Managed co-founder service — Studex builds and runs the memory + one agent loop; client approves everything external.  
**Price posture:** **R3,500/month** Managed Pilot (founding client). Drop to **R950/month** only if scope is memory Q&A with no workflows and client accepts 48h setup SLA.  
**Payment:** ZAR invoice (PayFast or EFT). No Studex Token. No crypto rail.

This reconciles three prior decisions that looked in tension:

| Prior decision | How it fits today |
|---|---|
| PR #17: launch Business Ghost alone | **Ghost is the product name** — memory is the wedge |
| Managed-agents pack: deliver by hand before selling automation | **Managed is the delivery** — nothing self-serve yet |
| Delivery model: one client, consultancy profile, control plane before client two | **One founding client** — instrument from day one |

---

## Why this beat the three surfaces on the table

| Option | Verdict for today | Why |
|---|---|---|
| **(1) Shared agent OS + global markets / buzz.xyz** | **Defer** | Requires marketplace liquidity, multi-tenant control plane, and receipts we do not have. War Room Super Agents tab shows **0 pipeline leads** — selling ecosystem access into an empty room burns the first impression. |
| **(2) Per-client Orgo.ai / NestVM** | **Phase 2 upsell** | Orgo VM exists for StudEx internal use ([`deployment/META_CLI_HANDOFF.md`](../../deployment/META_CLI_HANDOFF.md)); NestVM is designed in NotebookLM scripts but **not provisioned per client**. Promising a private VM today over-promises isolation we have not run once for an external tenant. |
| **(3) Grok-bot / polsia.ai-style managed service** | **✅ SELL THIS** | Matches what the repo can actually deliver by hand: vault + memory + one agent role + human approval. Closest to "agents as co-founders" without pretending autonomy exists. |

---

## What the client sees vs what's behind the curtain

### Client sees

- A **Business Ghost** that knows *their* company — goals, clients, projects, decisions, documents they approved
- A **daily brief** from their Chief of Staff (what happened, what needs a human decision, what drafts are ready)
- **One working workflow** in week 1 (e.g. proposal draft from template, inbox triage summary, or meeting prep)
- A **human Studex operator** they can message when something breaks
- A written **10-question audit scorecard** for their deployment (adapted from PR #17)

### Behind the curtain (do not oversell)

| Layer | What we actually use today |
|---|---|
| Memory | Per-client Obsidian vault from [`templates/client-vault/`](../../templates/client-vault/) pattern in managed-agents branch — **clone and populate by hand** |
| Agent runtime | Robusca / OpenClaw / Perplexity orchestration — **not** a self-serve multi-tenant API |
| Approvals | Human operator + `studex/naledi-approval-log.md` pattern — **not** Buzz signed events yet unless pre-tested |
| Ops dashboard | Internal [War Room](https://www.perplexity.ai/computer/a/studex-war-room-vLlaaCxbTSKY9W6ammcqNQ) — **not** white-labelled to client |
| Automation | n8n JSON exists on managed-agents branch — **imports with placeholder credentials; not live** |
| VM / computer use | StudEx Orgo VM for **our** delivery team only; client does not get shell access day one |

**The honest sentence:** *"You get a co-founder who never forgets — we run the infrastructure, you keep the keys to what leaves the building."*

---

## What "agents as co-founders" means operationally (today)

Not autonomous company builders. Not unsupervised outbound. Not 24/7 unsupervised payments.

| Co-founder behaviour | How we deliver it in week 1 |
|---|---|
| Remembers everything | Business Ghost vault indexed from client-approved docs |
| Shows up every morning | Daily brief (email or WhatsApp) — priorities, drafts waiting, blockers |
| Does the boring work first | One workflow: draft proposals, summarise inbox, or prep meeting notes |
| Asks before spending your reputation | **Nothing sends, posts, or pays without named human approval** |
| Gets better over time | Vault sync + client corrections logged to `memory/` |

Escalation path: client approver → Studex operator → Tumelo (only if >R5,000 impact or strategic).

---

## What we explicitly defer

| Deferred | Until when | Why |
|---|---|---|
| Execution Exchange | Phase 4+ per PR #17 | Two-sided cold start |
| Studex Token / USDC rail | Indefinite without FSCA counsel | PR #17 risk register — self-refuting with governance pitch |
| buzz.xyz / global agent marketplace | Phase 2+ | Needs density + signed-event infra verified internally |
| NestVM self-serve / per-client Orgo VM | After 3 instrumented clients | Isolation story must be true before we sell it |
| Full 8-agent Company-in-a-Box | Managed Team tier (R22k+) | Operator cost unfunded below ~R18k |
| White-label War Room (Meat OS R8,500+) | Phase 2 | Super Agents SaaS tab is internal roadmap, **0 signed clients** |
| Enterprise cohort claims (NtechLab etc.) | Until written permission + hard numbers | **No receipts in repo** |
| Runable as product foundation | Never as tenancy layer | Delivery-model evaluation — six blockers |
| Autonomous computer-use / GrokBot clone | NestVM tier register-interest | No licence on GrokBot; computer-use is highest risk |

---

## Ideal first client (today)

**Profile C from delivery-model scenario:** consultancy or agency with templated proposals, repeat clients, founder-led sales.

**Avoid as client #1:** medical practice (HPCSA constraints — see `managed-agents/13-MEDICAL-CLIENT.md`), e-commerce with live Shopify mutations, or any client needing unsupervised outbound email/WhatsApp.

**Disqualify if:** they need POPIA compliance certification we have not assessed, SLA/uptime guarantees, or "fully autonomous agents."

---

## Success = one instrumented receipt by end of week 1

Not MRR projections. Not follower count. One row in a ledger:

| Field | Example |
|---|---|
| Client (initials only) | `Client T.` |
| Workflow live | Proposal draft from 3 approved templates |
| Hard number | e.g. "4 proposals drafted, 2 sent after approval, ~6h founder time saved" *(measured, not invented)* |
| Permission | Written consent to use as anonymous case study |
| Audit score | 10-question scorecard completed honestly |

If we cannot produce this row, we are not ready for client two.

# The offering — how we sell managed agent teams

**Prepared:** 24 Aug 2026
**Status:** DRAFT AWAITING AGENT LORD APPROVAL. All prices are proposals.

Extends the two-plan model in the Super Agents launch pack rather than replacing
it. That pack is the canonical positioning; this document adds the tier that
matches what you are actually doing in Buzz today — a workspace per client with
a team of agents in it.

---

## What the client is buying

Not software. Not seats. **A small team that happens to be mostly agents, in a
room you can watch, doing work you approve.**

That sentence is the whole pitch, and it is the one thing competitors selling
per-seat chatbot licences cannot say. Keep it.

The client gets:

1. a private workspace containing their agents and our operators;
2. their own approved business knowledge loaded into it;
3. named agents with defined roles and explicit permission boundaries;
4. a human approval step before anything leaves the workspace;
5. a signed, complete record of who did what — agent or person;
6. a weekly operating review with a person accountable for the result.

---

## The ladder

Three tiers plus one planned delivery option. The first two are unchanged from
the launch pack so the website and this document cannot contradict each other.

### Tier 1 — Managed Pilot · R3,500/month

*Unchanged from the launch pack.* One named agent, one role, one workflow, one
knowledge pack, human review before external actions. Application required.

Purpose: prove we can deliver anything at all, for one client, by hand.

### Tier 2 — Managed Operations · R7,500/month

*Unchanged from the launch pack.* Everything in Pilot plus an expanded knowledge
pack, up to two workflows, one validated integration, structured approval
records and priority support.

### Tier 3 — Managed Team · R22,000/month *(proposed — new)*

**This is the tier that matches the Buzz group-per-client model.**

For a client who wants several roles working together in one workspace rather
than one agent answering one queue.

Includes everything in Managed Operations, plus:

- a **dedicated private workspace** (one Buzz community per client);
- **three to five named agents** with distinct roles and separate identities;
- **cross-agent handoff** — agents pass work between themselves inside the
  workspace, with each step attributable to the agent that performed it;
- **client staff in the room** — the client's own people join the workspace and
  work alongside the agents rather than receiving reports about them;
- **a named StudEx operator** present in the workspace during agreed hours;
- **a complete signed activity record**, exportable;
- up to four defined workflows;
- monthly operating review with written outcomes.

Not included by default: dedicated VM, computer-use capability, autonomous
external messaging, unsupervised payments, integrations beyond those validated.

Primary CTA: **Apply for a Managed Team**

**Why R22,000.** It has to carry a real operator's part-time attention, which is
the actual cost driver — everything else is inference and hosting. Below roughly
R18,000 the operator time is unfunded and the tier loses money on every client
while looking like the flagship. Treat R22,000 as the floor of a range up to
R35,000 depending on workflow count and review cadence, and expect to discover
the true number on the first three clients. **This price is a proposal, not a
decision** — item 2 of [08-DECISION-SHEET.md](08-DECISION-SHEET.md).

### Planned — Nest VM · not for sale

Unchanged from the launch pack: dedicated isolated Linux workspace with
browser/computer capability. Register-interest only until every health gate in
the launch pack passes. Computer use is the reason this tier exists — see
[05-COMPUTER-USE.md](05-COMPUTER-USE.md).

---

## Setup fee

**R15,000 one-off for Managed Team, R6,000 for Managed Operations, waived for
Pilot** *(proposed)*.

The knowledge pack is the expensive part of onboarding and it is real work:
collecting documents, deciding what is approved, structuring it, testing what the
agent gets wrong. Doing that free teaches clients it is worthless and teaches us
to rush it. The Pilot waiver is deliberate — Pilot exists to prove delivery, and
a fee at that stage buys friction we do not need yet.

---

## What we must not sell

Carried forward from the launch pack, still binding, and now with two additions
specific to the team model:

- no claim of POPIA compliance until a compliance assessment exists;
- no uptime, always-on or SLA language;
- no autonomous outbound messaging;
- no live Shopify, CRM, payments or Meta integration until tested per account;
- no instant provisioning;
- no language-count claims;
- **no claim that agents work while nobody is watching** — the approval gate is
  the product, and describing it as autonomy destroys the thing being sold;
- **no claim that the workspace is compliant infrastructure** — Buzz is
  self-hostable and auditable, which is not the same as certified.

---

## How to sell it

### The sequence

1. **One reference client first.** Deliver a Managed Team for one company, by
   hand, at Pilot or Operations price, and accept it will be unprofitable. What
   you are buying is the right to describe it.
2. **Sell the record, not the demo.** After the first client, the asset is an
   exportable activity log showing agents doing work with human approvals
   attached. Show that. It cannot be faked and no competitor has it.
3. **Sell into the layer above.** The ecosystem chain says Super Agents sells to
   the top 20–100 companies per country. Those buyers have procurement, and
   procurement asks for exactly the audit trail this architecture produces.
4. **Only then price up.** Move to R22,000+ once three clients have renewed.

### The qualification filter

Take the client if the workflow is repeated often, currently manual, easy for a
human to check, and valuable when done consistently.

Refuse if it requires autonomous payments, unsupervised legal or medical
decisions, access to everything on day one, or if the client's real ask is
headcount reduction on a deadline. That last one is the dangerous sale: it sets
an expectation the approval gate structurally cannot meet, and it is how managed
service businesses acquire their first lawsuit.

### What to say when asked "is this just ChatGPT with extra steps"

Yes, partly, and that is the point. The model is a commodity. What the client
cannot assemble themselves is the configured knowledge, the defined permissions,
the approval discipline, the audit record and a person accountable when it goes
wrong. Say that plainly. Buyers in this category have been pitched magic for
three years and are exhausted by it — the honest answer now outperforms the
impressive one.

---

## Unit economics to validate on client one

Do not guess these. Measure them on the first delivery and revise the price.

| Line | What to measure |
|---|---|
| Operator hours per client per month | The only number that matters. Everything else is small. |
| Inference cost per workflow run | Per model, per workflow. Expect surprises on long contexts. |
| Onboarding hours to first useful output | Drives the setup fee. |
| Approval events per week | High counts mean the boundary is drawn wrong and the client is doing our job. |
| Escalations per week | The leading indicator of churn. |
| Knowledge pack corrections per week | Should fall over time. If it does not, the pack was never right. |

The failure mode for this business is not lack of demand — it is a flagship tier
priced below the cost of the human attention it promises. These six numbers are
how you avoid it.

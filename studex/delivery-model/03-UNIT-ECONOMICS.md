# Does R5,000/month Work?
**Prepared by:** Robusca Romanov | **Date:** 2026-08-25
**FX:** USD/ZAR 15.95–16.02 on 2026-08-25 ([XE](https://www.xe.com/currencyconverter/convert/?Amount=1&From=USD&To=ZAR), [Trading Economics](https://tradingeconomics.com/south-africa/currency)). **R16.00 used throughout.**

---

## Verdict

> **The price is defensible and the offer is strong. But this is not SaaS — it is a
> productised managed service, and it only works if human time per client is capped
> contractually.**

Gross margin lands around **44%** at steady state. That is an agency margin, not a software
margin, and the difference matters for valuation, hiring and what you can promise. The good
news: there is a clean path from 44% to roughly 67% as the control plane absorbs the manual
work — and that path is the actual business plan.

**Three clients is a pilot, not a business.** Break-even is around twenty-one.

---

## Cost per client, per month

### Infrastructure

| Line | Low | High | Notes |
|---|---|---|---|
| Inference (own keys via LiteLLM) | R300 | R900 | The variable that matters. Heavily usage-dependent |
| Compute — tenant runtime | R240 | R400 | 2 vCPU / 4GB per tenant, plus sandbox bursts |
| WhatsApp Business API | R100 | R300 | Conversation-based pricing |
| Runable (1 Pro seat shared ~5 clients) | R160 | R160 | $50 ÷ 5. Delivery tool, not resold |
| Memory + vector storage | R50 | R150 | Postgres + pgvector |
| **Infra subtotal** | **R850** | **R1,910** | **midpoint ≈ R1,200 (24% of revenue)** |

Infrastructure is not the problem. At 24% of revenue it is comfortable.

### Human time — the binding constraint

| Activity | Hours/client/month | Notes |
|---|---|---|
| Founder call + prep/follow-up | 0.5 | Amortised; front-loaded in month 1 |
| Account management, escalations | 2.0 | The number that creeps |
| Agent supervision + output QA | 1.5 | Falls as prompts and skills mature |
| Weekly training (one-to-many) | 0.1 | 2 hrs ÷ 20 clients. Scales beautifully |
| **Steady state** | **~4.1 hrs** | at R450/hr loaded ≈ **R1,850** |

### Steady state

| | Per client / month |
|---|---|
| Revenue | **R5,000** |
| Infrastructure | (R1,200) |
| Human delivery | (R1,850) |
| **Contribution** | **R1,950** |
| **Gross margin** | **39–44%** |

**Month one is different.** Onboarding — Brain ingestion, tool connection, first deliverable —
runs 5–6 hours on top, roughly R2,500. So month one is around break-even per client and
payback lands early in month two. For a subscription business that is a healthy shape; the
cost of acquisition is largely embedded in delivery rather than paid to a platform.

---

## Break-even

Assumed fixed monthly overhead, lean:

| Line | Monthly |
|---|---|
| Control plane hosting baseline | R3,000 |
| Runable seats (2 Pro) | R1,600 |
| Tooling, monitoring, misc | R2,000 |
| Core team | R40,000 |
| **Total fixed** | **R46,600** |

At R1,950 contribution per client:

| Clients | Revenue | Contribution | Net | Reality |
|---|---|---|---|---|
| **3** | R15,000 | R5,850 | **(R40,750)** | Funded pilot. Its job is receipts, not profit |
| 10 | R50,000 | R19,500 | (R27,100) | Learning phase. Delivery cost becomes knowable |
| **21** | R105,000 | R40,950 | **≈ break-even** | The real milestone |
| 50 | R250,000 | R97,500 | R50,900 | A business |
| 100 | R500,000 | R195,000 | R148,400 | ≈ R1.8M/year net, and the margin is improving |

Say the pilot out loud for what it is: **the first three clients are not a revenue play, they
are the case studies.** The single biggest blocker identified in the launch strategy was that
we have no instrumented outcome numbers for any client. Three properly instrumented pilots at
R5,000/month fixes that — which makes this pilot strategically load-bearing well beyond its
R15,000.

---

## Where the model breaks

Four specific failure modes, each with a fix.

### 1. Video-heavy clients

A client wanting continuous video needs Runable Unlimited dedicated — $200 = **R3,200, i.e.
64% of their subscription on one tool.** Contribution collapses to near zero.

**Fix:** video is an add-on line, not an inclusion. Bundle a fixed monthly allowance
(e.g. four short videos) and bill beyond it. Video is the most credit-intensive operation on
the platform and audio roughly doubles it — this needs a metered boundary, not goodwill.

### 2. The founder call does not scale linearly

Ten minutes each is fine until it isn't:

| Clients | Founder hours/month | Verdict |
|---|---|---|
| 50 | 8.3 | Sustainable |
| 100 | 16.7 | Tight |
| 200 | 33+ (plus churn replacement) | It's now a full-time job you can't quit |

**Fix — and do this before it hurts:** move the standard tier to a **weekly cohort call**,
ten to fifteen founders in a group session. That preserves the promise ("you get access to the
founder") while removing the ceiling, and a cohort room is a better experience than a rushed
one-to-one anyway. Keep the private 1:1 as an explicit differentiator for R10,000+ tiers, where
the economics support it.

### 3. Scope creep in human time

The model dies quietly here. At 10 hours a month a client costs R4,500 in labour plus R1,200
infra — **R5,700 against R5,000 revenue.** One demanding client silently funded by four
profitable ones.

**Fix:** contract a stated monthly allowance of human hours, track it in the ledger, bill
overage or upgrade the tier. The ledger already exists for the audit claim; point it at
internal hours too. What is not measured here will not be controlled.

### 4. The ecosystem promise has a cold start

"Access to partners, ecosystem, marketplace" is compelling and, at three clients, untrue.
There is no ecosystem yet — the same two-sided problem that argued for deferring Execution
Exchange.

**Fix:** promise what exists. For the first cohort, sell **introductions** — manual, curated,
by the founder — rather than "marketplace access." Hand-made intros at low volume are higher
quality than any matching engine, and honest. Convert to platform language once density is
real, and let the early clients feel they got the better deal, because they did.

---

## Who can actually afford this

R5,000/month is R60,000/year. That sets the customer profile whether we choose it or not:

- ✅ **SMEs at R5M+ turnover** — R60k/year is a real but ordinary line item against marketing or ops
- ✅ **Funded startups** — post-raise, buying capability instead of headcount
- ✅ **Professional firms** (engineering, legal, consulting) — one extra won proposal repays the year
- ❌ **Pre-revenue founders** — cannot and should not
- ❌ **Informal and micro-business** — off by an order of magnitude

This has a direct consequence for the architecture diagram. The **Studex Rise** tier
("100–1,000 startups per country") mostly cannot pay R5,000/month. That tier needs the
**R950 Ghost** product, with R5,000 as the upgrade once they are funded or trading. The
escalator only works if each step is priced for who is standing on it.

---

## Where R5,000 sits in the ladder

The launch strategy proposed Ghost at R950, inheriting an existing R3,500 Starter. R5,000 does
not slot in beside R3,500 — it **replaces** it, because what is being described here (agents
build your company, ecosystem, weekly training, founder access) is a far richer offer than
"Soul agent configured."

| Tier | Price | What it is | Delivery |
|---|---|---|---|
| **Ghost** | R950 | Memory only. Their Business Ghost, self-serve | Fully automated |
| **Company Builder** | **R5,000** | Managed agents, ecosystem, weekly training, founder call | Concierge → productised |
| **Business** | R10,000 | Full agent workforce, integrated, 1:1 founder access | Managed |
| **Enterprise** | R20,000 | White-glove, custom training, dedicated infra | Bespoke |

Four tiers, real jumps between them, and each one a natural upgrade from the last. The Ghost
tier is what makes the R5,000 tier sellable — a client who already has memory in the system is
being asked for an increment, not a decision.

---

## Two financing notes

**Annual prepay funds the build.** Offer ten months for twelve on annual — R50,000 upfront per
client. Three pilot clients prepaid is **R150,000**, which is roughly what a v1 control plane
costs to stand up. The pilot can fund its own infrastructure, which is a much better story
than raising for it.

**Do not call it SaaS to investors yet.** At 44% gross margin with concierge delivery this
prices as a services business — very roughly 1× revenue — where real SaaS at 75–85% margin
attracts several times ARR. Calling it SaaS before the margin supports it invites exactly the
diligence question you cannot answer, in the same market that just got sceptical of AI
revenue claims. Describe it accurately as a productised service with a software layer under
construction, show the margin curve as automation lands, and re-rate honestly when the numbers
arrive.

---

## The path from 44% to 67%

This is the plan, not an aspiration. Each step removes human hours:

| Step | What it automates | Hours saved |
|---|---|---|
| One-command provisioning (steps 2–8) | Onboarding setup | 3–4 one-off |
| Recorded training library + self-serve | Live weekly delivery | 0.1 → ~0 |
| Skill library per vertical | Agent supervision, QA | 1.5 → 0.5 |
| Self-serve tool connection | Credential wrangling | 1 one-off |
| Client-facing ledger dashboard | "What did you do this month?" | 0.5 |

Get steady-state human time under one hour per client and the numbers become:

| | Per client / month |
|---|---|
| Revenue | R5,000 |
| Infrastructure | (R1,200) |
| Human delivery | (R450) |
| **Contribution** | **R3,350** |
| **Gross margin** | **67%** |

At that point it is genuinely a software business, break-even drops to about fourteen clients,
and 100 clients yields roughly R288,000/month contribution. **The concierge phase is not a
compromise — it is how you learn which 80% to automate.** Build the automation for the
patterns three real clients actually exhibit, not the ones we imagine now.

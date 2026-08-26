# Pricing and Positioning
**Prepared by:** Robusca Romanov | **Date:** 2026-08-26
**FX:** R16.00/USD (spot 15.95–16.02, 25 Aug 2026)

---

## The comparables, first

Everything below is calibrated against what the market actually charges today:

| Platform | Entry | Mid | Top | Model |
|---|---|---|---|---|
| **Runable** | $25 Starter | $50+ Pro | $200 Unlimited | Credits, no rollover |
| **MuleRun** | Free (200 credits/day) | ~$32 Super | ~$160 Pro | 100 credits = $1. 20% creator commission |
| **Base44** | $16 Starter | $40 Builder | $160 Elite | Dual credits: build + runtime |

**The ceiling for self-serve agent tooling is roughly R2,500–R3,200/month.** That is a hard
constraint on positioning: at R5,000, Studex sits *above* every one of these. If a prospect
compares us feature-for-feature against Runable or MuleRun, **we lose** — they have more
compute, more agents and lower prices.

So the R5,000 tier can never be sold as tooling. It is sold as a managed outcome: memory that
persists, agents somebody else supervises, ecosystem access, and a founder who answers. Tooling
is a commodity heading toward R500. Memory and accountability are not.

---

## Three layers

Every platform that works at this price point separates access from consumption. Do the same.

```
LAYER 1  SUBSCRIPTION   access + memory + seats + support     recurring, predictable
LAYER 2  CREDITS        the agent work actually consumed      metered, variable
LAYER 3  MARKETPLACE    skills, services, extras              one-off + revenue share
```

Why credits rather than unlimited: agent work varies enormously in cost — a video with audio
can cost fifty times a document. Unlimited pricing invites the one client who destroys the
margin, which is exactly what happened to Client B in the [delivery model](../delivery-model/03-UNIT-ECONOMICS.md).
Credits make cost visible to the client and protect the P&L. They also make the "extra services
cost extra" idea legible instead of feeling like a surprise bill.

---

## Layer 1 — the ladder

| Tier | Price/month | Credits included | Memory | Who it's for |
|---|---|---|---|---|
| **Day Pass** | **R149** *(once off, 24h)* | 500 | not retained | Trial. Replaces the free day |
| **Ghost** | **R950** | 1,000 | ✅ persistent | Memory only, self-serve |
| **Standard** | **R2,500** | 4,000 | ✅ | Solo founder, micro-business |
| **Company Builder** | **R5,000** | 10,000 | ✅ | **The core offer** |
| **Business** | **R10,000** | 25,000 | ✅ | Full agent workforce |
| **Enterprise** | **R20,000+** | 60,000+ | ✅ dedicated | White-glove, own infrastructure |

**Annual: ten months for twelve** (~17% off). This is the working-capital lever — three
Company Builder clients prepaid is R150,000, roughly what the control plane costs to stand up.

Note the deliberate design: **credits included are only 20–40% of subscription value.** At
R5,000, the 10,000 credits are worth R2,000 at list. The remaining R3,000 buys memory, access,
supervision, ecosystem and support. That is honest, it is legible to the client, and it makes
credit top-ups a genuine second revenue line rather than a penalty.

The **Standard** tier at R2,500 is new and it matters. R950 to R5,000 is too big a jump for a
solo founder, and the Studex Rise tier ("100–1,000 startups per country") cannot afford R5,000.
Standard is where that population actually lives.

---

## Layer 2 — credits

**1 Studex Credit = R0.20.** So 1,000 credits = R200. Round, easy to explain, sits close to
MuleRun's 100-credits-per-dollar so we are not obviously expensive on the unit.

Indicative consumption — **calibrate against real usage in the pilot before publishing:**

| Action | Credits | ≈ Rand |
|---|---|---|
| Chat turn / simple query | 1–3 | R0.20–0.60 |
| Outreach email drafted + sent | 3–8 | R0.60–1.60 |
| Monitoring loop, per cycle | 5–15 | R1–3 |
| Image | 10–30 | R2–6 |
| Document — proposal, report, deck | 20–60 | R4–12 |
| Deep research sweep (`last30days`) | 80–150 | R16–30 |
| Website build | 400–800 | R80–160 |
| **Short video with audio** | **600–1,500** | **R120–300** |

Video is the cost centre — on Runable it is the most credit-intensive operation and audio
roughly doubles it. Publishing that number is a feature, not a risk: it is why our margin
survives and why the client trusts the meter.

**Top-ups**, with volume discount to encourage prepay:

| Bundle | Price | Effective |
|---|---|---|
| 1,000 | R200 | R0.200/credit |
| 5,000 | R900 | R0.180/credit |
| 25,000 | R4,000 | R0.160/credit |

Credits expire at the end of the billing cycle on monthly plans; annual plans carry a rolling
three-month buffer. Say so at checkout in plain language — nobody should discover an expiry.

---

## Layer 3 — marketplace and extras

### Skills

Clients start on a standard configuration and buy skills. Two pricing routes: one-off purchase
(R150–R1,500 per skill) or credit-metered per run.

**Studex takes 20% of skill revenue at launch, creator keeps 80%.**

That number is deliberate. MuleRun — the largest agent marketplace — takes 20%, so 20% is the
figure creators already recognise as fair; anything higher and they publish there instead of
here. **At launch the scarce side of this market is creators, not clients, so subsidise
creators.** Raise to 25–30% only once there is genuine demand pull, and grandfather the early
creators when you do. Marketplaces that tax the scarce side early do not get a second attempt.

### Extra services — fixed price, not credits

These need human quality control, so price them as products:

| Service | Price |
|---|---|
| Website, built and deployed | R3,500 |
| Brand video, up to 60s | R1,800 |
| Pitch deck / investor pack | R900 |
| Market research report | R1,200 |
| Brand identity pack | R2,500 |
| Certification-readiness pack | R4,500 |

Fixed prices are also where Runable earns its keep — these are produced *by our team* on a
Runable Pro seat, which is entirely within its terms. See
[`05-AGENT-LOOPS-AND-STACK.md`](05-AGENT-LOOPS-AND-STACK.md).

---

## The day pass, and the free-trial question

You asked about a free day and about renting an agent for a few hours. My recommendation
differs on the first one.

### Do a cheap day, not a free day — R149

Three reasons:

1. **A free day costs real money.** Inference and a dedicated VM for 24 hours is a genuine
   cost, and free attracts the people least likely to buy.
2. **Paying once, even a little, transforms conversion.** R149 is an impulse purchase that
   filters for intent. Someone who has paid R149 is a warm prospect; someone who used a free
   day is a statistic.
3. **The free tier is already commoditised.** MuleRun gives 200 credits *every day*, free,
   forever. We cannot win a free-tier race against that and should not enter it.

If a free option is required for marketing reasons, mirror MuleRun's *shape* rather than its
generosity: a small daily allowance (200 credits), no VM persistence, no memory retention.
Free should demonstrate capability, never deliver a project.

**One hard rule on trial billing.** MuleRun has a documented complaint where clicking a
"7-day free trial" on an annual plan charged the full annual amount immediately. We are selling
trust and auditability — a billing surprise in the first 24 hours is unrecoverable and would
hand our own critics the story. Trial terms must be unambiguous, the charge date stated on the
button, and cancellation one click.

### Rent-an-agent

| Product | Price | Credits |
|---|---|---|
| Sprint — 4 hours | R99 | 250 |
| Day Pass — 24 hours | R149 | 500 |
| Weekend — 72 hours | R249 | 1,000 |

**But sell outcomes, not hours.** Time-based rental is how *we* think about supply; it is not
how anyone buys. "Rent an agent for four hours" asks the customer to estimate something they
cannot estimate. "Get a working website by tomorrow, R3,500" is the same capacity sold as a
result, and it converts far better.

Keep the time-based passes for exactly one job — the trial, where the outcome genuinely *is*
"find out whether this is real." Everywhere else, name the deliverable.

---

## EUDR pricing — and who pays

Separate model, and one structural point decides it.

**The EUDR obligation falls on the EU operator — the importer — not the farmer.** So the
willingness to pay sits on the buyer side. Sell compliance to the importer or the exporter, and
in doing so the "don't extract from smallholders" problem solves itself.

| Line | Basis | Indicative |
|---|---|---|
| Plot mapping and record creation | per plot | R25–40 |
| Cooperative compliance subscription | per year, banded by members | R15,000–40,000 |
| Due diligence statement | per shipment | R500–1,500 |
| Certification-readiness pack | per cooperative | R4,500 |

All four numbers need validation in the Phase 2 pilot against the real alternative — what a
cooperative or importer currently pays a consultant to do this manually. That comparison is the
price anchor, and I do not have it yet. Establish it in the first conversation with a buyer.

---

## Positioning

You asked how to position this. The wedge from the [launch strategy](../launch-2026-08/00-POSITIONING.md)
still holds and this extends it.

**Do not position as "AI agents for African business."** Crowded, and it competes directly with
platforms that are cheaper and more powerful than us.

Position as:

> ## An operating system for companies that don't have one.

Then the substance, which is the escalator argument made concrete:

> **Big companies have three things small companies don't: institutional memory, an execution
> team, and access to markets. Studex rents you all three by the month.**

That sentence does real work. It names the actual asymmetry, it is repeatable by a stranger, it
maps exactly onto Memory → Workforce → Market, and it never once says the word "agentic" —
which, in the month Gartner named agent-washing a procurement hazard, is an advantage.

For Rwanda and government audiences, the frame changes from product to capability transfer:

> **Rwanda's AI policy names agriculture a priority and the new AI Agency has a
> commercialisation mandate with a funding gap. We bring a working deployment they didn't have
> to pay for — coffee traceability that keeps Rwandan exports EU-compliant, running on Rwandan
> infrastructure, with the data staying in Rwanda.**

Aligned with their stated policy, urgent because of a real deadline, and cheap for them to say
yes to. That is what gets a meeting; a platform pitch does not.

---

## Sanity check on the numbers

Company Builder at R5,000 with 10,000 credits included:

| | Per client / month |
|---|---|
| Revenue | R5,000 |
| Credits consumed if fully used (at ~R0.09 true cost) | (R900) |
| Compute, channel, storage | (R700) |
| Human delivery, steady state | (R1,850) |
| **Contribution** | **R1,550** |
| **Margin** | **31%** |

Lower than the 44% modelled previously, because including 10,000 credits is genuinely more
generous than the earlier assumption. Two ways to read that: either trim the included credits
to 8,000, or accept the thinner margin because credit top-ups and Layer 3 services carry the
real upside. **I would accept it** — the included allowance is what makes the tier feel
substantial against Runable and MuleRun, and clients who exhaust it are the clients who expand.
But watch it monthly, and revisit the allowance the moment average consumption exceeds 80%.

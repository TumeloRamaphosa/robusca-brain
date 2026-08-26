# Ecosystem, Pricing and Rwanda — August 2026
**Date:** 2026-08-26 | Builds on [`launch-2026-08/`](../launch-2026-08/README.md) and [`delivery-model/`](../delivery-model/README.md)

Answers: how to deliver the client OS as a service, what to charge, how to position it, how the
Rwanda and coffee plan works, and how the agent loops and tool stack fit together.

| Doc | What's in it |
|---|---|
| [`01-SCOPE-AND-SEQUENCING.md`](01-SCOPE-AND-SEQUENCING.md) | The eight businesses in the brief, why they're really two companies, the EUDR bridge, and the four-phase order |
| [`02-PRICING-MODEL.md`](02-PRICING-MODEL.md) | Three-layer pricing, the full ladder, credits, marketplace split, day pass, EUDR pricing, positioning |
| [`03-RWANDA-COFFEE.md`](03-RWANDA-COFFEE.md) | The EUDR deadline wedge, why we can't certify, why the 20% cut backfires, NAEB export requirements, the Rwanda institutional opening |
| [`04-PAYMENT-RAIL.md`](04-PAYMENT-RAIL.md) | Rwanda's Law N° 023/2026 and SA's regime, and the closed-loop path that's legal in both |
| [`05-AGENT-LOOPS-AND-STACK.md`](05-AGENT-LOOPS-AND-STACK.md) | The research loops done honestly, and what Runable, MuleRun, Base44 and OpenHands are each for |

---

## The short version

**There's one genuinely excellent idea in the brief, and it wasn't on the list.** From
**30 December 2026** — four months away — every coffee shipment entering the EU must carry a due
diligence statement with geolocation data for all production plots. That covers ~95% of EU
coffee imports, and the May 2026 simplification package added **voluntary grouping**, which lets
smallholder cooperatives file consolidated declarations. That provision exists specifically for
African smallholder coffee.

That is a legally mandatory, precisely dated, data-shaped problem sitting on every Rwandan
cooperative that sells to Europe. It needs plot records, persistent memory, document generation
and an audit trail — which is the Business Ghost applied to a cooperative instead of a company.
It requires no export licence and no certification accreditation. And the obligation falls on the
EU **importer**, not the farmer, so the willingness to pay sits on the buyer side.

That single fact reorganises the coffee business: stop being a middleman taking 20% of farmer
revenue, become the compliance layer that keeps Rwandan coffee in the European market. Better
margins, no regulatory exposure, defensible in a headline, and it's the reason the Rwanda
government conversation exists.

**Two things in the brief can't be done.** We cannot certify coffee — Fairtrade certification is
carried out solely by FLOCERT, ISO 17065-accredited and audited by DAkkS, and ISO 17065 requires
the certifier to be independent of who it certifies. Taking a cut of the coffee *and* certifying
it is the exact arrangement the standard exists to prevent. We can sell certification
*readiness*, which is unregulated and genuinely valuable. And the stablecoin rail is unlawful as
described in both jurisdictions — Rwanda's Law N° 023/2026 (in force 28 May 2026) bars virtual
assets as a general means of payment without BNR authorisation, its implementing regulations
aren't published so compliance can't even be determined, and unauthorised operation is criminal.
The good news: **closed-loop systems are expressly carved out of Rwanda's virtual-asset
definition** — the same recommendation made for South Africa last week, now confirmed in statute.

**The 20% farmer cut also backfires commercially.** The Fairtrade minimum is $1.80/lb ($2.40
organic). Take 20% of gross and the farmer's net may fall below the floor, making the coffee
ineligible for the certification that generates the premium. Charge on the **uplift** above a
documented baseline instead — 20% of the improvement is generous to us and leaves the farmer
strictly better off.

**Pricing: three layers.** Subscription for access and memory, credits for work consumed,
marketplace for skills and extras.

| Tier | Price | Credits |
|---|---|---|
| Day Pass (24h) | R149 once-off | 500 |
| Ghost | R950/mo | 1,000 |
| **Standard** *(new)* | R2,500/mo | 4,000 |
| **Company Builder** | **R5,000/mo** | 10,000 |
| Business | R10,000/mo | 25,000 |
| Enterprise | R20,000+/mo | 60,000+ |

1 credit = R0.20. Skills marketplace: **Studex takes 20%, creator keeps 80%** — matching
MuleRun, because at launch creators are the scarce side and taxing the scarce side early doesn't
get a second attempt. Extra services (website R3,500, video R1,800, deck R900) priced as fixed
products, not credits, because they need human QA.

**On the free day: do a cheap day instead — R149.** A free day costs real inference money and
attracts people who won't buy; paying once, even a little, transforms conversion. And we cannot
win a free-tier race against MuleRun, which gives 200 credits *every day* forever. Also — sell
outcomes, not agent-hours. "Rent an agent for four hours" asks the customer to estimate
something they can't. "Working website by tomorrow, R3,500" is the same capacity sold as a
result. Keep time-based passes only for the trial.

**The hard pricing constraint:** self-serve agent tooling tops out around R2,500–3,200/month
(Runable $200, MuleRun ~$160, Base44 $160). At R5,000 we sit above all of them, so we lose any
feature-for-feature comparison — they have more compute and lower prices. The R5,000 tier must
be sold as managed outcome, never as tooling.

**Positioning:** *"An operating system for companies that don't have one."* Then: *"Big
companies have three things small ones don't — institutional memory, an execution team, and
market access. Studex rents you all three by the month."* Note it never says "agentic," which in
the month Gartner named agent-washing a procurement hazard is an advantage.

**The research loops need reframing.** The 3/6/12/24-hour scheduling is right; "agents go out and
find ways to make money" is not. Open-ended money discovery produces plausible, unverifiable
suggestions forever, and in a business whose positioning is "here are our receipts," a loop that
can't produce one is the most dangerous thing we could build. Every loop needs a specific
question, a **verifiable** output with a source, and a human decision gate — tender watch, price
watch, document expiry, pipeline decay. The money doesn't come from discovering opportunities
nobody thought of; it comes from never missing the ones already yours. Also drop the 3-hour
cadence: at 50 clients that's 400 runs a day for one loop, and the credit cost lands on our margin.

**Tool stack:** Runable for internal production only (your agent marketing team is exactly the
right use). **MuleRun is a real opportunity** — unlike Runable it wants third-party agents,
Creator Studio handles payments and distribution, takes 20%, and it lets us test the day-pass and
skill-pricing model without building a marketplace. Base44 for the client portal MVP, never for
tenancy or the ledger. OpenHands as the runtime we operate.

**On `startup-skill`:** I could only read repository metadata, not the skill contents, so it isn't
cleared. `AGENTS.md` requires a written vetting report first. Worth noting 851 stars against 0
forks is an unusual ratio, and its scope overlaps heavily with the `last30days` skill we already
control — reading it and writing our own is the safer hour.

---

## The order

| Phase | What | Blocked? |
|---|---|---|
| **1** | Sell the OS — the ladder above, one client then three | No. Start now |
| **2** | EUDR pilot: one Rwandan cooperative, one accepted declaration | No. Deadline-driven, run in parallel |
| **3** | Rwanda institutional — approach the AI Agency with a working deployment | Wait for Phase 2's receipt |
| **4** | Trade layer + closed-loop credits. Stablecoin to the CMA/BNR sandbox as a separate entity | Needs Phase 2 supply |

The Rwanda timing is unusually good: the **National AI Agency was approved by Cabinet on 8 June
2026** — eleven weeks old — with a commercialisation mandate, agriculture named a priority sector
in the 2023 AI Policy, an acknowledged data-governance gap, and a USD 76.5M implementation plan
against roughly USD 1.2M mobilised. An under-funded new agency needs demonstration projects it
didn't have to pay for. Bring one, don't pitch one. Enter via the ICT Chamber and C4IR rather
than the ministry, and design data residency in from the start — the Data Protection and Privacy
Law is in force with an established regulator, and "the data stays in Rwanda" is one of the
strongest things we can offer.

## Do this week

1. **Add the Standard R2,500 tier** — the gap from R950 to R5,000 is too wide, and Studex Rise can't afford R5,000
2. **Take the token out of every deck, diagram and script** pending written counsel in both jurisdictions
3. **Stop describing coffee certification as ours** — change to certification readiness
4. **Reprice the farmer arrangement to uplift-share**, and target the importer for compliance revenue
5. **Find one Rwandan cooperative already exporting to the EU.** Four months to the deadline
6. **Publish credit costs**, including that video is the expensive one
7. **Buy one Runable Pro seat** for the marketing agent team. No clients on it
8. **Vet `startup-skill` properly** or write our own

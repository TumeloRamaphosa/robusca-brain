# Scope and Sequencing
**Prepared by:** Robusca Romanov | **Date:** 2026-08-26

---

## What was described

Reading the brief back, it contains eight businesses:

1. **Client Agent OS** — brain, calendar, workflows, web/mobile/desktop, offline option
2. **Skills marketplace** — clients start on standard, buy skills, agents have tools
3. **Agent day-rental** — try for a day, rent an agent for a few hours
4. **Rwanda government partnership** — national-level engagement
5. **Coffee farmer aggregation** — 80/20 revenue split, market access, "sell, grow, build, learn"
6. **Coffee certification**
7. **Global Markets trade exchange** — traders get market access to each other, recorded in the ecosystem
8. **Stablecoin payment rail** — blockchain, OpenClaw running it, Base44 agents for sales, payment gateway

Every one of them is a real business. That is the problem. They have different customers,
different regulators, different capital needs and different clocks, and three of them cannot
legally start yet.

**The single best idea in the brief is not on that list.** It is buried inside items 5 and 6,
and it is the one thing that connects the software business to the coffee business without
regulatory exposure. It is below.

---

## There are really two companies here

| | **A — Studex OS** | **B — Studex Trade** |
|---|---|---|
| Sells | Software + managed agents | Physical commodity + market access |
| Customer | Companies | Buyers, importers, roasters |
| Revenue | Recurring subscription + credits | Margin per container, per deal |
| Capital need | Low — engineering | **High — working capital, inventory, logistics** |
| Regulator | Data protection | NAEB, EUDR, certification bodies, customs |
| Clock | Weeks | Seasons |
| Failure mode | Churn | A single bad shipment |

Items 1, 2, 3 and most of 8 are company A. Items 5, 6, 7 are company B. Item 4 serves both.

**Why conflating them is dangerous.** Company B's regulatory surface — export licensing,
certification, EUDR, payment authorisation — will slow company A to a crawl if they share one
roadmap and one balance sheet. And company B's working capital appetite will starve company A
of the engineering it needs. Commodity trade eats cash; software eats time. Run them on one
P&L and the commodity side wins every budget argument, because its deadlines are physical.

Keep them as separate entities, separate P&Ls, and let A sell software *into* B's value chain.
That is where the good idea lives.

---

## The bridge: EUDR compliance

This is the recommendation I would defend hardest.

**From 30 December 2026, every shipment of coffee entering the EU must carry a due diligence
statement confirming it is deforestation-free, with geolocation data for all production plots.**
That deadline applies to large and medium operators, which is roughly 95% of EU coffee imports.
Micro and small enterprises have until 30 June 2027. The May 2026 simplification package added
soluble coffee to scope — and, critically, introduced **voluntary grouping**, which lets
smallholder cooperatives file consolidated declarations instead of per-shipment filings. That
provision was designed specifically for African smallholder coffee.

Read what that actually is: **a legally mandatory, precisely dated, data-shaped problem, sitting
on every Rwandan coffee cooperative that sells to Europe, four months out, with a compliance
mechanism purpose-built for cooperatives.**

That is not a market you have to create. It is a deadline.

And it is company A's shape, sold to company B's customers:

| EUDR needs | What Studex already has or is building |
|---|---|
| Geolocation data for every production plot | Offline-first field capture — see below |
| Plot-level records that survive staff turnover | Business Ghost — persistent memory |
| Consolidated cooperative declarations | Multi-member tenant structure |
| Due diligence statements per shipment | Document generation from records |
| An audit trail a European buyer can interrogate | The per-tenant ledger |
| Ongoing monitoring as plots and members change | Scheduled agent loops |

**What this reframes.** The coffee play stops being "we take 20% of a farmer's money for market
access" and becomes "we are the compliance layer that keeps Rwandan coffee in the European
market." The second version needs no export licence, creates no certification conflict, has a
buyer-side willingness to pay, is defensible in a headline, and is genuinely aligned with
"grow the African AI revolution" rather than in tension with it.

It also gives the Rwanda government conversation a reason to exist that is not a product pitch.

**Offline-first matters here, and it is the honest version of the offline request.** Fully
offline agents are not realistic — inference needs compute. But offline *data capture* is
essential and unglamorous: field officers walking plots in rural Rwanda with no signal, recording
geolocation and member data on a phone, syncing when they reach coverage. Plus cached read-only
memory on device, and small local models for basic classification. Frame it as offline-first
capture, not offline AI. For EUDR it is a requirement, not a feature.

---

## What cannot start yet

Three items are blocked, and it is better to know now.

**Coffee certification — not available to us at all.** Fairtrade certification is carried out
exclusively by FLOCERT, an ISO 17065-accredited body audited annually by DAkkS and Fairtrade
International. Rainforest Alliance works through authorised certification bodies. ISO 17065
requires the certifier to be independent of the entities it certifies — so taking a share of
coffee revenue and certifying that same coffee is a structural conflict that would invalidate
the certification. Detail in [`03-RWANDA-COFFEE.md`](03-RWANDA-COFFEE.md).
**What we can sell instead:** certification *readiness* — gap analysis, documentation, data
collection, audit preparation. Unregulated, genuinely valuable, and the natural companion to
the EUDR work.

**The stablecoin rail — blocked in both jurisdictions.** Rwanda's Law N° 023/2026 took effect
28 May 2026: CMA is lead regulator, only incorporated entities may be licensed, and virtual
assets **may not be used as a general means of payment unless the BNR authorises it** — which
directly blocks paying farmers or settling trades in stablecoin. Implementing regulations are
not yet published, so compliance requirements cannot even be determined. Unauthorised operation
carries criminal penalties. South Africa adds FSCA CASP licensing, FIC registration and separate
FinSurv cross-border authorisation. There is a clean path, and it is closed-loop credits —
expressly carved out of Rwanda's definition of a virtual asset. Detail in
[`04-PAYMENT-RAIL.md`](04-PAYMENT-RAIL.md).

**The trade exchange — cold start, same as before.** "Traders get market access to each other"
needs traders on both sides. At three clients there is no exchange. This was the argument for
deferring Execution Exchange and it has not changed. The coffee cooperatives are a supply side
worth building first.

---

## The order

Four phases. The rule: each phase must produce revenue or proof before the next begins.

### Phase 1 — Sell the OS (now)
The R950/R5,000 ladder from [PR #23](../delivery-model/README.md), plus the new day pass and
credit model in [`02-PRICING-MODEL.md`](02-PRICING-MODEL.md). One client first, then three.
Nothing here is blocked. This funds everything else.

### Phase 2 — EUDR pilot, Rwanda (start in parallel, small)
One cooperative. Map plots, build the record, produce one consolidated declaration a European
buyer accepts. That single accepted declaration is worth more than any deck — it is a Tier 1
receipt in a category where nobody has one yet, four months before a hard deadline.
Runs parallel to Phase 1 because the deadline does not wait, but resourced as a pilot, not a
programme.

### Phase 3 — Rwanda institutional (follows Phase 2's receipt)
Approach the National AI Agency with a working deployment, not a proposal. The Agency was
approved by Cabinet on 8 June 2026, has a commercialisation and industry-growth mandate,
names agriculture a priority sector, has an acknowledged data-governance gap, and has a
USD 76.5M implementation plan against roughly USD 1.2M mobilised. What an under-funded new
agency needs is demonstration projects it did not have to pay for. Bring one.

### Phase 4 — Trade layer and credits (once supply exists)
The exchange becomes real when there are cooperatives and buyers already inside the system.
Closed-loop credits handle settlement. The stablecoin, if still wanted, goes into the CMA/BNR
regulatory sandbox as a separate entity on its own timeline.

---

## Say no to, for now

Not "never" — "not in the next phase", with the reason:

| Item | Why not yet |
|---|---|
| Coffee certification as our service | Structurally unavailable. Sell readiness instead |
| 20% of farmer gross revenue | May breach the Fairtrade price floor and is indefensible in public. Charge on uplift |
| Stablecoin, token, blockchain settlement | Unlawful as described in both jurisdictions until licensed |
| Trade exchange | Cold start. Needs Phase 2's supply side |
| Desktop app and full offline mode | Web plus mobile plus offline capture covers the real need |
| Base44 as the control plane | Fine for the client portal MVP; not for tenancy, memory or ledger |
| "Agents go out and find ways to make money" | Reframe as scheduled monitoring loops with human decision gates. [`05-AGENT-LOOPS-AND-STACK.md`](05-AGENT-LOOPS-AND-STACK.md) |

The discipline is the strategy. Eight businesses launched at once is zero businesses, and the
category is in a credibility recession where the fastest way to lose is to promise broadly and
deliver thinly.

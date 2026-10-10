# Rwanda and Coffee
**Prepared by:** Robusca Romanov | **Date:** 2026-08-26

> Not legal advice. Regulatory positions below need Rwandan counsel and an NAEB conversation
> before anything is committed. What I can state with confidence is which claims are available
> to us and which are not.

---

## The opportunity is real, and it is not the one described

The described plan is: aggregate coffee farmers, take 20% of revenue, give them market access,
do the certification, plug it into Global Markets.

Two parts of that are unavailable to us and one is self-defeating. But underneath it sits a
genuinely excellent business with a hard deadline, and it is worth more than the original.

---

## The wedge: EUDR, deadline 30 December 2026

**Every shipment of coffee entering the EU must, from 30 December 2026, carry a due diligence
statement confirming it is deforestation-free, with geolocation data for all production plots.**

- That deadline covers large and medium operators — roughly **95% of EU coffee imports**
- Micro and small enterprises have until 30 June 2027
- The May 2026 simplification package added soluble coffee (HS 2101.11) to scope
- It also introduced **voluntary grouping**: smallholder cooperatives may file *consolidated*
  declarations rather than per-shipment filings. This provision exists specifically for African
  smallholder coffee

Four months out. Legally mandatory. Data-shaped. And the compliance mechanism is purpose-built
for exactly the cooperative structure we would be working with.

**Who pays.** The EUDR obligation sits on the EU *operator* — the importer — not the farmer.
That single fact reorganises the whole business model. Sell the compliance layer to importers
and exporters, where the legal exposure and the willingness to pay both live. The smallholder
gets the benefit of remaining sellable into Europe without being charged for it.

That is how "we help farmers" stops being a slogan and becomes the actual structure.

**What it requires, mapped to what we have:**

| EUDR requirement | Studex component |
|---|---|
| Geolocation for every production plot | Offline-first field capture on mobile |
| Plot and member records that outlive staff turnover | Business Ghost — persistent memory |
| Consolidated cooperative declarations | Multi-member tenant structure |
| Due diligence statement per shipment | Document generation from the record |
| An audit trail a European buyer can interrogate | Per-tenant append-only ledger |
| Ongoing updates as plots and membership change | Scheduled monitoring loops |

This is the Business Ghost applied to a cooperative instead of a company. Same product, and the
buyer is legally compelled rather than merely persuaded.

**Offline capture is a requirement here, not a feature.** Field officers walking plots in rural
Rwanda have no signal. Capture geolocation and member data on-device, sync on reconnection. This
is the honest version of the offline request — offline *data capture*, not offline inference.

---

## Blocker 1 — we cannot certify coffee

This one is structural and there is no workaround.

- **Fairtrade** certification is carried out exclusively by **FLOCERT**, accredited against
  **ISO 17065** since 2007, audited annually by **DAkkS** (the German national accreditation
  body) and separately overseen by Fairtrade International. Producers apply to FLOCERT; a
  FLOCERT auditor conducts the on-site inspection; a FLOCERT analyst makes the decision.
- **Rainforest Alliance** works through authorised certification bodies selected by the farmer
  or company seeking the audit.
- **Organic** certification likewise runs through accredited bodies.

**And the conflict of interest is the real barrier, not the paperwork.** ISO 17065 exists to
guarantee the certifier is independent of the party being certified. Taking a share of coffee
revenue *and* certifying that same coffee is precisely the arrangement the standard is designed
to prevent. Attempting both would invalidate any certification issued and would be, correctly,
treated as a serious integrity failure.

**What we can legitimately sell — and it is genuinely valuable:**

| Service | Why it's ours to sell |
|---|---|
| Certification-readiness assessment | Gap analysis against the standard. Unregulated |
| Documentation and records preparation | Certification fails on paperwork more than on practice |
| Traceability infrastructure | The system auditors will inspect |
| Audit preparation and support | Getting a cooperative through a FLOCERT audit first time |
| EUDR due diligence data | Adjacent, mandatory, and nobody owns it yet |

Position as **"we get you certified"** in the sense a tax practitioner gets you assessed — we
prepare, the accredited body decides. Never imply we issue the certificate. In a campaign built
on not overclaiming, this is exactly the kind of claim that would be checked.

---

## Blocker 2 — the 20% cut is self-defeating

Not illegal. Just a bad trade, for three reasons.

**It can destroy the premium it's trying to capture.** The Fairtrade minimum price is
**$1.80/lb**, and **$2.40/lb for organic**. Those are floors that must reach the producer.
Take 20% of gross and the farmer's net may fall below the floor — which makes the coffee
ineligible for the certification that generates the premium. The 20% would eat the very margin
that justified it.

**It is indefensible in public.** "South African AI company takes 20% of Rwandan smallholder
coffee revenue" is a headline that writes itself, and it sits badly beside "grow the African AI
revolution." We are also about to publish a campaign premised on not overclaiming and on
treating clients honestly. This is the sort of detail that gets found.

**It prices access rather than value.** 20% of gross is a toll. It bears no relationship to
what we actually contribute, and it is the model African producers have been on the wrong end of
for a century.

**Charge for value created instead:**

| Model | How it works | Why better |
|---|---|---|
| **Uplift share** | % of price achieved *above* a documented baseline | We only earn when the farmer earns more. Aligned, and defensible |
| **Per-container service fee** | Flat fee per container handled | Predictable, doesn't scale with their success |
| **Compliance subscription** | Cooperative or importer pays annually | Recurring, software-shaped, buyer-side |
| **Buyer-side fee** | Importer pays for verified traceability | They have the legal exposure and the budget |

**Recommended: uplift share plus buyer-side compliance subscription.** If we take a documented
baseline price, improve it, and share the improvement, then 20% *of the uplift* is generous to
us and still leaves the farmer strictly better off than before we arrived. Same economics,
completely different story, and the story is one we can tell on stage.

---

## What being an exporter actually requires

If Studex does eventually want to move physical coffee — and this should be a later decision,
not a Phase 2 one — the Rwandan requirements are clear and not onerous, but they are real:

| Requirement | Detail |
|---|---|
| **Coffee export licence** | From NAEB, via RDB One Stop Centre. **Free of charge.** Sources differ on validity — the One Stop Centre and RwandaTrade say 5 years, NAEB's own exporter page says 1 year renewable. **Verify directly with NAEB** |
| Registered company | Rwandan company registration, TIN, Irembo account |
| Coffee supplier contract | Signed contract with suppliers |
| Export performance report | Required for renewal |
| Quality assurance staff certificate | A named, qualified QA person |
| **Coffee washing station letter** | Proof of washing station access |
| **Warehouse inspection** | NAEB officer site visit before licence issues |
| Volume floor | **At least 1 container (19.2 tons) per season.** Smaller allowed for high-value lots such as Cup of Excellence |
| Per shipment | Certificate of origin (NAEB), certificate of quality (NAEB), phytosanitary certificate (RALIS) |

The 19.2-ton floor is the number that matters strategically: it is the difference between a
software business and a commodity business with inventory, working capital and shipping risk.
Note also that renewal requires having exported at least one container in the previous season —
so the licence is not something to acquire speculatively and sit on.

**The compliance layer requires none of this.** That is the argument for doing it first.

---

## The Rwanda institutional opening

Timing here is unusually good, and it is a narrow window.

| Fact | Why it matters to us |
|---|---|
| **National AI Agency approved by Cabinet 8 June 2026** | Eleven weeks old. Still defining its programme — the moment when an outside proposal can shape it |
| Mandate covers commercialisation, industry growth, international engagement | We are an industry actor with an international corridor. Directly on-mandate |
| National AI Policy (2023) names **agriculture** a priority sector | Coffee traceability is squarely inside stated policy |
| **USD 76.5M implementation plan, ~USD 1.2M mobilised** | A large funding gap. What they need most is work they don't have to pay for |
| Acknowledged weak data-sharing and governance frameworks | We build per-tenant governed data infrastructure. That is the gap |
| Builds on C4IR Rwanda; Responsible AI Office not yet operational | Institutional room, few incumbents |
| Data Protection and Privacy Law (2021) in force, DPO established | Real obligations. Data residency must be designed in, not retrofitted |
| Tier-3 national data centre, 98% mobile penetration, limited GPU capacity | Host locally where possible; inference likely offshore at first — say so honestly |
| NST2: digital literacy 53% → 100% by 2029 | The training and skills offer maps to a national target |
| Rwanda ICT Chamber, Digital Business Institute, Digital Trust Seal | The practical entry points, ahead of ministry-level approach |

**How to approach it — and the sequencing is the whole thing.** Do not arrive with a platform
pitch and a partnership proposal. Arrive with a working EUDR deployment at one cooperative and
one consolidated declaration a European buyer has accepted. An under-funded new agency with a
commercialisation mandate cannot easily say no to a demonstration project that is already
running, already aligned with its policy, and costs it nothing.

Enter through the ICT Chamber and C4IR rather than the ministry. Government partnerships are
slow and consume founder attention disproportionately — so it belongs in Phase 3, after Phase 2
has produced the receipt, and it must never be on the critical path for revenue.

**Design for data residency from the start.** The Data Protection and Privacy Law is in force
with an established regulator, and "the data stays in Rwanda" is one of the strongest things we
can offer a government that has publicly identified data governance as a weakness. That claim
has to be architecturally true before it is spoken.

---

## Phase 2, concretely

One cooperative. Not a programme.

1. Identify one Rwandan cooperative already exporting to the EU, via the ICT Chamber or an existing NAEB-licensed exporter
2. Map every member plot — geolocation, area, member identity — using offline capture
3. Build the cooperative's Ghost: members, plots, harvests, quality records, buyer history
4. Produce one consolidated voluntary-grouping declaration
5. **Get it accepted by a European buyer.** This is the deliverable
6. Publish what it cost, what it took, and what broke

Step 5 is the whole pilot. One accepted declaration, four months before a hard deadline, in a
category where nobody has a receipt yet, is worth more than any deck — and it is exactly the
Tier 1 proof the launch strategy identified as missing.

**Sell it to the importer, not the farmer.** They carry the legal obligation, they have the
budget, and it keeps our hands clean.

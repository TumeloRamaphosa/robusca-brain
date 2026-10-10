# Three Clients: A Worked Scenario
**Prepared by:** Robusca Romanov | **Date:** 2026-08-25
**Question asked:** *"If I give you three clients, we make groups for them, we give them agents, we have APIs — how could this work? Give me a scenario."*

Illustrative clients, chosen to represent three different reasons an SA business would pay
R5,000/month. Deliberately different so the pilot tests three demand hypotheses rather than one.

---

## The cohort

| | Client A | Client B | Client C |
|---|---|---|---|
| **Name** | Thabo Freight | Ubuntu Botanicals | Mokoena Structural |
| **Where** | Germiston, JHB | Cape Town | Pretoria |
| **What** | Road freight & warehousing | Skincare, e-commerce | Structural engineering consultancy |
| **Size** | 14 staff, ~R9M turnover | 4 staff, ~R2.5M | 9 staff, ~R12M |
| **They want** | Win tenders | Content engine + export | Faster proposals, partner intros |
| **Real pain** | Sees tenders too late, no capacity to bid | One founder making all content, plateaued | Partners lose deals to slow proposals |
| **Channel** | WhatsApp | WhatsApp + Instagram | Slack |
| **Hypothesis tested** | *Work flows down* | *Market access* | *Throughput* |

---

## Day 0 — the founder call

Ten minutes, on video, Tumelo only. Not a demo. Three questions:

1. What did you not get done last month that would have made money?
2. Who in the business is the bottleneck, and what are they doing that a machine could?
3. What do you have written down about your own company, and where does it live?

Question 3 is the important one — it is the Brain ingestion scope, and the answer is almost
always "nowhere, it's in my head and my inbox." That answer *is* the sales pitch, and it is
why Business Ghost leads the product.

Outcome: a signed one-page order form, an agreed 48-hour first deliverable, and a WhatsApp
group created before the call ends. Momentum matters more than paperwork here.

---

## Day 0 — provisioning

Steps 2–8 from the provisioning flow. At pilot scale this is a script plus about forty minutes
of supervision; by client twenty it is one command.

```bash
studex tenant create \
  --name "Thabo Freight" --plan company-builder \
  --channel whatsapp --msisdn +2711xxxxxxx \
  --region af-south-1

# → tenant  tn_thabofreight_7c21
# → schema  ghost_tn_thabofreight_7c21   (own schema, not a tenant_id column)
# → runtime oh-tn-thabofreight            (own OpenHands Agent Server)
# → vault   vlt_tn_thabofreight_7c21
# → key     sk_studex_live_TF_••••••••    (scoped, revocable, metered)
# → ledger  initialised, append-only
```

What the client sees: a WhatsApp group called **Thabo Freight × Studex** with four
participants — themselves, their ops manager, Tumelo, and `Studex Agent`.

What the client never sees: our model keys, our Runable seat, other tenants, or any part of the
control plane. Their key authenticates to us; ours authenticate to vendors.

---

## Day 1–2 — Brain ingestion

The step that turns a generic assistant into *their* Ghost. Per tenant, into their schema only:

| Source | Client A | Client B | Client C |
|---|---|---|---|
| Email history | 18 months, ops@ | founder inbox | 24 months, proposals@ |
| Documents | fleet records, past bids, BBBEE cert, CSD reg | formulations, supplier terms, COAs | 60+ past proposals, rate card, CVs |
| Systems | Sage, tracking platform | Shopify, Meta | Xero, Dropbox |
| Web | own site, 6 competitors | own store, 12 competitors | own site, 4 competitors |

Client authorises each connection themselves; tokens land in their vault. **We never hold a
client credential outside their tenant**, and that sentence needs to survive a technical audit,
not just a sales call.

First deliverable inside 48 hours — the retention moment:

- **A:** a tender-ready capability statement assembled from their own documents, plus the seven live tenders they qualify for right now. *They had seen two of them.*
- **B:** a competitor teardown of twelve SA skincare brands — pricing, claims, positioning gaps — plus thirty days of content mapped to the gap nobody occupies.
- **C:** their last proposal rebuilt in the house template in nine minutes, with the three costing inconsistencies their reviewer missed.

Each is something they can show a colleague. That is the test for a first deliverable.

---

## The agents

Same core, different configuration per tenant. Named per the existing roster where they map.

```
                    ROBUSCA (Studex-side supervisor)
                    tasks out ↓        reports in ↑
     ┌──────────────────────┬──────────────────────┬──────────────────────┐
     │  Tenant A            │  Tenant B            │  Tenant C            │
     │                      │                      │                      │
     │  Ghost (memory)      │  Ghost (memory)       │  Ghost (memory)     │
     │  Scout — tenders     │  Naledi — content     │  Drafter — proposals │
     │  Bidwriter           │  Trade — export docs  │  Scout — RFQs        │
     │  Ops — reporting     │  CashClaw — orders    │  Partner — intros    │
     └──────────────────────┴──────────────────────┴──────────────────────┘
```

Cross-tenant boundary holds throughout: Robusca **writes tasks** into each queue and
**receives reports** back. It never reads a tenant's memory. Client B's competitor research
cannot surface in Client A's outputs, and if we are ever asked, the ledger proves it.

---

## Month 1 — what actually happens

### Client A — Thabo Freight
- **Scout** monitors eTenders, provincial portals, SOE portals, private RFQs daily. Filters on their CSD registration, BBBEE level, fleet capacity, geography. Posts matches to WhatsApp at 06:00 with a go/no-go recommendation and a deadline.
- **Bidwriter** drafts the compliance pack — company profile, tax clearance references, past performance, capacity statement — from the Ghost. Human reviews and signs.
- **Ops** posts a Monday summary: loads delivered, on-time %, fuel per km, invoices outstanding over 30 days.
- **Month 1:** 23 tenders surfaced, 6 qualified, 4 submitted. Previously they bid roughly one a month.

### Client B — Ubuntu Botanicals
- **Naledi** runs the content engine on the launch-strategy format rules — hooks in the first 1–3 seconds, greenscreen over ingredient and lab imagery, 90s+ cuts. Founder approves in the group; nothing publishes unapproved.
- **Trade** builds the export file for UAE and Russia: HS codes, INCI compliance, label requirements, certificate gaps, and a shortlist of 14 distributors with contacts.
- **CashClaw** watches Shopify — abandoned checkouts, repeat-purchase windows, stock cover on the top six SKUs.
- **Month 1:** 26 pieces published (from ~6/month), 3 distributor conversations opened, one sample shipment quoted.

### Client C — Mokoena Structural
- **Drafter** turns a scope email into a costed draft proposal in the house template, pulling rates, CVs and comparable past projects from the Ghost. Two-hour turnaround instead of four days.
- **Scout** monitors municipal and private RFQs in Gauteng.
- **Partner** identifies complementary firms — civil, geotech, architectural — for joint bids they cannot pursue alone. This is where the *ecosystem* promise becomes concrete: two introductions came from inside the pilot cohort.
- **Month 1:** 11 proposals out (from 4), average turnaround 4 days → 6 hours.

---

## Month 3 — compounding, and the escalator

- **A** won two tenders worth R1.4M combined. Their real question is now capacity, not pipeline — an upsell conversation to R10,000 for a workforce that also handles scheduling and invoicing.
- **B** signed a Dubai distributor. Now needs export documentation at volume and is a live candidate for Studex Global Markets rather than the SME tier.
- **C** is joint-bidding with a civil firm met through the cohort. Both are now asking for a shared workspace — which is Execution Exchange demand appearing organically, from the supply side, exactly as the sequencing predicted.

And the escalator runs: C needed a junior draughtsperson, hired from the Arcade talent pool.
One placement is not a talent pipeline, but it is the first evidence the mechanism works.

---

## Pilot P&L

| | A | B | C | **Total** |
|---|---|---|---|---|
| Revenue | R5,000 | R5,000 | R5,000 | **R15,000** |
| Inference | (R700) | (R900) | (R500) | (R2,100) |
| Compute | (R320) | (R320) | (R320) | (R960) |
| Channel | (R250) | (R300) | (R120) | (R670) |
| Runable (shared) | (R160) | (R270) | (R160) | (R590) |
| Storage | (R100) | (R120) | (R150) | (R370) |
| Human delivery | (R1,800) | (R2,250) | (R1,600) | (R5,650) |
| **Contribution** | **R1,670** | **R940** | **R2,150** | **R4,760** |
| Margin | 33% | 19% | 43% | **32%** |

Against ~R46,600 fixed overhead the pilot runs about **R41,800/month negative**. That is
correct and expected. It is a funded experiment, and three annual prepayments (R150,000) cover
roughly three and a half months of it while the control plane gets built.

**Client B is the warning.** 19% margin, because content and video are credit-hungry and
consumed the most human review time. Either video moves to a metered add-on or B belongs on
the R10,000 tier. Better to learn that on client two than on client twenty.

---

## What the pilot is actually for

Not the R15,000. Three things:

1. **Receipts.** The launch strategy's binding blocker was having no instrumented client
   outcomes. "23 tenders surfaced, 4 submitted, 2 won, R1.4M" is a Tier 1 number with a named
   client. Three of those and Ghost Day has real proof rather than assertions.
2. **The true cost of delivery.** Every number above is an estimate. After ninety days they are
   measurements, and pricing can be set on evidence.
3. **Knowing which 80% to automate.** Build the automation for patterns three real clients
   exhibit, not the ones we imagine. The overlap is already visible — all three wanted tender
   or RFQ monitoring, which says *Scout* is the first thing to productise into a shared skill.

---

## Where this breaks, honestly

- **Three clients at once with a control plane that doesn't exist yet is too much.** Start with
  **one** — Client C, the engineering consultancy, because proposals are the most templated
  workflow and the least credit-hungry. Prove the loop, then add A, then B.
- **Client B's margin does not work at R5,000.** Fix the packaging before signing more like them.
- **The ecosystem promise is only honest here because the cohort is small enough to introduce
  by hand.** Do not sell "marketplace access" at this stage; sell curated introductions and
  deliver them personally.
- **WhatsApp is on the critical path and currently disconnected.** `STUDEX_OS.md` shows WABA
  `105198275846951` needing SMS verification. Two of these three clients live in WhatsApp. That
  is a blocker, not a detail.
- **Instrument from day one or the receipts don't exist.** If the ledger is not capturing tender
  counts, turnaround times and win values from week one, month three produces a nice story and
  no evidence — which is the exact failure the launch strategy was built to avoid.

# The Payment Rail, Across Two Jurisdictions
**Prepared by:** Robusca Romanov | **Date:** 2026-08-26

> Not legal advice. This needs South African and Rwandan financial services counsel. What
> follows is what the published law says and what it means for what we can announce.

---

## Verdict

Adding Rwanda made the stablecoin plan **harder, not easier.** As described — stablecoin
settlement, agents running the rail, payments to farmers and between traders — it is currently
unlawful in both jurisdictions without licences that in Rwanda cannot yet even be applied for.

**But there is a clean path, and Rwandan law names it explicitly:** closed-loop credits are
carved out of the definition of a virtual asset. That is the same recommendation made for South
Africa last week, now confirmed as a statutory carve-out in the second jurisdiction too.

So: **build closed-loop Studex Credits. Pay people in francs and rand. Put the stablecoin in
Rwanda's regulatory sandbox if you still want it, as a separate company, on its own clock.**

---

## Rwanda: Law N° 023/2026

Gazetted 28 May 2026 and in force. Rwanda's first virtual asset statute.

| Provision | Effect on the plan |
|---|---|
| **Capital Market Authority is lead licensing regulator**; BNR retains financial-stability and payment-systems oversight | Two regulators, not one |
| **Only incorporated legal entities may be licensed.** Natural persons expressly prohibited | A Rwandan entity, or a foreign entity registered with local presence |
| **Virtual assets are not legal tender and may not be used as a general means of payment for goods, services or financial obligations unless authorised by the BNR** | **This is the blocker.** Paying farmers or settling trades in stablecoin is the prohibited use |
| Stablecoin issuance requires CMA approval, **full reserve backing at all times**, reserves independently verified, audited, and held by **licensed custodians**, segregated from company funds, with **public proof of reserves** | An institutional-grade obligation, not a technical build |
| Stablecoin holders rank ahead of general creditors on issuer insolvency | Meaningful balance-sheet consequence |
| **Algorithmic stablecoins excluded from the licensing perimeter entirely** | Not an available design |
| **Closed-loop systems are carved out of the "virtual asset" definition** | ✅ **The path** |
| Mining, virtual asset ATMs, mixers prohibited absent express CMA approval | Not relevant, but indicates posture |
| Marketing of virtual asset services restricted to licensed providers | We could not even *advertise* it pre-licence |
| **Implementing regulations — licensing procedure, fit-and-proper standards, capital and liquidity requirements — not yet published** | **We cannot determine what compliance requires.** Nobody can |
| **Unauthorised operation carries enforceable criminal penalties** | The downside is not a fine |
| **Regulatory sandbox jointly run by CMA and BNR**, with a pathway from testing to full licence | The legitimate route if this is strategic |

Read the two bolded rows together: unauthorised operation is criminal, and the rules for
authorisation do not yet exist. That combination means the only defensible position right now is
to stay clearly outside the perimeter.

---

## South Africa, unchanged

From last week's assessment, all still current:

- **FSCA CASP licence** under the FAIS Act. As at 31 March 2026: 533 applications, 310 approved, 17 declined
- **FIC registration** as an accountable institution
- **Separate FinSurv authorisation** for cross-border crypto movement under the draft Crypto Asset Manual and draft Capital Flow Management Regulations 2026 (published 17 April 2026). Explicitly a standalone additional authorisation
- **Utility tokens are not carved out** — the framework does not distinguish bitcoin, stablecoins and utility tokens
- Enforcement active: 30 supervisory inspections in the year to March 2026, 81 investigations initiated, 56 ongoing
- SARB does not recognise crypto as currency

**A Rwanda–South Africa coffee corridor settled in stablecoin would need, at minimum:** an FSCA
CASP licence, FIC registration, FinSurv cross-border authorisation, a Rwandan CMA licence, BNR
authorisation for payment use, full audited reserves with a licensed custodian, and public proof
of reserves. In two jurisdictions, one of which has not published its rules.

---

## The closed-loop path

Rwanda's statute carves closed-loop systems out of the virtual asset definition. Design to sit
squarely inside that carve-out, with no ambiguity:

| Design rule | Why |
|---|---|
| **Non-transferable** between users | Transferability is what makes something tradeable, and tradeable is the definition |
| **Non-redeemable** for cash | Redeemability starts to look like stored value or e-money |
| **No blockchain issuance** | Removes the question entirely rather than arguing it |
| **No secondary market**, contractually prohibited | No price, therefore no speculation |
| **Denominated in rand**, not as an independent unit | It is a prepaid balance, not a currency |
| **Expires** | Prepaid service credit, closer to airtime than to money |
| **Single-purpose** — buys only Studex services | Closed loop means closed |

That is a prepaid service credit. It still deserves a legal review — consumer protection and
prepayment rules apply to airtime and vouchers too — but it is a materially easier conversation
than a licensing application, and it delivers everything the ecosystem actually needs: metered
agent usage, skill purchases, service billing, and a unit clients can prepay.

**What it deliberately cannot do:** settle payments between third parties. Trader-to-trader
settlement and farmer payouts are a licensed activity and must run on licensed rails —
bank transfer, licensed PSP, mobile money. Rwanda has excellent mobile money infrastructure
and 98% mobile penetration; use it.

---

## Paying farmers: do not do this in crypto

Beyond the licensing question, there is a duty-of-care problem worth stating plainly.

Paying smallholder farmers in a stablecoin would require them to hold a volatile-adjacent
instrument, manage a wallet and private keys, find an off-ramp, and absorb conversion cost and
FX risk — in a jurisdiction where virtual assets are not legal tender and cannot lawfully be
used as general payment without central bank authorisation. If the rail failed, the loss would
fall on the people least able to carry it and least able to seek recourse.

Even if it were licensed, it would be the wrong thing to do. Pay farmers in Rwandan francs
through licensed channels. The traceability and transparency benefits people reach for
blockchain to justify — verifiable records, a tamper-evident audit trail, provenance a European
buyer can inspect — are delivered by the **per-tenant append-only ledger** we are building
anyway, at no regulatory cost. That ledger is what EUDR compliance actually needs. The token
adds risk, not capability.

---

## Recommendation

1. **Invoice in ZAR and USD.** Ordinary processing, ordinary accounting, no new licences.
2. **Build closed-loop Studex Credits** to the seven design rules above. Legal review before launch.
3. **Pay farmers and settle trade in fiat** via banks, licensed PSPs and mobile money.
4. **Remove the token and stablecoin from every deck, diagram, script and site** until counsel gives a written position. In Rwanda, marketing virtual asset services without a licence is itself restricted.
5. **If the stablecoin is genuinely strategic, apply to the CMA/BNR sandbox** as a separate entity with its own timeline. Never let it gate the AI business or contaminate its credibility.
6. **Brief counsel in both jurisdictions.** South Africa: FSCA CASP, FIC, FinSurv. Rwanda: Law N° 023/2026, and watch for the implementing regulations.
7. **Use the ledger for the transparency story.** It is the thing that actually satisfies EUDR and enterprise buyers, and it needs no licence.

---

## And the positioning cost, again

The launch strategy sells Studex on governance, auditability and not overclaiming — in a market
where Gartner has just named agent-washing a procurement hazard. A token in the pricing flow
undermines that in a single slide: it asks a procurement team to trust our controls while showing
them an unlicensed financial instrument. It attracts crypto speculators and repels the
R20,000-a-month buyer.

In Rwanda the cost is higher still. Approaching a government that has just legislated carefully
in this area, with an unlicensed token in the deck, would end the institutional conversation
before the coffee pilot got a hearing — and the coffee pilot is the better business.

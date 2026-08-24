# Risk register

**Prepared:** 24 Aug 2026
**Read this before the deck goes to any investor.**

Six findings. Four are checkable facts that contradict material claims currently
being made in the fundraising deck at `teak6itwacf9.space.minimax.io`. I am
flagging them because a competent investor's diligence will find all of them,
and finding them at that stage is far worse than fixing them now.

Nothing here is legal advice. Items 1, 2 and 3 need a qualified practitioner.

---

## 1. The token raise — highest exposure in the business

**Claim in the deck:** "Q3 2026 — Token Generation Event (STUD), $2–5M raise via
token sale." The supplied ecosystem diagram also shows a fiat → USDC/USDT →
StudEx token → wallet rail settling memberships, AI usage and third-party
project payments.

**The position in South Africa.** The FSCA declared crypto assets to be
financial products under the FAIS Act in 2022. There is no standalone token-sale
licence: issuing tokens to the public, or providing intermediary, advisory or
related financial services around them, requires authorisation as a Financial
Services Provider with crypto-asset authorisation — in current practice a
Category I or II FSP with the crypto assets subcategory. Separately, FIC Act
Schedule 1 Item 22 imposes registration as an accountable institution for
crypto activity performed for clients, including "financial services connected
with an issuer's offer or sale," generally within 90 days of commencing. FIC
Directive 9 applies the FATF Travel Rule to crypto transfers.

**The transitional window is closed.** The special application window ran from
1 June 2023 to 30 November 2023 and was relief for qualifying *existing*
operators. It is not a continuing grace period. As at 31 March 2026 the FSCA had
received 533 CASP applications, approved 310 and declined 17 — the most common
failure reasons being inadequate business plans and operational frameworks, and
failure to demonstrate the required crypto knowledge and practical experience. A
new entrant in 2026 must obtain authorisation **before** rendering the regulated
service.

**Why the settlement rail is worse than the raise.** The raise is a one-off
regulated event. The rail in the diagram would have StudEx holding member value
and settling payments between third parties for cross-border work on an ongoing
basis. That is a materially larger regulatory footprint — custody, cross-border
reporting to the SARB Financial Surveillance Department, and AML obligations on
every participant.

**Recommendation.**

1. **Remove the Token Generation Event from the fundraising deck now.** It
   converts an equity conversation into a securities-and-licensing conversation
   and will end most institutional discussions on the spot.
2. Fund from equity and revenue. Nothing in the five-layer ecosystem requires a
   token — memberships, subscriptions and project settlement all work on
   invoicing.
3. If the token stays as a long-term ambition, describe it as "a regulated
   utility credit under consideration, subject to FSCA authorisation," and get a
   FAIS practitioner's written opinion before it appears in any document again.
4. Do not accept a single rand for tokens before authorisation is in hand.

**Severity: critical. Owner action required before any further fundraising.**

---

## 2. NtechLab is sanctioned — and the deck calls the partnership "Active"

**Claim in the deck:** under Key Partners, "NTechLab — FindFace — Computer
vision AI — Russia — **Active**." Also listed as "Layer 1 — Russian Tech Access"
in the strategic moat, framed as an advantage no Western company has.

**The fact.** NtechLab LLC was added to the **US Bureau of Industry and Security
Entity List on 11 December 2024**, for developing and supplying facial
recognition software to the Russian government used to track and target peaceful
protesters, described in the Federal Register notice as integral to Russia's
mass-surveillance apparatus. Licences are required for **all items subject to the
EAR**, reviewed with a **presumption of denial**. NtechLab also appears under EU
restrictive measures for serious human rights violations from 20 July 2023, and
in Canadian, Ukrainian, Monégasque and Belgian listings.

**What this does to the fundraise.** It is not a presentational problem.

- Most US and EU institutional investors have mandate restrictions that make an
  active, disclosed relationship with an Entity-List company an automatic
  decline, regardless of the merits.
- Presenting it as a competitive advantage signals to a diligence team either
  that we did not check, or that we checked and did not care. Both are fatal to
  trust.
- There is potential direct exposure for StudEx if the relationship involves
  items subject to the EAR, and secondary exposure for banking and payment
  relationships.
- The specific listing reason — mass surveillance of protesters — is a
  reputational problem in South Africa independent of any sanctions analysis,
  given this country's history.

**Recommendation.** Remove NtechLab from the deck and from the moat narrative
immediately. Establish in writing what, if anything, has actually been
transacted. Obtain a sanctions and export-control opinion covering all three
Russian relationships before approaching any international investor. If the
Russian technology access is genuinely strategic, it needs to be a deliberate,
advised, disclosed position — not a bullet on slide nine.

**Severity: critical. Blocks international fundraising as currently written.**

---

## 3. "Africa's First Proprietary LLM" is a Llama derivative, and the licence is misstated

**Claims in the deck:** "Powered by Proprietary LLM"; "Project-2571 — Africa's
First Proprietary LLM"; "Base Model: Llama 3.1 8B (**MIT License**)";
"Fine-tuning: LoRA"; model named "StudEx-2571"; "Patent Status: Filed SA / AU /
EU / US."

**Four separate defects.**

**a) Llama 3.1 is not MIT licensed.** It is released under the Llama 3.1
Community License Agreement — a custom contract, not an open-source licence. The
Free Software Foundation has published an evaluation stating it is not a free
software licence. This is a one-click check for any technical diligence, and
getting a licence wrong on your own core technology slide is the kind of error
that makes reviewers re-examine everything else.

**b) The model name breaches the licence terms.** The Llama 3.1 Community
License requires that if you use the materials to create or fine-tune a model
that is distributed or made available, you must **include "Llama" at the
beginning of the model name**, and **prominently display "Built with Llama"**,
and retain the attribution notice. "StudEx-2571" satisfies none of that. A
compliant name would be something like `Llama-StudEx-2571`.

**c) A LoRA fine-tune of an 8B open-weights model is not a proprietary LLM.**
The valuable, defensible asset here is real — three years of StudEx corpus, the
Obsidian knowledge base, African-language data, business decision logs. That
data is the moat. Calling the fine-tune "proprietary" and "Africa's first"
invites a comparison the model cannot win, and it obscures the thing that is
genuinely differentiated.

**d) "Patent Status: Filed" in eight jurisdictions needs receipts.** If
applications exist, hold the application numbers and filing dates ready for the
data room. If they do not, the wording must change to "intend to file." Stating
filings that do not exist in a fundraising document is misrepresentation.

**Recommendation.** Rewrite the technology slide around the data asset and the
fine-tuning capability, correct the licence, rename the model to comply, and
either produce the filing receipts or change the tense. Note also that the
700-million-MAU clause in the Llama licence is irrelevant at our scale — worth
knowing so nobody raises it as a blocker.

**Severity: high. Fails technical diligence as written.**

---

## 4. Implied endorsements — Google Cloud, NVIDIA, and the President

**Three problems on the deck's own slides.**

**Google Cloud and NVIDIA logos appear on slide one**, alongside Studex Group and
Project-2571, in the position that conventionally denotes partners or backers.
Slide nine then lists both as "**Opportunity**" — i.e. not partners. The deck
contradicts itself, and the version an investor sees first is the misleading
one. Using their marks without a relationship is also a trademark problem
independent of the disclosure issue.

**"13 SA healthcare company partners"** appears in the moat as established, then
appears in Key Partners as "**Pipeline**." Same contradiction, same fix.

**The presidential framing.** The deck opens with President Ramaphosa's July 2026
Google Cloud Summit call for AI infrastructure in Africa, then states "African AI
Company (Pty) Ltd is the answer. We are the vehicle." Given that the founder
shares a surname with the President, this reads — to anyone outside the room — as
implied state endorsement or family connection. Whether or not that is intended,
it is how it will be received, and a diligence process will ask about it
directly.

**Recommendation.** Move Google Cloud and NVIDIA to a clearly labelled
"Prospective partners — no agreement in place" section, or remove the logos.
Make the healthcare 13 consistently pipeline. Keep the policy tailwind as market
context — it is legitimately useful — but cut "we are the vehicle" and any
phrasing that implies designation.

**Severity: high. Cheap to fix, expensive to be caught on.**

---

## 5. The "64 agents" and the revenue figures

**Claims:** "Run by 64 Agents"; "6 Business Units, 64 AI Agents, 7 Obsidian
Brains"; Year 1 2026 revenue $721,800 rising to $2,017,000 by 2028; valuation
$8–12M at Y3.

**What the codebase actually shows.** The 23 August consolidation session
established that the repository contains exactly one runnable application —
`os/war-room/` — and that Charlie OS, the Super Agents site, Global Markets,
Meta-CLI, BAASH VM and NestVM are all plan-only with no code. Four War Room
endpoints return hardcoded values, including a dashboard revenue figure that is
a literal in `routes.ts`. Shopify and Facebook Ads have no integration at all.

Sixty-four agents do not exist. Neither does the AOS the deck describes as
running them.

**On the revenue.** We are eight months into 2026. A Year 1 figure of $721,800
should therefore be substantially actual, not projected. If actual revenue is
materially below that, the deck is presenting a forecast as a track record. Note
also that "AOS SaaS (external clients): 20% of revenue" implies external SaaS
customers, and per the launch pack the first Managed Pilot has not been
delivered.

**Recommendation.** Replace agent counts with what exists: one internal
operations dashboard, one marketing site, a documented architecture, and a
knowledge asset. State 2026 actuals to date separately from the forward
projection, and label projections as projections on the slide itself. An investor
will forgive a small number. They will not forgive a number that turns out to be
a placeholder.

**Severity: high. This is the one that ends a relationship rather than a
meeting.**

---

## 6. Cross-border data and the Tencent memory plan

Covered in detail in [04-TALKING-AGENT.md](04-TALKING-AGENT.md). In summary:
routing South African clients' personal information to infrastructure in China
is a cross-border transfer under POPIA section 72 and needs a lawful basis.

**Recommendation.** Split the stores — client PII and transcripts in South
Africa or the EU, generic corpus and model artefacts on Tencent if it is
strategically useful. Get a POPIA opinion before the first client, and put the
answer in the client data processing agreement.

**Severity: medium now, high the moment a real client's data exists.**

---

## What I would do this week

In this order, because each one unblocks the next:

1. **Pull the current deck from circulation.** If it has already gone to
   anyone, that is worth knowing before it goes further.
2. **Remove the token event, NtechLab, and the two implied endorsements.** Three
   deletions, an hour of work, and they remove the three findings most likely to
   end a fundraise.
3. **Get the numbers straight** — 2026 actuals to date, separately labelled from
   projections.
4. **Rewrite the technology slide** around the data asset with the correct Llama
   licence and a compliant model name.
5. **Then** rebuild the visual design — see
   [07-DECK-REBUILD.md](07-DECK-REBUILD.md).

Doing step 5 before steps 2–4 is the actively harmful ordering. A better-looking
deck gets further into diligence before it fails, which costs relationships you
cannot re-approach. The design is genuinely worth fixing, and it is worth fixing
second.

# The deck — corrections and rebuild

**Prepared:** 24 Aug 2026
**Reviewed:** `teak6itwacf9.space.minimax.io` — "African AI Company — The
Puppetier OS", 12 slides.

You asked me to make it look better. The design is genuinely fixable and I have
specified that below. But the content has to be corrected first, and this
document is ordered accordingly. Every factual finding is in
[06-RISK-REGISTER.md](06-RISK-REGISTER.md) with sources.

---

## Why the current deck looks the way it does

Diagnosed from the source, so the rebuild fixes causes rather than symptoms:

| Issue | Cause |
|---|---|
| Everything looks small and soft on a big screen | Deck renders into a 960×540 iframe and is CSS-scaled up. Half the effective resolution of a modern deck. |
| Off-brand | Purple-to-blue gradient progress bar (`#3b82f6 → #8b5cf6`), generic system font stack. StudEx is obsidian and gold. |
| Generic feel | Font Awesome icons and system fonts — the default look of a generated deck |
| Twelve slides in one file | Single `deck1.html`, no per-slide structure, so nothing can be edited or reordered independently |
| Dense slides | Slide 4 carries a model spec table, six languages and five data sources. Three slides of content on one. |

None of that is a taste problem. It is a resolution and structure problem, and
that is why `open-slide` is the right tool for the rebuild.

---

## Part 1 — Corrections, slide by slide

**These are not stylistic preferences. Each one is a factual defect.**

| Slide | Current | Must become | Why |
|---|---|---|---|
| 1 | Google Cloud + NVIDIA logos in partner position | Remove, or move to a labelled "prospective — no agreement" section | Deck's own slide 9 lists both as "Opportunity" |
| 1 | "Run by 64 Agents" | Remove | 64 agents do not exist |
| 1 | "Powered by Proprietary LLM" | "Built on a fine-tuned open-weights model, trained on our own corpus" | It is a LoRA fine-tune of Llama 3.1 8B |
| 2 | "President Ramaphosa... We are the vehicle" | Keep the policy tailwind as market context; cut "we are the vehicle" | Reads as implied state endorsement |
| 2 | "$1B Unicorn — Token → Series A → JSE → NASDAQ" | Remove the token leg | See risk register item 1 |
| 4 | "Llama 3.1 8B (MIT License)" | "Llama 3.1 8B — Llama 3.1 Community License" | Provably wrong. Not MIT. |
| 4 | Model named "StudEx-2571" | `Llama-StudEx-2571`, plus "Built with Llama" displayed | Licence requires the name to begin with "Llama" |
| 4 | "Africa's First Proprietary LLM" | "Our domain-tuned model, trained on three years of StudEx operating data" | The data is the moat; the model is not proprietary |
| 4 | "Patent Status: Filed SA/AU/EU/US" | Filing numbers and dates, or change to "intend to file" | Unverified filing claims are misrepresentation |
| 6 | "64 agents / 10 per business" | What exists: one operations dashboard, one marketing site, documented architecture | Same as slide 1 |
| 9 | "NTechLab — Active" | **Delete entirely** | On the US Entity List since 11 Dec 2024; EU sanctions since 2023 |
| 9 | "Layer 1 — Russian Tech Access" as advantage | Remove until a sanctions opinion exists | Actively repels US/EU investors |
| 9 | "13 SA healthcare company partners" | "13 healthcare prospects in pipeline" | Deck contradicts itself between slides |
| 10 | Y1 2026 $721,800 with no label | 2026 actuals to date, then projections clearly labelled | Eight months elapsed; a forecast is being read as a record |
| 10 | "AOS SaaS (external clients): 20%" | Remove or mark as future | No external client has been delivered |
| 11 | Token Generation Event Q3 2026 | Remove | See risk register item 1 |
| 12 | "Token Raise $2–5M" | Remove; lead with the equity ask | Same |

### What is genuinely strong and must survive the rewrite

The deck is not bad. Three things in it are real assets and the rebuild should
give them more room, not less:

1. **The data asset.** Three years of operating conversations, SOUL files,
   financials, brand guides, an Obsidian knowledge base across seven entities,
   and business decision logs. That is a real, hard-to-copy corpus and it is
   currently buried on a crowded slide.
2. **The NVIDIA-playbook framing** — give away edge capability, retain the
   operating layer. It is a clear, credible strategy well explained.
3. **African AI sovereignty as market timing.** The policy tailwind is real and
   the positioning is legitimate. It just cannot be phrased as designation.

The five-layer ecosystem diagram you supplied today is **better than anything
currently in the deck** and is not in it. It explains who the customer is at
each level, which is the question this deck never answers. It should become
slide 4.

---

## Part 2 — The rebuild

### Tooling: `open-slide` (MIT)

The right choice, and the reason is specific rather than fashionable. It renders
every slide into a fixed **1920×1080** canvas — four times the pixel area of the
current 960×540 — with pages as arbitrary React components. It ships
`/create-slide` and `/slide-authoring` skills for agent authoring, an in-browser
inspector where you click an element and leave a comment like *"make this
gold"* which `/apply-comments` then applies, an assets manager with logo search,
a presenter mode with speaker notes and a timer, and export to static HTML or
PDF.

The inspector loop is the part that matters for you specifically: present, click
what is wrong, say what you want in plain language, re-run. That is a far better
fit for how you give feedback than editing a 66 KB HTML file.

Scaffold:

```bash
npx @open-slide/cli init studex-investor-deck
```

**Not run in this environment** — a deck should be built and reviewed
interactively, and a 1920×1080 visual artefact needs your eye on it. This is the
one deliverable in the pack that is worse if I finish it alone.

### Brand system

| Token | Value | Use |
|---|---|---|
| Obsidian | `#0A0A0A` | Slide background |
| Gold | `#C9A227` | Headlines, key figures, rules |
| Bone | `#F5F2EA` | Body text |
| Slate | `#6B6B6B` | Captions, footnotes, disclaimers |
| Signal | `#8C1C13` | Used once, on the ask |

Headlines: **Bebas Neue**. Body and emphasis: **Cormorant Garamond**. Both are
already the StudEx system in the Meat content pack, so the investor deck finally
matches the brand.

Delete the purple/blue gradient. Progress bar becomes a 2px gold rule.

Rules: one idea per slide; no slide over 40 words of body; every number carries
its source or its label; no icon unless it carries meaning.

### Structure — 14 slides

| # | Slide | Content |
|---|---|---|
| 1 | Title | African AI Company. One line of positioning. No partner logos. |
| 2 | The problem | African businesses are being sold AI tools and getting no operating change. Specific, not sweeping. |
| 3 | What we do | Managed AI operations. The one-sentence proposition from the launch pack. |
| 4 | **The ecosystem** | The five-layer chain. **The strongest slide available and currently missing.** |
| 5 | The product | Super Agents: named agent, approved knowledge, defined role, human approval. |
| 6 | Why it is defensible | The data asset. Three years of operating corpus, seven knowledge bases, decision logs. |
| 7 | The delivery model | Buzz workspace per client, signed audit trail, Agentic Rise as delivery capacity. The answer to "can you scale services?" |
| 8 | Traction — actuals only | What is live, what is built, what is signed. Small and true beats large and soft. |
| 9 | Market and timing | African AI policy tailwind, Google Cloud's regional investment, as context not endorsement. |
| 10 | Technology | Fine-tuned open-weights model, correct licence, compliant name, the corpus, edge deployment. |
| 11 | Strategy | The NVIDIA playbook adapted. Give away edge capability, retain the operating layer. |
| 12 | Financials | Actuals to date. Projections labelled as projections. Unit economics from `02-OFFERING.md`. |
| 13 | Roadmap | Equity milestones only. No token leg. |
| 14 | The ask | One number, one use of funds, one next step. |

### The two structural changes that matter most

**Add the ecosystem slide at position 4.** Every investor asks "who buys this and
who delivers it." The five-layer chain answers both in one image. Without it the
deck is a list of six businesses; with it, it is a system.

**Move traction to position 8, ahead of market and technology, and make it
small and true.** The current deck puts the vision at the front and the numbers
at slide 10, which reads as deferral. A short honest traction slide early buys
credibility for everything after it. "One internal operations platform, one
marketing site live, architecture documented, first managed pilot in
onboarding" is a better slide than "64 agents" — because it is checkable, and
because the reader stops hunting for the catch.

---

## Sequence

1. Owner decisions in [08-DECISION-SHEET.md](08-DECISION-SHEET.md) — items 1, 3, 4.
2. Apply every correction in Part 1.
3. Confirm 2026 actuals to date.
4. `npx @open-slide/cli init studex-investor-deck`.
5. Build the 14 slides on the brand system.
6. Review in present mode, comment in the inspector, apply, repeat.
7. Export to PDF for the data room, static HTML for the link.
8. Sanctions and FAIS opinions in hand **before** any international investor
   sees it.

Steps 1–3 are not optional preliminaries. They are the work. Step 5 is the easy
part.

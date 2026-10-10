# The StudEx content engine

**Prepared:** 25 Aug 2026
**Method source:** Tania Brown, *How to build an AI content workflow from the
ground up*, Search Engine Land, 24 Aug 2026.
**Status:** DESIGN + seven usable agent documents. Not yet run.

Built from the ground up, using the article's method, adapted for StudEx and for
the Social agent in the managed-agents package.

---

## The method, in one line

**Work backward from the finished piece.** Define what good looks like first,
then build the workflow and inputs that reliably get you there.

The article's central lesson is worth quoting because it inverts how most people
attempt this: *"The hardest part isn't getting AI to produce an article. It's
figuring out what the finished article needs to look like, then building the
workflow and inputs that can reliably get you there."*

That is why this pack starts with a definition of done and a context audit, and
only then describes agents. Building the agents first is the mistake that
produces a working pipeline that emits unusable content.

---

## Read in this order

| # | Document | Answers |
|---|---|---|
| 01 | [DEFINITION-OF-DONE.md](01-DEFINITION-OF-DONE.md) | What a finished piece must be, per content type |
| 02 | [CONSTANTS-AND-GAPS.md](02-CONSTANTS-AND-GAPS.md) | The context pack the engine needs, and **what we are missing** |
| 03 | [PIPELINE.md](03-PIPELINE.md) | Order of operations, agents, human gates, cadence |
| 04 | [PROVENANCE.md](04-PROVENANCE.md) | Watermarking, disclosure, and the commodity-content problem |
| 05 | [ECOSYSTEM-CONTENT.md](05-ECOSYSTEM-CONTENT.md) | One engine, five audiences — mapping to the layer diagram |

Agent documents, ready to use: [`agents/`](agents/)

---

## Two findings that shape the whole design

### 1. Claude watermarks its text output, globally, since 2 August 2026

Every Claude model launched on or after 2 August 2026 embeds a statistical
watermark in generated text — a SynthID-Text variant — across the Platform API,
claude.ai, Claude Code, and Claude accessed via AWS, Google Cloud and Microsoft
Foundry. Generated images carry signed C2PA provenance metadata instead.
Anthropic is building a public detection API. This is EU AI Act compliance,
applied worldwide because there is no durable way to scope it by region.

Three consequences for a content business:

- **Clients must be told.** Selling content production without disclosing that
  the output is detectably AI-involved is a misrepresentation waiting to happen,
  and the detection API will make it checkable by anyone.
- **Heavy human editing genuinely changes the picture.** Anthropic states the
  watermark is unreliable on short samples and that heavy rewriting can strip it.
  So the human editing pass is no longer only a quality step — it is provenance
  management.
- **It is a selling point if handled honestly.** "We disclose AI involvement, and
  every piece is built on first-party research and rewritten by a person" beats
  an agency quietly shipping detectable output at scale.

Detail in [04-PROVENANCE.md](04-PROVENANCE.md).

### 2. Commodity content is now actively worthless

The article notes Google is aggressively noindexing commodity content, and its
own publication is running pieces on "AI slop" and watermarking in the same week.
The strategic conclusion is unavoidable: **a content engine whose output is
generic is a machine for producing nothing.**

Which means the engine's value does not come from the pipeline. It comes from the
inputs — first-party research, real client outcomes, our own audit data. The
pipeline only makes those inputs repeatable. That is exactly what
[02-CONSTANTS-AND-GAPS.md](02-CONSTANTS-AND-GAPS.md) audits, and the honest
finding there is that **StudEx currently has most of the brand inputs and almost
none of the research inputs.**

---

## Why this matters right now

Two days ago the answer to "are we still making content here?" was: production
stopped on `main` in June, and the 24-hour posting calendar schedules nine slots
a day against an empty queue.

This engine is the fix, but not by filling nine slots a day with generated
captions — that is precisely the commodity output Google has stopped indexing.
The fix is **one non-commodity pillar piece per week, cut down into the calendar
slots.** One thing worth reading, derived into many. The article's own
recommendation is to start with a single content type and add derivatives later,
and that is the plan in [03-PIPELINE.md](03-PIPELINE.md).

## Relationship to the managed-agents pack

This engine is the Social agent's operating procedure. Run it on StudEx first,
learn where it breaks, and only then offer it to a client.

- Agent roster and loops: `studex/managed-agents/09-COMPANY-IN-A-BOX.md`
- The client vault supplies the constants: `templates/client-vault/`
- The 6-hour signal loop supplies topic candidates
- Every publish stays behind the approval gate

The `approved/` versus `reference-only/` split in the client vault is the same
mechanism this engine needs for source control. Nothing new to invent.

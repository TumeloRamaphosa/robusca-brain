# The pipeline

**Prepared:** 25 Aug 2026

Order of operations, the agents, and the human gates. Structure follows the
Search Engine Land method, with StudEx's approval discipline layered on.

---

## The flow

```
  TOPIC SELECTION                    from the 6h signal loop, or a human brief
        │                            brief must name its non-commodity element
        ▼
  ┌───────────────┐
  │ ORCHESTRATOR  │  owns the sequence, refuses to skip a step
  └───────┬───────┘
          ▼
  ┌───────────────┐
  │ RESEARCHER    │  → dossier: claims, sources, gaps, our own prior coverage
  └───────┬───────┘
          ▼
  ┌───────────────┐
  │ OUTLINER      │  → structure, section by section, each mapped to a source
  └───────┬───────┘
          ▼
    ╔═══════════════════════════╗
    ║ HUMAN GATE 1 — the cheap  ║   scrap / revise / continue
    ║ one. Decide here.         ║   before the tokens are spent
    ╚═══════════┬═══════════════╝
                ▼
  ┌───────────────┐
  │ WRITER        │  → draft, from dossier + outline + voice + ICP
  └───────┬───────┘
          ▼
  ┌───────────────┐
  │ EDITOR        │  structure, coverage, style compliance   [new context]
  └───────┬───────┘
          ▼
  ┌───────────────┐
  │ FACT CHECKER  │  adversarial. Assumes everything is wrong [new context]
  └───────┬───────┘
          ▼
  ┌───────────────┐
  │ AI EDITOR     │  AI tells only. Not style.               [new context]
  └───────┬───────┘
          ▼
      second pass through editor → fact checker → AI editor
          ▼
    ╔═══════════════════════════╗
    ║ HUMAN GATE 2 — final.     ║   a person changes something material
    ║ Never skipped. Ever.      ║
    ╚═══════════┬═══════════════╝
                ▼
  ┌───────────────┐
  │ DERIVATIVES   │  social cuts from the published pillar
  └───────┬───────┘
          ▼
    approval gate per platform → publish
```

---

## Why the editors are split three ways

This is the article's most valuable finding and it is worth restating because it
is counterintuitive: the author started with one editor handling structure,
coverage and style, and splitting it produced better output than asking one
context to fix everything. Separately, *"asking an editor to fact-check resulted
in two poorly done jobs."*

Each editor runs in a **new context window**. That is not a performance
optimisation — an editor that has just been reasoning about narrative structure
is a worse fact-checker, because it is invested in the draft it has been
improving. The fact-checker in particular must arrive hostile.

| Agent | Single job | Explicitly not its job |
|---|---|---|
| Editor | Structure, coverage, style compliance, missing bridges | Facts, AI tells |
| Fact checker | Disprove every claim | Style, structure |
| AI editor | Strip AI tells | Style, facts, structure |

**Two full passes** before the human gate. The article reports this gets a piece
to roughly 95%, and that the remaining 5% is what the human is for.

---

## The two human gates

### Gate 1 — after the outline

The cheap gate, and the one most people omit. Reviewing a structure costs a
fraction of reviewing a finished piece, and killing a bad angle here saves the
whole run. Three outcomes only: scrap, revise, continue.

Ask one question: **does this piece contain something only we could say?** If the
answer is no at outline stage, it will still be no at draft stage, and no amount
of editing fixes it.

### Gate 2 — before publishing

Never skipped, never automated, no exceptions for deadline pressure. The
requirement is that **a person changes something material** — not approves, not
skims, changes. If a reviewer has nothing to change across several pieces in a
row, they are not reviewing.

Nothing publishes to a CMS or a platform without passing gate 2, and there is no
version of this system with API auto-publish enabled.

---

## Cadence

Deliberately modest. The failure mode is volume.

| Cadence | Output |
|---|---|
| Weekly | **One pillar.** Non-commodity, human-edited, published |
| From each pillar | Three to five social derivatives, spread across the week |
| Monthly | One refresh of an existing piece with new data |
| Continuous | 6-hour signal loop feeding the topic queue |

One pillar a week is 50 a year, each carrying something original. That is a
genuine asset. Nine generated captions a day is a liability that trains the
audience to scroll past.

The existing 24-hour posting calendar has nine slots. **Do not fill them from
scratch.** Fill them from derivatives, and leave slots empty rather than filling
them with commodity output. An empty slot costs nothing; a bad post costs
attention you have to earn back.

## Topic selection

Ranked source order:

1. **THE AUDIT questions** — ten pillars already scoped, each carrying our own data
2. **Signal loop themes** — questions repeating in our own comments, DMs and inbox
3. **Our own operating experience** — what we learned building this
4. **Client outcomes** — once client one exists, with written permission
5. **Industry events** — only where we have a first-party angle

A topic with no available non-commodity element does not enter the queue,
regardless of how good the keyword looks.

---

## Refresh loop

The article calls this an important part of its workflow, and it is cheaper than
new production: update an existing piece with new stats and information.

Monthly: pick the piece with the best position and the oldest data, re-run the
researcher on it only, update the numbers, re-date it, note what changed. Full
pipeline not needed — researcher, editor, fact-checker, human gate.

---

## What runs where

| Component | Where |
|---|---|
| Agent documents | [`agents/`](agents/) in this repo |
| Constants pack | `constants/` — to be created, see doc 02 |
| Dossiers, outlines, drafts | Client or StudEx vault, versioned |
| Kickoff | A brief in `#content` with the required fields |
| Gates | Buzz `#approvals`, per the managed-agents approval mechanic |
| Published record | Vault `decisions/`, so we know why each piece ran |

No new infrastructure. The vault, the channels and the approval gate already
exist in the managed-agents design, and reusing them means the content engine
inherits the audit trail for free.

---

## Build order

The article's advice is to start with one agent if the whole thing is too much.
That is right, and the order matters:

1. **Constants pack** — `ICP.md` first. Nothing works without it.
2. **Researcher** — on its own, producing dossiers a human writes from. Useful
   from day one even with no other agent built.
3. **Outliner plus gate 1** — cheapest quality improvement available.
4. **Writer.**
5. **Fact checker** — before the other two editors. It prevents the worst
   failure, which is publishing something false.
6. **Editor**, then **AI editor**.
7. **Orchestrator** — last, once the sequence is known and stable.
8. **Derivatives**, only after the pillar pipeline is reliable.

Steps 1 and 2 alone would put StudEx further ahead than it is today, because the
current constraint is not writing capacity — it is that there is nothing original
to write about, and the researcher is the agent that fixes that.

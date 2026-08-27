# Studex Design Language
**Version 0.1** | Tokens: [`tokens.css`](tokens.css) | Preview: [`preview.html`](preview.html)

---

## The idea in one line

> **The interface is a document, not a dashboard.**

Studex sells institutional memory and accountability. The product should feel like a
well-set financial report or a legal instrument — quiet, exact, dense with fact, and
completely uninterested in impressing you. Anything that looks like consumer software
undermines the thing being sold.

Minimal here does not mean sparse. It means **nothing that isn't carrying information.**

---

## Five rules

### 1. Remove, don't style
The first response to any UI element is to delete it. Card borders, background fills,
drop shadows, icon decoration, gradient headers, coloured section banners — cut them.
What remains is text, rules, and space, and that is enough.

If something needs emphasis, use position and space before you use colour or weight.

### 2. Gold is a signal, never a surface
`--gold` appears **once per view, at most.** It marks the single thing that needs
attention: an open decision, an expiring document, a breached threshold. Gold on a
button, a header bar, or a nav item spends the signal on decoration and the eye stops
noticing it.

Never gold text on white below 16px — it fails contrast. Use `--gold-deep` for small
text on light, `--gold-bright` on dark.

### 3. Data is monospace
Every number a client might check — money, credits, dates, counts, IDs, percentages —
is set in `--font-mono`. It makes columns align without table borders, it signals
"this is a fact, not a claim," and it is the typographic equivalent of showing your
working.

Prose is `--font-sans`. Editorial moments — a report title, a cover — are
`--font-serif`. Display type (`--font-display`) is for the wordmark and almost nothing
else.

### 4. Hairlines, not boxes
Structure comes from 1px rules and whitespace. A section is separated by a rule and
`--s-6` of space, not by a card with a border-radius and a shadow. The only shadow in
the system is on overlays, because an overlay genuinely floats.

### 5. Left-aligned, always
No centred body text. No centred headings except on a true cover. A hard left edge down
the whole page is what makes a document scan quickly, and scanning is what clients do.

---

## Type

| Role | Font | Size | Tracking | Case |
|---|---|---|---|---|
| Wordmark | Bebas Neue | — | `--track-display` | UPPER |
| Report title | Cormorant Garamond | `--text-3xl` | normal | Sentence |
| Section heading | Inter 600 | `--text-lg` | normal | Sentence |
| **Eyebrow / label** | Inter 500 | `--text-xs` | `--track-label` | UPPER |
| Body | Inter 400 | `--text-base` | normal | Sentence |
| Secondary | Inter 400 | `--text-sm` | normal | Sentence |
| **Data** | Space Mono | `--text-sm` | `--track-mono` | — |

The **eyebrow** is the workhorse. Small, uppercase, wide-tracked, `--fg-muted` — it
labels every block without needing a heavier heading. It is what makes the layout feel
structured rather than empty.

Body copy never exceeds `--measure` (68ch).

---

## Layout

Twelve-column grid, `--gutter` of `--s-6`, `--content-max` of 1180px.

Three canonical page shapes, and everything is one of them:

**Document** — single column at `--measure`, left-aligned. The morning brief, the Friday
report, any agent output. This is the default and most screens should be this.

**Ledger** — full-width monospace table, hairline row rules, no vertical rules, no zebra
striping. Right-align numbers, left-align everything else.

**Console** — two columns, 8/4. Content left, metadata right. Used only for the tenant
detail view.

Vertical rhythm is the space scale and nothing else. If a gap doesn't come from
`--s-*`, it's a bug.

---

## Components

**Status** is a word, not a pill. `ACTIVE` in an eyebrow style, coloured with a signal
token. No background, no border, no dot. A coloured chip on every row turns a page into
confetti.

**Buttons** are text with a 1px underline offset, or — for the single primary action per
view — a solid obsidian rectangle with `--radius`. Never more than one solid button on
screen.

**Tables** have a top and bottom rule, a rule under the header row, and nothing else. No
vertical rules, no zebra striping, no hover fills. Numbers right-aligned in mono.

**Empty states** are one line of `--fg-muted` text. `No tenders matched today.` Not an
illustration, not a card, not a call to action. The whole product philosophy is that
silence is information.

**Forms** — this is the "formful" part, and it deserves care since clients will spend
real time here:
- Label above input, always. Never placeholder-as-label
- Inputs are a bottom rule only, not a box. They gain a full hairline box on focus
- Help text below, `--text-xs`, `--fg-muted`, always present rather than appearing on error
- Errors are `--signal-bad` text below the field, and the field's rule turns the same colour
- Group related fields under an eyebrow with a rule above. That grouping *is* the form's structure
- One column. Two-column forms scan badly and break on mobile

---

## What this deliberately isn't

| Not this | Because |
|---|---|
| Cards with shadows on a grey background | Reads as a SaaS template. Everything looks equally important |
| Coloured status pills on every row | Confetti. The eye stops distinguishing |
| Icons beside every label | Decoration masquerading as affordance |
| Purple/blue gradients | The 2023 AI aesthetic. We are positioned against exactly that |
| Animated loading skeletons | Implies the wait is interesting. Show a hairline progress rule |
| Dark mode as the default | Dark mode is available. Documents default to light |
| Emoji in the interface | Never |

---

## Applying it to agent output

The routines produce text that lands in WhatsApp and Slack, where none of this CSS
exists. The discipline still applies, and arguably matters more:

- Lead with the fact, not a greeting
- Numbers with the `R` prefix, dates as `2026-08-26`, names as initials
- One blank line between sections, no ASCII art, no rules
- Sections in CAPS as the eyebrow equivalent
- Under 200 words for a brief, under 400 for a report
- Silence when there is nothing to say

A morning brief should read like a note from a very good chief of staff: short, factual,
and finished.

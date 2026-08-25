# Definition of done

**Prepared:** 25 Aug 2026

Work backward from the finished piece. This document is that finished piece,
described precisely enough that an agent can be measured against it.

Everything else in the engine exists to satisfy this document. If a rule here
cannot be checked, it is not a rule — it is a hope, and it gets deleted.

---

## The universal bar

Every piece, regardless of type, must pass all eight. A failure on any one sends
it back rather than through.

| # | Criterion | How it is checked |
|---|---|---|
| 1 | **Non-commodity** | Contains at least one thing that could only come from us — first-party data, a client outcome, our own audit result, a named opinion with reasoning |
| 2 | **Accurate** | Every factual claim, statistic and name traced to a source in the dossier. Anything untraceable is cut, not softened |
| 3 | **In voice** | Passes the voice rules in `SOUL.md` — checked against examples, not adjectives |
| 4 | **Correct about us** | Describes StudEx offerings exactly as the launch pack states them. No invented capability |
| 5 | **Useful to a named reader** | One ICP named on the brief. A reader who is "everyone" produces content for nobody |
| 6 | **Human-edited** | A person has changed something material. Not a rubber stamp |
| 7 | **Legally clean** | Passes the claim checklist: no unverified partnership, licence, filing, compliance or performance claim |
| 8 | **Provenance handled** | AI involvement disclosed per [04-PROVENANCE.md](04-PROVENANCE.md) |

**Criterion 1 is the one that decides whether this engine is worth running.** If a
piece would be indistinguishable from something a competitor's tool could emit,
it fails, and shipping it is worse than shipping nothing because it trains the
audience to skip us.

**Criterion 2 has a hard rule:** an unsupported claim is deleted. Not hedged, not
qualified into vagueness. Deleted. Hedging is how a hallucination survives editing.

---

## Per content type

The article's advice is to build for one content type first. **Pillar is the one
to build.** Everything else is derived from it, which is also the cheapest way to
fill a posting calendar with something that is not commodity.

### Type A — Pillar (build this first)

The long-form authority piece. 1,200–2,000 words.

| Requirement | Standard |
|---|---|
| Non-commodity core | At least one original data point, audit result or client outcome we own |
| Structure | Bottom line up front. The claim in the first 60 words |
| Proof position | The evidence for the headline claim appears before the halfway point |
| Sources | Minimum three citable, dated, named. Zero from the avoid list |
| Named reader | One ICP, stated on the brief |
| Offer | One, at the end, matching the launch pack exactly |
| Voice | Cormorant Garamond / Bebas Neue in layout; plain declarative sentences in copy |
| Length of paragraph | Four lines maximum |
| Meta | Title, meta description, URL slug proposed |
| Failure condition | If the piece could have been written without access to StudEx, it fails |

### Type B — Social derivative

Cut from a published pillar. **Never written from scratch** — that is the rule
that keeps the calendar non-commodity.

| Requirement | Standard |
|---|---|
| Source | Must name the pillar it derives from |
| Hook | Lands in 1–3 seconds. No logo, no intro, no greeting in the opening second |
| Hook type | Hot take or investigator for reach; proof drop for saves |
| Claim proved | Within 10 seconds, or the hook is bait |
| Per platform | Same script, opening second re-cut per platform. Never cross-post an identical file |
| Length | Favour 90 seconds plus for video |
| Measurement | 3-second retention, not views |

Format rules carried from the launch strategy in
`studex/launch-2026-08/01-VIRAL-CONTENT-ENGINE.md`, which derived them from
measured data rather than opinion.

### Type C — Client-facing operational content

For the managed-agents service: FAQ answers, standard replies, knowledge-pack
entries.

| Requirement | Standard |
|---|---|
| Source | Only from that client's `approved/` folder |
| Citation | Every answer names its source document |
| Voice | The client's `SOUL.md`, not ours |
| Boundary | Nothing outside that client's `BOUNDARIES.md` |
| Approval | The client's named approver, per action |

### Type D — Investor and partner material

| Requirement | Standard |
|---|---|
| Claim checklist | Every item in `studex/managed-agents/06-RISK-REGISTER.md` section "What I would do this week" |
| Numbers | Actuals labelled as actuals, projections labelled as projections |
| Partnerships | Agreed in writing, or described as prospective |
| Licences | Verified against the actual licence text |
| Counterparties | Sanctions-checked before naming |

Type D exists as a separate category because the deck showed what happens when
marketing standards are applied to a document that needs diligence standards.

---

## What "in voice" means concretely

The article is blunt that a voice guide made of adjectives is useless: *"You
don't want to say 'friendly, but formal.' Instead, provide examples of what this
looks like in practice, as well as examples of what to avoid."*

StudEx voice, as rules an agent can apply:

**Do:**

- lead with the claim, then support it;
- short declarative sentences;
- name the number and its source;
- state an opinion and give the reasoning;
- concrete nouns — "Wagyu ribeye, marble score 8", not "premium offerings".

**Do not:**

- open with a question;
- use "unlock", "leverage", "revolutionise", "game-changing", "seamless",
  "cutting-edge", "in today's fast-paced world";
- stack three adjectives before a noun;
- write a sentence that would survive unchanged in a competitor's copy;
- end on "the possibilities are endless" or any variant;
- use an exclamation mark outside a quoted person.

**This sounds right:** *"Order tonight. Deliver tomorrow."*
Four words, a promise, a deadline, no adjective.

**This sounds wrong:** *"Unlock the endless possibilities of premium culinary
excellence with our game-changing selection."*
Nine words of nothing, and it could be any company.

---

## The scoring gate

Before a human sees a piece, the pipeline scores it. Below threshold it returns
to the writer rather than reaching the review gate — the point is to spend human
attention on judgement, not on catching mechanical failures.

| Check | Pass condition |
|---|---|
| Non-commodity element present | At least one, identified by name |
| Untraceable claims | Zero |
| Banned phrases | Zero |
| Paragraphs over four lines | Zero |
| Sources from the avoid list | Zero |
| Named ICP on the brief | Present |
| Offer matches launch pack | Exact |
| Claim checklist | All pass |

Two failures on the same check across three pieces means the input pack is wrong,
not the writer. Fix the constants, not the prompt — that is the difference
between a system that improves and a system that gets patched forever.

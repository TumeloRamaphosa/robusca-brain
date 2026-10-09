---
name: agentry
description: "Run the StudEx agent-orchestrated content production line: research, angle, hook, script, proof, approval, publish, measure. Encodes the 2026 format rules (1-3s hook window, hot-take and proof-drop hooks, greenscreen, 90s+ length) as hard production constraints. Use when asked to make viral content, write scripts, run the content engine, or produce a campaign."
metadata:
  author: robusca
  version: '1.0'
  business: StudEx Group
  last_updated: '2026-08-22'
---

# agentry — The Content Production Line

## What This Skill Is

A pipeline, not a prompt. Content that performs is a manufacturing output: same stations,
same tolerances, every unit. The creative variance lives in the *angle*, not in the process.

Eight stations. Nothing skips a station. The approval gate is the only one a human owns.

```
1 RESEARCH → 2 ANGLE → 3 HOOK → 4 SCRIPT → 5 PROOF
                                              ↓
              8 MEASURE ← 7 PUBLISH ← 6 APPROVE (human: Tumelo)
```

## Station 1 — Research

Run the `last30days` skill. Attach the output path to the work item.

**Gate:** No sweep, no script. Content produced without a sweep violates `STUDEX_OS.md`
rule 8 and gets rejected at Station 6.

## Station 2 — Angle

One idea per piece. If the piece needs "and", it is two pieces.

Rank candidate angles against these, in order:

1. **Is it contrarian and true?** Contrarian and false is a liability. True and obvious is invisible.
2. **Can it be proven on screen in under ten seconds?** If the proof needs a paragraph, it is a blog post.
3. **Would a stranger repeat it at lunch?** The repeatability test. If they need the deck, it fails.
4. **Does it survive the buyer's next question?** Every claim invites "prove it". Have the receipt ready before publishing, not after.

## Station 3 — Hook

The hook window in 2026 is **one to three seconds**, and it is platform-specific:
Reels ≈ 1s, TikTok ≈ 1.5s, Shorts ≈ 2s. Everything else is downstream of this.

**Ranked hook archetypes** (from the August 2026 sweep — see
`research/last30days/2026-08-22-viral-and-agent-narrative.md`):

| Archetype | What it is | Use for |
|---|---|---|
| **Hot Take** | A bold, defensible claim that some people will resist | Reach. Top performer by average views. |
| **Investigator** | A question or unfolding mystery | Reach. Roughly matches Hot Take. |
| **Proof Drop** | A chart, receipt, screenshot, or hard number | Saves. Far and away the best save rate. |
| **Direct address** | Eye contact, naming the viewer's situation in five words | Trust and conversion. |
| Story ("so the other day…") | Narrative warm-up | **Avoid as an opener.** An order of magnitude weaker than Hot Take. |

**Hard constraints:**

- No logo, no intro, no greeting, no dead air in the opening second. This is the most
  common reason a good piece flops.
- One trigger, not four. Pick a single mechanism and commit.
- Numerical specificity beats adjectives. "Only about 130 of thousands are real" beats
  "most are fake".
- Write five hook variants per piece. Ship the one that survives being read aloud, cold,
  to someone who does not care.

## Station 4 — Script

**The lock-in zone** is the five to ten seconds immediately after the hook. The hook makes
a promise; the lock-in zone pays a deposit on it. Confirm the hook's claim with concrete
proof right there — chart, screenshot, number. A hook whose claim is not substantiated
within ten seconds reads as bait and the retention curve collapses.

**Length:** go long. Long-form short-form is winning decisively — 90s+ materially
outperforms sub-15s clips, because current ranking favours accumulated watch time over
completion rate. Do not pad to reach length; pick angles with enough substance to earn it.

**Structure:**

```
0:00–0:03   Hook (one trigger, no setup)
0:03–0:12   Lock-in: prove the hook's claim on screen
0:12–1:00   Body: one idea, three beats, each beat with a visual
1:00–1:30   Payoff: the useful thing they came for. Give it away fully.
1:30–end    One CTA. One. Named next step, not "link in bio".
```

**Voice:** StudEx house voice per `SOUL.md` — bold, strategic, no fluff. Expensive,
intentional, global. No hype adjectives, no emoji stacks, no "game-changer". Sentences a
CFO would not wince at.

## Station 5 — Proof

Every factual claim gets a receipt attached to the work item before it moves. Three tiers:

- **Tier 1 — Primary.** Our own instrumented numbers, screen recordings, signed contracts.
- **Tier 2 — Named third party.** Analyst reports, regulator publications, named clients with permission.
- **Tier 3 — Inference.** Must be visibly framed as opinion in the content itself.

**Rule:** a claim about a customer outcome must be Tier 1 or it does not ship. If the
campaign thesis is that competitors overclaim, an unsubstantiated claim of ours is not a
small error — it is the whole argument, lost.

**Format:** proof is visual. Greenscreen and screen-recording formats — creator overlaid on
a chart, article, or live product screen — substantially outperform plain talking-head.
Montage is the weakest format; avoid it.

## Station 6 — Approve (human gate)

`STUDEX_OS.md` rule 1: **never post without Tumelo's explicit approval.** Non-negotiable.

Submit to `studex/naledi-approval-log.md` via the `studex-content-approvals` skill with:

- The piece, in final form
- The `last30days` sweep path
- The proof tier for every claim
- The one metric this piece is trying to move

**Reject at this gate if:** no sweep, any Tier 3 claim presented as fact, more than one CTA,
logo in the first second, story hook as opener, or any customer outcome without Tier 1 proof.

## Station 7 — Publish

Per `STUDEX_OS.md`: generate to `content/YYYY-MM-DD/`, publish via Graph API or WhatsApp
Cloud API after approval, log the result to `memory/YYYY-MM-DD.md`.

**Founder account first.** Founder-led distribution outperforms brand-account distribution
for B2B, and the @ramaphosatumelo account is the largest owned audience in the group.
Brand accounts amplify; they do not originate.

**Mix (70/15/15):** 70% authority (frameworks, teardowns, industry analysis),
15% personal (build-in-public, including the failures), 15% offer.
Drifting toward offer is the standard failure mode. Audit the ratio monthly.

## Station 8 — Measure

**Measure 3-second retention, not views.** Views are a lagging output of the hook. Retention
is the hook's actual score, and it is the only number that tells you what to do next.

Log per piece in `content/performance-log.md`:

| Date | Piece | Hook archetype | Format | Length | 3s retention | Saves | Shares | Conversions |

**Reading the data:**
- Minimum five pieces per hook archetype before drawing a conclusion. One hit is noise.
- A sustained 10–15% retention lift across five pieces is a real signal. A single spike is not.
- Track weekly retention trend, not individual post performance. A curve creeping up over
  four weeks beats any one viral outlier.
- Kill any archetype that underperforms across five pieces. Do not defend it because it was
  someone's idea.

## Anti-Patterns

- **Volume as strategy.** Four posts a day of station-skipped content trains the algorithm
  that you are low quality. Fewer, proven, is faster.
- **Cross-posting identical cuts.** Different hook windows per platform means different
  first seconds. Same script, re-cut opener.
- **Announcing instead of demonstrating.** "We built X" is an announcement. Showing X doing
  something surprising is content. Always prefer the demo.
- **Burying the payoff behind the CTA.** Give the useful thing away completely. The pipeline
  is built on trust surplus, not curiosity debt.
- **Hype voice.** The category is in a credibility recession. Restraint reads as confidence.

## Related Skills

- `last30days` — mandatory Station 1 input
- `studex-content-approvals` — Station 6 gate
- `studex-meta-whatsapp` — Station 7 distribution
- `studex-ads-manager` — paid amplification of pieces that clear the retention bar organically
- `robusca-memory-sync` — persist performance learnings

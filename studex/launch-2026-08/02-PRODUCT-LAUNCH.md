# The Product Launch
**Prepared by:** Robusca Romanov | **Date:** 2026-08-22
**Evidence:** [`research/last30days/2026-08-22-viral-and-agent-narrative.md`](../../research/last30days/2026-08-22-viral-and-agent-narrative.md)

---

## The recommendation

> ## Launch **Business Ghost**. One product, one price, one promise, one demo.
> ## Do not launch the ecosystem.

The diagram describes eight or nine launchable things. Launching all of them means launching
none of them, because a launch is an act of *concentration* — you get one sentence in
somebody's memory and you either spend it on one thing or you waste it on a taxonomy.

Business Ghost is the right single thing. Everything else in the architecture is either the
expansion sale, the content engine, or a business that shouldn't launch yet.

---

## Why Business Ghost, scored against the alternatives

Six criteria that actually determine whether a launch converts:

1. **Demonstrable in under 60 seconds** — if it needs a deck, it needs a sales team, and a sales team is not a launch
2. **Delivery cost near zero per customer** — otherwise virality is a liability
3. **No cold-start dependency** — does it work for customer number one, alone?
4. **Creates the next sale** — does buying it make the bigger product inevitable?
5. **Matches what buyers are screening for right now** — the Aug 2026 window
6. **Content-native** — does using it generate its own content?

| Candidate | Demo | Cost | Cold start | Next sale | Market fit | Content | Call |
|---|---|---|---|---|---|---|---|
| **Business Ghost** | ✅ visceral | ✅ low | ✅ none | ✅ all of it | ✅ *the* criterion | ✅ endless | **LAUNCH** |
| Super Agents | ⚠️ needs setup | ⚠️ high touch | ✅ | — is the next sale | ✅ | ⚠️ | Expansion, not launch |
| Execution Exchange | ❌ empty at launch | ✅ | ❌ **two-sided** | ✅ | ✅ | ✅ | Phase 4 |
| Studex Rise *(was Agentic Rise)* | ❌ it's a programme | ❌ human-heavy | ❌ needs density | ✅ | ⚠️ | ✅ | Phase 3 cohort |
| Studex Arcade | ⚠️ | ❌ human-heavy | ❌ needs density | ⚠️ slow | ⚠️ | ✅ | Phase 3+ |
| Midnight Founders Club | n/a | ✅ | ⚠️ | ⚠️ indirect | ✅ | ✅ **best** | **Engine, not product** |
| Studex Cloud | ❌ commodity | ❌ capex | ✅ | ⚠️ | ❌ hyperscaler fight | ❌ | Attach, never lead |
| Studex Token | ❌ | ❌ | ❌ | ❌ | ❌ actively harmful | ❌ | **Do not launch** — [risk register](03-RISK-REGISTER.md) |

The three that matter:

**Business Ghost wins on criterion 5 alone.** Gartner's own definition of a genuine agent
names *persistent memory* as a defining capability, and its estimate is that only ~130 of
thousands of vendors qualify. Memory is not a feature we happen to have — it is the exact
thing the market has started grading on. Launching the memory layer means being graded on
our strongest subject in the one month everyone decided to give the exam.

It also wins on criterion 1 in a way nothing else does. "Ask it something only your company
would know" is a demo a stranger can run on themselves in thirty seconds, and the moment of
recognition — *this thing knows things about us* — is emotional rather than technical. That
is what travels.

**Execution Exchange is the trap.** It is the most exciting box on the diagram and it must
not be launched first. It is a two-sided marketplace: worthless to a buyer until there are
suppliers, worthless to a supplier until there are buyers. Launching it into an empty room
produces a public ghost town, and a marketplace only gets one first impression. It becomes
viable *after* Ghost has put a few hundred companies inside the system — at which point the
supply side already exists and the cold start is solved for free. Sequencing is the whole
game here.

**Midnight Founders Club is not a product and shouldn't be positioned as one.** It is the
best content engine in the portfolio — a weekly ritual with its own supply of stories and
guests who bring their own audiences. Treat it as marketing infrastructure that happens to
also build the talent pipeline. Charging for it early would kill the thing that makes it
valuable.

---

## Launch shape

Four phases. Phase 0 is a gate, not a phase — nothing after it starts until it clears.

### Phase 0 — RECEIPTS *(the gate)*

**The problem:** there is not one instrumented outcome number anywhere in this workspace for
NtechLab, Pharmasyntez, ART Engineering MDC or Project Phoenix. The notebooks assert
Enterprise-tier deployment. They evidence no result.

The entire campaign thesis is "everyone else overclaims." Launching that campaign on
unsubstantiated claims of our own is not an ordinary marketing risk — it is handing a
journalist the story, and the story is better than anything we'd have gained.

**Exit criteria — all four:**
- [ ] Three named deployments with at least one hard number each, in writing, with permission to publish
- [ ] The ten-question Audit run against our own stack, scored honestly, failures documented
- [ ] Every claim intended for launch copy mapped to a Tier 1 or Tier 2 receipt
- [ ] **API keys rotated** per [`KEY_ROTATION_CHECKLIST.md`](../../KEY_ROTATION_CHECKLIST.md)

That last one is not housekeeping. `MEMORY.md` records five-plus live keys leaked publicly in
June, marked for rotation and not confirmed rotated. A launch is a deliberate attempt to
direct scrutiny at our infrastructure. Doing that with known-exposed credentials, while
selling governance and auditability, is the worst possible combination of exposure and
hypocrisy.

**If Phase 0 stalls on the enterprise numbers**, do not wait and do not fudge. Manufacture
fresh receipts instead — see Ghost Day below. Twenty companies onboarded live, with
published week-one results, is *better* evidence than a two-year-old enterprise anecdote,
because it is current, it is public, and the audience watched it happen.

### Phase 1 — THE ARGUMENT (weeks 1–3)

Publish the Audit. Build the audience. **Sell nothing.**

- The ten-question Audit, free and ungated
- Series A pieces working through the questions
- Our own scorecard published, failures included
- Midnight sessions begin — the ritual starts before the product needs it
- Email list built off the Audit, not off a product waitlist

**Success:** the Audit gets cited by people who don't work here.

### Phase 2 — GHOST DAY (week 4)

A single live event, streamed, where companies bring their own material and walk out with a
working Business Ghost the same day.

Why an event rather than a press release: it collapses launch, demo, onboarding and case-study
generation into one artefact. Every participant is a receipt. Every question they ask their
Ghost is a Series B script. And a room of real companies getting real answers is the only
proof format that cannot be faked, which is precisely the claim we're making about everyone
else.

- Cap the cohort — 20 to 30 companies. Scarcity is honest here; hand-holding twenty is real work
- Publish week-one results for every participant who consents, good and bad
- Unedited one-take demo published the same day

### Phase 3 — EXPANSION (weeks 5–12)

The Ghost is the wedge; this is where the wedge pays.

- **Super Agents upsell** to Ghost customers. This is now an easy conversation: the memory
  already exists, so "put a workforce on it" is an increment rather than a new decision.
- **Studex Rise** first cohort, recruited from Ghost customers and Midnight regulars
- **Ledger #1** published — the first public numbers
- Arcade opens as the talent feeder into Rise

### Phase 4 — THE MARKET (month 4+)

Execution Exchange opens once there is genuine supply inside the system. Not before. The
gate is a real number of active companies, decided in advance and not fudged when the date
approaches.

---

## Pricing

**Recommendation: introduce a Ghost tier below the existing R3,500 Starter.**

| Tier | Price | What it is |
|---|---|---|
| **Ghost** | **R950 / company / month — unlimited seats** | The wedge. Memory only. |
| Starter | R3,500 / mo | Soul agent, basic Obsidian Brain, email agent |
| Business | R10,000 / mo | All agents, fully integrated |
| Enterprise | R20,000 / mo | White-glove, custom training, full NestVM |

Three deliberate choices:

**Priced as an on-ramp, not a profit centre.** R3,500 is a considered purchase requiring a
decision-maker and a meeting. R950 is a card swipe. The wedge's job is volume and memory
lock-in; margin comes from the R10k and R20k tiers it feeds. Pricing the wedge for margin
would defeat its only purpose.

**Per company, unlimited seats — and say so loudly.** Per-seat pricing is on the published
list of agent-washing tells, right alongside missing audit trails. Flat per-company pricing
is both the more honest model for a memory product (one memory per company, not per person)
and a free positioning shot: *we don't charge you per human, because the memory isn't per
human.* Consistency between what we sell and how we charge is the campaign in miniature.

**Ghost customers get the Audit-passing guarantee in writing.** If we fail any of our own ten
questions on their deployment, they don't pay that month. Cheap to offer if the product is
real; unthinkable to offer if it isn't. That asymmetry is exactly the signal we want to send.

---

## What "launched" means

Thirty days after Ghost Day, judged on these and nothing else:

| Metric | Target | Why this one |
|---|---|---|
| Companies with a live Ghost | 50+ | The only number that compounds |
| Audit downloads | 2,000+ | Argument reach, independent of product |
| Third-party citations of the Audit | 5+ | Positioning landed vs. merely broadcast |
| Ghost → Starter/Business conversion | 10%+ | Proves the wedge is a wedge |
| Published case studies with hard numbers | 10+ | Fixes the Phase 0 deficit permanently |
| Weekly 3-second retention trend | rising 4 weeks straight | Content engine working, not one lucky post |

Deliberately **not** targets: follower count, total views, press mentions. All three can go
up while nothing is being built.

---

## Risks worth naming

**"Business Ghost" reads unserious to a conservative CFO.** Real, and accepted. The
memorability is worth more than the polish, and the contract name (`Studex Memory`) carries
the seriousness on paperwork while the public name does the marketing work. Revisit only if
enterprise deals are observed dying on the name specifically — not on a hunch.

**Memory is a trust product, so a data incident is existential rather than expensive.** We
would be asking companies to centralise their most sensitive institutional knowledge, having
already had a credential exposure this year. Phase 0's rotation requirement is the minimum,
not the answer. Before Ghost Day: encryption at rest, tenant isolation actually verified
rather than assumed, and a written incident response plan. If asked publicly about security,
the answer must be a document, not a sentence.

**The anti-agent-washing position invites scrutiny of us specifically.** That is the point,
and it is only a risk if Phase 0 is skipped. Anyone who takes the Audit position publicly
should expect a competitor to run our own ten questions against us within a fortnight. Good.
We should have the answers published before they ask.

**The window closes.** Anti-hype is currently both the highest-reach and highest-trust
position available — a rare alignment that exists because the market's correction is fresh.
Once it is priced in, this becomes ordinary positioning. That argues for moving on Phase 1
now and not perfecting the product first.

**Twenty companies hand-held in one day is real operational load.** Ghost Day is a promise
made in public. Under-deliver on it and the receipts turn into the opposite of receipts. Cap
the cohort honestly and staff it properly.

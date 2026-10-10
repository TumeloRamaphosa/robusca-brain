# The constants pack, and what we are missing

**Prepared:** 25 Aug 2026

The article is emphatic on this point: *"If you don't have the appropriate
inputs, like information about your ICP, examples of quality content, or links to
first-party research, no content workflow is going to help you create
noncommodity content that resonates with your audience."*

So this document audits the inputs before anything is built. The finding is
straightforward and worth stating up front: **StudEx has most of the brand
inputs and almost none of the research inputs.** The brand side is in decent
shape. The research side is the gap, and it is the one that decides whether the
output is worth publishing.

---

## Constants versus per-run inputs

**Constants** are hard-coded into the engine and shared across every run.
**Per-run inputs** arrive with each brief.

Per-run: topic, angle, keyword or search intent, target ICP, the offer to
mention, content type, and the non-commodity element this piece will carry.

That last per-run field is unusual and deliberate. **A brief that cannot name its
non-commodity element does not get written.** It is the cheapest possible quality
gate — it costs one field on a form and it prevents the entire failure mode.

---

## Audit of the constants

| # | Constant | Status | Where it is / what is missing |
|---|---|---|---|
| 1 | Brand explainer | 🟠 Partial | `USER.md` and `SOUL.md` describe Tumelo and the agent, not the company as a supplier. Needs a one-page company explainer. |
| 2 | ICP definition | 🔴 Missing | No written ICP anywhere. The role cards in the launch pack name an "ideal customer" per role — that is the seed, not the document. |
| 3 | Brand voice guide with examples | 🟠 Partial | Aesthetic and typography are well defined (obsidian/gold, Cormorant Garamond, Bebas Neue). Voice-as-rules-with-examples now exists in [01-DEFINITION-OF-DONE.md](01-DEFINITION-OF-DONE.md) and should be promoted to a standalone document. |
| 4 | Example content | 🟢 Good | `content/2026-06-14/`, `deployment/ankole_content/ANKOLE_CONTENT_KIT.md`, `deployment/flash_auction/`, the Global Markets pack. Enough to teach structure. |
| 5 | Example briefs and outlines | 🔴 Missing | We have finished pieces but no briefs or outlines. The engine needs at least three of each. |
| 6 | Product and service descriptions | 🟢 Good | Super Agents: the launch pack plus the eight role cards. Meat: products and prices in the June pack. |
| 7 | Content inventory | 🔴 Missing | No sitemap export, no list of what is live. Without it there are no internal link suggestions and no way to check a topic has not already been covered. |
| 8 | First-party research and data | 🔴 **Critical gap** | See below. This is the one that matters. |
| 9 | Case studies and client outcomes | 🔴 Missing | Zero delivered clients, so zero outcomes. Structural, not an oversight. |
| 10 | Publication guidelines | 🟠 Partial | The launch strategy has measured format rules for social. Nothing for long-form: no meta description standard, no slug convention, no SERP research requirement. |
| 11 | Citable source list | 🔴 Missing | Needed before the researcher agent runs, or it will cite whatever ranks. |
| 12 | Sources to avoid | 🔴 Missing | Same. |

Score: two green, three amber, seven red.

**Do not build the pipeline first.** Closing items 2, 5, 8, 11 and 12 is a
smaller job than building the agents, and without them the agents produce exactly
the commodity output that Google has stopped indexing.

---

## The first-party research problem, and how to escape it

This is the real constraint, and it looks circular. Non-commodity content needs
original data. Original data usually comes from client outcomes. We have no
clients. Therefore no data, therefore commodity content, therefore no clients.

**There are three ways out, and we already own two of them.**

### 1. THE AUDIT — our own test, taken publicly

The launch strategy already specifies a ten-question test for whether a vendor's
"agent" is real, and specifies that we take it ourselves on camera and publish
the score **with the failures visible**.

That is first-party research. It produces data nobody else has, it requires no
client, and the failures are the most valuable part because every competitor is
incentivised to hide theirs. Each of the ten questions is also a standalone
pillar piece.

This is the single highest-value content asset available to StudEx right now, it
already exists as a plan on an unmerged pull request, and it has not been built.

### 2. Our own operating data

The 6-hour signal loop on StudEx's own accounts and inbox generates original
data immediately: which questions repeat, what people ask for that we do not
offer, where enquiries die. Published as "here is what we learned running this on
ourselves," that is honest, specific and unavailable elsewhere.

The June content pack is itself a data point — a full campaign built and never
approved. Written up honestly, "we built a campaign and never shipped it, here is
why" is a better piece than most agency thought leadership.

### 3. The delivery record, once client one exists

The signed activity log from the first Managed Team becomes the case study, with
the client's written permission. This is the strongest of the three and it is
gated on the same thing everything else is gated on: one delivered client.

**Recommendation:** run on source 1 and 2 now. Source 3 arrives when it arrives.
Do not wait for it, and do not fill the gap with generic content in the meantime.

---

## What to build, in order

Before any agent runs. Each is a document, and none of them is large.

| # | Document | Contains | Blocks |
|---|---|---|---|
| 1 | `constants/ICP.md` | Two or three named profiles: role, company size, what they are measured on, what they have already been sold and did not believe, the words they use | Everything. Content for "everyone" is content for nobody. |
| 2 | `constants/VOICE.md` | Promote the voice rules from doc 01. Do, do not, sounds-right, sounds-wrong | Writer, editors |
| 3 | `constants/SOURCES.md` | Citable list and avoid list. Named, with a reason each | Researcher |
| 4 | `constants/COMPANY.md` | One page: what StudEx sells, to whom, what it does not do | Writer, fact-checker |
| 5 | `constants/PUBLICATION.md` | Meta description standard, slug convention, paragraph limits, SERP research requirement, internal link rules | Outliner, editor |
| 6 | `constants/EXAMPLES/` | Three briefs, three outlines, three finished pieces we are proud of | Outliner, writer |
| 7 | `constants/INVENTORY.md` | What is live where. Even a hand-written list beats nothing | Researcher, editor |
| 8 | `research/` | THE AUDIT results first | Non-commodity criterion |

Item 1 is the one to do today. It is an hour of work and it is the input every
agent depends on.

---

## The ICP document — what it must contain

Not demographics. **Situations.** A brief written against a situation produces
content that lands; a brief written against a job title produces content that
describes.

For each profile:

| Field | Example shape |
|---|---|
| Who | Operations lead, 40–200 person South African company |
| Measured on | Cost per order, response time, headcount |
| Currently believes | "AI tools are a subscription we forget to cancel" |
| Already been sold | Chatbot licences, an AI strategy deck, a pilot that died |
| Why that failed | Nobody owned it after the demo |
| Words they use | "the team is drowning", "it never got used" |
| Words they distrust | "autonomous", "transform", "AI-powered" |
| What would change their mind | Seeing the audit trail from someone else's account |
| The question they actually ask | "Who is accountable when it gets it wrong?" |

That last row is the most useful field on the sheet. Answer the question the
reader is actually asking and the piece writes itself. Note also that "words they
distrust" directly constrains our own copy — and three of the words on that list
appear in the current Super Agents marketing.

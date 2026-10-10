# Company in a box — the agent team, the loops, the cadence

**Prepared:** 24 Aug 2026
**Status:** DESIGN. Buildable on the flow in [03-CLIENT-FLOW.md](03-CLIENT-FLOW.md).

The package: a client gets a private workspace containing a team of named agents
that runs the operating side of their company, with a human approving anything
that leaves the building.

**One correction to the brief before the roster.** "Cold email outreach" as
normally practised is unlawful in South Africa and I have redesigned that agent
rather than build it as asked. Detail in section 3. Everything else in the brief
is buildable roughly as described.

---

## 1. The team

Eight roles. Not every client gets all eight — the tier and the vertical decide.

| # | Agent | Job | May do alone | Always needs approval |
|---|---|---|---|---|
| 1 | **Chief of Staff** | Daily brief, weekly review, keeps the vault honest | Summarise, prioritise, flag, ask | Anything leaving the workspace |
| 2 | **Inbox** | Email triage, classify, draft | Sort, label, summarise, draft | Every send |
| 3 | **Client Comms** | Thread continuity, status answers | Retrieve history, draft, cite | Every send |
| 4 | **Social** | Content drafts, calendar, listening | Draft, schedule to queue, report | Every publish |
| 5 | **Pipeline** | Research, list hygiene, consent requests | Research public info, draft, dedupe | Every send, every list addition |
| 6 | **WhatsApp** | Inbound service inside the service window | Answer from approved knowledge | Any template/business-initiated send |
| 7 | **Research** | The 6h and 24h loops | Read, analyse, report | Nothing — it never acts |
| 8 | **Web** | Site audit against standards, proposes changes | Open a merge request in Gitea | Every merge to live |

### The rule that makes this safe

**Agents produce artefacts, humans produce effects.** Every agent's output lands
as a draft, a proposal or a merge request. The transition from artefact to effect
is always a named human clicking approve. That is not a limitation of the current
version — it is the product, and it is what makes it sellable to anyone with a
compliance function.

### Chief of Staff is the one to get right

It is the agent the client talks to daily, and it is the one that keeps the other
seven from drifting. Its real job is not summarising — it is noticing that the
Inbox agent has drafted the same wrong answer four times and raising a knowledge
correction. If you build one agent well, build this one.

---

## 2. The loops

Four cadences. Notice that none of them ends in an external action.

### Every 4 hours — vault sync

Commit the Obsidian vault to the client's private Gitea repository.

```
gather changed notes → validate frontmatter → commit → push
                                                        ↓
                                              post one line to #agent-worklog
```

Cheap, boring, and the reason nothing is ever lost. Signed commits so the vault
history is attributable per agent.

### Every 6 hours — signal loop *(read-only)*

The Research agent looks for evidence of demand and friction.

| Source | What it looks for |
|---|---|
| Own social accounts | Which posts drove profile visits, saves, DMs, link clicks |
| Comments and DMs | Questions that repeat — each repeat is unmet demand |
| Inbox | Requests the business cannot currently fulfil, and how often |
| Website analytics | Pages where people leave, searches with no result |
| Public competitor pages | Services offered that this client does not list |

Output: a short findings note to `#agent-worklog`, appended to
`worklog/YYYY-MM-DD.md` in the vault. **No recommendations at this stage** —
just observations with counts. Separating observation from recommendation is what
stops the 24-hour loop inventing patterns from three data points.

### Every 24 hours — proposal loop

The Research agent synthesises four cycles of findings into ranked proposals.

```
4× signal notes → cluster by theme → discard themes seen fewer than 3 times
                → rank by (frequency × ease of action)
                → write up to 3 proposals
                → post to #approvals
```

Each proposal must state: the observation, the count behind it, the proposed
action, who would do it, the expected effect, and how we would know it worked.
A proposal without a count is rejected by the template.

Plus one website proposal per day, maximum, as a Gitea merge request.

### Daily — the check-in

Chief of Staff posts to `#general` at an agreed time:

```
Yesterday: what the agents did, what was approved, what was declined
Today: what is queued, what is waiting on you
Blocked: what needs a decision, with the decision stated plainly
Noticed: one thing from the signal loop worth a human's attention
```

Kept to a screen. A daily brief nobody reads is worse than none, because it
manufactures the feeling of oversight without the substance.

### Weekly — operating review

Chief of Staff posts to `#review`: approvals requested versus granted, exceptions,
knowledge corrections, proposals accepted and their outcomes, and the health
signals from the skill file.

---

## 3. "Revenue from social media data" — what this honestly means

The brief asks for agents that generate revenue from social media data. Here is
what is real, and what is not.

**Real, and worth money:**

- repeated questions in comments and DMs are a list of things customers want to
  buy and cannot currently find — that is a product and pricing input;
- products asked about but not purchasable online are direct lost revenue and
  usually a quick fix;
- posting windows derived from the client's *own* engagement data beat generic
  best-practice advice;
- enquiries that never got a reply, counted and surfaced, are the single
  fastest revenue recovery in most small businesses;
- competitor service gaps, listed factually.

**Not real, and I will not build it:**

- agents autonomously posting to grow a following;
- agents messaging people who did not ask to be messaged;
- any claim that the loop "generates revenue" by itself. It generates *proposals*.
  Revenue comes from a human approving one and the business delivering it.

That distinction matters commercially as well as legally. Selling "AI that makes
you money" puts us in the same category as everyone the market has stopped
believing. Selling "we find the demand you are already missing and show you the
count" is checkable, and it survives contact with the client's own data.

### The cold email correction

**What was asked:** a cold email outreach agent.

**Why it cannot be built as asked.** POPIA section 69(1) prohibits direct
marketing by electronic communication — email, SMS and WhatsApp explicitly —
unless the person consented or is already a customer. Section 69(2) permits
approaching a non-customer **once**, in the prescribed manner, and the Regulator's
guidance is unambiguous that this first message must be a genuine request for
consent and not a pitch. Regulation 6.4, in force since 17 April 2025, states
that opt-out does not constitute consent. Section 11(2)(a) puts the burden of
proving consent on us. Buying or scraping lists is out. The Information Regulator
has issued an enforcement notice with a R100,000 fine and has said publicly that
leniency here is over.

So an agent that sends cold marketing email at volume is an agent that
manufactures liability at volume, on the client's licence, with our name on the
contract.

**What the Pipeline agent does instead:**

1. researches prospects from public sources and builds a target list **without
   contacting anyone**;
2. drafts a single, compliant consent request per prospect — a genuine ask, no
   marketing payload, sender identified, cease-contact route included;
3. queues it in `#approvals` for a human to send;
4. records the response as proof of consent or refusal, and never asks twice;
5. runs full marketing sequences **only** to people who consented or are existing
   customers being marketed similar products, with an opt-out in every message;
6. maintains the suppression list and applies it across every channel.

This is slower. It is also the only version that does not eventually cost the
client more than we charge them. And there is a real commercial angle in it:
a documented, provable consent trail is an asset most of their competitors
cannot produce.

**Cold *calling* is treated differently** — currently opt-out rather than opt-in —
but the Regulator's December 2024 view brings live calls into the same regime, so
treat it as a legal question and not a growth channel.

### WhatsApp, specifically

WhatsApp is electronic communication for section 69 purposes, so the same rules
apply to business-initiated messages. Combined with the platform's own template
and service-window rules, the WhatsApp agent's version one is:

- **inbound only**, answering inside the customer service window;
- from the approved knowledge pack, with citations;
- escalating to a human on request, immediately;
- no business-initiated messaging without both platform template approval and a
  POPIA lawful basis.

---

## 4. Where the agents live

```
CLIENT WORKSPACE (Buzz community, one per client)
  #general #agent-worklog #approvals #knowledge #exceptions #review
        │
        │ agents read and write here, each with its own keypair
        ▼
CLIENT VAULT (Obsidian, one per client)
  COMPANY.md SOUL.md MISSION.md OFFERS.md CUSTOMERS.md BOUNDARIES.md
  approved/ reference-only/ agents/ strategies/ decisions/ worklog/ corrections/
        │
        │ committed every 4 hours, signed
        ▼
CLIENT GITEA (private repository, one per client)
  vault history · website repo · merge requests from the Web agent
```

Three stores, one boundary: **everything for one client stays inside that
client's tenancy.** No shared vault, no shared repo, no shared relay community.
Hosting in [12-HOSTING-AND-KEYS.md](12-HOSTING-AND-KEYS.md).

---

## 5. What we can honestly call this

> A working team of AI operators for your business — inbox, client
> communication, social content, pipeline research, website improvement and a
> daily brief — running in a private workspace you can watch, with your approval
> required before anything is sent, published or paid.

What it is not, and must never be sold as: a replacement for staff, an autonomous
company, or a system that grows revenue without a human deciding anything. The
first client who is sold that will churn within two months and tell everyone.

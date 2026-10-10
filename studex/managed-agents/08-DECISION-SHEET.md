# Decision sheet — the poll

**Prepared:** 24 Aug 2026

Ten decisions only you can make. Everything else in this pack is executable
without you. I have given a recommendation on each so you can agree or override
rather than start from a blank page — reply with the item number and your choice.

Items 1, 2 and 3 block other work. The rest can run in parallel.

---

## 1. The token — keep, park, or kill 🔴 BLOCKING

| Option | Consequence |
|---|---|
| **A. Kill it** | Fund from equity and revenue. Removes the single largest regulatory exposure. Loses a $2–5M raise route that was unlikely to be lawful as planned anyway. |
| **B. Park it** | Remove from all materials, revisit after FSCA authorisation is genuinely in progress. Keeps the option without the exposure. |
| **C. Keep it** | Requires FSCA authorisation before taking any money, plus a FAIS opinion, plus FIC registration. Assume this is a substantial licensing project, not a document exercise. |

**My recommendation: B.** Nothing in the five-layer ecosystem needs a token —
memberships, subscriptions and project settlement all work on invoicing. Parking
it costs nothing and keeps the door open. Keeping it in the deck costs you
institutional investors immediately.

---

## 2. Managed Team pricing 🔴 BLOCKING

Proposed R22,000/month, R15,000 setup, for a private workspace with three to
five named agents and a named operator.

| Option | |
|---|---|
| **A. Approve as proposed** | |
| **B. Approve a range** | R18,000–R35,000 by workflow count, settle after three clients |
| **C. Different number** | Tell me what and I will rework the economics |

**My recommendation: B.** The cost driver is operator hours and we have never
measured them. A range lets you sell now and price properly once client one is
delivered. Below R18,000 the tier loses money on every client while looking like
the flagship.

---

## 3. 2026 actuals 🔴 BLOCKING

The deck shows Year 1 2026 revenue of $721,800. We are eight months in. I need
the actual figure to date for Studex Meat, Coffee, Global Markets and any AOS or
services revenue.

Nothing about the deck financials can be corrected without this. If the answer
is uncomfortable, it is still better to know it now than to have an investor
derive it.

---

## 4. The Russian relationships

NtechLab is on the US Entity List and under EU sanctions. ART Engineering and
Pharmasyntez need checking too.

| Option | |
|---|---|
| **A. Remove all three from investor materials** pending a sanctions opinion | |
| **B. Remove NtechLab only**, keep the others pending checks | |
| **C. Keep and disclose** with legal advice in hand | |

**My recommendation: A.** Remove all three from the deck today, then get one
opinion covering all of them. Half-removing is worse than either extreme,
because a diligence team that finds one will look for the others.

I also need to know: **has anything actually been transacted with any of them?**
The answer changes this from a presentation question to a compliance question.

---

## 5. Vector index for the knowledge layer

| Option | |
|---|---|
| **A. Qdrant self-hosted** | The deck already names it. Full control, in-region, no per-query cost. |
| **B. Managed cloud vector DB** | Faster to start, ongoing cost, jurisdiction to verify. |
| **C. Postgres + pgvector** | Simplest operationally if we are already running Postgres for Buzz. |

**My recommendation: C.** Buzz needs Postgres anyway. One database to operate
instead of two, and pgvector is more than adequate at per-client knowledge-pack
scale. Revisit if a single client's corpus exceeds a few hundred thousand chunks.

---

## 6. Telephony and speech for the talking agent

Needs a decision on the STT engine and the telephony provider. The real
constraint is **South African English and accent handling**, which is where most
engines degrade badly and where a demo will pass while production fails.

**My recommendation:** before choosing, record twenty real calls across the
accents your clients actually have, and test the shortlist against them. TTS is
already solved — ElevenLabs is in the stack. STT is the risk, and it is worth a
week of testing rather than a vendor page comparison.

---

## 7. Canonical naming 🟠

Three documents use three names for the same four concepts. Pick one set and I
will propagate it everywhere.

| Concept | Options |
|---|---|
| Per-client memory | Business Ghost · knowledge pack · Obsidian Brain |
| Per-client isolated machine | Nest VM · Private VM · Agent Nest |
| Orchestration layer | StudEx Agent OS · Puppetier OS · AOS |
| Agent population | AI Workforce · role templates · the 64 |

**My recommendation:** *Business Ghost* (client-facing, distinctive, and it is
the best name in the whole system), *Nest VM*, *StudEx Agent OS*, and *AI
Workforce*. Retire "Puppetier" externally — internally it is a good metaphor, but
to a client it describes them as a puppet.

---

## 8. Buzz — self-host or hosted

| Option | |
|---|---|
| **A. Self-host from the start** | Full control of the client's signed operating record. More ops work. |
| **B. Hosted buzz.xyz for pilots, self-host for Managed Team** | Fastest path, migration risk later. |
| **C. Hosted only** | Least work, but a client's audit record lives on infrastructure we do not control. |

**My recommendation: B**, with one condition — verify event export works before
the first client, so migration is provable rather than assumed. Buzz is early
software by Block's own description, and export is the insurance.

---

## 9. Where the first Managed Team lands

The most valuable decision on this page. One client, delivered by hand, becomes
the reference for everything.

Best candidate profile: an existing relationship, one repetitive manual
workflow, a tolerant contact, and no regulated data. Explicitly **not**
healthcare or legal for client one — the launch pack requires separate
professional review for those, and it is the wrong place to learn.

**Tell me the company and I will produce the workflow list, the knowledge pack
plan and the never-do list for it.**

---

## 10. What I build next

Ranked by my judgement of value, but it is your call:

| Option | Why |
|---|---|
| **A. The text agent (steps 1–3 of the talking-agent build order)** | Highest value. It *is* the product. Voice is a channel on top of it. |
| **B. The corrected deck in open-slide** | Unblocked once items 1, 3 and 4 are answered. |
| **C. Buzz self-host + the onboarding workflow wired end to end** | Turns the n8n JSON from a design into something that provisions a real workspace. |
| **D. The computer-use demo in a VM** | Impressive for sales, no client value yet. |
| **E. Execution Exchange** | Do not build this yet. Worthless until there are clients and delivery partners to match. |

**My recommendation: A, then C.** A gives you something to sell. C makes selling
it repeatable. B is one hour of work once you answer items 1, 3 and 4, and it
should not go out before then regardless of how it looks.

---

## One thing I want to say plainly

You mentioned bad news, and that the thought behind this is offering the managed
service to clients. That instinct is right, and it is the correct move for this
business right now.

But the fastest path to revenue is not more surface area. There are eighteen open
pull requests on this repository and none has ever been merged; the June content
pack was never approved; the Super Agents site still cannot be edited from
anywhere except one machine; and the first Managed Pilot has still not been
delivered. The bottleneck has been the same for two months, and it is not ideas
or content.

**One client, delivered by hand, at any price, is worth more than everything in
this pack.** Answer item 9 and I will build exactly what that client needs and
nothing else.

# The company soul interview

**Prepared:** 24 Aug 2026
**Format:** live session, 90 minutes, recorded with consent. Two of us, two of
them — the owner and whoever actually does the work.

The intake PRD collects facts. This collects **character**, and it is what makes
the difference between agents that sound like the business and agents that sound
like software. It is deliberately the same instrument we used on ourselves —
`SOUL.md` — pointed at a client.

Do not send this as a form. Sent as a form it produces "we value integrity and
customer service," which is worth nothing. Asked out loud, with follow-ups, it
produces the sentence that becomes the agent's voice.

---

## How to run it

Record it. Do not type during it — listen, and let the second person take notes.
Ask the question, then stay quiet. The useful answer is almost always the second
one, after the pause.

Push for specifics every time you get an abstraction. "We're professional" is
not an answer; "we never use exclamation marks and we always give a date" is.

---

## Part 1 — Mission and stakes *(20 min)*

1. Why does this business exist? Not the marketing answer — why did you start it?
2. What would be lost if it closed tomorrow?
3. Who are you actually for? Describe one real customer, by name if you can.
4. Who are you not for? Who should go elsewhere?
5. What are you trying to be true in twelve months that is not true today?
6. What is the one number you watch?

## Part 2 — Voice *(20 min)*

7. When a customer is angry, how do you want them spoken to?
8. When a customer is confused, do you explain fully or keep it short?
9. Are you formal or familiar? Do you use first names?
10. Read me something you wrote that felt right. What made it right?
11. Read me something a competitor wrote that made you wince. Why?
12. Three words for how you sound. Now three words for how you never sound.
13. Do you use emoji? Exclamation marks? Slang? Which language, and do you
    code-switch?

Question 11 gets better results than question 10. People define their voice most
precisely against something they dislike.

## Part 3 — Judgement *(25 min)*

The most valuable section. You are extracting decision rules, not values.

14. Tell me about a time you gave a customer more than they were owed. Why?
15. Tell me about a time you said no to a customer. Why?
16. A customer asks for a discount. What is the actual answer?
17. Something went wrong and it was your fault. What do you say?
18. Something went wrong and it was the customer's fault. What do you say?
19. Someone asks a question you cannot answer. What happens next?
20. Two customers want the same slot. How do you choose?
21. What decision do you never delegate, and why?

Every answer here becomes a rule in `SOUL.md`. Question 17 in particular — the
apology posture — is where most agents get a business into trouble, because the
model's default is to apologise expansively and admit fault.

## Part 4 — Boundaries and fear *(15 min)*

22. What is the worst thing an assistant of yours could do to your reputation?
23. What would embarrass you if it went out under your name?
24. Is there anything you are legally or professionally forbidden from saying?
25. What must a human always do personally?
26. If this goes wrong, how will you find out? Who tells you?

## Part 5 — The agents *(10 min)*

27. If you were hiring one person for the thing that is most stuck, what would
    the job description say?
28. What would you want to ask that person on their first Monday?
29. What would make you trust them enough to stop checking?
30. Name them. *(Clients who name their agents use them. It sounds trivial and it
    is the strongest adoption signal we have.)*

---

## What the interview produces

Within two working days of the session, we return four documents for their
written sign-off:

| Document | Built from | Purpose |
|---|---|---|
| `COMPANY.md` | Intake A–B, interview part 1 | What the business is and who it serves |
| `SOUL.md` | Interview parts 2–3 | Voice and judgement rules — the agents' character |
| `MISSION.md` | Interview part 1, intake I | Mission, twelve-month goals, this quarter |
| `BOUNDARIES.md` | Intake G, interview part 4 | The never-do list and approval matrix |

**The client signs `SOUL.md` and `BOUNDARIES.md`.** That signature is the moment
the engagement becomes real: they have agreed the agents' character and limits in
writing, and every later dispute resolves against those two documents.

---

## The vault structure

One vault per client, in their private Gitea repository, committed by the agents
every four hours. Templates in [`templates/client-vault/`](../../templates/client-vault/).

```
<client>-vault/
├── COMPANY.md              identity, what it does, who it serves
├── SOUL.md                 voice + judgement rules          ← client signs
├── MISSION.md              mission, 12-month goals, quarter
├── OFFERS.md               products, prices, what is purchasable
├── CUSTOMERS.md            segments, ideal customer, objections
├── BOUNDARIES.md           never-do list + approval matrix   ← client signs
├── BRAND.md                voice, type, colour, do and don't
│
├── approved/               client-approved. Agents may quote.
├── reference-only/         context. Agents may read, never quote.
│
├── agents/
│   ├── AGENT-CHIEF-OF-STAFF.md
│   ├── AGENT-INBOX.md
│   └── AGENT-<role>.md     charter: job, scope, escalation, forbidden
│
├── strategies/
│   └── STRATEGY-<name>.md  a plan with an owner and a measure
│
├── decisions/
│   └── YYYY-MM-DD-<slug>.md  what was decided, by whom, why
│
├── worklog/
│   └── YYYY-MM-DD.md       what the agents did, appended
│
└── corrections/
    └── YYYY-MM-DD-<slug>.md  what an agent got wrong and the fix
```

### Why this shape

**`approved/` versus `reference-only/` is the most important line in the tree.**
The client decides which documents an agent may quote to a customer. Everything
else is context the agent may reason over but never present as the company's
word. Without that split, an internal draft price list ends up quoted to a
customer, and it will happen in month one.

**`corrections/` is the asset nobody expects.** It is the record of the system
getting better, and it is what you show at the three-month review when the client
asks what they have been paying for. A falling correction rate is the honest
proof of value.

**`decisions/` prevents the same argument twice.** Every managed engagement
re-litigates settled questions when staff change. A dated decision log with a
named decider ends that.

---

## How to propose this to a client

Do not lead with the vault or the agent roster. Lead with what you learned from
their own intake form.

> "You told us you get around forty enquiries a week, that maybe a quarter
> convert, and that things fall through the cracks when you get busy. You also
> told us nobody has ever counted how many enquiries never got a reply.
>
> We start there. First we make that number visible. Then we put one agent on
> the inbox that drafts every reply for you to approve, so nothing sits
> unanswered. You will see every draft before it goes.
>
> Once that is working, we add the next role. Not before."

Three reasons this lands where a feature list does not: it uses their numbers, it
starts with something they already told you hurts, and it promises one thing
instead of eight. Clients have been pitched eight things by everyone. Nobody has
offered to count their unanswered enquiries.

Then the mechanics, in this order: the workspace they can watch, the approval
step, the daily brief, the vault they own and can take with them, and the price.
Ownership of the vault is a genuine differentiator — say it explicitly, because
every competitor's answer is that the data lives in the competitor's product.

# Client vault template

Copy this tree to create a new client vault. One vault per client, in that
client's own private Gitea repository, committed by the agents every four hours.

Process: [`studex/managed-agents/11-COMPANY-SOUL-INTERVIEW.md`](../../studex/managed-agents/11-COMPANY-SOUL-INTERVIEW.md)

```
<client>-vault/
├── COMPANY.md          facts. From the intake form.
├── SOUL.md             voice + judgement.        CLIENT SIGNS
├── MISSION.md          mission, goals, quarter.
├── OFFERS.md           products, prices, what is purchasable.
├── CUSTOMERS.md        segments, ideal customer, objections.
├── BOUNDARIES.md       never-do list + approval matrix.  CLIENT SIGNS
├── BRAND.md            voice, type, colour, do and don't.
├── approved/           agents may quote from here
├── reference-only/     agents may read, never quote
├── agents/             one charter per agent
├── strategies/         a plan with an owner and a measure
├── decisions/          what was decided, by whom, why
├── worklog/            what the agents did, appended daily
└── corrections/        what an agent got wrong, and the fix
```

## The three rules that matter

**1. `approved/` versus `reference-only/` is a client decision, in writing.**
Agents may quote `approved/` to a customer with a citation. They may reason over
`reference-only/` but never present it as the company's word. Without this split,
an internal draft price list gets quoted to a customer — and it happens in month
one, not month twelve.

**2. The client signs `SOUL.md` and `BOUNDARIES.md`.** Those signatures are the
point the engagement becomes real. Every later argument about tone or limits
resolves against them.

**3. Every agent answer cites its source.** A wrong answer must be diagnosable.
Without citations you end up arguing about the model instead of fixing the vault.

## Never in the vault

Credentials, API keys, tokens, passwords. Ever. Secrets are injected at runtime
from the tenant secret store and referenced as `${VAR_NAME}` placeholders only.
See [`12-HOSTING-AND-KEYS.md`](../../studex/managed-agents/12-HOSTING-AND-KEYS.md).

Also never: clinical records, or any category the client excluded in intake
question 35. Exclusion is enforced by access control, not by asking the agent not
to look.

## Order of assembly

1. Intake form returned — sections A, E, F, G complete.
2. `COMPANY.md` and `BOUNDARIES.md` drafted from it.
3. Soul interview run.
4. `SOUL.md` and `MISSION.md` drafted, within two working days.
5. Client signs `SOUL.md` and `BOUNDARIES.md`.
6. `OFFERS.md`, `CUSTOMERS.md`, `BRAND.md` from intake B and H.
7. Client sorts documents into `approved/` and `reference-only/`.
8. Agent charters written from the roster.
9. Baseline measures recorded in `COMPANY.md` — before the agents start.
10. Internal dry run for one week on synthetic data.

Step 9 is the one that gets skipped and then missed at the three-month review.
Record the baseline first.

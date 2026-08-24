# The client proposal, and what the agents can automate

**Prepared:** 24 Aug 2026

Two halves. First, how we propose this to a client. Second, the honest split
between what agents can automate in onboarding and what has to stay human.

---

## Part 1 — The proposal

Five pages, not fifteen. Built from their own intake form so it reads as a
diagnosis rather than a brochure.

### Page 1 — What we heard

Their numbers, quoted back. Nothing about us.

> You told us you handle roughly <N> enquiries a week and that around <N%>
> become customers. You said things fall through the cracks when you get busy,
> and that nobody has counted how many enquiries never got a reply. You told us
> the task you would hand over first is <X>, which takes <person> about <hours> a
> week.
>
> You also said you would cancel this if <intake q51>.

That last line is the most important sentence in the proposal. Quoting their own
stated failure condition back to them, and then designing against it visibly,
does more for trust than any capability claim.

### Page 2 — What we propose

The named team, and only the roles going live in phase one.

| Agent | Role | Goes live |
|---|---|---|
| <name> | Chief of Staff — daily brief, weekly review | Phase 1 |
| <name> | Inbox — triage and draft every reply | Phase 1 |
| <name> | Research — the signal and proposal loops | Phase 1 |
| <name> | Client Comms | Phase 2 |
| <name> | Web | Phase 2 |

One workflow live at handover. Not four. A client who gets one working thing
renews; a client who gets four half-working things does not.

### Page 3 — What you approve, and what you see

The approval mechanic, drawn plainly, and the six channels. Then the sentence
that does the real selling:

> Every message, draft, approval and decision is recorded and signed in your
> workspace. The record is yours, it is exportable, and if you ever leave you
> take it and your knowledge base with you.

Say the exit terms in the proposal, unprompted. Almost nobody does, and it
converts better than any guarantee — because it tells a buyer we are not
planning to trap them.

### Page 4 — Cadence and what we need

Daily check-in at <time>. Weekly review in `#review`. Monthly operating review.

What we need from them, as a short list: the approver and alternate, the
documents sorted into approved and reference-only, the completed never-do list,
and roughly <N> hours of their time in the first two weeks. Being specific about
the time cost up front prevents the most common cause of a stalled onboarding.

### Page 5 — Price, phases and exit

| | |
|---|---|
| Setup | R<x> once — knowledge pack, configuration, dry run |
| Monthly | R<x> — tier from [02-OFFERING.md](02-OFFERING.md) |
| Not included | Third-party platform, model and messaging costs, quoted separately |
| Review | At three months, against the baseline in `COMPANY.md` |
| Exit | 30 days' notice. You receive the signed activity record and your vault. Agent keys destroyed, deletion confirmed in writing. |

Phases as gates, not dates: paperwork → configuration → internal dry run →
handover with one workflow live → expansion. Each gate has a condition, and we
agree the calendar with them rather than promising one in a proposal.

### What not to put in it

No agent counts. No claim of always-on operation. No integration described as
connected before it has been tested on their account. No compliance claim. No
autonomy language. Everything on the launch pack's "do not say" list applies
here with more force, because this is a contract document rather than marketing.

---

## Part 2 — What the agents can automate

The brief asks how agents automate onboarding. The useful answer is a split,
because automating the wrong half of this is how a managed service quietly
becomes unmanaged.

### Agents can do this

| Step | Agent | Output |
|---|---|---|
| Chase the intake form and flag missing sections | Chief of Staff | Reminder + gap list |
| Turn the returned form into `COMPANY.md` and a draft `BOUNDARIES.md` | Chief of Staff | Draft files for human review |
| Transcribe the soul interview and draft `SOUL.md` and `MISSION.md` | Chief of Staff | Drafts, always human-edited |
| Sort submitted documents into a proposed approved / reference-only split | Research | A proposal — the client decides |
| Build the vault tree and commit it | any | Repository state |
| Draft agent charters from the roster | Chief of Staff | Drafts |
| Generate synthetic scenarios for the dry run | Research | Test cases |
| Run the dry run and log every mistake to `corrections/` | all | Correction log |
| Record baseline measures once given access | Research | `COMPANY.md` baseline table |
| Produce the draft proposal from the intake form | Chief of Staff | Draft, priced by a human |
| Provision the workspace, channels, keys and vault | n8n | Configured tenancy |
| Every recurring loop after go-live | all | Per [09-COMPANY-IN-A-BOX.md](09-COMPANY-IN-A-BOX.md) |

That is genuinely most of the mechanical work, and it is where the leverage is.
The onboarding workflow already automates provisioning through stage 4:
[`automation/n8n/studex-client-onboarding.json`](../../automation/n8n/studex-client-onboarding.json).

### Humans must do this

| Step | Why it cannot be automated |
|---|---|
| The soul interview | The value is in hearing the pause and pushing past the abstraction. A form produces generic answers and therefore generic agents. |
| Deciding approved versus reference-only | A liability decision. Only the client can make it. |
| Signing `SOUL.md` and `BOUNDARIES.md` | It is a signature. |
| Setting the price | Judgement about the relationship. |
| Deciding to invite the client | The dry run has to be judged by someone accountable. The workflow deliberately stops here. |
| Every approval, forever | This is the product. |
| The regulated-industry assessment | Needs professional advice with liability attached. |
| Deciding the never-do list | Agreed with the client, in their words. |

### The rule

**Agents draft, humans decide.** Onboarding is the same product as the service
itself, applied to ourselves. If we automate a decision during onboarding that we
tell clients we would never automate for them, we have described a product we do
not run.

---

## Part 3 — Answering the brief directly

**"Can I set up the groups and then get the files into folders and then we
start?"** Nearly — reverse two steps. Build **one template community** and the
vault template first, and dry-run it on synthetic data. Create each client's real
community only after their paperwork is signed, because an empty provisioned
workspace with no data processing agreement behind it is a liability rather than
a head start. The template is reusable; the client communities are not.

**"A few companies"** — set up one. Deliver it. Then the second takes a fraction
of the effort because the template, the charters and the correction log already
exist. Three simultaneous first clients means three simultaneous discoveries of
the same configuration mistakes, in front of three audiences.

**"Package in a box"** — that is [09-COMPANY-IN-A-BOX.md](09-COMPANY-IN-A-BOX.md).
Eight roles, four loops, one approval gate. Two roles are redesigned from the
brief for legal reasons and one is withheld from the medical client.

**"Daily check-ins"** — Chief of Staff, `#general`, agreed time, one screen.

**"6 and 24 hour loops generating revenue"** — built as a signal loop that
observes with counts and a proposal loop that ranks and recommends. Revenue comes
from a human approving a proposal. The loops find the demand that is already
being missed, which for most clients is a bigger number than anything new.

**"Their own private Gitea, push every 4 hours"** — yes, and it is a good idea.
On the client's own VM, not behind the Mac1 localhost limitation.

**"Host on the development VM until the client pays"** — no for real client data,
and definitely not for a medical practice. Synthetic-data dry runs on the
development VM, then a small in-region VM per client funded by the setup fee.
See [12-HOSTING-AND-KEYS.md](12-HOSTING-AND-KEYS.md).

**"If I give you the key to a working Buzz group"** — please do not put keys in
chat. Secrets go in the secret store; send me the non-secret facts and the
variable names and I can build everything.

**"Start with a medical client"** — deliverable, but it is the hardest first
client and the scope is much narrower than the general package. The good news is
that the operational revenue case for a practice is stronger than the marketing
case would have been. [13-MEDICAL-CLIENT.md](13-MEDICAL-CLIENT.md).

---

## What I need to start building tomorrow

1. Client name and industry, and whether they are a regulated profession.
2. Their intake form back — sections A, E, F, G at minimum.
3. Interview notes or recording.
4. Their existing FAQs and standard replies. Highest-value item on the list.
5. Which single workflow goes live first.
6. Agent names.
7. Approver and alternate.
8. Region: South Africa or EU.

Send those and I will build the vault, the charters, the loop configuration and
the workspace, then dry-run it on synthetic data before anyone from the client
sees it.

# StudEx Managed Agents — build pack

**Prepared:** 24 Aug 2026
**Status:** DESIGN + ONE RUNNABLE ARTEFACT. Nothing here is live.

This pack answers a single commercial question: **how do we sell managed agent
teams to clients, and what actually happens when we do?**

It was assembled from sources the owner supplied on 24 Aug 2026: the five-layer
ecosystem diagram, `buzz.xyz`, `github.com/pftq/GrokBot`,
`github.com/1weiho/open-slide`, the Puppetier fundraising deck, Honcho memory,
and the Obsidian `llm_wiki` idea.

---

## Read in this order

| # | Document | Answers |
|---|---|---|
| 01 | [ECOSYSTEM.md](01-ECOSYSTEM.md) | The five-layer structure and the technology backbone, as supplied |
| 02 | [OFFERING.md](02-OFFERING.md) | What we sell, at what price, and what is excluded |
| 03 | [CLIENT-FLOW.md](03-CLIENT-FLOW.md) | What happens from signature to steady state, step by step |
| 04 | [TALKING-AGENT.md](04-TALKING-AGENT.md) | The voice agent: Obsidian knowledge + Honcho memory + storage |
| 05 | [COMPUTER-USE.md](05-COMPUTER-USE.md) | The GrokBot question, and why our version must live in a VM |
| 06 | [RISK-REGISTER.md](06-RISK-REGISTER.md) | **Read this before the deck goes to any investor** |
| 07 | [DECK-REBUILD.md](07-DECK-REBUILD.md) | The deck: what is wrong, and the corrected structure |
| 08 | [DECISION-SHEET.md](08-DECISION-SHEET.md) | The choices only you can make |
| 09 | [COMPANY-IN-A-BOX.md](09-COMPANY-IN-A-BOX.md) | The agent roster, the 4/6/24-hour loops, the daily check-in |
| 10 | [CLIENT-INTAKE-PRD.md](10-CLIENT-INTAKE-PRD.md) | The form we send clients before anything is provisioned |
| 11 | [COMPANY-SOUL-INTERVIEW.md](11-COMPANY-SOUL-INTERVIEW.md) | The live interview, and the vault structure it produces |
| 12 | [HOSTING-AND-KEYS.md](12-HOSTING-AND-KEYS.md) | Where this runs, and **how to send credentials safely** |
| 13 | [MEDICAL-CLIENT.md](13-MEDICAL-CLIENT.md) | The regulated scope, and where a practice's revenue actually is |
| 14 | [PROPOSAL-AND-AUTOMATION.md](14-PROPOSAL-AND-AUTOMATION.md) | How to propose it, and what agents can and cannot automate |

Runnable artefacts:

- [`automation/n8n/studex-client-onboarding.json`](../../automation/n8n/studex-client-onboarding.json)
  — onboarding stages 1–4, stops before client invitation.
- [`automation/n8n/studex-agent-loops.json`](../../automation/n8n/studex-agent-loops.json)
  — 4-hour vault sync, 6-hour signal loop, 24-hour proposal loop.
- [`templates/client-vault/`](../../templates/client-vault/) — the per-client
  Obsidian vault skeleton.

Skill: [`skills/studex-managed-agents/SKILL.md`](../../skills/studex-managed-agents/SKILL.md)

---

## The three things that matter most

**1. Buzz is the delivery vehicle, and it changes the offer.**
You said you make a group per client and send it to them. Buzz makes that a
product rather than a habit. Every message, workflow step, approval and git event
is a signed event on a relay, and each agent holds its own keypair. So "a group
per client" becomes *one auditable workspace per client where agents are named
participants with provable authorship*. That audit trail is the thing enterprise
buyers actually ask for, and it is the strongest asset in this whole pack.
See [03-CLIENT-FLOW.md](03-CLIENT-FLOW.md).

**2. The deck has two provably false claims and one sanctions problem.**
Not stylistic issues — checkable facts that a competent investor's diligence
will find in an afternoon. Llama 3.1 is not MIT licensed, and NtechLab has been
on the US Entity List since 11 December 2024 while the deck lists the
partnership as "Active". Fixing the visual design without fixing these would
make the problem worse, because a better-looking deck gets further into
diligence before it fails. See [06-RISK-REGISTER.md](06-RISK-REGISTER.md).

**3. The token raise is the single largest legal exposure in the business.**
A token sale to fund the company, from South Africa, needs FSCA authorisation
under the FAIS Act. The transitional window closed and does not reopen for new
entrants. This is not a "get the whitepaper right" problem.
See [06-RISK-REGISTER.md](06-RISK-REGISTER.md) section 1.

---

## What is designed here versus what exists

Applying the same rule the Super Agents launch pack set: never present a plan as
a running system.

| Item | State |
|---|---|
| n8n onboarding workflow | **Built.** JSON validates and imports. Credentials and endpoints are placeholders. |
| Offering, pricing, exclusions | Designed. Prices are proposals needing your sign-off. |
| Client flow on Buzz | Designed against Buzz's published architecture. Not yet run once. |
| Talking agent | Designed. No code written. Honcho and TTS accounts not provisioned. |
| Computer-use agent | Designed boundary only. Deliberately not built — see 05. |
| Deck rebuild | Corrected content and structure. Rendering not executed. |
| Ecosystem diagram | Captured as supplied. Layers below Super Agents have no code anywhere. |

**Nothing in this pack has served a single client.** The first Managed Pilot has
to be delivered by hand before any of it is sold. That is the same gate the
launch pack set, and it still has not been cleared.

## Two corrections to the delivery brief

Both are legal rather than stylistic, and both changed the design.

**Cold email outreach cannot be built as asked.** POPIA section 69 prohibits
electronic direct marketing — email, SMS and WhatsApp explicitly — without
consent or an existing customer relationship. A non-customer may be approached
**once**, and that message must be a genuine consent request with no marketing
payload. Opt-out does not constitute consent, and the burden of proving consent
is ours. The Pipeline agent is redesigned around lawful consent-gathering in
[09-COMPANY-IN-A-BOX.md](09-COMPANY-IN-A-BOX.md) section 3.

**A medical practice is the hardest possible first client.** HPCSA rules make the
practitioner responsible for marketing done on their behalf — which is us — and
prohibit testimonials, comparative claims, before-and-after imagery and
inducements. The Social and Pipeline agents are therefore withheld. The good news
is that a practice's real revenue lever is operational rather than promotional,
and it is a bigger number. See [13-MEDICAL-CLIENT.md](13-MEDICAL-CLIENT.md).

---

## Skill vetting outcome

`github.com/alirezarezvani/claude-skill` returns **HTTP 404** — the repository
does not exist publicly, or is private. Per the workspace vetting rules, an
unverifiable source cannot be audited and therefore **cannot be approved or
installed**. No install was attempted. If you have a different URL or the repo
is private, send access and it will be vetted properly.

`github.com/1weiho/open-slide` (MIT) and `github.com/block/buzz` (Apache-2.0)
are both permissively licensed and were read, not installed.
`github.com/pftq/GrokBot` publishes **no licence file**, so its code must not be
copied — see [05-COMPUTER-USE.md](05-COMPUTER-USE.md).

The Colab notebook link could not be opened without Google authentication, so
its contents are not reflected here. Export it to the repo and it will be
integrated.

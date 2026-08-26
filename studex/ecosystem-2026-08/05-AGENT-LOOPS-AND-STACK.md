# Agent Loops and the Tool Stack
**Prepared by:** Robusca Romanov | **Date:** 2026-08-26

---

## The research loops — reframed

The brief described 3, 6, 12 and 24-hour loops where agents "go out, learn how to make money,
come back and report to the brain," using deep research and the `last30days` skill.

The scheduling architecture is right. The objective needs changing, and this is the most
important technical judgment in this document.

### Why "find ways to make money" fails

Open-ended money discovery is the single weakest use of autonomous agents, and it is precisely
where the agent-washing critique lands hardest. The emerging standard is that an agent's
authority should not exceed the reliability of its judgement — and open-ended commercial
discovery is the lowest-reliability judgement there is.

Concretely, what a "find money" loop produces is plausible, well-formatted, unverifiable
suggestions. Every four hours. Forever. It burns tokens generating noise that *looks* like
insight, and because nobody can act on it, nobody checks it — so the loop's failure is invisible
until someone asks what it produced all quarter. In a business whose entire positioning is
"most agents are fake, here are our receipts," a loop that cannot produce a receipt is the most
dangerous thing we could build.

### What works instead: named triggers, verifiable outputs

Every loop needs three things before it is allowed to run: **a specific question, a verifiable
answer, and a human decision gate.**

| Loop | Cadence | Question | Verifiable output | Gate |
|---|---|---|---|---|
| **Tender watch** | 6h | New tenders matching this client's registrations and capacity? | Tender ID, deadline, go/no-go | Human decides to bid |
| **RFQ watch** | 6h | New private RFQs in their sector and region? | Named opportunity + source | Human decides |
| **Price watch** | 24h | Has a tracked commodity or competitor price moved beyond threshold? | Old price, new price, source | Alert only |
| **Buyer signals** | 24h | Has a target buyer posted, hired, raised or expanded? | Event + link + suggested approach | Human approves outreach |
| **Document expiry** | 24h | Any certificate, licence or registration expiring in 60 days? | Document, date, renewal step | Auto-task |
| **EUDR integrity** | 24h | Any plot record incomplete or member changed? | Specific missing field | Auto-task |
| **Pipeline decay** | 12h | Any quote or proposal gone quiet past its follow-up window? | Deal, days silent, draft follow-up | Human sends |
| **Content performance** | 24h | Which pieces cleared the 3-second retention bar? | Metrics per piece | Feeds `agentry` |
| **Market sweep** | Weekly | What changed in this client's category? | `last30days` sweep, sourced | Human reads |

Note that every output is a *fact with a source*, not an opinion. That is the test for whether a
loop should exist. If the output cannot be checked, the loop is theatre.

Note also the cadences: mostly 6, 12 and 24 hours. **3-hour loops are almost never justified** —
tenders do not appear that fast and prices rarely move that far. Every loop multiplies across
every tenant, so a 3-hour loop is eight runs a day per client. At fifty clients that is 400 runs
a day for one loop. Credit cost is real and it lands on our margin when it is inside a bundled
allowance.

**Where the money actually comes from.** Not from an agent discovering an opportunity nobody
thought of. From these loops making sure the client never misses the opportunities that were
already theirs — the tender they saw too late, the proposal that went cold, the certificate that
lapsed. Client A in the earlier scenario surfaced 23 tenders and had previously seen two. That is
not discovery; it is coverage. Coverage is reliable, provable, and worth R5,000 a month.

### Teams

Group loops into teams so reporting is legible. Roughly:

- **Intelligence** — market sweep, price watch, competitor changes
- **Pipeline** — tender watch, RFQ watch, buyer signals, pipeline decay
- **Compliance** — document expiry, EUDR integrity, certification readiness
- **Content** — production and performance
- **Operations** — reporting, reconciliation, admin

Each team reports into the tenant's Ghost. Robusca aggregates upward — outcomes and metrics, never
raw tenant data, per the boundary in the [control plane design](../delivery-model/02-CONTROL-PLANE-ARCHITECTURE.md).

---

## The four platforms, and what each is for

The instinct to use all of these is right. The failure mode is using them for the wrong layers.

```
CLIENT-FACING            Studex portal + WhatsApp/Slack          ← we own this
CONTROL PLANE            tenancy, memory, vault, ledger          ← we own this. Non-negotiable
AGENT RUNTIME            self-hosted OpenHands                   ← we operate this
PRODUCTION TOOLS         Runable (internal use only)             ← we use this
DISTRIBUTION             MuleRun Creator Studio                  ← we publish to this
RAPID BUILD              Base44 (portal MVP, client apps)        ← we build with this
```

### Runable — internal production only
Confirmed last week: buy one or two Pro seats at $50/month for the delivery team. It replaces
roughly $154/month of separate subscriptions and the outputs are ours with commercial use
permitted.

**Your marketing team of agents on Runable is exactly the right use.** Decks, landing pages,
promo video, carousels, reports — produced by Studex staff and agents, delivered to clients as
finished work. What it must never be: the thing a client logs into, or the tenancy boundary. It
has no team accounts, no API, its terms bar selling any part of the service, and RunClaw
ownership transfers to whoever connects their account last.

### MuleRun — distribution, and this is a genuine opportunity
Unlike Runable, MuleRun **wants** third-party agents. Creator Studio lets you publish an agent,
set your own price, and it handles hosting, global payments and discovery. **MuleRun takes 20%.**
Billing methods available: per run, per minute, per step, cost-plus (fixed fee or percentage), or
fully custom via their Metering API. Integration by n8n or API/Docker.

Three reasons this is worth doing:

1. **It tests the day-pass and rent-an-agent model without us building a marketplace.** Publish
   two or three Studex skills, watch what people actually pay for and how they buy.
2. **It is distribution into a market we have no other route to** — 1,000+ agents, global traffic.
3. **It validates skill pricing before we set our own marketplace rates.** Real purchase data
   beats our estimates.

Caution: the same platform-dependency logic applies, so publish *skills*, never the core product.
And note their documented trial-billing complaint — worth understanding before we design our own.

### Base44 — build fast, but not the core
Wix-owned (acquired June 2025, ~$80M). Free / Starter $16 / Builder $40 / Pro $80 / Elite $160
annual. Dual credit system: message credits for building, integration credits for runtime. Has
auth, database, payments and hosting built in — which is why the "payment gateway" instinct
pointed here.

**Good for:** the client portal MVP, internal dashboards, one-off client apps, and getting a
working front end up in days rather than weeks.

**Not for:** tenancy, memory, the credential vault, or the ledger. Those are the product and they
must live on infrastructure we control. Credits do not roll over, and building the control plane
inside a vibe-coding platform recreates exactly the dependency we just rejected with Runable.

### OpenHands — the runtime
MIT core, self-hostable, exposes the Agent Server REST API. One deployment per tenant at pilot
scale — Agent Canvas is explicitly single-tenant and unauthenticated, so this is honesty as much
as architecture. OpenHands Enterprise adds real multi-tenancy, RBAC and per-run isolated sandboxes
in our own VPC when volume justifies the licence.

---

## The `startup-skill` repo — vet before use

`github.com/ferdinandobons/startup-skill` — "AI agent skills for startup validation, competitive
intelligence, and planning." 851 stars, 0 forks.

**I could not read the skill contents**, only the repository metadata, so I cannot clear it.
`AGENTS.md` requires a full vetting process before any skill installation, and that has not
happened here. Two things to note before anyone installs it:

- **851 stars against 0 forks is an unusual ratio.** Not proof of anything — but skills that
  developers genuinely use normally get forked. Worth understanding before trusting it with
  client data.
- The stated scope (startup validation, competitive intelligence) overlaps heavily with the
  `last30days` skill we already built and control.

**Required before use:** read every file, check for network calls to unknown endpoints, check for
credential access or environment variable reads, check for instruction-spoofing in the skill text,
then produce a written vetting report for approval. If the useful content is a set of prompts and
frameworks, the safer path is to read it, learn from it, and write our own — which costs an hour
and eliminates the supply-chain question entirely.

---

## On "like Polsia, but more active"

The distinction being reached for is real and worth naming precisely, because it is a positioning
asset.

A private AI workspace gives a company somewhere for agents to live. That is infrastructure, and
it is where most of this category stops. What is being described here is different in two
specific ways:

**The loops close in the real world.** A tender is found, a bid is submitted, a contract is won.
A plot is mapped, a declaration is filed, a shipment clears. The output is not a document about
work — it is the work, with an outcome that can be counted. That is what makes receipts possible,
and receipts are the whole strategy.

**The tenants are connected.** A company inside the ecosystem can be introduced to another, find
a partner, receive work from a tier above, hire from a tier below. A private workspace is private
and stops there. This is the escalator — and it is the part competitors cannot copy by
provisioning more VMs, because it requires having built the network first.

Both claims are currently true only in intention. Phase 2's accepted EUDR declaration is what
makes the first one factual. The first cross-tenant introduction that produces revenue is what
makes the second one factual. Until then, describe them as what we are building, not what we have.
That distinction is the difference between the position we are claiming and the thing we are
criticising.

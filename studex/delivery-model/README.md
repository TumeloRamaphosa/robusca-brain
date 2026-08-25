# Managed Service Delivery Model
**Date:** 2026-08-25 | Companion to [`studex/launch-2026-08/`](../launch-2026-08/README.md)

Answers: can we use Runable to deliver a managed agent service, how do client "groups" and
keys actually work, does R5,000/month hold up, and what does it look like with three clients.

| Doc | What's in it |
|---|---|
| [`01-RUNABLE-EVALUATION.md`](01-RUNABLE-EVALUATION.md) | What Runable is, the six blockers to reselling it, where it genuinely earns its place, and OpenHands as the self-hosted alternative |
| [`02-CONTROL-PLANE-ARCHITECTURE.md`](02-CONTROL-PLANE-ARCHITECTURE.md) | What a client "group" is, the key model, how our agents manage theirs safely, the seven components, provisioning flow |
| [`03-UNIT-ECONOMICS.md`](03-UNIT-ECONOMICS.md) | R5,000/month modelled line by line, break-even, the four ways it breaks, the ladder, path from 44% to 67% margin |
| [`04-THREE-CLIENT-SCENARIO.md`](04-THREE-CLIENT-SCENARIO.md) | Three clients walked through day 0 to month 3, with a pilot P&L |

## The short version

**Runable: buy it as a tool, don't build the product on it.** It has no tenancy — the FAQ says
plainly *"There are no team or organization accounts"*, and the only sharing primitive is a
read-only link. No public API, so no provisioning, metering or per-client audit. ToS §11
prohibits selling any part of the Services and §8 offers an affiliate programme, which is the
tell: a vendor that wanted resellers would have a reseller programme. Credits are
non-transferable and expire. And RunClaw's ownership rule is fatal to the model — *"when
another user connects their Runable account to the same Slack workspace, they replace the
previous owner"* — so any client can sign up for $25 and quietly displace you as owner of
their own group. Meanwhile liability is capped at twelve months of fees, the company is
sixteen months old, and the ToS never states which jurisdiction governs it.

Where it does earn its place: one or two Pro seats at $50/month as the delivery team's
production tool for client decks, sites, videos and reports. You own the outputs, commercial
use is permitted, and it replaces roughly $154/month of separate subscriptions. Same
relationship you have with Canva.

**The group-and-key idea is right, but inverted.** You don't receive a key from the client's
vendor — you *issue* the key. The client gets a Studex workspace ID and a Studex API key
against infrastructure you own. Whoever issues the key owns the customer; hand out a
third-party key and your churn becomes their upsell. A "group" is one tenant = channel +
memory + vault + runtime + ledger, and if any one of those five is shared across clients you
cannot honestly sell private per-company infrastructure.

**"Our agents manage theirs" works in one direction only.** The Studex supervisor writes tasks
into a tenant's queue and receives reports back. It does not read their memory without an
explicit, time-boxed, logged grant. That asymmetry is the security model, and it has to exist
from day one because it cannot be retrofitted after three clients' data has mingled.

**Use OpenHands for the runtime.** MIT core, self-hostable, and it exposes the Agent Server
REST API that Runable lacks. But note the same trap in different clothes: Agent Canvas is
explicitly *"unauthenticated, single-tenant"* with agents comingled on one pod. At pilot scale
run one deployment per client — crude, genuinely isolated, defensible. At scale, OpenHands
Enterprise adds real multi-tenancy, RBAC and per-run sandboxes in your own VPC.

**R5,000/month holds up, but it is a productised service, not SaaS.** Gross margin ~44% at
steady state: R1,200 infra, R1,850 human delivery. Break-even around **21 clients** — so three
clients is a funded pilot running roughly R42,000/month negative, not a business. Three annual
prepayments at ten-months-for-twelve raise R150,000, which roughly funds the control plane
build. The path to 67% margin is real and is the actual business plan: automate provisioning,
make training self-serve, build vertical skill libraries, and get human time under an hour per
client.

**Four things that break it:** video-heavy clients (Runable Unlimited alone is 64% of their
subscription — make video a metered add-on); the founder call at scale (move to weekly cohort
calls, keep 1:1 for R10,000+); scope creep in human hours (contract an allowance, bill
overage); and the ecosystem promise, which at three clients is untrue — sell curated
introductions you make by hand, not "marketplace access."

**Where R5,000 sits:** it replaces the R3,500 Starter rather than slotting beside it. Ghost
R950 → **Company Builder R5,000** → Business R10,000 → Enterprise R20,000. Note the
consequence: the Studex Rise tier ("100–1,000 startups per country") mostly cannot afford
R5,000 — that tier needs the R950 Ghost, with R5,000 as the upgrade once funded.

**The one non-negotiable.** The launch strategy sells persistent memory, decision traces,
isolation and a public ten-question audit we score ourselves against. Deliver three clients
through one shared vendor account and that audit fails questions 1, 5, 8 and 10 — with Q8
("where does our data live and who else's is there?") failing badly, because the answer would
be *the same account as your competitors*. Publishing an exam you fail, having told the market
that failing it disqualifies a vendor, is worse than never publishing it. The control plane is
not infrastructure competing with marketing spend; it is what makes the marketing true.

## Do this first

1. **Start with one client, not three.** Client C profile — a consultancy with templated
   proposals — is the cheapest loop to prove.
2. **Reconnect WhatsApp.** WABA `105198275846951` needs SMS verification and two of three
   pilot clients live there. Critical path.
3. **Buy one Runable Pro seat** for the delivery team. Do not put a client on it.
4. **Build the tenant registry, key service and ledger** before client two. Instrument from
   day one or the receipts never exist.
5. **Package video as a metered add-on** before signing a content-heavy client.
6. **Ask Runable for written partner terms** if the tool becomes central — don't assume §11.

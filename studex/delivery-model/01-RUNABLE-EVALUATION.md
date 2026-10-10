# Runable: What It Can and Cannot Be
**Prepared by:** Robusca Romanov | **Date:** 2026-08-25
**Question asked:** can we use Runable to deliver a managed agent service to paying clients?

---

## Verdict

> **Yes as a tool your delivery team uses. No as the platform you resell.**
>
> Buy one or two seats for internal production. Do not build the R5,000/month product on it.

That is not a close call, and the reason is not price — it is that Runable has no concept of a
tenant. There is nowhere to put a client.

---

## What Runable actually is

A general AI agent that turns a plain-language prompt into a finished artifact: websites,
slide decks, videos, images, audio, podcasts, reports, spreadsheets, carousels, canvas
designs, browser automations. You describe an outcome, it plans, browses, writes and runs
code in its own sandbox, and hands back a file or a live link.

- **Models:** Anthropic, Google, OpenAI, xAI, abstracted in Agent Mode into Lite / Pro / Max tiers
- **Pricing (docs, Aug 2026):** Starter $25/mo, Pro from $50/mo, Unlimited $200/mo. Credit-based, every operation deducts credits, unused credits do not roll over
- **Surfaces:** web, iOS, Android, Mac, plus RunClaw bots in Slack, Discord, Teams and Telegram
- **Included on all paid plans:** connectors, memory, skills, export
- **Company age:** founded 2025-04-22, so roughly sixteen months old
- **Outputs:** yours, commercial use permitted

It is a genuinely capable product and the benchmark claims are strong. The problem is
structural, not qualitative.

---

## The six blockers

Ranked by how badly each one breaks the business you described.

### 1. There is no tenancy. At all.

Straight from the Runable FAQ:

> *"You can share individual chats with others via a public link or by email. Shared access
> is read-only. **There are no team or organization accounts.**"*

This is the whole argument. A managed service needs a container per client — their workspace,
their data, their permissions, their history, walled off from every other client. Runable's
only sharing primitive is a read-only link to a single chat.

So "make a group for the client" has no Runable equivalent. You would be running three
clients through one personal account, with their commercially sensitive material in a single
undifferentiated history. There is no way to give a client governed access to their own
material, and no way to stop client A's context bleeding into client B's outputs.

### 2. There is no API

No public API, and explicitly no bring-your-own-key:

> *"Runable uses its own infrastructure to run AI models. You pay through Runable credits,
> not through your own API keys."*

Without an API you cannot provision a client, meter their usage, enforce their limits,
retrieve their audit trail, or bill them for what they actually consumed. Every one of those
is a manual operation in a browser. That is not software as a service — it is a person with
a lot of tabs open, and it stops working somewhere around client number eight.

### 3. The terms do not permit resale, and name the alternative

- **§11 Intellectual Property** — you may not *"Copy, modify, distribute, or **sell any part of
  the Services**"*, and may not use Runable branding without written consent. That closes both
  resale and white-labelling.
- **§4 Acceptable Use** — you must not *"Circumvent usage limits, **billing systems**, or
  security measures."* Running multiple paying clients' workloads through one subscription is
  at minimum arguable against this, and the argument would be happening after you had built a
  business on it.
- **§8** offers an **Affiliate Program** — referral commissions, subject to approval. That is
  the sanctioned commercial relationship. A vendor that wanted resellers would have a reseller
  programme; this one has an affiliate programme.

If the model is genuinely attractive, the correct move is to ask Runable for written
permission or a partner arrangement — not to assume it. But note what you would be asking
for: permission to build your margin on their platform, from a company that is sixteen months
old and has no reseller motion.

### 4. Credits cannot be transferred or carried

Credits are per-account, non-transferable between accounts, and expire at the end of each
billing cycle. You cannot allocate a client a budget, cannot carry their unused capacity, and
cannot show them what they consumed. Any client-facing usage accounting would be a
spreadsheet you maintain by hand.

### 5. RunClaw's ownership model can be flipped by the client

This is the one that would actually hurt, and it is the closest thing to the mechanism you
described — so it is worth reading carefully. From the Slack docs:

> *"When one user installs Runable on a Slack workspace, members in the server can use the
> bot. **All usage is billed to the account that installed it.**"*
>
> *"**When another user connects their Runable account to the same Slack workspace, they
> replace the previous owner. Billing then moves to their account.**"*

The first line is your model working. The second line is your model ending. Any client who
signs up for Runable directly — $25 a month, no conversation with you — can connect their
account to their own workspace, silently displace you as owner, and keep the agent. Your
tenancy boundary is a setting the customer controls.

Also: only the connecting user can see or change the settings, and Telegram supports DMs
only, no groups. So the surfaces are narrower than they first appear.

### 6. Platform dependency, priced

- **§2** — Runable may *"add, modify, or discontinue any part of the Services at any time
  without liability."*
- **§14** — total liability capped at fees you paid in the preceding twelve months. On two Pro
  seats that is roughly $1,200. If a discontinued feature takes out your delivery model
  mid-contract with fifty clients, that cap is your entire recourse.
- **§9** — fees non-refundable.
- **§17** — governed by *"the laws of the jurisdiction in which Runable is incorporated"*, and
  the terms never say which jurisdiction that is. You would not know which courts you were in.
- Pricing has already moved materially: independent reviews from July 2026 cite Pro at $20 and
  Max at $100; current docs say Starter $25, Pro from $50, Unlimited $200. Your cost base can
  re-rate with "reasonable notice."

None of these are unusual for a young SaaS. They are simply unacceptable in a supplier that
*is* your product rather than one of your tools.

---

## Where Runable genuinely earns its place

Having said all that — buy it. Just put it in the right slot.

**As your delivery team's production tool**, at $50/month for a Pro seat, it is excellent
value and entirely within terms. You own the outputs and may use them commercially. Concretely,
it collapses this stack for the work your team does *on behalf of* clients:

| Job | Was | Now |
|---|---|---|
| Client pitch deck | Gamma / designer | Runable slides |
| Client landing page | Lovable / Bolt / dev time | Runable websites |
| Product or promo video | Runway / Pika / HeyGen | Runable video |
| Market research report | Perplexity + analyst hours | Runable reports |
| Social carousels, images | Canva + Midjourney | Runable carousels/images |

Runable's own comparison widget puts that basket around $154/month of separate
subscriptions. One or two Pro seats shared across the delivery team is real, defensible
savings on work you are doing anyway.

**The distinction that keeps you safe:** Runable is a tool *Studex staff and Studex agents*
use to produce deliverables. It is never the thing the client logs into, never the thing the
client's key authenticates against, and never named as the product. Same relationship you
have with Canva or a laptop.

---

## The self-hosted alternative for the resold layer

You mentioned OpenHands, and it is the right instinct for the layer you actually need to own.

**OpenHands core is MIT-licensed and self-hostable**, and it exposes what Runable does not: an
**Agent Server**, a REST API for running multiple agents on a machine, with a TypeScript
client and a separate automation service for scheduling, webhooks and run history. That is a
programmable substrate you can build a control plane on.

**But read the isolation caveat carefully**, because it is the same trap in a different shape.
The docs are blunt that Agent Canvas is *"an **unauthenticated, single-tenant** application…
one shared instance where all agents are comingled on the same pod and PVC, with no built-in
authentication, user-level role-based access control, or tenant isolation."*

So do not put three clients on one OpenHands instance and call it private. That is the same
untruth as the Runable route, just self-hosted.

Two honest options:

- **Pilot scale (3–10 clients):** one OpenHands deployment per client — separate VM or
  Kubernetes namespace, separate volume, separate credentials. Crude, slightly wasteful, and
  genuinely isolated. Defensible in a security conversation because it is true.
- **Scale (10+ clients):** **OpenHands Enterprise** — Helm-deployed into your own VPC, adding
  SSO/SAML/OIDC, RBAC, real multi-tenancy, and per-run isolated agent sandboxes instead of a
  shared pod. Source-available, licensed, contact-sales, Kubernetes install currently on
  request. Components include a runtime API for sandbox lifecycle, Keycloak for identity, and
  LiteLLM to route to your chosen models.

The Enterprise path is also the one that lets you keep inference on your own keys and your own
models, which matters for both margin and the privacy claim.

---

## Summary

| | Runable | Self-hosted OpenHands |
|---|---|---|
| Multi-tenant | ❌ none, stated explicitly | ⚠️ per-instance at pilot scale; real via Enterprise |
| API for provisioning/metering | ❌ | ✅ Agent Server REST API |
| Own model keys | ❌ credits only | ✅ any provider via LiteLLM |
| Per-tenant audit trail | ❌ | ✅ (Enterprise: logged, attributed, policy-governed) |
| White-label | ❌ prohibited | ✅ it's your deployment |
| Resale permitted | ❌ §11; affiliate programme only | ✅ MIT core |
| Data isolation | ❌ one account, read-only sharing | ✅ if deployed per tenant |
| Quality of finished artifacts | ✅ excellent | ⚠️ not its job |
| Cost | $25–200/mo | infra + inference + your engineering |

**Use both, in the right slots.** OpenHands under your control plane is what the client buys.
Runable is what your team uses to make the deliverables look expensive.

# Grok Bot — What It Is, and What It Means For Us
**Prepared by:** Robusca Romanov | **Date:** 2026-08-27
**Launched:** 11 August 2026 (early beta) — sixteen days old at time of writing

---

## Access — and xAI's own sources disagree

Two xAI sources give different eligibility lists. This matters because it is a purchase
decision, so both are recorded here rather than picking one.

**The setup docs** ([docs.x.ai/grok-bot/get-started](https://docs.x.ai/grok-bot/get-started)),
under *Before you begin*, list the eligible plans as:

> SuperGrok Plus, SuperGrok Heavy, Cursor Pro+, Cursor Ultra, or Cursor Teams Standard or
> Premium (sign in with your Cursor account)

**The launch post** ([x.ai/news/introducing-grok-bot](https://x.ai/news/introducing-grok-bot),
11 Aug 2026) is broader, listing SuperGrok, SuperGrok Plus and Heavy; Cursor Pro, Pro+ and
Ultra; and Cursor Teams Standard and Premium.

**Treat the setup docs as authoritative.** They are the gate at actual sign-in, and they
are maintained rather than dated. On that list, **plain Cursor Pro and plain SuperGrok are
not eligible** — the entry points are Cursor Pro+, Cursor Ultra, Cursor Teams
Standard/Premium, SuperGrok Plus, or SuperGrok Heavy.

The launch post may describe an intended rollout that has since narrowed, or eligibility
may still be moving during beta. Either way, the two-minute test settles it: open
[cursor.com/bot/onboarding](https://cursor.com/bot/onboarding) and try to sign in with the
account we already hold. Do not upgrade anything before doing that.

Other practical notes:

- **Grok Bot usage is metered separately** from the underlying Grok or Cursor plan
  allowance, so handing work to a Bot does not eat into coding usage.
- Sign-in is via **Cursor account**, even on the SuperGrok routes.
- **Legacy Privacy Mode blocks it.** Grok Bot requires cloud data storage; accounts on
  Legacy Privacy Mode must change their Cursor privacy setting first. Worth checking
  before assuming a failed sign-in means an ineligible plan — and worth a deliberate
  decision, given our own posture on data handling.
- macOS and Windows desktop plus iOS. **No Linux desktop, no Android, no iPad.**
  Enterprise access is a waitlist.

---

## What it actually is

Persistent, named AI teammates, each running on a **shared cloud computer** with a
browser, filesystem and terminal.

- Signs into your real tools and uses them as a human would, including apps with no clean
  API or MCP
- Learns a workflow by **following along once** while you do it, then saves it as a
  routine and re-runs it on a schedule or on demand
- Keeps memory, files, browser sessions and preferences across turns
- Two to six Bots can sit in a group chat, message each other, and pass ownership of work
- Approval checkpoints for consequential actions — sending, publishing, purchasing
- Connectors (shown as Plugins) plus MCP, with computer-use as the fallback

Read that list against the Studex OS design and the overlap is uncomfortable. Persistent
agents, own compute, tool access, routines on a schedule, durable memory, approval gates,
multi-agent handoff. That is substantially our architecture, shipped by a
better-capitalised company, sixteen days ago.

Two honest reactions, in order.

---

## First: this is a tool we should use

Not a threat to evaluate — a capability to adopt. Specifically for:

- **Internal marketing production.** A Bot that signs into our own accounts, pulls
  metrics, and drafts is closer to what we planned to build than Runable is.
- **Learning routines by demonstration.** Our routine catalogue is hand-written YAML.
  Demonstrating a workflow once and having it captured is a materially faster authoring
  loop, and authoring is where our engineering time is currently going.
- **Tools without APIs.** Portals like eTenders, provincial procurement sites and CSD
  have no clean API. Computer-use against them is exactly the hard part of `tender-watch`.

Whether this costs anything to trial depends on which Cursor tier we actually hold — check
before upgrading. Either way, the answer to "should we build our own computer-use layer" is
probably no.

---

## Second: it does not replace what we sell, and the reason is structural

**All Bots under one user share one computer, and that computer is one security
boundary.** xAI's own documentation is explicit: files are visible to every Bot, browser
cookies and signed-in sessions are shared, command-line credentials are shared, and the
per-Bot screens are *"separate work surfaces, not security boundaries."*

That single design decision is why Grok Bot cannot be used to deliver our product:

| | Grok Bot | Studex OS |
|---|---|---|
| Isolation unit | One computer **per user**, shared by all their Bots | One tenant — sandbox, volume, secrets, schema |
| Serving multiple clients | Their files, cookies and credentials would co-mingle | Isolated per client, provably |
| Audit trail | Per-user, in-app | Per-tenant, append-only ledger, client-visible |
| Who operates it | The end user | We do, as a managed service |
| Channel | Desktop and iOS app | Their WhatsApp group |
| Android | Not at launch | Required for SA SME clients |
| Governance | Approval checkpoints | Entitlements, time-boxed support grants, logged |

It is built to be **one person's team of agents**, not **one platform serving many
companies**. Anyone trying to run an agency on it would be putting three clients' logged-in
sessions on one shared filesystem — which is the same mistake as the Runable route, and
the reason the control plane exists.

Also worth noting: it is early beta, browser automation still hits website restrictions,
and there is no Android. Our clients are Johannesburg SMEs who live in WhatsApp on Android.

---

## What it changes in our plan

**Nothing about positioning.** If anything it strengthens it. Grok Bot is a very
well-funded validation that persistent agents with their own compute and durable memory
are the right shape — and its shared-computer boundary is a live demonstration of why
per-tenant isolation is a real product rather than a slide. The audit question *"where
does our data live and who else's lives there?"* now has a concrete, named example
attached to it.

**Two things it should change:**

1. **Trial it for internal work this week.** First check eligibility at
   [cursor.com/bot/onboarding](https://cursor.com/bot/onboarding) with the existing
   account before paying for anything. Test the demonstrate-once routine capture against
   a tender portal — that is the capability we most want and least want to build.
2. **Stop planning to build our own computer-use layer.** If Grok Bot or Daytona's
   Computer Use sandboxes handle browser automation adequately, that is rented capability.
   Our engineering goes into tenancy, memory, ledger and channel — the parts nobody else
   will build for us.

**One thing to watch:** enterprise access is on a waitlist. If xAI ships genuine
multi-tenancy with per-client isolation and an exportable audit trail, the overlap stops
being comfortable. That would take real architectural work on their side — the shared
computer is a deliberate design, not an oversight — but it is the scenario that would
compress our window. Worth a re-check each quarter.

---

## Sources

- [x.ai/bot](https://x.ai/bot) — product page and plan inclusion
- [x.ai/news/introducing-grok-bot](https://x.ai/news/introducing-grok-bot) — launch post, 11 Aug 2026
- [docs.x.ai/grok-bot/overview](https://docs.x.ai/grok-bot/overview) — capabilities
- [docs.x.ai/grok-bot/computer-and-apps](https://docs.x.ai/grok-bot/computer-and-apps) — the shared-computer boundary

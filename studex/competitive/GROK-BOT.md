# Grok Bot — What It Is, and What It Means For Us
**Prepared by:** Robusca Romanov | **Date:** 2026-08-27
**Launched:** 11 August 2026 (early beta) — sixteen days old at time of writing

---

## Access, corrected

Earlier notes said Grok Bot was gated to SuperGrok Heavy at $300/month. **That was
stale** — it came from July 2026 aggregator articles written before or around launch.
Access has since expanded considerably.

Per xAI's own launch post and pricing page, Grok Bot is included with:

| Route | Price |
|---|---|
| **Cursor Pro** | **$20/month** |
| Cursor Pro+ / Ultra | higher |
| Cursor Teams Standard / Premium | per seat |
| **SuperGrok** | **$30/month** |
| SuperGrok Plus | $100/month |
| SuperGrok Heavy | $300/month |

Two things worth knowing:

- **Grok Bot usage is separate from your Grok and Cursor plan usage.** Work handed to a
  Bot does not draw down your existing allowance.
- Desktop (macOS, Windows) and iOS at launch. **No Linux desktop, no Android, no iPad.**
  Enterprise access is a waitlist.

**Practical conclusion: if we already hold Cursor Pro at $20/month, we already have Grok
Bot.** Sign in with that plan rather than buying a second subscription.

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

If we hold Cursor Pro this costs nothing to trial, and the answer to "should we build our
own computer-use layer" is probably no.

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

1. **Trial it for internal work this week**, ideally on the Cursor Pro plan we already
   hold. Particularly the demonstrate-once routine capture, against a tender portal.
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

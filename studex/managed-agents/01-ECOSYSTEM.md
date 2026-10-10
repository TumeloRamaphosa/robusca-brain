# The StudEx ecosystem — five layers and a backbone

**Source:** supplied by the owner, 24 Aug 2026.
**Status:** captured as the canonical statement of intent. Implementation status
is annotated per layer and is mostly empty.

This structure did not exist anywhere in the repository before now. It is the
clearest articulation of the business to date and it resolves a question earlier
documents kept fudging: **who the customer is at each level.**

---

## The demand chain

The five layers form a chain where each layer is the previous layer's customer,
and value flows down while talent flows up.

```
GLOBAL COMPANIES
  AI companies · cloud providers · OEMs · investors · governments
  patents · technology · infrastructure · universities
        │  technology, capital, credibility
        ▼
STUDEX GLOBAL MARKETS
  international partnerships · global trade · patents and IP
  capital and fundraising · cloud and data centres · hardware
  research and universities · government and enterprise relationships
        │  technology · capital · opportunities
        ▼
SUPER AGENTS                        top 20–100 companies per country
  Business Ghost (memory + context) · Private VM (secure workspace)
  StudEx Agent OS (goals + workflows) · AI Workforce (agents + teams)
  Local distribution (market access) · Enterprise sales (project management)
        │  projects · tenders · work
        ▼
AGENTIC RISE                        100–1,000 startups per country
  developers · AI engineers · cloud teams · sales companies
  creative studios · consultants · universities · researchers
  BUILD · LOCALISE · DEPLOY · SUPPORT
        ▲  talent · founders · new companies
        │
STUDEX ARCADE  ◄──────────►  MIDNIGHT FOUNDERS CLUB
  gamers, programmers,        international coaching, fundraising
  creators, students,         education, founder community,
  pitch + play,               Friday pitch sessions, AI workspace
  talent passport             and managed agent, startup development
```

### Why the shape is right

The chain is a **two-sided market with a talent pipeline underneath it**. Super
Agents sells to large companies; Agentic Rise supplies the delivery capacity to
service them; Arcade and Midnight Founders Club manufacture the supply of people
who become Agentic Rise. Global Markets is the import layer for technology,
capital and credibility that the whole stack needs.

That is a genuinely defensible structure, because the hard part of selling
managed AI operations at scale is not the software — it is having enough
competent local hands to deliver it. Most competitors have no answer to that.
This design does.

### The load-bearing assumption

The chain only works if **Super Agents can actually deliver for one company.**
Every layer above it is a supply of inputs to that delivery, and every layer
below is a supply of labour for it. If the middle does not work, the diagram is
an org chart for a company with no product.

Current status of the middle: no client has been delivered. That is the
constraint, not partnerships and not capital.

---

## Implementation status by layer

| Layer | Code in this repo | Live anywhere | Notes |
|---|---|---|---|
| Global Companies | n/a | n/a | Relationships, not software. Sanctions exposure — see risk register. |
| Studex Global Markets | none | `markets.studex-group.com` redirects to a hosted shim | Plan-only |
| Super Agents | none | `superagents.studex-group.com`, hand-authored HTML | Marketing site only, no runtime |
| Agentic Rise | none | none | Concept only |
| Studex Arcade | none | none | Concept only |
| Midnight Founders Club | none | none | Concept only |

The one runnable application in the repository is `os/war-room/`, an internal
dashboard, and four of its endpoints return hardcoded values. It is not any
layer of this diagram.

---

## The technology backbone

```
STUDEX BRAIN
  shared knowledge · institutional memory · business intelligence
        ▼
BUSINESS GHOSTS
  one persistent business memory per company
  goals · meetings · customers · projects · documents · decisions
        ▼
STUDEX AGENT OS
  identity · permissions · goals · tasks · workflows · reporting · auditing
        │
   ┌────┴──────────────┬────────────────────┐
   ▼                   ▼                    ▼
AI AGENT RUNTIME   EXECUTION EXCHANGE   STUDEX CLOUD
 OpenClaw            opportunities        virtual machines
 Hermes              tenders              edge AI nodes
 Open Jarvis         partner matching     modular data centres
 DenchClaw           project teams        storage and compute
 CashClaw            work allocation      local models
```

### Mapping the backbone onto things that exist today

This is the useful part, because most of the backbone already has a credible
off-the-shelf answer. Building all of it from scratch would be the mistake.

| Backbone component | Buy or adopt | Reasoning |
|---|---|---|
| **Studex Brain** | Obsidian vault + vector index | Already the working practice. See [04-TALKING-AGENT.md](04-TALKING-AGENT.md). |
| **Business Ghosts** | **Honcho** (Apache-licensed, self-hostable) | Honcho's peer model tracks entities that change over time and already models groups and projects, not just users. This *is* a Business Ghost. Do not build it. |
| **Studex Agent OS** — identity, permissions, auditing | **Buzz** (Apache-2.0) | Buzz gives every human and agent a keypair, signs every event, and keeps one audit log. Identity and auditing are the expensive parts and they are solved. |
| **Studex Agent OS** — goals, tasks, workflows | Buzz workflows (`buzz-workflow`, YAML) + n8n | Buzz for in-workspace automation, n8n for cross-system orchestration. |
| **AI Agent Runtime** | ACP harnesses via `buzz-acp` | Buzz is harness-agnostic over the Agent Client Protocol. OpenClaw, Hermes and the rest become personas and harness configs rather than separate runtimes to build. |
| **Execution Exchange** | build later | This is the only genuinely novel piece, and it has no value until there are clients and delivery partners to match. Build last, not first. |
| **Studex Cloud** | rent first | Modular data centres are a capital business. Rent VMs until Nest VM has passed its health gates. |

**The conclusion worth acting on:** roughly four of the six backbone components
can be assembled from Buzz and Honcho rather than written. That converts the
backbone from a multi-subsystem engineering programme into an integration job.
The remaining original work is the Execution Exchange and the Nest VM lifecycle.

---

## Naming collision to resolve

The five-layer diagram, the Super Agents launch pack and the Puppetier deck use
three different names for overlapping things:

| Concept | Launch pack | Ecosystem diagram | Puppetier deck |
|---|---|---|---|
| Per-client memory | "knowledge pack" | "Business Ghost" | "Obsidian Brain" |
| Per-client isolated machine | "Nest VM" | "Private VM" | "Student Agent Nest — Cloud VM" |
| The orchestration layer | (unnamed) | "StudEx Agent OS" | "The Puppetier OS" / "AOS" |
| The agent population | eight role templates | "AI Workforce" | "64 agents" |

Three names for one thing is how agents and staff end up building four different
versions of it. A decision on canonical names is item 7 of
[08-DECISION-SHEET.md](08-DECISION-SHEET.md).

---

## Payment and settlement rail

The supplied diagram includes a fiat → USDC/USDT → StudEx token → wallet rail
feeding membership, AI and cloud usage, and Execution Exchange settlement.

**This is deliberately not designed in this pack.** The rail as drawn would make
StudEx an issuer of a crypto asset and an operator of a settlement system for
third-party work, which in South Africa is licensed financial activity. The
regulatory analysis is in [06-RISK-REGISTER.md](06-RISK-REGISTER.md) section 1.

The commercial point worth making now: **nothing in the five-layer chain
requires a token.** Memberships, subscriptions and project settlement all work
on ordinary invoicing and payment processing. The token adds regulatory cost and
fundraising friction to a business that can be sold without it. If the token
stays, it should be because it does something invoicing cannot — and that case
has not been written down anywhere.

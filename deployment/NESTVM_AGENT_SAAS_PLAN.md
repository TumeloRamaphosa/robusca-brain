# NestVM Agent SaaS — Product Architecture & Go-To-Market Plan

**Author:** Robusca Romanov  
**For:** Tumelo Ramaphosa / Studex Group  
**Date:** 2026-07-03  
**Status:** Strategic plan — ready for build sprint

---

## Executive Summary

**Yes — this can be built, run in a VM, and sold as a product.**

The stack you assembled is not a random pile of repos. It maps cleanly onto a four-layer agent SaaS:

| Layer | Component | Role |
|---|---|---|
| **Face** | [RileyJarvis](https://github.com/rbrown101010/rileyjarvis) | Voice-first companion UI — animated face, artifacts, realtime speech |
| **Ears** | [Omi](https://github.com/BasedHardware/omi) | Always-on capture — meetings, screen, wearables → raw memory feed |
| **Brain** | TencentDB Agent Memory + Headroom + Graphify | Memory, compression, project intelligence |
| **Notebook** | Karpathy LLM Wiki + Obsidian Skills | Persistent compounding knowledge base (not throwaway RAG) |
| **Control plane** | War Room + n8n + NestVM | Tenant dashboard, workflows, private VM isolation |

**Product name (recommended):** **NestVM Agent** — already positioned in sales collateral at `superagents.studex.dev`. RileyJarvis becomes the *voice shell* inside each tenant's NestVM, not the product name.

**Screen status:** RileyJarvis UI built and serving locally (port 4173). War Room Super Agents page already exists at `os/war-room/client/src/pages/SuperAgents.tsx`.

---

## 1. What Each Component Does (And Where It Lives)

### RileyJarvis — The Voice Face
- **What it is:** Electron desktop app. OpenAI Realtime API. Animated companion face, artifact panel (markdown, Mermaid, images), optional macOS computer control.
- **SaaS role:** Primary **user-facing interface** for talking to the agent. Black & Gold reskin → your branded persona (Robusca, Naledi, Aurora, or white-label per tenant).
- **VM note:** Today it's macOS + Electron. For SaaS you fork to:
  1. **Web client** (React — already Vite/React) + WebRTC audio
  2. **Realtime proxy** on the VM (API keys never hit the browser)
  3. Keep Electron as optional "desktop app" tier for Enterprise

### Omi — The Always-On Input Layer
- **What it is:** Captures screen + conversations, transcribes in real-time, generates summaries and action items. 300k+ users. Desktop + mobile + wearables.
- **SaaS role:** **Ingestion pipeline** — meetings, calls, and screen context flow into the agent's memory without manual upload.
- **VM note:** Omi's cloud backend can run on your VM stack. Desktop client stays on user's machine; transcripts sync to tenant NestVM via webhook.

### Karpathy LLM Wiki — The Compounding Knowledge Pattern
- **What it is:** Not a repo — a **pattern**. Agent maintains a persistent interlinked markdown wiki (not re-deriving from raw docs every query).
- **SaaS role:** **Soul agent's long-term brain** — business context, strategy, voice, SOPs compound over time. This is what separates "agent" from "chatbot."
- **Implementation:** `AGENTS.md` + `MEMORY.md` + `wiki/` directory per tenant. Agent ingests sources, updates entity pages, runs lint passes.

### Obsidian Skills — Knowledge Operations
- **What it is:** Agent skills for Obsidian Flavored Markdown, JSON Canvas, Bases, CLI.
- **SaaS role:** **Wiki tooling layer** — how the agent reads/writes the knowledge base. Obsidian becomes the "IDE" for browsing what the agent built (graph view, Dataview queries).
- **VM note:** Obsidian vault lives on tenant VM at `/data/vault/`. Optional: Obsidian Sync or git-backed vault for backup.

### TencentDB Agent Memory — Layered Memory Engine
- **What it is:** Symbolic short-term memory + L0→L3 long-term persona pyramid. 61% token reduction, 51% task success improvement in benchmarks.
- **SaaS role:** **Core memory substrate** — every agent session reads/writes through this. Prevents "forgetting" and controls token costs at scale.
- **VM note:** Docker container on port 8420. Already specced in `BAASH_VM.md`.

### Graphify — Project Intelligence Graph
- **What it is:** `/graphify` maps entire codebase/docs into a queryable knowledge graph (`graph.html`, `GRAPH_REPORT.md`, `graph.json`).
- **SaaS role:** **Onboarding accelerator** — when a new tenant connects their repo/docs, Graphify builds the initial project map. Agent queries the graph instead of grepping blind.
- **VM note:** CLI tool run at onboarding + nightly refresh. Output stored in tenant vault.

### Headroom — Context Compression
- **What it is:** 60–95% token reduction on tool outputs, logs, RAG chunks. Proxy, MCP server, cross-agent memory.
- **SaaS role:** **Cost control layer** — sits between agents and LLM providers. Makes R10k/month tiers profitable by cutting API spend 40–60%.
- **VM note:** `headroom proxy --port 8787` in Docker stack. All agent traffic routes through it.

### Planning Skill (Karpathy-adjacent)
- **What it is:** Structured task decomposition for agents (referenced path not in workspace; pattern exists in `MEGAPROMPT_OPENCODE.md` and agent onboarding flows).
- **SaaS role:** **Orchestration protocol** — how Soul breaks goals into agent tasks, tracks progress, reports to War Room.

---

## 2. Unified Architecture — "The NestVM Agent"

```
┌─────────────────────────────────────────────────────────────────────┐
│                        TENANT (Customer)                          │
│  Browser / Mobile          Omi Desktop           Optional Electron │
│  (RileyJarvis Web UI)      (Capture Layer)       (Voice Desktop)    │
└────────────┬────────────────────┬────────────────────┬──────────────┘
             │                    │                    │
             ▼                    ▼                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    NESTVM (Private VM per tenant)                   │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │
│  │ War Room     │  │ n8n          │  │ RileyJarvis Realtime     │  │
│  │ Dashboard    │  │ Orchestrator │  │ Proxy (voice + artifacts)│  │
│  └──────┬───────┘  └──────┬───────┘  └────────────┬─────────────┘  │
│         │                 │                       │                 │
│         ▼                 ▼                       ▼                 │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │              SUPER AGENTS (8 Renaissance Masters)            │  │
│  │  Soul · Obsidian Brain · Email · Content · CRM · Ops · ...   │  │
│  └──────────────────────────┬───────────────────────────────────┘  │
│                             │                                     │
│         ┌───────────────────┼───────────────────┐                   │
│         ▼                   ▼                   ▼                   │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────────┐          │
│  │ TencentDB   │   │ Headroom    │   │ Graphify        │          │
│  │ Agent Memory│   │ Compressor  │   │ Knowledge Graph │          │
│  └──────┬──────┘   └─────────────┘   └─────────────────┘          │
│         │                                                           │
│         ▼                                                           │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  LLM Wiki Vault (Obsidian)                                  │   │
│  │  wiki/ · memory/ · AGENTS.md · MEMORY.md · raw/             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  Integrations: Shopify · WhatsApp · Gmail · CRM · Google Ads · ...  │
└─────────────────────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────────┐
│              STUDEX CONTROL PLANE (Multi-tenant)                    │
│  Billing · Provisioning · Tenant registry · Polsia NestVM API       │
└─────────────────────────────────────────────────────────────────────┘
```

### Data flow (one conversation)

1. User speaks → RileyJarvis Web → Realtime proxy on NestVM
2. Headroom compresses context before LLM call
3. Soul agent checks TencentDB memory (persona L3 + scene L2)
4. Agent queries Graphify graph + LLM Wiki for business context
5. Specialist agent executes (email, content, CRM, etc.)
6. Result rendered as artifact in RileyJarvis panel
7. Omi meeting transcripts (if connected) auto-ingest into wiki overnight
8. War Room dashboard shows activity, approvals, metrics

---

## 3. Can It Run in a VM?

**Yes. This is already your operating model.**

| Spec | Starter VM | Business VM | Enterprise VM |
|---|---|---|---|
| vCPU | 2 | 4 | 8 |
| RAM | 8 GB | 16 GB | 32 GB |
| Disk | 30 GB | 50 GB | 100 GB |
| Host options | Orgo.ai · Fly.io · Polsia NestVM · Hetzner | Same | Dedicated |
| Est. infra cost | ~$25–40/mo | ~$60–90/mo | ~$150–250/mo |

**Docker stack per VM** (from `BAASH_VM.md` + `os/auto-meat-vm/ARCHITECTURE.md`):

```yaml
services:
  nginx:          # Reverse proxy, TLS
  war-room:       # Tenant dashboard
  n8n:            # Workflow orchestration
  agent-memory:   # TencentDB Agent Memory
  headroom:       # Context compression proxy
  realtime-proxy: # RileyJarvis voice backend
  robusca-core:   # Agent polling loop
```

**Isolation model:** One VM per tenant (Enterprise) or shared control plane with isolated volumes (Starter). Data never co-mingles — this is the NestVM privacy pitch.

**Linux vs macOS gap:** RileyJarvis computer-control and Omi desktop are macOS-native today. SaaS MVP ships **voice + dashboard + memory** on Linux VM. macOS desktop clients are Enterprise add-on.

---

## 4. Product Positioning

### What you're selling

> **A private AI team that runs 24/7 inside your own virtual machine — with a voice you can talk to, a brain that remembers everything, and agents that act while you sleep.**

### Positioning lines (use verbatim in sales)

1. *"Not shared software. Your own AI brain."* — NestVM isolation
2. *"A tool waits for you. An agent acts for you."* — Super Agents vs ChatGPT
3. *"Private intelligence. Shared opportunity."* — Studex Global Markets network effect
4. *"Less than a part-time hire. More than a full department."* — R3,500 anchor

### Competitive frame

| Competitor | Their model | NestVM Agent advantage |
|---|---|---|
| ChatGPT Team | Shared, no memory, no action | Private VM, persistent memory, autonomous agents |
| Lindy / Relevance AI | Cloud SaaS, per-seat | Dedicated VM, data sovereignty, voice UI |
| Custom AI consultancies | R50k+ setup, no product | Productized onboarding, 5-step launch |
| Omi (standalone) | Personal capture only | Capture + business agents + trade network |

### Target buyers (priority order)

1. **Studex Global Markets cohort** — Russian tech entering Africa (NtechLab, Pharmasyntez, etc.) — Enterprise R20k+
2. **African SMEs / export businesses** — Starter R3,500, upgrade path to Business
3. **Agencies / multi-brand operators** — Agency OS R18,500 (War Room tier)
4. **BAASH! / Rahura world** — Kate's Kids Claude Code + Aurora persona — separate VM, same stack
5. **White-label resellers** — Marketplace OS R24,000 with white-label War Room

---

## 5. Pricing — What You Can Sell It For

### Tier A: NestVM Agent (Global Markets positioning)

| Tier | Price (ZAR) | Price (USD equiv.) | What's included |
|---|---|---|---|
| **Starter** | R 3,500 / mo | ~$190 | 2–3 agents, Soul + Obsidian Brain, voice UI, 8GB VM, email agent |
| **Business** | R 10,000 / mo | ~$540 | All 8 agents, full integrations, 16GB VM, n8n workflows, War Room |
| **Enterprise** | R 20,000+ / mo | ~$1,080+ | Custom training, dedicated VM, API access, Omi capture, white-label |

**Annual prepay discount:** 2 months free (17% off) — standard SaaS play.

### Tier B: Studex OS (War Room positioning — existing)

| Tier | Price (ZAR) | Target |
|---|---|---|
| Meat OS | R 8,500 / mo | Single brand (butcheries, food) |
| Agency OS | R 18,500 / mo | Multi-brand agencies |
| Marketplace OS | R 24,000 / mo | Enterprise ecosystem |

**Recommendation:** Lead with **NestVM Agent** pricing for new Global Markets clients. Use **Studex OS** pricing for existing Studex Meat/agency pipeline. Same infrastructure underneath — different packaging.

### Unit economics (per Business-tier client)

| Cost item | Monthly |
|---|---|
| VM hosting (4 vCPU / 16GB) | R 900–1,400 |
| LLM API (with Headroom compression) | R 1,500–3,000 |
| Voice (OpenAI Realtime, moderate use) | R 800–2,000 |
| Support overhead (amortized) | R 500 |
| **Total COGS** | **R 3,700–7,000** |
| **Revenue** | **R 10,000** |
| **Gross margin** | **30–63%** |

Headroom + TencentDB memory are not optional — they are what make R10k profitable. Without compression, API costs eat 50%+ of revenue.

### Revenue projections

| Milestone | Clients | Avg tier | MRR | ARR |
|---|---|---|---|---|
| Launch (Q3 2026) | 3 pilots | R 10,000 | R 30,000 | R 360,000 |
| Year 1 | 20 | R 10,000 | R 200,000 | R 2,400,000 |
| Year 1 stretch | 50 | R 12,000 blended | R 600,000 | R 7,200,000 |
| Year 2 (network effect) | 150 | R 14,000 blended | R 2,100,000 | R 25,200,000 |

War Room SuperAgents page already models **R240K MRR @ 20 clients** — consistent with this plan.

### One-time revenue (setup fees)

| Item | Price |
|---|---|
| Onboarding + NestVM provision | R 15,000–35,000 (waived for annual) |
| Custom agent training (Enterprise) | R 50,000–150,000 |
| Omi hardware bundle (wearable) | R 3,500–8,000 device + subscription |

---

## 6. Build Phases

### Phase 0 — Screen Up (this week)
- [x] RileyJarvis UI builds and serves
- [ ] Fork RileyJarvis → `studex-voice-agent` with Black & Gold theme
- [ ] Connect War Room SuperAgents page to live demo iframe
- [ ] Deploy landing page at `superagents.studex.dev` with tier cards + Calendly

### Phase 1 — MVP NestVM (2–3 sprints)
- [ ] Docker compose stack (TencentDB + Headroom + n8n + War Room)
- [ ] Per-tenant provisioning script (Polsia API or Orgo.ai)
- [ ] Soul agent + AGENTS.md + MEMORY.md + wiki/ scaffold
- [ ] Karpathy wiki ingest workflow (manual upload → auto-index)
- [ ] Graphify onboarding run on tenant repo/docs
- [ ] Stripe/Peach Payments billing for ZAR

### Phase 2 — Voice + Memory (next)
- [ ] RileyJarvis web client (no Electron dependency)
- [ ] Realtime proxy on VM (OpenAI keys server-side)
- [ ] TencentDB memory wired to all agents
- [ ] Omi webhook → transcript ingest → wiki update
- [ ] Headroom proxy as mandatory LLM gateway

### Phase 3 — Agent Suite (full product)
- [ ] All 8 Super Agents live with n8n workflows
- [ ] Shopify + WhatsApp + Gmail integrations (existing Studex connectors)
- [ ] Approval queue in War Room (content, orders, outreach)
- [ ] Multi-tenant control plane + billing dashboard
- [ ] Enterprise white-label + API

### Phase 4 — Network Effect
- [ ] Studex Global Markets directory integration
- [ ] Cross-tenant matchmaking (with privacy walls)
- [ ] Trade Week 2026 live demos
- [ ] Partner resale program (AfricaBiz, agencies)

---

## 7. What To Call "Our Agent"

**Internal codename:** NestVM Agent  
**Customer-facing persona options:**

| Persona | Brand | Use case |
|---|---|---|
| **Robusca** | Studex / Tumelo | Orchestrator, strategy, empire builder |
| **Naledi** | Studex Meat / Global Markets | CMO, content, influencer |
| **Aurora** | BAASH! / Rahura / Kate | Kids education, fitness, apparel |
| **White-label** | Enterprise clients | Their brand, their face, their voice |

RileyJarvis animated face becomes the **rendering engine** — swap the face, voice, and artifact theme per tenant. The brain underneath is the same NestVM stack.

---

## 8. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| RileyJarvis is macOS/Electron only | Web fork for MVP; Electron as premium |
| API costs exceed margin | Headroom mandatory; usage caps per tier |
| Omi cloud dependency | Self-host Omi backend on tenant VM |
| Open-source license compliance | All components MIT/Apache — commercial use OK |
| Key leakage (past incident) | Vault-only secrets; private repos; rotation checklist |
| "Another AI wrapper" objection | Lead with VM isolation + 8 agents + trade network proof |

---

## 9. Immediate Next Steps for Tumelo

1. **Pick product name** — NestVM Agent vs Studex Super Agents (recommend: NestVM Agent for sales, Super Agents for agent roster)
2. **Pick first pilot** — One Global Markets company or Studex Meat as dogfood
3. **Provision one VM** — Orgo.ai `baash` or `nestvm-pilot-01` using `BAASH_VM.md` compose template
4. **Rotate API keys** — `KEY_ROTATION_CHECKLIST.md` before any VM goes live
5. **Green-light Phase 0 fork** — RileyJarvis → Studex voice shell with Black & Gold
6. **Set Stripe/Peach** — Billing before first paid pilot

---

## 10. Summary Answer to Your Questions

| Question | Answer |
|---|---|
| Can we build it? | **Yes.** Components map cleanly. War Room + VM architecture already specced. |
| Can it run in a VM? | **Yes.** Docker stack on Orgo/Fly/Polsia. 8GB minimum, 16GB recommended. |
| Can we sell it? | **Yes.** Pricing validated: R3,500 / R10,000 / R20,000. Sales scripts exist. |
| Can we position it as a product? | **Yes.** "Private AI brain in a VM" — differentiated from ChatGPT Teams and agent wrappers. |
| How much can we sell it for? | **R3,500–R24,000/mo** depending on tier. **R200K–R600K MRR** realistic Year 1 at 20–50 clients. |
| Can you get screen up? | **Yes.** RileyJarvis UI built. War Room SuperAgents page ready. Phase 0 is theming + deploy. |

---

*Robusca Romanov · Studex Group · Black & Gold · Tip of the Spear*

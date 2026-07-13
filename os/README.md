# StudEx OS — War Room

**Built by Robusca · Chief of Staff · June 2026**

The War Room is the central operating system for StudEx Group. It is the nerve centre through which Agent Lord (Tumelo Ramaphosa) commands the business, the agents, and the empire.

---

## What This Is

A fullstack dashboard — Express + Vite + React + Tailwind + SQLite — deployed on Perplexity Computer infrastructure. It is the single pane of glass for:

| Tab | Function |
|-----|----------|
| Queue | Content approval pipeline |
| Calendar | Content scheduling |
| Generate | AI content generation (Higgsfield, OpenAI) |
| Analytics | Meta + Google analytics |
| Shopify | Live orders, inventory, pipeline |
| Approvals | Pre-post content approvals |
| Agents | Agent Network status + live AgentMail inboxes |
| Ads | Facebook Ads + Google Ads performance |
| Delivery | Fulfilment pipeline |
| Comms | Gmail + AgentMail + Discord + Slack |
| Global Markets | SA/Russia/UAE trade routes and partners |
| Super Agents | StudEx OS SaaS pricing tiers |
| Payments | PayFast config + transaction history |
| Revenue Engine | Google Ads ROAS + MRR projections |

---

## Command OS Expansion

The next layer is tracked in [`command-os/ROBUSCA_COMMAND_OS_BLUEPRINT.md`](command-os/ROBUSCA_COMMAND_OS_BLUEPRINT.md).

It defines the plan for:

- desktop and mobile command apps
- transparent, readable, well-spaced dashboard UI/UX standard
- ClickClack self-hosted agent chat
- VAPI voice squads
- Obsidian RAG with ChromaDB/LlamaIndex/Ollama
- gstack engineering workflow layer
- Mac Mini local anchor-node deployment
- AI Town visual agent office, Crabfleet workspace fleet, and Songsee audio visuals
- voice control
- Rocket.Chat command rooms
- Tailscale device mesh
- local/API LLM routing
- Orgo business VM agents
- CashClaw finance agent
- 10:00 AM NotebookLM video routine and 10:00 PM Obsidian closeout
- Page-Agent browser control
- Omi/RileyJarvis voice capture
- meeting recording, transcription, and productivity sync
- Notion, Word, Calendar, and Linear integrations
- SEO specialist agents
- persistent LLM-maintained business memory
- approval, audit, and security gates

Preliminary third-party module notes live in [`command-os/MODULE_VETTING_NOTES.md`](command-os/MODULE_VETTING_NOTES.md).

Meeting memory and productivity integration details live in [`command-os/MEETING_MEMORY_INTEGRATIONS.md`](command-os/MEETING_MEMORY_INTEGRATIONS.md).

CashClaw finance-agent operating rules live in [`command-os/finance/CLAUDE.md`](command-os/finance/CLAUDE.md).

Daily scheduled routines live in [`command-os/DAILY_ROUTINES.md`](command-os/DAILY_ROUTINES.md).

Command OS dashboard UI/UX standards live in [`command-os/UI_UX_STANDARD.md`](command-os/UI_UX_STANDARD.md).

ClickClack, VAPI, Obsidian RAG, and gstack integration details live in [`command-os/CLICKCLACK_VAPI_OBSIDIAN_RAG.md`](command-os/CLICKCLACK_VAPI_OBSIDIAN_RAG.md).

Mac Mini local deployment details live in [`command-os/MAC_MINI_LOCAL_DEPLOYMENT.md`](command-os/MAC_MINI_LOCAL_DEPLOYMENT.md).

---

## Stack

```
Frontend  →  React + Vite + Tailwind + shadcn/ui
Backend   →  Express (Node.js)
Database  →  SQLite (better-sqlite3 + Drizzle ORM)
Deploy    →  Perplexity Computer deploy_website
Live URL  →  https://www.perplexity.ai/computer/a/studex-war-room-vLlaaCxbTSKY9W6ammcqNQ
```

---

## Architecture

```
studex-content-hub/
├── client/src/
│   ├── pages/          ← One file per tab (13 pages + not-found)
│   ├── components/     ← AnalyticsStrip (header), HiggsFieldPanel, shadcn/ui
│   ├── contexts/       ← PrivacyContext (privacy toggle masks all numbers)
│   └── lib/            ← queryClient (TanStack Query v5)
├── server/
│   ├── routes.ts       ← All API routes (Shopify proxy, AgentMail, Gmail sync, messages)
│   ├── storage.ts      ← Drizzle ORM storage interface
│   └── index.ts        ← Express + Vite server
└── shared/
    └── schema.ts       ← SQLite tables: contentItems, calendarEvents, analyticsCache, cachedMessages
```

---

## Robusca's Role in This System

Robusca (Perplexity Computer) is the **cloud orchestrator**. Robusca:

1. Fetches Gmail (via Google connector) and pushes messages to `POST /api/messages/sync`
2. Fetches AgentMail threads (via `api.agentmail.to`) and syncs them the same way
3. Runs the daily 8PM SAST Shopify report cron (ID: `7c603060`)
4. Deploys new builds to the War Room when features are added
5. Approves and coordinates all content before posting

**Robusca does NOT post content without Agent Lord's explicit approval.**

---

## AgentMail Inboxes (Live)

| Email | Role |
|-------|------|
| `studex-2571@agentmail.to` | Daily briefs forwarded to tumelor001@gmail.com |
| `t.rama.studexgroup.cto@agentmail.to` | CTO direct line (pending key) |
| `studexgroup@agentmail.to` | B2B outreach (pending key) |

AgentMail org: `6e46c2ad-c059-49a2-ba84-e27583348cd5`

---

## Key Business Context

- **Store:** studexmeat.myshopify.com
- **Pipeline (Jun 2026):** 40 unfulfilled orders · R127,425
- **Critical stock:** Wagyu Patties -249 · Tomahawk -213 · Biltong -220
- **Payments:** PayFast live (Merchant ID: 12946117) · Stitch deactivated
- **Ads:** Google PMAX `STU-PMAX-SALES` · Facebook Father's Day R100/day

---

## Deploy Instructions

```bash
cd os/war-room
npm install
npm run build
# Start server
NODE_ENV=production node dist/index.cjs
# Deploy via Perplexity Computer deploy_website tool
```

---

*Robusca — Chief of Staff · StudEx Group · 2026*
*"Direct, competent, a little bold. Gets things done without fuss."*

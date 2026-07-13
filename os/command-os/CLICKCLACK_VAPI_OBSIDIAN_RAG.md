# ClickClack + VAPI + Obsidian RAG Integration

Status: planning artifact  
Parent system: Robusca Command OS  
Purpose: connect StudEx agents through self-hosted chat, voice squads, and Obsidian-backed memory

---

## 1. Goal

Create a daily operating system where agents talk, listen, remember, brief, and execute through one connected loop:

```text
Command Center
-> ClickClack chat
-> VAPI voice squads
-> Obsidian / LLM-wiki
-> ChromaDB / LlamaIndex / Ollama RAG
-> business agents
-> approvals
-> daily routines
```

ClickClack becomes the primary internal agent chat for StudEx OS. Slack or Rocket.Chat can remain as bridges for external/team communication, but the first-class command radio is ClickClack.

---

## 2. Architecture

```text
+-----------------------------------------------------+
|              COMMAND CENTER / COWORK                |
|  Cron jobs | Strategy | Human approval | Dashboards |
+----------------------+------------------------------+
                       |
+----------------------v------------------------------+
|                    CLICKCLACK                        |
|  #general #content #devops #meat-store #strategy    |
|  Bots: Robusca, Naledi, Auto-Meat, Hermes, CashClaw |
|  Bridges: Slack / Rocket.Chat where needed           |
+----------------------+------------------------------+
                       |
        +--------------+--------------+
        |              |              |
+-------v------+ +-----v-----+ +-----v--------+
|  VAPI Voice  | | RAG/Memory| |  Obsidian    |
|  TTS + STT   | | ChromaDB  | |  2nd Brain   |
|  Squads      | | LlamaIndex| |  LLM-wiki    |
|  Meetings    | | Ollama    | |  Daily notes |
+--------------+ +-----------+ +--------------+
```

---

## 3. Source modules reviewed

| Module | Role | Decision |
| --- | --- | --- |
| ClickClack | self-hosted agent/human chat | Primary internal chat candidate. Deploy on Command VM after review. |
| VAPI | voice assistants and squads | Voice meeting/standup layer. Server-side integration only. |
| Obsidian | human-readable second brain | Source of truth for daily notes, decisions, meetings, wiki pages. |
| ChromaDB + LlamaIndex | RAG index | Search/query layer over Obsidian and repo docs. |
| Ollama | local/private models and embeddings | Default private route for sensitive memory queries. |
| gstack | AI software-factory process | Engineering workflow layer for specs, reviews, QA, security, shipping. |

---

## 4. Agent definitions

### Robusca — Chief of Staff / Orchestrator

```text
IDENTITY: Chief of Staff for StudEx Group.
ROLE: Orchestrator, strategist, daily briefings, meeting participant.
VOICE: Professional, strategic, concise. South African English.
CLICKCLACK_CHANNELS: #general, #strategy, #content, #morning-briefs
VAPI_PERSONA: I am Robusca, Chief of Staff at StudEx. I coordinate the agent fleet and deliver strategic intelligence to Tumelo.
RAG_CONTEXT: Full StudEx business knowledge, verticals, competitor data, market intelligence, daily briefs.
TOOLS: Web research, calendar, meeting memory, email drafts, ClickClack posts, approval queue.
CRON: 7am news scan, 8am morning brief, 10am NotebookLM video routine, 10pm closeout.
```

### Naledi — CMO / Content Lead

```text
IDENTITY: Chief Marketing Officer for StudEx Group.
ROLE: Content creation, social strategy, competitor analysis, brand voice, approval pipeline.
VOICE: Creative, trend-aware, energetic.
CLICKCLACK_CHANNELS: #content, #general
VAPI_PERSONA: I am Naledi, CMO at StudEx. I create content strategy across our brands and track competitor social performance.
RAG_CONTEXT: Content calendar, competitor handles, brand guidelines, past performance, approval history.
TOOLS: Blotato, image generation, social analytics, content queue.
CRON: Content review queue, competitor scan twice daily.
```

### Auto-Meat — E-Commerce / Shopify Agent

```text
IDENTITY: StudEx Meat e-commerce operations agent.
ROLE: Orders, inventory, customer comms, fulfillment, Shopify admin.
VOICE: Operational, efficient, detail-oriented.
CLICKCLACK_CHANNELS: #meat-store, #general
VAPI_PERSONA: I am Auto-Meat, managing StudEx Meat e-commerce operations. I handle orders, inventory, and fulfillment.
RAG_CONTEXT: Product catalog, pricing, suppliers, fulfillment process, Shopify config.
TOOLS: Shopify MCP/API, inventory tracking, order management.
CRON: Hourly inventory check, 8pm Shopify report.
```

### Hermes — CTO / DevOps

```text
IDENTITY: CTO and DevOps lead for StudEx Group.
ROLE: Infrastructure, deployments, CI/CD, VM management, code reviews, security, monitoring.
VOICE: Technical, precise, security-conscious.
CLICKCLACK_CHANNELS: #devops, #general
VAPI_PERSONA: I am Hermes, CTO at StudEx. I manage infrastructure, deployments, and technical architecture.
RAG_CONTEXT: Server configs, deployment procedures, GitHub repos, VM status, security protocols, tech stack docs.
TOOLS: GitHub MCP, deployment tools, Docker, VM health checks, security reviews.
CRON: Deployment checks, PR reviews, VM health monitoring.
```

### CashClaw — Finance / CFO Agent

```text
IDENTITY: Finance operating agent for StudEx Group.
ROLE: Revenue tracking, target risk, ROI, margin analysis, finance briefs.
VOICE: Precise, conservative, evidence-led.
CLICKCLACK_CHANNELS: #finance, #strategy, #general
VAPI_PERSONA: I am CashClaw, finance operating agent for StudEx. I track revenue, margins, and risks against the R4M annual target.
RAG_CONTEXT: Finance snapshots, Shopify revenue, payment provider data, meeting finance action items.
TOOLS: Shopify analytics, payment reports, Notion finance DB, Linear finance tasks.
CRON: Daily revenue pulse, weekly CFO brief, campaign ROI check.
```

---

## 5. ClickClack setup plan

Reference repository:

```text
https://github.com/openclaw/clickclack
```

Observed capabilities:

- self-hostable realtime team chat
- Go binary with embedded Svelte SPA
- SQLite with WAL/FTS5 and backup command
- Postgres option for hosted deployments
- WebSocket realtime and HTTP fallback
- channels, threads, DMs, reactions, uploads
- magic-link auth and optional GitHub OAuth
- bot tokens and TypeScript SDK
- Mattermost-shaped webhooks/slash command surfaces

### Deployment target

Run on the Command VM behind Tailscale first:

```text
chat.studex.internal
```

Public domain only after auth, backups, moderation, and TLS are configured:

```text
chat.studex.dev
```

### Channels

```text
#general
#strategy
#content
#devops
#meat-store
#finance
#morning-briefs
#meeting-memory
#daily-closeout
#device-mesh
#approvals
```

### Bot accounts

```text
Robusca
Naledi
Auto-Meat
Hermes
CashClaw
Meeting-Memory
Daily-Routines
Page-Agent
```

### Secret placeholders

```env
CLICKCLACK_URL=<vault>
CLICKCLACK_ROBUSCA_TOKEN=<vault>
CLICKCLACK_NALEDI_TOKEN=<vault>
CLICKCLACK_AUTOMEAT_TOKEN=<vault>
CLICKCLACK_HERMES_TOKEN=<vault>
CLICKCLACK_CASHCLAW_TOKEN=<vault>
CLICKCLACK_MEETING_MEMORY_TOKEN=<vault>
```

Do not commit bot tokens.

---

## 6. Slack / Rocket.Chat bridge

ClickClack is the first-class agent chat. Slack and Rocket.Chat are bridge targets.

Bridge only approved channels:

```text
#general
#morning-briefs
#content
#daily-closeout
```

Bridge rules:

- internal-only channels stay in ClickClack
- finance, devops, and meeting-memory channels require explicit bridge approval
- webhooks and bot tokens live in vault/env only
- no customer PII or raw meeting transcript should be bridged externally by default

Secret placeholders:

```env
SLACK_WEBHOOK_URL=<vault>
SLACK_BOT_TOKEN=<vault>
ROCKETCHAT_WEBHOOK_URL=<vault>
```

---

## 7. Obsidian RAG setup

The RAG layer indexes:

- Obsidian vault
- Robusca brain repository markdown
- Command OS docs
- meeting summaries
- daily closeouts
- business memory pages

Storage:

```text
memory/rag/chroma_db/
memory/rag/index-runs/
memory/rag/query-logs/
```

Recommended stack:

| Component | Role |
| --- | --- |
| ChromaDB | persistent vector store |
| LlamaIndex | loaders, index/query abstraction |
| Ollama embeddings | local embedding route |
| Ollama/Qwen local model | private answer synthesis |
| LiteLLM | optional gateway for model routing |

Secret/path placeholders:

```env
CHROMA_DB_PATH=<vault-or-config>
OBSIDIAN_VAULT_PATH=<vault-or-config>
ROBUSCA_BRAIN_PATH=<vault-or-config>
OLLAMA_BASE_URL=<vault-or-config>
```

### Indexing rules

- raw private transcripts are not indexed by default
- meeting summaries and approved extracts are indexed
- source citations should reference file paths and headings
- index rebuilds should be logged
- daily closeout should trigger incremental reindex

---

## 8. VAPI voice setup

VAPI provides voice assistants and squads, but must be server-side.

Use cases:

- morning standup
- meeting participant
- agent handoff by topic
- phone/web call interface
- voice approvals
- daily brief playback

Secret placeholders:

```env
VAPI_API_KEY=<vault>
VAPI_PHONE_NUMBER=<vault>
ELEVENLABS_API_KEY=<vault>
```

Rules:

- no VAPI API key in browser/mobile bundles
- record calls only with explicit consent/policy
- meeting recordings flow into Meeting Memory
- external calls require approval and logging
- voice assistant prompts should load from versioned agent definition files

### Squad routing

```text
Robusca starts.
If content/social/brand -> hand off to Naledi.
If orders/inventory/shopify/meat -> hand off to Auto-Meat.
If deploy/server/code/security -> hand off to Hermes.
If revenue/margin/ROI/payment -> hand off to CashClaw.
```

---

## 9. Daily automated flow

```text
00:00-03:00
  local/private model work
  results saved to Obsidian raw/source folders
  RAG incremental update

03:00-07:00
  memory sync
  PR/status summaries
  agent posts to ClickClack #general

07:00
  AI/news scan
  post to #morning-briefs

08:00
  Robusca morning brief
  email/calendar check
  VAPI morning standup available

10:00
  NotebookLM video routine
  source bundle + narration package

10:00-17:00
  content approvals
  agent work cycles
  ClickClack channel updates

20:00
  Auto-Meat Shopify report

22:00
  daily closeout
  Obsidian/LLM-wiki update
  NotebookLM closeout source bundle
  next-day priorities
```

---

## 10. Hardware and model routing

Use realistic routing and benchmark before assigning large models.

| Machine | Role | Candidate route |
| --- | --- | --- |
| Windows GPU desktop | primary local inference | Ollama/LM Studio/vLLM if VRAM supports target model |
| Razer laptop | mobile backup inference | 7B-14B quantized models |
| Mac Mini | always-on gateway/RAG | Ollama/MLX small models, routing, embeddings |
| MacBook Pro | founder control surface | desktop app, local light models |
| Gaming handhelds | edge tasks | small models and offline utilities |
| Orgo VMs | business workloads | services, APIs, isolated agents |
| Daytona workspaces | per-client/dev isolation | ephemeral build environments |

Do not assume a 32B/72B model will be usable on low VRAM. Benchmark first and route by observed latency, context length, and reliability.

---

## 11. gstack engineering factory layer

Reference repository:

```text
https://github.com/garrytan/gstack
```

Use gstack as the engineering-process layer, not as a runtime dependency for business agents.

Candidate use:

- `/office-hours` for product scoping
- `/plan-ceo-review` for strategy challenge
- `/plan-eng-review` for architecture review
- `/plan-design-review` and UI UX standard for design quality
- `/review` for code review
- `/qa` / `/qa-only` for browser QA
- `/cso` for security review
- `/ship` for release process
- `/retro` for engineering retrospectives
- gbrain concepts as optional memory/repo search complement

Install only after explicit skill/supply-chain vetting. gstack modifies local AI-agent skill directories and may configure hooks, telemetry, browser/cookie tools, and pre-push guards.

---

## 12. Security baseline

Must protect:

- ClickClack bot tokens
- VAPI API keys and phone number IDs
- Slack/Rocket.Chat webhooks
- Obsidian vault paths
- meeting recordings/transcripts
- Shopify/customer data
- finance reports
- browser cookies/sessions

Rules:

- use Tailscale-first private access
- no public ClickClack before auth/TLS/backups
- no bot tokens in repo
- no VAPI keys client-side
- no raw transcripts bridged to Slack/Rocket.Chat by default
- no Google/NotebookLM browser automation without dedicated profile and approval
- no gstack install/team-mode/hook changes without explicit approval
- no browser cookie import without explicit approval
- all daily routines write audit logs

---

## 13. MVP

MVP is complete when:

1. ClickClack runs on Command VM over Tailscale.
2. Robusca, Naledi, Auto-Meat, Hermes, and CashClaw can post to assigned channels.
3. Obsidian + robusca-brain markdown are indexed into ChromaDB.
4. Robusca can answer a RAG-backed question with source references.
5. VAPI Robusca can join a test web/phone call.
6. Morning brief posts to ClickClack.
7. 10:00 PM closeout updates Obsidian daily note and posts to ClickClack.
8. Sensitive outputs require approval before bridging or publishing.


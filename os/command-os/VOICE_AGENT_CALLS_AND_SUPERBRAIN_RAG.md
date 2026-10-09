# Voice Agent Calls and Superbrain RAG

Status: planning artifact  
Parent system: Robusca Command OS  
Purpose: enable one-on-one calls with each agent, live War Room meetings, and automatic memory/RAG ingestion into Obsidian, LLM-wiki, Tencent memory, and vector search

---

## 1. Goal

Tumelo should be able to:

1. call any agent individually
2. host a live War Room meeting with multiple agents
3. speak naturally with agents through voice
4. record and transcribe meetings
5. save meeting outputs into Obsidian
6. update the LLM-wiki / super brain
7. capture agent memories in TencentDB-Agent-Memory
8. index approved knowledge into RAG
9. ask the system what it knows and get sourced answers
10. route actions to the right tools with approval gates

---

## 2. Call modes

### One-on-one agent calls

Each agent should have an individual voice room/call endpoint.

| Agent | Call use |
| --- | --- |
| Robusca | strategy, daily brief, command center, cross-agent coordination |
| Naledi | content strategy, social campaigns, brand decisions |
| Auto-Meat | Shopify, inventory, fulfillment, customer ops |
| Hermes | infrastructure, deployments, security, CI/CD, VM health |
| CashClaw | revenue, margins, ROI, finance risks |
| Meeting-Memory | recall past meetings, decisions, tasks, and context |

Flow:

```text
Tumelo calls agent
-> VAPI assistant answers
-> Command API opens call session
-> RAG context loaded for that agent
-> live transcript captured
-> summary/action items generated
-> memory saved after review/policy
```

### War Room multi-agent meeting

War Room meeting is a live squad call.

Default squad:

```text
Robusca = coordinator
Naledi = content/brand member
Auto-Meat = meat/ecommerce member
Hermes = technology/devops member
CashClaw = finance member
Meeting-Memory = recall/scribe member
```

Handoff rules:

```text
content/social/brand -> Naledi
orders/inventory/shopify/meat -> Auto-Meat
deploy/server/code/security -> Hermes
revenue/margin/ROI/payment -> CashClaw
past decision/meeting/source -> Meeting-Memory
cross-business strategy -> Robusca
```

---

## 3. Live meeting pipeline

```text
VAPI voice call
-> Command API session
-> live transcript stream
-> speaker/agent labels
-> local/private RAG context retrieval
-> live notes panel in War Room
-> human approval for actions
-> meeting artifact generation
-> Obsidian daily note + business memory update
-> TencentDB-Agent-Memory capture
-> vector/BM25 index update
-> ClickClack meeting summary
-> Notion/Linear/Calendar sync if approved
```

---

## 4. Memory layers

The “super brain” should be layered, not one database pretending to do everything.

| Layer | Tool | Purpose |
| --- | --- | --- |
| Human-readable source | Obsidian markdown | daily notes, meeting summaries, decisions, wiki pages |
| LLM-maintained synthesis | LLM-wiki | entity pages, concept pages, contradiction logs, index |
| Conversation memory | TencentDB-Agent-Memory | agent conversational memory, multi-turn recall |
| Vector retrieval | ChromaDB initially, Qdrant later if scale demands | semantic search over approved docs |
| Keyword retrieval | SQLite FTS/BM25 | exact match over names, SKUs, decisions, dates |
| Structured memory | Postgres/SQLite | meetings, tasks, approvals, sync state |
| Local model route | Ollama/MLX | private summarization, extraction, embeddings |
| Orchestration | LlamaIndex first; LangGraph/LangChain optional | ingestion, retrieval, routing, tool calls |

---

## 5. Best RAG recommendation

Recommended architecture for StudEx:

```text
Hybrid RAG + memory stack

Obsidian / Markdown source of truth
-> ingestion pipeline
-> metadata normalization
-> chunking by document type
-> embeddings into ChromaDB
-> exact search into SQLite FTS/BM25
-> TencentDB-Agent-Memory for conversational recall
-> LlamaIndex query engines per agent
-> reranking / source filtering
-> answer synthesis with citations
-> writeback only after approval/policy
```

Why this is best:

- Obsidian remains human-readable and portable.
- LLM-wiki gives durable synthesized knowledge.
- Tencent memory handles agent conversation continuity.
- Vector search catches semantic similarity.
- BM25 catches exact terms, names, dates, SKUs, and acronyms.
- Structured DB handles operational truth: tasks, approvals, meetings, sync status.
- Local Ollama route keeps sensitive material private.
- Per-agent namespaces prevent cross-business memory bleed.

Default choice:

```text
LlamaIndex + ChromaDB + SQLite FTS + TencentDB-Agent-Memory + Obsidian
```

Upgrade path:

```text
Qdrant replaces ChromaDB when vector scale / filtering / multi-node access demands it.
LangGraph/LangChain can be added when workflows need complex state machines.
```

---

## 6. Namespaces

Every memory write must include namespace metadata.

Required namespaces:

```text
studex/command
studex/meat
studex/coffee
studex/global-markets
studex/rahura
studex/finance
studex/devops
studex/content
studex/meetings
studex/personal-command
```

Meeting namespace example:

```json
{
  "namespace": "studex/meetings",
  "business": "studex-meat",
  "visibility": "private",
  "source": "vapi-war-room",
  "participants": ["Tumelo", "Robusca", "Auto-Meat", "CashClaw"],
  "approved_for_rag": true
}
```

---

## 7. Agent-specific RAG profiles

### Robusca

Retrieves:

- all approved business summaries
- strategy docs
- decision logs
- daily briefs
- cross-agent status

### Naledi

Retrieves:

- brand guidelines
- content calendar
- competitor notes
- social performance
- approved creative decisions

### Auto-Meat

Retrieves:

- product catalog
- order/fulfillment procedures
- inventory notes
- supplier details
- customer-comms templates

### Hermes

Retrieves:

- deployment docs
- CI/CD notes
- server configs
- security protocols
- incident/postmortem logs

### CashClaw

Retrieves:

- finance snapshots
- revenue targets
- ROI notes
- margin decisions
- finance meeting notes

### Meeting-Memory

Retrieves:

- all approved meeting summaries
- decisions
- action items
- open loops
- transcript excerpts where allowed

---

## 8. What gets saved after calls

Every call should create:

```text
memory/raw/calls/YYYY/MM/<call-id>/
  audio.m4a
  transcript.json
  transcript.vtt
  metadata.json

memory/business/<business>/meetings/<call-id>.md
memory/business/<business>/tasks/<derived-tasks>.md
memory/business/<business>/decisions/<derived-decisions>.md
```

TencentDB-Agent-Memory capture:

```json
{
  "namespace": "studex/meat",
  "turns": [
    { "role": "user", "content": "What is blocking order fulfillment?" },
    { "role": "assistant", "agent": "Auto-Meat", "content": "..." }
  ],
  "metadata": {
    "call_id": "...",
    "business": "studex-meat",
    "approved_for_memory": true
  }
}
```

---

## 9. War Room UI requirements

The War Room meeting screen should show:

- live participants
- active speaker
- transcript stream
- RAG sources currently loaded
- agent handoff log
- decisions captured
- action items captured
- approvals required
- record/pause/stop controls
- save destinations: Obsidian, Tencent memory, Notion, Linear, Calendar, ClickClack

Views:

```text
One-on-One Call
War Room Meeting
Transcript
Sources
Actions
Memory Writes
Approvals
```

---

## 10. Tools and unresolved aliases

Confirmed or already documented:

- VAPI
- ClickClack
- Obsidian
- LLM-wiki
- TencentDB-Agent-Memory
- ChromaDB
- LlamaIndex
- Ollama
- LiteLLM
- Notion
- Linear
- Calendar
- Word/Microsoft 365

Need clarification:

| User phrase | Current interpretation |
| --- | --- |
| “lung” | likely LangChain/LangGraph or another memory/RAG tool; confirm before implementation |
| “headroom” | unknown tool/name; confirm before implementation |

Until clarified, do not build assumptions around “lung” or “headroom.” Keep them as pending integrations.

---

## 11. Build order

1. Add VAPI assistant definitions for each agent.
2. Add VAPI War Room squad definition.
3. Build Command API call-session endpoints.
4. Store call metadata and transcript artifacts.
5. Add War Room Meeting UI.
6. Add Obsidian meeting writeback.
7. Add TencentDB-Agent-Memory capture endpoint.
8. Add ChromaDB + SQLite FTS indexing.
9. Create LlamaIndex per-agent query engines.
10. Add ClickClack meeting summary posts.
11. Add Notion/Linear/Calendar sync after approval.
12. Add local/private model route for sensitive call summaries.

Suggested endpoints:

```text
POST /api/calls/start
POST /api/calls/:id/transcript
POST /api/calls/:id/stop
GET  /api/calls/:id
POST /api/calls/:id/save-to-obsidian
POST /api/calls/:id/capture-memory
POST /api/calls/:id/index-rag
POST /api/calls/:id/sync
```

---

## 12. Security and consent

Required:

- explicit recording indicator
- consent policy per call type
- private model route by default for raw transcripts
- approval before external sync
- approval before agent writes tasks to Notion/Linear
- no raw transcripts in ClickClack by default
- no recordings in git
- retention and deletion policy

Never:

- silently record
- expose raw call audio publicly
- send private transcripts to API models without approval
- mix memory between businesses
- allow agents to execute meeting action items without approval


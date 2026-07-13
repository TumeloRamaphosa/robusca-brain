# Hybrid Voice RAG App

Status: planning artifact  
Parent system: Robusca Command OS  
Purpose: unify VAPI calls, Riley-style desktop voice, ClickClack chat, Shopify voice commerce, LLM Wiki, Obsidian RAG, local models, mobile app, desktop app, and Tailscale

---

## 1. Goal

Build one hybrid “head smart thing” for StudEx:

```text
Talk
-> understand
-> retrieve memory
-> decide safe next step
-> act through tools
-> record what happened
-> update superbrain
```

This should work through:

- phone/web calls
- desktop voice orb
- mobile app
- ClickClack chat
- War Room meetings
- store/customer voice flows
- local models where possible
- API models where approved
- Tailscale-connected local services

---

## 2. Hybrid architecture

```text
Mobile App / Desktop App / Store Voice / VAPI Call / ClickClack
-> Command API
-> Policy + Approval Engine
-> Agent Router
-> Hybrid RAG Router
-> Tool Router
-> Memory Writeback
```

Core components:

| Component | Role |
| --- | --- |
| VAPI | live calls, one-on-one agent calls, War Room squad meetings, store phone calls |
| Riley-style desktop shell | local desktop voice orb and artifact panel |
| ClickClack | internal agent/human chat and meeting summaries |
| Obsidian | human-readable daily notes, decisions, meetings, wiki |
| Obsidian Skills | Markdown, Bases, JSON Canvas, CLI, and Defuddle skill layer |
| LLM Wiki | desktop/wiki app pattern, graph, source traceability, local API/MCP inspiration |
| TencentDB-Agent-Memory | agent conversational memory |
| ChromaDB / SQLite FTS | semantic + exact retrieval |
| LlamaIndex | ingestion/query engines |
| Ollama / MLX | local/private model route |
| Gemini CLI / Google AI Studio | optional cloud/CLI route after installation and policy approval |
| LiteLLM | unified API/local model router |
| Shopify | store/product/order/cart operations |
| Tailscale | private access to Mac Mini/local services |

---

## 3. Voice modes

| Mode | Use |
| --- | --- |
| Robusca Command | strategy, briefs, cross-agent orchestration |
| Agent One-on-One | direct call with Naledi, Auto-Meat, Hermes, CashClaw, etc. |
| War Room Meeting | multi-agent live meeting with transcript and memory |
| Store Sales Voice | customer/product/order conversation |
| Meeting Scribe | record, summarize, extract actions |
| Local Private | sensitive prompts routed to local model only |
| Offline Mobile | phone-local small model for notes/drafts when disconnected |

---

## 4. Store voice and order-taking

The store can talk and take orders, but must avoid unsafe payment handling.

Recommended flow:

```text
Customer calls or uses store voice widget
-> VAPI Store Assistant
-> Command API
-> Auto-Meat agent
-> Shopify product/catalog lookup
-> customer confirms cart
-> create draft order/cart/checkout link
-> send checkout link or hand off to human
-> order event logged
```

Allowed:

- product questions
- product recommendations
- stock/availability answers
- cart building
- draft order creation
- checkout-link generation
- delivery/fulfillment questions
- internal alert to Auto-Meat

Requires human approval or secure handoff:

- refunds
- discounts above policy
- changing prices
- capturing card/bank/payment details
- modifying existing customer orders
- customer complaints/escalations
- unusually large orders
- legal/medical/regulated claims

Never:

- take card details by voice
- store payment details in transcript
- promise fulfillment beyond policy
- expose customer PII in ClickClack public/bridged channels

---

## 5. Mobile and desktop app

### Desktop app

Recommended stack:

```text
Tauri + React
```

Why:

- lighter than Electron
- good local file access with explicit permissions
- works well with local services
- aligns with LLM Wiki’s Tauri direction

Desktop features:

- voice orb
- command palette
- ClickClack panel
- VAPI call controls
- meeting recorder
- RAG source viewer
- artifact panel
- local model selector
- Tailscale node status
- store voice monitor

### Mobile app

Recommended stack:

```text
React Native / Expo
```

Mobile features:

- voice command
- one-on-one agent call
- War Room meeting join
- approval inbox
- daily brief
- meeting recorder
- offline notes
- local small model mode where supported
- Tailscale connection to Mac Mini/Orgo services

---

## 6. Local models on phone and offline mode

Phone-local models are possible, but with constraints.

### Best mobile local strategy

| Mode | Use |
| --- | --- |
| On-device small model | offline notes, drafts, classification, simple recall |
| Tailscale to Mac Mini Ollama | stronger local/private model route |
| Cloud/API model | high-quality route when approved and online |

Practical options:

- React Native llama.cpp / MLC-style local inference for small quantized models
- platform-native small models where available
- connect to Mac Mini Ollama over Tailscale for heavier private inference

Do not expect full desktop Ollama to run on the phone as-is. Treat phone-local models as smaller offline assistants.

Offline mobile mode should support:

- voice note capture
- local transcription if available
- draft summaries
- task capture
- encrypted queue for later sync
- sync to Obsidian/RAG when back online

---

## 7. Tailscale integration

Tailscale makes local services visible privately.

Mobile/desktop apps should discover:

```text
mac-mini-anchor-node
ollama-mac-mini
rag-mac-mini
clickclack-mac-mini
command-vm
studex-vault
```

Rules:

- Tailscale first, public internet later only if needed
- service health check before use
- no local services bound publicly by default
- ACLs restrict which devices can access models, RAG, and vault paths

---

## 8. LLM Wiki integration

Reference:

```text
https://github.com/nashsu/llm_wiki
```

Observed fit:

- Tauri/React desktop app
- Obsidian-compatible wiki
- source traceability
- graph visualization
- vector semantic search
- local HTTP API + MCP server
- agent skills
- two-step ingest
- source folder auto-watch

Recommended approach:

1. Use LLM Wiki’s architecture as a strong reference.
2. Keep StudEx Obsidian/LLM-wiki as source of truth.
3. Evaluate whether to integrate LLM Wiki as a companion app or borrow patterns.
4. Prefer Command OS API as the central policy/approval layer.
5. Do not let any desktop app write to memory without namespace/approval rules.

---

## 9. Hybrid RAG behavior

RAG router should choose sources based on mode.

| Query type | Retrieval path |
| --- | --- |
| past meeting | Obsidian meeting summaries + Tencent memory + transcript excerpts if approved |
| product/store | Shopify catalog + Auto-Meat memory + product docs |
| finance | CashClaw finance snapshots + approved reports + exact search |
| content | Naledi content vault + brand guidelines + competitor notes |
| devops | Hermes infra docs + repo docs + incident logs |
| general strategy | Robusca strategy wiki + daily briefs + decisions |

Always return:

- answer
- sources
- confidence
- what was not found
- suggested next action

---

## 10. Skills this hybrid app has

### Voice skills

- call Robusca
- call Naledi
- call Auto-Meat
- call Hermes
- call CashClaw
- run War Room meeting
- record/transcribe/summarize
- voice approvals
- store voice assistant

### Memory skills

- Obsidian writeback
- Obsidian Markdown, Bases, JSON Canvas, and CLI workflows
- LLM-wiki update
- Tencent memory capture
- vector search
- exact search
- source-cited answers
- meeting recall
- decision recall

### Store skills

- product Q&A
- product recommendations
- cart building
- draft order/checkout link
- order status lookup where authorized
- fulfillment escalation
- human handoff

### App skills

- mobile command cockpit
- desktop voice orb
- ClickClack panel
- approval inbox
- model selector
- Tailscale service discovery
- offline capture

### Local model skills

- phone-local small model mode
- Mac Mini Ollama route
- offline drafts
- private summarization
- local embeddings

### Optional cloud/CLI model skills

- Gemini CLI route after separate installation
- Google AI Studio/Gemini route through server-side Command API/LiteLLM
- second-opinion model route for non-sensitive tasks

---

## 11. Fastest path to “talking now”

Fastest safe prototype:

1. Create VAPI Robusca assistant.
2. Point VAPI webhook to Command API.
3. Connect Command API to one RAG endpoint.
4. Let Robusca answer from Obsidian/Command OS docs.
5. Post summaries to ClickClack.
6. Add Auto-Meat store voice as second assistant.
7. For orders, create draft cart/checkout link only.

Desktop talking prototype:

1. Fork/rebrand RileyJarvis style shell.
2. Replace direct OpenAI-only path with Command API route.
3. Add local model selector.
4. Add ClickClack and artifact panel.

Mobile talking prototype:

1. Build Expo app with push-to-talk.
2. Connect to Command API over Tailscale.
3. Add approval inbox and agent selector.

---

## 12. Security rules

- No payment details by voice.
- No raw API keys in mobile/desktop apps.
- No public local services before auth/Tailscale policy.
- No raw private transcripts sent to API models without approval.
- No memory writeback without namespace and retention policy.
- No store order modification without customer verification and policy.
- No external message/post/email without approval.


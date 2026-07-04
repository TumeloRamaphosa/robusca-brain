# Robusca Command OS Blueprint

Status: planning artifact  
Owner: Tumelo Ramaphosa  
System role: command layer for Studex business-agent VMs, local computers, mobile devices, and voice control

---

## 1. Intent

Robusca Command OS is not a normal Linux distribution at the first stage. It is an operating layer that runs across:

- Orgo business VMs
- the current Studex War Room
- desktop app
- mobile app
- Rocket.Chat
- Tailscale-connected laptops/desktops
- local and API LLM models
- voice/wearable capture
- browser/web UI control
- persistent business memory

The goal is to let Tumelo talk to the system, command business agents, approve risky actions, and route work to the best model or machine available.

---

## 2. Source modules reviewed

| Source | Fit | Decision |
| --- | --- | --- |
| HyrveAI register page | Agent marketplace / external deployment surface | Treat as optional external marketplace integration. Do not make it core until account/API model is clear. |
| Karpathy LLM-wiki gist | Persistent memory pattern | Use the raw-sources -> synthesized wiki -> schema/log pattern for business memory. |
| BasedHardware Omi | Voice, screen, wearable, mobile capture | Use as a voice/capture connector only after self-hosting or privacy-controlled integration. Default quick start connects to Omi cloud. |
| AgriciDaniel claude-seo | SEO specialist skill library | Use as specialist-agent inspiration and optional Claude Code plugin. Audit before installing. |
| AgriciDaniel seo-os | 3D local-first operating shell for SEO agents | Use architecture patterns: orchestrator, specialists, local brain, task feed, OS windows. Note AGPL-3.0 license obligations. |
| Alibaba Page-Agent | In-page web GUI control | Use as browser "hands" for internal web apps, Rocket.Chat, n8n, dashboards, and SaaS forms. Never expose LLM API keys client-side. |
| RileyJarvis | Realtime voice desktop companion | Use as a prototype voice shell. Fork/rebrand/harden before connecting to production systems. |

---

## 3. System shape

```text
Robusca Command OS
|
+-- Apps
|   +-- Desktop command app
|   +-- Mobile command app
|   +-- Web War Room
|
+-- Command Core
|   +-- Command API
|   +-- Approval engine
|   +-- Policy engine
|   +-- Audit log
|   +-- Device registry
|   +-- CashClaw finance agent
|   +-- Daily routines scheduler
|
+-- Communication
|   +-- Rocket.Chat rooms
|   +-- Agent bots
|   +-- Approval queue
|   +-- Daily command briefs
|   +-- Meeting summaries
|
+-- Model Mesh
|   +-- LiteLLM gateway
|   +-- local Ollama / MLX / llama.cpp models
|   +-- Orgo-hosted models
|   +-- external API fallback
|
+-- Automation
|   +-- n8n workflows
|   +-- Page-Agent web control
|   +-- business VM workers
|
+-- Memory
|   +-- Postgres
|   +-- vector store
|   +-- LLM-maintained wiki
|   +-- raw sources vault
|   +-- meeting recordings and transcripts
|
+-- Productivity Integrations
|   +-- Notion
|   +-- Word / Microsoft 365
|   +-- Calendar
|   +-- Linear
|
+-- Mesh Network
    +-- Tailscale nodes
    +-- Orgo VMs
    +-- MacBook / Mac Mini
    +-- Windows-to-Linux machines
    +-- storage vault
```

---

## 4. Orgo business VM model

Each Orgo VM represents a business operating unit, not just compute.

| VM type | Role | Required services |
| --- | --- | --- |
| Command VM | Holding-company command center | Command API, LiteLLM, Rocket.Chat, n8n, Postgres, vector store, audit logs |
| Studex Meat VM | Meat business operations | sales agents, order agents, content agents, supplier/logistics agents |
| Studex Coffee VM | Coffee operations | sourcing, B2B sales, brand/content, export docs |
| Global Markets VM | trade-intelligence unit | buyer discovery, country research, documents, pricing |
| Rahura / BAASH VM | Kate/Rahura brand world | content workflows, education platform workflows, Aurora persona |
| SEO / Growth VM | growth intelligence | SEO Office/Claude SEO specialists, site audits, content briefs |
| Finance VM / Worker | finance intelligence | CashClaw, revenue reporting, margin analysis, ROI, finance meetings |

Every business VM must have:

- isolated workspace
- isolated secrets
- isolated memory namespace
- Rocket.Chat room
- agent roster
- approval policies
- daily status summary
- backup schedule

---

## 5. Rocket.Chat command network

Rocket.Chat is the internal radio network for humans and agents.

Recommended rooms:

```text
#command-center
#approval-queue
#agent-alerts
#daily-briefs
#studex-meat
#studex-coffee
#global-markets
#rahura
#seo-growth
#finance
#infrastructure
#device-mesh
#meeting-memory
```

Recommended bot pattern:

| Bot | Purpose |
| --- | --- |
| robusca-bot | command summaries, approvals, executive briefs |
| charlie-infra | VM/device health, Tailscale status, incidents |
| naledi-brand | content drafts and brand approvals |
| coffee-jarvis | Studex Coffee workflows |
| seo-office | SEO audit summaries and content briefs |
| cashclaw-finance | revenue pulse, margin warnings, finance action items |
| page-agent-bot | browser/action results requiring approval |
| meeting-memory-bot | meeting summaries, action items, transcript links, sync status |

All outbound actions triggered from Rocket.Chat must pass through the Command API approval engine.

---

## 6. Voice and talk layer

Voice should be a first-class interface, but not an uncontrolled microphone-to-agent pipe.

### Voice sources

| Source | Use |
| --- | --- |
| Desktop app microphone | primary command interface |
| Mobile app microphone | pocket command interface |
| Omi wearable/mobile | passive meeting/conversation capture, if privacy policy is accepted |
| RileyJarvis fork | initial desktop voice prototype |

### Voice flow

```text
Microphone / Omi / desktop app
-> speech-to-text
-> Command API
-> intent router
-> policy check
-> LiteLLM model router
-> agent or workflow
-> approval if needed
-> text-to-speech response
-> Rocket.Chat/audit log update
```

### Voice modes

| Mode | Behavior |
| --- | --- |
| Listen | transcribe and summarize only |
| Command | execute safe internal commands |
| Approval | ask Tumelo to approve/reject pending actions |
| Meeting | record, transcribe, summarize, and extract decisions/action items |
| Meeting Review | approve Notion, Word, Calendar, Linear, and Rocket.Chat sync outputs |
| Private | local-only model routing; no external APIs |

---

## 7. LLM mesh

The LLM mesh makes local and API models feel like one private brain.

Core router:

```text
LiteLLM Gateway
```

Model aliases:

| Alias | Route |
| --- | --- |
| robusca-fast | fastest available local/API small model |
| robusca-private | local-only model for sensitive data |
| robusca-code | Ornith or coding-specialized model |
| robusca-vision | model with image/screen understanding |
| naledi-brand | brand/content persona |
| coffee-jarvis | coffee ops persona |
| charlie-infra | infrastructure agent |
| seo-specialist | SEO audit/content model route |

Node registration fields:

```json
{
  "node_id": "macbook-founder-node",
  "role": "founder-command-device",
  "tailscale_name": "macbook",
  "os": "macos",
  "models": ["ollama:qwen-coder", "mlx:local-small"],
  "gpu": "apple-silicon",
  "available": true
}
```

---

## 8. Tailscale device mesh

Tailscale connects the command system privately.

Required nodes:

| Node | Role |
| --- | --- |
| command-vm | control plane |
| studex-meat-vm | business VM |
| studex-coffee-vm | business VM |
| global-markets-vm | business VM |
| rahura-vm | business VM |
| macbook-founder-node | desktop command, local models |
| mac-mini-anchor-node | always-on local node |
| gpu-desktop-inference-node | heavier local inference |
| msi-edge-node | mobile/edge node via WSL/Linux |
| storage-vault-node | models, backups, raw sources |

Rules:

- no public admin panels by default
- access n8n, Rocket.Chat, databases, model endpoints over Tailscale first
- expose public HTTPS only for deliberate customer-facing apps
- every node runs a small health reporter

---

## 9. Page-Agent browser hands

Page-Agent should operate only approved browser surfaces.

Best targets:

- n8n workflow UI
- Rocket.Chat web UI
- Studex War Room
- internal CRMs
- supplier/buyer forms
- analytics dashboards

Production rule:

```text
Page-Agent -> Command API proxy -> LiteLLM -> model
```

Never:

```text
Page-Agent -> raw API key in browser bundle
```

High-risk clicks, form submits, customer messages, purchases, settings changes, deletes, and credential screens require approval.

---

## 10. Memory model

Use the Karpathy LLM-wiki pattern plus structured databases.

Layers:

| Layer | Storage | Purpose |
| --- | --- | --- |
| Raw sources | file vault | immutable source documents, transcripts, screenshots, PDFs |
| Synthesized wiki | markdown | LLM-maintained business knowledge |
| Index | markdown + SQLite | navigable map of memory |
| Log | append-only markdown/table | ingests, queries, decisions |
| Vector store | Qdrant/pgvector | semantic retrieval at scale |
| Operational DB | Postgres | tasks, approvals, device state, agent runs |
| Meeting archive | encrypted file vault + Postgres | recordings, transcripts, summaries, decisions, action items |

Business memory namespaces:

```text
memory/business/studex-meat/
memory/business/studex-coffee/
memory/business/global-markets/
memory/business/rahura/
memory/business/seo-growth/
memory/personal-command/
```

Human review rule:

- agents may draft wiki updates automatically
- material strategic changes should be queued for review
- contradictions must be flagged, not silently overwritten

---

## 11. Meeting memory and productivity integrations

Detailed spec: [MEETING_MEMORY_INTEGRATIONS.md](MEETING_MEMORY_INTEGRATIONS.md)

Meetings are first-class business records. The system must record, store, summarize, present, and sync approved meeting artifacts.

Meeting artifact outputs:

- raw recording
- transcript with timestamps
- speaker labels where available
- executive summary
- decisions
- action items
- risks and blockers
- follow-up agenda
- linked source files
- Notion page
- Word document export
- Calendar event link and follow-up events
- Linear issues for implementation tasks
- Rocket.Chat summary post
- searchable memory entry

Productivity sync pattern:

```text
Meeting capture
-> Command API
-> transcription and diarization
-> structured summary
-> human review
-> Notion / Word / Calendar / Linear / Rocket.Chat sync
-> memory ingest
-> audit log
```

Integration roles:

| Integration | Role |
| --- | --- |
| Notion | meeting pages, knowledge base, task databases |
| Word / Microsoft 365 | polished meeting minutes, DOCX exports, board/client documents |
| Calendar | agenda, attendee list, schedule, reminders, follow-up meetings |
| Linear | engineering/product/project action items |
| Rocket.Chat | internal summary posts, approval requests, daily rollups |

MCP status:

- Notion MCP is present but currently requires authentication in this environment.
- Linear MCP is present but currently requires authentication in this environment.
- Once authenticated, MCP should be preferred for Notion/Linear operations.

Meeting-specific approval rules:

- recording must be explicit or calendar-policy approved
- external sharing of recordings, transcripts, Word docs, or Notion pages requires approval
- Linear issue creation requires review unless the action item is internal and low risk
- raw private recordings should use local/private model routes by default
- calendar follow-up creation requires confirmation when external attendees are included

---

## 12. Security baseline

This system controls businesses, computers, voice capture, and web sessions. Security is core architecture.

Mandatory controls:

- Tailscale private network
- secrets manager
- per-business secrets separation
- role-based permissions
- action approval queue
- audit log for every agent action
- local/private model route for sensitive data
- sandboxed code execution
- backups and restore tests
- device allowlist
- kill switch
- recording consent indicators
- retention policy for raw recordings and transcripts

Actions requiring explicit approval:

- send email/message/customer response
- post to social media
- submit form externally
- delete or modify production data
- spend money
- change DNS/domains/infrastructure
- access sensitive files
- run Page-Agent clicks on risky buttons
- share screenshots/transcripts externally
- share meeting recordings or generated Word/Notion minutes externally
- create calendar events with external attendees
- create Linear issues from sensitive meeting notes

Refused actions:

- credential interception
- hidden data exfiltration
- authentication bypasses
- destructive host commands
- automated forced Docker prune jobs
- storing plaintext secrets in repo files

---

## 13. App surfaces

### Desktop app

Best starting point:

- fork/harden RileyJarvis or build a Tauri shell around the existing War Room
- voice command
- model selector
- Rocket.Chat panel
- approval inbox
- device mesh view
- business switcher
- Page-Agent bridge
- meeting recorder
- meeting library
- Word/Notion/Calendar/Linear sync status

### Mobile app

Best starting point:

- React Native / Expo
- voice command
- push notifications
- approval queue
- Rocket.Chat rooms
- daily brief
- business dashboards
- meeting recorder
- meeting approval review

### Web app

Continue evolving the current War Room:

- add Command Center tab
- add Device Mesh tab
- add Voice Sessions tab
- add Rocket.Chat bridge tab
- add LLM Mesh tab
- add Meeting Memory tab
- add Integrations tab for Notion, Word, Calendar, and Linear

---

## 14. SEO and growth subsystem

Use `claude-seo` and `seo-os` as a dedicated growth-intelligence unit.

Capabilities:

- technical site audits
- schema validation
- AI search optimization
- content briefs
- local SEO
- e-commerce SEO
- competitor research
- weekly drift checks

Integration model:

```text
SEO VM / local worker
-> SEO Office / Claude SEO specialists
-> reports saved to business memory
-> summaries posted to #seo-growth
-> recommended actions enter approval queue
```

License note:

- `claude-seo` is MIT.
- `seo-os` is AGPL-3.0. If we modify and network-serve a derived app, source availability obligations may apply. Prefer using patterns or keeping it as a separate local tool unless legal/licensing is reviewed.

---

## 15. Finance subsystem

Detailed agent instruction file: [finance/CLAUDE.md](finance/CLAUDE.md)

CashClaw is the finance operating agent for Studex Group. It owns revenue tracking, margin analysis, finance reporting, campaign ROI, and target risk alerts.

Core targets:

```text
Annual target: R4,000,000
Monthly target: R333,333
Daily target: R10,999
```

Finance responsibilities:

- daily revenue pulse
- weekly CFO brief
- vertical revenue tracking
- MRR/ARR gap tracking
- campaign ROI analysis
- pricing recommendations
- margin risk alerts
- finance meeting action extraction
- Notion finance summary drafts
- Linear finance task drafts
- Rocket.Chat finance alerts

Finance writes require strict approval when they affect money, accounting records, prices, refunds, invoices, external reporting, or customer-facing statements.

Finance integration model:

```text
Shopify / payment provider / accounting data
-> Command API
-> CashClaw
-> finance report draft
-> approval queue
-> Notion / Word / Linear / Rocket.Chat sync
-> audit log
```

---

## 16. Daily routines subsystem

Detailed routine file: [DAILY_ROUTINES.md](DAILY_ROUTINES.md)

The first standing routines are:

- 10:00 AM NotebookLM video routine
- 10:00 PM daily closeout and Obsidian update routine

Purpose:

- collect the day's business context
- generate a NotebookLM-ready source bundle
- create a script and production plan
- generate narration through ElevenLabs or fallback TTS
- route drafting through local Ollama or approved API models
- update Obsidian/LLM-wiki memory at closeout
- summarize what was done, decisions made, and tomorrow priorities
- save artifacts to Command OS memory
- post internal summary to Rocket.Chat
- queue external publishing for approval

Key integrations:

| Integration | Role |
| --- | --- |
| NotebookLM | knowledge/video/audio artifact surface; may require human-in-the-loop browser access |
| ElevenLabs | polished voice narration |
| Ollama | private local drafting and summarization |
| Google AI Studio / Gemini | approved API model route for higher-quality or multimodal drafting |
| n8n | 10:00 trigger and workflow orchestration |
| Rocket.Chat | internal completion summary and approval cards |
| Obsidian / LLM-wiki | daily closeout memory and business knowledge updates |

Secret handling:

- `ELEVENLABS_API_KEY` and `GOOGLE_AI_STUDIO_API_KEY` must live in vault/env only.
- never paste real API keys into docs, chat, client bundles, screenshots, or notebooks.
- if a key is pasted into chat, rotate it before use.

NotebookLM handling:

- do not automate Google login or CAPTCHA bypass
- use a dedicated Google profile/account if browser automation is later approved
- keep a local source bundle even when NotebookLM is unavailable
- keep private NotebookLM URLs in vault/env, not in repo files

---

## 17. Build phases

### Phase 0 - safety and inventory

- rotate any accidentally pasted token
- list all Orgo VMs and assign business roles
- list all laptops/desktops/storage nodes
- decide Command VM hostname
- install Tailscale on nodes
- define secrets manager

### Phase 1 - command core

- provision Command VM
- deploy Postgres
- deploy LiteLLM
- deploy Rocket.Chat
- deploy n8n
- create Command API skeleton
- create audit log table
- create approval queue table
- create meetings and meeting_action_items tables

### Phase 2 - desktop talk prototype

- fork RileyJarvis or build Tauri voice shell
- rebrand to Robusca/Jarvis
- route audio commands to Command API
- add safe local command mode
- add approval-readout voice mode
- add explicit meeting recording start/stop state

### Phase 3 - LLM mesh

- install node agent on MacBook, Mac Mini, GPU desktop, MSI
- register local model endpoints
- add health/capacity reporting
- configure LiteLLM aliases
- enforce local-only route for sensitive data
- define local/private transcription route for sensitive meetings

### Phase 4 - Rocket.Chat command network

- create rooms
- create bot accounts
- wire n8n triggers
- post daily briefs
- post approval cards
- add `/agent` command route
- add #meeting-memory and meeting summary cards

### Phase 5 - business VM workers

- connect Studex Meat VM first
- add Coffee, Global Markets, Rahura, SEO Growth
- add CashClaw finance worker
- isolate secrets/memory per business
- add daily reports per VM
- route business meeting artifacts into the correct memory namespace

### Phase 6 - Page-Agent browser hands

- install only in approved browser profile
- connect through Command API proxy
- test on internal pages first
- add approval gates for risky clicks

### Phase 7 - mobile cockpit

- build Expo app
- approvals
- voice command
- Rocket.Chat
- command brief
- push notifications
- meeting capture and review

### Phase 8 - productivity integrations

- authenticate Notion and Linear MCP/API access
- configure Microsoft Graph for Word/OneDrive/Calendar if Microsoft stack is used
- configure Google Calendar if Google Calendar is first
- create meeting export templates
- add Notion meeting page sync
- add Linear issue creation from approved action items
- add Calendar event linking and follow-up creation

### Phase 9 - finance intelligence

- implement [finance/CLAUDE.md](finance/CLAUDE.md) as CashClaw operating rules
- create finance targets and revenue snapshot tables
- connect Shopify revenue snapshot
- add MRR/ARR tracker to Command OS
- generate daily finance pulse
- extract finance action items from meeting notes
- queue Notion/Linear finance sync for approval

### Phase 10 - daily NotebookLM routines

- create [DAILY_ROUTINES.md](DAILY_ROUTINES.md) workflow as n8n cron
- create source bundle generator
- add local Ollama summarization route
- add ElevenLabs narration connector
- add Google AI Studio server-side connector
- add NotebookLM manual/browser-assisted step
- save artifacts in Command OS memory
- add dashboard tile for latest routine run
- add 10:00 PM closeout workflow
- update Obsidian/LLM-wiki daily notes and business memory pages

---

## 18. First MVP definition

MVP is complete when Tumelo can:

1. open desktop command app
2. speak: "Robusca, brief me on Studex Meat"
3. receive spoken and written summary
4. see pending approvals
5. approve or reject one safe draft
6. see action logged in Rocket.Chat and audit log
7. ask which machines/models are online
8. route a private prompt to a local model
9. record a meeting from the desktop app
10. review the transcript, summary, decisions, and action items
11. approve sync to Notion, Word, Calendar, Linear, and Rocket.Chat
12. ask CashClaw for revenue target status and receive sourced numbers
13. run the 10:00 AM NotebookLM video routine and save its artifact package
14. run the 10:00 PM closeout routine and update Obsidian/LLM-wiki memory

---

## 19. Immediate next implementation tasks

1. Create Command VM inventory file.
2. Add Command Center tab to War Room.
3. Add Device Mesh tab to War Room.
4. Build minimal Command API with `/health`, `/nodes`, `/approvals`, `/command`.
5. Create Rocket.Chat room plan and bot account spec.
6. Fork/harden RileyJarvis voice shell.
7. Define Omi privacy mode before connecting it.
8. Create model alias config for LiteLLM.
9. Create LLM-wiki memory schema for Studex businesses.
10. Create meeting memory schema and recording storage policy.
11. Define Notion, Word, Calendar, and Linear sync contracts.
12. Wire [finance/CLAUDE.md](finance/CLAUDE.md) into the finance/CashClaw module.
13. Implement [DAILY_ROUTINES.md](DAILY_ROUTINES.md) as the first scheduled routine set.
14. Audit all third-party install scripts before running them.

---

## 20. Non-negotiables

- No secrets in repo files.
- No raw API keys in browser/mobile bundles.
- No external message or post without approval.
- No uncontrolled always-listening mode for private spaces.
- No public admin surfaces before authentication and network controls.
- No single shared memory for all businesses; namespace everything.
- No model route should send sensitive documents to an external API unless Tumelo explicitly approves that route.
- No recording or storing private meetings without explicit start/consent policy.
- No external sharing of meeting artifacts without approval.
- No finance write, refund, invoice send, accounting change, or payment action without approval.
- No pasted API key should be considered safe for use until rotated.


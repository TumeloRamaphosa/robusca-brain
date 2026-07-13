# Command OS Module Vetting Notes

Status: preliminary read-only review  
Scope: public repository/docs inspection only; no third-party installers executed

---

## Summary

These tools are useful, but none should be connected directly to production business agents without a controlled integration path. The safe pattern is:

```text
third-party module
-> Robusca Command API
-> policy/approval/audit layer
-> model router or workflow engine
```

---

## HyrveAI

Observed:

- public registration page for deploying/hiring agents
- no API contract reviewed yet

Use:

- optional marketplace or agent deployment channel

Blockers:

- account model, API permissions, billing, data handling, and webhook capabilities are unknown

Decision:

- do not make core dependency yet

---

## gstack

Observed:

- MIT-licensed AI software-factory skill stack for Claude Code and other coding agents
- provides planning, CEO/engineering/design review, QA, security, ship, retro, browser, documentation, and memory workflows
- setup modifies local AI-agent skill directories and can add team-mode repo hooks/configuration
- includes telemetry/checkpoint/browser/cookie-related workflows that require explicit review before use

Use:

- engineering-process layer for building Robusca Command OS
- planning, architecture review, design review, QA, security review, and release discipline
- optional complement to Command OS memory and repo indexing

Risks:

- supply-chain risk from running setup scripts
- can modify local/repo agent config
- browser/cookie workflows are sensitive
- telemetry/checkpoint behavior must be reviewed and configured intentionally

Decision:

- reference and vet first
- do not install or enable team mode without explicit approval
- use in development workspaces only until its behavior is approved

---

## ClickClack

Observed:

- MIT-licensed self-hostable realtime chat for OpenClaw agents and humans
- Go binary with embedded Svelte SPA and SQLite migrations
- supports SQLite/Postgres, WebSocket realtime, channels, threads, DMs, uploads, magic-link auth, GitHub OAuth, bot tokens, CLI, SDK, and webhooks

Use:

- primary internal StudEx agent/human command radio
- channels for strategy, content, devops, meat-store, finance, meeting-memory, daily closeout
- bot accounts for Robusca, Naledi, Auto-Meat, Hermes, CashClaw

Risks:

- bot/session tokens are sensitive
- uploads and artifact previews need strong controls
- public deployment requires auth, TLS, backups, moderation, and retention policy
- bridges can leak internal messages externally

Decision:

- deploy private/Tailscale-first on Command VM
- bridge only approved channels
- store all bot/webhook tokens in vault/env

---

## VAPI

Observed:

- voice assistant/squad platform suitable for phone/web voice calls

Use:

- Robusca voice assistant
- multi-agent morning standup
- meeting participant and voice approvals
- handoff to Naledi, Auto-Meat, Hermes, and CashClaw by topic

Risks:

- API keys and phone number IDs are sensitive
- calls may be recorded/transcribed
- voice assistants can trigger external actions if not policy-gated

Decision:

- integrate server-side only
- route all tools through Command API approval/policy layer
- meeting recording requires explicit consent/policy

---

## Obsidian RAG / ChromaDB / LlamaIndex

Observed:

- proposed local RAG layer over Obsidian vault and robusca-brain markdown

Use:

- per-agent knowledge retrieval
- daily closeout indexing
- meeting-summary retrieval
- source-cited Robusca answers

Risks:

- raw transcripts and private notes may leak into retrieval if indexed indiscriminately
- stale embeddings can return outdated business facts
- file paths can reveal private structure if exposed externally

Decision:

- index approved summaries and business memory by default
- keep raw transcripts out of default index
- log index runs and include source citations

---

## TencentDB-Agent-Memory

Observed:

- existing StudEx OS plan references TencentDB-Agent-Memory as `apps/memory-svc`
- intended API shape includes `/memory/recall`, `/memory/capture`, and `/memory/health`
- described as self-hosted persistent memory with sqlite-vec backend

Use:

- agent conversation continuity
- one-on-one call memory
- War Room meeting memory
- approved turn/summary capture per namespace

Risks:

- raw call transcripts may include private, customer, financial, or family information
- memory can bleed between businesses if namespaces are weak
- long-term memory may preserve stale or incorrect facts

Decision:

- use as conversational memory, not the sole source of truth
- namespace every capture by business, agent, visibility, and source
- default to curated summaries/turns, not raw transcripts
- pair with Obsidian/LLM-wiki and RAG source citations

---

## nashsu/llm_wiki

Observed:

- cross-platform Tauri/React desktop app implementing the Karpathy LLM-wiki pattern
- supports Obsidian-compatible wiki output, source traceability, graph insights, vector search, local HTTP API, MCP server, Chrome web clipper, and agent skills
- includes optional vector search via LanceDB and OpenAI-compatible embedding endpoints

Use:

- architecture/reference for the Command OS superbrain
- possible companion desktop app for knowledge graph, wiki ingest, and source review
- inspiration for source-folder watch, two-step ingest, graph insights, review queues, local API/MCP, and Obsidian compatibility

Risks:

- desktop app has local file access and agent/workspace tooling
- API/MCP endpoints could expose private wiki/source content if bound beyond localhost
- web clipper and web search may bring untrusted content into the knowledge base
- shell/workspace tools must remain approval-gated

Decision:

- evaluate as companion app/reference first
- keep Command API as policy/approval layer
- bind any local API/MCP to localhost or Tailscale with access controls
- do not let it write into StudEx memory without namespace and approval rules

---

## Unresolved memory/RAG tool aliases

Observed:

- user mentioned “lung” and “headroom” as part of the desired tool stack
- no matching repository references were found in the current workspace

Current interpretation:

- “lung” may refer to LangChain, LangGraph, or another memory/RAG orchestration tool
- “headroom” is unknown and needs confirmation before implementation

Decision:

- do not build assumptions around these names yet
- keep them as pending integrations until source links or exact names are provided
- current best RAG recommendation remains Obsidian + LLM-wiki + ChromaDB + SQLite FTS/BM25 + TencentDB-Agent-Memory + LlamaIndex + Ollama

---

## AI Town

Observed:

- MIT-licensed virtual town starter kit where AI characters live, chat, and socialize
- stack includes Convex, PixiJS, optional Clerk auth, optional Replicate, and Ollama/local inference support
- Docker Compose/self-hosted Convex option exists

Use:

- visual agent office/town prototype
- demo surface for agent interactions
- possible executive command display with Robusca, Naledi, Auto-Meat, Hermes, and CashClaw characters

Risks:

- not designed as the core business command bus
- Convex/admin keys and optional provider keys are sensitive
- simulation chat should not ingest real customer/finance/private meeting data until auth/privacy is configured

Decision:

- test locally with dummy agents first
- use as visualization layer only
- keep ClickClack as chat, Command API as policy, and Obsidian/RAG as memory

---

## Crabfleet

Observed:

- MIT-licensed SSH-first Codex/OpenClaw crabbox fleet control plane
- provides GitHub OAuth, repo-gated cards, runtime policy, live terminal/WebVNC, run attempts, session supervision, archives, allowlists, and recurring cards
- current docs explicitly say cards store scheduling intent and policy; they do not launch a fully autonomous executor by themselves

Use:

- supervise agent workspaces across multiple businesses
- per-business repo/task cards
- runtime/capacity visibility
- attach to live sessions
- recurring operational cards

Risks:

- SSH keys, GitHub OAuth, repo permissions, VNC links, runtime tokens, and session logs are sensitive
- public links/control grants require strict expiry and role controls
- does not replace business-specific memory or approvals

Decision:

- useful for multiple StudEx businesses when each business has isolated repos/workspaces/cards
- evaluate first as a fleet visibility/control layer
- keep human approval for merge/deploy/customer-facing actions

---

## Songsee

Observed:

- MIT-licensed Go CLI for audio visualizations
- renders spectrogram, mel, chroma, hpss, selfsim, loudness, tempogram, mfcc, and flux views
- native WAV/MP3 decode; ffmpeg fallback for other formats

Use:

- meeting/audio artifact visualization
- NotebookLM video support visuals
- daily routine media assets
- audio QA thumbnails/previews

Risks:

- audio files may contain private meeting content
- generated images can leak timing/content patterns if shared externally

Decision:

- safe as local CLI after install review
- output stays private unless approved for publishing

---

## UI UX Pro Max

Observed:

- MIT-licensed UI/UX design intelligence skill
- includes design-system generation guidance, style/color/typography data, chart guidance, and accessibility rules
- install command is `npx ui-ux-pro-max-cli init --ai <platform>` and should be treated as executable supply-chain surface

Use:

- Command OS dashboard design standard
- transparent/glass dashboard guidance
- spacing, typography, chart, and accessibility review
- future design-system generation for War Room, desktop, and mobile app

Risks:

- CLI/scripts modify local project files during install/init
- broad design data should be adapted to Studex black/gold brand, not copied blindly
- transparent/glass surfaces can reduce readability if misused

Decision:

- use as reference guidance first
- do not install CLI until reviewed and approved
- Command OS standard lives at `os/command-os/UI_UX_STANDARD.md`

---

## Frontend Design Skill

Observed:

- a `frontend-design` skill was listed in the environment metadata
- the referenced local skill file was not present in this session's plugin cache
- Command OS frontend design rules now live at `os/command-os/FRONTEND_DESIGN_SKILLS.md`

Use:

- professional frontend interface design
- dashboard hierarchy
- responsive app screens
- design QA and accessibility checks
- premium command-glass UI execution

Risks:

- if restored from a plugin/source, the skill must be reviewed before installation or execution
- design guidance must be adapted to StudEx brand standards

Decision:

- treat `FRONTEND_DESIGN_SKILLS.md` as the active local design contract
- restore/install external design skills only after supply-chain review and approval

---

## Omi

Observed:

- open-source wearable/mobile/desktop capture system
- captures screen and conversations
- default desktop quick start says it connects to Omi cloud backend
- full backend stack exists but requires separate setup

Use:

- voice/capture connector
- meeting memory
- action-item extraction
- wearable command input

Risks:

- sensitive audio/screen data
- cloud backend by default
- requires strict privacy mode before business use

Decision:

- use only after self-hosting or after an explicit privacy/data-flow decision
- connect through Command API, not directly to business agents

---

## Claude SEO

Observed:

- MIT-licensed Claude Code SEO skill/plugin
- many specialist agents and skills
- supports SEO APIs and optional external data providers
- docs recommend clone-and-review rather than remote pipe execution

Use:

- SEO specialist subsystem for Studex websites and client sites

Risks:

- installer modifies local Claude/plugin config
- optional providers require credentials
- audits may fetch and process external sites

Decision:

- suitable as optional specialist layer after install script review
- store credentials outside repo

---

## SEO Office / seo-os

Observed:

- local-first SEO operating shell
- Next.js/React Three Fiber UI
- orchestrator + specialist + local brain pattern
- AGPL-3.0 license

Use:

- architecture reference for Robusca Command OS UI, task feed, windows, and brain model
- optional local SEO worker

Risks:

- AGPL network-use obligations if we modify and serve derivative code
- installer pulls a heavier Node/Python toolchain

Decision:

- use patterns freely; do not vendor modified production code without license review

---

## Karpathy LLM-wiki gist

Observed:

- concept document, not executable software
- proposes raw sources, synthesized wiki, schema, index, and log

Use:

- memory architecture for business knowledge

Risks:

- generated wiki can drift or hallucinate without evidence discipline

Decision:

- use with provenance, review gates, contradiction logs, and immutable raw sources

---

## Page-Agent

Observed:

- MIT-licensed in-page browser GUI agent
- controls web apps through DOM/action tools
- supports OpenAI-compatible models
- docs warn production should use backend proxy rather than exposing keys client-side

Use:

- browser hands for internal dashboards, n8n, Rocket.Chat, SaaS forms

Risks:

- can click/submit in authenticated sessions
- browser-side keys are unsafe
- broad Chrome extension permissions if extension is used

Decision:

- use only with allowlists, approval gates, and Command API model proxy

---

## RileyJarvis

Observed:

- Electron desktop voice companion
- OpenAI Realtime voice
- optional Exa search
- optional macOS Accessibility and Screen Recording computer control

Use:

- voice prototype for Robusca/Jarvis desktop command

Risks:

- computer-control permissions are powerful
- OpenAI Realtime dependency
- app identity and prompts are not Studex-specific

Decision:

- fork, rebrand, and harden before connecting to business systems
- microphone can be tested first; withhold Accessibility/Screen Recording until approval gates exist

---

## Notion

Observed:

- Notion MCP server is present but currently requires authentication in this environment

Use:

- meeting pages
- business knowledge base
- task database sync
- project pages and dashboards

Risks:

- meeting notes may contain private, customer, financial, or strategic data
- external sharing settings can expose sensitive pages

Decision:

- use MCP after authentication
- sync only approved summaries/pages by default
- store source recording links with access controls, not public URLs

---

## Linear

Observed:

- Linear MCP server is present but currently requires authentication in this environment

Use:

- create issues from approved meeting action items
- link implementation work to meeting source records
- keep project status visible inside Command OS

Risks:

- meeting notes can create noisy or sensitive issues if auto-synced without review
- wrong workspace/team/project routing can fragment execution

Decision:

- use MCP after authentication
- require review before creating issues from meetings unless internal/low-risk policy is configured
- every Linear issue created from a meeting should backlink to the Command OS meeting ID

---

## Microsoft 365 / Word / Calendar

Observed:

- no Microsoft MCP server is currently available in this environment
- integration likely requires Microsoft Graph OAuth for Word/OneDrive/SharePoint/Outlook Calendar

Use:

- polished Word meeting minutes
- OneDrive/SharePoint storage
- Outlook Calendar event linking and follow-up creation

Risks:

- OAuth scope overreach
- external sharing links
- raw transcripts or private recordings accidentally saved into broadly shared folders

Decision:

- integrate through a server-side Microsoft Graph connector
- use least-privilege scopes
- require approval before external sharing or attendee-facing follow-up events

---

## CashClaw finance/CLAUDE.md

Observed:

- internal finance agent context already exists under `studex-empire/agents/cashclaw-context.md`
- Command OS finance agent instructions now live at `os/command-os/finance/CLAUDE.md`

Use:

- revenue target tracking
- margin analysis
- finance reports
- campaign ROI
- meeting finance action extraction
- Notion/Linear finance sync drafts

Risks:

- payments, accounting records, invoices, refunds, customer PII, and financial reporting are high-risk surfaces
- inaccurate model-generated numbers can mislead decisions

Decision:

- finance agent is read/report/analyze by default
- require approval for writes, external sharing, invoices, refunds, price changes, accounting updates, or task creation from sensitive finance notes
- every important number needs a source

---

## Google Calendar

Observed:

- no Google Calendar MCP server is currently available in this environment

Use:

- meeting schedule, attendee metadata, agendas, reminders, follow-up events

Risks:

- calendar metadata can expose sensitive relationships and business activity
- external guests make follow-up automation higher risk

Decision:

- implement through server-side connector or n8n workflow
- approval required for external attendee changes

---

## NotebookLM

Observed:

- NotebookLM is a Google web product that may require interactive Google sign-in, account selection, and CAPTCHA
- no supported NotebookLM API has been confirmed in this environment

Use:

- daily knowledge/video/audio artifact surface
- source-grounded business notebook generation
- human-in-the-loop source review

Risks:

- Google account automation can be brittle and sensitive
- NotebookLM sources may include private meeting or business material
- browser automation may inherit personal Google sessions if not isolated

Decision:

- use manual export/import or a dedicated Google profile first
- do not automate login or CAPTCHA bypass
- require approval before sending sensitive meeting/business sources into NotebookLM

---

## ElevenLabs

Observed:

- intended role is narration generation for daily NotebookLM/video routines and voice storytelling

Use:

- polished narration
- branded voice output
- video/audio asset production

Risks:

- API keys are sensitive
- voice cloning/persona use can be reputationally sensitive
- generated voice can be mistaken as human speech if not governed

Decision:

- store `ELEVENLABS_API_KEY` only in vault/env
- require explicit voice/persona selection
- require approval before externally publishing generated voice assets

---

## Ollama

Observed:

- local model runtime; normally no cloud API key required

Use:

- local/private summarization
- script drafting
- sensitive meeting processing fallback
- offline model route for Command OS

Risks:

- local endpoint exposure if bound to non-local interfaces
- model quality varies by checkpoint

Decision:

- prefer localhost or Tailscale-only access
- register Ollama nodes through the Command OS device registry
- use local route by default for sensitive daily-routine sources

---

## Google AI Studio / Gemini API

Observed:

- intended role is high-quality drafting, multimodal reasoning, and optional daily-routine model route

Use:

- approved API model route
- script improvement
- multimodal analysis where needed

Risks:

- API keys are sensitive
- external API route may process private business/meeting data
- browser/mobile clients must not contain the key

Decision:

- rotate any key pasted into chat before use
- store `GOOGLE_AI_STUDIO_API_KEY` only in vault/env
- route through server-side LiteLLM/Command API
- require policy approval for sensitive data


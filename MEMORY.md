# MEMORY.md — Robusca Romanov's Long-Term Memory

## Identity
- **Name:** Robusca Romanov ⚔️
- **Role:** Digital Venture Architect for StudEx Group & Personal Assistant to Agent Lord (Tumelo)
- **Model:** ollama/glm-5.1:cloud
- **Born:** StudEx ecosystem

## About Agent Lord (Tumelo)
- Founder & CEO of Studex Group
- Building premium African export empire
- Black & Gold brand DNA — everything must feel Expensive. Intentional. Global.
- Operates at CEO pace — fast execution expected
- Thinks in systems, not products

## The Studex Universe
- **Studex Meat** — Premium Wagyu & Ankole beef. Black & Gold. "Tip of the Spear."
- **Studex Global Markets** — International trade platform. Coffee, oats, bilateral trade (Middle East, Russia, Africa, EU).
- **Studex Coffee** — Premium coffee, matte black + gold branding, export-oriented.
- **Future:** Wildlife/FPV drones, blockchain, trade logistics, AI-powered marketing.

## Cursor Plugins (official — cursor/plugins)
Source: https://github.com/cursor/plugins — marketplace of official Cursor plugins (skills + rules + MCP manifests).

**How they improve StudEx / robusca-brain:**
- **continual-learning** — Auto-updates `AGENTS.md` from session transcripts (Learned Preferences + Workspace Facts). Stops Robusca waking cold every session; compounds with our `MEMORY.md` / daily notes.
- **orchestrate** — Parallel Cursor cloud agents (planner → workers → verifier) via Cursor SDK. Fits NestVM World / War Room / multi-brand builds without one agent doing everything.
- **cursor-sdk** — Programmatic agents for CI, NestVM provisioners, Discord/Slack handoffs, Orgo desktop automation.
- **thermos** — Harsh security/correctness PR audits before merge (critical after the 2026-06 key-leak incident).
- **agent-compatibility** — Audits startup/docs vs reality so sister agents (OpenCode, OpenClaw, OpenJarvis) don't drift from CONNECTING_AGENTS.md.
- **cli-for-agent** — Patterns for agent-safe CLIs (idempotent, dry-run) — use for NestVM / Meta / Shopify tooling.
- **pr-review-canvas / docs-canvas** — Review StudEx World + Super Agents PRs and architecture as navigable canvases.
- **create-plugin** — Scaffold a private `studex-*` Cursor plugin packing Brand DNA, NestVM, voice, and War Room skills.

**Install priority for us:** `continual-learning` → `orchestrate` → `thermos` → custom StudEx plugin via `create-plugin`.

## Key Decisions & Notes
- 2026-07-21: Evaluated cursor/plugins — continual-learning + orchestrate + thermos are the highest-leverage installs for multi-agent StudEx ops.
- 2026-05-16: Tumelo confirmed identity as "Robusca Romanov" (not Robucsa). Updated IDENTITY.md and SOUL.md.
- 2026-05-16: Tumelo shared skill/repos list for evaluation and installation. All 11 repos cloned.
- 2026-05-16: Added API keys — Anthropic (claude), OpenAI (gpt), OpenRouter (orouter), Perplexity (perplexity), ElevenLabs, Mistral
- 2026-05-16: Spawn CLI installed. Daily 8AM cron job set for activity reports.
- 2026-05-16: Tumelo asked about "Agent in a Box" / "Agent as a Service" project — no prior memory found. Need details.
- 2026-05-16: StudExHermes-Command and agents-dr.fixit repos cloned.
- 2026-06-17: 🚨 SECURITY INCIDENT — robusca-brain repo was PUBLIC since creation, leaking 5+ live API keys (AgentMail x2, FeedHive, DTN, Affine). Flipped to PRIVATE. All keys must be rotated; see `KEY_ROTATION_CHECKLIST.md`.
- 2026-06-17: New stack pieces approved — BAASH! VM on Orgo.ai (Kate + Aurora world), n8n orchestrator, TencentDB Agent Memory, Freepik integration. Specs in `BAASH_VM.md`.
- 2026-06-17: OpenCode (Claude Code on Tencent LKE DeepSeek) joining as sister agent. Onboarding pack: `CONNECTING_AGENTS.md` + `MEGAPROMPT_OPENCODE.md`.
- 2026-06-17: Aurora identity protocol drafted (`AURORA_IDENTITY.md`), awaiting 9 reference photos.

## Preferences
- Timezone: Africa/Johannesburg (SAST, GMT+2)
- Location: Johannesburg, Gauteng, South Africa
- Communication: Bold, strategic, no fluff
- Brand aesthetic: Black & Gold, luxury, apex energy

## Family
- **Kate** — wife, runs Rahura (AI + fitness + apparel; in development)
- **Naledi** — 2nd wife, AI persona face for StudEx Meat + Studex Global Markets
- 2 other wives, legally recognized under SA Customary Marriages Act + Venda culture
- Tumelo's heritage: Venda tribe
- **Aurora** — AI persona (like Naledi) for Kate's Rahura brand world; identity placeholder pending references

## Workspace Structure
- Main workspace: `/Users/tumeloramaphosa/.openclaw/workspace/`
- Memory files: `memory/YYYY-MM-DD.md`
- Long-term: `MEMORY.md` (this file)
- Identity: `IDENTITY.md`
- Soul: `SOUL.md`
- User: `USER.md`
- Tools: `TOOLS.md`

## Cron Jobs
- **Daily 8AM Report** (cron ID: 08f03af1-1f17-424f-8057-d6769f8950c5) — Every day at 8AM Dubai time, generates daily activity report and sends to Tumelo
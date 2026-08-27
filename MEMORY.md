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

## Key Decisions & Notes
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
- 2026-08-26 (build): **`studex-os/` control plane scaffolded and typechecking clean.** Schema (tenants/keys/routines/runs/ledger/support_grants), portable sandbox adapter + Daytona impl, OpenClaw Gateway adapter, zod-validated routine catalogue, provisioning with schema-per-tenant Ghost, scrypt workspace keys, append-only ledger, CLI. 10 routine YAML specs. Ledger deliberately has no update/delete path — enforce at the DB grant too.
- 2026-08-26 (build): **Two findings from running `routines budget`** that docs would never have surfaced: Company Builder's routines consume **51%** of its 10,000-credit allowance before the client asks for anything (~4,900 left for ad-hoc), and **Business runs the identical routine set to Company Builder at double the price** — a weak upgrade story that needs differentiated routines. Lesson: build the estimator before setting the allowance.
- 2026-08-26 (build): **Design language set — "the interface is a document, not a dashboard."** Five rules: remove don't style; gold once per view as signal never surface; all checkable data in monospace; hairlines not boxes; left-aligned always. Forms: label above input, bottom rule only, help always visible, one column. Anti-list: no cards-with-shadows, no status pills, no icons beside labels, no purple/blue gradients (the 2023 AI look we're positioned against), no emoji. Tokens + working preview in `studex-os/design/`.
- 2026-08-26 (build): **Marketing agent prompts written** (`studex/marketing/AGENT-PROMPTS.md`) — team lead + Researcher/Scriptwriter/Proof/Producer/Distribution/Analyst + the Audit campaign brief. Baked-in constraints: never publish without approval, every claim graded T1/T2/T3, **never say "agentic"**, forbidden-claims list, and the measured format rules. The Proof agent can REJECT — it's the last line before we overclaim under a banner saying we don't.

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
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
- 2026-08-26 (eve): **Deployment architecture set on Daytona** (`studex/deploy/`). Corrects my earlier design: use an **ephemeral sandbox per task + persistent volume per tenant**, not a persistent per-tenant runtime. Sub-90ms creation + per-second billing + 15min auto-pause takes per-tenant compute from ~R1,955/mo to ~**R184/mo**. Two planes: always-on control plane (registry, keys, memory, ledger, channel) on **Fly.io**; bursty execution on **Daytona**. Memory stays in the control plane, never in the sandbox. **Daytona Secrets** (plaintext held outside sandbox, substituted at egress) satisfies the credential vault requirement outright.
- 2026-08-26 (eve): **OpenClaw is the scheduler — don't build one.** Author routines on OpenClaw desktop, run **one Gateway per tenant on Fly.io** (~R80–240/mo each). Reason beyond uptime: **automation mutations require `operator.admin`**, so a shared Gateway can't let a client manage their own routines without admin over everyone's — a per-tenant Gateway scopes it cleanly. Use `session:<id>` (persistent named session) for daily routines that build on yesterday, `isolated` for reports. Routines live as versioned YAML in `studex/routines/`, synced per tier. Set `suppress_if_empty` on watch routines.
- 2026-08-26 (eve): 🚩 **No African Daytona region** (India, Frankfurt, London, US East/West). This **corrects the Rwanda data-residency advice** — "data stays in Rwanda" is not achievable on Daytona Cloud. Defensible version: keep the Ghost + ledger in a residency-appropriate control plane, use Daytona only for ephemeral execution that stores nothing. Also: **AGPL 3.0** bites only if we self-host *modified* Daytona over a network (calling their API from our app is clean), and their OSS repo may be frozen — prefer the managed cloud. **Apply to the Daytona startup programme: up to $50k credits.**
- 2026-08-26 (eve): 🚩 **Timezone contradiction in our own files** — `USER.md` says Asia/Dubai (GMT+4); `MEMORY.md` and `STUDEX_OS.md` say Africa/Johannesburg (GMT+2). OpenClaw defaults to UTC without `--tz`, so every scheduled routine inherits the error. **Tumelo needs to settle this before any routine goes live.**
- 2026-08-26 (eve): Revised per-tenant economics: infra R715–1,775 + human R1,850 → contribution R1,375–2,435 on R5,000 = **28–49% margin**. Gate to client two is **one routine running a week untouched**, not a successful demo.

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
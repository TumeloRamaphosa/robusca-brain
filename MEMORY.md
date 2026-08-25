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
- 2026-08-25: **Runable evaluated** (`studex/delivery-model/`). Verdict: buy 1–2 Pro seats as an internal delivery tool, never build the product on it. No tenancy at all (FAQ: "There are no team or organization accounts"), no public API, ToS §11 bars selling any part of the Services, §8 offers only an affiliate programme, credits non-transferable. Killer detail: RunClaw ownership transfers to whoever connects their account last, so any client can pay $25 and silently displace us as owner of their own group.
- 2026-08-25: **Delivery model set.** We issue the client key, not the vendor — whoever issues the key owns the customer. A client "group" = one tenant = channel + memory + vault + runtime + ledger; share any of the five and the private-infrastructure claim is false. Supervisor agents write tasks *down* into a tenant queue and receive reports *up*, never reading tenant memory without a logged, time-boxed grant. Runtime is self-hosted OpenHands (MIT, Agent Server REST API) — one deployment per client at pilot scale, since Agent Canvas is explicitly single-tenant/unauthenticated.
- 2026-08-25: **R5,000/month validated as a productised service, not SaaS.** ~44% gross margin, break-even ~21 clients; 3 clients is a funded pilot at ~R42k/month negative whose real output is receipts. R5,000 *replaces* the R3,500 Starter → ladder is Ghost R950 / Company Builder R5,000 / Business R10,000 / Enterprise R20,000. Founder call must become a weekly cohort call before ~100 clients. Video must be a metered add-on (Runable Unlimited alone is 64% of a R5,000 sub). Don't promise "marketplace access" until there's density — sell hand-made introductions.
- 2026-08-25: 🚩 WhatsApp WABA `105198275846951` still disconnected and now on the critical path — most SA SME clients live in WhatsApp. Also: the Studex Rise tier ("100–1,000 startups per country") cannot afford R5,000; that tier needs the R950 Ghost.

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
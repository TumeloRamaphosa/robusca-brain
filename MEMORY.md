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
- 2026-09-04: **The anniversary is the strategy.** Luxury positioning and the anti-agent-washing wedge converge on **provenance** — ten years old in a category whose median vendor is ~16 months (Runable Apr 2025, Grok Bot Aug 2026, Gartner counts ~130 real vendors). Same fact, both jobs. Headline: *"A decade in the market. Not a moment in the hype cycle."* Site built at `studex-site/`.
- 2026-09-04: **Six mechanics of a high-end service**, ranked: selection not sale (the founder call becomes an interview both ways — highest leverage, costs nothing); scarcity that's actually true (12/country/year, defensible because delivery is genuinely capacity-constrained); price as signal (publish Ghost + Standard, "by enquiry" above, **never a comparison table** — on a feature grid we lose); provenance stated once and never explained; restraint as confidence; the client as hero.
- 2026-09-04: **Tom Ford = reduction, not ornament** — the same grammar as the product's "interface is a document, not a dashboard." Two registers, one discipline. What's incompatible is luxury-as-ornament: gold gradients, marble, filigree, Renaissance pastiche.
- 2026-09-04: 🚩 **The Michelangelo/Gucci composite can't be the brand.** It's built on another house's registered trademark (says "we borrow status"), Renaissance pastiche is the dominant cliché of the hype cycle we're distancing from, and the metaphor is grandiose in the month grandiosity stopped working. **Better and already ours: the Ankole bull in the mark** — a real African symbol of wealth and lineage, and Studex Meat trades in Ankole. Our own mythology. Photographic direction briefed in `studex-site/POSITIONING-LUXURY.md`.
- 2026-09-04: ⚙️ **Process lesson.** An 8-day gap reset the workspace *and* returned the shell on the wrong branch — a commit landed on the viral-launch branch carrying only markdown, because the HTML and assets were created pre-gap and never committed. **Commit generated assets in the same turn they're created, and check `git branch --show-current` when resuming after a gap.**

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
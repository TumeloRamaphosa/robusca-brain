# Puppetier — StudEx Agentic Workspace

Black & Gold agent OS: **Open WebUI** workspace + **StudEx agents** + **Hermes Voice** (RileyJarvis fork).

## Quick start (Mac)

```bash
cd puppetier
cp .env.example .env   # add OPENAI_API_KEY, ANTHROPIC_API_KEY
chmod +x start.sh && ./start.sh
```

| Service | URL |
|---------|-----|
| Landing | http://localhost:3090 |
| Open WebUI | http://localhost:3080 |
| MCP Gateway | http://localhost:8787 |
| Voice Bridge | ws://localhost:8765 |

## Hermes Voice (Riley Voices)

Fork of [RileyJarvis](https://github.com/rbrown101010/rileyjarvis) with Hermes bridge.

```bash
cd studex-voice
cp .env.example .env.local
# OPENAI_API_KEY required
# OPENAI_VOICE=cedar  (or alloy, echo, marin, ash)
# HERMES_WS_URL=ws://127.0.0.1:8765
npm install
npm run dev
```

**Voice tools:** `hermes_query`, `hermes_delegate`, `hermes_status`, `hermes_approve`

Speak: *"Hermes, what's the agent status?"* or *"Delegate to OpenClaw — draft Youth Day post"*

## Open WebUI setup

1. Start stack: `./start.sh`
2. Open http://localhost:3080 — create admin account
3. **Admin → Settings → Connections** — add OpenAI, Anthropic, OpenRouter keys
4. **Admin → External Tools** — add MCP: `http://localhost:8787/mcp`
5. **Workspace → Models** — import presets from `open-webui/presets/studex-agents.json`

## Agents

| Preset | Role | Default model |
|--------|------|---------------|
| Hermes CEO | Orchestrator | Claude Sonnet |
| OpenClaw CMO | Marketing | Claude Sonnet |
| Goose Dev | Development | GPT-4.1 |
| Treasury CFO | Finance | GPT-4.1 Mini |
| Naledi Brain | Knowledge | Claude Sonnet |

Live agents connect on ports 3000–3004 (studex-empire). Gateway simulates when offline.

## Superpowers auto-mode

```bash
/goal Build Puppetier production deploy on Fly.io
```

Uses `.agents/skills/subagent-driven-development` — see `docs/AGENT_SKILLS_SETUP.md`.

## Structure

```
puppetier/
├── docker-compose.yml
├── mcp-gateway/          # StudEx agent tools for Open WebUI
├── voice-bridge/         # WebSocket for Hermes Voice
├── studex-voice/         # RileyJarvis fork + Hermes tools
├── open-webui/           # Theme + agent presets
├── landing/              # Marketing page
└── start.sh
```

## License

StudEx internal. RileyJarvis components: MIT.

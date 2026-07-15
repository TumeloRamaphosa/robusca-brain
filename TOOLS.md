# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## API Keys Configured (2026-05-16)

| Provider | ID | Models | Notes |
|----------|-----|--------|-------|
| Ollama | `ollama` | Qwen3 (local Mac Mini) + glm-5.1:cloud | Local primary for ClawX / RileyJarvis |
| MiMo | `mimo` | mimo-v2.5-pro, mimo-v2.5 | Xiaomi cloud — [console](https://platform.xiaomimimo.com/console/api-keys). Key via vault / ClawX local only. Spec: [CLAWX_MODELS.md](CLAWX_MODELS.md) |
| Anthropic | `claude` | Claude Sonnet 4, Claude Opus 4 | Multimodal (text+image) |
| OpenAI | `gpt` | GPT-4.1, GPT-4.1 Mini, o3 | Multimodal |
| OpenRouter | `orouter` | Claude/GPT via router | Aggregator, 100+ models |
| Perplexity | `perplexity` | Sonar Pro | Search-augmented |

### Other Keys
- **ElevenLabs**: `[REDACTED — stored in local env]` (TTS)
- **OpenRouter**: `[REDACTED — stored in local env]`
- **Perplexity**: `[REDACTED — stored in local env]`
- **Mistral**: `[REDACTED — stored in local env]`
- **Xiaomi MiMo**: `[REDACTED — vault / ClawX local only]` — never commit. Rotate if pasted in chat.
- **Composio**: `[REDACTED — vault only]`
### Spawn CLI
- Installed at `/Users/tumeloramaphosa/.local/bin/spawn`
- Version: v1.0.44
- Launch AI coding agents on any cloud

## Skills Installed

All cloned to `/Users/tumeloramaphosa/.openclaw/workspace/skills/`:
- 1code, skills (remotion), ui-ux-pro-max-skill, superpowers, graphify, gstack, claude-goal, OpenMythos, openclaw-supermemory, StudExHermes-Command, agents-dr.fixit

## StudEx Projects
- **StudExHermes-Command** — Cyberpunk 9-agent swarm dashboard with Kanban, memory log, social metrics, RALF loop. Next.js app.
- **agents-dr.fixit** — MacMini Gang Dr.Fixit Edition. Automated health monitoring & auto-recovery for AI agents. MLX-native Hermes 3 server + launchd services.

## Cron Jobs
- **Daily 8AM Report** (cron ID: 08f03af1-1f17-424f-8057-d6769f8950c5) — Every day at 8AM Dubai time, generates daily activity report and sends to Tumelo

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.

## Composio (action layer)

Natural-language tools — no per-request OAuth. Spec: [COMPOSIO_MESH.md](COMPOSIO_MESH.md)

| App | Example intent |
|---|---|
| GitHub | Create issue on `dark-factory` |
| Notion | Add to CRM |
| Slack | Message `#sales` |
| Stripe | Create invoice |
| Google Sheets | Update sheet |

**Local install (this cloud box):** `composio` (Python 0.17.1), `@composio/core` (Node 0.13.1)  
**VM `robot@45.61.56.91`:** pending SSH auth

## Channel mesh (Cipher Tr@ce)

```
RileyJarvis → Ollama (Qwen3) → robusca-brain → N8N → Notion
```

| Channel | Surface |
|---|---|
| WhatsApp | RileyJarvis (Mac Mini, QR once) |
| Discord | `@ibbybuilds/discli` + Discord.js |
| Telegram | Bot API |
| Voice in/out | Whisper → Kokoro-FastAPI / Voicebox |
| Text | Cipher Tr@ce |

**Tonight install:** [MAC_MINI_TONIGHT.md](MAC_MINI_TONIGHT.md)

## Related

- [Agent workspace](/concepts/agent-workspace)
- [COMPOSIO_MESH.md](COMPOSIO_MESH.md)
- [CLAWX_MODELS.md](CLAWX_MODELS.md)
- [SETUP_STATUS.md](SETUP_STATUS.md) — finish checklist
- [VOICE_ASSISTANT_OS.md](VOICE_ASSISTANT_OS.md) — MiniMax speak + Ollama + Notion/Linear
- [OBSIDIAN_AGENTS.md](OBSIDIAN_AGENTS.md) — chat with agents on this vault
- [MOBILE_AGENTS.md](MOBILE_AGENTS.md) — phone-first (WhatsApp / Telegram / Android)

<!-- clawx:begin -->
## ClawX Tool Notes

### uv (Python)

- `uv` is bundled with ClawX and on PATH. Do NOT use bare `python` or `pip`.
- Run scripts: `uv run python <script>` | Install packages: `uv pip install <package>`

### Voice (Kokoro TTS + Whisper STT)

Full Mac Mini playbook: **[CLAWX_VOICE_MAC_MINI.md](CLAWX_VOICE_MAC_MINI.md)**

```bash
# Kokoro — use FastAPI :8880 (remsky/Kokoro-ONNX + :5002 do NOT exist)
docker run -d --name kokoro -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-cpu:latest
uv pip install openai-whisper   # + brew install ffmpeg
```

Then in ClawX: **Settings → Voice → Kokoro (TTS)** + **Whisper (STT)**.  
Base URL if prompted: `http://localhost:8880/v1`.

### Browser

- `browser` tool provides full automation (scraping, form filling, testing) via an isolated managed browser.
- Flow: `action="start"` → `action="snapshot"` (see page + get element refs like `e12`) → `action="act"` (click/type using refs).
- Open new tabs: `action="open"` with `targetUrl`.
- To just open a URL for the user to view, use `shell:openExternal` instead.
<!-- clawx:end -->

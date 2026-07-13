# Composio Mesh — Cipher Tr@ce Channel Architecture

**Owner:** Tumelo Ramaphosa  
**Text surface:** Cipher Tr@ce  
**Voice/WhatsApp surface:** RileyJarvis (Mac Mini)  
**Last updated:** 2026-07-13

---

## Why Composio

Composio is the **action layer** — natural-language tool use with no manual OAuth choreography per request.

| Intent | Tool |
|---|---|
| Create a GitHub issue on `dark-factory` | GitHub via Composio |
| Add this to Notion CRM | Notion via Composio |
| Send a Slack message to `#sales` | Slack via Composio |
| Create a Stripe invoice | Stripe via Composio |
| Update a Google Sheet | Google Sheets via Composio |

All through AI. Auth is connected once; agents invoke tools thereafter.

---

## You ↔ Agent channels

```
YOU ──────────────────────────────────────────────────────
  │
  ├─ WhatsApp ──────── RileyJarvis ──────── Voice AI agent
  │  (scan QR once)   Lives on your Mac Mini
  │
  ├─ Discord ───────── discli ───────────── Terminal messages
  │                   + Discord.js bot
  │
  ├─ Telegram ──────── Bot API ──────────── Agent notifications
  │                   + Direct messages to you
  │
  ├─ Voice notes ──── Whisper STT ──────── transcribed → me
  │
  ├─ My voice replies ─ Kokoro/Voicebox ─── audio → you
  │
  └─ Text ──────────── me (Cipher Tr@ce) ── always here
```

| Channel | Runtime | Role |
|---|---|---|
| WhatsApp | RileyJarvis on Mac Mini | Voice AI agent; QR scan once |
| Discord | `discli` + Discord.js bot | Terminal + bot messages |
| Telegram | Bot API | Notifications + DMs to Tumelo |
| Voice in | Whisper STT | Notes → text → agent |
| Voice out | Kokoro / Voicebox | Agent audio replies |
| Text | Cipher Tr@ce | Always-on typed interface |

---

## Canonical data / control flow

```
RileyJarvis → Ollama (Qwen3) → robusca-brain → N8N → Notion
```

| Hop | Component | Job |
|---|---|---|
| 1 | **RileyJarvis** | Ingest WhatsApp / voice; route intents |
| 2 | **Ollama (Qwen3)** | Local inference on Mac Mini |
| 3 | **robusca-brain** | Memory, specs, agent OS (this repo) |
| 4 | **N8N** | Workflow orchestration |
| 5 | **Notion** | CRM / durable records |
| Side | **Composio** | Cross-app actions (GitHub, Slack, Stripe, Sheets, Notion) |

Composio sits beside the flow as the **tool executor** when the agent needs to mutate external systems. N8N remains the long-running orchestrator; Composio is the short-path “do this now” toolkit.

---

## Install status (2026-07-13)

| Target | Status |
|---|---|
| Cloud agent box (this env) | Python `composio 0.17.1` + Node `@composio/core@0.13.1` installed |
| VM `robot@45.61.56.91` | **Blocked** — SSH needs authorized key (see `memory/2026-07-13.md`) |

### Target packages (prefer modern)

```bash
# Node (preferred)
npm install -g @composio/core

# Legacy (deprecated — avoid on new hosts)
npm install -g composio-core

# Python
pip install composio
```

---

## Mac Mini tonight (install order)

Full corrected playbook: **[MAC_MINI_TONIGHT.md](MAC_MINI_TONIGHT.md)**  
ClawX voice (Kokoro+Whisper): **[CLAWX_VOICE_MAC_MINI.md](CLAWX_VOICE_MAC_MINI.md)**  
One-shot installer: **`bash scripts/mac-mini-tonight.sh --start-kokoro`**  
Smoke check: **`python3 scripts/composio-smoke.py`**  
VM SSH unblock: **[deployment/CLOUD_AGENT_SSH_PUBKEY.md](deployment/CLOUD_AGENT_SSH_PUBKEY.md)**

1. RileyJarvis — `git clone https://github.com/rbrown101010/rileyjarvis.git && npm install`
2. Kokoro TTS — use **Kokoro-FastAPI** (`remsky/Kokoro-FastAPI`, port **8880**). `remsky/Kokoro-ONNX` + `:5002` 404s.
3. Whisper — `uv pip install openai-whisper` (+ `ffmpeg`)
4. ClawX → **Settings → Voice** → Kokoro (TTS) + Whisper (STT); URL `http://localhost:8880/v1` if asked
5. Discord CLI — `npm i -g @ibbybuilds/discli` then `discli init --token …`
6. `cd rileyjarvis && npm run dev` → scan WhatsApp QR

## Wiring checklist (Tumelo)

1. [ ] Run [MAC_MINI_TONIGHT.md](MAC_MINI_TONIGHT.md) on the Mac Mini
2. [ ] Authorize cloud-agent SSH pubkey on `robot@45.61.56.91` (or vault the VM key)
3. [ ] Install Composio on the VM
4. [ ] Connect Composio apps once: GitHub (`dark-factory`), Notion CRM, Slack `#sales`, Stripe, Google Sheets
5. [ ] Confirm RileyJarvis → Ollama (Qwen3) path on Mac Mini
6. [ ] Confirm N8N → Notion handoff matches this flow
7. [ ] Map Cipher Tr@ce text channel + Discord/Telegram/voice to the same intent router

---

## Sent.dm

Unified SMS/WhatsApp/RCS messaging — see **[SENT_COMPOSIO.md](SENT_COMPOSIO.md)**. Demo: https://github.com/sonnysangha/sent-dm-demo

---

*Cipher Tr@ce · Robusca · StudEx*

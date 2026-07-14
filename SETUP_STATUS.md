# Setup Status — Cipher Tr@ce / ClawX Mesh

**Repo:** https://github.com/TumeloRamaphosa/robusca-brain  
**Branch:** `cursor/composio-vm-install-1bc1`  
**Updated:** 2026-07-14  
**Verdict:** Docs + local installs **done**. Live wiring needs Tumelo (keys + Mac Mini + SSH).

---

## Done (in this repo / cloud agent)

| Item | Where |
|---|---|
| Composio mesh architecture | [COMPOSIO_MESH.md](COMPOSIO_MESH.md) |
| Mac Mini tonight installer | [MAC_MINI_TONIGHT.md](MAC_MINI_TONIGHT.md) + [scripts/mac-mini-tonight.sh](scripts/mac-mini-tonight.sh) |
| ClawX voice (Kokoro + Whisper) | [CLAWX_VOICE_MAC_MINI.md](CLAWX_VOICE_MAC_MINI.md) |
| ClawX models (MiMo + Ollama) | [CLAWX_MODELS.md](CLAWX_MODELS.md) |
| Sent.dm + Composio scaffold | [SENT_COMPOSIO.md](SENT_COMPOSIO.md) |
| Sister-agent onboarding | [CONNECTING_AGENTS.md](CONNECTING_AGENTS.md) |
| Env placeholders (no secrets) | [.env.example](.env.example) |
| VM install ready script | [scripts/vm-composio-install.sh](scripts/vm-composio-install.sh) |
| Composio smoke check | [scripts/composio-smoke.py](scripts/composio-smoke.py) |
| Cloud-agent SSH pubkey | [deployment/CLOUD_AGENT_SSH_PUBKEY.md](deployment/CLOUD_AGENT_SSH_PUBKEY.md) |
| Key rotation list | [KEY_ROTATION_CHECKLIST.md](KEY_ROTATION_CHECKLIST.md) (#8 Composio, #9 MiMo) |
| Local packages on cloud box | `@composio/core`, Python `composio`, Whisper, `discli`, RileyJarvis clone |

**Corrections baked in (don’t use the broken pastes):**

- `remsky/Kokoro-ONNX` + `:5002` → **Kokoro-FastAPI `:8880`**
- bare `discli` npm → **`@ibbybuilds/discli`**
- Never commit / chat API keys

---

## Tumelo-only (blocks “fully live”)

### 1. Rotate burned keys (do first)

| # | Service | Action |
|---|---|---|
| 8 | Composio | Revoke chat key → new key → **“vault the new Composio key”** |
| 9 | Xiaomi MiMo | Revoke chat key → new key → **“vault the new MiMo key”** (or ClawX local only) |

Console: [Composio](https://app.composio.dev) · [MiMo](https://platform.xiaomimimo.com/console/api-keys)

### 2. Mac Mini — ClawX + voice + local LLM

```bash
# After ClawX finishes downloading:
bash scripts/mac-mini-tonight.sh --start-kokoro   # or follow CLAWX_VOICE_MAC_MINI.md
brew install ffmpeg && uv pip install openai-whisper
ollama serve && ollama pull qwen3:8b
```

Then in ClawX:

- **Settings → Models** → Ollama `http://localhost:11434` + MiMo (new key)
- **Settings → Voice** → Kokoro TTS + Whisper STT (`http://localhost:8880/v1`)

### 3. VM Composio (optional remote)

Authorize pubkey from [deployment/CLOUD_AGENT_SSH_PUBKEY.md](deployment/CLOUD_AGENT_SSH_PUBKEY.md) on `robot@45.61.56.91`, then say **go** — Robusca runs:

```bash
bash scripts/vm-composio-install.sh
```

### 4. Connect Composio apps once

GitHub (`dark-factory`) · Notion CRM · Slack `#sales` · Stripe · Google Sheets

### 5. Sister agents

```bash
git clone https://github.com/TumeloRamaphosa/robusca-brain.git
# Read CONNECTING_AGENTS.md → SOUL.md → CLAWX_MODELS.md
```

---

## Canonical flow (unchanged)

```
YOU → WhatsApp/Discord/Telegram/Voice/Text(Cipher Tr@ce)
        ↓
RileyJarvis / ClawX → Ollama (Qwen3) + MiMo
        ↓
robusca-brain → N8N → Notion
        +
Composio (actions) · Sent.dm (optional customer SMS/WA/RCS)
```

---

## PR

https://github.com/TumeloRamaphosa/robusca-brain/pull/9

Merge when ready. Remaining live steps are outside git (keys, Mac Mini UI, SSH).

---

*Cipher Tr@ce · Robusca · StudEx · 2026-07-14*

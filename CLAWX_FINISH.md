# Finish ClawX Setup — Mac Mini

**One page. Run this after OpenClaw / ClawX is installed.**  
**Download first:** [CLAWX_DOWNLOAD.md](CLAWX_DOWNLOAD.md) · `bash scripts/download-openclaw-mac.sh`

**No secrets in git.** MiMo key goes only in ClawX UI / local env.

Companion files:
- Installer: [scripts/clawx-finish.sh](scripts/clawx-finish.sh)
- Config template: [config/openclaw.studex.example.json5](config/openclaw.studex.example.json5)
- Models: [CLAWX_MODELS.md](CLAWX_MODELS.md) · Voice: [CLAWX_VOICE_MAC_MINI.md](CLAWX_VOICE_MAC_MINI.md)

---

## 0. Security first (2 minutes)

Chat-pasted MiMo key is **burned**.

1. Revoke + create new key: https://platform.xiaomimimo.com/console/api-keys  
2. Put the **new** key only into ClawX Settings (or Mac Mini `.env.local`) — **never chat / never git**  
3. Optional: say **“vault the new MiMo key”** for the agent vault

---

## 0. Download OpenClaw (ClawX desktop)

```bash
bash scripts/download-openclaw-mac.sh
# or: curl -fsSL https://openclaw.ai/install.sh | bash
```

Details: [CLAWX_DOWNLOAD.md](CLAWX_DOWNLOAD.md)

## 1. One command on Mac Mini (deps)

```bash
cd ~/path/to/robusca-brain   # or: git clone https://github.com/TumeloRamaphosa/robusca-brain.git
bash scripts/clawx-finish.sh
```

That script will:

1. Install/start **Ollama** + pull `qwen3:8b`  
2. Start **Kokoro-FastAPI** on `:8880` (Docker)  
3. Install **Whisper** + ensure `ffmpeg`  
4. Print exact ClawX UI clicks + copy paths for the config template  

---

## 2. Wire ClawX UI (after script)

### Models

| Provider | Setting | Value |
|---|---|---|
| **Ollama** (local default) | Base URL | `http://127.0.0.1:11434` (**no** `/v1`) |
| | Model | `qwen3:8b` (or whatever `ollama list` shows) |
| **Xiaomi MiMo** (cloud) | Base URL | `https://api.xiaomimimo.com/v1` |
| | API key | *new key from console — paste in UI only* |
| | Model | `mimo-v2.5-pro` or `mimo-v2.5` |

Prefer Ollama for routine; MiMo for hard reasoning.

### Voice

| Setting | Value |
|---|---|
| TTS **primary** | **MiniMax** (vault / ClawX secrets — never chat). Spec: [VOICE_ASSISTANT_OS.md](VOICE_ASSISTANT_OS.md) |
| TTS fallback | **Kokoro** → `http://localhost:8880/v1`, model `kokoro`, voice `af_bella` |
| STT | **Whisper** (local) |

ClawX path: **Settings → Voice → TTS = MiniMax (or Kokoro) · STT = Whisper**

### Actions (Notion / Linear)

Authenticate Notion + Linear MCP, then speak workflows from [VOICE_ASSISTANT_OS.md](VOICE_ASSISTANT_OS.md)  
(“create Linear issue…”, “add to Notion CRM…”).

### Brain (this repo)

Point ClawX workspace / skills / memory at:

```
~/…/robusca-brain
```

Or clone:

```bash
git clone https://github.com/TumeloRamaphosa/robusca-brain.git
```

Sister agents: read [CONNECTING_AGENTS.md](CONNECTING_AGENTS.md).

---

## 3. Optional: merge config template

If ClawX/OpenClaw uses `~/.openclaw/openclaw.json` (or ClawX Settings → Advanced → JSON):

1. Copy [config/openclaw.studex.example.json5](config/openclaw.studex.example.json5)  
2. Fill `apiKey` from env — use `"$XIAOMI_MIMO_API_KEY"` style refs if supported, **never** commit real keys  
3. Restart ClawX  

---

## 4. Smoke tests

```bash
# Ollama
curl -s http://127.0.0.1:11434/api/tags | head

# Kokoro
curl -s http://localhost:8880/v1/models | head

# Whisper
whisper --help | head -3
```

In ClawX chat:

1. Ask a short question on **Ollama**  
2. Switch to **MiMo** for a harder question  
3. Hold-to-talk → confirm Whisper transcript + Kokoro spoken reply  

---

## Done when

- [ ] `clawx-finish.sh` completed without errors  
- [ ] Ollama + MiMo both answer in ClawX  
- [ ] Voice round-trip works (speak → text → spoken reply)  
- [ ] Workspace points at `robusca-brain`  
- [ ] Burned MiMo key revoked; new key only in ClawX/vault  

Then you’re live on voice. Product target (MiniMax speak + Ollama + Notion/Linear + mobile): **[VOICE_ASSISTANT_OS.md](VOICE_ASSISTANT_OS.md)**.  
Optional next: Composio apps + VM SSH ([SETUP_STATUS.md](SETUP_STATUS.md)).

---

*Cipher Tr@ce · Robusca · StudEx · 2026-07-14*

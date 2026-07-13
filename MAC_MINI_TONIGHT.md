# Mac Mini Tonight — Install Playbook

**Host:** Tumelo’s Mac Mini (RileyJarvis voice/WhatsApp node)  
**When:** Tonight (2026-07-13)  
**Spec companion:** [COMPOSIO_MESH.md](COMPOSIO_MESH.md)

## Fast path (recommended)

From this repo on the Mac Mini:

```bash
# Optional: export DISCORD_BOT_TOKEN=... first (never commit it)
bash scripts/mac-mini-tonight.sh --start-kokoro
cd ~/Agents/rileyjarvis && npm run dev   # scan WhatsApp QR
python3 scripts/composio-smoke.py       # verify Composio
```

Manual steps below if you prefer copy-paste.

---

## 0. Prereqs

```bash
# Node 20+, Python 3.11+, ffmpeg (Whisper)
brew install ffmpeg node
python3 --version
node --version
```

Pick a home dir, e.g. `~/Agents`:

```bash
mkdir -p ~/Agents && cd ~/Agents
```

---

## 1. RileyJarvis (voice AI + WhatsApp)

```bash
git clone https://github.com/rbrown101010/rileyjarvis.git
cd rileyjarvis && npm install
# Don't start yet — finish Kokoro + Whisper + Discord first
cd ~/Agents
```

`npm run dev` launches Vite + Electron and shows the WhatsApp QR — scan once.

---

## 2. Kokoro TTS (free, local, fast)

**Paste said:** `remsky/Kokoro-ONNX` + `kokoro_server.py --port 5002`  
**Reality:** that repo **404s**. Use one of these:

### Option A — recommended: Kokoro-FastAPI (OpenAI-compatible)

```bash
# CPU image is fine on Mac Mini (Apple Silicon via Docker Desktop)
docker run -d --name kokoro -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-cpu:latest
# API: http://localhost:8880/v1   UI: http://localhost:8880/web
```

Or from source:

```bash
git clone https://github.com/remsky/Kokoro-FastAPI.git
cd Kokoro-FastAPI/docker/cpu && docker compose up -d
```

Point RileyJarvis TTS base URL at `http://localhost:8880/v1` (voice e.g. `af_bella`).

### Option B — library only: `kokoro-onnx`

```bash
pip3 install -U kokoro-onnx soundfile
# No built-in --port 5002 server; use examples from thewh1teagle/kokoro-onnx
```

---

## 3. Whisper STT (speech → text)

```bash
pip3 install -U openai-whisper
# Optional smoke test:
# whisper /path/to/sample.m4a --model base --language en
```

Needs `ffmpeg` on PATH.

---

## 4. Discord CLI (terminal Discord)

**Paste said:** `npm install -g discli` + `discli auth`  
**Reality:** bare `discli` on npm is **unpublished**. Use:

```bash
npm install -g @ibbybuilds/discli
# Paste Discord *bot* token (Developer Portal) — never commit it
discli init --token "$DISCORD_BOT_TOKEN"
discli server info   # smoke test
```

Alt (Python agent CLI): `pip install discord-cli-agent` → [DevRohit06/discli](https://github.com/DevRohit06/discli).

---

## 5. Start RileyJarvis (QR → WhatsApp)

```bash
cd ~/Agents/rileyjarvis
npm run dev
# Scan QR with WhatsApp → Linked Devices
```

Confirm voice path: WhatsApp audio → Whisper → Ollama (Qwen3) → reply → Kokoro → WhatsApp.

---

## 6. Composio (action layer — same night if time)

Natural-language tools, OAuth once:

| Say this | Does this |
|---|---|
| Create a GitHub issue on `dark-factory` | GitHub |
| Add this to Notion CRM | Notion |
| Send a Slack message to `#sales` | Slack |
| Create a Stripe invoice | Stripe |
| Update a Google Sheet | Sheets |

```bash
# Prefer modern packages
npm install -g @composio/core
pip3 install -U composio
# Then connect apps once in Composio dashboard / CLI
```

Flow still: `RileyJarvis → Ollama (Qwen3) → robusca-brain → N8N → Notion`  
Composio = side-path tool executor. Full map: [COMPOSIO_MESH.md](COMPOSIO_MESH.md).

---

## Tonight checklist

- [ ] RileyJarvis cloned + `npm install`
- [ ] Kokoro running (`localhost:8880` via FastAPI **or** onnx lib wired)
- [ ] Whisper installed + ffmpeg present
- [ ] `@ibbybuilds/discli` installed + bot token via `discli init` (token never in chat/repo)
- [ ] `npm run dev` → WhatsApp QR scanned
- [ ] Ollama Qwen3 reachable from RileyJarvis
- [ ] Composio apps connected (GitHub / Notion / Slack / Stripe / Sheets) — optional tonight

---

## Security

- Discord / Composio / WhatsApp tokens → vault only. Never paste into git, Slack, or agent chat.
- Prefer bot token for `discli`, not a user account token (ToS + hijack risk).

---

*Cipher Tr@ce · Robusca · StudEx · 2026-07-13*

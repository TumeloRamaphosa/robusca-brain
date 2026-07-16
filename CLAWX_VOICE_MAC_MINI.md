# ClawX Voice on Mac Mini — Kokoro TTS + Whisper STT

**Host:** Tumelo’s Mac Mini  
**Surface:** ClawX → Settings → Voice  
**Updated:** 2026-07-13

---

## Paste vs reality

| Paste | Reality |
|---|---|
| `git clone …/remsky/Kokoro-ONNX.git` | **404** — repo does not exist |
| `python3 kokoro_server.py --port 5002` | No such upstream server script |
| ClawX / OpenClaw Kokoro default | **`http://localhost:8880/v1`** (Kokoro-FastAPI) |
| `pip install …` inside ClawX | Prefer **`uv pip install`** (ClawX ships `uv`) |

---

## 1. Install Kokoro TTS (working)

### Recommended — Kokoro-FastAPI on :8880

```bash
# Docker Desktop on Mac Mini
docker run -d --name kokoro --restart unless-stopped -p 8880:8880 \
  ghcr.io/remsky/kokoro-fastapi-cpu:latest

# Smoke: open http://localhost:8880/web
# API:  http://localhost:8880/v1/audio/speech
```

From source:

```bash
git clone https://github.com/remsky/Kokoro-FastAPI.git ~/Kokoro-FastAPI
cd ~/Kokoro-FastAPI/docker/cpu && docker compose up -d
```

### Library-only fallback (no HTTP server)

```bash
# ClawX prefers uv:
uv pip install kokoro-onnx soundfile numpy
# Or: pip3 install kokoro-onnx soundfile numpy
```

Do **not** clone `remsky/Kokoro-ONNX` — it 404s. Closest lib repo: [thewh1teagle/kokoro-onnx](https://github.com/thewh1teagle/kokoro-onnx).

---

## 2. Install Whisper STT

```bash
brew install ffmpeg   # required
uv pip install openai-whisper
# Or: pip3 install openai-whisper
```

### Test

```bash
# Transcribe a file (CLI needs an audio path — not live mic by itself):
whisper sample.m4a --model medium --language English

# Faster smoke on Mac Mini:
whisper sample.m4a --model base --language English
```

For live mic → STT, use **ClawX Settings → Voice → Whisper** (ClawX owns the mic capture). The bare `whisper` CLI alone won’t “listen until you speak” without a recording front-end.

---

## 3. Connect in ClawX

1. Open **ClawX**
2. **Settings → Voice**
3. **TTS engine** → **Kokoro**  
   - If asked for URL / base: `http://localhost:8880/v1`  
   - Voice example: `af_bella` or `af_heart`
4. **STT engine** → **Whisper** (local / `openai-whisper`)
5. Save → speak a test phrase → confirm reply audio plays

If ClawX only lists “Kokoro” without a URL field, keep FastAPI on **8880** (that’s what OpenClaw/kokoro skills default to). Ignore paste’s **5002** unless ClawX UI explicitly asks for it.

---

## 4. One-liner Mac Mini sequence

```bash
# TTS
docker run -d --name kokoro --restart unless-stopped -p 8880:8880 \
  ghcr.io/remsky/kokoro-fastapi-cpu:latest

# STT
brew install ffmpeg
uv pip install openai-whisper

# Then ClawX → Settings → Voice → Kokoro + Whisper
```

Also: [MAC_MINI_TONIGHT.md](MAC_MINI_TONIGHT.md) (RileyJarvis / discli / Composio) · [COMPOSIO_MESH.md](COMPOSIO_MESH.md)

---

## Checklist

- [ ] Kokoro-FastAPI healthy on `localhost:8880`
- [ ] `ffmpeg` + `openai-whisper` installed via `uv`/`pip`
- [ ] Whisper smoke on a sample `.m4a`/`.wav`
- [ ] ClawX → Settings → Voice → Kokoro (TTS)
- [ ] ClawX → Settings → Voice → Whisper (STT)
- [ ] Round-trip: speak → transcript → agent reply → spoken audio

---

*Cipher Tr@ce · Robusca · StudEx*

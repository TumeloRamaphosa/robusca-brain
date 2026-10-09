#!/usr/bin/env bash
# Finish ClawX stack on Mac Mini — Ollama + Kokoro + Whisper
# Usage: bash scripts/clawx-finish.sh
# Spec: CLAWX_FINISH.md
set -euo pipefail

log() { printf '\n\033[1m==> %s\033[0m\n' "$*"; }
have() { command -v "$1" >/dev/null 2>&1; }

log "0. Prereqs"
if have brew; then
  brew list ffmpeg >/dev/null 2>&1 || brew install ffmpeg
  have ollama || brew install ollama
else
  echo "WARNING: Homebrew missing — install ffmpeg + ollama manually"
fi
have docker || echo "WARNING: Docker missing — Kokoro container step will be skipped (install Docker Desktop)"

log "1. Ollama (local LLM)"
if have ollama; then
  # Start serve if not up
  if ! curl -sf http://127.0.0.1:11434/api/tags >/dev/null 2>&1; then
    if have brew; then
      brew services start ollama 2>/dev/null || true
    fi
    nohup ollama serve >/tmp/ollama-serve.log 2>&1 &
    sleep 2
  fi
  ollama pull qwen3:8b
  echo "Ollama models:"
  ollama list || true
else
  echo "ERROR: ollama not installed"
fi

log "2. Kokoro-FastAPI TTS (:8880)"
if have docker; then
  if docker ps -a --format '{{.Names}}' 2>/dev/null | grep -qx kokoro; then
    docker start kokoro >/dev/null || true
    echo "Kokoro container started (existing)"
  else
    docker pull ghcr.io/remsky/kokoro-fastapi-cpu:latest
    docker run -d --name kokoro --restart unless-stopped -p 8880:8880 \
      ghcr.io/remsky/kokoro-fastapi-cpu:latest
    echo "Kokoro started on http://127.0.0.1:8880"
  fi
  sleep 2
  curl -sf http://127.0.0.1:8880/v1/models >/dev/null && echo "Kokoro API OK" || echo "Kokoro still warming — check http://127.0.0.1:8880/web"
else
  echo "Skip Docker Kokoro — later: docker run -d --name kokoro -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-cpu:latest"
  if have uv; then
    uv pip install kokoro-onnx soundfile numpy || true
  else
    python3 -m pip install -U --user kokoro-onnx soundfile numpy || true
  fi
fi

log "3. Whisper STT"
if have uv; then
  uv pip install openai-whisper
else
  python3 -m pip install -U --user openai-whisper
fi
whisper --help >/dev/null && echo "Whisper OK"

log "4. ClawX UI — do these next (cannot automate from this script)"
cat <<'EOF'

┌─────────────────────────────────────────────────────────────┐
│  CLAWX SETTINGS (click these)                               │
├─────────────────────────────────────────────────────────────┤
│  Settings → Models                                          │
│    • Ollama                                                 │
│        Base URL:  http://127.0.0.1:11434   (NO /v1)         │
│        Model:     qwen3:8b                                  │
│    • Xiaomi MiMo (or Custom OpenAI-compatible)              │
│        Base URL:  https://api.xiaomimimo.com/v1             │
│        API key:   NEW key from console (not chat)           │
│        Model:     mimo-v2.5-pro                             │
│                                                             │
│  Settings → Voice                                           │
│    • TTS: Kokoro  (URL http://127.0.0.1:8880/v1 if asked) │
│    • STT: Whisper                                           │
│                                                             │
│  Workspace / brain                                          │
│    • Point at cloned robusca-brain                          │
│    • Optional JSON: config/openclaw.studex.example.json5    │
└─────────────────────────────────────────────────────────────┘

MiMo console: https://platform.xiaomimimo.com/console/api-keys
Full guide:   CLAWX_FINISH.md

EOF

log "Done — finish the ClawX UI clicks above, then smoke-test chat + voice."

#!/usr/bin/env bash
# Mac Mini tonight installer — RileyJarvis + Kokoro + Whisper + discli
# Spec: MAC_MINI_TONIGHT.md
# Usage: bash scripts/mac-mini-tonight.sh [--start-kokoro] [--start-riley]
set -euo pipefail

AGENTS_HOME="${AGENTS_HOME:-$HOME/Agents}"
START_KOKORO=0
START_RILEY=0

for arg in "$@"; do
  case "$arg" in
    --start-kokoro) START_KOKORO=1 ;;
    --start-riley) START_RILEY=1 ;;
    -h|--help)
      echo "Usage: $0 [--start-kokoro] [--start-riley]"
      echo "  AGENTS_HOME=$AGENTS_HOME (override with env)"
      exit 0
      ;;
  esac
done

log() { printf '\n==> %s\n' "$*"; }
have() { command -v "$1" >/dev/null 2>&1; }

log "Prereqs"
if have brew; then
  brew list ffmpeg >/dev/null 2>&1 || brew install ffmpeg
  have node || brew install node
else
  echo "WARNING: Homebrew not found — ensure node, ffmpeg, python3 are installed."
fi
have node || { echo "ERROR: node required"; exit 1; }
have npm || { echo "ERROR: npm required"; exit 1; }
have python3 || { echo "ERROR: python3 required"; exit 1; }
have ffmpeg || echo "WARNING: ffmpeg missing — Whisper will fail until installed"
have docker || echo "WARNING: docker missing — Kokoro-FastAPI option A will be skipped"

mkdir -p "$AGENTS_HOME"
cd "$AGENTS_HOME"

log "1/4 RileyJarvis"
if [[ ! -d rileyjarvis/.git ]]; then
  git clone https://github.com/rbrown101010/rileyjarvis.git
fi
(
  cd rileyjarvis
  npm install
)

log "2/4 Kokoro TTS (FastAPI :8880 — corrects dead Kokoro-ONNX paste)"
if have docker; then
  if docker ps -a --format '{{.Names}}' | grep -qx kokoro; then
    docker start kokoro >/dev/null || true
    log "Kokoro container already present — started if stopped"
  else
    docker pull ghcr.io/remsky/kokoro-fastapi-cpu:latest
    if [[ "$START_KOKORO" -eq 1 ]]; then
      docker run -d --name kokoro -p 8880:8880 --restart unless-stopped \
        ghcr.io/remsky/kokoro-fastapi-cpu:latest
      log "Kokoro running at http://localhost:8880/v1"
    else
      log "Pulled Kokoro image. Start with: docker run -d --name kokoro -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-cpu:latest"
      log "Or re-run: $0 --start-kokoro"
    fi
  fi
else
  log "No Docker — installing kokoro-onnx library fallback"
  python3 -m pip install -U --user kokoro-onnx soundfile
fi

log "3/4 Whisper STT"
python3 -m pip install -U --user openai-whisper

log "4/4 Discord CLI (@ibbybuilds/discli — bare 'discli' npm is dead)"
npm install -g @ibbybuilds/discli
if [[ -n "${DISCORD_BOT_TOKEN:-}" ]]; then
  discli init --token "$DISCORD_BOT_TOKEN"
  log "discli initialized from DISCORD_BOT_TOKEN env"
else
  log "Set DISCORD_BOT_TOKEN and run: discli init --token \"\$DISCORD_BOT_TOKEN\""
  log "Do NOT paste the token into chat or git."
fi

log "Optional: Composio action layer"
npm install -g @composio/core 2>/dev/null || npm install -g @composio/core --prefix "$HOME/.local"
python3 -m pip install -U --user composio || true

log "Done. Next:"
echo "  cd $AGENTS_HOME/rileyjarvis && npm run dev   # scan WhatsApp QR"
echo "  Kokoro API: http://localhost:8880/v1"
echo "  Flow: RileyJarvis → Ollama (Qwen3) → robusca-brain → N8N → Notion"
echo "  Spec: COMPOSIO_MESH.md / MAC_MINI_TONIGHT.md"

if [[ "$START_RILEY" -eq 1 ]]; then
  log "Starting RileyJarvis (QR will appear)"
  cd "$AGENTS_HOME/rileyjarvis"
  npm run dev
fi

#!/usr/bin/env bash
# Desktop demo — StudEx + Ollama (Mac / Linux)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# shellcheck disable=SC1091
source "$ROOT/scripts/load-env.sh"

echo "=== StudEx desktop demo ==="

if ! command -v node &>/dev/null; then
  echo "Install Node.js 20+ from https://nodejs.org"
  exit 1
fi

if ! command -v ollama &>/dev/null; then
  echo "Ollama not found. Install: https://ollama.com/download"
  echo "Then: ollama pull qwen2.5:3b"
  echo ""
  echo "Continuing without Ollama — UI demo still works."
else
  if ! curl -sf http://127.0.0.1:11434/api/tags >/dev/null 2>&1; then
    echo "Starting ollama serve in background..."
    nohup ollama serve >/tmp/ollama-studex.log 2>&1 &
    sleep 2
  fi
  if ! curl -sf http://127.0.0.1:11434/api/tags | grep -q qwen2.5; then
    echo "Pulling qwen2.5:3b (small, fast for demos)..."
    ollama pull qwen2.5:3b || echo "Pull failed — use cloud: ollama pull nemotron-3-super:cloud"
  fi
fi

if [[ ! -d node_modules ]]; then
  npm install
fi

echo ""
echo "Open in browser:"
echo "  http://localhost:5180"
echo "  http://localhost:5180/onboarding"
echo "  http://localhost:5180/dashboard/demo"
echo ""

exec npm run dev

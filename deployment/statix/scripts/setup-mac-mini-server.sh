#!/usr/bin/env bash
# Mac mini (or any Mac) — run StudEx + Ollama as a home server for OpenHuman + tailnet clients
# Usage: bash deployment/statix/scripts/setup-mac-mini-server.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
STUDEX_DIR="$ROOT"
LLM_WIKI_DIR="${LLM_WIKI_DIR:-$HOME/llm_wiki}"
BRANCH="${STUDEX_BRANCH:-cursor/desktop-demo-statix-c65b}"

echo "=== StudEx Mac mini server setup ==="
echo ""

# --- Ollama ---
if ! command -v ollama &>/dev/null; then
  echo "Installing Ollama..."
  brew install ollama
fi

# Listen on all interfaces for Tailscale clients (StudEx on laptop, etc.)
if [[ "$(uname)" == "Darwin" ]]; then
  launchctl setenv OLLAMA_HOST "0.0.0.0:11434" 2>/dev/null || true
  echo "Set OLLAMA_HOST=0.0.0.0:11434 — restart Ollama app from menu bar"
fi

if ! curl -sf http://127.0.0.1:11434/api/tags >/dev/null 2>&1; then
  echo "Starting ollama serve..."
  nohup ollama serve >/tmp/ollama-serve.log 2>&1 &
  sleep 3
fi

echo "Pulling models (OpenHuman + StudEx)..."
ollama pull qwen2.5:3b
ollama pull all-minilm:latest

# --- StudEx server ---
cd "$STUDEX_DIR"
[[ -d node_modules ]] || npm install
npm run build

cat > .env.local <<EOF
OLLAMA_HOST=http://127.0.0.1:11434
DEMO_MODEL=qwen2.5:3b
SEO_OFFICE_URL=http://127.0.0.1:3000
PORT=5180
NODE_ENV=production
EOF

pkill -f "node dist/server.js" 2>/dev/null || true
sleep 1
nohup node dist/server.js > /tmp/studex.log 2>&1 &
sleep 2

if curl -sf http://127.0.0.1:5180/api/health >/dev/null; then
  echo "✓ StudEx LIVE http://127.0.0.1:5180"
else
  echo "✗ StudEx failed — tail /tmp/studex.log"
  tail -20 /tmp/studex.log
  exit 1
fi

# --- LLM Wiki (optional Karpathy wiki) ---
if [[ ! -d "$LLM_WIKI_DIR/.git" ]]; then
  echo ""
  echo "Optional: clone LLM Wiki for compounding knowledge brain"
  echo "  git clone https://github.com/nashsu/llm_wiki.git $LLM_WIKI_DIR"
  echo "  Install .dmg from releases OR: cd $LLM_WIKI_DIR && npm install && npm run tauri build"
  echo "  Settings → LLM provider → OpenAI-compatible → http://127.0.0.1:11434/v1"
else
  echo "✓ llm_wiki repo at $LLM_WIKI_DIR"
fi

# --- OpenHuman ---
echo ""
bash "$STUDEX_DIR/scripts/openhuman-doctor.sh" || true

echo ""
echo "=== Mac mini server ready ==="
echo ""
echo "Services:"
echo "  Ollama:   http://127.0.0.1:11434  (tailnet: http://$(tailscale ip -4 2>/dev/null || echo 'TAILSCALE_IP'):11434)"
echo "  StudEx:   http://127.0.0.1:5180/dashboard/demo"
echo "  OpenHuman: desktop app → Settings → Local AI → enable"
echo ""
echo "From laptop on Tailscale:"
echo "  export OLLAMA_HOST=http://$(tailscale ip -4 2>/dev/null || echo 'MAC_MINI_IP'):11434"
echo "  cd deployment/statix && npm run talk"
echo ""
echo "Fix OpenHuman not working:"
echo "  1. Enable Local AI in OpenHuman Settings"
echo "  2. Or merge config/openhuman-ollama.toml.example into ~/.openhuman/config.toml"
echo "  3. Restart OpenHuman"
echo "  4. bash scripts/openhuman-doctor.sh"

#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

echo "◆ Puppetier — StudEx Agentic Workspace"
echo ""

# 1. Voice bridge (needs ws)
if ! pgrep -f "puppetier/voice-bridge/server.js" >/dev/null 2>&1; then
  echo "→ Starting voice bridge :8765"
  (cd voice-bridge && npm install ws@8 --silent 2>/dev/null; node server.js) &
  sleep 1
fi

# 2. MCP gateway
if ! pgrep -f "puppetier/mcp-gateway/server.js" >/dev/null 2>&1; then
  echo "→ Starting MCP gateway :8787"
  (cd mcp-gateway && node server.js) &
  sleep 1
fi

# 3. Landing (python http)
if ! pgrep -f "puppetier/landing" >/dev/null 2>&1; then
  echo "→ Landing page :3090"
  (cd landing && python3 -m http.server 3090) &
fi

# 4. Open WebUI via Docker if available
if command -v docker >/dev/null 2>&1; then
  echo "→ Open WebUI via Docker :3080"
  docker compose up -d 2>/dev/null || docker-compose up -d 2>/dev/null || true
else
  echo "⚠ Docker not found — run on Mac: docker compose up -d"
  echo "  Or: pip install open-webui && open-webui serve"
fi

echo ""
echo "✓ Puppetier stack"
echo "  Landing:    http://localhost:3090"
echo "  Workspace:  http://localhost:3080  (Docker)"
echo "  MCP:        http://localhost:8787"
echo "  Voice WS:   ws://localhost:8765"
echo ""
echo "StudEx Voice (Mac):"
echo "  cd studex-voice && cp .env.example .env.local && npm install && npm run dev"

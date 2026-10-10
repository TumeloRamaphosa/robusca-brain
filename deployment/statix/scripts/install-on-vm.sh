#!/usr/bin/env bash
# Install StudEx on ANY Linux VM — run this script ON the VM (Orgo, Daytona, EC2, etc.)
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/TumeloRamaphosa/robusca-brain/cursor/desktop-demo-statix-c65b/deployment/statix/scripts/install-on-vm.sh | bash
# Or after cloning:
#   bash deployment/statix/scripts/install-on-vm.sh
set -euo pipefail

REPO_URL="${STUDEX_REPO_URL:-https://github.com/TumeloRamaphosa/robusca-brain.git}"
BRANCH="${STUDEX_BRANCH:-cursor/desktop-demo-statix-c65b}"
INSTALL_DIR="${STUDEX_INSTALL_DIR:-$HOME/studex-nestvm}"
PORT="${STUDEX_PORT:-5180}"
OLLAMA_HOST="${OLLAMA_HOST:-http://127.0.0.1:11434}"
DEMO_MODEL="${DEMO_MODEL:-qwen2.5:3b}"
SEO_OFFICE_URL="${SEO_OFFICE_URL:-http://127.0.0.1:3000}"

echo "=== StudEx VM install ==="
echo "Install dir: $INSTALL_DIR"
echo "Port: $PORT"

if ! command -v node &>/dev/null || [[ "$(node -v | cut -d. -f1 | tr -d v)" -lt 20 ]]; then
  echo "Installing Node.js 22..."
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
  sudo apt-get install -y nodejs git curl
fi

if [[ ! -d "$INSTALL_DIR/.git" ]]; then
  git clone --depth 1 --branch "$BRANCH" "$REPO_URL" "$INSTALL_DIR" || {
    mkdir -p "$INSTALL_DIR"
    cd "$INSTALL_DIR"
    git init
    git remote add origin "$REPO_URL"
    git fetch origin "$BRANCH" --depth 1
    git checkout FETCH_HEAD
  }
else
  cd "$INSTALL_DIR"
  git fetch origin "$BRANCH" --depth 1
  git checkout FETCH_HEAD
fi

cd "$INSTALL_DIR/deployment/statix"
npm ci 2>/dev/null || npm install
npm run build

cat > .env.local <<EOF
OLLAMA_HOST=${OLLAMA_HOST}
DEMO_MODEL=${DEMO_MODEL}
SEO_OFFICE_URL=${SEO_OFFICE_URL}
PORT=${PORT}
NODE_ENV=production
EOF

pkill -f "node dist/server.js" 2>/dev/null || true
sleep 1
nohup node dist/server.js > /tmp/studex.log 2>&1 &
disown
sleep 2

if curl -sf "http://127.0.0.1:${PORT}/api/health" >/dev/null; then
  echo ""
  echo "[studex] LIVE on port ${PORT}"
  curl -s "http://127.0.0.1:${PORT}/api/health"
  echo ""
  echo "Open in browser (use VM IP or tunnel):"
  echo "  /dashboard/demo"
  echo "  /onboarding"
  echo ""
  echo "Ollama: set OLLAMA_HOST to a Tailscale inference node if VM has <8GB RAM"
  echo "Logs: tail -f /tmp/studex.log"
else
  echo "[studex] FAILED"
  tail -30 /tmp/studex.log
  exit 1
fi

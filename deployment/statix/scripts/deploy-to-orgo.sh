#!/usr/bin/env bash
# Deploy Statix v1 to Orgo VM via API exec
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT/.env.local"
REPO_URL="${STATIX_REPO_URL:-https://github.com/TumeloRamaphosa/robusca-brain.git}"
BRANCH="${STATIX_BRANCH:-cursor/nestvm-agent-saas-plan-c65b}"
INSTALL_DIR="${STATIX_INSTALL_DIR:-/home/user/statix-nestvm}"

if [[ -f "$ENV_FILE" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
fi

: "${ORGO_API_KEY:?Set ORGO_API_KEY in .env.local}"
ORGO_COMPUTER_ID="${ORGO_COMPUTER_ID:-946b3156-cab9-4187-a94b-056dfab35105}"
ORGO_API_BASE="${ORGO_API_BASE:-https://www.orgo.ai/api}"

echo "=== Statix → Orgo deploy ==="
echo "Computer: $ORGO_COMPUTER_ID"
echo "Install dir: $INSTALL_DIR"
echo ""

# Build setup script to run on Orgo VM
SETUP_SCRIPT=$(cat <<'REMOTE_EOF'
set -e
INSTALL_DIR="__INSTALL_DIR__"
REPO_URL="__REPO_URL__"
BRANCH="__BRANCH__"

echo "[statix] Node: $(node -v 2>/dev/null || echo missing)"
if ! command -v node &>/dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
  sudo apt-get install -y nodejs git
fi

if [[ ! -d "$INSTALL_DIR/.git" ]]; then
  git clone --depth 1 --branch "$BRANCH" "$REPO_URL" "$INSTALL_DIR" 2>/dev/null || {
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
npm ci || npm install
npm run build

# Stop existing process if running
pkill -f "node dist/server.js" 2>/dev/null || true
sleep 1

export NODE_ENV=production
export PORT=5180
nohup node dist/server.js > /tmp/statix.log 2>&1 &
sleep 2

if curl -sf http://127.0.0.1:5180/api/health >/dev/null; then
  echo "[statix] LIVE — http://127.0.0.1:5180/api/health"
  curl -s http://127.0.0.1:5180/api/health
else
  echo "[statix] FAILED — tail /tmp/statix.log"
  tail -20 /tmp/statix.log
  exit 1
fi
REMOTE_EOF
)

SETUP_SCRIPT="${SETUP_SCRIPT//__INSTALL_DIR__/$INSTALL_DIR}"
SETUP_SCRIPT="${SETUP_SCRIPT//__REPO_URL__/$REPO_URL}"
SETUP_SCRIPT="${SETUP_SCRIPT//__BRANCH__/$BRANCH}"

# Escape for JSON
JSON_CODE=$(python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))' <<< "$SETUP_SCRIPT")

echo "Sending setup to Orgo VM..."
RESPONSE=$(curl -sS -w "\n%{http_code}" -X POST \
  "${ORGO_API_BASE}/computers/${ORGO_COMPUTER_ID}/exec" \
  -H "Authorization: Bearer ${ORGO_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "{\"code\": ${JSON_CODE}, \"timeout\": 300}")

HTTP_CODE=$(echo "$RESPONSE" | tail -1)
BODY=$(echo "$RESPONSE" | sed '$d')

echo "HTTP $HTTP_CODE"
echo "$BODY" | python3 -m json.tool 2>/dev/null || echo "$BODY"

if [[ "$HTTP_CODE" != "200" ]]; then
  echo "Deploy failed. Check ORGO_API_KEY and ORGO_COMPUTER_ID."
  exit 1
fi

echo ""
echo "=== Next: Cloudflare ==="
echo "Point statix.com A record → your Orgo VM public IP"
echo "Or use Cloudflare Tunnel — see CLOUDFLARE_WALKTHROUGH.md"

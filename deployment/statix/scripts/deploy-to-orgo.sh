#!/usr/bin/env bash
# Deploy StudEx v1 to Orgo VM via API exec
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT/.env.local"
REPO_URL="${STATIX_REPO_URL:-https://github.com/TumeloRamaphosa/robusca-brain.git}"
BRANCH="${STATIX_BRANCH:-cursor/desktop-demo-statix-c65b}"
INSTALL_DIR="${STATIX_INSTALL_DIR:-/home/user/studex-nestvm}"

if [[ -f "$ENV_FILE" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
fi

: "${ORGO_API_KEY:?Set ORGO_API_KEY in .env.local}"
ORGO_COMPUTER_ID="${ORGO_COMPUTER_ID:-333de3f8-0801-430b-a541-aad458e896b5}"
OLLAMA_HOST="${OLLAMA_HOST:-http://127.0.0.1:11434}"
DEMO_MODEL="${DEMO_MODEL:-qwen2.5:3b}"
SEO_OFFICE_URL="${SEO_OFFICE_URL:-http://127.0.0.1:3000}"
ORGO_API_BASE="${ORGO_API_BASE:-https://www.orgo.ai/api}"

echo "=== StudEx → Orgo deploy ==="
echo "Computer: $ORGO_COMPUTER_ID"
echo "Install dir: $INSTALL_DIR"
echo ""

# Build setup script to run on Orgo VM
SETUP_SCRIPT=$(cat <<'REMOTE_EOF'
set -e
INSTALL_DIR="__INSTALL_DIR__"
REPO_URL="__REPO_URL__"
BRANCH="__BRANCH__"

echo "[studex] Node: $(node -v 2>/dev/null || echo missing)"
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

# Stop existing process if running (pkill returns 1 if none — that's fine)
pkill -f "node dist/server.js" 2>/dev/null || true
sleep 1

export NODE_ENV=production
export PORT=5180

cat > .env.local <<ENVEOF
OLLAMA_HOST=__OLLAMA_HOST__
DEMO_MODEL=__DEMO_MODEL__
SEO_OFFICE_URL=__SEO_OFFICE_URL__
PORT=5180
NODE_ENV=production
ENVEOF

nohup node dist/server.js > /tmp/studex.log 2>&1 &
disown
sleep 1

if curl -sf http://127.0.0.1:5180/api/health >/dev/null; then
  echo "[studex] LIVE — http://127.0.0.1:5180/api/health"
  curl -s http://127.0.0.1:5180/api/health
else
  echo "[studex] FAILED — tail /tmp/studex.log"
  tail -20 /tmp/studex.log
  exit 1
fi
REMOTE_EOF
)

SETUP_SCRIPT="${SETUP_SCRIPT//__INSTALL_DIR__/$INSTALL_DIR}"
SETUP_SCRIPT="${SETUP_SCRIPT//__REPO_URL__/$REPO_URL}"
SETUP_SCRIPT="${SETUP_SCRIPT//__BRANCH__/$BRANCH}"
SETUP_SCRIPT="${SETUP_SCRIPT//__OLLAMA_HOST__/$OLLAMA_HOST}"
SETUP_SCRIPT="${SETUP_SCRIPT//__DEMO_MODEL__/$DEMO_MODEL}"
SETUP_SCRIPT="${SETUP_SCRIPT//__SEO_OFFICE_URL__/$SEO_OFFICE_URL}"

# Escape for JSON — use bash endpoint (exec runs Python only)
JSON_CMD=$(python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))' <<< "$SETUP_SCRIPT")

echo "Sending setup to Orgo VM (bash)..."
RESPONSE=$(curl -sS -w "\n%{http_code}" -X POST \
  "${ORGO_API_BASE}/computers/${ORGO_COMPUTER_ID}/bash" \
  -H "Authorization: Bearer ${ORGO_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "{\"command\": ${JSON_CMD}, \"timeout\": 300}")

HTTP_CODE=$(echo "$RESPONSE" | tail -1)
BODY=$(echo "$RESPONSE" | sed '$d')

echo "HTTP $HTTP_CODE"
echo "$BODY" | python3 -m json.tool 2>/dev/null || echo "$BODY"

# bash endpoint returns success/exit_code; -1 can happen when pkill finds nothing
EXIT_CODE=$(echo "$BODY" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('exit_code', 1))" 2>/dev/null || echo "1")
SUCCESS=$(echo "$BODY" | python3 -c "import json,sys; d=json.load(sys.stdin); print('true' if d.get('success') else 'false')" 2>/dev/null || echo "false")
HAS_LIVE=$(echo "$BODY" | python3 -c "import json,sys; d=json.load(sys.stdin); print('true' if '[studex] LIVE' in (d.get('output') or '') else 'false')" 2>/dev/null || echo "false")

if [[ "$HTTP_CODE" != "200" ]] || [[ "$SUCCESS" != "true" ]]; then
  echo "Deploy failed. Check ORGO_API_KEY and ORGO_COMPUTER_ID."
  exit 1
fi

if [[ "$HAS_LIVE" != "true" ]] && [[ "$EXIT_CODE" != "0" ]]; then
  echo "Deploy failed. Check ORGO_API_KEY and ORGO_COMPUTER_ID."
  exit 1
fi

echo ""
echo "=== Next: Cloudflare ==="
echo "Point studex.studex-group.com A record → your Orgo VM public IP"
echo "Or use Cloudflare Tunnel — see CLOUDFLARE_WALKTHROUGH.md"

#!/usr/bin/env bash
# Install Caddy on Orgo VM — route hostnames to StudEx (5180) and War Room (5000)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT/.env.local"

if [[ -f "$ENV_FILE" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
fi

: "${ORGO_API_KEY:?Set ORGO_API_KEY in .env.local}"
ORGO_COMPUTER_ID="${ORGO_COMPUTER_ID:-333de3f8-0801-430b-a541-aad458e896b5}"
ORGO_API_BASE="${ORGO_API_BASE:-https://www.orgo.ai/api}"

CADDY_SCRIPT=$(cat <<'REMOTE'
set -e
if ! command -v caddy &>/dev/null; then
  apt-get update -qq && apt-get install -y -qq debian-keyring debian-archive-keyring apt-transport-https curl
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg 2>/dev/null || true
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
  apt-get update -qq && apt-get install -y -qq caddy
fi

cat > /etc/caddy/Caddyfile <<'CADDY'
# HTTP only — TLS terminated by Cloudflare Tunnel or Cloudflare proxy
:80 {
  @studex host studex.studex-group.com
  @agent host agent.studex-group.com www.agent.studex-group.com

  handle @studex {
    reverse_proxy 127.0.0.1:5180
  }
  handle @agent {
    reverse_proxy 127.0.0.1:5180
  }
  respond "StudEx — host not configured" 404
}
CADDY

pkill -f "caddy run" 2>/dev/null || true
nohup caddy run --config /etc/caddy/Caddyfile --adapter caddyfile > /root/caddy.log 2>&1 &
sleep 2
ss -tlnp | grep ':80' || echo "port 80 pending"
curl -sf -H "Host: studex.studex-group.com" http://127.0.0.1/api/health && echo " studex-vhost-ok"
curl -sf -H "Host: agent.studex-group.com" http://127.0.0.1/api/health && echo " agent-vhost-ok"
echo CADDY_DONE
REMOTE
)

JSON_CMD=$(python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))' <<< "$CADDY_SCRIPT")

echo "Installing Caddy on Orgo VM..."
RESP=$(curl -sS -X POST \
  "${ORGO_API_BASE}/computers/${ORGO_COMPUTER_ID}/bash" \
  -H "Authorization: Bearer ${ORGO_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "{\"command\": ${JSON_CMD}}")

echo "$RESP" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('output','')); print('success:', d.get('success'), 'exit:', d.get('exit_code'))"

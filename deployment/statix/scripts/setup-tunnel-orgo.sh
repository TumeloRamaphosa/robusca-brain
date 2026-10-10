#!/usr/bin/env bash
# Run cloudflared on Orgo VM — named tunnel (token) or quick tunnel (fallback)
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
TUNNEL_TOKEN="${CLOUDFLARE_TUNNEL_TOKEN:-}"

TUNNEL_CONFIG_B64=$(python3 -c "
import base64
cfg = '''tunnel: studex-nestvm
credentials-file: /root/.cloudflared/studex-nestvm.json

ingress:
  - hostname: studex.studex-group.com
    service: http://127.0.0.1:5180
  - hostname: agent.studex-group.com
    service: http://127.0.0.1:5180
  - hostname: www.agent.studex-group.com
    service: http://127.0.0.1:5180
  - service: http_status:404
'''
print(base64.b64encode(cfg.encode()).decode())
")

if [[ -n "$TUNNEL_TOKEN" ]]; then
  REMOTE="set -e
mkdir -p /root/.cloudflared
if ! command -v /tmp/cloudflared &>/dev/null; then
  curl -fsSL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /tmp/cloudflared
  chmod +x /tmp/cloudflared
fi
echo '${TUNNEL_CONFIG_B64}' | base64 -d > /root/.cloudflared/config.yml
pkill -f cloudflared 2>/dev/null || true
nohup /tmp/cloudflared tunnel run --token '${TUNNEL_TOKEN}' > /root/cf-tunnel.log 2>&1 &
sleep 8
curl -sf http://127.0.0.1:5180/api/health
echo NAMED_TUNNEL_READY
"
  echo "Starting named Cloudflare tunnel on Orgo VM..."
else
  REMOTE="set -e
mkdir -p /root/.cloudflared
if ! command -v /tmp/cloudflared &>/dev/null; then
  curl -fsSL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /tmp/cloudflared
  chmod +x /tmp/cloudflared
fi
pkill -f cloudflared 2>/dev/null || true
nohup /tmp/cloudflared tunnel --url http://127.0.0.1:5180 > /root/cf-quick.log 2>&1 &
sleep 6
grep -oE 'https://[a-z0-9-]+\\.trycloudflare\\.com' /root/cf-quick.log | head -1 || true
curl -sf http://127.0.0.1:5180/api/health
echo QUICK_TUNNEL_READY
"
  echo "No CLOUDFLARE_TUNNEL_TOKEN — starting quick tunnel (temporary URL)..."
fi

JSON_CMD=$(python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))' <<< "$REMOTE")

RESP=$(curl -sS -X POST \
  "${ORGO_API_BASE}/computers/${ORGO_COMPUTER_ID}/bash" \
  -H "Authorization: Bearer ${ORGO_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "{\"command\": ${JSON_CMD}, \"timeout\": 120}")

echo "$RESP" | python3 -c "
import json, sys
d = json.load(sys.stdin)
print(d.get('output', ''))
print('success:', d.get('success'), 'exit:', d.get('exit_code'))
"

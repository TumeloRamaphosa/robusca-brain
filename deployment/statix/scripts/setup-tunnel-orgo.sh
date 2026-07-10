#!/usr/bin/env bash
# Run cloudflared on Orgo VM with ingress for studex-group.com hostnames → StudEx :5180
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

REMOTE="set -e
mkdir -p /root/.cloudflared
if ! command -v /tmp/cloudflared &>/dev/null; then
  curl -fsSL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /tmp/cloudflared
  chmod +x /tmp/cloudflared
fi
echo '${TUNNEL_CONFIG_B64}' | base64 -d > /root/.cloudflared/config.yml
pkill -f cloudflared 2>/dev/null || true
# Quick tunnel for immediate testing (no CF token needed)
nohup /tmp/cloudflared tunnel --url http://127.0.0.1:5180 > /root/cf-quick.log 2>&1 &
sleep 6
grep -o 'https://[a-z0-9-]*\\.trycloudflare.com' /root/cf-quick.log | head -1 || true
curl -sf http://127.0.0.1:5180/api/health
echo TUNNEL_READY
"

JSON_CMD=$(python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))' <<< "$REMOTE")

echo "Setting up cloudflared on Orgo VM..."
RESP=$(curl -sS -X POST \
  "${ORGO_API_BASE}/computers/${ORGO_COMPUTER_ID}/bash" \
  -H "Authorization: Bearer ${ORGO_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "{\"command\": ${JSON_CMD}}")

echo "$RESP" | python3 -c "
import json, sys
d = json.load(sys.stdin)
print(d.get('output', ''))
print('success:', d.get('success'), 'exit:', d.get('exit_code'))
"

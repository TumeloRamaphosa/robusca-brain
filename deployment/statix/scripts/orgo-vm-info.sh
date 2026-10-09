#!/usr/bin/env bash
# Fetch Orgo computer details (public IP, status) — never prints API key
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
ORGO_COMPUTER_ID="${ORGO_COMPUTER_ID:-946b3156-cab9-4187-a94b-056dfab35105}"
ORGO_API_BASE="${ORGO_API_BASE:-https://www.orgo.ai/api}"

RESP=$(curl -sS "${ORGO_API_BASE}/computers/${ORGO_COMPUTER_ID}" \
  -H "Authorization: Bearer ${ORGO_API_KEY}" \
  -H "Content-Type: application/json")

echo "$RESP" | python3 -c "
import json, sys, re
d = json.load(sys.stdin)
url = d.get('url', '')
ip = ''
m = re.search(r'https?://([\d.]+)', url)
if m:
    ip = m.group(1)
print('name:', d.get('name'))
print('status:', d.get('status'))
print('project:', d.get('project_name'))
print('url:', url)
print('public_ip:', ip or '(parse from url above)')
print('fly_instance_id:', d.get('fly_instance_id'))
print('connection_url:', d.get('connection_url'))
"

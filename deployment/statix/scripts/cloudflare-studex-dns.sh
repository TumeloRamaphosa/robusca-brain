#!/usr/bin/env bash
# Cloudflare DNS for studex-group.com — fixed hostnames only (no tenant wildcards)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT/.env.local"

if [[ -f "$ENV_FILE" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
fi

: "${CLOUDFLARE_API_TOKEN:?Set CLOUDFLARE_API_TOKEN in .env.local}"
: "${CLOUDFLARE_ZONE_ID:?Set CLOUDFLARE_ZONE_ID in .env.local}"
: "${ORGO_VM_IP:?Set ORGO_VM_IP in .env.local}"

# Hostnames → Orgo VM (proxied orange cloud)
# Note: Orgo blocks inbound ports — use cloudflare-tunnel.sh for production.
HOSTS=(
  "studex.studex-group.com"
  "agent.studex-group.com"
  "www.agent.studex-group.com"
)

upsert_record() {
  local type="$1"
  local name="$2"
  local content="$3"
  local proxied="${4:-true}"

  echo "→ $type $name → $content (proxied=$proxied)"

  EXISTING=$(curl -sS -X GET \
    "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/dns_records?type=${type}&name=${name}" \
    -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
    -H "Content-Type: application/json")

  RECORD_ID=$(echo "$EXISTING" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d['result'][0]['id'] if d.get('result') else '')" 2>/dev/null || true)

  PAYLOAD=$(python3 -c "
import json
print(json.dumps({
  'type': '$type',
  'name': '$name',
  'content': '$content',
  'proxied': $proxied == 'true',
  'ttl': 1
}))
")

  if [[ -n "$RECORD_ID" ]]; then
    curl -sS -X PUT \
      "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/dns_records/${RECORD_ID}" \
      -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
      -H "Content-Type: application/json" \
      -d "$PAYLOAD" | python3 -c "import json,sys; d=json.load(sys.stdin); print('  ', 'ok' if d.get('success') else d.get('errors'))"
  else
    curl -sS -X POST \
      "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/dns_records" \
      -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
      -H "Content-Type: application/json" \
      -d "$PAYLOAD" | python3 -c "import json,sys; d=json.load(sys.stdin); print('  ', 'ok' if d.get('success') else d.get('errors'))"
  fi
}

echo "=== studex-group.com DNS → $ORGO_VM_IP ==="
for host in "${HOSTS[@]}"; do
  upsert_record "A" "$host" "$ORGO_VM_IP" "true"
done

echo ""
echo "Done. Verify:"
for host in "${HOSTS[@]}"; do
  echo "  curl -sI https://${host}/api/health"
done

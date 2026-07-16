#!/usr/bin/env bash
# Optional: set Cloudflare DNS via API (requires CLOUDFLARE_API_TOKEN + CLOUDFLARE_ZONE_ID)
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
: "${ORGO_VM_IP:?Set ORGO_VM_IP in .env.local — your Orgo VM public IP}"

DOMAIN="${STATIX_DOMAIN:-studex.studex-group.com}"

# For subdomains (e.g. studex.studex-group.com), set:
#   STATIX_DOMAIN=studex.studex-group.com
#   CLOUDFLARE_ZONE_ID=<zone id of parent domain studex-group.com>

upsert_record() {
  local type="$1"
  local name="$2"
  local content="$3"
  local proxied="${4:-true}"

  echo "Setting $type $name → $content (proxied=$proxied)"

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
      -d "$PAYLOAD" | python3 -m json.tool
  else
    curl -sS -X POST \
      "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/dns_records" \
      -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
      -H "Content-Type: application/json" \
      -d "$PAYLOAD" | python3 -m json.tool
  fi
}

echo "=== Cloudflare DNS for $DOMAIN ==="
upsert_record "A" "$DOMAIN" "$ORGO_VM_IP" "true"
upsert_record "A" "www.$DOMAIN" "$ORGO_VM_IP" "true"
upsert_record "A" "*.$DOMAIN" "$ORGO_VM_IP" "true"

echo ""
echo "Done. Wait 2–5 min for propagation, then: curl -I https://$DOMAIN/api/health"

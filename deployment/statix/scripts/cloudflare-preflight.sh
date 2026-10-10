#!/usr/bin/env bash
# Validate Cloudflare token + zone before running cloudflare-dns.sh
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

DOMAIN="${STATIX_DOMAIN:-studex.studex-group.com}"
ZONE_ID="${CLOUDFLARE_ZONE_ID:-}"

echo "=== Cloudflare preflight ==="

VERIFY=$(curl -sS "https://api.cloudflare.com/client/v4/user/tokens/verify" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json")

echo "$VERIFY" | python3 -c "
import json, sys
d = json.load(sys.stdin)
if not d.get('success'):
    print('✗ Token invalid:', d.get('errors'))
    sys.exit(1)
print('✓ Token is valid and active')
"

if [[ -z "$ZONE_ID" ]]; then
  echo "Looking up zone for $DOMAIN..."
  ZONE_RESP=$(curl -sS "https://api.cloudflare.com/client/v4/zones?name=${DOMAIN}" \
    -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
    -H "Content-Type: application/json")
  ZONE_ID=$(echo "$ZONE_RESP" | python3 -c "
import json, sys
d = json.load(sys.stdin)
zones = d.get('result') or []
if not zones:
    print('', end='')
    sys.exit(0)
print(zones[0]['id'])
")
fi

if [[ -z "$ZONE_ID" ]]; then
  echo "✗ Zone not found for: $DOMAIN"
  echo ""
  echo "Zones visible to this token:"
  curl -sS "https://api.cloudflare.com/client/v4/zones?per_page=20" \
    -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
    -H "Content-Type: application/json" | python3 -c "
import json, sys
d = json.load(sys.stdin)
for z in d.get('result') or []:
    print(f\"  - {z['name']}  zone_id={z['id']}  status={z['status']}\")
"
  echo ""
  echo "Fix: add $DOMAIN to Cloudflare, or set STATIX_DOMAIN to a zone you own"
  echo "     (e.g. STATIX_DOMAIN=studex.studex-group.com with CLOUDFLARE_ZONE_ID for studex-group.com)"
  exit 1
fi

echo "✓ Zone ID: $ZONE_ID"

DNS_TEST=$(curl -sS "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records?per_page=1" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json")

echo "$DNS_TEST" | python3 -c "
import json, sys
d = json.load(sys.stdin)
if not d.get('success'):
    errs = d.get('errors') or []
    print('✗ Token cannot read/edit DNS records:', errs)
    print('')
    print('Fix: create a new API token with permission:')
    print('  Zone → DNS → Edit')
    print('  scoped to your zone (e.g. studex-group.com or statix.com)')
    sys.exit(1)
print('✓ Token has DNS access')
"

if [[ -z "${ORGO_VM_IP:-}" ]]; then
  echo "✗ ORGO_VM_IP missing — get public IP from Orgo dashboard"
  exit 1
fi

echo "✓ ORGO_VM_IP set"
echo ""
echo "Ready. Run: bash scripts/cloudflare-dns.sh"

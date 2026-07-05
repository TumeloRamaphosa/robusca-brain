#!/usr/bin/env bash
# One-shot Cloudflare DNS for studex-group.com zone → Statix on Orgo VM
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

export CLOUDFLARE_ZONE_ID="${CLOUDFLARE_ZONE_ID:-0b15cf80f76fc28d4ec56c5d211b9f1b}"
export STATIX_DOMAIN="${STATIX_DOMAIN:-statix.studex-group.com}"

if [[ -f .env.local ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env.local
  set +a
fi

echo "=== Studex Group Cloudflare DNS ==="
echo "Zone: studex-group.com ($CLOUDFLARE_ZONE_ID)"
echo "Records: $STATIX_DOMAIN, www.$STATIX_DOMAIN, *.$STATIX_DOMAIN"
echo ""

bash scripts/cloudflare-preflight.sh
bash scripts/cloudflare-dns.sh

echo ""
echo "=== Verify (wait 2–5 min) ==="
echo "curl -s https://${STATIX_DOMAIN}/api/health"
echo "curl -s https://${STATIX_DOMAIN}/dashboard/demo"

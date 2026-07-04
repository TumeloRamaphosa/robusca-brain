#!/usr/bin/env bash
# Check which credentials are present (never prints secret values)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT/.env.local"

if [[ -f "$ENV_FILE" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
fi

check() {
  local name="$1"
  local val="${!name:-}"
  if [[ -n "$val" ]]; then
    echo "✓ $name is set"
    return 0
  else
    echo "✗ $name is missing"
    return 1
  fi
}

echo "=== Statix credential check ==="
echo "Env file: $([ -f "$ENV_FILE" ] && echo "$ENV_FILE (found)" || echo "not found — copy .env.example to .env.local")"
echo ""

MISSING=0
check ORGO_API_KEY || MISSING=1
check ORGO_COMPUTER_ID || echo "  (optional default: 946b3156-cab9-4187-a94b-056dfab35105)"
check CLOUDFLARE_API_TOKEN || echo "  (needed only for automated DNS — manual dashboard works too)"
check CLOUDFLARE_ZONE_ID || echo "  (find in Cloudflare → statix.com → Overview → Zone ID)"

echo ""
if [[ $MISSING -eq 0 ]]; then
  echo "Ready to deploy. Run: npm run deploy:orgo"
else
  echo "Add missing keys to deployment/statix/.env.local then re-run."
  exit 1
fi

#!/usr/bin/env bash
# One-shot go-live: deploy StudEx to Orgo + tunnel/DNS + verify
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ ! -f .env.local ]]; then
  echo "Creating .env.local from .env.example — fill in ORGO_API_KEY"
  cp .env.example .env.local
fi

# shellcheck disable=SC1091
source "$ROOT/scripts/load-env.sh"

: "${ORGO_API_KEY:?Add ORGO_API_KEY to .env.local then re-run: npm run go-live}"

echo "=== StudEx go-live ==="

if [[ -z "${ORGO_VM_IP:-}" ]]; then
  echo "Fetching Orgo VM IP..."
  IP=$(npm run -s orgo:info 2>/dev/null | awk -F': ' '/public_ip:/ {print $2}' | head -1)
  if [[ -n "$IP" && "$IP" != "(parse from url above)" ]]; then
    echo "ORGO_VM_IP=$IP" >> .env.local
    export ORGO_VM_IP="$IP"
    echo "Set ORGO_VM_IP=$IP"
  fi
fi

echo "[1/4] Deploy to Orgo..."
npm run deploy:orgo

if [[ -n "${CLOUDFLARE_TUNNEL_TOKEN:-}" ]]; then
  echo "[2/4] Cloudflare named tunnel (token)..."
  npm run tunnel:orgo
elif [[ -n "${CLOUDFLARE_API_TOKEN:-}" && -n "${ORGO_VM_IP:-}" ]]; then
  echo "[2/4] Cloudflare DNS A records..."
  npm run cf:studex
  echo "⚠ Orgo blocks inbound ports — add CLOUDFLARE_TUNNEL_TOKEN for public HTTPS"
else
  echo "[2/4] Skipped DNS/tunnel — set CLOUDFLARE_TUNNEL_TOKEN or CLOUDFLARE_API_TOKEN"
fi

echo "[3/4] Caddy vhost on Orgo (optional)..."
npm run caddy:orgo 2>/dev/null || echo "  (caddy skipped — tunnel may be enough)"

echo "[4/4] Verify..."
VERIFY_LOCAL="http://127.0.0.1:5180" npm run verify || true

echo ""
echo "=== Done ==="
echo "Local:  http://localhost:5180/dashboard/demo"
echo "Prod:   https://studex.studex-group.com/dashboard/demo"
echo "Demo:   npm run demo   (laptop, no VM)"

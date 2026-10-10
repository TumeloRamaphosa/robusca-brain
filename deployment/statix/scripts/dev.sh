#!/usr/bin/env bash
# Dev server — loads .env.local then starts Vite + API
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# shellcheck disable=SC1091
source "$ROOT/scripts/load-env.sh"

API_PORT="${PORT:-5181}"
export PORT="$API_PORT"

exec npx concurrently -k \
  "vite --host 0.0.0.0 --port 5180" \
  "PORT=${API_PORT} tsx watch server/index.ts"

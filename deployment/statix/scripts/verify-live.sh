#!/usr/bin/env bash
# Verify StudEx is live — local or production hostnames
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
# shellcheck disable=SC1091
source "$ROOT/scripts/load-env.sh"

LOCAL="${VERIFY_LOCAL:-http://127.0.0.1:5180}"
HOSTS=(
  "$LOCAL"
  "https://studex.studex-group.com"
  "https://agent.studex-group.com"
)

echo "=== StudEx live check ==="
OK=0
FAIL=0

for url in "${HOSTS[@]}"; do
  if curl -sf --max-time 8 "${url}/api/health" >/tmp/studex-health.json 2>/dev/null; then
    svc=$(python3 -c "import json; print(json.load(open('/tmp/studex-health.json')).get('service','?'))" 2>/dev/null || echo "?")
    echo "✓ $url — $svc"
    OK=$((OK + 1))
  else
    echo "✗ $url — unreachable"
    FAIL=$((FAIL + 1))
  fi
done

echo ""
if curl -sf --max-time 3 "${OLLAMA_HOST:-http://127.0.0.1:11434}/api/tags" >/dev/null 2>&1; then
  echo "✓ Ollama at ${OLLAMA_HOST:-http://127.0.0.1:11434}"
else
  echo "✗ Ollama offline — run: ollama serve && ollama pull qwen2.5:3b"
fi

echo ""
echo "Passed: $OK  Failed: $FAIL"
[[ $OK -gt 0 ]]

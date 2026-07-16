#!/usr/bin/env bash
# Verify NotebookLM agent connection without printing secrets.
set -euo pipefail

echo "== NotebookLM agent connection check =="

if ! command -v nlm >/dev/null 2>&1; then
  echo "FAIL: nlm not on PATH. Install: uv tool install notebooklm-mcp-cli"
  exit 1
fi

echo "OK: nlm=$(command -v nlm)"
echo "OK: notebooklm-mcp=$(command -v notebooklm-mcp || echo missing)"

echo
echo "-- doctor --"
nlm doctor || true

echo
echo "-- auth check --"
if nlm login --check; then
  echo "OK: auth configured"
else
  echo "FAIL: auth not configured. Run: nlm login"
  echo "      (A lone AQ.* token is not enough — need full cookies or browser login.)"
  exit 2
fi

NOTEBOOK_ID="${NOTEBOOKLM_DEFAULT_NOTEBOOK_ID:-98636c01-c524-4ff8-a9f6-05770487a7ec}"
echo
echo "-- notebook list (first lines) --"
nlm notebook list 2>&1 | head -40

echo
echo "Default notebook id: ${NOTEBOOK_ID}"
echo "Done."

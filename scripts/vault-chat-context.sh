#!/usr/bin/env bash
# Pull Obsidian vault context for agent conversations.
# Usage: bash scripts/vault-chat-context.sh "search terms"
#        bash scripts/vault-chat-context.sh            # today+yesterday memory + soul
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

QUERY="${*:-}"

echo "=== VAULT: robusca-brain ==="
echo "ROOT=$ROOT"
echo

echo "=== IDENTITY (always) ==="
for f in SOUL.md USER.md IDENTITY.md; do
  if [[ -f "$f" ]]; then
    echo "--- $f ---"
    head -n 40 "$f"
    echo
  fi
done

TODAY=$(date -u +%Y-%m-%d)
YDAY=$(date -u -d 'yesterday' +%Y-%m-%d 2>/dev/null || date -u -v-1d +%Y-%m-%d 2>/dev/null || true)

echo "=== RECENT MEMORY ==="
for d in "$TODAY" "$YDAY"; do
  if [[ -n "$d" && -f "memory/$d.md" ]]; then
    echo "--- memory/$d.md ---"
    cat "memory/$d.md"
    echo
  fi
done

if [[ -f MEMORY.md ]]; then
  echo "--- MEMORY.md (long-term, trim) ---"
  head -n 60 MEMORY.md
  echo
fi

if [[ -n "$QUERY" ]]; then
  echo "=== SEARCH: $QUERY ==="
  # ripgrep if available, else grep
  if command -v rg >/dev/null 2>&1; then
    rg -i -n --glob '*.md' --glob '!.obsidian/**' --glob '!.agents/**' \
      --glob '!node_modules/**' -C 1 --max-count 40 "$QUERY" . || true
  else
    grep -r -i -n --include='*.md' "$QUERY" . 2>/dev/null | head -80 || true
  fi
  echo
fi

echo "=== HINT ==="
echo "Continue the conversation grounded in the notes above."
echo "Write durable outcomes to memory/$TODAY.md — never invent vault facts."
echo "Spec: OBSIDIAN_AGENTS.md"

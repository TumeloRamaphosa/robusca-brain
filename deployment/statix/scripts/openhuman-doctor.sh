#!/usr/bin/env bash
# Diagnose OpenHuman + Ollama — run on Mac where OpenHuman is installed
set -euo pipefail

echo "=== OpenHuman + Ollama doctor ==="
echo ""

FAIL=0

# 1. Ollama binary
if command -v ollama &>/dev/null; then
  echo "✓ ollama CLI installed"
else
  echo "✗ ollama not installed — brew install ollama"
  FAIL=1
fi

# 2. Ollama API
if curl -sf --max-time 3 http://127.0.0.1:11434/api/tags >/tmp/ollama-tags.json 2>/dev/null; then
  COUNT=$(python3 -c "import json; print(len(json.load(open('/tmp/ollama-tags.json')).get('models',[])))" 2>/dev/null || echo 0)
  echo "✓ Ollama API reachable — $COUNT model(s)"
else
  echo "✗ Ollama not running — open Ollama app or: ollama serve"
  FAIL=1
fi

# 3. Tailscale exposure (for other devices)
if curl -sf --max-time 2 "http://$(tailscale ip -4 2>/dev/null):11434/api/tags" >/dev/null 2>&1; then
  echo "✓ Ollama reachable on Tailscale IP ($(tailscale ip -4))"
else
  echo "⚠ Ollama not on tailnet — set OLLAMA_HOST=0.0.0.0:11434 and restart Ollama (for StudEx on other machines)"
fi

# 4. OpenHuman install
if [[ -d "$HOME/.openhuman" ]]; then
  echo "✓ OpenHuman data dir: ~/.openhuman"
else
  echo "✗ ~/.openhuman missing — install OpenHuman first:"
  echo "    brew tap tinyhumansai/core && brew install openhuman"
  FAIL=1
fi

# 5. config.toml local AI
CFG="$HOME/.openhuman/config.toml"
if [[ -f "$CFG" ]]; then
  if grep -q 'runtime_enabled = true' "$CFG" 2>/dev/null; then
    echo "✓ local_ai.runtime_enabled = true"
  else
    echo "✗ Local AI OFF in config.toml — OpenHuman won't use Ollama until enabled"
    echo "  Fix: OpenHuman → Settings → AI & Skills → Local AI → enable preset"
    echo "  Or merge: deployment/statix/config/openhuman-ollama.toml.example into ~/.openhuman/config.toml"
    FAIL=1
  fi
  if grep -qE 'ollama:' "$CFG" 2>/dev/null; then
    echo "✓ ollama provider configured in config.toml"
  else
    echo "⚠ No ollama: provider in config.toml — chat may still use cloud"
  fi
else
  echo "⚠ config.toml not found yet — launch OpenHuman once to create it"
fi

# 6. Recommended models
for m in qwen2.5:3b all-minilm:latest; do
  if [[ -f /tmp/ollama-tags.json ]] && grep -q "$m" /tmp/ollama-tags.json 2>/dev/null; then
    echo "✓ model pulled: $m"
  else
    echo "⚠ pull recommended: ollama pull $m"
  fi
done

# 7. llm_wiki API (optional)
if curl -sf --max-time 2 http://127.0.0.1:19828/api/v1/health >/dev/null 2>&1; then
  echo "✓ LLM Wiki API on :19828"
else
  echo "○ LLM Wiki not running (optional) — install from https://github.com/nashsu/llm_wiki"
fi

# 8. StudEx
if curl -sf --max-time 2 http://127.0.0.1:5180/api/health >/dev/null 2>&1; then
  echo "✓ StudEx on :5180"
else
  echo "○ StudEx not running — cd deployment/statix && npm run demo"
fi

echo ""
if [[ $FAIL -eq 0 ]]; then
  echo "All critical checks passed. Restart OpenHuman if you changed Local AI settings."
else
  echo "Fix items marked ✗ then re-run: bash scripts/openhuman-doctor.sh"
  exit 1
fi

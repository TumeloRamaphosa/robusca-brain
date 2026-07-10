#!/usr/bin/env bash
# One-shot: find Ollama on tailnet + start Statix talking to it
# Run ON YOUR MAC (must be on Tailscale). Do NOT paste API keys into this file.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "=== Statix + Tailscale inference ==="

# Prefer Mac mini, then MacBook, then any host with Ollama
CANDIDATES=(
  "100.112.109.40"   # Project's Mac mini
  "100.95.66.29"     # MacBook Pro
  "100.96.194.88"    # superagent-command-center
  "100.109.98.72"    # cloud-pc
)

OLLAMA_IP=""
for ip in "${CANDIDATES[@]}"; do
  if curl -sf --max-time 2 "http://${ip}:11434/api/tags" >/dev/null 2>&1; then
    OLLAMA_IP="$ip"
    echo "Found Ollama at $ip"
    break
  fi
done

if [[ -z "$OLLAMA_IP" ]]; then
  echo ""
  echo "No Ollama found on tailnet yet. On your Windows/Mac inference box:"
  echo "  1. Install Ollama + Tailscale"
  echo "  2. export OLLAMA_HOST=0.0.0.0:11434  (restart Ollama)"
  echo "  3. ollama pull qwen2.5:3b   (quick demo)"
  echo "     or ollama pull hf.co/deepreinforce-ai/Ornith-1.0-35B-GGUF:Q4_K_M"
  echo ""
  echo "Starting Statix with LOCAL ollama only..."
  OLLAMA_IP="127.0.0.1"
fi

# Pick model
MODEL="qwen2.5:3b"
if curl -sf --max-time 3 "http://${OLLAMA_IP}:11434/api/tags" | grep -qi ornith; then
  MODEL="hf.co/deepreinforce-ai/Ornith-1.0-35B-GGUF:Q4_K_M"
fi

cat > .env.local <<EOF
OLLAMA_HOST=http://${OLLAMA_IP}:11434
DEMO_MODEL=${MODEL}
PORT=5181
EOF

echo "Wrote .env.local → OLLAMA_HOST=http://${OLLAMA_IP}:11434 DEMO_MODEL=${MODEL}"

if [[ "$OLLAMA_IP" == "127.0.0.1" ]] && ! curl -sf http://127.0.0.1:11434/api/tags >/dev/null 2>&1; then
  echo "Starting local ollama serve..."
  ollama serve >/tmp/ollama.log 2>&1 &
  sleep 2
  ollama pull qwen2.5:3b 2>/dev/null || true
fi

[[ -d node_modules ]] || npm install

echo ""
echo "Open:"
echo "  http://localhost:5180/dashboard/demo"
echo "  → scroll to 'Ask Soul (Ollama)'"
echo ""

npm run dev

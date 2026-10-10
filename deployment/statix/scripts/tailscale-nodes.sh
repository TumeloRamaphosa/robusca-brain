#!/usr/bin/env bash
# Probe Tailscale tailnet for Ollama inference nodes
# Usage: TS_API_KEY=tskey-api-... bash scripts/tailscale-nodes.sh
set -euo pipefail

: "${TS_API_KEY:?Set TS_API_KEY (tskey-api-... from Tailscale admin)}"

echo "=== Tailscale machines ==="
DEVICES=$(curl -sS "https://api.tailscale.com/api/v2/tailnet/-/devices" \
  -H "Authorization: Bearer ${TS_API_KEY}")

echo "$DEVICES" | python3 -c "
import json, sys
d = json.load(sys.stdin)
for dev in d.get('devices', []):
    ip = dev['addresses'][0]
    on = dev.get('connectedToControl', False)
    print(f\"{'ONLINE' if on else 'OFFLINE':7}  {ip:16}  {dev.get('os','?'):6}  {dev.get('hostname', '')}\")
"

echo ""
echo "=== Probing Ollama :11434 (run this ON a machine in the tailnet) ==="
echo "$DEVICES" | python3 -c "
import json, sys, subprocess
d = json.load(sys.stdin)
for dev in d.get('devices', []):
    if not dev.get('connectedToControl'): continue
    ip = dev['addresses'][0]
    host = dev.get('hostname', ip)
    try:
        r = subprocess.run(
            ['curl', '-sf', '--max-time', '3', f'http://{ip}:11434/api/tags'],
            capture_output=True, text=True
        )
        if r.returncode == 0:
            data = json.loads(r.stdout)
            models = [m['name'] for m in data.get('models', [])]
            print(f'OK  {ip} ({host}) — {len(models)} models: {', '.join(models[:3])}')
        else:
            print(f'--  {ip} ({host}) — no Ollama')
    except Exception as e:
        print(f'--  {ip} ({host}) — unreachable')
"

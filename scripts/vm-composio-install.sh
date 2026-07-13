#!/usr/bin/env bash
# Run ONCE SSH to robot@45.61.56.91 works.
# Usage: bash scripts/vm-composio-install.sh
set -euo pipefail

HOST="${COMPOSIO_VM_HOST:-robot@45.61.56.91}"
KEY="${COMPOSIO_VM_KEY:-$HOME/.ssh/id_ed25519}"

echo "==> Probing $HOST"
ssh -i "$KEY" -o BatchMode=yes -o ConnectTimeout=15 "$HOST" 'echo CONNECTED; whoami; hostname'

echo "==> Installing Composio (Node + Python) on VM"
ssh -i "$KEY" "$HOST" 'bash -s' <<'REMOTE'
set -euo pipefail
export PATH="$HOME/.local/bin:$PATH"

if command -v npm >/dev/null 2>&1; then
  npm install -g @composio/core || sudo npm install -g @composio/core
  npm list -g --depth=0 | grep -i composio || true
else
  echo "WARN: npm missing on VM"
fi

if command -v python3 >/dev/null 2>&1; then
  python3 -m pip install -U --user composio
  python3 -c "import composio; print('composio', composio.__version__)"
else
  echo "WARN: python3 missing on VM"
fi

echo "VM Composio install complete"
REMOTE

echo "==> Done. Next: connect GitHub/Notion/Slack/Stripe/Sheets in Composio dashboard."

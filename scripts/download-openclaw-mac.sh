#!/usr/bin/env bash
# Download OpenClaw (ClawX desktop) for macOS into ~/Downloads
# Usage: bash scripts/download-openclaw-mac.sh
set -euo pipefail

TAG="${OPENCLAW_TAG:-v2026.7.1}"
VERSION="${TAG#v}"
DMG_NAME="OpenClaw-${VERSION}.dmg"
URL="https://github.com/openclaw/openclaw/releases/download/${TAG}/${DMG_NAME}"
DEST_DIR="${OPENCLAW_DOWNLOAD_DIR:-$HOME/Downloads}"
DEST="$DEST_DIR/$DMG_NAME"

mkdir -p "$DEST_DIR"
echo "==> OpenClaw $TAG"
echo "    URL:  $URL"
echo "    Dest: $DEST"

if [[ -f "$DEST" ]]; then
  echo "Already downloaded: $DEST"
else
  curl -fL --proto '=https' --tlsv1.2 -o "$DEST.partial" "$URL"
  mv "$DEST.partial" "$DEST"
  echo "Downloaded $(du -h "$DEST" | awk '{print $1}')"
fi

# macOS only helpers
if [[ "$(uname -s)" == "Darwin" ]]; then
  echo "==> Opening DMG (drag OpenClaw to Applications)"
  open "$DEST" || true
  echo "Next: bash scripts/clawx-finish.sh"
  echo "Guide: CLAWX_DOWNLOAD.md · CLAWX_FINISH.md"
else
  echo "Note: this host is not macOS — DMG saved for transfer to your Mac Mini:"
  echo "  $DEST"
  echo "On the Mac Mini, run this same script (or open the .dmg from Downloads)."
fi

#!/usr/bin/env bash
# Download ValueCell ClawX desktop for this machine.
# Usage: bash scripts/download-clawx.sh
# Repo: https://github.com/ValueCell-ai/ClawX
set -euo pipefail

TAG="${CLAWX_TAG:-v0.4.16}"
VER="${TAG#v}"
DEST_DIR="${CLAWX_DOWNLOAD_DIR:-$HOME/Downloads}"
mkdir -p "$DEST_DIR"

OS="$(uname -s)"
ARCH="$(uname -m)"

pick_asset() {
  case "$OS" in
    Darwin)
      if [[ "$ARCH" == "arm64" ]]; then
        echo "ClawX-${VER}-mac-arm64.dmg"
      else
        echo "ClawX-${VER}-mac-x64.dmg"
      fi
      ;;
    Linux)
      if [[ "$ARCH" == "aarch64" || "$ARCH" == "arm64" ]]; then
        echo "ClawX-${VER}-linux-arm64.AppImage"
      else
        echo "ClawX-${VER}-linux-x86_64.AppImage"
      fi
      ;;
    *)
      echo "ClawX-${VER}-win-x64.exe"
      ;;
  esac
}

ASSET="$(pick_asset)"
URL="https://github.com/ValueCell-ai/ClawX/releases/download/${TAG}/${ASSET}"
DEST="$DEST_DIR/$ASSET"

echo "==> ClawX $TAG ($OS/$ARCH)"
echo "    $URL"
echo "    → $DEST"

if [[ ! -f "$DEST" ]]; then
  curl -fL --proto '=https' --tlsv1.2 -o "$DEST.partial" "$URL"
  mv "$DEST.partial" "$DEST"
fi
chmod +x "$DEST" 2>/dev/null || true
echo "Downloaded $(du -h "$DEST" | awk '{print $1}')"

if [[ "$OS" == "Darwin" ]]; then
  open "$DEST" || true
  echo "Drag ClawX to Applications, then: open -a ClawX"
  echo "Next: bash scripts/clawx-finish.sh"
elif [[ "$ASSET" == *.AppImage ]]; then
  echo "Launch: $DEST --no-sandbox"
  echo "(Needs FUSE, or: $DEST --appimage-extract && ./squashfs-root/clawx --no-sandbox)"
fi

echo "Guide: CLAWX_DOWNLOAD.md"

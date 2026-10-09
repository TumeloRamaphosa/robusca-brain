# Download ClawX (ValueCell) — correct product

**Repo:** https://github.com/ValueCell-ai/ClawX  
**What it is:** Desktop GUI for OpenClaw agents (Electron) — Mac / Windows / Linux  
**Latest:** `v0.4.16`  
**Releases:** https://github.com/ValueCell-ai/ClawX/releases/tag/v0.4.16  

> Not to be confused with https://clawx.ai (social) or raw OpenClaw CLI-only installs.

---

## Mac Mini (Apple Silicon) — start here

```bash
# Download
curl -fL -o ~/Downloads/ClawX-0.4.16-mac-arm64.dmg \
  https://github.com/ValueCell-ai/ClawX/releases/download/v0.4.16/ClawX-0.4.16-mac-arm64.dmg

# Or from this repo:
bash scripts/download-clawx.sh   # picks arm64 on Apple Silicon

# Install + launch
open ~/Downloads/ClawX-0.4.16-mac-arm64.dmg
# Drag ClawX → Applications, then:
open -a ClawX
```

Intel Mac: use `ClawX-0.4.16-mac-x64.dmg` from the same release.

If Gatekeeper blocks:

```bash
xattr -cr /Applications/ClawX.app
open -a ClawX
```

---

## After launch

1. Complete the setup wizard  
2. **Settings → Models** → Ollama `http://127.0.0.1:11434` + optional Xiaomi MiMo  
3. **Settings → Voice** → MiniMax (or Kokoro) + Whisper  
4. Workspace → point at `robusca-brain` vault  
5. Run deps: `bash scripts/clawx-finish.sh`  

Guides: [CLAWX_FINISH.md](CLAWX_FINISH.md) · [OBSIDIAN_AGENTS.md](OBSIDIAN_AGENTS.md) · [VOICE_ASSISTANT_OS.md](VOICE_ASSISTANT_OS.md)

---

## All platforms (v0.4.16)

| Platform | File |
|---|---|
| macOS arm64 (M1/M2/M4 Mini) | [ClawX-0.4.16-mac-arm64.dmg](https://github.com/ValueCell-ai/ClawX/releases/download/v0.4.16/ClawX-0.4.16-mac-arm64.dmg) |
| macOS x64 | [ClawX-0.4.16-mac-x64.dmg](https://github.com/ValueCell-ai/ClawX/releases/download/v0.4.16/ClawX-0.4.16-mac-x64.dmg) |
| Windows | [ClawX-0.4.16-win-x64.exe](https://github.com/ValueCell-ai/ClawX/releases/download/v0.4.16/ClawX-0.4.16-win-x64.exe) |
| Linux AppImage | [ClawX-0.4.16-linux-x86_64.AppImage](https://github.com/ValueCell-ai/ClawX/releases/download/v0.4.16/ClawX-0.4.16-linux-x86_64.AppImage) |

Source (dev):

```bash
git clone https://github.com/ValueCell-ai/ClawX.git
cd ClawX && pnpm init && pnpm dev
```

---

*Cipher Tr@ce · Robusca · StudEx*

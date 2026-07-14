# Download ClawX / OpenClaw (Mac Mini + mobile)

**What you want:** the desktop/mobile assistant we’ve been wiring (Ollama, voice, vault).  
**Official product name:** **OpenClaw** (https://openclaw.ai)  
**Note:** https://clawx.ai is a separate “X for agents” social site — **not** the Mac app.

**Latest release:** `v2026.7.1` (2026-07)  
**Release page:** https://github.com/openclaw/openclaw/releases/tag/v2026.7.1

---

## Mac Mini / Mac (desktop) — do this

### Option A — one-liner installer (CLI + tooling)

```bash
curl -fsSL --proto '=https' --tlsv1.2 https://openclaw.ai/install.sh | bash
```

### Option B — Mac app (.dmg)

```bash
# From this repo on the Mac:
bash scripts/download-openclaw-mac.sh
# Opens ~/Downloads/OpenClaw-*.dmg — drag to Applications
```

Direct link:

https://github.com/openclaw/openclaw/releases/download/v2026.7.1/OpenClaw-2026.7.1.dmg

Or: https://openclaw.ai → **macOS** download card.

**Requires:** macOS 15+ · Universal Binary (Apple Silicon + Intel)

After install → run [CLAWX_FINISH.md](CLAWX_FINISH.md):

```bash
bash scripts/clawx-finish.sh
```

---

## Mobile

| Platform | Download |
|---|---|
| **Android** | https://github.com/openclaw/openclaw/releases/download/v2026.7.1/OpenClaw-Android.apk |
| **iOS** | Check https://openclaw.ai / App Store listing on the release notes (companion apps ship with each release) |
| **Windows companion** | `OpenClawCompanion-Setup-arm64.exe` / `x64` on the same [releases](https://github.com/openclaw/openclaw/releases/tag/v2026.7.1) page |

---

## After download

1. Open OpenClaw / ClawX  
2. Workspace → this vault (`robusca-brain`)  
3. Models → Ollama + optional MiMo  
4. Voice → MiniMax (or Kokoro) + Whisper  
5. Obsidian conversations → [OBSIDIAN_AGENTS.md](OBSIDIAN_AGENTS.md)  

Full product: [VOICE_ASSISTANT_OS.md](VOICE_ASSISTANT_OS.md)

---

*This cloud agent cannot install a .dmg on your Mac Mini — run the script there.*

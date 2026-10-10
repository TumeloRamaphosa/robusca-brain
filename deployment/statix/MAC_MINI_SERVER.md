# Mac mini home server — StudEx + Ollama + OpenHuman + LLM Wiki

Run the **inference + customer dashboard stack** on your Mac mini (`100.112.109.40` on Tailscale). Laptops and VMs connect over the tailnet.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Mac mini (home server)                                      │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────────┐ │
│  │ Ollama :11434│  │ StudEx :5180 │  │ LLM Wiki :19828    │ │
│  │ (brain)      │  │ (NestVM UI)  │  │ (Karpathy wiki)     │ │
│  └──────▲───────┘  └──────────────┘  └─────────────────────┘ │
│         │                                                    │
│  ┌──────┴───────┐                                           │
│  │ OpenHuman    │  desktop app — uses local Ollama           │
│  │ ~/.openhuman │  Memory Tree + Obsidian vault              │
│  └──────────────┘                                           │
└─────────────────────────────────────────────────────────────┘
          │ Tailscale (encrypted)
          ▼
   MacBook / Orgo VM / Windows — OLLAMA_HOST=http://100.112.109.40:11434
```

## One-shot setup (on the Mac mini)

```bash
git clone --depth 1 -b cursor/desktop-demo-statix-c65b \
  https://github.com/TumeloRamaphosa/robusca-brain.git ~/studex-nestvm

bash ~/studex-nestvm/deployment/statix/scripts/setup-mac-mini-server.sh
```

This installs Ollama, pulls `qwen2.5:3b` + `all-minilm:latest`, builds StudEx, and runs it on port **5180**.

## Fix OpenHuman (not working)

OpenHuman **does not use Ollama by default**. Local AI is opt-in.

### Quick fix (UI)

1. Install Ollama and pull models (setup script does this)
2. Open **OpenHuman** → **Settings** → **AI & Skills** → **Local AI**
3. Pick a preset (**"memory + reflection"** or **"everything local"**)
4. Confirm Ollama status shows **reachable**
5. **Restart OpenHuman**

### Config fix (advanced)

Merge [`config/openhuman-ollama.toml.example`](config/openhuman-ollama.toml.example) into `~/.openhuman/config.toml`, then restart OpenHuman.

### Diagnose

```bash
bash deployment/statix/scripts/openhuman-doctor.sh
```

Common failures:

| Symptom | Fix |
|---------|-----|
| "Ollama offline" in OpenHuman | Start Ollama app; `ollama serve` |
| Chat still uses cloud | Enable Local AI + set `chat_provider = "ollama:qwen2.5:3b"` |
| StudEx can't reach brain from laptop | On Mac mini: `OLLAMA_HOST=0.0.0.0:11434`, restart Ollama |
| Privacy mode blocks cloud fallback | Expected — need local models pulled |

## LLM Wiki ([nashsu/llm_wiki](https://github.com/nashsu/llm_wiki))

Karpathy-style compounding wiki — pairs with OpenHuman's Obsidian vault pattern.

1. Install from [Releases](https://github.com/nashsu/llm_wiki/releases) (`.dmg` on Mac)
2. **Settings** → LLM provider → **OpenAI-compatible** → `http://127.0.0.1:11434/v1`, model `qwen2.5:3b`
3. Enable **API + MCP** in Settings (local API on `127.0.0.1:19828`)
4. Import sources → wiki builds automatically

OpenHuman and LLM Wiki share the same Ollama brain on the Mac mini.

## StudEx as server (always on)

After setup, StudEx runs at:

- http://127.0.0.1:5180 — landing + dashboard
- http://127.0.0.1:5180/dashboard/demo — Ask Soul (Ollama)
- http://127.0.0.1:5180/api/health — health check

From another machine on Tailscale:

```bash
export OLLAMA_HOST=http://100.112.109.40:11434
cd deployment/statix && npm run talk
```

## Public URL (optional)

For `studex.studex-group.com`, use Orgo VM + Cloudflare Tunnel — see [CLOUDFLARE_WALKTHROUGH.md](./CLOUDFLARE_WALKTHROUGH.md).

The Mac mini is best as a **private inference + dev server** on Tailscale, not a public web host.

## Mac mini Sharing / remote access

If you enabled **Remote Login**, **Remote Management**, or **Remote Application Scripting** in System Settings → Sharing:

| Setting | Needed for server stack? |
|---------|--------------------------|
| **Remote Login (SSH)** | Yes — manage Mac mini from MacBook over Tailscale |
| **Remote Management** | Optional — GUI screen control only |
| **Remote Application Scripting** | No — skip unless you use AppleScript automation |
| **Tailscale** | Yes — primary secure remote path (prefer over public SSH) |

Full Riley + LLM Wiki + Obsidian wiring: **[RILEY_OBSIDIAN_WIKI.md](./RILEY_OBSIDIAN_WIKI.md)**

## Logs

| Service | Log |
|---------|-----|
| StudEx | `/tmp/studex.log` |
| Ollama | `/tmp/ollama-serve.log` or Ollama app |

Restart StudEx:

```bash
cd deployment/statix
pkill -f "node dist/server.js" || true
NODE_ENV=production node dist/server.js &
```

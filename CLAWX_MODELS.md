# ClawX Models — Xiaomi MiMo + Local Ollama

**Repo hub:** https://github.com/TumeloRamaphosa/robusca-brain  
**Updated:** 2026-07-14  
**Status:** Config scaffold only — **no API keys in this repo**

---

## Security

A Xiaomi MiMo API key was pasted into chat on 2026-07-14. **Not saved to disk.** Treat as burned.

1. Revoke at [platform.xiaomimimo.com/console/api-keys](https://platform.xiaomimimo.com/console/api-keys)
2. Create a new key
3. Say **“vault the new MiMo key”** — paste only into the secure form  
   Or put it in ClawX’s own local settings / `.env.local` on the Mac Mini — **never git, never chat**
4. See [KEY_ROTATION_CHECKLIST.md](KEY_ROTATION_CHECKLIST.md) item 9

---

## What this repo is

**robusca-brain** = shared brain for StudEx agents:

| Piece | Role |
|---|---|
| `SOUL.md` / `IDENTITY.md` / `USER.md` | Who we are + who Tumelo is |
| `CONNECTING_AGENTS.md` | Onboarding rules for sister agents |
| `memory/` + `MEMORY.md` | Continuity |
| `COMPOSIO_MESH.md` / `CLAWX_VOICE_MAC_MINI.md` | Tools + voice |
| This file | ClawX model routing (MiMo cloud + Ollama local) |

Other agents **clone this repo**, read `CONNECTING_AGENTS.md`, and sync memory here. They do **not** get raw keys from git.

---

## ClawX model stack (intended)

```
ClawX
  ├─ Cloud LLM ── Xiaomi MiMo (platform.xiaomimimo.com)
  │                 models: mimo-v2.5-pro, mimo-v2.5
  ├─ Local LLM ── Ollama (Mac Mini) — Qwen3 / whatever is pulled
  ├─ Voice TTS ── Kokoro-FastAPI :8880  (see CLAWX_VOICE_MAC_MINI.md)
  └─ Voice STT ── Whisper (local)
```

**Routing preference (default):**

1. **Local Ollama** — free, private, fast for routine / bulk
2. **Xiaomi MiMo** — cloud reasoning when local isn’t enough
3. Fallbacks already in [TOOLS.md](TOOLS.md): Claude / GPT / OpenRouter / Perplexity (vaulted)

---

## ClawX setup (Mac Mini — after download finishes)

### A. Local Ollama

```bash
# If not installed:
brew install ollama
ollama serve
ollama pull qwen3:8b    # or whatever size fits the Mini
# Optional larger:
# ollama pull qwen3:14b
```

In ClawX: **Settings → Models → Add Ollama**  
- Base URL: `http://localhost:11434` (or `http://127.0.0.1:11434/v1` if OpenAI-compat)  
- Model: the tag you pulled

### B. Xiaomi MiMo (cloud)

Console: https://platform.xiaomimimo.com/console/api-keys

In ClawX: **Settings → Models / Providers → Xiaomi MiMo** (or custom OpenAI-compatible if that’s how ClawX exposes it)

Env placeholder (local only — see [.env.example](.env.example)):

```bash
# .env.local on Mac Mini — NEVER commit
XIAOMI_MIMO_API_KEY=
# or whatever ClawX’s field name is, e.g. MIMO_API_KEY=
```

Do not paste the key into Cursor, Discord, Slack, or this repo.

### C. Voice (already documented)

[CLAWX_VOICE_MAC_MINI.md](CLAWX_VOICE_MAC_MINI.md) — Kokoro `:8880` + Whisper → ClawX Settings → Voice.

---

## Connecting other agents via this repo

```bash
git clone https://github.com/TumeloRamaphosa/robusca-brain.git
cd robusca-brain
# Read in order:
# 1. CONNECTING_AGENTS.md
# 2. SOUL.md / USER.md / IDENTITY.md
# 3. CLAWX_MODELS.md (this file) + COMPOSIO_MESH.md
# 4. memory/YYYY-MM-DD.md (today + yesterday)
```

Sister agents should:

1. Use vault handles — never commit `sk-…` keys  
2. Prefer Ollama for bulk; MiMo for hard reasoning  
3. Write session notes to `memory/YYYY-MM-DD.md`  
4. Follow [CONNECTING_AGENTS.md](CONNECTING_AGENTS.md) hard rules  

---

## Checklist

- [ ] ClawX downloaded / installed on Mac Mini  
- [ ] Ollama running + model pulled  
- [ ] MiMo key **rotated** (old chat key burned) and vaulted / in ClawX local settings only  
- [ ] ClawX Models: Ollama + MiMo both selectable  
- [ ] ClawX Voice: Kokoro + Whisper  
- [ ] New sister agent pointed at this repo’s `CONNECTING_AGENTS.md`  

---

*Cipher Tr@ce · Robusca · StudEx*

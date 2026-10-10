# StudEx OpenJarvis — Voice Setup

Run these on the **Mac Mini** (`projects-mac-mini` / `100.112.109.40`) where OpenJarvis is installed.  
This Cursor Cloud agent cannot reach that machine until Tailscale is approved.

Official docs: [Morning Digest](https://open-jarvis.github.io/OpenJarvis/user-guide/morning-digest/)

---

## What you need for voice

OpenJarvis speaks via **TTS**. Pick one:

| Backend | Sign up | Env var |
|---------|---------|---------|
| **Cartesia** (recommended — natural British voices) | https://play.cartesia.ai | `CARTESIA_API_KEY` |
| **OpenAI TTS** | https://platform.openai.com/api-keys | `OPENAI_API_KEY` |

Brain stays local (Ollama). Only speech synthesis hits the cloud.

---

## 1. Confirm OpenJarvis + Ollama

```bash
jarvis doctor
ollama list
# If no solid model yet:
ollama pull qwen3.5:9b
```

---

## 2. Load StudEx voice preset

```bash
# Option A — built-in mac preset, then edit
jarvis init --preset morning-digest-mac

# Option B — copy StudEx template from this repo
cp /path/to/robusca-brain/os/openjarvis/config.studex-voice.toml ~/.openjarvis/config.toml
```

Edit timezone / honorific if needed (template already uses `Asia/Dubai`).

---

## 3. Put the TTS key in the shell (do not commit it)

```bash
# Cartesia
export CARTESIA_API_KEY="sk_car_..."   # paste locally only

# OR OpenAI
export OPENAI_API_KEY="sk-..." 

# Persist for your user (zsh)
echo 'export CARTESIA_API_KEY="sk_car_..."' >> ~/.zshrc
source ~/.zshrc
```

If using OpenAI TTS, set in config:

```toml
tts_backend = "openai"
voice_id = "onyx"   # or nova / alloy / shimmer
```

---

## 4. Optional data connectors (richer briefing)

```bash
jarvis connect gdrive    # Gmail + Calendar + Tasks (one OAuth)
jarvis connect --list
```

Voice works without connectors — digest will just be thinner.

---

## 5. First spoken run

```bash
jarvis digest --fresh
```

You should hear Alistair (Cartesia) or Onyx (OpenAI).  
Say **"Good morning"** in `jarvis` chat to trigger digest again.

Text only (debug):

```bash
jarvis digest --fresh --text-only
```

---

## 6. StudEx schedule (Dubai mornings)

In `~/.openjarvis/config.toml`:

```toml
[digest]
schedule = "0 7 * * *"       # 07:00
timezone = "Asia/Dubai"
```

```bash
jarvis digest --schedule "0 7 * * *"
```

---

## 7. API for NestVM / War Room later

```bash
jarvis serve --host 0.0.0.0 --port 8000
```

- `GET /api/digest` — text  
- `GET /api/digest/audio` — MP3 stream  
- `POST /api/digest/generate` — force new  

Bind to Tailscale only in production; don’t expose publicly without auth.

---

## Voices that fit StudEx (Cartesia)

| Voice | ID | Feel |
|-------|-----|------|
| **Sterling** | `b134c304-d095-4d2b-a77a-914f5e8e84e7` | Deep, commanding (empire) |
| **Alistair** | `c8f7835e-28a3-4f0c-80d7-c1302ac62aae` | British butler (default Jarvis) |
| **Harrison** | `df89f42f-f285-4613-adbf-14eedcec4c9e` | Crisp professional |

StudEx template defaults to **Sterling**.

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| No audio | Key not exported; check Cartesia/OpenAI credits |
| Empty digest | `jarvis connect --list` — add gdrive or run `--text-only` first |
| Slow | Use `qwen3.5:4b` or ensure Ollama is warm |
| Wrong time | Set `timezone = "Asia/Dubai"` |

---

## Done when

1. `jarvis digest --fresh` plays audio on the Mini  
2. Key lives in env / keychain — never in git  
3. (Optional) `jarvis serve` reachable on Tailscale for portal integration  

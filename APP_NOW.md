# Put StudEx OS in an App — Use It Now (Phone + Discord + Voice)

**Short answer:** Yes — but **don’t wait for a branded native app**. Ship the OS through channels you already have, then wrap a thin app later.

**OS hub:** this vault = [robusca-brain](https://github.com/TumeloRamaphosa/robusca-brain)  
**Updated:** 2026-07-15

---

## Can we put the operating system in an app *now*?

| Approach | Ready now? | What you get |
|---|---|---|
| **Discord** (bot + `@ibbybuilds/discli`) | ✅ Fastest desk+phone | Talk to agents in a server/DM |
| **WhatsApp / Telegram** | ✅ Fastest pure phone | Voice notes + text → Mac Mini brain |
| **OpenClaw Android APK** | ✅ This week | Real mobile app shell |
| **ClawX (ValueCell)** | ⏳ Desktop only | Best GUI on Mac Mini — not phone |
| **OpenFang** | 🟡 Install if you want autonomous “Hands” | Discord/WhatsApp/Telegram adapters + scheduled agents |
| **Paperclip** | 🟡 Optional company/swarm layer | Multi-agent “company” orchestration — not your phone UI |
| **Voicebox** (Hermes / Claw-Voicebox) | 🟡 Add-on | STT→agent→TTS pipe for OpenClaw/Hermes |
| **Vapi** | ❌ Paid voice infra | Don’t need it — use free stack below |
| **StudEx branded PWA** | Later | Thin hold-to-talk app over your gateway |

**Rule:** One brain (Mac Mini: Ollama + vault + tools). Apps/channels are doors.

---

## Recommended path (do this order)

### 1. Discord — talk to agents today

```
Phone Discord app  →  Bot on Mac Mini  →  Ollama + robusca-brain
                                    →  Notion / Linear (when auth’d)
```

1. Create a Discord bot (Developer Portal) → vault the token (never chat)  
2. Invite bot to a private StudEx server  
3. Wire bot to OpenClaw / ClawX Channels **or** a simple gateway that reads the vault  
4. Also install CLI for agent ops: `npm i -g @ibbybuilds/discli`  

**You:** type or voice-message in Discord.  
**Agent:** reads Obsidian memory, replies, can open Linear/Notion tasks.

### 2. WhatsApp — same brain, better for voice notes

Link once (QR) via RileyJarvis / OpenClaw WhatsApp channel. Spec: [MOBILE_AGENTS.md](MOBILE_AGENTS.md).

### 3. OpenClaw Android — “an app” without building one

https://github.com/openclaw/openclaw/releases/download/v2026.7.1/OpenClaw-Android.apk  

Point it at your Mac Mini gateway (Tailscale). That’s your OS in a mobile app **now**.

### 4. ClawX — desktop command center (later / optional)

https://github.com/ValueCell-ai/ClawX — Electron UI for OpenClaw. Great on Mac Mini; **not** the phone path. [CLAWX_DOWNLOAD.md](CLAWX_DOWNLOAD.md)

---

## What about OpenFang / Paperclip / Voicebox / Vapi?

### OpenFang ([RightNow-AI/openfang](https://github.com/RightNow-AI/openfang))

- Agent **OS in Rust** with Discord, WhatsApp, Telegram, Slack adapters  
- “Hands” = scheduled autonomous workers (Clip, Lead, Browser…)  
- **Use when:** you want 24/7 autonomous jobs + many channels  
- **Don’t use as:** replacement for your vault — keep robusca-brain as memory; OpenFang as a runner  

### Paperclip

- Playbooks for **AI agent companies** / multi-agent orgs (Hermes etc.)  
- **Use when:** you want swarm/company structure on top of agents  
- **Not:** a consumer mobile chat app  

### Voicebox

- Projects like **Claw-Voicebox** / **hermes-voicebox**: STT → agent → TTS  
- **Use when:** you want OpenClaw/Hermes to speak without Vapi  
- Pairs with Whisper + MiniMax / Edge-TTS / Kokoro ([VOICE_ASSISTANT_OS.md](VOICE_ASSISTANT_OS.md))  

### Vapi (and free-ish substitutes)

| Need | Free / cheaper path |
|---|---|
| Phone voice bot | **WhatsApp voice notes** + Whisper + MiniMax |
| Real-time voice | **LiveKit Agents** / **Pipecat** (open) · Discord voice later |
| Hosted voice API | Vapi / Retell — only if you outgrow DIY |

**Don’t buy Vapi yet.** Your stack already covers speak/listen.

---

## “StudEx OS in an app” — architecture that works now

```
┌─────────────────────────────────────────┐
│  PHONE                                  │
│  Discord · WhatsApp · Telegram ·        │
│  OpenClaw Android · Obsidian Mobile     │
└──────────────────┬──────────────────────┘
                   │ Tailscale / tunnel
                   ▼
┌─────────────────────────────────────────┐
│  MAC MINI BRAIN                         │
│  Ollama (think) · Whisper (hear)        │
│  MiniMax / Kokoro (speak)               │
│  OpenClaw gateway (± ClawX desktop)     │
│  Optional: OpenFang Hands               │
└──────────────────┬──────────────────────┘
                   ▼
┌─────────────────────────────────────────┐
│  OS / MEMORY / WORK                     │
│  robusca-brain (Obsidian vault)         │
│  Notion CRM · Linear tasks · Composio   │
└─────────────────────────────────────────┘
```

---

## What to install this week (minimum)

| # | Install | Why |
|---|---|---|
| 1 | Ollama + Qwen3 on Mac Mini | Brain |
| 2 | Discord bot → OpenClaw/gateway | Talk from phone Discord |
| 3 | WhatsApp channel (QR) | Voice notes |
| 4 | OpenClaw Android APK | Native app shell |
| 5 | Vault clone + Git sync | Agents share Obsidian OS |
| — | ClawX desktop | Later |
| — | OpenFang | Optional autonomy |
| — | Paperclip | Optional swarm layer |
| — | Vapi | Skip |

Deps helper: `bash scripts/clawx-finish.sh`  
Phone guide: [MOBILE_AGENTS.md](MOBILE_AGENTS.md)

---

## How a conversation feels

1. Open **Discord** on phone → `#agents` or bot DM  
2. “Based on Obsidian memory, what’s unfinished?”  
3. Agent answers from vault  
4. “Make a Linear issue for that” → issue created  
5. Optional: WhatsApp voice note → spoken MiniMax reply  

That’s the OS — in the apps you already use.

---

*Cipher Tr@ce · Robusca · App = channels now, branded PWA later*

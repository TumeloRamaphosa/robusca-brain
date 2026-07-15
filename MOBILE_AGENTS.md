# Talk to Agents from Your Phone (Desktop later)

**Yes — skip ClawX desktop for now.** Phone-first is the faster path.  
**Rule:** Phone = thin client. Brain stays on Mac Mini (Ollama + vault + tools).  
**Updated:** 2026-07-15

---

## How you talk to agents on mobile

```
 YOU (phone)
   │  text / voice note / mic
   ▼
 Channel (WhatsApp · Telegram · OpenClaw Android · later PWA)
   │
   ▼
 Mac Mini gateway
   Whisper → Ollama → agents act (Notion/Linear) → MiniMax reply
   │
   ▼
 Phone gets text + optional voice note back
```

Same vault: [robusca-brain](https://github.com/TumeloRamaphosa/robusca-brain) · Obsidian Mobile can edit notes too ([OBSIDIAN_AGENTS.md](OBSIDIAN_AGENTS.md)).

---

## Option 1 — Ship this week (no new app): WhatsApp

Best UX you already know. Voice notes in → agent out.

| Step | What |
|---|---|
| 1 | Mac Mini runs the brain (Ollama + gateway / RileyJarvis / OpenClaw channel) |
| 2 | Link WhatsApp once (QR) |
| 3 | Message or voice-note the agent number/chat |
| 4 | Agent reads vault, acts (Notion/Linear when connected), replies |

**You say:** “What’s unfinished in today’s memory?” · “Add CRM follow-up in Notion” · “Create a Linear issue for checkout”

Spec: [VOICE_ASSISTANT_OS.md](VOICE_ASSISTANT_OS.md) · Mac deps: [CLAWX_FINISH.md](CLAWX_FINISH.md) (Ollama/Whisper still useful even without desktop UI)

---

## Option 2 — Also this week: Telegram

Same brain, Bot API.

1. Create a bot with @BotFather → token (vault only, never chat)  
2. Connect bot to Mac Mini gateway / OpenClaw Telegram channel  
3. DM the bot from your phone  

Good for: notifications + quick commands when WhatsApp is noisy.

---

## Option 3 — Real mobile app soon: OpenClaw Android

Official APK (companion to the same stack):

https://github.com/openclaw/openclaw/releases/download/v2026.7.1/OpenClaw-Android.apk

```bash
# On phone: download APK → install (allow unknown sources)
# Point app at your Mac Mini gateway (Tailscale / public HTTPS tunnel)
```

**iPhone:** use WhatsApp/Telegram until iOS build is on App Store / TestFlight (check [openclaw.ai](https://openclaw.ai) / release notes). Obsidian Mobile still works for notes.

ClawX (ValueCell) is **desktop Electron** — not your phone app. Desktop can wait.

---

## Option 4 — Custom StudEx mobile app (later)

Thin **PWA or Expo** app that only:

1. Hold-to-talk / text box  
2. Sends to `https://your-gateway/...` (Mac Mini behind Tailscale or Cloudflare Tunnel)  
3. Shows agent reply + plays MiniMax audio  
4. Deep-links into Notion/Linear task cards  

**Do not** put MiniMax / MiMo / Composio keys in the app — session token only.

Phases:

| Phase | Deliverable |
|---|---|
| A | WhatsApp voice ↔ Mac Mini brain live |
| B | Telegram + Obsidian Mobile vault sync |
| C | OpenClaw Android against your gateway |
| D | StudEx PWA (branded, black & gold) |

---

## What runs on the Mac Mini (always-on brain)

Even with phone-only UX, keep this online:

```bash
# Brain
ollama serve && ollama pull qwen3:8b

# Optional voice deps
bash scripts/clawx-finish.sh   # Whisper + Kokoro fallback

# Gateway / WhatsApp link — RileyJarvis or OpenClaw channel
# (ClawX desktop optional — OpenClaw gateway can run headless)
```

Expose safely to phone:

- **Tailscale** (best) — phone + Mini on same mesh, no public ports  
- or **Cloudflare Tunnel** — HTTPS to gateway only  

---

## Example phone conversations

| You (WhatsApp) | Agent does |
|---|---|
| “Brief me from Obsidian memory” | Reads `memory/` → short reply |
| “Log that in Notion CRM” | Creates/updates CRM row |
| “Linear: fix cart abandonment” | Creates issue |
| Voice note of a meeting dump | Whisper → summary → memory + Notion |

Agents stay grounded in the vault ([OBSIDIAN_AGENTS.md](OBSIDIAN_AGENTS.md)).

---

## Decide now

| Want | Do |
|---|---|
| Fastest talk-to-agents | **WhatsApp** → Mac Mini |
| Second channel | **Telegram** bot |
| Native Android UI | Install **OpenClaw APK** |
| Branded StudEx app | Phase D PWA (after A–C) |
| ClawX desktop | Later — [CLAWX_DOWNLOAD.md](CLAWX_DOWNLOAD.md) |

---

## Checklist (mobile-first)

- [ ] Mac Mini: Ollama up + vault cloned  
- [ ] WhatsApp linked to gateway / RileyJarvis  
- [ ] Send test text + voice note → get reply  
- [ ] Auth Notion + Linear when ready for actions  
- [ ] Optional: OpenClaw Android APK  
- [ ] Optional later: ClawX desktop + StudEx PWA  

---

*Cipher Tr@ce · Robusca · Phone first, desktop later*

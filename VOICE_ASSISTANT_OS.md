# Voice Assistant OS — MiniMax Speak + Ollama Think + Agents Act

**Goal:** You speak on **mobile or desktop** → agents stay on task → update **Notion / Linear** → reply by voice.  
**Stack:** Whisper (hear) · **Ollama** (think) · **MiniMax** (speak) · Composio/MCP (act)  
**Hub:** https://github.com/TumeloRamaphosa/robusca-brain  
**Updated:** 2026-07-14

---

## Yes — this is the intended product shape

```
 YOU (phone / desktop / ClawX / WhatsApp)
        │  speak
        ▼
   Whisper STT  ─────────────────────────────┐
        │                                    │
        ▼                                    │
   Ollama (Qwen3)  ── local brain ───────────┤
        │                                    │
        ├─ task router / professional workflows
        │                                    │
        ├─► Notion   (CRM, notes, briefs)    │  via Composio / Notion MCP
        ├─► Linear   (issues, sprints)       │  via Linear MCP / Composio
        ├─► Slack / GitHub / Sheets / Stripe │  via Composio
        │                                    │
        ▼                                    │
   MiniMax TTS  ◄──── spoken reply ──────────┘
```

| Layer | Tech | Role |
|---|---|---|
| **Hear** | Whisper (local) or device STT | Speech → text |
| **Think** | **Ollama** (Qwen3 on Mac Mini) | Intent, planning, draft replies |
| **Speak** | **MiniMax** TTS (cloud) | Text → natural voice (primary) |
| **Speak fallback** | Kokoro `:8880` | Offline / free local TTS |
| **Act** | Composio + Notion MCP + Linear MCP | Update CRM / tasks / issues |
| **Memory** | robusca-brain `memory/` + Notion | Continuity across agents |
| **Surfaces** | ClawX desktop · WhatsApp · Telegram · PWA mobile | Same brain, many clients |

MiniMax is already in the StudEx vault map as `custom-cred:api.minimax.io` (video/audio). Use it for **voice out**; keep Ollama for **reasoning** so you don’t burn cloud tokens on every turn.

---

## Surfaces — mobile + desktop

| Surface | Device | How you speak | How agents act |
|---|---|---|---|
| **ClawX** | Mac Mini / desktop | Mic → Whisper → Ollama → MiniMax reply | Tools in-process + Composio |
| **RileyJarvis WhatsApp** | Phone | Voice notes | Same Mac Mini brain |
| **Telegram** | Phone | Voice / text | Notifications + DMs |
| **PWA / future app** | Phone + desktop | Hold-to-talk → API to Mac Mini gateway | Same agent runtime |
| **Cursor / sister agents** | Desktop | Text | Clone this repo + MCP |

**Rule:** One brain (Mac Mini gateway: Ollama + tools). Clients are thin — mic in, audio/text out. Don’t run separate brains per phone.

### Mobile-first path (ship now)

1. WhatsApp voice note → RileyJarvis / ClawX on Mac Mini  
2. Whisper → Ollama → act on Notion/Linear  
3. MiniMax TTS audio (or text) back to WhatsApp  

### Desktop path (ship now)

1. ClawX hold-to-talk  
2. Same pipeline  
3. MiniMax speaks the answer  

### Native mobile app (phase 2)

Thin React Native / Expo or PWA that:

- Streams audio to Mac Mini `/v1/voice` gateway  
- Shows task cards (Linear/Notion status)  
- Plays MiniMax audio reply  

Do **not** put API keys in the mobile app — only a session token to your gateway.

---

## Professional workflows (assistants that stay on task)

Voice phrases → structured actions. Ollama classifies intent; tools execute; MiniMax confirms verbally.

| You say | Agent does | System |
|---|---|---|
| “Add Tumelo follow-up to Notion CRM — call Thursday” | Create/update CRM row | Notion |
| “Create a Linear issue: fix checkout abandonment” | Create issue in eng project | Linear |
| “What’s blocked on Linear this week?” | Query open blockers → summarize | Linear |
| “Move that task to In Progress and assign Hermes” | Update status + assignee | Linear |
| “Log today’s StudEx brief in Notion” | Append daily page | Notion |
| “Slack #sales — auction closes Friday” | Post message | Slack via Composio |
| “Keep me on Father’s Day campaign” | Check War Room / Notion checklist → next actions | Notion + memory |

### Assistant operating rules

1. **Confirm before irreversible** — posting public, charging Stripe, deleting tasks  
2. **Stay on task** — one active workflow thread per voice session; don’t wander  
3. **Write it down** — every material decision → Notion or Linear (never “mental notes”)  
4. **Reply short** — spoken answers ≤ 2 sentences; details land in Notion/Linear  
5. **Role clarity** — Robusca orchestrates; specialists (Hermes, Naledi, CashClaw) get routed work  

---

## ClawX wiring (MiniMax speak + Ollama think)

### Models

- **Primary:** Ollama `qwen3:8b` @ `http://127.0.0.1:11434` (no `/v1`)  
- **Cloud boost (optional):** Xiaomi MiMo / Claude — hard reasoning only  

### Voice

| Direction | Engine |
|---|---|
| STT | Whisper (local) |
| TTS **primary** | **MiniMax** (vault key `custom-cred:api.minimax.io`) |
| TTS fallback | Kokoro-FastAPI `http://127.0.0.1:8880/v1` |

ClawX: **Settings → Voice → STT = Whisper · TTS = MiniMax** (or custom TTS URL if ClawX exposes MiniMax / OpenAI-compatible speech).

Env placeholders (local only — [.env.example](.env.example)):

```bash
MINIMAX_API_KEY=          # vault / ClawX secrets — never chat
OLLAMA_HOST=http://127.0.0.1:11434
```

### Actions

1. Authenticate **Notion** + **Linear** MCP in Cursor / ClawX (both currently `needsAuth` in cloud)  
2. Connect same apps in **Composio** for natural-language tools  
3. Prefer Linear for eng/ops tasks; Notion for CRM + briefs + knowledge  

---

## Architecture (one gateway)

```
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│  Mobile WA   │   │  ClawX Desk  │   │  Telegram    │
└──────┬───────┘   └──────┬───────┘   └──────┬───────┘
       │                  │                  │
       └────────────┬─────┴──────────────────┘
                    ▼
         ┌─────────────────────┐
         │  Mac Mini Gateway   │
         │  Whisper → Ollama   │
         │  → Tools → MiniMax  │
         └──────────┬──────────┘
                    │
     ┌──────────────┼──────────────┐
     ▼              ▼              ▼
  Notion         Linear        Composio
  (CRM/docs)     (tasks)     (Slack/GH/…)
     │              │
     └──────┬───────┘
            ▼
     robusca-brain memory/
```

---

## Build sequence (finish this)

### Phase A — Desktop voice assistant (this week)

1. [ ] Finish [CLAWX_FINISH.md](CLAWX_FINISH.md) (Ollama + Whisper)  
2. [ ] Set ClawX TTS → **MiniMax** (vault key); keep Kokoro as offline fallback  
3. [ ] Auth Notion MCP + Linear MCP  
4. [ ] Smoke: speak “create a Linear test issue” → issue appears → MiniMax confirms  

### Phase B — Mobile via WhatsApp (same week)

1. [ ] RileyJarvis / ClawX WhatsApp linked  
2. [ ] Voice notes use same gateway  
3. [ ] Notion CRM + Linear updates from phone  

### Phase C — Professional workflow pack

1. [ ] Notion DBs: CRM · Daily Brief · Content Approvals  
2. [ ] Linear teams: StudEx Meat · Global Markets · Platform  
3. [ ] Voice playbooks in `skills/` (create-issue, update-crm, morning-brief)  
4. [ ] N8N watches Linear/Notion for follow-ups  

### Phase D — Thin mobile/desktop app (later)

1. [ ] PWA hold-to-talk → gateway  
2. [ ] Task inbox UI (Linear + Notion)  
3. [ ] No keys on client  

---

## Related

- [CLAWX_FINISH.md](CLAWX_FINISH.md) — install now  
- [COMPOSIO_MESH.md](COMPOSIO_MESH.md) — action layer  
- [CONNECTING_AGENTS.md](CONNECTING_AGENTS.md) — sister agents  
- [SETUP_STATUS.md](SETUP_STATUS.md) — overall checklist  

---

*Cipher Tr@ce · Robusca · StudEx · Professional voice workflows*

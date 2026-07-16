# Obsidian ↔ Agents — Conversations on the Vault

**Yes.** This repo **is** the Obsidian vault. Agents and you talk *about* and *into* the same notes.

**Vault:** https://github.com/TumeloRamaphosa/robusca-brain  
**Setup:** [OBSIDIAN_SETUP.md](OBSIDIAN_SETUP.md)  
**Voice product:** [VOICE_ASSISTANT_OS.md](VOICE_ASSISTANT_OS.md)  
**Updated:** 2026-07-14

---

## How it works

```
 YOU (Obsidian Desktop / Mobile / ClawX / WhatsApp / Cursor)
        │  ask / speak / type
        ▼
   Agent (Ollama / MiMo / Claude)
        │  reads vault context
        ▼
   Obsidian notes (this repo)
        │  memory/ · strategy · skills · tasks
        ▼
   Agent replies (+ optional MiniMax voice)
        │
        ▼
   Writes back → memory/YYYY-MM-DD.md  (and Notion/Linear when needed)
```

| Role | Who |
|---|---|
| **Human notes** | You in Obsidian |
| **Agent notes** | `memory/YYYY-MM-DD.md`, task logs |
| **Shared truth** | Git-synced vault (Obsidian Git plugin) |
| **Conversation** | ClawX / Cursor / Obsidian Copilot / WhatsApp → same vault |

---

## Conversation surfaces (pick what you use)

### 1. ClawX (recommended with voice)

1. Point ClawX **workspace** at this vault folder  
2. Models: Ollama (local) + optional MiMo  
3. Voice: Whisper in · MiniMax out ([VOICE_ASSISTANT_OS.md](VOICE_ASSISTANT_OS.md))  
4. Ask: *“What’s in today’s memory?”* · *“Summarize Father’s Day plan from content/”* · *“Add a follow-up note”*

ClawX finish: [CLAWX_FINISH.md](CLAWX_FINISH.md)

### 2. Obsidian + Copilot / Smart Connections (in-app chat)

1. Open vault in Obsidian ([OBSIDIAN_SETUP.md](OBSIDIAN_SETUP.md))  
2. Install community plugin: **Copilot** (or Smart Connections)  
3. Point plugin LLM at **Ollama** `http://127.0.0.1:11434`  
4. Chat *inside* Obsidian with `@vault` / note context  

Best for: reading/writing notes without leaving Obsidian.

### 3. Cursor / sister agents (already how Robusca works)

Agents clone this repo and follow [CONNECTING_AGENTS.md](CONNECTING_AGENTS.md):

```
Read SOUL.md → USER.md → memory/(today+yesterday) → answer from vault
```

### 4. Mobile (Obsidian Mobile + WhatsApp)

- **Obsidian Mobile** + Working Copy / Git plugin — edit notes on phone  
- **WhatsApp voice** → Mac Mini agent → reads vault → replies → can append `memory/`  

Same brain; phone is just another door.

---

## What agents should read for a vault conversation

| Priority | Path | Why |
|---|---|---|
| 1 | `SOUL.md` `USER.md` `IDENTITY.md` | Who we are |
| 2 | `memory/YYYY-MM-DD.md` (today + yesterday) | Recent context |
| 3 | `MEMORY.md` | Long-term (main session only) |
| 4 | `STUDEX_OS.md` `COMPOSIO_MESH.md` | Ops + tools |
| 5 | Relevant project notes (`studex/`, `content/`, `deployment/`) | Topic depth |

Quick search from terminal (Mac Mini / agents):

```bash
bash scripts/vault-chat-context.sh "fathers day"
# or
bash scripts/vault-chat-context.sh "Linear Notion CRM"
```

---

## Conversation rules (professional)

1. **Ground in notes** — prefer vault facts over invention; say when something isn’t in the vault  
2. **Write it down** — decisions → `memory/YYYY-MM-DD.md` (and Notion/Linear for tasks)  
3. **No secrets in notes** — keys stay vaulted; Obsidian is syncable/shareable  
4. **Stay on task** — one thread; link to Linear/Notion when work is actionable  
5. **You approve public content** — agents draft in vault; you approve before post  

Example voice/chat turns:

- “Based on our Obsidian memory, what’s unfinished from yesterday?”  
- “Open the StudEx OS note and draft tomorrow’s brief into memory.”  
- “Create a Linear issue from the blockers I wrote in today’s note.”  
- “Summarize `content/` Father’s Day plan in 5 bullets, then speak it.”  

---

## Wire-up checklist

- [ ] Obsidian Desktop/Mobile opens this repo as vault ([OBSIDIAN_SETUP.md](OBSIDIAN_SETUP.md))  
- [ ] Git plugin pulling/pushing  
- [ ] ClawX workspace = vault path **or** Obsidian Copilot → Ollama  
- [ ] Agents use `scripts/vault-chat-context.sh` / session startup reads  
- [ ] Optional: Notion/Linear for tasks that leave the vault ([VOICE_ASSISTANT_OS.md](VOICE_ASSISTANT_OS.md))  

---

## Folder map (what you’ll chat about)

| Folder | Contents |
|---|---|
| `memory/` | Daily agent + human logs |
| `os/` | War Room, agents, tasks |
| `content/` | Ready-to-post assets |
| `skills/` | Agent skills |
| `studex/` | Strategy, approvals |
| `deployment/` | Brand + integrations |
| Root `*.md` | OS, soul, mesh, ClawX, voice |

---

*Cipher Tr@ce · Robusca · StudEx — talk to your vault*

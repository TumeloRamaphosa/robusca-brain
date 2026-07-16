# Riley + LLM Wiki + Obsidian — Mac mini brain stack

Your Obsidian vault **StudEx Cognitive System** (`Dark Factory/Riley Voice`) is Riley's **persona + voice script**.  
**LLM Wiki** is the **compounding memory engine** (ingest → wiki pages → never re-derive from scratch).  
**Obsidian** is how **you** browse and edit what Riley remembers.

## How the three fit together

```
┌──────────────────────────────────────────────────────────────────┐
│  StudEx Cognitive System  (Obsidian vault on Mac mini)            │
│                                                                   │
│  Dark Factory/Riley Voice.md  ← Riley's voice, tone, Soul scripts  │
│  wiki/                      ← LLM Wiki output ([[wikilinks]])     │
│  raw/sources/               ← PDFs, docs LLM Wiki ingests         │
│  memory/                    ← daily agent logs                    │
└──────────────────────────────────────────────────────────────────┘
         ▲                              ▲
         │ reads persona                │ reads + writes wiki
         │                              │
┌────────┴────────┐            ┌────────┴────────┐
│ Riley (voice)   │            │ LLM Wiki app    │
│ RileyJarvis /   │──Ollama───▶│ :19828 API      │
│ OpenHuman TTS   │  :11434    │ ingest + chat   │
└─────────────────┘            └─────────────────┘
```

| Piece | Job |
|-------|-----|
| **Riley Voice** (Obsidian note) | Who Riley sounds like, what Soul says, Dark Factory context |
| **LLM Wiki** | Turns documents into linked wiki pages; hybrid search; local API |
| **Obsidian vault** | Human view of the same markdown — graph, edit, approve |
| **Ollama** (Mac mini) | Shared brain for Riley chat, LLM Wiki ingest, StudEx, OpenHuman |

**Yes — you can give Riley the memory of LLM Wiki and the Obsidian brain.** Riley speaks; LLM Wiki remembers; Obsidian is the readable vault.

---

## Setup on Mac mini (one vault)

### 1. Point LLM Wiki at your Obsidian vault

In **LLM Wiki** → create/open project → set project folder to your vault (or a subfolder):

```
~/Documents/StudEx Cognitive System
```

LLM Wiki is **Obsidian-compatible** — its `wiki/` and `raw/` layout works as a vault. Your `Dark Factory/Riley Voice.md` stays alongside generated pages.

### 2. LLM Wiki LLM settings

- Provider: **OpenAI-compatible**
- Base URL: `http://127.0.0.1:11434/v1`
- Model: `qwen2.5:3b` (or larger if RAM allows)
- Enable **API + MCP** (Settings) → `http://127.0.0.1:19828`

### 3. Riley voice (choose one path)

**Path A — OpenHuman (fastest today)**  
- Install OpenHuman on Mac mini  
- Enable **Local AI** + Ollama (see [MAC_MINI_SERVER.md](./MAC_MINI_SERVER.md))  
- Copy key lines from `Dark Factory/Riley Voice.md` into OpenHuman persona / Soul  
- OpenHuman Memory Tree + `~/.openhuman/wiki/` can mirror or symlink to StudEx Cognitive System  

**Path B — RileyJarvis (animated face)**  
- Clone [rileyjarvis](https://github.com/rbrown101010/rileyjarvis) on Mac mini  
- Point realtime/LLM at `http://127.0.0.1:11434/v1`  
- System prompt: load content from `Dark Factory/Riley Voice.md`  
- Optional: MCP to LLM Wiki API for `POST /api/v1/projects/{id}/search` before each reply  

**Path C — StudEx Soul (browser voice)**  
- StudEx onboarding already speaks Soul scripts  
- `npm run demo` on Mac mini → voice at `/onboarding`  
- Wire Riley Voice.md text into StudEx Soul copy when you fork the voice layer  

### 4. Ingest → remember everything

1. Drop PDFs/docs into `raw/sources/` (or LLM Wiki Sources tab)  
2. LLM Wiki builds `wiki/` pages with `[[wikilinks]]`  
3. Open same folder in Obsidian → graph view shows Riley's growing brain  
4. Riley/OpenHuman queries via LLM Wiki chat or API search — answers use stored wiki, not one-off RAG  

---

## Mac mini Sharing settings — what you need

From your screenshot (Remote Management, Remote Login, Remote Application Scripting ON):

| Setting | Need it? | Why |
|---------|----------|-----|
| **Remote Login (SSH)** | **Yes — recommended** | Terminal access from MacBook: `ssh user@100.112.109.40` (Tailscale). Deploy StudEx, tail logs, restart Ollama. |
| **Remote Management** | **Optional** | Full Apple Remote Desktop admin. Screen Sharing is tied to this. Useful for GUI debugging, not required for the server stack. |
| **Remote Application Scripting** | **Optional** | Only if you automate Mac apps with AppleScript. Skip for now. |
| **Screen Sharing** | **Optional** | See OpenHuman / LLM Wiki UI remotely. Tailscale + SSH is enough for server ops. |
| **File Sharing** | **Optional** | Use git or Syncthing for vault sync instead. |
| **Tailscale** | **Yes — primary remote path** | Encrypted access without opening Mac to the public internet. Prefer this over exposing SSH to the world. |

**Bottom line:** For **StudEx + Ollama + LLM Wiki as a server**, you need:

1. **Tailscale** on Mac mini (already on `100.112.109.40`)  
2. **Remote Login** if you want SSH from your laptop  
3. **Ollama** listening on `0.0.0.0:11434` for tailnet clients  

You do **not** need Remote Management or Remote Application Scripting for the brain stack to work.

---

## Quick verify (Mac mini)

```bash
# Brain
curl http://127.0.0.1:11434/api/tags

# StudEx dashboard
curl http://127.0.0.1:5180/api/health

# LLM Wiki API (when app is running)
curl http://127.0.0.1:19828/api/v1/health

# OpenHuman + Ollama
bash deployment/statix/scripts/openhuman-doctor.sh
```

From MacBook over Tailscale:

```bash
ssh youruser@100.112.109.40
export OLLAMA_HOST=http://100.112.109.40:11434
```

---

## Dark Factory / Riley Voice note

Keep `Dark Factory/Riley Voice.md` as the **source of truth** for:

- Voice tone (Soul, Riley, Naledi)  
- Opening lines for onboarding  
- What Riley should say when wiki ingest completes  
- Links to `[[wiki/entities/...]]` pages Riley should reference  

When LLM Wiki adds new entity pages, Riley's answers improve automatically because search hits the wiki — not because you re-prompt from scratch.

---

## Next build step (code)

- [ ] RileyJarvis fork: load `Dark Factory/Riley Voice.md` as system prompt  
- [ ] StudEx Soul: sync voice strings from Obsidian vault path  
- [ ] MCP skill: LLM Wiki `search` + `chat` tools for OpenHuman / Riley  
- [ ] Git sync: StudEx Cognitive System vault ↔ robusca-brain repo  

See [NESTVM_AGENT_SAAS_PLAN.md](../NESTVM_AGENT_SAAS_PLAN.md) for full NestVM Agent architecture.

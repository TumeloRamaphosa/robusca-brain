# Chat and Voice Surfaces

Status: planning artifact  
Parent system: Robusca Command OS  
Purpose: define how ClickClack, Discord, Telegram, Slack, voice calls, store voice, local voice, and RAG memory connect into one system

---

## 1. Answer

Yes: all chat and voice functionality can be unified through ClickClack, but ClickClack should be the command radio and transcript surface, not the only brain.

Best architecture:

```text
Discord / Telegram / Slack / ClickClack / Store Voice / Desktop Voice / Mobile Voice
-> Command API
-> Identity + policy + approval
-> Agent router
-> RAG + memory router
-> Tool router
-> ClickClack summary and audit trail
-> Obsidian / LLM-wiki / Tencent memory writeback
```

ClickClack becomes:

- primary internal chat
- agent room system
- meeting summary stream
- approval card surface
- daily routine feed
- transcript/audit pointer surface

It should not bypass:

- Command API
- approval engine
- memory namespace rules
- tool safety policies

---

## 2. Surfaces

| Surface | Best use | Live audio? | Memory/RAG writeback |
| --- | --- | --- | --- |
| ClickClack | internal command radio, agent rooms, approvals | planned via web voice / LiveKit | yes |
| Discord | quick live voice rooms and community/team calls | yes | yes, through bot/transcript |
| Telegram | mobile voice notes, commands, alerts | voice notes; limited live calls | yes |
| Slack | business messages, huddle summaries, alerts | huddles are possible but bot live-audio is limited | yes |
| Desktop app | Robusca voice orb, local command | yes | yes |
| Mobile app | push-to-talk, approvals, offline notes | yes | yes |
| Store widget | customer product/order voice | yes | filtered/safe summary only |
| Phone line | customer phone calls | later; usually paid | filtered/safe summary only |

---

## 3. ClickClack role

ClickClack should host:

```text
#general
#strategy
#content
#devops
#meat-store
#finance
#meeting-memory
#daily-closeout
#voice-calls
#store-voice
#approvals
#device-mesh
```

Each external surface posts into ClickClack as a normalized event:

```json
{
  "source": "telegram|discord|slack|clickclack|desktop|mobile|store",
  "agent": "Robusca|Naledi|Auto-Meat|Hermes|CashClaw|Meeting-Memory",
  "business": "studex-meat",
  "event_type": "message|voice_note|live_call|meeting|approval|tool_result",
  "summary": "",
  "transcript_uri": "",
  "memory_status": "queued|captured|rejected",
  "approval_required": true
}
```

---

## 4. Voice provider stack

Default low-cost stack:

```text
Pipecat + LiveKit + local STT + local TTS + Ollama/MLX + Command API
```

Provider roles:

| Layer | Recommended |
| --- | --- |
| live browser/mobile audio | LiveKit |
| fast prototype audio | Pipecat WebSocket |
| STT local | faster-whisper / whisper.cpp |
| STT cloud optional | Google Speech-to-Text / Gemini route after approval |
| TTS local | Kokoro / Piper / macOS voices |
| TTS polished optional | ElevenLabs after approval |
| model local | Ollama / MLX |
| model cloud optional | Gemini / Google AI Studio / MiniMax / others through Command API |

Kokoro note:

- Kokoro is **text-to-speech**, not speech-to-text.
- Use Kokoro for local voice output.
- Use Whisper/faster-whisper/whisper.cpp for local speech-to-text.

Google note:

- Google can provide Speech-to-Text and Gemini model routes.
- Use server-side keys only.
- Sensitive material defaults to local route unless Tumelo approves cloud routing.

---

## 5. Fully local mode

Fully local means no paid voice provider, no cloud model, no external STT/TTS.

Flow:

```text
Microphone
-> local VAD
-> local STT
-> Command API on Mac Mini
-> local RAG over Obsidian/ChromaDB/SQLite
-> local Ollama/MLX model
-> local TTS
-> audio response
-> local Obsidian + Tencent memory capture
```

Works for:

- desktop voice
- mobile on same Tailscale network
- War Room on local network
- internal agent calls
- private meeting summaries

Limitations:

- phone numbers still require SIP/PSTN provider if customers call a real number
- local models may be slower/lower quality than cloud models
- mobile-local models are small and best for notes/drafts, not heavy reasoning

---

## 6. Hybrid low-cost internet mode

Hybrid mode uses local first, cloud only when useful:

```text
Local STT/TTS/model if available
-> fallback to cloud STT/TTS/model only by policy
-> all routes through Command API
-> all memory writes tagged by source and model route
```

Routing examples:

| Scenario | Default route |
| --- | --- |
| private meeting | local STT + local model + local TTS |
| store customer asks product question | local or low-cost API model, no private memory |
| complex strategy brief | local RAG + approved stronger API model |
| mobile offline note | phone-local small model or queued transcript |
| public content narration | Kokoro/Piper draft, ElevenLabs if approved |

---

## 7. Discord, Telegram, Slack integration

### Discord

Use for:

- live War Room tests
- voice channel meetings
- community/team rooms

Flow:

```text
Discord bot joins voice
-> records/transcribes with consent
-> Command API
-> RAG/agents
-> reply by text or audio
-> summary to ClickClack
```

### Telegram

Use for:

- mobile voice notes
- quick commands
- alerts and approvals

Flow:

```text
Telegram voice note
-> bot downloads audio
-> STT
-> Command API
-> agent/RAG
-> response as text/audio
-> summary to ClickClack
```

### Slack

Use for:

- business messages
- approvals and summaries
- huddle summary ingestion where possible

Flow:

```text
Slack message/command
-> Command API
-> agent/RAG/tool route
-> response to Slack
-> normalized summary to ClickClack
```

---

## 8. RAG learning loop

Every chat or voice interaction becomes a candidate memory event.

```text
Conversation
-> transcript/summary
-> classify business + visibility
-> extract decisions/tasks/entities
-> human/policy review
-> Obsidian note
-> LLM-wiki update
-> Tencent memory capture
-> vector/BM25 index update
-> future retrieval
```

Memory write policy:

- raw transcripts stay private by default
- approved summaries go into Obsidian
- curated turns go into Tencent memory
- source citations are preserved
- business namespaces are mandatory
- agents can propose memory writes, but Command API applies policy

---

## 9. Obsidian ghost brain

The “Obsidian ghost brain” should be:

```text
Obsidian vault
-> LLM-wiki synthesized pages
-> Bases for dashboards
-> Canvas for maps
-> daily notes
-> decisions
-> meetings
-> tasks
-> sources
```

Obsidian Skills to use:

- obsidian-markdown
- obsidian-bases
- json-canvas
- obsidian-cli
- defuddle

Outputs:

```text
memory/YYYY-MM-DD.md
memory/business/<business>/meetings/
memory/business/<business>/decisions/
memory/business/<business>/tasks/
memory/business/<business>/sources/
memory/business/<business>/bases/
memory/business/<business>/canvas/
```

---

## 10. Subagents to plan and build

Yes, use specialist subagents for planning and implementation.

Recommended subagents:

| Subagent | Mission |
| --- | --- |
| Voice Architect | Pipecat/LiveKit/Kokoro/Whisper pipeline and voice UX |
| RAG Architect | Obsidian, LLM-wiki, ChromaDB/Qdrant, BM25, Tencent memory |
| App Architect | mobile/desktop shell, offline mode, Tailscale discovery |
| Store Voice Architect | Auto-Meat voice ordering, Shopify cart/checkout, safety |
| ClickClack Integrator | bot channels, bridges, normalized events |
| Security Architect | consent, secrets, auth, abuse, PII, payments |
| Frontend Designer | command-glass UI, mobile cockpit, voice screens |
| Infrastructure Architect | Mac Mini, Orgo, Tailscale, services, backups |

Build sequence:

1. Voice Architect defines local Pipecat WebSocket MVP.
2. RAG Architect defines memory schema and retrieval.
3. App Architect defines desktop/mobile shell.
4. ClickClack Integrator defines channels/events.
5. Store Voice Architect defines safe order flow.
6. Security Architect reviews before any customer-facing launch.
7. Frontend Designer turns flows into UI.
8. Infrastructure Architect deploys Mac Mini/Orgo services.

---

## 11. Can all chat functionality go into ClickClack?

Yes, as the **central internal chat surface**.

ClickClack can collect:

- Discord meeting summaries
- Telegram voice-note summaries
- Slack command results
- store voice handoffs
- desktop/mobile voice transcripts
- agent tool results
- approvals
- daily routines
- memory writeback notices

But ClickClack should not become the policy engine or database of record.

System of record:

| Record type | Source of truth |
| --- | --- |
| messages/summaries | ClickClack |
| approvals/actions | Command API / operational DB |
| memory | Obsidian + Tencent memory + RAG indexes |
| customer orders | Shopify |
| tasks | Linear/Notion/Command DB |
| files/artifacts | storage vault |


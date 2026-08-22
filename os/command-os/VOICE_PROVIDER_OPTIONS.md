# Voice Provider Options

Status: planning artifact  
Purpose: choose a low-cost/local-first voice stack for Robusca Command OS instead of depending on paid VAPI by default

---

## 1. Recommendation

Use a local-first voice stack as the default:

```text
Pipecat + LiveKit + local STT + local TTS + Ollama/MLX + Command API
```

Keep VAPI as an optional managed provider, not the default.

Why:

- less vendor lock-in
- better margin at scale
- local/private data route
- custom RAG/tool/approval flow
- can run on Mac Mini + Orgo VMs
- supports one-on-one agent calls and War Room meetings

---

## 2. What “free” really means

No external provider bill is possible for browser/mobile/local network calls if we self-host:

- LiveKit server
- Pipecat pipeline
- local STT
- local TTS
- local LLMs

But these still have costs:

- Mac Mini electricity / hardware
- Orgo VM resources
- bandwidth
- engineering/maintenance
- optional phone/SIP provider if we want real phone numbers

Real telephone calling usually still costs money because PSTN/SIP providers charge.

---

## 3. Voicebox status

“VoiceBox” likely refers to Meta Voicebox.

Current status:

- not publicly released as a model/API for business deployment
- not open-source for commercial use
- research paper and audio demos only

Decision:

- do not plan around Meta Voicebox as an available production component
- use practical open-source alternatives instead

---

## 4. Practical options

### Option A — Pipecat + LiveKit

Best for:

- production-grade voice app
- multi-agent calls
- browser/mobile WebRTC
- future SIP/phone integration
- custom RAG/tool routing

Stack:

```text
LiveKit = realtime media transport
Pipecat = STT -> LLM -> TTS pipeline
Command API = policy/tools/RAG/approvals
Ollama/MLX = local models
ClickClack = chat summaries
Obsidian/Tencent memory = memory writeback
```

Use this as the primary architecture.

### Option B — Pipecat with WebSocket transport

Best for:

- fastest prototype
- desktop/mobile app push-to-talk
- local network/Tailscale calls

Tradeoff:

- simpler than full WebRTC
- less polished for public browser/phone experiences

Use this for MVP if we want voice working quickly.

### Option C — LiveKit Agents

Best for:

- low-latency voice apps
- self-hosted WebRTC
- scalable rooms
- app/browser/mobile calls

Tradeoff:

- more infra work than VAPI
- still need STT/TTS/model components

Use when we are ready for more production-grade voice rooms.

### Option D — Vocode / Bolna / TEN

Best for:

- alternative open-source agent frameworks
- experiments

Decision:

- evaluate later if Pipecat/LiveKit does not fit

### Option E — Managed VAPI

Best for:

- fastest external phone-call prototype
- low engineering effort
- production calls if cost is acceptable

Decision:

- keep as fallback/optional managed route
- not default if cost is a concern

---

## 5. Local STT options

Recommended:

| Tool | Use |
| --- | --- |
| faster-whisper | good server-side transcription on Mac/Linux |
| whisper.cpp | lightweight local transcription |
| WhisperKit | Apple-platform local transcription option |
| Vosk | low-resource/offline fallback |

Default:

```text
faster-whisper or whisper.cpp on Mac Mini
```

---

## 6. Local TTS options

Recommended:

| Tool | Use |
| --- | --- |
| Piper | fast local TTS, good default free option |
| Kokoro-style local TTS | higher quality if available in our environment |
| Coqui/XTTS-style stack | voice cloning experiments only with strict consent |
| macOS system voices | emergency local fallback |

Default:

```text
Piper/local TTS for MVP
ElevenLabs only for polished published narration after approval
```

---

## 7. Proposed free/local pipeline

```text
Microphone / browser / mobile app
-> LiveKit or WebSocket transport
-> VAD / turn detection
-> local STT
-> Command API
-> RAG context
-> local Ollama/MLX model or approved API model
-> tool/approval router
-> local TTS
-> audio response
-> transcript + memory writeback
```

---

## 8. Store voice without VAPI

Store voice can run without VAPI for web/app users:

```text
Store voice widget
-> LiveKit/WebSocket
-> Pipecat pipeline
-> Auto-Meat agent
-> Shopify catalog/cart tools
-> checkout link
```

If we need a real phone number:

```text
SIP/Twilio/telephony provider
-> LiveKit SIP or Pipecat telephony transport
-> same pipeline
```

Phone numbers are the part most likely to cost money.

---

## 9. What this gives StudEx

- one-on-one calls with agents
- War Room meetings
- store voice assistant
- local/private voice processing
- ClickClack summaries
- Obsidian/LLM-wiki writeback
- Tencent memory capture
- offline/local fallback
- lower long-term cost than managed VAPI

---

## 10. Implementation path

### MVP: voice working quickly

1. Build Pipecat WebSocket pipeline.
2. Use local STT on Mac Mini.
3. Use Ollama/MLX model route.
4. Use local TTS.
5. Connect to Command API.
6. Add desktop/mobile push-to-talk.
7. Save transcript and summary to Obsidian.

### Production voice rooms

1. Deploy LiveKit.
2. Connect Pipecat/LiveKit pipeline.
3. Add multi-agent rooms.
4. Add War Room meeting UI.
5. Add store voice widget.
6. Add SIP/phone only if needed.

---

## 11. Non-negotiables

- no silent recording
- no voice cloning without explicit consent
- no payment details by voice
- no raw transcripts sent to cloud models without approval
- no public voice endpoint before auth/rate limits/abuse controls
- no customer-facing store voice without escalation and handoff policy


# The talking service agent

**Prepared:** 24 Aug 2026
**Status:** DESIGN. No code written, no accounts provisioned.

You asked for a talking service agent that speaks to people, backed by an
Obsidian second-brain `llm_wiki`, with Honcho memory and Tencent memory.

That is three different kinds of memory doing three different jobs, and the
design only works if they stay separate. Conflating them is the usual reason
voice agents feel either amnesiac or unhinged.

---

## The three memories, and why each exists

| Memory | Question it answers | Technology |
|---|---|---|
| **Knowledge** | "What is true about this business?" | Obsidian vault + vector index |
| **Relationship** | "Who am I talking to and what happened between us?" | Honcho |
| **Transcript** | "What was said, verbatim, and can we prove it?" | Object storage + the Buzz event log |

Knowledge is shared and curated. Relationship is per-person and inferred.
Transcript is immutable and legal. Keep them in separate stores with separate
retention rules, because they have genuinely different deletion obligations —
a client can demand deletion of their relationship profile while you are
required to retain a call recording, or the reverse.

---

## Why Honcho is the right choice here

Honcho is memory infrastructure for stateful agents, available managed at
`api.honcho.dev` or self-hostable as a FastAPI server. Four properties make it
the correct fit rather than a generic vector store:

**Peers, not users.** A peer is any entity that persists but changes — a person,
an agent, a group, a project. This maps exactly onto the ecosystem diagram's
"Business Ghost": one persistent memory per company, not per chat session. The
Business Ghost layer does not need to be built. It needs to be configured.

**Reasoning, not retrieval.** Honcho reasons in the background over messages and
stores conclusions as a *representation* of the peer, rather than matching
chunks. For a service agent this is the difference between "you mentioned
delivery on the 14th" and "this customer cares about delivery dates and gets
anxious when they are vague."

**Peer cards for grounding.** Stable biographical facts — name, role,
preferences — cached so the model never loses the basics. Set them explicitly
via `POST /v3/workspaces/{workspace_id}/peers/{peer_id}/card` for facts you know
from the CRM, and let background reasoning fill the rest.

**Multi-peer perspective.** Honcho can model what one peer knows about another.
In a client workspace with several agents and several humans, this prevents the
worst failure mode: an agent repeating something in front of the wrong person
because it treated all history as globally visible.

Honcho also lists MCP, Claude Code, OpenCode, OpenClaw, Hermes and
Cursor-compatible clients as supported integrations — which includes the runtime
names already in the StudEx backbone.

### The latency decision that makes or breaks voice

Honcho exposes two ways to get context:

- `POST /peers/{peer_id}/chat` — natural-language queries about a peer,
  reasoning-grounded, but it is an LLM call;
- the **representation / context endpoint** — returns a static pre-computed
  document of insights about a peer, instantly.

**In the voice turn loop, use the representation endpoint only.** A voice
conversation has roughly a 300–800 ms budget before the pause becomes socially
wrong, and an extra LLM round trip inside that budget is unaffordable. Save the
chat endpoint for asynchronous work: preparing a call brief beforehand, or
enriching the record afterwards.

This single choice is the difference between an agent that feels present and one
that feels like it is buffering.

---

## The Tencent question — answer carefully

`MEMORY.md` records "TencentDB Agent Memory" as an approved stack piece from
17 June. Before client data goes anywhere near it, one thing must be settled.

**Routing South African clients' personal information to infrastructure in China
is a cross-border transfer under POPIA section 72.** That section restricts
transfers of personal information outside South Africa unless specific
conditions are met — comparable protection in the recipient jurisdiction, data
subject consent, or the transfer being necessary for contract performance. It is
not a formality, and "the vendor is cheaper" is not one of the conditions.

The recommendation is a split, and it is not a compromise — it is a better
architecture regardless of jurisdiction:

| Data | Store | Reason |
|---|---|---|
| Client PII, transcripts, relationship profiles | South Africa or EU region only | POPIA section 72; client data processing agreements |
| Generic corpus, public documents, model artefacts, non-identifying embeddings | Tencent acceptable | No personal information, cost and locality benefits available |

So: **Tencent for the commodity layer, not for the client layer.** If Tencent is
strategically important for other reasons — and the Global Markets layer of the
ecosystem suggests it might be — use it for the general knowledge corpus and
model hosting, and keep the per-client memory in-region. Confirm with a POPIA
practitioner before the first client, not after.

---

## Architecture

```
                          ┌────────────────────────┐
       caller / user ────► │  VOICE EDGE            │
                          │  telephony or web mic  │
                          └───────────┬────────────┘
                                      │ audio in
                                      ▼
                          ┌────────────────────────┐
                          │  STT                   │
                          └───────────┬────────────┘
                                      │ text
                                      ▼
     ┌────────────────────────────────────────────────────────────┐
     │  TURN ORCHESTRATOR                                          │
     │                                                             │
     │  1. identify peer  ──────────────► Honcho peer resolve      │
     │  2. get context    ──────────────► Honcho representation    │
     │                                    (static, low latency)    │
     │  3. retrieve       ──────────────► Obsidian vault index     │
     │                                    (approved docs only,     │
     │                                     provenance required)    │
     │  4. compose prompt: persona + peer card + representation    │
     │                     + cited knowledge + turn history        │
     │  5. generate       ──────────────► LLM                      │
     │  6. POLICY GATE    ──────────────► allow / refuse / escalate│
     └───────────────────────┬─────────────────────────────────────┘
                             │ approved text
                             ▼
                 ┌────────────────────────┐
                 │  TTS                   │──► audio out to caller
                 └────────────────────────┘
                             │
        ┌────────────────────┴────────────────────┐
        ▼                                          ▼
  Honcho observe                        Buzz #agent-worklog
  (async, off the turn path)            signed transcript event
```

### The policy gate

Step 6 is not optional and it is not the model's job. A deterministic gate
between generation and speech, because by the time a voice agent has said
something it cannot be unsaid.

The gate refuses and escalates to a human when the turn would:

- quote a price, discount, refund or credit;
- make a delivery, availability or deadline commitment;
- give clinical, legal, tax or financial advice;
- confirm or alter an appointment, order or account;
- state anything absent from the approved knowledge pack;
- accept liability or apologise in terms that admit fault;
- continue after the caller has asked for a human.

On refusal the agent says it is checking with a colleague and hands off. That is
a good caller experience. A confident wrong answer is not.

### Escalation to a human must be one step

If the caller asks for a person, the transfer happens on that turn. No
qualification loop, no "I can help with that too." Regulators and customers
converge on this point, and it is also simply the decent thing to do.

---

## Consent and recording — do this before the first call

Not optional, and it is cheaper to build in than to retrofit:

1. **Disclose it is an AI at the start of every conversation.** The Super Agents
   launch pack already requires Elara to identify itself as AI; the same rule
   applies with more force to voice, where the cue is otherwise absent.
2. **Announce recording before recording**, and offer a route that is not
   recorded.
3. **Outbound calling is a different legal animal from inbound.** Inbound means
   the person chose to contact you. Outbound to a list needs a lawful basis and
   a suppression list that actually works. Do not build outbound campaign
   calling into version one.
4. **Voice cloning needs written consent from the person cloned.** If Naledi,
   Aurora or any persona voice is used, hold the signed consent on file. This
   matters more than it seems: a persona voice is the most likely thing to end
   up in a complaint.
5. **Keep a do-not-call list and honour it across every channel**, not just
   voice.

---

## Build order

Voice is the hardest surface to get right and the least forgiving of a weak
knowledge pack. Do not start here.

| Step | Deliverable | Why this order |
|---|---|---|
| 1 | Text agent in a Buzz channel, knowledge pack + citations | Proves the knowledge is right where mistakes are cheap and reviewable |
| 2 | Add Honcho, representation endpoint in the loop | Proves continuity across sessions before latency pressure exists |
| 3 | Policy gate with a written refusal list | Must exist before anything speaks |
| 4 | Inbound voice, single scripted workflow, recorded and reviewed | Smallest real voice surface |
| 5 | Widen workflows once the refusal rate is stable | Refusal rate is the honest quality signal |
| 6 | Outbound only with legal sign-off | Separate decision, separate risk |

**Steps 1–3 are worth doing even if voice is never shipped.** They are the
managed-agent product from [02-OFFERING.md](02-OFFERING.md). Voice is a channel
on top of a working agent, and a voice interface over a weak knowledge pack just
makes the wrongness faster and harder to review.

---

## What has to be procured

| Component | Status | Note |
|---|---|---|
| Honcho | Not provisioned | Managed at `api.honcho.dev` or self-host the FastAPI server |
| Obsidian vault per client | Structure designed, not built | Scaffolded by the n8n workflow |
| Vector index | Not chosen | Decision item 5 |
| STT | Not chosen | Needs South African English and accent testing — this is a real risk, most engines degrade badly |
| TTS | ElevenLabs already in the stack | Persona voice consent required |
| Telephony | Not chosen | Decision item 6 |
| POPIA assessment | Not started | Blocks the first client, not the first prototype |

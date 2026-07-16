# Mac Mini Local Deployment Plan

Status: planning artifact  
Target host: Mac Mini local anchor node  
Purpose: make the Mac Mini the always-on local command, model, memory, storage, and mesh gateway for Robusca Command OS

---

## 1. Role of the Mac Mini

The Mac Mini should become the local anchor node:

- always-on local model host
- Tailscale-visible command node
- Obsidian/LLM-wiki storage and sync point
- external drive mount point
- ClickClack local/private chat host or relay
- RAG indexer for Obsidian and robusca-brain
- Daily routine worker
- audio/video artifact processor
- safe bridge between home hardware and Orgo business VMs

It should not replace the Orgo Command VM. It should complement it:

```text
Mac Mini = local/private anchor
Orgo Command VM = cloud/business control plane
Tailscale = private network between them
```

---

## 2. Safety rules

- Do not wipe macOS.
- Do not expose local services publicly until authentication is configured.
- Use Tailscale/MagicDNS first.
- Store secrets in a vault or local env file outside the repo.
- Do not commit local paths, tokens, NotebookLM URLs, VAPI keys, ClickClack tokens, or Slack webhooks.
- Do not automate Google/NotebookLM login or CAPTCHA.
- Keep raw meeting recordings private by default.

---

## 3. Hardware and storage layout

Recommended external drive layout:

```text
/Volumes/StudExVault/
  models/
  obsidian/
  robusca-brain/
  rag/
    chroma_db/
    index-runs/
    query-logs/
  meetings/
    raw/
    summaries/
  daily-routines/
  exports/
  backups/
  logs/
```

Recommended symlink:

```text
/Users/Shared/StudExVault -> /Volumes/StudExVault
```

Rules:

- use the external drive for large models, raw audio/video, and archives
- keep git repos and config backed up separately
- add a mount-check before running scheduled jobs
- do not store secrets on the shared drive unless encrypted

---

## 4. Tailscale setup

Goal:

```text
mac-mini-anchor-node
```

Recommended capabilities:

- MagicDNS enabled
- Tailscale SSH enabled only if needed
- ACLs restrict access to trusted devices/users
- services bind to localhost or Tailscale IP, not public interfaces

Suggested service names:

```text
mac-mini-anchor-node
ollama-mac-mini
rag-mac-mini
clickclack-mac-mini
studex-vault
```

---

## 5. Local model stack

Recommended local stack:

| Component | Role |
| --- | --- |
| Ollama | local chat and embedding models |
| MLX | optional Apple Silicon optimized models |
| LiteLLM | optional local/API routing facade |
| ChromaDB | vector store |
| LlamaIndex | document loading and query engine |

Recommended Mac Mini model class:

- 7B/8B chat models for reliable local responses
- small/medium coding model for utility tasks
- embedding model for RAG

Suggested Ollama aliases:

```text
robusca-local-fast
robusca-local-private
robusca-embed
```

Do not assume 32B/72B models will be usable on the Mac Mini. Benchmark first.

---

## 6. Obsidian and LLM-wiki

The Karpathy gist should be used as the memory pattern:

```text
raw sources -> synthesized wiki -> schema/index/log
```

Do not execute the script tag. It is a web embed, not an install step.

Mac Mini memory paths:

```text
/Users/Shared/StudExVault/obsidian/
/Users/Shared/StudExVault/robusca-brain/
/Users/Shared/StudExVault/rag/chroma_db/
```

Daily closeout should update:

```text
memory/YYYY-MM-DD.md
memory/business/<business>/daily/YYYY-MM-DD.md
memory/business/<business>/decisions/
memory/business/<business>/tasks/
```

---

## 7. ClickClack on Mac Mini

ClickClack can run on the Mac Mini as:

1. local development/testing instance
2. private home command chat
3. relay to Orgo-hosted ClickClack

Recommended MVP:

- Orgo hosts production ClickClack.
- Mac Mini runs a private/dev ClickClack instance for testing and local fallback.

Bind policy:

```text
localhost first
Tailscale IP second
public internet never until auth/TLS/backups are configured
```

---

## 8. VAPI connection

VAPI should connect through the Command API, not directly to local scripts.

Flow:

```text
VAPI call
-> Command API webhook
-> policy check
-> RAG/model route
-> ClickClack post / meeting memory / approval queue
```

Mac Mini role:

- local/private model route
- RAG query route
- meeting transcript storage
- optional voice artifact processing

---

## 9. AI Town

Reference:

```text
https://github.com/a16z-infra/ai-town
```

Use AI Town as:

- visual simulation / agent office prototype
- “living town” view of agents
- demo surface for agent conversations
- possible executive display showing Robusca, Naledi, Auto-Meat, Hermes, CashClaw as characters

Do not make AI Town the core business bus.

Observed requirements:

- Convex
- optional self-hosted Convex Docker Compose
- Ollama default local inference
- optional Clerk auth
- optional Replicate for music/assets

Recommended MVP:

- run local Docker/self-hosted Convex only after review
- connect to Ollama on Mac Mini
- use toy/simulated agent data first
- no real customer/finance/meeting data until auth/privacy is configured

---

## 10. Crabfleet

Reference:

```text
https://docs.crabfleet.ai/
https://github.com/openclaw/crabfleet
```

Crabfleet helps if StudEx has multiple businesses because it provides a control plane for many agent workspaces/runs.

Best fit:

- supervising many Codex/OpenClaw workspaces
- repo-gated cards per business
- WebVNC/terminal attach to live work
- admin allowlists
- runtime policy and capacity
- recurring operational cards
- clear separation by repo/operator/session

It does not replace:

- ClickClack chat
- Obsidian memory
- business permissions
- human approval policy
- Orgo VM business ownership

Recommended business mapping:

```text
StudEx Meat     -> repo/workspace allowlist + cards
StudEx Coffee   -> repo/workspace allowlist + cards
Global Markets  -> repo/workspace allowlist + cards
Rahura / BAASH  -> repo/workspace allowlist + cards
Command OS      -> infra/release cards
```

Answer: yes, Crabfleet can help manage multiple businesses, especially if each business has repos/tasks/workspaces that need visibility, runtime policy, and controlled agent execution.

---

## 11. Songsee

Reference:

```text
https://songsee.sh/
https://github.com/steipete/songsee
```

Use Songsee for:

- visualizing meeting/audio files
- generating spectrogram assets for NotebookLM/video routines
- QA of audio recordings
- media-rich daily routine artifacts
- audio fingerprint/summary visuals for archives

It is not an AI model. It is a fast Go CLI that renders audio feature images.

Recommended integration:

```text
meeting/audio file
-> songsee spectrogram or mel visualization
-> save image to daily-routine artifact package
-> optionally include in NotebookLM/video production assets
```

---

## 12. Skills/capabilities this Mac Mini stack gives StudEx

### Command and communication

- self-hosted agent chat through ClickClack
- bot channels per business function
- Slack/Rocket.Chat bridging where approved
- daily routine posts
- approval cards

### Voice and meetings

- VAPI voice assistants and squads
- Robusca-led morning standup
- topic handoff to Naledi, Auto-Meat, Hermes, CashClaw
- meeting capture pipeline
- local/private RAG for meeting context

### Memory and RAG

- Obsidian daily note updates
- LLM-wiki memory pattern
- ChromaDB vector index
- LlamaIndex query engines per agent
- local Ollama embeddings
- source-cited answers

### Local models

- private local chat/summarization
- embeddings
- fallback when API models are unavailable
- sensitive data route that does not leave the machine

### Business operations

- StudEx Meat operations visibility
- content and social queue context
- finance target awareness
- devops/infrastructure summaries
- daily closeout and tomorrow priorities

### Agent workspace supervision

- Crabfleet-style fleet visibility
- repo-gated task cards
- recurring operational cards
- WebVNC/terminal attach to sessions
- capacity and runtime policy

### Visual/experience layer

- AI Town as a visual agent office/town
- Songsee audio visualizations
- command-glass dashboards
- NotebookLM-ready artifact bundles

---

## 13. Implementation order

1. Confirm Mac Mini specs, macOS version, and drive names.
2. Install and connect Tailscale.
3. Mount and structure StudExVault external drive.
4. Install/verify Ollama and pull small local models.
5. Clone/sync robusca-brain and Obsidian vault to the drive.
6. Build local ChromaDB/LlamaIndex RAG index.
7. Run private ClickClack dev instance.
8. Connect Command API to ClickClack bot posting.
9. Wire VAPI webhook to Command API.
10. Add 10:00 PM closeout to update Obsidian and post to ClickClack.
11. Add Songsee to meeting/audio artifact workflow.
12. Test AI Town locally with dummy agents.
13. Evaluate Crabfleet for multi-business workspace management.

---

## 14. Open decisions

- What is the exact Mac Mini chip/RAM/storage?
- What are the mounted drive names and filesystems?
- Is ClickClack production hosted on Orgo or Mac Mini?
- Which Google account/profile owns NotebookLM?
- Should AI Town be private demo only or part of the public command experience?
- Should Crabfleet be self-hosted for StudEx or used as OpenClaw-hosted service first?
- Which local models should be canonical after benchmarking?


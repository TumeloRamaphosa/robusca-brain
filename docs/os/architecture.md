# Robusca OS — Architecture & Agent Robusca

## 1. What the OS is

The Robusca OS is the operating system for StudEx Group's autonomous agent stack. It turns a
collection of models, tools, and channels into one coherent machine that can capture intent,
plan work, generate content, and execute commerce/marketing actions — all behind human
approval gates.

The OS has six layers:

```
┌──────────────────────────────────────────────────────────────┐
│  CONTROL PLANE — War Room dashboard + Agent Lord approvals     │
├──────────────────────────────────────────────────────────────┤
│  ORCHESTRATION — Agent Robusca (lead orchestrator)             │
├──────────────────────────────────────────────────────────────┤
│  COMMUNICATION — Reload MCP (agent-to-agent + approval routing)│
├──────────────────────────────────────────────────────────────┤
│  CAPTURE & MEMORY — WhisperFlow → Qwen scribe → Obsidian → Git │
├──────────────────────────────────────────────────────────────┤
│  EXECUTION — content, email, social, ads, WhatsApp, commerce   │
├──────────────────────────────────────────────────────────────┤
│  FOUNDATION — models, GitHub source-of-truth, secrets vault    │
└──────────────────────────────────────────────────────────────┘
```

- **Control plane** — the War Room is the operator surface. Every irreversible action
  surfaces here for approval. See [security-and-approvals.md](security-and-approvals.md).
- **Orchestration** — Agent Robusca decides who does what, when (this doc).
- **Communication** — Reload is the message bus. See [reload-comms.md](reload-comms.md).
- **Capture & memory** — voice and notes flow into Obsidian and back into Git. See
  [voice-and-capture.md](voice-and-capture.md).
- **Execution** — the content/email/social/ads/commerce surfaces. See
  [content-social-ads.md](content-social-ads.md).
- **Foundation** — GitHub is the source of truth (this repo, `robusca-brain`); credentials
  are referenced by handle, never stored in files.

## 2. Agent Robusca — Lead Orchestrator

**Agent Robusca is the assistant identity and lead orchestrator for the operating system.**
Robusca does not do every job; Robusca routes, sequences, and supervises the agents that do.

### Responsibilities

- **Intent intake** — receive captured intent (voice, chat, notes) and turn it into tasks.
- **Routing** — assign tasks to the right specialist agent (content, commerce, devops).
- **Sequencing** — order dependent work; parallelize independent work.
- **Memory** — keep Obsidian/Git and the brain files current so each session wakes with
  context.
- **Approval brokerage** — collect agent outputs, stage them, and route every send/publish/
  ad-launch/customer-message to Agent Lord for explicit approval before it goes out.
- **Audit** — keep Agent Lord's full visibility into what every agent did and why.

### What Robusca never does without approval

Robusca **never** sends an email, posts content, launches an ad, creates a Shopify product,
or messages a customer without Agent Lord's explicit approval. This is the hard line that
binds the whole OS — see [security-and-approvals.md](security-and-approvals.md).

### Chain of command

```
Agent Lord (Tumelo Ramaphosa)
            ↕
   Agent Robusca (Lead Orchestrator)
   ↙           ↓            ↘
Naledi      Auto-Meat      Hermes
(Content/   (E-Commerce)   (DevOps/
 CMO)                       CTO)
   ↘           ↓            ↙
        Capture / Research / Finance
              subagents (Qwen scribe, etc.)
```

## 3. The agent roster

| Agent | Role | Primary surface |
|-------|------|-----------------|
| **Agent Robusca** | Lead orchestrator, chief of staff | War Room + Reload `studex-os-control` |
| **Naledi** | Content / CMO — generation, scheduling (via approval) | `studex-meat-content` |
| **Auto-Meat** | E-commerce automation (orders, fulfilment, stock) | `studex-meat-commerce` |
| **Hermes** | DevOps / CTO — infrastructure, CI/CD | `studex-system-alerts` |
| **Qwen scribe** | Local capture agent for WhisperFlow dictation | local → Obsidian → Git |

## 4. Source-of-truth & memory model

- **GitHub (`robusca-brain`)** is the durable source of truth for brain files and OS docs.
- **Obsidian vault** is the human-facing capture and note surface; it syncs to Git on a
  12-hour cadence (see [routines.md](routines.md)).
- **Brain files** (`IDENTITY.md`, `SOUL.md`, `MEMORY.md`, etc.) hold identity and curated
  memory; daily notes hold raw logs.

## 5. Design principles

1. **Orchestrate, don't centralize.** Robusca routes work; specialists execute.
2. **Approval before anything external.** No exceptions for "urgent" or "internal".
3. **Adapter over coupling.** Wrap providers (memory, comms, media) behind interfaces so any
   one can be swapped without rewiring the OS.
4. **Git is truth.** If it matters, it lands in the repo.
5. **No secrets in files.** Handles and env var names only.

_Last updated: 2026-06-14._

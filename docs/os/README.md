# Robusca OS — StudEx/Robusca Operating System

This folder is the **source-of-truth documentation** for the Robusca operating system: how
Agent Robusca orchestrates the StudEx agent stack, how voice and capture work, how agents
talk to each other, how content/email/social/ads flow through approval gates, and how the
daily routines run.

> **No secrets, ever.** Nothing in this folder contains API keys, tokens, passwords, or
> session secrets. Credentials live in the local environment or a secrets vault and are
> referenced by handle/name only. See [security-and-approvals.md](security-and-approvals.md).

## Index

| Doc | What it covers |
|-----|----------------|
| [architecture.md](architecture.md) | System layers, the agent roster, and **Agent Robusca** as lead orchestrator |
| [voice-and-capture.md](voice-and-capture.md) | Hotkey separation (Control = WhisperFlow, Command = Perplexity/Computer) + the Obsidian/Qwen scribe pipeline |
| [reload-comms.md](reload-comms.md) | Reload MCP as the agent communication layer (channels, events, setup runbook) |
| [content-social-ads.md](content-social-ads.md) | Content pipeline, email, Facebook/Meta ads, WhatsApp, FeedHive, Freepik, Higgsfield, AestheticsMeet |
| [routines.md](routines.md) | 08:30 / 09:00 / 17:00 routines and the 12-hour Obsidian↔GitHub sync |
| [security-and-approvals.md](security-and-approvals.md) | Approval gates and the no-secrets policy that bind every other doc |
| [implementation-plan.md](implementation-plan.md) | Phased, practical checklist to stand the whole OS up |

## How to read this

1. Start with [architecture.md](architecture.md) for the mental model.
2. Read [security-and-approvals.md](security-and-approvals.md) — it is the constraint layer
   that overrides every workflow below it.
3. Use [implementation-plan.md](implementation-plan.md) as the working checklist.

## Relationship to the brain files

The root files (`IDENTITY.md`, `SOUL.md`, `USER.md`, `AGENTS.md`, `MEMORY.md`,
`StudexAgentsAnatomySoul.md`) remain the agent's identity and operating constitution.
This `docs/os/` folder is the **systems architecture layer** that sits underneath them —
it describes the machine those identities operate.

_Last updated: 2026-06-14._

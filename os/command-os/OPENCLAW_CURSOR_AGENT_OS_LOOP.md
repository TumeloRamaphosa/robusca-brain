# OpenClaw, Cursor, Agent OS, and Coding Fleet Loop

Status: planning artifact  
Parent system: Robusca Command OS  
Purpose: connect OpenClaw, Cursor, MCP/API tools, Discord/ClickClack, OpenHands, Octopoda, BuilderMethods Agent OS, Agent Orchestrator, Goose, and Nemotron into one agent operating loop

---

## 1. Goal

Build one all-in-one agent operating loop:

```text
Idea / issue / command
-> spec
-> plan
-> spawn agents
-> build
-> review
-> QA
-> CI fix loop
-> ship
-> document
-> memory writeback
-> next task
```

This layer connects:

- OpenClaw
- Cursor
- Goose
- OpenHands / Dark Factory
- Agent Orchestrator
- BuilderMethods Agent OS / Design OS
- Octopoda memory
- ClickClack / Discord
- MCP servers
- Nemotron model route
- Obsidian / LLM-wiki / Tencent memory

---

## 2. Roles

| System | Role |
| --- | --- |
| OpenClaw | agent runner / operator layer |
| Cursor | IDE and coding agent surface |
| Goose | local general-purpose agent with MCP/ACP support |
| OpenHands | software-agent runtime / sandboxable coding agent |
| Agent Orchestrator | fleet IDE for parallel coding agents and CI/review loops |
| BuilderMethods Agent OS | spec-driven development standards and project instructions |
| BuilderMethods Design OS | design process before frontend implementation |
| Octopoda | persistent memory kernel, MCP memory, loop detection, agent messaging |
| ClickClack | internal agent chat/audit surface |
| Discord | external/community/team command surface |
| Nemotron API | optional model route for Goose/OpenClaw/Cursor through LiteLLM/Command API |

---

## 3. OpenClaw to Cursor via MCP/API

Use MCP/API as the tool/data bridge, not raw secrets in prompts.

Architecture:

```text
Cursor
-> MCP servers
-> Command API
-> OpenClaw/Goose/OpenHands runtimes
-> tools and memory
```

OpenClaw integration modes:

| Mode | Use |
| --- | --- |
| API call from Command API | start/route task to OpenClaw |
| ACP-style agent bridge | let compatible agent clients talk to OpenClaw/Goose |
| MCP tools | expose safe tools to Cursor/Goose/OpenClaw |
| ClickClack bot | receive commands and post summaries |
| Discord bot | external control surface after policy gate |

Rules:

- no agent should get unrestricted shell or repo access by default
- tools are exposed by role and business namespace
- every write/PR/deploy action is audited
- customer-facing actions require approval

---

## 4. Discord operating system layer

Discord can be an input surface, but ClickClack remains the internal command radio.

Flow:

```text
Discord message / voice event
-> Discord bot
-> Command API
-> policy check
-> agent/tool/RAG route
-> response to Discord
-> normalized summary to ClickClack
-> memory writeback if approved
```

Discord is good for:

- quick commands
- live voice room tests
- notifications
- approval prompts
- team/community interaction

Discord is not the system of record.

---

## 5. Buzz

Reference:

```text
https://buzz.xyz/
```

Observed:

- positioned as “your people, your agents, your project — all in one place”
- early-stage product

Use:

- inspiration for unified people/agent/project surface

Decision:

- do not make Buzz a dependency until product/API/auth model is clear
- implement StudEx-owned version using ClickClack + Command OS

---

## 6. OpenHands / Dark Factory

OpenHands Software Agent SDK is a modular open-source SDK for coding agents.

Use:

- code-writing agents
- sandboxed workspaces
- local/remote Docker/Kubernetes execution
- REST/OpenAI-compatible agent server
- MCP-connected tools
- Dark Factory coding runtime where already installed

Integration:

```text
Command API
-> OpenHands agent server / local runtime
-> isolated workspace
-> repo task
-> PR/result
-> ClickClack summary
-> memory writeback
```

Rules:

- use sandboxed workspaces for risky code changes
- no secrets in agent workspaces
- no deploy/merge without approval

---

## 7. Octopoda memory kernel

Reference:

```text
https://pypi.org/project/octopoda/
```

Observed:

- local-first persistent memory kernel
- SQLite by default
- semantic search, knowledge graph, loop detection, crash recovery
- agent-to-agent messaging
- MCP server with memory tools
- framework integrations for LangChain, CrewAI, AutoGen, OpenAI Agents

Use:

- local agent memory kernel
- loop detection for repetitive agents
- cross-agent message bus
- MCP memory server for Cursor/Goose/OpenClaw
- complement to TencentDB-Agent-Memory

Decision:

- evaluate Octopoda as local memory kernel
- keep Obsidian/LLM-wiki as human-readable source of truth
- use TencentDB-Agent-Memory and Octopoda for different memory roles until one proves better

---

## 8. BuilderMethods Agent OS and Design OS

References:

```text
https://github.com/buildermethods/agent-os
https://github.com/buildermethods/design-os
```

Use Agent OS for:

- codebase standards
- spec-driven development
- repeatable project instructions
- `/agent-os` style loop

Use Design OS for:

- frontend/product design process
- design-to-implementation discipline
- better UX before code

Command OS loop:

```text
Spec
-> Design OS pass
-> Agent OS plan
-> spawn coding agent
-> review/QA/security
-> ship
-> retro
-> memory
```

---

## 9. Agent Orchestrator

Reference:

```text
https://github.com/Untrivial-ai/agent-orchestrator
```

Observed:

- agent IDE for supervising parallel coding agents
- isolated git worktrees
- terminal/session state
- PR awareness
- CI/review/merge-conflict feedback loops
- desktop app and CLI

Use:

- manage multiple coding agents building Command OS
- route CI failures back to the right agent
- keep branches/worktrees isolated
- supervise OpenHands/Cursor/Goose/OpenClaw sessions

Decision:

- evaluate as the coding-fleet supervisor
- overlaps with Crabfleet/gstack; choose based on which one works best with our machines and repos

---

## 10. Goose + Nemotron

Goose is useful because it supports:

- desktop app
- CLI
- API
- MCP extensions
- ACP
- subagents
- recipes
- many model providers
- Ollama/OpenRouter/Google/other routes

Nemotron should be connected as a model route:

```env
NEMOTRON_API_KEY=<vault>
NEMOTRON_BASE_URL=<vault>
NEMOTRON_MODEL=<vault>
```

Do not paste the key into chat or docs.

Integration:

```text
Goose
-> Command API / LiteLLM
-> Nemotron route
-> MCP tools
-> ClickClack summaries
-> memory writeback
```

Use:

- general agent work
- research
- automation
- data analysis
- subagents
- MCP apps/tools

---

## 11. Unified loop

```text
1. Command enters through Cursor / ClickClack / Discord / Goose / OpenClaw
2. Command API classifies intent
3. Agent OS creates/updates spec
4. Design OS runs if UI/product surface
5. Orchestrator spawns agent in isolated workspace
6. Agent builds with Cursor/OpenHands/Goose/OpenClaw
7. gstack/agent-orchestrator review and QA
8. CI feedback routed to same session
9. Human approves merge/deploy/customer action
10. Result posted to ClickClack
11. Memory written to Obsidian, Tencent memory, Octopoda, and RAG indexes
```

---

## 12. MCP registry

Core MCP/tool registry should include:

```text
github
notion
linear
shopify
google-calendar
google-drive
clickclack
discord
telegram
slack
octopoda-memory
tencent-memory
obsidian
filesystem-vault
tailscale
ollama
litelm/router
openhands
goose
openclaw
agent-orchestrator
```

All MCPs should be:

- least privilege
- namespace aware
- audited
- disabled by default until configured
- secrets loaded from vault/env only

---

## 13. First build path

1. Add `/agent-os` project instructions.
2. Configure Cursor MCP registry.
3. Add Octopoda local MCP server in dev mode.
4. Configure Goose with Command API and MCP tools.
5. Connect OpenClaw via Command API or ACP bridge.
6. Add ClickClack bot command surface.
7. Add Discord bot command surface after policy review.
8. Evaluate Agent Orchestrator vs Crabfleet for fleet supervision.
9. Route Nemotron through LiteLLM/Command API.
10. Add memory writeback into Obsidian + Tencent + Octopoda.

---

## 14. Safety

- no model/API keys in prompts, docs, or client apps
- no Discord bot token in repo
- no unrestricted MCP write tools
- no autonomous merge/deploy without approval
- no customer-facing actions without policy gate
- no memory writes without namespace and source metadata
- no OpenHands/OpenClaw/Goose shell access to secrets by default


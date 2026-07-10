# Agent Skills + Claude Code MCP Setup

StudEx Puppetier workspace — install **Superpowers**, **Goal**, and MCP for Claude Code / Cursor.

## What is installed in this repo (cloud workspace)

| Skill | Location | Status |
|-------|----------|--------|
| **Superpowers** (14 skills) | `.agents/skills/` | Installed via `npx skills add obra/superpowers` |
| **Goal** (`/goal` mode) | `skills/goal/` | Cloned from [jthack/claude-goal](https://github.com/jthack/claude-goal) |
| **StudEx skills** | `skills/studex-*` | Project skills (Shopify, WhatsApp, etc.) |
| **MCP config** | `.mcp.json` | Project-scoped servers for Claude Code |

---

## Superpowers — what it does

From [obra/superpowers](https://github.com/obra/superpowers):

- **brainstorming** — design before code
- **writing-plans** — bite-sized implementation plan
- **subagent-driven-development** — auto mode: agents execute plan with review loops
- **test-driven-development** — red/green/refactor
- **executing-plans** — batch execution with checkpoints

Triggers automatically when the agent detects build/debug/refactor work.

### Claude Code (your Mac)

```bash
# Option A — official Anthropic marketplace (recommended)
/plugin marketplace add anthropics/claude-plugins-official
/plugin install superpowers@claude-plugins-official

# Option B — obra marketplace
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
```

### Cursor

```text
/add-plugin superpowers
```

Or from repo root:

```bash
npx skills add obra/superpowers -y
```

---

## Goal skill — what it does

From [jthack/claude-goal](https://github.com/jthack/claude-goal):

- `/goal <objective>` — persistent objective across turns
- Auto-continuation via Stop hook (keeps working until goal complete)
- `/goal status|pause|resume|clear|complete`
- Completion audit before marking done

### Claude Code (your Mac)

```bash
git clone https://github.com/jthack/claude-goal.git ~/claude-goal
cd ~/claude-goal && ./install.sh
```

Restart Claude Code. Verify with `/help` — should show `/goal`.

### Cursor (this repo)

Goal scripts live at `skills/goal/scripts/claude_goal.py`. Invoke manually:

```bash
python3 skills/goal/scripts/claude_goal.py invoke "Build Puppetier Phase 1 Open WebUI"
```

---

## Claude Code MCP — install on your Mac

The `claude` CLI is **not** on the cloud VM. Run these on your Mac in the repo root:

```bash
cd /path/to/robusca-brain   # or studex-workspace

# Official Claude Code docs MCP
claude mcp add --scope project --transport http claude-code-docs https://code.claude.com/docs/mcp

# GitHub (set token first)
export GITHUB_PERSONAL_ACCESS_TOKEN="your_token"
claude mcp add --scope project github -- npx -y @modelcontextprotocol/server-github

# Filesystem (project root)
claude mcp add --scope project filesystem -- npx -y @modelcontextprotocol/server-filesystem "$(pwd)"

# MCP dev plugin (build custom servers)
/plugin marketplace add anthropics/claude-plugins-official
/plugin install mcp-server-dev@claude-plugins-official
```

Verify inside Claude Code session:

```text
/mcp
```

Project config is committed in `.mcp.json` — teammates get the same servers on clone.

---

## Auto mode — how Superpowers builds Puppetier

Use **subagent-driven-development** for autonomous multi-hour builds:

1. Set goal:
   ```text
   /goal Build StudEx Puppetier Phase 1: Open WebUI on Fly.io with Hermes/OpenClaw/Goose/Treasury agent presets, obsidian-gold theme, MCP gateway to studex-empire ACP ports 3000-3004
   ```

2. Superpowers flow (automatic):
   - `brainstorming` → confirm architecture
   - `writing-plans` → 2–5 min tasks with file paths
   - `subagent-driven-development` → subagent per task + review
   - `verification-before-completion` → tests pass before done

3. Enable in Claude Code:
   ```text
   /superpowers:execute-plan
   ```
   Or ask: *"Use subagent-driven-development to execute the Puppetier plan."*

---

## Build timeline (if started today)

Assumes credentials ready (`~/.studex/meta.env`, Fly.io, API keys).

| Phase | Deliverable | Agent time | Calendar |
|-------|-------------|------------|----------|
| **Today (Day 0)** | Open WebUI Docker + 4 agent presets + theme CSS | 6–8h | 1 day |
| **Day 1–2** | MCP gateway → Hermes/OpenClaw/Goose/Treasury | 8–12h | 2 days |
| **Day 3** | Approval gate → War Room queue | 4–6h | 1 day |
| **Day 4–5** | RileyJarvis ↔ Hermes voice bridge (Mac) | 6–8h | 2 days |
| **Week 2** | Landing page (ui-ux-pro-max minimal black/gold) | 8–12h | 3–5 days |
| **Week 3–4** | Multi-tenant SaaS onboarding | 20–30h | 1–2 weeks |

**Internal MVP (you using it daily):** achievable in **3–5 calendar days** with auto mode.

**Client-ready SaaS:** **3–4 weeks** including approvals, billing, white-label.

---

## Puppetier workspace (built 2026-07-10)

Full stack in `puppetier/`:

```bash
cd puppetier && ./start.sh
```

- Open WebUI :3080
- Hermes Voice (Mac): `cd puppetier/studex-voice && npm run dev`
- See [puppetier/README.md](../puppetier/README.md)

---

## Quick verify (this workspace)

```bash
# Superpowers skills present
ls .agents/skills/

# Goal skill present
ls skills/goal/SKILL.md

# MCP config present
cat .mcp.json
```

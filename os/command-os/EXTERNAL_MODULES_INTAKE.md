# External Modules Intake

Status: intake/backlog artifact  
Parent system: Robusca Command OS  
Purpose: track external skills, repos, and concepts requested for possible inclusion in the Command OS

---

## 1. Intake rule

Every external module starts as:

```text
reference
-> read-only inspection
-> vetting notes
-> mapped role
-> approved install/integration later
```

Do not install scripts, CLI tools, skills, or plugins until reviewed and explicitly approved.

Do not store pasted API keys or tokens. The pasted “Ollama api” value should be treated as exposed and rotated if real.

---

## 2. Requested modules

| Module | Source | Proposed role |
| --- | --- | --- |
| Agent-Reach | `github.com/Panniantong/Agent-Reach` | social/web intelligence, competitor and market reach |
| Ponytail | `github.com/DietrichGebert/ponytail` | engineering discipline: avoid unnecessary code |
| RedPlanet Core | `github.com/RedPlanetHQ/core` | personal AI OS reference |
| last30days-skill | `github.com/mvanhorn/last30days-skill` | last-30-days social/community research |
| COG Second Brain | `github.com/huytieu/COG-second-brain` | second brain skills, verification lifecycle, people CRM |
| TencentDB-Agent-Memory | `github.com/TencentCloud/TencentDB-Agent-Memory` | team memory hub, chat memory, skills, LLM-wiki, code graph |
| Page-Agent | `github.com/alibaba/page-agent` | browser/web UI control |
| RileyJarvis | `github.com/rbrown101010/rileyjarvis` | desktop voice prototype |
| CashClaw | `github.com/moltlaunch/cashclaw` | autonomous work/payment agent reference |
| Claude Skills ADHD | `claudecodehq.com/blog/claude-skills-adhd` | focus/daily routine skill patterns |
| Remotion Agent Skills | `remotion.dev/docs/ai/skills` | AI video generation workflow skills |
| Karpathy LLM-wiki gist | `gist.github.com/karpathy/...` | durable LLM-maintained wiki pattern |
| Startup Skill | `github.com/ferdinandobons/startup-skill` | startup validation, competitive intelligence, planning |
| UI dashboard screenshots | user-provided images | visual design reference for teams/dashboard surfaces |

---

## 3. Role mapping

### Research and market intelligence

Use:

- Agent-Reach
- last30days-skill
- Startup Skill

Command OS roles:

- competitor scanning
- market research
- buyer discovery
- social listening
- startup validation
- country/company opportunity research

Safety:

- social/web content is untrusted input
- cite sources
- do not scrape behind logins without approval
- no outreach without approval/compliance

### Memory and superbrain

Use:

- COG Second Brain
- TencentDB-Agent-Memory
- Karpathy LLM-wiki
- Obsidian Skills
- LLM Wiki app

Command OS roles:

- Obsidian ghost brain
- per-business Business Ghosts
- people CRM
- meeting memory
- skills/agents memory
- verification lifecycle

Safety:

- namespace every memory
- raw private transcripts are not default RAG input
- preserve source traceability
- avoid duplicate/conflicting memory systems without routing rules

### Browser and desktop voice

Use:

- Page-Agent
- RileyJarvis

Command OS roles:

- browser hands
- local desktop voice shell
- artifact panel
- computer-use mode after approval

Safety:

- browser actions are approval-gated
- no raw API keys in client/browser
- computer-control permissions withheld until safety layer exists

### Engineering and agent loop

Use:

- Ponytail
- RedPlanet Core
- gstack
- Agent OS / Design OS
- Agent Orchestrator
- OpenHands
- Goose

Command OS roles:

- spec loop
- design-before-code
- “less code” engineering guardrail
- coding-agent fleet
- CI/review feedback loops
- agent OS references

Safety:

- no install/team-mode/hook changes without approval
- no unrestricted shell
- no secrets in coding workspaces

### Video and media

Use:

- Remotion Agent Skills
- Songsee
- NotebookLM routines

Command OS roles:

- daily NotebookLM video package
- captions
- rendered explainers
- audio visualizations
- marketing/education video pipelines

Safety:

- external publishing requires approval
- generated voice/video must be labeled and reviewed
- no private meeting content in public media without approval

### Work and payment agents

Use:

- CashClaw external project
- internal CashClaw finance agent
- Execution Exchange

Command OS roles:

- work intake
- project delivery
- revenue tracking
- settlement records
- agent improvement loop

Safety:

- no autonomous payment movement
- no invoice/refund/order changes without approval
- payment/settlement rail remains compliance-gated

---

## 4. Visual direction from screenshots

The provided dashboard screenshots point toward:

- dark command center UI
- orange/gold highlights
- team-specific dashboards
- left navigation
- KPI cards across the top
- central workflow/analytics panel
- right-side charts/status
- bottom action sequence
- clear team identity per surface

Team dashboard surfaces:

```text
CEO
Marketing
Sales
Support
Finance
Engineering
```

Map to Command OS:

| Screenshot team | Command OS module |
| --- | --- |
| CEO | Robusca / Command Center |
| Marketing | Naledi / Content |
| Sales | Execution Exchange / Outreach |
| Support | Customer ops / Auto-Meat support |
| Finance | CashClaw |
| Engineering | Hermes / Goose / OpenClaw |

These should inform [UI_UX_STANDARD.md](UI_UX_STANDARD.md) and [FRONTEND_DESIGN_SKILLS.md](FRONTEND_DESIGN_SKILLS.md).

---

## 5. Install status

Current status:

```text
READ / INSPECTED:
- Agent-Reach public summary
- Ponytail public summary
- RedPlanet Core public summary
- COG Second Brain public summary
- TencentDB-Agent-Memory public summary
- CashClaw public summary
- Claude Skills ADHD article
- Remotion Agent Skills docs
- Startup Skill public summary
- last30days-skill public docs

ALREADY IN OS PLAN:
- Page-Agent
- RileyJarvis
- TencentDB-Agent-Memory
- Karpathy LLM-wiki
- Remotion
- Startup Skill
- CashClaw/internal finance agent

NOT INSTALLED:
- all requested external modules remain uninstalled until review/approval
```

---

## 6. Next actions

1. Pick which modules are “must install” vs “reference only.”
2. Vet install scripts for selected modules.
3. Add approved skills to MacOne / Command OS.
4. Create team dashboards for CEO, Marketing, Sales, Support, Finance, Engineering.
5. Connect research skills to daily routine and market intelligence.
6. Connect Remotion/Songsee to the NotebookLM video pipeline.
7. Keep payment/work-agent systems compliance-gated.


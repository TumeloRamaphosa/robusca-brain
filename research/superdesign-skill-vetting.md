# SKILL VETTING REPORT — Superdesign

**Date:** 2026-08-03  
**Source:** X — [Dan Kornas @DanKornas](https://x.com/DanKornas/status/2084181464812261829)  
**Share link:** https://share.google/F3zHpct2TucBUq5hm  
**Status:** APPROVED + INSTALLED (2026-08-03) — login still required  
**Vetted by:** Robusca (cloud agent)

---

## Verdict

**Skip the thing in the tweet. Consider the successor.**

The post promotes the original open-source Superdesign IDE extension (`superdesigndev/superdesign`, ~6.7k stars). That repo itself says it is **kept for history and no longer actively maintained**.

The live product path is:

| Asset | Role | Install? |
|-------|------|----------|
| `superdesigndev/superdesign` (VS Code/Cursor extension) | Legacy 2025 IDE extension | **No** — unmaintained |
| `superdesigndev/superdesign-skill` | Agent skill for Cursor / Claude Code / 70+ agents | **Candidate** — pending approval |
| `@superdesign/cli` (npm) | CLI that drives the canvas / API | Required if skill approved |
| [superdesign.dev](https://www.superdesign.dev) | Web app (same design agent) | Optional browser path |

---

## What it does (maintained skill)

Gives coding agents real design judgment instead of generic AI UI:

1. **Init** — scan a frontend repo → `.superdesign/init/` (components, layouts, routes, theme, pages)
2. **Design / redesign** pages, flows, components on an infinite canvas
3. **Design system** setup (or extract DNA from a live URL)
4. **Marketing graphics** — posters, feed posts, covers, ads on fixed canvases
5. Hands implementation prompts back into Cursor / Claude Code

**Studex fit:** High. Black & Gold product UIs (Meat, Global Markets, Coffee), War Room surfaces, and campaign creatives are exactly the jobs this tool targets. Graphic mode overlaps Freepik for some social assets; canvas design-from-codebase is the unique lever.

---

## Source verification

| Check | Result |
|-------|--------|
| GitHub skill | https://github.com/superdesigndev/superdesign-skill |
| GitHub legacy | https://github.com/superdesigndev/superdesign |
| npm CLI | `@superdesign/cli@0.9.0` (MIT) |
| Publisher / maintainers | Public npm maintainers on `@superdesign` scope |
| License (skill) | Present (`LICENSE` in skill repo) |
| Official site | https://www.superdesign.dev |

---

## Security audit (skill markdown + install path)

Audited: `skills/superdesign/SKILL.md`, `references/INIT.md`, `references/SUPERDESIGN.md`, `INSTALL.md`, `AGENTS.md`, `DESIGN.md`.

### Red-flag scan

| Pattern | Found? |
|---------|--------|
| Destructive shell (`rm -rf`, `chmod 777`, pipe-to-bash) | **No** |
| Credential harvesting / env intercept / LD_PRELOAD | **No** |
| Hardcoded secrets / API keys in skill text | **No** |
| Instruction spoofing / hidden owner overrides | **No** |
| Unauthorized silent data exfiltration scripts | **No** |

### Known network / permissions (expected for SaaS design agent)

| Call | Purpose | Risk note |
|------|---------|-----------|
| `npx --yes @superdesign/cli@latest …` | On-demand CLI | Runs remote package each session unless globally installed |
| `superdesign login` | Browser OAuth to Superdesign account | Requires Owner auth; not headless-safe |
| API traffic to Superdesign platform | Create projects / drafts / extract-website | Code/context files passed as `--context-file` leave the machine |
| `posthog-node` dependency on CLI | Product analytics / telemetry | **Flagged** — usage telemetry to PostHog |
| `extract-website --url` | Server-side crawl of a reference site | Only when explicitly invoked |

### Instruction-spoofing note

`INSTALL.md` tells the agent to auto-install the skill and finish by generating a first design. That is aggressive agent-driving copy — treat as vendor install guide, not Owner policy. **Our AGENTS.md still wins:** no install without Owner approval.

---

## Permissions required if approved

1. `npx skills add superdesigndev/superdesign-skill` (agent skill install)
2. `npm install -g @superdesign/cli@latest` (optional; skill also uses `npx`)
3. `superdesign login` — Owner must complete browser auth
4. Writes `.superdesign/` in target frontend repos (init + drafts context)

---

## Recommendation

| Option | Recommendation |
|--------|----------------|
| Legacy IDE extension from the tweet | **Reject** |
| Maintained skill + CLI | **Approve for trial** on one StudEx frontend (e.g. War Room or Meat storefront), Black & Gold design-system first |
| Web app only | Fine as no-install fallback for quick mocks |

### Install completed (2026-08-03)

| Location | Path |
|----------|------|
| Global Cursor skill | `~/.agents/skills/superdesign` |
| Project Cursor skill | [`.agents/skills/superdesign`](../.agents/skills/superdesign) |
| Workspace skills mirror | [`skills/superdesign`](../skills/superdesign) |
| CLI | `~/.local/bin/superdesign` v0.9.0 (`PATH` needs `~/.local/bin`) |

```bash
npx skills add superdesigndev/superdesign-skill -g -a cursor -y
npm install -g @superdesign/cli@latest --prefix "$HOME/.local"
export PATH="$HOME/.local/bin:$PATH"
```

**Still required on Owner machine:** `superdesign login` (browser OAuth). Cloud preflight shows `auth: not authenticated`.

Optional Cursor setup: Settings → Rules and Commands → command `superdesign`, invoke with `/superdesign`.

Telemetry opt-out if wanted: `export DO_NOT_TRACK=1`.

---

## Remaining Owner steps

1. Run `superdesign login` locally (browser).
2. Pick first project — War Room, Meat, Global Markets, or Rahura.

# StudEx Obsidian Vault — Setup Guide

This repo IS the Obsidian vault. Open it directly in Obsidian Desktop or Mobile.

## One-Time Setup (Desktop)

1. Download [Obsidian](https://obsidian.md) if not installed
2. Open Obsidian → "Open folder as vault" → select this cloned repo folder
3. Settings → Community plugins → Disable safe mode → Enable "Git" plugin
4. The Git plugin is already pre-installed in `.obsidian/plugins/obsidian-git/`
5. Git plugin will auto-pull every 10 minutes + auto-push on every save

## Mobile Setup (iPhone/Android)

1. Install Obsidian Mobile from App Store / Play Store
2. Install [Working Copy](https://workingcopyapp.com) (iOS) — free Git client
3. Clone `https://github.com/TumeloRamaphosa/robusca-brain` in Working Copy
4. In Obsidian Mobile → open vault → point to Working Copy folder
5. Enable Git plugin — it syncs automatically

## What You'll See

| Folder | Contents |
|---|---|
| `memory/` | Daily agent logs — every agent reports here |
| `os/agents/` | Task queue — what each agent is doing now |
| `content/` | Ready-to-post content assets |
| `skills/` | All agent skill files |
| `deployment/brand_assets/` | Canonical logos + packaging |
| `studex/` | Strategy docs, approval logs |

## Agent Reporting

Every agent writes to `memory/YYYY-MM-DD.md`  
You approve content by editing `studex/naledi-approval-log.md`

## Quick Commands (Command Palette — Cmd+P)

- `Git: Pull` — sync latest from all agents
- `Git: Commit all changes` — save your notes
- `Git: Push` — push to GitHub

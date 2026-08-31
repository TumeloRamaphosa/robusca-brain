# Scheduled Routines & Sync

The OS runs on a daily rhythm plus a continuous memory sync. **This document describes the
desired schedule — it does not create any scheduled task.** Agent Lord (or the harness)
sets these up locally; nothing here registers a cron/launchd job by itself.

> Times below are in Agent Lord's timezone, **Asia/Dubai (GMT+4)**, unless he prefers SAST —
> confirm the timezone when scheduling locally.

## 1. Morning brief — 08:30

**Goal:** wake the OS with situational awareness.

- Pull overnight signals: new email (triaged, drafts prepared — not sent), calendar for the
  next 24–48h, social mentions, Shopify/orders snapshot, any `studex-system-alerts`.
- Distill into a short morning brief for Agent Lord.
- Surface anything waiting on approval from the day before.

## 2. Day kickoff — 09:00

**Goal:** turn the brief into a plan.

- Agent Robusca proposes the day's priorities and task routing across Naledi / Auto-Meat /
  Hermes.
- Stage any content/email/ads work into the review queue (still behind approval gates).
- Confirm the day's content calendar in FeedHive (staged, not published).

## 3. Evening wrap — 17:00

**Goal:** close the loop and capture.

- Report what shipped vs. what's pending approval.
- Roll up analytics/sales signals into the War Room feedback loop.
- Trigger a capture pass: ensure the day's dictations/notes are structured in Obsidian.
- Note tomorrow's carry-over items.

## 4. Obsidian ↔ GitHub sync — every 12 hours

**Goal:** keep the capture surface and the source-of-truth in agreement.

- Every 12 hours, commit the Obsidian vault's new/changed notes to `robusca-brain` and pull
  any remote changes back down.
- Vault path (local config value, do not access from cloud agents):
  `/Users/tumeloramaphosa/Documents/Obsidian Vault/2nd Brainses`
- Suggested cadence: **08:00 and 20:00** local (12 hours apart) — align with the morning
  brief so notes are fresh before the 08:30 routine.
- The scribe (local Qwen) writes notes continuously; this sync is the durable checkpoint.

### Desired sync behaviour (to implement locally)

- Commit message convention: `chore(vault): 12h sync <YYYY-MM-DD HH:MM>`.
- Conflict policy: **never discard** — resolve conflicts by merge, surface anything ambiguous
  to Agent Lord rather than overwriting.
- Secrets: the sync must never commit `.env`, tokens, or credential files. Keep a
  `.gitignore` in the vault for these.

## 5. How routines relate to heartbeats vs cron

Per the workspace conventions (`AGENTS.md`):

- **Batch the morning/evening checks into a heartbeat** where timing can drift slightly.
- **Use precise scheduling (cron/launchd) for the exact-time items** (08:30 / 09:00 / 17:00)
  and the 12-hour sync.
- One-shot reminders → cron.

> **This subagent does not create any of these jobs.** It only documents the intended
> schedule. Set them up locally and record the job IDs in `TOOLS.md`/`MEMORY.md`.

## 6. Approval reminder

None of these routines may auto-send. Morning triage prepares **drafts**; the evening wrap
**reports**; everything external still passes the approval gate in
[security-and-approvals.md](security-and-approvals.md).

_Last updated: 2026-06-14._

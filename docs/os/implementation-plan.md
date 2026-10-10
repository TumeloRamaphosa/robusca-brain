# Robusca OS — Implementation Plan & Checklist

A practical, phased checklist to stand up the operating system. Work top to bottom; each phase
unblocks the next. Tick items as they're completed and record any IDs/paths in `TOOLS.md`.

> **Guardrails for every phase:** no secrets in files; all send/publish/ad/customer actions
> behind approval gates; no scheduled jobs created blindly — set them up locally and record
> the IDs. See [security-and-approvals.md](security-and-approvals.md).

---

## Phase 0 — Foundations

- [ ] Confirm `robusca-brain` is the source of truth and this `docs/os/` folder is merged.
- [ ] Confirm timezone for routines (Asia/Dubai vs SAST).
- [ ] Ensure repo `.gitignore` excludes `.env` and credential files.
- [ ] Create / confirm a secrets vault or local env for all credential handles.

## Phase 1 — Local hotkey separation

- [ ] Bind **WhisperFlow** activation to the **Control** key (reserved exclusively).
- [ ] Bind **Perplexity/Computer** to **press-and-hold Command**.
- [ ] Verify no other app/Karabiner/BTT rule claims Control.
- [ ] Test: Control → dictation works; Command-hold → Perplexity/Computer opens; normal
      Command shortcuts still work on tap.
- Ref: [voice-and-capture.md](voice-and-capture.md)

## Phase 2 — Obsidian / Qwen scribe pipeline

- [ ] Confirm local Qwen is installed and running as the scribe agent.
- [ ] Wire WhisperFlow transcript → Qwen → structured Obsidian note (use the note template).
- [ ] Point the pipeline at the vault: `/Users/tumeloramaphosa/Documents/Obsidian Vault/2nd Brainses`
      (local config; never accessed by cloud agents).
- [ ] Add a `.gitignore` inside the vault for `.env`/secret files.
- [ ] Test a full dictation → note → file round trip.
- Ref: [voice-and-capture.md](voice-and-capture.md)

## Phase 3 — Reload agent communication

- [ ] Confirm the `reload` MCP server is live (HTTP, `https://mcp.reload.chat/mcp`).
- [ ] Issue one fresh token per agent identity (`claude-studex-os`, `cursor-studex-os`, …).
- [ ] Create channels: `studex-os-control`, `studex-meat-content`, `studex-meat-commerce`,
      `studex-agent-memory`, `studex-system-alerts`.
- [ ] Send a harmless test message into `studex-os-control`.
- [ ] Verify each token can be revoked independently.
- [ ] Adopt the event vocabulary (`content_job_created` … `publish_completed`).
- Ref: [reload-comms.md](reload-comms.md)

## Phase 4 — Google / Agent Mail triage

- [ ] Connect Gmail / Agent Mail by credential handle (no keys in files).
- [ ] Enable inbound triage: classify, label, summarize, prepare **drafts only**.
- [ ] Confirm sending is gated (no auto-send).
- [ ] Wire the morning brief to surface urgent mail.
- Ref: [content-social-ads.md](content-social-ads.md), [routines.md](routines.md)

## Phase 5 — WhatsApp setup

- [ ] Connect WhatsApp provider by handle.
- [ ] Enable inbound read/triage.
- [ ] Define pre-approved transactional templates (order confirmation, etc.) and get Agent
      Lord's standing sign-off on each.
- [ ] Confirm all non-template outbound messages are approval-gated.
- Ref: [content-social-ads.md](content-social-ads.md)

## Phase 6 — Facebook / Instagram / Meta Ads permissions & audit

- [ ] Inventory Pages, ad accounts, and pixels the OS can reach, and at what role (document
      the inventory, not tokens).
- [ ] Start read-only: verify insights match Ads Manager.
- [ ] Gate all writes (campaign create/edit, budget change, boost) behind approval.
- [ ] Stand up the audit workflow: log every ad change (who/what/why) to
      `studex-system-alerts` / War Room.
- Ref: [content-social-ads.md](content-social-ads.md)

## Phase 7 — FeedHive scheduling

- [ ] Connect FeedHive by handle.
- [ ] Confirm the calendar reflects staged (not published) content.
- [ ] Confirm posts only enter the publish queue after the approval gate.
- Ref: [content-social-ads.md](content-social-ads.md)

## Phase 8 — Freepik + Higgsfield media generation

- [ ] Connect Freepik (images) and Higgsfield (video) by handle.
- [ ] Connect AestheticsMeet for brand-aesthetic consistency.
- [ ] Route all generated assets through the review queue with brand/product/Halaal QA.
- [ ] Confirm generation never auto-publishes.
- Ref: [content-social-ads.md](content-social-ads.md)

## Phase 9 — Routines & 12-hour sync

- [ ] Schedule **08:30** morning brief, **09:00** day kickoff, **17:00** evening wrap locally.
- [ ] Schedule the **12-hour Obsidian↔GitHub sync** (suggested 08:00 / 20:00 local).
- [ ] Use heartbeats for batchable drift-tolerant checks; cron/launchd for exact times.
- [ ] Record all job IDs in `TOOLS.md` / `MEMORY.md`.
- [ ] Confirm no routine can auto-send (drafts/reports only).
- Ref: [routines.md](routines.md)

> **Note:** This subagent did **not** create any of these scheduled jobs. Phase 9 must be
> executed locally by Agent Lord / the local harness.

## Phase 10 — Verify the whole loop

- [ ] Dictate → Qwen → Obsidian → Git sync lands a note.
- [ ] Create a content job → assets generate → review queue → approval → (mock) publish.
- [ ] Confirm an approval request flows over Reload and surfaces in the War Room.
- [ ] Confirm every external action was blocked until approved.
- [ ] Confirm no secrets exist anywhere in the repo.

_Last updated: 2026-06-14._

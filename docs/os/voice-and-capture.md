# Voice, Hotkeys & the Obsidian/Qwen Capture Pipeline

This is the **input layer** of the OS: how Agent Lord's voice and intent get captured,
transcribed, structured, and persisted into memory.

## 1. Hotkey separation (local macOS configuration)

Two distinct press behaviours, two distinct tools. Keeping them separate prevents collisions
between dictation and the cloud orchestrator.

| Trigger | Bound to | Behaviour |
|---------|----------|-----------|
| **Control key** | **WhisperFlow** | Dictation / transcription. Reserved exclusively for WhisperFlow. Do not bind Control to anything else. |
| **Command (press-and-hold)** | **Perplexity / Computer** | Press-and-hold Command activates the Perplexity/Computer orchestrator surface. |

### Why the separation matters

- **Control = capture.** WhisperFlow owns Control so dictation is always one key away and
  never fights another binding.
- **Command-hold = act.** Press-and-hold Command brings up Perplexity/Computer (the cloud
  orchestrator surface for Agent Robusca) without interfering with normal Command shortcuts
  (a quick tap still behaves normally; only press-and-hold triggers it).

### Setup notes (done locally by Agent Lord)

- Configure WhisperFlow's activation hotkey to **Control**.
- Configure the Perplexity/Computer launcher to **press-and-hold Command**.
- Verify no other macOS app or Karabiner/BetterTouchTool rule claims Control, or it will
  steal WhisperFlow's trigger.

> These are **local machine settings**. Nothing here is stored in the repo as a secret.

## 2. The Qwen scribe pipeline

**Local Qwen acts as the scribe / capture agent for WhisperFlow.** When Agent Lord dictates,
the flow is:

```
Agent Lord speaks
      │  (Control held → WhisperFlow)
      ▼
WhisperFlow transcribes speech → text
      │
      ▼
Local Qwen (scribe agent)
   • cleans / structures the transcript
   • tags it (topic, project, date)
   • writes it into the Obsidian vault as a note
      │
      ▼
Obsidian vault (local capture surface)
      │  (12-hour sync — see routines.md)
      ▼
GitHub (robusca-brain) — durable source of truth
```

### What Qwen does

- **Capture, not publish.** Qwen only writes local notes and syncs to Git. It never sends
  emails, posts, or messages — those are execution actions behind approval gates.
- **Structure the raw transcript.** Turn a stream-of-consciousness dictation into a clean,
  tagged Obsidian note (title, date, tags, body).
- **Preserve intent.** Don't editorialize; capture what Agent Lord actually said, then add
  light structure on top.

### Obsidian vault location (local configuration value)

```
/Users/tumeloramaphosa/Documents/Obsidian Vault/2nd Brainses
```

> This path is a **local configuration value only**. Do not access it from any cloud agent or
> subagent; document it here so the capture pipeline knows where notes land. The vault is
> Agent Lord's machine, synced to Git on the 12-hour cadence.

### Suggested note format Qwen writes

```markdown
---
title: <short title from the dictation>
date: 2026-06-14
source: whisperflow
tags: [capture, <project>, <topic>]
---

<cleaned, structured transcript>

## Action items (if any)
- [ ] ...
```

## 3. Capture → memory handoff

- Raw dictations land as daily/topic notes in the vault.
- On the 12-hour sync, notes are committed to `robusca-brain`.
- During memory maintenance (heartbeats), Agent Robusca distills durable items from these
  notes into `MEMORY.md` — raw notes stay as the log, curated wisdom rises to `MEMORY.md`.

## 4. Privacy

- Voice transcripts may contain personal/business context. They stay local until synced to
  the **private** `robusca-brain` repo.
- Never route a raw transcript to a public channel or external service.

## 5. Local hotkey troubleshooting & findings (macOS)

Findings from auditing the actual local install. The dictation app referenced throughout as
"WhisperFlow" is the product **Wispr Flow**. These are app/config names and key-code values
only — no secrets or private user data.

### Installed apps

| App | Path | Bundle ID |
|-----|------|-----------|
| Wispr Flow (dictation/PTT) | `/Applications/Wispr Flow.app` | `com.electron.wispr-flow` |
| Flow | `/Applications/Flow.app` | `com.licardo.Flow` |
| Perplexity | `/Applications/Perplexity.app` | `ai.perplexity.macv3` |
| Comet | `/Applications/Comet.app` | `ai.perplexity.comet` |

> Note: `Flow.app` (`com.licardo.Flow`) is a **different app** from Wispr Flow — don't
> confuse the two when configuring shortcuts.

### Wispr Flow push-to-talk binding (Control)

- Config path: `~/Library/Application Support/Wispr Flow/config.json`
- Push-to-talk lives in `prefs.cache.splitKeybinds` with value `ptt` and shortcut `[59]`.
- **Key code `59` = the Control key on macOS** — so Wispr Flow's PTT is already bound to
  Control, matching the desired final state.

### Perplexity visor shortcut (currently Control-based)

- Found in defaults domain `ai.perplexity.macv3`:
  `KeyboardShortcuts_toggleVisor = {"carbonKeyCode":49,"carbonModifiers":768}`
- Carbon key code `49` is **Space**; modifier mask `768` includes **Control**. So the visor
  toggle currently uses a **Control-based** combination — which **collides with Wispr Flow's
  Control PTT** and must be moved.

### Recommended final state

1. **Keep Control reserved for Wispr Flow** dictation / push-to-talk.
2. **Move Perplexity/Computer activation off Control** — ideally to a supported
   **Command-based** shortcut set **through the Perplexity UI**, not by editing defaults.
3. **Caveat:** a modifier-only **Command** trigger (press-and-hold Command) may require
   explicit app support and may **not be safely writable via `defaults`**. Prefer the
   in-app shortcut UI; if modifier-only Command isn't supported, use a Command + key combo
   that doesn't overlap Control.

> All values above are key codes and app/config identifiers, intentionally free of any
> secrets or personal data. Apply changes through each app's preferences UI where possible.

_Last updated: 2026-06-14._

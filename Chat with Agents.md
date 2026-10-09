# Chat with agents — start here

Open this note in Obsidian, then talk to ClawX / Copilot / WhatsApp using the vault as context.

## Prompt starters

- Based on `memory/` today and yesterday, what’s unfinished?
- Summarize our ClawX / voice setup from `CLAWX_FINISH.md` and `VOICE_ASSISTANT_OS.md`.
- What should I do next from `SETUP_STATUS.md`?
- Draft tomorrow’s StudEx brief into today’s memory note.
- Create a Linear issue from the blockers in today’s memory (after Linear is connected).

## How agents load context

```bash
bash scripts/vault-chat-context.sh
bash scripts/vault-chat-context.sh "Obsidian ClawX"
```

Full guide: [[OBSIDIAN_AGENTS]]

## Rules

- Agents ground answers in vault notes
- Decisions get written to `memory/YYYY-MM-DD`
- No API keys in notes

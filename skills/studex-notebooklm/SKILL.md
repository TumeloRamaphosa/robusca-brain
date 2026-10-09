---
name: studex-notebooklm
description: "Connect to Google NotebookLM via the notebooklm-mcp server to query Studex notebooks, add sources, and generate audio/studio artifacts. Use when asked about NotebookLM, podcast generation from notebooks, research questions against Studex sources, or SGM script generation from NotebookLM."
metadata:
  author: robusca
  version: "1.0"
  business: StudEx Group
  last_updated: "2026-07-13"
---

# StudEx NotebookLM Skill

## When to Use

Load when Tumelo asks to:
- Query / chat with a NotebookLM notebook
- Generate Audio Overview / podcast from a notebook
- Add sources to NotebookLM
- Produce SGM scripts or research answers grounded in notebook sources
- "Talk to NotebookLM", "ask the notebook", "generate podcast"

## Prerequisites

1. MCP server `notebooklm-mcp` must be enabled (see [notebooklm/AGENT_CONNECTION.md](../../notebooklm/AGENT_CONNECTION.md)).
2. Auth must be live: `nlm login --check` reports configured (or `NOTEBOOKLM_COOKIES` holds a **full** Google cookie header).
3. Default notebook ID (owner-linked):

```
98636c01-c524-4ff8-a9f6-05770487a7ec
```

URL: https://notebooklm.google.com/notebook/98636c01-c524-4ff8-a9f6-05770487a7ec

Local source docs live in [`notebooklm/`](../../notebooklm/).

## Tool Map (notebooklm-mcp)

Prefer these MCP tools in order:

| Goal | Tool |
|------|------|
| Confirm auth / version | `server_info` |
| List notebooks | `notebook_list` |
| Notebook details | `notebook_get` |
| Ask a question | `notebook_query` |
| Add URL/text/file source | `source_add` |
| Generate podcast / studio | `studio_create` then `studio_status` |
| Download artifact | `download_artifact` |

If MCP tools are unavailable, fall back to local markdown sources under `notebooklm/` and say auth/MCP is offline.

## Default Workflow — Research Q&A

1. `server_info` — if auth is `stale` / `not_configured`, stop and tell Tumelo to run `nlm login` (do **not** ask him to paste cookies in chat).
2. `notebook_query` with `notebook_id=98636c01-c524-4ff8-a9f6-05770487a7ec` and the user question.
3. Return the answer with citations. Keep brand voice: Black & Gold, CEO-pace, no fluff.

## Default Workflow — Podcast / Audio Overview

1. Confirm the correct notebook (default ID above unless Tumelo names another topic from the notebook-0N set).
2. `studio_create` with `artifact_type=audio`, `confirm=True`.
3. Poll `studio_status` until ready.
4. `download_artifact` to `content/` if he wants the MP3 in-repo.
5. Log the action in `memory/YYYY-MM-DD.md` (no secrets).

## Syncing Vault Sources → NotebookLM

When asked to push vault briefs into NotebookLM:

1. Read the matching `notebooklm/notebook-0N-*.md`.
2. `source_add` with `source_type=text` (or `file` if uploading a saved file), `wait=True`.
3. Optionally add URLs from that file's "Sources to Add in NotebookLM" section via `source_type=url`.

## Hard Rules

- **Never** write cookies, `AQ.*` tokens, or `auth.json` into the repo, chat, or memory files.
- **Never** put secrets in `.cursor/mcp.json` — use `nlm login` or env injection outside git.
- If auth fails, instruct: run `nlm login` on a browser machine, then restart Cursor.
- Prefer MCP over scraping NotebookLM in a browser.

## Related

- Connection setup: [`notebooklm/AGENT_CONNECTION.md`](../../notebooklm/AGENT_CONNECTION.md)
- Source briefs: [`notebooklm/README.md`](../../notebooklm/README.md)

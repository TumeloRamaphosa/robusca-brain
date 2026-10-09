# Connect an Agent to NotebookLM

**Status:** MCP wired in this vault. Auth still needs a one-time Google login (or a full cookie header).  
**Default notebook:** `98636c01-c524-4ff8-a9f6-05770487a7ec`  
**URL:** https://notebooklm.google.com/notebook/98636c01-c524-4ff8-a9f6-05770487a7ec

Google does **not** ship an official NotebookLM API. Agents connect through the community MCP server [`notebooklm-mcp-cli`](https://github.com/jacob-bd/notebooklm-mcp-cli) (`nlm` + `notebooklm-mcp`).

---

## What is already done in this repo

| Piece | Location |
|-------|----------|
| Project MCP config | [`.cursor/mcp.json`](../.cursor/mcp.json) |
| Agent skill | [`skills/studex-notebooklm/SKILL.md`](../skills/studex-notebooklm/SKILL.md) |
| Source briefs | [`notebooklm/`](./) |
| Secret template | [`.env.example`](../.env.example) |
| Gitignore for auth files | [`.gitignore`](../.gitignore) |

On this cloud VM, `notebooklm-mcp-cli` is also installed (`nlm`, `notebooklm-mcp`) and registered for Cursor under `~/.config/cursor/mcp.json`.

---

## What you still must do (auth)

A single `AQ.…` string is **not** enough. NotebookLM auth needs Google **web session cookies** (`SID`, `HSID`, `SAPISID`, `__Secure-1PSID`, …).

### Option A — Recommended (browser, once)

On a machine where you can sign into Google (your Mac):

```bash
# Install if needed
uv tool install notebooklm-mcp-cli

# One-time login (opens browser → sign in → cookies cached locally)
nlm login

# Verify
nlm login --check
nlm notebook list
```

Then restart Cursor. The agent can call `notebook_list` / `notebook_query`.

### Option B — Full cookie header (headless / this cloud agent)

1. Open https://notebooklm.google.com while logged in  
2. DevTools → Network → filter `batchexecute` → click a request  
3. Copy the full `cookie:` **header value** (long `SID=…; HSID=…; …` string)  
4. Set it as an environment variable for the MCP process — **not in chat, not in git**:

```bash
export NOTEBOOKLM_COOKIES='SID=...; HSID=...; ...'   # full header only
nlm login --check
nlm notebook list
```

Or inject `NOTEBOOKLM_COOKIES` via Cursor’s secret/env UI into the MCP server env.

**Do not** paste cookies or `AQ.*` tokens into chat again. Rotate anything already pasted (see `KEY_ROTATION_CHECKLIST.md` item 8).

---

## Cursor setup (local Mac)

1. Install CLI: `uv tool install notebooklm-mcp-cli`
2. Auth: `nlm login`
3. Ensure MCP is present — either:
   - this repo’s [`.cursor/mcp.json`](../.cursor/mcp.json), or
   - run `nlm setup add cursor`
4. Cursor → **Settings → Tools & MCP** → confirm `notebooklm-mcp` is on
5. Restart Cursor
6. In Agent chat: “List my NotebookLM notebooks” or “Ask notebook `98636c01-c524-4ff8-a9f6-05770487a7ec`: …”

---

## Agent usage (after auth)

```
Ask NotebookLM (default Studex notebook): <question>
Generate Audio Overview for the default notebook
Add this URL as a source to the default notebook: <url>
```

Skill `studex-notebooklm` tells the agent which MCP tools to call.

---

## Verify

```bash
nlm doctor
nlm login --check
nlm notebook list
nlm notebook query 98636c01-c524-4ff8-a9f6-05770487a7ec "Summarize this notebook in 5 bullets"
```

If `auth_status` is `stale` → run `nlm login` again.  
If `unverified` → network issue; cookies may still work.

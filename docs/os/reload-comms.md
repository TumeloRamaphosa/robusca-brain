# Reload — Agent Communication Layer

**Reload is the agent communication layer for the Robusca OS.** It is how agents talk to each
other, how status flows, and how approval requests reach Agent Lord. GitHub stays the
source-of-truth/handoff layer; Reload is the live message bus on top of it.

## 1. Current status

The Claude MCP Reload server has been added successfully:

| Field | Value |
|-------|-------|
| Server name | `reload` |
| Transport | HTTP |
| URL | `https://mcp.reload.chat/mcp` |
| Config location | Local Claude user config |

> **Tokens are never stored here.** Each agent gets its own Reload bearer token, kept in the
> local environment / OS keychain / secret manager — never written into this repo.

## 2. What Reload routes

- Agent-to-agent updates and handoffs.
- Human approval requests (the most important traffic — see
  [security-and-approvals.md](security-and-approvals.md)).
- Content generation job updates.
- Campaign / ad status changes.
- Shopify, orders, and fulfilment alerts.
- War Room event notifications.
- System errors, failed jobs, missing approvals, expired tokens.

## 3. Channels

| Channel | Purpose |
|---------|---------|
| `studex-os-control` | Operator-level commands and status (primary shared channel) |
| `studex-meat-content` | Content generation and approvals |
| `studex-meat-commerce` | Shopify, orders, products, payments, fulfilment |
| `studex-agent-memory` | Memory events, summaries, retrieval updates |
| `studex-system-alerts` | Errors, failed jobs, missing approvals, expired tokens |

## 4. Agent identities

Use one fresh Reload token **per agent identity**. Do not combine multiple tokens in one
`Authorization` header — each MCP client gets exactly one bearer token.

| Agent | Reload identity |
|-------|-----------------|
| Claude | `claude-studex-os` |
| Cursor | `cursor-studex-os` |
| Codex | `codex-studex-os` |
| Hermes | `hermes-studex-os` |
| OpenClaw | `openclaw-studex-os` |
| Anti Gravity | `antigravity-studex-os` |

## 5. Event payload vocabulary

Standardize the lifecycle events so any agent can interpret another's messages:

```
content_job_created → asset_ready_for_review → approval_required
        → approved | rejected → publish_requested → publish_completed
```

Link each event to its references: Reload message ID, GitHub issue/PR ID, War Room job ID,
and any generated asset ID. This keeps the bus, the source-of-truth, and the control plane
in agreement.

## 6. Setup runbook (run locally)

Paste the freshly rotated, Claude-specific Reload token only when prompted, so it never lands
in shell history:

```bash
read -s RELOAD_CLAUDE_TOKEN
claude mcp add --transport http reload https://mcp.reload.chat/mcp \
  --header "Authorization: Bearer ${RELOAD_CLAUDE_TOKEN}"
unset RELOAD_CLAUDE_TOKEN
```

Verify:

```bash
claude mcp list
```

For clients that use JSON config (e.g. Cursor), reference an env var rather than inlining the
token:

```json
{
  "mcpServers": {
    "reload": {
      "url": "https://mcp.reload.chat/mcp",
      "headers": { "Authorization": "Bearer ${RELOAD_CURSOR_TOKEN}" }
    }
  }
}
```

Store `RELOAD_CURSOR_TOKEN` in the local environment / keychain, not in the file.

## 7. Safety checks before real use

1. Confirm each agent can connect to the Reload MCP server.
2. Send a harmless test message into `studex-os-control`.
3. Confirm the War Room can display / ingest the message.
4. **Confirm no agent can publish externally without an approval state.**
5. Confirm each token can be revoked independently.

_Last updated: 2026-06-14._

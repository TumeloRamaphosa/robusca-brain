# 🚨 URGENT — Key Rotation Checklist

**Created:** 2026-06-17
**Status:** OPEN — work through top to bottom
**Reason:** robusca-brain was public from creation until 2026-06-17 04:28 SAST. All keys committed to repo during that window must be considered compromised.

---

## Action items for Tumelo (only you can do these)

Open each link in a new tab. Revoke the listed key. Generate a fresh one. Keep the new key on your clipboard, then come back and tell Robusca which one to slot into the vault.

| # | Service | Action | Old key (last 8 chars to identify) | Where |
|---|---|---|---|---|
| 1 | **AgentMail** (key A) | Revoke + regenerate | `...aa3188` | [agentmail.to](https://agentmail.to) → Settings → API Keys |
| 2 | **AgentMail** (key B) | Revoke (don't need 2) | `...b60005` | Same dashboard, same step |
| 3 | **FeedHive** | Revoke + regenerate | `...408f4` | [feedhive.com](https://feedhive.com) → Settings → Account → API Key |
| 4 | **DTN** | Revoke + regenerate | `...be839` | DTN dashboard → API |
| 5 | **Affine MCP** | Revoke + regenerate | `...AukCY` | [app.affine.pro](https://app.affine.pro) → Settings → Tokens |
| 6 | **Freepik** | Revoke + regenerate | `...3bef0b` | [freepik.com/api](https://www.freepik.com/api) |
| 7 | **DeepSeek / Tencent LKE** | Revoke + regenerate | `...4a4e1` | [console.cloud.tencent.com/lkeap](https://console.cloud.tencent.com/lkeap) |
| 8 | **Google / NotebookLM session token** | Revoke session + sign out other devices; do not reuse chat-pasted token | `AQ.…ONKLzbJJ` (last 8) | Google Account → Security → Your devices / 2FA sessions. **Never paste tokens in chat.** Vault only. |

---

## After rotation — vault each new key

For each rotated key, tell Robusca: **"vault the new {SERVICE} key"** — she will open the secure form. Paste the new key into the masked field of the form, **never in chat**.

Vault handles (what Robusca uses to call each service after vaulting):

| Service | Vault handle |
|---|---|
| AgentMail | `custom-cred:api.agentmail.to` |
| FeedHive | `custom-cred:api.feedhive.com` |
| DTN | `custom-cred:api.dtn.tld` (confirm host) |
| Affine | `custom-cred:app.affine.pro` |
| Freepik | `custom-cred:api.freepik.com` |
| DeepSeek/LKE | `custom-cred:api.lkeap.cloud.tencent.com` (already exists, needs new value) |

---

## Why this matters

Old leaked keys may already be in:
- GitHub's public secret scanning index (auto-shared with vendors for proactive revocation)
- Automated GitHub scrapers (run by malicious bots and competitors alike)
- Search engine caches of the public repo
- Wayback Machine snapshots

Rotating breaks all of them in one move. Until rotation, treat every old key as if a stranger has it.

---

## What Robusca will do once each key is vaulted

1. Update all skills + workflows to reference `custom-cred:<host>` handles
2. Re-test each integration with a single tool call to confirm auth works
3. Log "rotated YYYY-MM-DD" in `memory/` (no value, just date stamp)
4. Notify OpenCode sister agent that the vault entry is live

---

*Last updated by Robusca · 2026-06-17 · SAST*

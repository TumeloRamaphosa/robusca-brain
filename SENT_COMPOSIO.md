# Sent.dm + Composio — StudEx wiring

**Status:** Scaffold only — **no API keys in repo**  
**Updated:** 2026-07-13

---

## Security first

A Composio API key was pasted into chat on 2026-07-13. That key is **burned**.

1. Revoke it at [app.composio.dev](https://app.composio.dev) (see [KEY_ROTATION_CHECKLIST.md](KEY_ROTATION_CHECKLIST.md) item 8)
2. Generate a new key
3. Tell Robusca: **“vault the new Composio key”** — paste into the secure form, never chat
4. Locally: copy [.env.example](.env.example) → `.env.local` and fill values yourself

Never commit `.env` / `.env.local`. Never paste `ak_…` / `SENT_…` into Discord, GitHub, or agent chat.

---

## Two products, two jobs

| Product | Job in the mesh |
|---|---|
| **[Composio](https://composio.dev)** | Action layer — GitHub / Notion / Slack / Stripe / Sheets via AI intents |
| **[Sent.dm](https://www.sent.dm)** | Unified messaging — SMS / WhatsApp / RCS (one API) |

Canonical agent flow stays:

```
RileyJarvis → Ollama (Qwen3) → robusca-brain → N8N → Notion
```

Composio = tool executor. Sent = customer/ops messaging pipe (complements Meta Cloud / RileyJarvis WhatsApp).

---

## Get started links (Tumelo)

1. Sent: https://www.sent.dm/en  
2. Full demo source: https://github.com/sonnysangha/sent-dm-demo  
3. Sent docs: https://docs.sent.dm  
4. Composio dashboard: https://app.composio.dev  

Local clone for reference (gitignored): `.agents/sent-dm-demo`

```bash
# After vaulting a FRESH Composio key into env (not chat):
cp .env.example .env.local
# edit .env.local — COMPOSIO_API_KEY=… SENT_DM_API_KEY=…
python3 scripts/composio-smoke.py
```

Demo stack (from their README): Next.js + `@sentdm/sentdm` + Convex. Env vars they use:

- `SENT_DM_API_KEY`
- `SENT_DM_WEBHOOK_SECRET`
- `SENT_DM_PARCEL_TEMPLATE_ID`
- `NEXT_PUBLIC_CONVEX_URL`

---

## StudEx decision (open)

| Option | When |
|---|---|
| Keep **RileyJarvis** WhatsApp for Tumelo ↔ agent | Voice / personal channel |
| Add **Sent.dm** for customer SMS/WhatsApp/RCS | Order alerts, auction, cart recovery |
| Keep **Meta Cloud API** skill | Existing StudEx Meat WABA path |

Recommend: RileyJarvis = operator channel; Sent or Meta = customer messaging. Don’t dual-write the same blast to both without a single orchestrator (N8N).

---

*Cipher Tr@ce · Robusca · StudEx*

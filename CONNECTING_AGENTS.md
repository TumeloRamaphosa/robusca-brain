# Connecting New Agents to the StudEx Stack

**Audience:** Any new AI agent joining the Tumelo Ramaphosa / StudEx ecosystem
**Maintained by:** Robusca (Perplexity Computer)
**Last updated:** 2026-07-14

---

## TL;DR for a sister agent

You are joining a multi-agent system around Tumelo Ramaphosa, owner of StudEx Meat (consumer e-commerce, Wagyu biltong) and Studex Global Markets (B2B trade intelligence, SA-Russia corridor). His wife Kate runs a separate brand (Rahura, AI/fitness/apparel — under construction). Robusca is the lead orchestrator. Your job is whatever Tumelo assigns; the rules below are non-negotiable.

**Clone this brain:**

```bash
git clone https://github.com/TumeloRamaphosa/robusca-brain.git
cd robusca-brain
```

Read in order: this file → `SOUL.md` → `USER.md` → `IDENTITY.md` → `CLAWX_MODELS.md` → `COMPOSIO_MESH.md` → `memory/` (today + yesterday).

**ClawX on Mac Mini:** cloud LLM = Xiaomi MiMo (vaulted); local LLM = Ollama. Voice = Kokoro + Whisper. See `CLAWX_MODELS.md` + `CLAWX_VOICE_MAC_MINI.md`.

---

## Hard rules

1. **Never put a raw secret in a file, repo, log, or chat message.** Every secret lives in the Perplexity credential vault, addressed by a handle (`custom-cred:<host>`). When you need to call a service, pass the handle to your runtime — the secret is injected via HTTPS proxy at call time and never enters your context.

2. **Never write `password`, `bearer <token>`, `Authorization: <key>` literals.** Use env var placeholders: `${SHOPIFY_TOKEN}`, `${AGENTMAIL_API_KEY}`, etc. The runtime resolves these from the vault.

3. **Never commit anything matching common secret patterns** (`sk-`, `am_us_`, `fh_`, `ghp_`, `EAA`, `shpat_`, `AIza`, `xoxb-`, etc.) — pre-commit hooks should block it. If you see a leaked secret in repo, flag it and write to `KEY_ROTATION_CHECKLIST.md`, never quote the value.

4. **Never log customer PII** (names, phone numbers, full email addresses, payment info) beyond aggregated counts in `memory/`. Order details: count and total value only.

5. **Tumelo speaks via voice transcription a lot** — expect typos, missing words, garbled phrases. Always confirm scope before you act when intent is unclear.

---

## The credential vault — how to use it

Tumelo's vault currently holds (or should hold after rotation):

| Handle | Service | Purpose |
|---|---|---|
| `custom-cred:api.lkeap.cloud.tencent.com` | DeepSeek / Tencent LKE | LLM inference (also opencode SDK) |
| `custom-cred:api.agentmail.to` | AgentMail | Outbound campaigns, reply routing |
| `custom-cred:api.feedhive.com` | FeedHive | Social scheduling (IG/FB/LI/X/YT) |
| `custom-cred:api.freepik.com` | Freepik | AI image gen (Mystic, Flux) + stock |
| `custom-cred:api.minimax.io` | MiniMax | Video/audio generation |
| `custom-cred:app.affine.pro` | Affine MCP | Knowledge base (Naledi identity sheet etc.) |
| `custom-cred:platform.xiaomimimo.com` | Xiaomi MiMo | ClawX cloud LLM |
| `custom-cred:backend.composio.dev` | Composio | Action layer (GitHub/Notion/Slack/Stripe/Sheets) |

To call a service from a `bash` tool call:

```bash
# Don't paste the key. Don't read it from a file. Just pass the handle.
curl -X GET https://api.feedhive.com/posts \
  -H "Accept: application/json"
# When called with api_credentials=["custom-cred:api.feedhive.com"],
# the Authorization header is auto-injected by the proxy.
```

In Python:

```python
import httpx
# httpx respects HTTPS_PROXY, so credentials are injected transparently.
r = httpx.get("https://api.feedhive.com/posts")
```

**Footguns:**
- `aiohttp` ignores `HTTPS_PROXY` — use `httpx.AsyncClient` instead
- WebSocket / gRPC over h2c are not intercepted — fall back to REST
- SDKs that pin their own transport (some vendor SDKs) may bypass the proxy — use raw `httpx` / `requests` instead

---

## Connected services map (by skill)

Each Robusca skill is the canonical owner of one or more integrations. Don't reinvent.

| Skill | Owns | Tooling |
|---|---|---|
| `studex-morning-brief` | Daily digest aggregation | Shopify, Gmail, AgentMail, Google Ads, Facebook Ads |
| `studex-shopify-fulfil` | Order fulfilment, tracking | Shopify Admin API (private app) |
| `studex-inventory-audit` | Stock levels, negative SKU detection | Shopify Inventory API |
| `studex-ads-manager` | Ads performance, budget tuning | Google Ads API, Facebook Marketing API |
| `studex-meta-whatsapp` | WhatsApp blasts + replies | Meta Cloud API (WhatsApp Business) |
| `studex-content-approvals` | War Room v2 queue | Internal (file-based + Notion) |
| `studex-notebooklm` | Studex Global Markets script gen | NotebookLM (manual + API) |
| `robusca-memory-sync` | Session logs → GitHub + memory | This repo + Perplexity memory |
| `higgsfield-video` | Soul-ID Naledi/Aurora video | platform.higgsfield.ai REST |
| `huashu-design` | HTML→MP4/GIF/poster | Local Node renderer (Playwright + ffmpeg) |
| `open-generative-ai` | 200+ image/video models | api.muapi.ai |

Connectors available (Perplexity-managed, no vault needed):
`shopify`, `slack_direct`, `google_ads__pipedream`, `google_analytics__pipedream`, `google_forms__pipedream`, `supabase`, `hugging_face`, `google_search_console__pipedream`, `discord__pipedream`, `google_cloud_vision_api__pipedream`, `notion_mcp`, `vercel`, `discord_bot__pipedream`, `context7`, `facebook_pages__pipedream`, `google_drive`, `gcal`, `github_mcp_direct`, `finance`

---

## The architecture in one diagram

```
                    ┌───────────────────────────────────────┐
                    │  TUMELO (voice commands, mostly)      │
                    │  Devices: MacBook Pro M1 Max,         │
                    │           Mac mini M4 (Auto Meat VM)  │
                    └──────────────────┬────────────────────┘
                                       │
       ┌───────────────────────────────┼───────────────────────────────┐
       │                               │                               │
┌──────┴───────────┐         ┌─────────┴──────────┐         ┌──────────┴────────┐
│  ROBUSCA         │         │  OPENCODE          │         │  AURORA (planned) │
│  (Perplexity     │         │  (Claude Code      │         │  inside BAASH! VM │
│   Computer —     │         │   sister agent —   │         │                   │
│   you, reader)   │         │   joining now)     │         │                   │
└──────┬───────────┘         └─────────┬──────────┘         └──────────┬────────┘
       │                               │                               │
       └───────────────┬───────────────┴───────────────┬───────────────┘
                       │                               │
              ┌────────┴────────┐             ┌────────┴────────┐
              │ Credential vault│             │ robusca-brain   │
              │ (Perplexity)    │             │ GitHub (PRIVATE)│
              │ handles only    │             │ docs + memory   │
              └────────┬────────┘             └─────────────────┘
                       │
       ┌───────────────┼───────────────┐
       │               │               │
┌──────┴────┐  ┌───────┴─────┐  ┌──────┴────┐
│ Shopify   │  │ Meta /      │  │ FeedHive  │
│ studexmeat│  │ WhatsApp /  │  │ scheduler │
│           │  │ FB / IG     │  │           │
└───────────┘  └─────────────┘  └───────────┘
       │               │               │
       └───────────────┴───────────────┘
                       │
              ┌────────┴────────────┐
              │ END CUSTOMERS       │
              │ (SA-wide, B2B + B2C)│
              └─────────────────────┘
```

---

## Joining instructions for a new sister agent

If you are the **OpenCode agent** Tumelo is onboarding:

1. **Pull this repo**: `gh repo clone TumeloRamaphosa/robusca-brain` (you must be added as a collaborator first — Tumelo grants this from GitHub repo settings).
2. **Read in order**: this file → `MEGAPROMPT_OPENCODE.md` → `AGENTS.md` → `AGENT_PERPLEXITY_ROBUSCA.md` → `IDENTITY.md` → `USER.md`.
3. **Do NOT** push any secret, credential, or password to this repo. Use the vault.
4. **Coordination**: Robusca is the primary orchestrator. You take task assignments from Tumelo and/or Robusca. When you finish work, write a session log to `memory/YYYY-MM-DD.md` following the format in `skills/robusca-memory-sync/SKILL.md`.
5. **Conflict resolution**: if Robusca and you have conflicting instructions, Tumelo decides. Quote both positions; don't unilaterally act.

---

## Heartbeat

Every agent commits a one-line heartbeat to `HEARTBEAT.md` at session start and session end with their name and timestamp. This lets Tumelo and other agents see who's active.

---

*Robusca · 2026-06-17 · SAST*

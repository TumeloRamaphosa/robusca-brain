# StudEx Operating System — Agent Config
> Single source of truth for all agents in the StudEx ecosystem.
> Every agent should clone this repo and read this file first.

**Repo:** https://github.com/TumeloRamaphosa/robusca-brain  
**Owner:** Tumelo Ramaphosa (t.ramaphosa@studex.dev)  
**Timezone:** Africa/Johannesburg (SAST = UTC+2)  
**Orchestrator:** Perplexity Computer / Cipher Tr@ce  
**Action layer:** Composio — see [COMPOSIO_MESH.md](COMPOSIO_MESH.md)  
**ClawX models/voice:** [CLAWX_MODELS.md](CLAWX_MODELS.md) · [CLAWX_VOICE_MAC_MINI.md](CLAWX_VOICE_MAC_MINI.md)  
**Finish checklist:** [SETUP_STATUS.md](SETUP_STATUS.md)  
**Voice assistant OS (MiniMax + Ollama + Notion/Linear):** [VOICE_ASSISTANT_OS.md](VOICE_ASSISTANT_OS.md)  
**Control flow:** `Speak → Whisper → Ollama → Agents act (Notion/Linear) → MiniMax TTS`


---

## Agent Roster

| Agent | Role | Platform |
|---|---|---|
| **Robusca** | Orchestrator / Memory | Perplexity Computer |
| **Naledi** | CMO / Content & Influencer | Claude / Pipedream |
| **Hermes** | Messenger / WhatsApp & Email | Goose / Mac mini |
| **OpenClaw** | Google Ads / SEO | Claude Code |
| **CashClaw** | Revenue / Shopify Orders | Claude Code |
| **Goose** | Dev / Deployment | Goose AI (Mac mini) |
| **Aurora** | Brand Voice / Creative | Claude |

All agents report to: **Perplexity Computer (Robusca)**  
All agents write logs to: `memory/YYYY-MM-DD.md` in this repo  
All agents read tasks from: `os/agents/AGENTS.md`

---

## Platform Accounts

### Shopify
- Store: `studexmeat.myshopify.com`
- Location ID: `gid://shopify/Location/71788003570`
- Admin: https://admin.shopify.com/store/studexmeat

### Facebook / Meta
- Page: StudEx Meat | Page ID: `108934711902801`
- Ad Account: `act_560666565541381`
- App ID: `1649681979685968`
- Instagram ID: `17841403538967823` (@ramaphosatumelo — 86,846 followers)

### WhatsApp Business
- WABA ID: `105198275846951` (studexmeat.com)
- Phone Number ID: `117882611239791`
- Number: `+27 79 498 8737`
- Status: DISCONNECTED — needs SMS verification at:
  https://developers.facebook.com/apps/1649681979685968/whatsapp-business/wa-dev-console

### Google Ads
- Account: `2234319068`
- Dashboard: https://ads.google.com/aw/campaigns?ocid=2234319068

| Campaign | ID | Budget/day | Status |
|---|---|---|---|
| PMAX - SALES | 20300874153 | R1,400 | ENABLED (0 spend — needs assets) |
| BRAND Search | 20655386827 | R200 | ENABLED |
| GEN Search | 21586907226 | R50 | ENABLED (wrong keywords) |
| SHOPPING | 21767664900 | R150 | PAUSED — enable Week 2 |

### Google Analytics 4
- StudEx Meat: `properties/295728486`
- StudEx DEV: `properties/454752068`

---

## Brand Assets (in this repo)

| Asset | Path |
|---|---|
| Canonical Logo (gold seal) | `deployment/brand_assets/studex_meat_seal_gold_CANONICAL.png` |
| Biltong Packaging (canonical) | `deployment/brand_assets/studex_biltong_gold_CANONICAL_PACKAGING.jpg` |
| Global Markets Logo | `deployment/brand_assets/studex_global_markets_logo.jpeg` |

**BRAND RULE:** Always use the gold circular seal for StudEx Meat.  
Never use the Global Markets circuit-bull logo for Meat content.  
Always use REAL packaging photo — never AI-generated packaging.

---

## Credentials

All secrets live at `~/.studex/meta.env` on the Mac (never in this repo).  
Agents running on Mac mini read from the same file.

```
META_ACCESS_TOKEN=<in meta.env>
WHATSAPP_PHONE_NUMBER_ID=117882611239791
WHATSAPP_BUSINESS_ACCOUNT_ID=105198275846951
META_APP_ID=1649681979685968
META_PAGE_ID=108934711902801
META_AD_ACCOUNT=act_560666565541381
META_INSTAGRAM_ID=17841403538967823
```

---

## Rules (Non-Negotiable)

1. **NEVER post content without Tumelo's explicit approval**
2. **NEVER create Shopify products without explicit approval**
3. Customer names = initials only (privacy)
4. All monetary values = R prefix
5. Privacy toggle must mask all numbers as `••••••` in dashboards
6. Single VM on Fly.io (datanetics-app) — everything on ONE machine
7. Vercel = web apps/dashboards | Fly.io = always-on agents
8. Do deep research (last30days + Agent-Reach) BEFORE creating any content

---

## Reporting Protocol

Every agent writes a daily log here:
`memory/YYYY-MM-DD.md`

Format:
```
# Agent Log — {date}
Agent: {name}
## Actions
- [what was done]
## Results
- [outcomes]
## Blockers
- [anything pending]
```

---

## Content Pipeline

1. Generate → `content/YYYY-MM-DD/`
2. Submit for approval → `studex/naledi-approval-log.md`
3. Wait for Tumelo's "post it" command
4. Post via Graph API (Facebook/Instagram) or WhatsApp Cloud API
5. Log result in `memory/YYYY-MM-DD.md`

24h Posting Calendar: `os/war-room/` (War Room app)

---

## Key Files in This Repo

| File | Purpose |
|---|---|
| `AGENTS.md` | Agent roster + responsibilities |
| `CONNECTING_AGENTS.md` | How to connect new agents |
| `os/agents/AGENTS.md` | Active agent task queue |
| `os/war-room/` | War Room dashboard (React app) |
| `skills/` | All agent skill files |
| `memory/` | Daily logs from all agents |
| `deployment/brand_assets/` | Canonical logos + packaging |
| `deployment/studex_os/` | OS prompts + handoff docs |

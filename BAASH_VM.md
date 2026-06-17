# BAASH! VM — Kate's Stack

**Owner:** Kate (Tumelo's wife)
**Host target:** Orgo.ai VM (separate from StudEx infra)
**Status:** SPEC — provisioning pending
**Last updated:** 2026-06-17

---

## What BAASH! is

A self-contained AI + commerce + content VM for Kate's brand world. Separate from StudEx infra so credentials, dashboards, and traffic don't mix.

Name is intentionally `BAASH!` with double-A and exclamation mark — branding.

## Contents

| Component | Purpose | Tech |
|---|---|---|
| **n8n orchestrator** | All workflows for Kate's brands | Docker, port 5678 |
| **TencentDB Agent Memory** | Identity locks for Kate + Aurora | Docker, port 8420 |
| **Freepik shared service** | Image gen for all BAASH! brands | n8n node calling `api.freepik.com` |
| **Content dashboard** | War Room v2 fork for Kate's approval queue | Static HTML + tiny backend |
| **Kate's online store** | Repo TBD — Tumelo to share | Likely Shopify-adjacent or custom |
| **Kids Claude Code course platform** | Membership + lessons + certification | TBD — see "Open decisions" |

## Brands inside BAASH!

### Rahura by Kate
- Fitness + apparel + AI education
- Owner: Kate
- Domain: **TBD** (rahura.io is taken by an unrelated Rwandan stationery wholesaler; Tumelo to choose alternative — e.g. `rahurabykate.com`, `rahurakids.ai`, `kateraj.com`)
- Brand voice: empowered, educational, accessible to kids and parents
- AI persona: **Aurora**

### Flagship product: Kids Claude Code
- Online membership for kids learning AI + code + online business
- Modules build to certification
- YouTube channel = top-of-funnel + free preview lessons
- Paid subscription = full curriculum + community + certification
- Age tiers: TBD (proposed: 7–10, 11–14, 15–18)

## Aurora — the AI persona

See `AURORA_IDENTITY.md` for the identity protocol (placeholder until Tumelo sends references).

Aurora's role inside BAASH!:
- Co-host of Kids Claude Code lessons
- Brand ambassador for Rahura fitness/apparel
- Cross-brand face — appears in all BAASH! content
- Distinct from Naledi (no visual confusion)

## VM provisioning checklist

When Tumelo green-lights provisioning, this is the sequence:

### Phase 1 — Host setup
- [ ] Tumelo signs up at [orgo.ai](https://orgo.ai) if not already
- [ ] Tumelo creates API key in Orgo dashboard → vault as `custom-cred:api.orgo.ai`
- [ ] Provision Linux VM, name `baash`, 4 vCPU / 8 GB RAM / 50 GB disk (minimum for n8n + TencentDB + dashboard)
- [ ] Install Docker + docker-compose
- [ ] Configure persistent volumes for n8n + TencentDB
- [ ] Expose n8n via HTTPS (Cloudflare Tunnel or Caddy + Let's Encrypt)

### Phase 2 — Core services
- [ ] Pull n8n image: `docker pull n8nio/n8n`
- [ ] Pull TencentDB Agent Memory: `docker pull tencent/agent-memory:latest` (verify image name from [github.com/Tencent/TencentDB-Agent-Memory](https://github.com/Tencent/TencentDB-Agent-Memory))
- [ ] Bring up via `docker-compose.yml` (template below)
- [ ] Verify n8n at `https://baash.<domain>/n8n`
- [ ] Verify TencentDB Hermes Gateway at `https://baash.<domain>/memory`

### Phase 3 — Workflows
- [ ] n8n workflow: **"Brief → Draft"** — webhook in, Freepik/Higgsfield image gen, push to dashboard
- [ ] n8n workflow: **"Approved → Publish"** — read approval status, fan out to FeedHive Triggers
- [ ] n8n workflow: **"Lesson → Video"** — script → Aurora voice → huashu HTML lesson → MP4 export

### Phase 4 — Front-ends
- [ ] Content dashboard fork (War Room v2 → War Room BAASH!) — separate approval queue
- [ ] Kids Claude Code membership site scaffolding — platform TBD
- [ ] YouTube channel art + intro/outro templates (huashu-design)

## docker-compose.yml template (sketch)

```yaml
version: '3.8'
services:
  n8n:
    image: n8nio/n8n
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_HOST=baash.${DOMAIN}
      - N8N_PROTOCOL=https
      - WEBHOOK_URL=https://baash.${DOMAIN}/
      - N8N_ENCRYPTION_KEY=${N8N_ENCRYPTION_KEY}
    volumes:
      - n8n_data:/home/node/.n8n

  agent-memory:
    image: tencent/agent-memory:latest
    restart: always
    ports:
      - "8420:8420"
    volumes:
      - memory_data:/data
    environment:
      - HERMES_API_KEY=${HERMES_API_KEY}

  dashboard:
    image: nginx:alpine
    restart: always
    ports:
      - "80:80"
    volumes:
      - ./dashboard:/usr/share/nginx/html:ro

volumes:
  n8n_data:
  memory_data:
```

All env vars (`N8N_ENCRYPTION_KEY`, `HERMES_API_KEY`, etc.) resolved from Perplexity vault at deploy time — **never committed**.

## Open decisions (Tumelo must answer)

1. **Domain for Rahura** — what's the canonical URL?
2. **Membership platform for Kids Claude Code** — Shopify subscriptions? Memberstack? Custom?
3. **Aurora reference photos** — Tumelo to provide 9 contexts (see `AURORA_IDENTITY.md` for the spec)
4. **YouTube channel name** — "Rahura by Kate" or separate channel for kids course?
5. **Whose card pays for Orgo + Freepik usage** — Kate's business account or Tumelo's StudEx account?

## Status log

- **2026-06-17** — Spec drafted by Robusca. Awaiting Tumelo's Orgo provisioning + key rotation completion.

---

*Robusca · 2026-06-17 · SAST*

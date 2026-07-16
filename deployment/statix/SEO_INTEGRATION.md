# SEO Office + claude-seo → Statix Dashboard

How **companies** and **people** from [seo-os](https://github.com/AgriciDaniel/seo-os) appear inside the Statix NestVM dashboard.

## What each repo does

| Repo | Role | UI needed? |
|------|------|------------|
| **seo-os** (SEO Office) | Full operating system — 3D office, 25 specialists, per-client brain vault | Yes — runs on port 3000 |
| **claude-seo** | SEO analysis skill library (25 sub-skills, 18 agents) | No — already vendored inside seo-os |

**You only deploy seo-os.** claude-seo is the engine underneath; specialists in SEO Office call it automatically.

## Data model (where companies & people live)

SEO Office stores everything in `./.seo-office/` on disk:

```
.seo-office/
  vaults/<client-slug>/
    wiki/
      entities/          ← People, Brands, Competitors, Tools
      overview.md
      ...
  index.db               ← SQLite mirror for fast queries
```

| What you want | SEO Office API | Statix proxy |
|---------------|----------------|--------------|
| **Companies** (clients) | `GET /api/clients` | `GET /api/seo/clients` |
| **People + entities** | `GET /api/brain?slug=<client>` | `GET /api/seo/brain/:slug` |
| **Knowledge graph** | `GET /api/brain/graph?slug=<client>` | (future) |
| **3D office** | `http://localhost:3000/office` | Link from dashboard |

The brain API returns notes grouped by type. Statix maps:

- `stakeholder` + entity notes tagged `people` → **People**
- entity notes tagged `brands` → **Brands**
- entity notes tagged `competitors` → **Competitors**

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Statix Dashboard (port 5180)                           │
│  /dashboard/demo → Companies tab                        │
│       │                                                 │
│       ▼  proxy                                          │
│  GET /api/seo/clients                                   │
│  GET /api/seo/brain/:slug                               │
└───────────────────────┬─────────────────────────────────┘
                        │ SEO_OFFICE_URL
                        ▼
┌─────────────────────────────────────────────────────────┐
│  SEO Office (port 3000)                                 │
│  /api/clients        → listClients() from SQLite        │
│  /api/brain?slug=…   → entities, stakeholders, audits   │
│  /office             → 3D UI + 25 claude-seo specialists │
└─────────────────────────────────────────────────────────┘
```

## Setup (Orgo VM)

### 1. Install SEO Office

```bash
git clone https://github.com/AgriciDaniel/seo-os.git ~/seo-office
cd ~/seo-office
bash scripts/install.sh
cp .env.example .env.local
# Add ANTHROPIC_API_KEY or Claude CLI auth
pnpm dev   # → http://localhost:3000
```

Requirements: Node 24+, pnpm 10+, Python 3.11+.

### 2. Add a company (client)

Open `http://localhost:3000/clients/new` or:

```bash
curl -X POST http://localhost:3000/api/clients \
  -H "Content-Type: application/json" \
  -d '{"name":"Studex Meat","site_url":"https://studexmeat.com","business_type":"ecommerce"}'
```

### 3. Populate people & entities

In SEO Office:

1. Open the client → `/office?client=<slug>`
2. Ask orchestrator: **"build the brain"**
3. Specialists (vault-synthesizer, claude-seo) write entity notes under `wiki/entities/`

People appear after the brain scaffold runs. Empty vault = empty dashboard — that's expected.

### 4. Wire Statix

In `deployment/statix/.env.local`:

```env
SEO_OFFICE_URL=http://localhost:3000
```

If Statix and SEO Office run on the same Orgo VM, use `http://127.0.0.1:3000`.

Restart Statix:

```bash
cd deployment/statix
npm run dev
```

Open `http://localhost:5180/dashboard/demo` → **Companies** tab.

## Docker / production (both on one VM)

```yaml
# docker-compose excerpt
services:
  statix:
    build: ./deployment/statix
    ports: ["5180:5180"]
    environment:
      SEO_OFFICE_URL: http://seo-office:3000

  seo-office:
    build: ./seo-office
    ports: ["3000:3000"]
    volumes:
      - seo-data:/app/.seo-office
```

## Mapping to Studex tenants

When a NestVM tenant is provisioned via `/api/nestvm/provision`, you can auto-create a matching SEO Office client:

```bash
# Future webhook (Polsia → Statix → SEO Office)
POST /api/clients
{ "name": "<companyName>", "site_url": "<domain>", "owner": "<tenantSlug>" }
```

Tenant slug ↔ client slug keeps one brain per Statix customer.

## War Room integration (optional)

The Studex War Room (`os/war-room/`) can use the same proxy pattern:

1. Add `SEO_OFFICE_URL` to War Room server env
2. Add a **SEO** or **Companies** tab that calls `/api/seo/clients`
3. Link through to Statix dashboard or iframe `/office`

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| "SEO Office is not connected" | `pnpm dev` in seo-os; set `SEO_OFFICE_URL` |
| Companies list empty | Create client at `/clients/new` |
| People list empty | Run "build the brain" in SEO Office for that client |
| CORS errors | Use Statix proxy routes — don't call port 3000 from browser directly |

## License note

seo-os is **AGPL-3.0**. If you serve it over the network (multi-tenant SaaS), AGPL obligations apply. For internal Studex/Statix use on your own VM, you're fine. Consult counsel before white-labeling SEO Office to external customers.

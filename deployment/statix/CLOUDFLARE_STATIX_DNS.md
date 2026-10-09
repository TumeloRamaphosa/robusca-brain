# Cloudflare DNS — statix.com Setup

**Goal:** Point statix.com to the Statix NestVM app.  
**Time:** ~15 minutes in Cloudflare dashboard.  
**Owner:** Tumelo (Cloudflare access required)

---

## Prerequisites

- Domain `statix.com` added to Cloudflare (nameservers active)
- Deploy target ready (pick one):
  - **Fly.io** — `statix-nestvm.fly.dev`
  - **Vercel** — `statix.vercel.app`
  - **Orgo VM** — your server IP
  - **Cloudflare Pages** — direct from GitHub

---

## Step 1 — Remove conflicting records

In Cloudflare → **statix.com** → **DNS** → **Records**:

1. Delete any old A/CNAME pointing to previous host
2. Delete wildcard `*` if it conflicts

---

## Step 2 — Root domain (statix.com)

### Option A — Cloudflare Pages / Vercel (recommended for 3-hour launch)

| Type | Name | Content | Proxy |
|---|---|---|---|
| CNAME | `@` | `statix-nestvm.fly.dev` (or Vercel URL) | Proxied (orange cloud) |

*Note: Cloudflare CNAME flattening allows CNAME on root.*

### Option B — Direct IP (Orgo VM)

| Type | Name | Content | Proxy |
|---|---|---|---|
| A | `@` | `YOUR.SERVER.IP` | Proxied |

---

## Step 3 — Subdomains

| Type | Name | Content | Purpose |
|---|---|---|---|
| CNAME | `www` | `statix.com` | WWW redirect |
| CNAME | `api` | same as root or `api.statix-nestvm.fly.dev` | API server |
| CNAME | `*` | same as root | Tenant dashboards: `{tenant}.statix.com` |

**Tenant routing:** Wildcard `*.statix.com` → same app. App reads hostname to load tenant (e.g. `acme.statix.com` → tenant `acme`).

---

## Step 4 — SSL/TLS

Cloudflare → **SSL/TLS** → **Overview**:
- Set to **Full (strict)** if origin has valid cert
- Set to **Full** for Fly.io / Vercel (they provide certs)

---

## Step 5 — Redirect www (optional)

**Rules** → **Redirect Rules**:
- `www.statix.com/*` → `https://statix.com/$1` (301)

---

## Step 6 — Verify

```bash
# DNS propagation
dig statix.com +short
dig api.statix.com +short

# HTTP check
curl -I https://statix.com
curl https://statix.com/api/health
```

Expected health response:
```json
{"ok":true,"service":"statix-nestvm","version":"0.1.0"}
```

---

## Step 7 — Update old domains (optional)

If migrating from `superagents.studex.dev`:

| Old | New |
|---|---|
| superagents.studex.dev | statix.com |
| *.nestvm.studex.dev | *.statix.com |

Add Cloudflare **Page Rule** or **Redirect Rule**:
- `superagents.studex.dev/*` → `https://statix.com/$1` (301)

---

## Fly.io deploy commands (fastest path)

```bash
cd deployment/statix
npm install
npm run build
fly launch --name statix-nestvm --region jnb
fly deploy
fly certs add statix.com
fly certs add "*.statix.com"
```

Then point Cloudflare CNAME `@` → `statix-nestvm.fly.dev`.

---

## Troubleshooting

| Issue | Fix |
|---|---|
| SSL handshake error | Set SSL to Full, not Flexible |
| 522 timeout | Origin not running — check `fly status` |
| Wrong site | Clear Cloudflare cache → Purge Everything |
| API 404 | Ensure `api.statix.com` routes to port 5181 or same app with `/api` paths |

---

*Tumelo: once DNS is live, reply "statix live" and we dogfood onboarding end-to-end.*

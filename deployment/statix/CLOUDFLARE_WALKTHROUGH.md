# Cloudflare Walkthrough — statix.com (step by step)

**Time:** 15–20 minutes  
**You need:** Cloudflare account, statix.com domain, Orgo VM running Statix on port 5180

---

## Part A — Find your Orgo VM IP (do this first)

### Option 1 — Orgo dashboard
1. Go to [orgo.ai](https://orgo.ai) → log in
2. Open workspace **Studex Wildlife**
3. Click computer **StudEx Meat - Auto Meat** (or your Statix VM)
4. Copy the **public IP** or connection URL shown

### Option 2 — After deploy script runs
On the Orgo VM, Statix listens on `http://127.0.0.1:5180`. You need the VM's **public IP** for Cloudflare.

Save it as `ORGO_VM_IP` in `.env.local` if using the automated DNS script.

---

## Part B — Deploy Statix to Orgo (agent or you)

### 1. Create secrets file (never commit this)

```bash
cd deployment/statix
cp .env.example .env.local
```

### 2. Edit `.env.local` — fill in:

```
ORGO_API_KEY=your_key_from_orgo.ai/start
ORGO_COMPUTER_ID=946b3156-cab9-4187-a94b-056dfab35105
ORGO_VM_IP=YOUR.ORGO.PUBLIC.IP
```

### 3. Check credentials

```bash
npm run check:env
```

### 4. Deploy

```bash
npm run deploy:orgo
```

You should see: `[statix] LIVE — http://127.0.0.1:5180/api/health`

---

## Part C — Cloudflare DNS (manual — recommended first time)

### Step 1 — Log in
1. Open [dash.cloudflare.com](https://dash.cloudflare.com)
2. Click **statix.com** in your sites list  
   - If not listed: **Add site** → enter `statix.com` → follow nameserver instructions at your registrar

### Step 2 — Get Zone ID (for API script later)
1. On statix.com overview page, scroll right sidebar
2. Copy **Zone ID** → paste into `.env.local` as `CLOUDFLARE_ZONE_ID`

### Step 3 — DNS records
1. Left menu → **DNS** → **Records**
2. Delete old A/CNAME records pointing elsewhere (if any)

3. **Add record — root domain:**
   | Field | Value |
   |---|---|
   | Type | `A` |
   | Name | `@` |
   | IPv4 address | `YOUR.ORGO.VM.IP` |
   | Proxy status | **Proxied** (orange cloud ON) |
   | TTL | Auto |

4. **Add record — www:**
   | Type | `A` |
   | Name | `www` |
   | IPv4 | same Orgo IP |
   | Proxy | Proxied |

5. **Add record — wildcard (tenant subdomains):**
   | Type | `A` |
   | Name | `*` |
   | IPv4 | same Orgo IP |
   | Proxy | Proxied |

   This enables `demo.statix.com`, `acme.statix.com`, etc.

### Step 4 — SSL
1. Left menu → **SSL/TLS** → **Overview**
2. Set encryption mode to **Full** (not Flexible)
3. If Orgo has no HTTPS cert yet, use **Flexible** temporarily, then upgrade to Full once Caddy/nginx is on Orgo

### Step 5 — Redirect www (optional)
1. **Rules** → **Redirect Rules** → **Create rule**
2. Name: `www to root`
3. When: hostname equals `www.statix.com`
4. Then: redirect to `https://statix.com` — 301

### Step 6 — Verify (wait 2–5 minutes)

```bash
dig statix.com +short
curl -I https://statix.com
curl https://statix.com/api/health
```

Expected:
```json
{"ok":true,"service":"statix-nestvm","version":"0.1.0"}
```

### Step 7 — Test the product
- https://statix.com — landing
- https://statix.com/onboarding — voice onboarding (allow mic)
- https://statix.com/dashboard/demo — NestVM dashboard

---

## Part D — Automated DNS (API token — Path B)

**Use this if you cannot click the Cloudflare dashboard.**

### Step 1 — Create token with correct permissions

Cloudflare → **My Profile** → **API Tokens** → **Create Token**

Use template **Edit zone DNS**, scoped to your zone.

Required permission:
- **Zone → DNS → Edit**

The token must be able to **read and write DNS records**. A read-only or zone-overview token will fail preflight.

### Step 2 — Confirm which domain you own in Cloudflare

```bash
# After adding token to .env.local:
npm run cf:preflight
```

If `statix.com` is **not** in your Cloudflare account yet, you have two options:

| Option | What to do |
|--------|------------|
| **A — Add statix.com** | Cloudflare → Add site → point registrar nameservers → re-run preflight |
| **B — Use studex-group.com subdomain** | Set `STATIX_DOMAIN=statix.studex-group.com` and `CLOUDFLARE_ZONE_ID` for studex-group.com |

### Step 3 — Fill `.env.local`

```bash
cd deployment/statix
cp .env.example .env.local
```

```
CLOUDFLARE_API_TOKEN=your_token_here
CLOUDFLARE_ZONE_ID=your_zone_id
ORGO_VM_IP=YOUR.ORGO.PUBLIC.IP
STATIX_DOMAIN=statix.com
# Or interim: STATIX_DOMAIN=statix.studex-group.com
```

### Step 4 — Run automation

```bash
npm run cf:preflight   # validates token + zone + DNS permission
npm run cf:dns         # creates/updates A records (@, www, *)
```

Records created:
- `STATIX_DOMAIN` → Orgo VM IP (proxied)
- `www.STATIX_DOMAIN` → Orgo VM IP (proxied)
- `*.STATIX_DOMAIN` → Orgo VM IP (proxied) — tenant subdomains

### Security

- Never paste API tokens in chat or commit `.env.local`
- Rotate any token that was exposed in plain text

---

## Part E — Expose port 5180 on Orgo (if site doesn't load)

Orgo VMs may need a reverse proxy. On the VM:

```bash
# Install caddy
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update && sudo apt install caddy

# Caddyfile — proxy to Statix
echo 'statix.com, www.statix.com, *.statix.com {
  reverse_proxy 127.0.0.1:5180
}' | sudo tee /etc/caddy/Caddyfile

sudo systemctl reload caddy
```

Then set Cloudflare SSL to **Full (strict)**.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `check:env` fails | Create `.env.local` from `.env.example` |
| Orgo deploy 401 | Rotate API key at orgo.ai — old key was leaked per security log |
| Site 522 | Statix not running — SSH/VNC to Orgo, `tail /tmp/statix.log` |
| Site shows wrong page | Cloudflare → Caching → Purge Everything |
| Voice doesn't work | Browser needs HTTPS + microphone permission |
| `/api/health` 404 | Ensure PORT=5180 and NODE_ENV=production |

---

## What I can do vs what you must do

| Task | Agent | You |
|---|---|---|
| Build Statix v1 | ✓ Done | — |
| Create deploy scripts | ✓ Done | — |
| Run `deploy:orgo` | ✓ Once you add `.env.local` | Paste ORGO_API_KEY |
| Cloudflare dashboard clicks | ✗ No access to your account | 15 min manual steps above |
| Cloudflare API DNS | ✓ Once token has DNS Edit + zone in `.env.local` | Create token + ORGO_VM_IP |

**Fastest path:** Paste your Orgo API key into `deployment/statix/.env.local` and tell me **"deploy now"** — I'll run the deploy script immediately.

---

*Statix v1 · Orgo VM · Cloudflare · Polsia-ready*

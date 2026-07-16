# Cloudflare Walkthrough — StudEx on studex-group.com

**Time:** 15–20 minutes  
**You need:** Cloudflare account, `studex-group.com` zone, Orgo VM running StudEx on port 5180

> **Legacy:** If you own `statix.com` separately, see [CLOUDFLARE_STATIX_DNS.md](./CLOUDFLARE_STATIX_DNS.md). The product brand is **StudEx**; production hostnames live under **studex-group.com**.

---

## Part A — Find your Orgo VM IP (do this first)

### Option 1 — Orgo dashboard
1. Go to [orgo.ai](https://orgo.ai) → log in
2. Open workspace **Studex Wildlife**
3. Click computer **Project - 2571: Super Agents Command** (or your StudEx VM)
4. Copy the **public IP** or connection URL shown

### Option 2 — After deploy script runs
On the Orgo VM, StudEx listens on `http://127.0.0.1:5180`. You need the VM's **public IP** for Cloudflare.

Save it as `ORGO_VM_IP` in `.env.local` if using the automated DNS script.

---

## Part B — Deploy StudEx to Orgo (agent or you)

### 1. Create secrets file (never commit this)

```bash
cd deployment/statix
cp .env.example .env.local
```

### 2. Edit `.env.local` — fill in:

```
ORGO_API_KEY=your_key_from_orgo.ai/start
ORGO_COMPUTER_ID=333de3f8-0801-430b-a541-aad458e896b5
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

You should see: `[studex] LIVE — http://127.0.0.1:5180/api/health`

---

## Part C — Cloudflare DNS (studex-group.com)

### Fixed hostnames (no wildcards)

| Hostname | Purpose |
|----------|---------|
| `studex.studex-group.com` | Landing + demo dashboard |
| `agent.studex-group.com` | Agent entry + API |
| `www.agent.studex-group.com` | Agent entry (www) |

Tenant dashboards use `{tenant}.agent.studex-group.com` when wildcard routing is added later.

### Automated (recommended)

```bash
npm run cf:preflight
npm run cf:studex
```

See [STUDEX_DNS.md](./STUDEX_DNS.md) for details.

### Manual — Cloudflare dashboard

1. Open [dash.cloudflare.com](https://dash.cloudflare.com) → **studex-group.com**
2. **DNS** → **Records** → add proxied **A** records for each hostname → `ORGO_VM_IP`
3. **SSL/TLS** → **Full** (use Cloudflare Tunnel if Orgo blocks inbound ports)

### Verify

```bash
curl -s https://studex.studex-group.com/api/health
curl -s https://agent.studex-group.com/api/health
```

Expected:
```json
{"ok":true,"service":"studex-nestvm","version":"0.1.0"}
```

### Test the product
- https://studex.studex-group.com — landing
- https://studex.studex-group.com/onboarding — voice onboarding (allow mic)
- https://studex.studex-group.com/dashboard/demo — NestVM dashboard

---

## Part D — Cloudflare Tunnel (Orgo recommended)

Orgo often blocks inbound ports. Use a tunnel instead of raw A records:

```bash
npm run tunnel:orgo
```

Or run `cloudflared` on the VM with ingress for `studex.studex-group.com` and `agent.studex-group.com` → `http://127.0.0.1:5180`.

---

## Part E — Caddy on Orgo (optional)

```bash
npm run caddy:orgo
```

Routes `studex.studex-group.com` and `agent.studex-group.com` to StudEx on `:5180`.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `check:env` fails | Create `.env.local` from `.env.example` |
| Orgo deploy 401 | Rotate API key at orgo.ai |
| Site 522 | StudEx not running — check VM logs |
| Site shows wrong page | Cloudflare → Caching → Purge Everything |
| Voice doesn't work | Browser needs HTTPS + microphone permission |
| `/api/health` 404 | Ensure PORT=5180 and NODE_ENV=production |

---

## What I can do vs what you must do

| Task | Agent | You |
|---|---|---|
| Build StudEx v1 | ✓ Done | — |
| Create deploy scripts | ✓ Done | — |
| Run `deploy:orgo` | ✓ Once you add `.env.local` | Paste ORGO_API_KEY |
| Cloudflare dashboard clicks | ✗ No access to your account | 15 min manual steps above |
| Cloudflare API DNS | ✓ Once token has DNS Edit + zone in `.env.local` | Create token + ORGO_VM_IP |

**Fastest path:** Paste your Orgo API key into `deployment/statix/.env.local` and tell me **"deploy now"** — I'll run the deploy script immediately.

---

*StudEx v1 · Orgo VM · Cloudflare · Polsia-ready*

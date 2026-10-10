# studex-group.com DNS mapping

Fixed hostnames only — **no tenant wildcards** (`*.studex`, `*.agent`, etc.).

| Hostname | Routes to | Service |
|----------|-----------|---------|
| `studex.studex-group.com` | Orgo VM → Caddy :80 → StudEx :5180 | NestVM landing + dashboard |
| `agent.studex-group.com` | Orgo VM → Caddy :80 → StudEx :5180 | Agent entry + API |
| `www.agent.studex-group.com` | Orgo VM → Caddy :80 → StudEx :5180 | Agent entry (www) |

## Apply DNS (needs Cloudflare token with DNS Edit)

```bash
cd deployment/statix
# Add CLOUDFLARE_API_TOKEN to .env.local
npm run cf:studex
```

Creates proxied A records → `ORGO_VM_IP` for all three hostnames.

## Orgo VM routing (already scripted)

```bash
npm run caddy:orgo
```

Caddy listens on `:80` and routes by `Host` header to StudEx on `5180`.

## Important: Orgo blocks inbound ports

Direct A records may not work until Cloudflare Tunnel is running. If sites don't load after DNS:

1. Use **Cloudflare Tunnel** (outbound from VM) — recommended for Orgo
2. Or confirm Orgo exposes port 80 on the public IP

Temporary test URL (quick tunnel): check `/root/cf-tunnel.log` on VM.

## Verify

```bash
curl -s https://studex.studex-group.com/api/health
curl -s https://agent.studex-group.com/api/health
curl -s https://www.agent.studex-group.com/api/health
```

Expected: `{"ok":true,"service":"studex-nestvm","version":"0.1.0"}`

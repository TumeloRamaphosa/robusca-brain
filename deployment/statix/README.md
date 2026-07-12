# StudEx — NestVM Customer Experience (MVP)

Polsia-style dashboard + voice-guided onboarding for Studex Group customers.

## Quick start (desktop demo)

```bash
cd deployment/statix
npm install
npm run demo
```

See **[DEMO.md](./DEMO.md)** for the full 5-minute walkthrough (Ollama + voice + dashboard).

- Landing: http://localhost:5180
- Onboarding: http://localhost:5180/onboarding
- Dashboard: http://localhost:5180/dashboard/demo
- API health: http://localhost:5180/api/health
- Ollama status: http://localhost:5180/api/llm/status

## Production

```bash
npm run build
npm start
# or
docker compose up -d
```

## Production go-live

```bash
cp .env.example .env.local
# Add ORGO_API_KEY (+ CLOUDFLARE_TUNNEL_TOKEN for public HTTPS)
npm run go-live
npm run verify
```

## Docs

- [RILEY_OBSIDIAN_WIKI.md](./RILEY_OBSIDIAN_WIKI.md) — Riley voice + LLM Wiki + Obsidian vault on Mac mini
- [POLSIA_HANDOFF.md](./POLSIA_HANDOFF.md) — Polsia partnership + 3-hour launch
- [CLOUDFLARE_STATIX_DNS.md](./CLOUDFLARE_STATIX_DNS.md) — DNS reference (legacy statix.com path)

## Run in a VM (Orgo, Daytona, EC2, any Linux)

**Mac mini home server:** see **[MAC_MINI_SERVER.md](./MAC_MINI_SERVER.md)** — StudEx + Ollama + OpenHuman + [llm_wiki](https://github.com/nashsu/llm_wiki).

**Yes — StudEx runs in a VM.** The app is a Node server on port **5180**. Ollama is optional (point at a Tailscale inference node if the VM is small).

### Option A — SSH into VM and run install script

```bash
# On the VM:
git clone --depth 1 -b cursor/desktop-demo-statix-c65b \
  https://github.com/TumeloRamaphosa/robusca-brain.git ~/studex-nestvm
bash ~/studex-nestvm/deployment/statix/scripts/install-on-vm.sh
```

Or with Tailscale Ollama on another machine:

```bash
export OLLAMA_HOST=http://100.112.109.40:11434   # Mac mini / Windows inference node
export DEMO_MODEL=qwen2.5:3b
bash scripts/install-on-vm.sh
```

### Option B — Deploy from laptop to Orgo VM (remote API)

```bash
cp .env.example .env.local   # add ORGO_API_KEY
npm run deploy:orgo          # or npm run go-live for full tunnel + DNS
```

### Option C — Docker on VM

```bash
docker compose up -d --build
```

### VM requirements

| Spec | Minimum | Notes |
|------|---------|-------|
| RAM | **1 GB** | StudEx UI only |
| RAM | **8 GB** | + local Ollama `qwen2.5:3b` |
| RAM | **32 GB+** | + Ornith-35B on same VM (not recommended — use Windows inference node) |
| OS | Linux x64 | Node 22 |
| Network | Outbound HTTPS | Cloudflare Tunnel if inbound ports blocked (Orgo) |

### Public access from VM

Orgo blocks inbound ports — use **Cloudflare Tunnel**:

```bash
# In .env.local on your laptop:
CLOUDFLARE_TUNNEL_TOKEN=<from Cloudflare Zero Trust → Tunnels>
npm run go-live
```

Hostnames: `studex.studex-group.com`, `agent.studex-group.com`

## Deploy to Orgo VM

```bash
cp .env.example .env.local
# Edit .env.local — add ORGO_API_KEY
npm run check:env
npm run deploy:orgo
```

## Voice onboarding

Soul agent speaks at every onboarding step via browser Web Speech API (TTS + STT). Same scripts can be sent via WhatsApp when Meta templates are live.

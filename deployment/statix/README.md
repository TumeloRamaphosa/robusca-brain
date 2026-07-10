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

## Docs

- [CLOUDFLARE_WALKTHROUGH.md](./CLOUDFLARE_WALKTHROUGH.md) — **start here** for Orgo + Cloudflare
- [POLSIA_HANDOFF.md](./POLSIA_HANDOFF.md) — Polsia partnership + 3-hour launch
- [CLOUDFLARE_STATIX_DNS.md](./CLOUDFLARE_STATIX_DNS.md) — DNS reference (legacy statix.com path)

## Deploy to Orgo VM

```bash
cp .env.example .env.local
# Edit .env.local — add ORGO_API_KEY
npm run check:env
npm run deploy:orgo
```

## Voice onboarding

Soul agent speaks at every onboarding step via browser Web Speech API (TTS + STT). Same scripts can be sent via WhatsApp when Meta templates are live.

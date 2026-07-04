# Statix — NestVM Customer Experience (MVP)

Polsia-style dashboard + voice-guided onboarding for statix.com.

## Quick start

```bash
cd deployment/statix
npm install
npm run dev
```

- Landing: http://localhost:5180
- Onboarding: http://localhost:5180/onboarding
- Dashboard: http://localhost:5180/dashboard/demo
- API health: http://localhost:5181/api/health

## Production

```bash
npm run build
npm start
# or
docker compose up -d
```

## Docs

- [POLSIA_HANDOFF.md](./POLSIA_HANDOFF.md) — 3-hour launch plan for Polsia
- [CLOUDFLARE_STATIX_DNS.md](./CLOUDFLARE_STATIX_DNS.md) — statix.com DNS setup

## Voice onboarding

Soul agent speaks at every onboarding step via browser Web Speech API (TTS + STT). Same scripts can be sent via WhatsApp when Meta templates are live.

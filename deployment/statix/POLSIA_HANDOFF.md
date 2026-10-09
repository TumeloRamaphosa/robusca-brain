# Polsia × Statix × Studex — 3-Hour Launch Handoff

**From:** Studex Group / Robusca  
**To:** Polsia (Ben Cera team)  
**Product:** Statix NestVM — private AI VM for Africa  
**Launch window:** Today (3-hour sprint)  
**Domain:** statix.com (Cloudflare — see CLOUDFLARE_STATIX_DNS.md)

---

## What Polsia sells

Polsia already sells *"AI that runs your company while you sleep."* Statix is the **Africa-branded, sovereign-infra version** of NestVM — same orchestration model, different market:

| Polsia (US) | Statix (Africa / Global South) |
|---|---|
| polsia.com dashboard | statix.com/dashboard |
| 9 generic agents | 8 Super Agents (Renaissance masters) |
| Morning email | **Morning WhatsApp + voice** |
| US cloud | **Private NestVM per tenant** |
| Solo founders | SMEs + export corridor (Global Markets) |

**Polsia's role:** Orchestrate provisioning, billing, agent scheduling, morning summaries.  
**Statix's role:** Brand, Africa infra, WhatsApp, voice onboarding, Global Markets funnel.  
**Studex's role:** Enterprise sales, ART Engineering DC, Trade Week cohort.

---

## 3-hour launch checklist

### Hour 1 — Domain + screen (Tumelo + Dev)

| # | Task | Owner | Done? |
|---|---|---|---|
| 1 | Cloudflare: point statix.com → deploy target (see DNS doc) | Tumelo | ☐ |
| 2 | Deploy Statix app: `deployment/statix` → Fly.io / Vercel / Orgo | Dev | ☐ |
| 3 | Verify https://statix.com loads landing | Dev | ☐ |
| 4 | Verify https://statix.com/onboarding voice flow | Dev | ☐ |
| 5 | Verify https://statix.com/dashboard/demo | Dev | ☐ |

### Hour 2 — Polsia integration stubs

| # | Task | Owner | Done? |
|---|---|---|---|
| 6 | Polsia webhook URL → `https://api.statix.com/api/polsia/webhook` | Polsia | ☐ |
| 7 | Provision event: Polsia calls POST `/api/nestvm/provision` | Polsia | ☐ |
| 8 | Morning brief: Polsia pushes to Statix tenant status API | Polsia | ☐ |
| 9 | Stripe: Polsia billing or Studex Peach — pick one for today | Tumelo | ☐ |

### Hour 3 — First customer path

| # | Task | Owner | Done? |
|---|---|---|---|
| 10 | WhatsApp template `statix_welcome` approved (Meta) | Tumelo | ☐ |
| 11 | Run onboarding as Tumelo (dogfood) | Tumelo | ☐ |
| 12 | Polsia sends first morning brief to WhatsApp | Polsia | ☐ |
| 13 | Announce: statix.com live + Founder Circle date | Tumelo | ☐ |

---

## API contract for Polsia

### Provision tenant

```http
POST https://api.statix.com/api/nestvm/provision
Content-Type: application/json

{
  "companyName": "Acme Exports",
  "goals": "Enter UAE coffee market in 90 days",
  "whatsapp": "+27821234567",
  "tier": "business",
  "tenantSlug": "acme-exports",
  "polsiaInstanceId": "polsia_xxx"
}
```

**Response:**
```json
{
  "success": true,
  "tenantSlug": "acme-exports",
  "dashboardUrl": "https://acme-exports.statix.com/dashboard",
  "nestvmUrl": "https://acme-exports.nestvm.statix.com"
}
```

### Tenant status (Polsia polls or pushes)

```http
GET https://api.statix.com/api/nestvm/{tenantSlug}/status
```

### Polsia → Statix events

```http
POST https://api.statix.com/api/polsia/webhook
Content-Type: application/json

{
  "event": "morning_brief | agent_action | billing_update",
  "tenantSlug": "acme-exports",
  "payload": { ... }
}
```

---

## Customer experience — spoken at every step

**Yes — customers are spoken to throughout onboarding and daily use:**

| Touchpoint | How they hear the agent |
|---|---|
| **Landing** | Soul voice companion (browser TTS) — bottom right |
| **Onboarding** | Voice at each of 5 steps + Speak button (STT) |
| **WhatsApp** | Same Soul script sent as voice note or text |
| **Dashboard** | Voice companion reads morning brief |
| **Tiiny device** | Local TTS on edge (future) |
| **Mac / Windows** | Statix desktop app (Tauri) — same voice |
| **Phone** | PWA + WhatsApp — no app store required |

Onboarding script (Soul speaks each step):

1. *"Welcome to Statix. What's your company name?"*
2. *"What does success look like in 90 days?"*
3. *"What's your WhatsApp for morning briefs?"*
4. *"Starter or Business tier?"*
5. *"Provisioning your NestVM now. Check WhatsApp in 2 minutes."*

---

## Revenue split (proposal for Polsia)

| Stream | Polsia share | Studex share |
|---|---|---|
| SaaS subscription (R3.5k–20k/mo) | 30% orchestration fee | 70% infra + support |
| Setup / onboarding (R15k–35k) | 20% | 80% |
| Global Markets upgrade | 10% referral | 90% (ecosystem) |
| ART DC deals (R2M+) | 5% referral | 95% |

*Negotiate with Ben — Polsia gets orchestration margin; Studex owns Africa infra and enterprise.*

---

## What ships today vs long-term

### Ships today (MVP)
- statix.com landing + pricing
- Voice-guided onboarding (5 steps)
- Demo NestVM dashboard (Polsia-style)
- Provision API + Polsia webhook stub
- Docker local stack

### Long-term (see LONG_TERM_FEATURES below)
- Real VM provisioning (Orgo/Fly/Polsia NestVM API)
- Live WhatsApp Meta Cloud API
- Tiiny edge auto-discovery
- 8 agents live via n8n
- Global Markets working group auto-invite

---

## Files Polsia needs

| File | Purpose |
|---|---|
| `deployment/statix/` | Full Statix web app |
| `deployment/statix/POLSIA_HANDOFF.md` | This document |
| `deployment/statix/CLOUDFLARE_STATIX_DNS.md` | DNS setup |
| `deployment/NESTVM_GTM_ONBOARDING.md` | Sales + onboarding pipeline |
| `deployment/NESTVM_AGENT_SAAS_PLAN.md` | Architecture |

---

## Contact

- **Studex:** t.ramaphosa@studex.dev  
- **Polsia:** support@polsia.com  
- **Statix product URL:** https://statix.com  
- **Demo dashboard:** https://statix.com/dashboard/demo

---

*Private intelligence. Shared opportunity. Polsia orchestrates. Statix delivers.*

# Architecture Sketch — Today vs Phase 2+

**Date:** 4 Sep 2026  
**Scope:** Minimum architecture to sell and deliver client #1 today. Not the full Studex diagram.

---

## Primary delivery model (today)

**Managed Ghost** — Studex-operated memory + agent loop; client sees outcomes, not infrastructure.

```
┌─────────────────────────────────────────────────────────────┐
│  CLIENT (founder + named approver)                          │
│  · Reviews daily brief (Studex Agent Bridge WhatsApp — week 1) │
│  · Approves drafts before send/post/pay                     │
│  · Corrects memory via Bridge WhatsApp, email, or vault update request │
└───────────────┬─────────────────────────────────────────────┘
                │ Bridge WhatsApp primary; email backup (week 1)
                │ Meta WABA / WhatsApp Business API: OFF
                ▼
┌─────────────────────────────────────────────────────────────┐
│  STUDEX DELIVERY LAYER (human + Robusca)                    │
│  · Chief of Staff loop                                      │
│  · Approval gate — nothing external without human click     │
│  · Operator on-call during agreed hours                     │
└───────────────┬─────────────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────────────┐
│  BUSINESS GHOST (per client)                                │
│  · Obsidian vault — goals, clients, docs, decisions       │
│  · Retrieval with citations to approved sources             │
│  · One workflow (proposal / inbox / meeting prep)           │
└───────────────┬─────────────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────────────┐
│  STUDEX INTERNAL OPS (not client-facing)                    │
│  · War Room dashboard — [`os/war-room/`](../../os/war-room/) │
│  · robusca-brain repo + `studex/clients/{id}/`              │
│  · memory/ logs + approval protocol                         │
└─────────────────────────────────────────────────────────────┘
```

### Design principles (from PR #17 + delivery-model)

1. **One tenant = one memory** — no co-mingled client data in a shared vendor account  
2. **Agents produce artefacts; humans produce effects** — approval gate is the product  
3. **We issue keys; clients don't bring vendor keys** — Studex owns the control plane  
4. **Instrument from day one** — `week1-receipt.md` or the pilot is theatre  
5. **No real client data until key rotation cleared** — [`KEY_ROTATION_CHECKLIST.md`](../../KEY_ROTATION_CHECKLIST.md); use [`demo-vault/`](demo-vault/) for demos  

---

## The three surfaces — mapped to phases

| Surface | Today (phase 0–1) | Phase 2+ | Phase 4+ |
|---|---|---|---|
| **Shared agent OS + buzz.xyz / global markets** | ❌ Not sold | Buzz workspace per client after internal dry-run; curated introductions only | Studex Global Markets directory + matchmaking when density exists |
| **Per-client Orgo / NestVM** | ❌ Not sold — delivery team may use Orgo internally | Dedicated VM per paying client (OpenHands or Orgo); browser/computer use gated | White-label War Room + NestVM bundle (Super Agents Enterprise) |
| **Managed Grok-bot / polsia-style service** | ✅ **Primary** — Business Ghost Managed | Managed Team (3–5 agents in Buzz workspace) | Company-in-a-Box at R22k+ with signed activity export |

---

## How Orgo.ai / NestVM fit (phase 2+)

**What exists in repo today:**

- Orgo workspace "Studex Wildlife" with **StudEx Meat - Auto Meat** VM ([`deployment/META_CLI_HANDOFF.md`](../../deployment/META_CLI_HANDOFF.md))  
- `os/auto-meat-vm/ARCHITECTURE.md` — Docker Compose stack including War Room UI  
- NotebookLM NestVM sales scripts — **pitch material, not provisioned automation**

**Phase 2 trigger (all required):**

- [ ] 3 clients with `week1-receipt.md` hard numbers  
- [ ] Tenant registry + key service built ([`delivery-model/02-CONTROL-PLANE-ARCHITECTURE.md`](../delivery-model/02-CONTROL-PLANE-ARCHITECTURE.md) on branch)  
- [ ] One Orgo/NestVM provisioned for external client and passed 10-question audit  
- [ ] Written data-processing addendum covers VM isolation  

**What we sell then:** *"Your Business Ghost now runs in your own private machine — same memory, plus browser capability for approved workflows."*

**What we still defer:** self-serve provisioning, computer-use without supervision, cross-client marketplace.

---

## How buzz.xyz / Studex Global Markets fit (phase 2+)

**What exists:**

- `studex/managed-agents/` designs client flow on Buzz (signed events, one community per client)  
- `notebooklm/` describes Global Markets + NestVM ecosystem for enterprise cohort narrative  
- War Room **Global Markets** tab — internal trade route view  

**Phase 2 (after Managed Team tier):**

- Self-hosted Buzz relay OR verified hosted pilot  
- One internal community dry-run for 30 days with real work  
- Client workspace = auditable activity export  

**Phase 3–4 (markets):**

- Directory listing on Studex Global Markets  
- Curated partner introductions *(not "marketplace access")*  
- Execution Exchange only when active company count gate met (PR #17 phase 4)  

**Do not sell today:** "Join buzz.xyz agents" or "trade on Execution Exchange."

---

## Memory → Workforce → Market (spine unchanged)

```
TODAY ──────►  MEMORY (Business Ghost Managed)
                    │
PHASE 2 ────►  WORKFORCE (Managed Team, Buzz workspace, optional NestVM)
                    │
PHASE 4 ────►  MARKET (Global Markets, Execution Exchange)
```

Each step is a **bigger contract**, not a different company.

---

## Control plane — minimum before client 2

From `studex/delivery-model/` — not required for client 1 if delivered entirely by hand, **required before client 2**:

| Component | Client 1 (manual) | Client 2+ (required) |
|---|---|---|
| Tenant registry | Spreadsheet / `studex/clients/` folder | Formal registry DB |
| Key service | Studex-issued credentials per vault | Automated key rotation |
| Ledger | `week1-receipt.md` | Outcome ledger per client |
| Supervisor boundary | Operator discipline | Logged grant for cross-tenant access |
| Provisioning | Clone vault template by hand | n8n onboarding workflow live |

---

## Risk architecture (what we refuse to build on)

| Technology | Role | Verdict |
|---|---|---|
| **Runable** | Delivery team production tool ($50/mo) | ✅ Tool only — not client tenancy |
| **Runable** | Client workspace foundation | ❌ Six blockers — no org accounts |
| **GrokBot** | Computer-use clone | ❌ No licence — design boundary only |
| **Studex Token** | Payments | ❌ Remove from all client material |
| **Shared Runable/Slack "group"** | Multi-client | ❌ Fails audit Q1, Q5, Q8, Q10 |

---

## Receipts gap (architecture implication)

The NotebookLM corpus asserts Enterprise-tier NestVM deployments for four Russian tech companies. **This workspace contains zero instrumented outcome numbers for those deployments.**

Architecture docs must not imply those deployments prove ROI until:

1. At least one hard metric per company, in writing, with publish permission  
2. Mapped to Tier 1 or Tier 2 evidence per PR #17 Phase 0  

**Until then, the first client's `week1-receipt.md` is the canonical proof architecture.**

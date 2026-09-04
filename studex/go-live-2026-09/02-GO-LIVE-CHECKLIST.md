# Same-Day Go-Live Checklist

**Date:** 4 Sep 2026  
**Goal:** Take payment from **one** founding client and deliver week 1 without over-promising  
**Rule:** [`STUDEX_OS.md`](../../STUDEX_OS.md) rule 1 — **no posting, no publishing, no external sends without Tumelo's explicit approval**

---

## A. Hard blockers — must be true before taking payment

| # | Blocker | Status in repo | Action before payment |
|---|---|---|---|
| 1 | **Service order + data boundary signed** | Template in managed-agents flow | Generate from [`01-CLIENT-OFFER.md`](01-CLIENT-OFFER.md); client signs |
| 2 | **Named client approver identified** | Process designed | Record in client file (initials only in logs) |
| 3 | **Scope fits Pilot** | — | Confirm NOT medical, NOT unsupervised outbound, NOT live payment integration |
| 4 | **No false enterprise claims** | ⚠️ No receipts | Sales script uses **no** NtechLab/Pharmasyntez outcome numbers |
| 5 | **Invoice in ZAR** | PayFast live per `os/README.md` | No token rail in proposal or invoice |
| 6 | **WhatsApp (if channel)** | ⚠️ **DISCONNECTED** per `STUDEX_OS.md` | SMS verify WABA `105198275846951` OR use email-only week 1 |
| 7 | **API key rotation** | ⚠️ **OPEN** per [`KEY_ROTATION_CHECKLIST.md`](../../KEY_ROTATION_CHECKLIST.md) | Rotate exposed keys before client vault holds real business data |
| 8 | **Operator capacity** | Human delivery ~4–8h/client/week at pilot | Tumelo names Studex operator (Robusca + human backup) |

**If blockers 6 or 7 are open:** proceed with **email-only** delivery and **no production credentials** in client vault until cleared.

---

## B. Accounts & access (Studex side)

| System | Purpose today | Location / notes |
|---|---|---|
| **robusca-brain repo** | Client vault, memory logs | `studex/clients/{client-id}/` *(create on signature)* |
| **War Room** | Internal ops only — not client-facing | [`os/war-room/`](../../os/war-room/) |
| **Perplexity Computer (Robusca)** | Orchestration, daily brief generation | Primary runtime |
| **AgentMail** | Operator ↔ client email | `studex-2571@agentmail.to` — **rotate key first** |
| **PayFast** | Invoice collection | Merchant ID `12946117` per `os/README.md` |
| **Obsidian vault template** | Client memory | Pull from `cursor/managed-agents-service-build-d129:templates/client-vault/` |
| **n8n** *(optional week 1)* | Onboarding automation | `automation/n8n/studex-client-onboarding.json` — placeholders only |
| **Orgo VM** | Delivery team tooling only | StudEx Meat Auto Meat VM — **not** client-facing day one |
| **Buzz / buzz.xyz** | **Do not provision client on day one** | Run internal dry-run first per managed-agents flow |

### Repo layout for client #1

```
studex/clients/{client-id}/
├── ORDER.md              # signed scope, never list, approvers
├── vault/                # Obsidian knowledge pack
├── worklog/              # daily agent outputs
├── audit-scorecard.md    # 10-question results
└── week1-receipt.md      # instrumented outcome — REQUIRED
```

---

## C. First-client onboarding steps (same day → week 1)

### Same day (hours 0–4)

1. [ ] Qualify — consultancy/agency profile; decline if medical or needs autonomy  
2. [ ] Send [`01-CLIENT-OFFER.md`](01-CLIENT-OFFER.md) summary + founding terms  
3. [ ] On verbal yes: send service order + data processing addendum  
4. [ ] Collect 50% or full month upfront (PayFast / EFT)  
5. [ ] Create `studex/clients/{client-id}/` in repo  
6. [ ] Schedule Company Soul interview (60 min, today or tomorrow)  
7. [ ] Request document dump — proposals, services, pricing, voice guide  

### Day 1–2

8. [ ] Run Company Soul interview → populate `vault/00-company-soul.md`  
9. [ ] Client marks each doc **approved** or **reference-only** in writing  
10. [ ] Index vault; test Ghost Q&A internally (5 questions only they would know)  

### Day 3–4

11. [ ] Configure Chief of Staff persona + one workflow  
12. [ ] Dry-run workflow with Studex staff only — no client audience  
13. [ ] Fix citations and wrong answers in knowledge pack  

### Day 5–7

14. [ ] Invite client approver to review drafts (email; WhatsApp if reconnected)  
15. [ ] First daily brief delivered  
16. [ ] Complete `audit-scorecard.md` — publish failures honestly  
17. [ ] Write `week1-receipt.md` with **one hard number** + client consent  

---

## D. Demo script (≤5 minutes)

**Setup:** Business Ghost loaded with client's real (approved) material. Demo on Zoom or in person. No deck required.

| Time | Beat | Script |
|---|---|---|
| **0:00–0:30** | Hook | *"Most AI forgets you every Monday. I'm going to ask your Ghost something only your company knows."* |
| **0:30–1:30** | Live Q&A | Ask 2 questions from Company Soul interview answers — e.g. *"What do we charge for X?"* *"Who is our ideal client?"* |
| **1:30–2:30** | Citation | Show source doc for one answer — *"It cites your approved pack, not the internet."* |
| **2:30–3:30** | Workflow | Show overnight proposal draft or inbox summary — **marked DRAFT — AWAITING APPROVAL** |
| **3:30–4:30** | Control | *"Nothing leaves without [Approver Name] clicking approve. Agents produce artefacts; humans produce effects."* |
| **4:30–5:00** | Close | *"Week one: memory live, daily brief, one workflow. R3,500 founding. We measure hours saved together — and publish it if you want."* |

**Do not say in demo:** NestVM, marketplace, token, NtechLab results, "fully autonomous," "POPIA compliant."

---

## E. Sales conversation guardrails

### Say

- "Permanent company memory"  
- "Chief of Staff agent with human approval"  
- "Founding client — we instrument week one together"  
- "Memory → Workforce → Market — you start at Memory"  

### Do not say

- "Our enterprise clients already see X% ROI" *(no receipts)*  
- "Join the Studex marketplace"  
- "Your private NestVM"  
- "Agents work while you sleep" *(unsupervised)*  
- "Studex Token credits"  

---

## F. Post-payment ops rhythm

| Cadence | Action |
|---|---|
| Daily | Chief of Staff brief → client approver |
| Daily | Log to `studex/clients/{id}/worklog/YYYY-MM-DD.md` |
| Weekly | 30-min operating review — written outcomes |
| Weekly | Update `week1-receipt.md` → `month1-receipt.md` at day 30 |

---

## G. Escalation

| Trigger | Escalate to |
|---|---|
| Wrong answer repeated 3× | Fix knowledge pack same day |
| Client requests external send | Named approver only |
| Scope creep (2nd workflow) | Change order or upgrade conversation |
| Data boundary violation attempt | Stop automation; Tumelo |
| Client asks for VM / marketplace | Phase 2 conversation — not today |

---

## H. Definition of "go-live" today

Go-live = **payment received + client folder created + interview scheduled + honest offer sent**.

It does **not** mean ecosystem launched, War Room white-labelled, or Buzz workspace live.

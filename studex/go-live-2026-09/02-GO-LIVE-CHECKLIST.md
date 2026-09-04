# Same-Day Go-Live Checklist

**Date:** 4 Sep 2026  
**Goal:** Take payment from **one** founding client and deliver week 1 without over-promising  
**Rule:** [`STUDEX_OS.md`](../../STUDEX_OS.md) rule 1 — **no posting, no publishing, no external sends without Tumelo's explicit approval**

**Pack attachments:**
- [`04-TEN-QUESTION-AUDIT.md`](04-TEN-QUESTION-AUDIT.md)
- [`05-SERVICE-ORDER-TEMPLATE.md`](05-SERVICE-ORDER-TEMPLATE.md)
- [`demo-vault/`](demo-vault/) — sanitized cold-call demo only

---

## A. Hard blockers — must be true before taking payment

| # | Blocker | Status in repo | Action before payment |
|---|---|---|---|
| 1 | **Service order + data boundary signed** | ✅ Template in pack | Send [`05-SERVICE-ORDER-TEMPLATE.md`](05-SERVICE-ORDER-TEMPLATE.md); client signs → `studex/clients/{id}/ORDER.md` |
| 2 | **Named client approver identified** | Process designed | Record in ORDER.md (initials only in public logs) |
| 3 | **Scope fits Pilot** | — | Confirm NOT medical, NOT unsupervised outbound, NOT live payment integration |
| 4 | **No false enterprise claims** | ⚠️ No receipts | Sales script uses **no** NtechLab/Pharmasyntez outcome numbers |
| 5 | **Invoice in ZAR** | PayFast live per `os/README.md` | No token rail in proposal or invoice |
| 6 | **Upfront payment cleared** | — | **50% minimum (R1,750) or full month (R3,500)** before provisioning |
| 7 | **Ten-question audit attached to offer** | ✅ In pack | [`04-TEN-QUESTION-AUDIT.md`](04-TEN-QUESTION-AUDIT.md) sent with offer — required for guarantee |
| 8 | **Operator capacity** | Human delivery ~4–8h/client/week | Tumelo names Studex operator; **founding margin thin if operator is founder** |

### ⛔ HARD STOP — API key rotation

| | |
|---|---|
| **Status** | ⚠️ **OPEN** since June 2026 — [`KEY_ROTATION_CHECKLIST.md`](../../KEY_ROTATION_CHECKLIST.md) |
| **Rule** | **Do not load real client documents into any vault until Tumelo confirms all exposed keys are rotated.** |
| **Allowed before rotation** | Sales conversations, signed order, payment collection, Company Soul interview notes in encrypted/offline channel |
| **Not allowed before rotation** | Client PDFs, emails, CRM exports, or production credentials in `studex/clients/{id}/vault/` |
| **Demos before rotation** | Use [`demo-vault/`](demo-vault/) only — fictional Meridian Advisory data |

**This is non-negotiable.** A launch that sells auditability while running on known-exposed credentials is worse than no launch.

### Communication — week 1

**Email only.** WhatsApp WABA `105198275846951` is **DISCONNECTED** per `STUDEX_OS.md`. Do not offer WhatsApp as a channel in the offer, onboarding, or daily brief until SMS verification is complete and confirmed in writing.

---

## B. Accounts & access (Studex side)

| System | Purpose today | Location / notes |
|---|---|---|
| **robusca-brain repo** | Client vault, memory logs | `studex/clients/{client-id}/` *(create on signature)* |
| **War Room** | Internal ops only — not client-facing | [`os/war-room/`](../../os/war-room/) |
| **Perplexity Computer (Robusca)** | Orchestration, daily brief generation | Primary runtime |
| **AgentMail** | Operator ↔ client **email** | `studex-2571@agentmail.to` — **rotate key before client data** |
| **PayFast** | Invoice collection | Merchant ID `12946117` per `os/README.md` |
| **Obsidian vault template** | Client memory | Clone from managed-agents branch `templates/client-vault/` after key rotation |
| **Demo vault** | Cold-call demos only | [`demo-vault/`](demo-vault/) |
| **n8n** *(optional week 1)* | Onboarding automation | `automation/n8n/studex-client-onboarding.json` — placeholders only |
| **Orgo VM** | Delivery team tooling only | **Not** client-facing day one |
| **Buzz / buzz.xyz** | **Do not provision client on day one** | Internal dry-run first |

### Repo layout for client #1

```
studex/clients/{client-id}/
├── ORDER.md              # signed copy of 05-SERVICE-ORDER-TEMPLATE.md
├── vault/                # NO real docs until key rotation confirmed
├── worklog/              # daily agent outputs
├── audit-scorecard.md    # from 04-TEN-QUESTION-AUDIT.md
└── week1-receipt.md      # instrumented outcome — REQUIRED
```

---

## C. First-client onboarding steps (same day → week 1)

### Same day (hours 0–4)

1. [ ] Qualify — consultancy/agency profile; decline if medical or needs autonomy  
2. [ ] Send [`01-CLIENT-OFFER.md`](01-CLIENT-OFFER.md) + [`04-TEN-QUESTION-AUDIT.md`](04-TEN-QUESTION-AUDIT.md)  
3. [ ] On verbal yes: send [`05-SERVICE-ORDER-TEMPLATE.md`](05-SERVICE-ORDER-TEMPLATE.md)  
4. [ ] Collect **50% minimum or full month upfront** (PayFast / EFT) — **before provisioning**  
5. [ ] Create `studex/clients/{client-id}/` in repo; save signed ORDER.md  
6. [ ] Schedule Company Soul interview (60 min, today or tomorrow)  
7. [ ] Request document dump — **hold in secure channel until key rotation confirmed**  

### Day 1–2

8. [ ] Run Company Soul interview → populate `vault/00-company-soul.md`  
9. [ ] **If key rotation confirmed:** client marks each doc approved/reference-only; load into vault  
10. [ ] **If key rotation not confirmed:** interview notes only; vault stays empty or demo-vault for internal testing  
11. [ ] Index vault; test Ghost Q&A internally (5 questions only they would know)  

### Day 3–4

12. [ ] Configure Chief of Staff persona + one workflow  
13. [ ] Dry-run workflow with Studex staff only — no client audience  
14. [ ] Fix citations and wrong answers in knowledge pack  

### Day 5–7

15. [ ] Invite client approver to review drafts via **email**  
16. [ ] First daily brief delivered by **email**  
17. [ ] Complete `audit-scorecard.md` from [`04-TEN-QUESTION-AUDIT.md`](04-TEN-QUESTION-AUDIT.md)  
18. [ ] Write `week1-receipt.md` with **one client-chosen hard number** + consent  

---

## D. Demo script (≤5 minutes)

**Two valid paths — pick one. Do not demo company-specific Q&A on a cold call without one of these.**

### Path A — Cold call / no client data yet (use sanitized demo vault)

**Setup:** Load [`demo-vault/`](demo-vault/) — fictional **Meridian Advisory (Pty) Ltd**. Say so out loud.

| Time | Beat | Script |
|---|---|---|
| **0:00–0:30** | Hook + honesty | *"This is a fictional consultancy vault we use for demos — Meridian Advisory. Your Ghost would work the same way with your approved docs after the Soul interview."* |
| **0:30–1:30** | Live Q&A | *"What do we charge for a diagnostic sprint?"* → R85,000. *"Why did we drop fixed-bid under R60k?"* → March 2025 decision in soul doc |
| **1:30–2:30** | Citation | Open [`demo-vault/services/diagnostic-sprint.md`](demo-vault/services/diagnostic-sprint.md) — *"It cites your pack, not the internet."* |
| **2:30–3:30** | Workflow | Show [`demo-vault/templates/proposal-excerpt.md`](demo-vault/templates/proposal-excerpt.md) — **DRAFT — AWAITING APPROVAL** |
| **3:30–4:30** | Control | *"Nothing leaves without your approver. Agents produce artefacts; humans produce effects."* |
| **4:30–5:00** | Close | *"After you sign and we run the Soul interview, we load your real vault. Founding pilot R3,500 — email daily brief, one workflow week one."* |

### Path B — Post–Soul interview (prospect becoming client)

**Setup:** Client has signed order and Soul interview complete; at least 3 approved docs in vault *(only if key rotation cleared)*.

| Time | Beat | Script |
|---|---|---|
| **0:00–0:30** | Hook | *"We loaded what you approved yesterday. Ask it something only your company would know."* |
| **0:30–1:30** | Live Q&A | Client or you asks 2 questions from interview — pricing, ideal client, past decision |
| **1:30–2:30** | Citation | Show source doc for one answer |
| **2:30–3:30** | Workflow | Show overnight draft — **DRAFT — AWAITING APPROVAL** |
| **3:30–4:30** | Control | Named approver must email approval before send |
| **4:30–5:00** | Close | Upfront payment reminder + week-one checklist |

**Do not say in demo:** NestVM, marketplace, token, NtechLab results, "fully autonomous," "POPIA compliant," WhatsApp week 1.

---

## E. Sales conversation guardrails

### Say

- "Permanent company memory"  
- "Daily brief and drafts awaiting your approval"  
- "Founding client only — we instrument week one together"  
- "Email week one"  
- "Memory → Workforce → Market — you start at Memory"  

### Do not say

- "Works on your business every day" *(implies unsupervised autonomy)*  
- "Our enterprise clients already see X% ROI" *(no receipts)*  
- "Join the Studex marketplace"  
- "Your private NestVM"  
- "Agents work while you sleep"  
- "WhatsApp daily brief" *(week 1)*  
- "Studex Token credits"  

---

## F. Post-payment ops rhythm

| Cadence | Action |
|---|---|
| Daily | Chief of Staff brief → client approver **by email** |
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
| Client docs received before key rotation | **STOP** — secure hold only |

---

## H. Definition of "go-live" today

Go-live = **signed ORDER.md + upfront payment cleared + interview scheduled + offer + audit attached**.

It does **not** mean ecosystem launched, War Room white-labelled, Buzz workspace live, or client vault populated before key rotation.

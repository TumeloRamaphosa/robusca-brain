# Ten-Question Trust Audit — Business Ghost Managed

**Source:** Adapted from [PR #17](https://github.com/TumeloRamaphosa/robusca-brain/pull/17) (`studex/launch-2026-08/01-VIRAL-CONTENT-ENGINE.md`)  
**Purpose:** Scored, enforceable checklist for each client deployment. **Attach to every offer before citing the audit guarantee.**

---

## How to use

1. Complete this scorecard **after** the client's vault is live (day 4–7 of week 1).  
2. Score each question **Pass / Partial / Fail** with evidence links (file path, screenshot, log excerpt).  
3. Copy completed scorecard to `studex/clients/{client-id}/audit-scorecard.md`.  
4. **Free-month guarantee applies only if this document is completed and shared with the client.**

**Pass bar for guarantee:** **8 of 10 Pass**, **0 Fail** on questions **1, 5, 7, and 8** (non-negotiable governance questions).

---

## The ten questions

| # | Question | What "Pass" looks like | Evidence required |
|---|---|---|---|
| **1** | Show me the decision trace. Which tools were called, what came back, why each next step? | A workflow run log shows tool calls, inputs/outputs, and human approval before external effect | `worklog/` entry or operator log with timestamps |
| **2** | What does it remember from six months ago, and can it cite the source document? | Ghost answers a historical question and cites an approved vault doc | Q&A transcript + vault path |
| **3** | When a tool call fails, does it retry and re-plan, or hand the user an error? | Failed step is logged; operator notified; client sees clear status, not silent failure | Exception log in `#exceptions` equivalent or email |
| **4** | Is it monitored in production, or only in the demo environment? | Daily brief + worklog prove ongoing operation beyond demo | 3+ consecutive daily briefs delivered |
| **5** | Can a non-engineer change a governance policy, or does that need a ticket? | Named approver can update "never list" or doc approval marks without Studex engineering | Written change by client approver, reflected in vault |
| **6** | Is pricing per seat, or tied to outcomes? | Contract shows **per company** flat fee; no per-seat agent charges | Signed service order |
| **7** | What can it do without asking permission, and who decided that? | Written never-list + approval gate documented; external actions require approver | Service order §5 + sample approval record |
| **8** | Where does our data physically live, and who else's data lives there? | Client vault isolated; no co-mingling with other clients in shared vendor accounts | Data boundary in service order; vault path unique to client |
| **9** | How does it verify an action actually happened? | Draft → approval → sent record chain for at least one workflow | Approval email/thread + sent artefact |
| **10** | Show me one customer number you didn't choose. | Client-provided metric in `week1-receipt.md` (hours saved, drafts produced, etc.) — **not invented by Studex** | `week1-receipt.md` signed by client |

---

## Scorecard template

**Client:** _________________________ *(initials in logs)*  
**Deployment date:** _______________  
**Scored by:** _____________________  
**Reviewed with client:** ☐ Yes · Date: _______

| # | Question | Score (P / Pt / F) | Evidence link |
|---|---|---|---|
| 1 | Decision trace | | |
| 2 | Memory + citation | | |
| 3 | Failure handling | | |
| 4 | Production monitoring | | |
| 5 | Governance by non-engineer | | |
| 6 | Per-company pricing | | |
| 7 | Permission boundary | | |
| 8 | Data isolation | | |
| 9 | Action verification | | |
| 10 | Client-chosen number | | |

**Totals:** ___ Pass · ___ Partial · ___ Fail

**Guarantee eligible?** ☐ Yes (meets pass bar) · ☐ No — document failures below

### Failures (publish honestly if campaign uses audit positioning)

| # | What failed | Remediation | Target date |
|---|---|---|---|
| | | | |

---

## Free-month guarantee (enforceable terms)

> If Studex fails the pass bar on this scorecard for your deployment in any billing month, **that month's fee is waived** — provided this scorecard was completed and shared with you before the month in question.

**Excluded:** failures caused by client not providing approved docs, not naming an approver, or requesting out-of-scope autonomous actions.

**This guarantee is void** if the ten questions were not attached to the offer and completed for your deployment.

# Product Requirements Document (PRD)
## AI-Powered Security, Governance & Compliance for ERP Systems

**Document status:** Draft v0.1 — extracted from discovery meeting  
**Date:** 3 July 2026  
**Author:** Derived from meeting transcript (Tumelo × Statix/Studex ecosystem)  
**Classification:** Internal — partnership exploration  

---

## 1. Executive Summary

This document defines the product concept for an **AI-powered security, governance, and compliance platform** targeting organisations that rely on ERP systems (SAP, Oracle, Microsoft Dynamics, etc.) in regulated industries.

The product addresses a recurring client problem: **control environment gaps inside ERP business processes** that create fraud, segregation-of-duties (SoD), and audit failure risk. It does not currently exist as an offering at PwC; the proposer sees a market gap and wants to build or partner to deliver it.

A parallel partnership track was discussed with the **Statix Global Markets** ecosystem (agentic AI platform built on a “business ghost” / NestVM architecture), under which Tumelo would act as **local product owner** — owning go-to-market, client relationships, and product evolution — while Statix licenses core agentic technology and provides technical support.

---

## 2. Background & Context

### 2.1 Product Champion

| Attribute | Detail |
|-----------|--------|
| **Role** | Risk Assurance & Digital Trust (PwC) |
| **Domain** | Bridging business, technical, and compliance requirements |
| **Motivation** | Identified unmet client need; no internal PwC equivalent today |
| **Immediate ask** | Define what the product would *look like* to offer clients |

### 2.2 Platform Partner (Statix Ecosystem)

| Attribute | Detail |
|-----------|--------|
| **Platform** | Statix — agentic AI cloud infrastructure (“business ghost” + long-range agents) |
| **Architecture** | Central RAG “brain” + role-specific agents on virtual machine infrastructure |
| **Onboarding model** | Daily structured activity logs progressively feed business context to agents |
| **Differentiation** | Custom-built, evolving product per client vs. off-the-shelf SaaS |
| **Relevant agent capability** | Risk assessment & compliance monitoring (maps to “Caravaggio”-class agent in Studex NestVM stack) |

### 2.3 Partnership Model (Discussed)

```
Statix (technology licensor + technical support)
        │
        ▼ licenses agentic platform / compute
Tumelo (local product owner)
        │
        ▼ sells & distributes
End clients (financial services, public sector, healthcare, manufacturing)
```

Tumelo may join an **AI working group** (e.g. general AI or computer vision cohort) within Statix Global Markets, gaining access to ecosystem opportunities beyond a single employer context.

---

## 3. Problem Statement

Organisations running ERP systems frequently exhibit **control environment weaknesses** across finance, procurement, HR, and related modules:

- Users hold **excessive or inappropriate access** relative to their role
- **Segregation of duties (SoD)** violations go undetected until audit
- **Insider fraud** patterns (fictitious employees, ghost vendors, fraudulent invoices, self-approval chains) persist without real-time detection
- **Compliance evidence** is scattered; audit preparation is manual, slow, and reactive
- **Security incidents** within ERP boundaries are detected late or not at all

**Consequence:** Elevated fraud risk, regulatory non-compliance (ISO 27001, SOX, POPIA, etc.), audit findings, reputational damage, and remediation cost.

**Market gap:** No packaged PwC-internal solution today; clients need proactive, AI-augmented ERP governance — not periodic manual control testing alone.

---

## 4. Product Vision

> **“Continuous, intelligent ERP governance — predict failures before audits, detect insider risk in real time, respond to incidents automatically, and produce audit-ready compliance evidence on demand.”**

The product is not a generic GRC dashboard. It is an **ERP-native intelligence layer** that:

1. Understands control frameworks (ISO 27001, SOX, POPIA, etc.)
2. Monitors live ERP activity against those controls
3. Acts — alerts, workflows, remediation guidance, reporting — through AI agents tailored to the client’s industry and the product owner’s risk-assurance domain expertise

---

## 5. Target Market & Users

### 5.1 Industries (Phase 1)

- Financial services
- Public sector
- Healthcare
- Manufacturing

### 5.2 User Personas

| Persona | Needs |
|---------|-------|
| **Internal Audit / Risk Manager** | Proactive control health visibility; audit-ready evidence |
| **CISO / Security Operations** | Real-time incident detection and response within ERP |
| **Compliance Officer** | Framework mapping (ISO/SOX/POPIA); continuous readiness dashboards |
| **ERP Administrator** | Actionable SoD and access anomaly alerts tied to ERP transactions |
| **External Auditor (read-only)** | On-demand, evidence-backed control execution reports |
| **Product Owner (Tumelo / partner)** | Client-specific agent configuration; domain-tuned compliance logic |

---

## 6. Use Cases & Functional Requirements

### UC-1: Predictive Compliance Monitoring

**Description:** AI continuously evaluates ERP control effectiveness against defined criteria (e.g. ISO 27001 control objectives) and flags potential audit failures *before* formal audit cycles.

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-1.1 | Ingest ERP control configuration and transaction logs (access, approvals, master data changes) | P0 |
| FR-1.2 | Map ERP activities to compliance framework control IDs (ISO 27001 initial; extensible to SOX, POPIA) | P0 |
| FR-1.3 | Score control effectiveness over time; trend degradation | P0 |
| FR-1.4 | Generate proactive remediation recommendations with severity and owner assignment | P0 |
| FR-1.5 | Alert when control effectiveness drops below configurable threshold | P0 |

**Success signal:** Reduction in audit findings attributed to ERP control gaps; earlier remediation lead time.

---

### UC-2: Insider Risk & Anomaly Detection

**Description:** AI monitors user behaviour in sensitive ERP modules (finance, procurement, HR/payroll) for unusual access patterns and approval violations; triggers real-time alerts.

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-2.1 | Baseline normal user behaviour per role, module, and time window | P0 |
| FR-2.2 | Detect anomalies: off-hours access, privilege escalation, unusual transaction volumes, approval bypass | P0 |
| FR-2.3 | Detect SoD conflicts and toxic access combinations | P0 |
| FR-2.4 | Real-time alert delivery (email, SIEM webhook, in-platform notification) | P0 |
| FR-2.5 | Case management: alert → investigation → disposition workflow | P1 |
| FR-2.6 | Support fraud pattern library (ghost vendors, duplicate invoices, fictitious employees) | P1 |

**Success signal:** Mean time to detect insider/access anomalies; number of prevented or early-caught fraud events.

---

### UC-3: Automated Incident Response (ERP-Scoped)

**Description:** AI detects security incidents within ERP systems in real time and initiates structured response.

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-3.1 | Define ERP-relevant incident types (unauthorised config change, mass data export, credential abuse, integration compromise) | P0 |
| FR-3.2 | Real-time incident detection correlated across ERP logs and identity systems | P0 |
| FR-3.3 | Automated first-response playbooks (session termination, access freeze, ticket creation) | P1 |
| FR-3.4 | Escalation rules by severity and regulatory notification requirements | P1 |
| FR-3.5 | Incident timeline and forensic evidence preservation | P0 |

**Success signal:** Mean time to respond (MTTR) for ERP security incidents.

---

### UC-4: Compliance Reporting Automation

**Description:** Extract control execution data from ERPs daily; produce real-time dashboards and on-demand audit-ready reports.

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-4.1 | Scheduled (daily minimum) extraction of control execution evidence from ERP | P0 |
| FR-4.2 | Real-time dashboards per framework: ISO 27001, SOX, POPIA readiness | P0 |
| FR-4.3 | On-demand audit-ready report generation (PDF/structured export) | P0 |
| FR-4.4 | Control test result history and auditor-friendly evidence packaging | P0 |
| FR-4.5 | Reduce manual reporting effort (target metric TBD with pilot client) | P1 |

**Success signal:** Hours saved per audit cycle; auditor acceptance rate of generated evidence packs.

---

## 7. Non-Functional Requirements

| Category | Requirement |
|----------|-------------|
| **Security** | Data encrypted at rest and in transit; tenant isolation; POPIA/GDPR-aligned processing |
| **Privacy** | Role-based access; audit trail of all AI recommendations and human overrides |
| **Integration** | ERP connectors (API, log forwarder, or agent-based — TBD per ERP); SIEM optional |
| **Latency** | Real-time alerts: &lt; 5 minutes from event to notification (target) |
| **Availability** | 99.5% platform uptime (initial target for MVP) |
| **Explainability** | Every alert/report must cite triggering evidence (transaction IDs, users, controls) |
| **Configurability** | Framework mappings and thresholds adjustable per client without code deploy |
| **Agent architecture** | Long-context business ghost stores client + domain context; agents evolve with daily operational logs |
| **Deployment** | Support client-dedicated VM / NestVM instance model per Statix partnership |

---

## 8. Platform Integration (Statix Partnership)

### 8.1 Architectural Fit

The Statix “business ghost” model aligns with this product:

| Statix Concept | Product Application |
|----------------|---------------------|
| Central RAG brain | Stores client ERP context, control frameworks, historical incidents |
| Long-range agents | Compliance monitor, anomaly detector, incident responder, report generator |
| Daily activity log onboarding | Product owner + client SOPs feed domain tuning over time |
| Dedicated VM per partner | Isolated client environments for regulated data |
| Working group ecosystem | Shared R&D, compute access, cross-border opportunity pipeline |

### 8.2 Commercial Model (Discussed, Not Finalised)

- Statix **licenses technology** to local product owner
- Product owner **owns product P&L**, sales, and client relationships
- Statix provides **technical support** and platform evolution
- Product owner participates in **AI working group** for inclusion-led market access (SA + global)

---

## 9. Out of Scope (v0.1)

- Full replacement of enterprise GRC platforms (ServiceNow GRC, Archer, etc.)
- Non-ERP systems as primary data source (Phase 2+ unless explicitly scoped)
- Legal sign-off on compliance interpretations (product assists; human expert retains accountability)
- Penetration testing or red-team services
- Guaranteed regulatory certification (product supports readiness; certification remains client/auditor process)

---

## 10. Success Metrics (Draft — Requires Baseline from Pilot)

| Metric | Target (to be validated) |
|--------|------------------------|
| Audit finding reduction (ERP-related controls) | ≥ 30% vs. prior year |
| Proactive control issues flagged pre-audit | ≥ 80% of eventual findings caught early |
| Insider anomaly detection MTTD | &lt; 24 hours |
| ERP incident MTTR | 50% reduction vs. manual process |
| Manual compliance reporting effort | ≥ 40% reduction |
| Client NPS (product owner channel) | ≥ 40 |
| Time to onboard new client environment | ≤ 4 weeks (MVP target) |

**Critical:** Meeting emphasised defining “what success looks like” *before* build — these numbers are placeholders pending pilot baselines.

---

## 11. Phased Delivery Roadmap

### Phase 0 — Discovery & Partnership (Current)

- [ ] Complete Statix project intake form / platform account
- [ ] Tumelo shares existing AI compliance proposal materials
- [ ] Statix shares platform overview, costings, and agent architecture docs
- [ ] Align on product owner vs. PwC employment boundaries
- [ ] Define MVP scope and first pilot client profile

### Phase 1 — MVP (Suggested 90-day horizon post-intake)

- ERP log ingestion (one ERP target — e.g. SAP or Dynamics)
- UC-4 compliance reporting automation (ISO 27001 subset)
- UC-2 basic anomaly detection (access + approval violations)
- Dashboard + on-demand PDF report
- Single-tenant NestVM deployment

### Phase 2 — Operational Intelligence

- UC-1 predictive compliance scoring
- UC-3 incident response playbooks
- SOX + POPIA framework packs
- SIEM integration

### Phase 3 — Scale & Ecosystem

- Multi-ERP connector library
- Fraud pattern library (ghost vendor / employee scenarios)
- Statix working group go-to-market in additional corridors
- Partner auditor portal

---

## 12. Open Questions & Risks

### 12.1 Open Questions

| # | Question | Owner |
|---|----------|-------|
| OQ-1 | Which ERP(s) first? SAP, Oracle, Dynamics — based on PwC client concentration | Tumelo |
| OQ-2 | PwC employment policy: can product be sold via external entity while employed at PwC? | Tumelo / Legal |
| OQ-3 | Data residency requirements for SA public sector and financial services clients? | Joint |
| OQ-4 | Statix licensing cost model vs. per-client SaaS pricing? | Statix |
| OQ-5 | Who holds liability for AI-generated compliance recommendations? | Joint / Legal |
| OQ-6 | Integration approach when client ERP is on-prem vs. cloud? | Technical |
| OQ-7 | Priority ranking of four use cases for MVP (meeting flagged “what do you need *now*”) | Tumelo |

### 12.2 Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Regulatory / auditor acceptance of AI evidence** | High | Human-in-the-loop; cite source transactions; pilot with friendly auditor |
| **ERP integration complexity** | High | Start with one ERP + log-based ingestion before deep API |
| **False positive alert fatigue** | Medium | Tunable thresholds; role baselines; case management |
| **Conflict of interest (PwC + external product)** | High | Clarify governance early; possibly separate legal entity |
| **Partner dependency on Statix platform** | Medium | Document SLAs; exit/data portability terms in license |
| **Scope creep across four use cases** | Medium | Strict MVP = reporting + basic anomaly only |
| **Transcript ambiguity on product naming/branding** | Low | Decide co-brand (PwC-adjacent vs. independent vs. Statix white-label) |

---

## 13. Action Items (From Meeting)

| Action | Owner | Status |
|--------|-------|--------|
| Send project intake link/form for project registration | Statix | Pending |
| Share current AI compliance & security proposal materials | Tumelo | Pending |
| Send Statix platform & agentic system overview materials | Statix | Pending |
| Tumelo to define priority needs and MVP “ideal success” picture | Tumelo | Pending |
| Explore in-person follow-up (coffee, Morningside / Madison Square area) | Both | Discussed |

---

## 14. Appendix — Transcript Quality Notes

Items that should **not** be treated as confirmed requirements without verification:

- Specific partner claims (AWS savings, award wins, model performance vs. Google) — marketing context, not product specs
- Accidental sharing of code during demo — no technical dependency implied
- Name variations in transcript (Tumelo / Tendega / Tanega / Tumega) — confirm participant identity in formal docs
- “Statix” vs “Studex” naming — align to legal entity name in contracts

---

*End of PRD v0.1*

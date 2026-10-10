---
name: studex-managed-agents
description: Sell, provision and operate StudEx managed agent teams for clients. Use when the task involves the managed service offering, pricing or exclusions, onboarding a client, provisioning a Buzz workspace per client, configuring agent identities and permissions, the approval gate, the knowledge pack, the talking/voice agent, computer use, or reviewing claims in client-facing and investor materials.
---

# StudEx Managed Agents

The operating skill for the managed agent service. Read the linked pack before
acting; this file is the decision rules, not the full detail.

**Pack:** [`studex/managed-agents/00-README.md`](../../studex/managed-agents/00-README.md)
**Canonical positioning:** the Super Agents launch pack, `content/2026-08-23/super-agents-launch-pack.md`
**Architecture precedence:** `ARCHITECTURE.md`, then `SUPER_AGENTS_CONSOLIDATION.md`

---

## The one-sentence product

A small team that happens to be mostly agents, in a room the client can watch,
doing work the client approves.

If a proposed change breaks any clause of that sentence, it is not this product.

---

## Hard rules

These are not preferences. Breaking one creates legal, safety or commercial
exposure.

1. **Never claim a plan is a running system.** No agent counts, integrations,
   revenue figures or capabilities that cannot be demonstrated. If asked to write
   marketing or investor copy, check the claim against the codebase first.
2. **The approval gate is the product.** Every external action — messages,
   payments, publishing, account changes, anything irreversible — waits for a
   named human. Never design it away to make a demo smoother, and never describe
   the service as autonomous.
3. **One identity per agent.** One keypair each, never shared, least privilege at
   provisioning. An agent may never approve another agent's action.
4. **No workspace before paperwork.** Signed order, data processing agreement,
   named approver plus alternate, named operator, and a written never-do list.
   The n8n workflow enforces this and must not be loosened.
5. **Dry run before the client.** One week internal-only in the workspace before
   the client is invited. Never invite the client from automation.
6. **Citations on every answer.** Agents cite the source document. A wrong answer
   must be diagnosable.
7. **Computer use only inside a per-tenant VM**, as an unprivileged user, on an
   allowlist, with destructive actions gated. Never on a client machine, never as
   Administrator or root.
8. **Client PII stays in South Africa or the EU.** Tencent and other
   non-adequate jurisdictions are for generic corpus and model artefacts only —
   POPIA section 72.
9. **Voice discloses it is AI, and announces recording.** Escalate to a human on
   the turn it is requested, with no qualification loop. No outbound campaign
   calling without legal sign-off.
10. **Never state a patent filing, partnership or licence that has not been
    verified.** See the risk register for what happened when this slipped.

---

## The tiers

| Tier | Price | Shape |
|---|---|---|
| Managed Pilot | R3,500/mo | One agent, one role, one workflow |
| Managed Operations | R7,500/mo | Two workflows, one validated integration |
| Managed Team | R22,000/mo *(proposed)* | Private workspace, 3–5 agents, named operator |
| Nest VM | not for sale | Register interest only until health gates pass |

Setup: R15,000 Team, R6,000 Operations, waived for Pilot *(proposed)*.

Pilot and Operations prices are fixed by the launch pack and must match the
website. Team pricing is unapproved — say "proposed" until the owner signs off.

**Qualify in** if the workflow is repeated often, currently manual, easy for a
human to check, and valuable when consistent.

**Refuse** autonomous payments, unsupervised legal or medical decisions, access
to everything on day one, and any client whose real ask is headcount reduction
on a deadline.

---

## Onboarding

Automation: [`automation/n8n/studex-client-onboarding.json`](../../automation/n8n/studex-client-onboarding.json)
covers stages 1–4 and deliberately stops before client invitation.

```
0 qualify        Elara ten questions -> human scope review -> tier decision
1 paperwork      order, DPA, approver + alternate, operator, never-do list
2 provision      community, six channels, one keypair per agent, min scopes
3 knowledge      client marks each doc approved or reference-only; index; provenance
4 dry run        one week internal only; correct the pack; then and only then...
5 handover       invite client, show the export, start ONE workflow live
6 steady state   worklog daily, review weekly, operating review monthly
7 expand or exit export record + pack, destroy keys, confirm deletion in writing
```

Standard channels: `#general` `#agent-worklog` `#approvals` `#knowledge`
`#exceptions` `#review`. Keep `#approvals` separate from `#general` — merged, it
becomes a rubber stamp.

---

## Health signals

| Signal | Good | Bad | Meaning |
|---|---|---|---|
| Approvals granted / requested | falling toward stable | rising | boundary too tight; move low-risk actions inside it |
| Exceptions per week | falling | rising | scope is wrong; revisit before the client does |
| Knowledge corrections | falling | flat or rising | the pack was never right |
| Operator hours per client | known | unknown | the only real cost driver; if unmeasured, the tier is mispriced |
| Approvals read before granting | always | bulk-approving | the control has become theatre; fix the boundary, not the habit |

---

## Memory model

Three memories, three jobs, three stores. Never merge them — they have different
deletion obligations.

| Memory | Job | Where |
|---|---|---|
| Knowledge | what is true about the business | Obsidian vault + index, in-region |
| Relationship | who this is and what happened between us | Honcho peers, in-region |
| Transcript | verbatim, provable | object storage + Buzz event log, in-region |

**In the voice turn loop use Honcho's static representation endpoint, never the
chat endpoint.** The chat endpoint is an LLM call and does not fit the latency
budget. Use it asynchronously for call briefs and post-call enrichment.

---

## Reviewing claims

When asked to produce or edit client-facing or investor material, check every
claim in this order and refuse the ones that fail:

1. Does the capability exist in code that runs? If not, do not claim it.
2. Is the partnership agreed in writing? If not, it is a prospect.
3. Is the licence stated correctly? Check the actual licence text.
4. Is the counterparty sanctioned? Check before naming them.
5. Is the number an actual or a projection? Label it.
6. Is a filing claimed? Get the receipt or change the tense.

If material already in circulation fails any of these, say so plainly and
recommend withdrawal. Do not soften it — see the risk register for the cost of
having done otherwise.

---

## Third-party components

| Component | Licence | Use |
|---|---|---|
| Buzz | Apache-2.0 | Workspace, identity, audit trail. Self-host for Team tier. |
| Honcho | open source + managed | Relationship memory / Business Ghost |
| OpenMausBot | Apache-2.0 | Computer-use runtime, inside a VM only |
| open-slide | MIT | Decks, 1920×1080 |
| GrokBot | **no licence** | Read for ideas only. Never copy code. |

Before installing any skill or dependency: verify the source resolves, read the
manifest, audit for credential exfiltration, destructive commands, unknown
network calls and instruction spoofing, then produce a vetting report and wait
for owner approval. An unreachable or private repository cannot be vetted and is
therefore refused.

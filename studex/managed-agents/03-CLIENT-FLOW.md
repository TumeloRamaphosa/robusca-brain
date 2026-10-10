# The client flow — group created, agents placed, handed over

**Prepared:** 24 Aug 2026
**Status:** DESIGN. Not yet run for a single client.

You asked: *we make the group for each client and then we send it to them — what
would happen and how will it flow?*

This is that flow, made explicit. Automation for stages 1–4 is in
[`automation/n8n/studex-client-onboarding.json`](../../automation/n8n/studex-client-onboarding.json).

---

## Why Buzz makes this a product

Buzz is Block's Apache-2.0 workspace built on Nostr. Three of its properties
turn "a group per client" from a working habit into something sellable:

**Every participant is a keypair.** Humans and agents hold cryptographic
identities. An agent is a named participant, not a bot integration.

**Every event is signed and logged once.** Messages, reactions, workflow steps,
review approvals and git events all land in the same event log with the same
identity model, whether a person or a process authored them. That log *is* the
audit trail, produced as a side effect of working rather than as a reporting
feature someone has to build.

**Delegation preserves authorship.** Buzz's design choice is that authorising an
agent does not erase who authored the work: the agent signs its own output with
its own key, and its credential proves who authorised it and under what
conditions. For a managed service that is the ideal property — we can prove both
that the agent did the work and that a named human sanctioned it.

**One community per client** is the natural tenancy boundary. In the default
self-hosted deployment one relay hosts one community; a hosted multi-tenant
deployment keeps the same semantic boundary even when the backend shares
Postgres, Redis and object storage.

### The one thing to verify before selling this

Buzz is early — Block says so themselves, and the Git integration is explicitly
early-stage. Before Tier 3 is sold on this architecture, run the whole flow
below on an internal community for a month with real work in it. Treat the
self-hosted deployment as the default and hosted `buzz.xyz` as convenience for
pilots, because a client's signed operating record should not sit only on
infrastructure we do not control.

---

## The flow

### Stage 0 — Qualification *(before any provisioning)*

Elara qualifies against the ten questions in the launch pack. A human reviews the
structured summary and decides Pilot, Operations, Team, or decline. **No
workspace is created for an unqualified lead** — an empty client workspace is a
liability, not a head start.

Output: signed order, agreed workflow list, agreed data boundary.

### Stage 1 — Paperwork before provisioning

In this order, without exception:

1. signed service order stating tier, workflows and review cadence;
2. **data processing agreement** naming what data the agents may touch, where it
   is stored, retention, and the client's deletion rights;
3. named client-side approver, with a named alternate;
4. named StudEx operator accountable for the account;
5. explicit written list of actions the agents may **never** take.

That fifth item is the one people skip. Write it down with the client, because
it is the document you will point at when something goes wrong, and agreeing it
while everyone is optimistic is far easier than after an incident.

### Stage 2 — Provision the workspace

1. create the client community on the relay;
2. create channels from the standard template (below);
3. create a keypair per agent — **one identity per agent, never shared**;
4. create the StudEx operator identity;
5. scope each agent's authorisation to the minimum for its role;
6. record community id, agent public keys and scopes in the client record.

Standard channel template:

| Channel | Purpose |
|---|---|
| `#general` | Client and operator conversation |
| `#agent-worklog` | Agents post what they did. Append-only in practice. |
| `#approvals` | Every external action waits here for a named human |
| `#knowledge` | Requests to add or correct the knowledge pack |
| `#exceptions` | Anything the agents could not handle |
| `#review` | Weekly and monthly operating summaries |

Separating `#approvals` from `#general` is deliberate. When approvals live in the
main channel they get lost in conversation and people start approving in bulk to
clear the backlog, which is how the control becomes theatre.

### Stage 3 — Load the knowledge pack

1. collect documents from the client;
2. **the client marks each document approved or reference-only** — their call,
   in writing, not ours;
3. structure into the Obsidian vault for that client;
4. index for retrieval;
5. record provenance so every agent answer can cite its source document;
6. exclude anything outside the agreed data boundary.

Citation is not a nice-to-have. It is what makes a wrong answer diagnosable
instead of mysterious, and it is the difference between fixing the pack and
arguing about the model.

### Stage 4 — Configure and dry-run

1. write each agent's persona, role and boundaries;
2. attach the skills each role needs;
3. connect memory (see [04-TALKING-AGENT.md](04-TALKING-AGENT.md));
4. **run for one week with StudEx staff only in the workspace**, using real
   client scenarios but no client audience;
5. correct the knowledge pack against what the agents got wrong;
6. do not proceed until the operator would be comfortable with the client
   reading every message in the workspace.

Stage 4 is the stage that will be under pressure to skip. Skipping it means the
client watches us discover our own configuration errors, and first impressions
of an agent that confidently says something wrong do not recover.

### Stage 5 — Hand over

1. invite the client's people and pair their devices;
2. walk them through the six channels and the approval mechanic;
3. **show them the activity log and how to export it** — this is the moment the
   product becomes tangible;
4. confirm the approver and alternate can both actually approve;
5. agree the review time;
6. start with one workflow live, not all four.

### Stage 6 — Steady state

Daily: agents work, post to `#agent-worklog`, park external actions in
`#approvals`, escalate to `#exceptions`.

Weekly: operator posts a summary to `#review` — work completed, approvals
requested versus granted, exceptions, knowledge corrections, and anything the
agents repeatedly got wrong.

Monthly: written operating review. Approval count trending down and exception
count trending down means the boundary is right. Either one trending up means
revisit scope before the client does.

### Stage 7 — Expansion or exit

Expand only when the current workflows are accepted by the client and the
exception rate is stable. Add one workflow at a time.

On exit: export the signed activity record and the knowledge pack, hand both to
the client, destroy the agent keys, close the community, confirm deletion in
writing. **Design the exit now**, while nobody is angry. A managed service that
cannot cleanly hand back a client's own operating history will lose every
procurement review it enters.

---

## Approval mechanic

The single most important control in the product.

```
Agent decides an action is needed
        │
        ├── inside its boundary? ──► act, log to #agent-worklog
        │
        └── external or outside boundary?
                    │
                    ▼
            post to #approvals with:
              what it wants to do
              why, citing knowledge sources
              exact content of the outbound action
              what happens if declined
                    │
        ┌───────────┴────────────┐
        ▼                        ▼
    approved by            declined / edited
    named human            by named human
        │                        │
        ▼                        ▼
    agent executes,        agent logs outcome,
    signs the action       knowledge pack updated
```

Rules that make it real rather than decorative:

- an agent may never approve another agent's action;
- approvals are per-action, never standing;
- the approver is a named human, and the log records which one;
- a declined action must produce a knowledge correction, or the agent will
  propose the same thing next week;
- if approvals are being granted without being read, the boundary is wrong —
  fix the boundary rather than accepting the rubber stamp.

---

## What can go wrong, and the answer

| Failure | Why it happens | Mitigation |
|---|---|---|
| Client reads a confidently wrong agent answer | Knowledge pack incomplete | Stage 4 dry run; citations on every answer |
| Approval fatigue, bulk approving | Boundary too tight, too many trivial approvals | Move low-risk actions inside the boundary; measure the ratio |
| Agent acts outside scope | Authorisation too broad at provisioning | Minimum scope per agent; separate keys; review scopes monthly |
| Client's staff ignore the workspace | Handed over without a live workflow | Start one workflow live at handover, not zero |
| We cannot prove what happened | Working outside the workspace in DMs and calls | All client work happens in the community. No exceptions, including for us. |
| Client asks for autonomy | The gate feels slow | The gate is the product. Reprice, do not remove it. |
| Buzz breaks or changes under us | Early-stage software | Self-host; keep the event log exportable; do not build irreversible dependencies on unreleased features |

That last row deserves attention. Building the entire commercial promise on
software Block describes as early is a real risk, and the mitigation is
specifically that Nostr events are portable and exportable. Verify that export
works before the first client, not after.

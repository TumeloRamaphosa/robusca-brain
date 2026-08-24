# Hosting, isolation and how to give me credentials

**Prepared:** 24 Aug 2026

Answers three questions from the brief: where do we host this, can we use the
development VM until the client pays, and what happens if you send me the key to
a working Buzz group.

---

## 1. Do not send me keys in chat

**Please do not paste the Buzz relay key, API tokens or client credentials into
this conversation.** Anything in a chat transcript is stored, may be included in
future context, and cannot be reliably unsent. It is also the single most common
way small companies leak production access.

There is already precedent worth remembering: on 17 June the `robusca-brain`
repository was found to have been public since creation, leaking five live API
keys. Those still appear in `KEY_ROTATION_CHECKLIST.md`. That is exactly the
failure mode to avoid repeating.

### The safe route

| What | How |
|---|---|
| Credentials this agent needs | Cursor dashboard → Cloud Agents → Secrets. Injected as environment variables into the VM, never in the transcript. |
| Credentials the client's agents need | Per-tenant secret store on that client's VM. Injected at runtime. Never committed, never in the vault. |
| Buzz relay admin token | Stays with whoever runs ops. Agents never see it — they get their own scoped keypairs. |
| Anything already pasted anywhere | Rotate it. Assume it is compromised. |

Reference secrets in code and config as `${VAR_NAME}` placeholders only. That
rule is already in the workspace conventions and it holds here.

### What I can work with instead

Send me the **non-secret** facts and I can build everything: relay hostname,
community name and id, channel names, agent names and roles, the client's intake
form, their brand files, their standard replies. None of that is sensitive and
all of it is what actually shapes the build.

---

## 2. The development VM — no, not for client data

The brief asks whether we can host clients on our development VM until they pay.
For anything containing client personal information, the answer is no, and for a
medical client it is emphatically no.

**Why.** The development VM is shared, it is where we test things that break, and
the one runnable application on it — the War Room — has no authentication at all.
`passport`, `express-session` and `@supabase/supabase-js` are declared in
`package.json` and imported by nothing. Three real inboxes are reachable through
`/api/agentmail/messages` with no login. Putting a client's customer data on that
machine means a single misconfiguration exposes it, and if that client is a
medical practice the data is special personal information under POPIA.

**What the development VM is legitimately good for:**

- building and testing the agent templates;
- the internal dry run with **synthetic data** — invented customers, invented
  enquiries;
- demos to prospects, clearly labelled as demonstrations;
- our own StudEx workspace.

The moment real client data exists, it moves.

### The "until the client pays" problem, solved properly

The instinct behind the question is right — do not spend money on infrastructure
before revenue. The answer is not shared hosting, it is sequencing:

1. **Discovery and interview** — no infrastructure needed at all.
2. **Configuration and dry run** — on our development VM, synthetic data only.
3. **Setup fee invoiced** — R6,000 to R15,000 per the offering. A small VM in a
   South African or EU region costs a few hundred rand a month; the setup fee
   covers the first year several times over.
4. **Client VM provisioned** on receipt, before any real data is loaded.

If a client will not pay a setup fee, they will not pay month three either. The
fee is not just cost recovery — it is the cheapest qualification test available.

---

## 3. Hosting options, honestly compared

| Option | Good for | Not for | Verdict |
|---|---|---|---|
| **Our development VM** | Templates, synthetic dry runs, demos, StudEx's own workspace | Any real client data | Keep, scoped |
| **Small VM per client, SA or EU region** | Client pilots and production | — | **This is the answer for paying clients** |
| **Daytona** | Ephemeral dev environments for building the agent code | Long-lived client data | Use for development, not delivery |
| **Orgo.ai** | Computer-use VMs — the demo in [05-COMPUTER-USE.md](05-COMPUTER-USE.md) | General client hosting | Use for the computer-use demo |
| **Free tier VMs** | Nothing client-facing | Client data, anything with an SLA expectation | Avoid. No data protection terms, arbitrary termination. |

The free-tier temptation is the one to resist hardest. A free VM has no data
processing agreement, which means we cannot lawfully sign one with the client for
data held on it. The saving is a few hundred rand and the exposure is the whole
engagement.

### Region matters

Client personal information stays in **South Africa or the EU**. Cross-border
transfer to a non-adequate jurisdiction needs a lawful basis under POPIA section
72 — the same finding that constrains the Tencent plan in
[04-TALKING-AGENT.md](04-TALKING-AGENT.md). Pick the region before the first
client, put it in the data processing agreement, and do not move it later.

---

## 4. The per-client stack

One tenancy, four components, no sharing between clients.

```
CLIENT TENANCY  (one VM, SA/EU region, one client)
│
├── Buzz relay community        the workspace, signed event log
├── Gitea repository (private)  vault history + website repo
├── Obsidian vault              the knowledge, committed every 4h
└── Agent runtime               ACP harness, one keypair per agent
    └── secrets injected at runtime, tenant-scoped, never committed
```

Hard rules:

1. one client per VM, always;
2. one keypair per agent, never shared, never reused across clients;
3. secrets injected at runtime, never in the image and never in the vault;
4. the client's Gitea repository is private and the client gets a copy on exit;
5. backups in the same region as the primary;
6. the relay admin token never reaches an agent.

### Gitea, specifically

The brief asks for a private Gitea space per client. That is a good instinct and
it solves a real problem: it gives the client a durable, exportable, ordinary-
looking home for their own knowledge that does not depend on our product
continuing to exist.

Note the constraint already on record — the StudEx Gitea runs on Mac1 at
`localhost:3000` and is not reachable from outside that machine, which is why the
Super Agents site cannot be edited from here. **Do not put client repositories
behind that same limitation.** Client Gitea instances go on the client's VM,
reachable over the network, backed up, with the client holding a credential.

---

## 5. What I need from you to start

Non-secret, and enough to build the whole first client:

1. **The client's name and industry** — and confirmation of whether they are in a
   regulated profession.
2. **Their completed intake form** — sections A, E, F, G at minimum.
3. **The interview recording or notes.**
4. **Brand files and any existing standard replies or FAQs** — the fastest route
   to a working knowledge pack.
5. **Which workflow goes live first.** One, not four.
6. **Names for the agents.**
7. **The approver and their alternate.**
8. **Region decision** — South Africa or EU.
9. **Hosting decision** — a small VM per client is my recommendation.

Then I build the vault, the agent charters, the loop workflows and the workspace
configuration, and we dry-run it on synthetic data before the client sees
anything.

**Do not send:** relay keys, API tokens, passwords, client customer data, or
anything you would not want in a log file. Put those in the secret store and tell
me the variable names.

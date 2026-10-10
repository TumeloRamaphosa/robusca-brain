# Computer use — the GrokBot question

**Prepared:** 24 Aug 2026
**Status:** BOUNDARY DECISION. Deliberately not built.

You sent `github.com/pftq/GrokBot` and said we are building our own version.
Here is what it actually is, what is worth taking from it, and the one thing we
must not copy.

---

## What GrokBot is

A Windows script that gives Grok or ChatGPT free control of the desktop mouse
and keyboard. From its own README: run `GrokBot.exe` **as Administrator**, give
it an API key, and the model roams the machine — opening programs, typing into
fields, running system commands — and it keeps its memories across restarts.

The author's own notes are the most instructive part. There is a `maxNonResponse`
setting to force the model to check in "if Grok is running off too long without
asking for your input," and the README links to a post titled *"I almost lost my
computer at the end of my test."*

That is an honest hobbyist project and a genuinely impressive demonstration. It
is also, precisely as designed, the thing we must never put on a client machine.

## What is worth taking

Three things, and they are real:

1. **The loop works.** Screenshot → model → input events → screenshot is
   sufficient for useful desktop work. That was not obvious two years ago.
2. **Persistent memory across restarts matters more than model quality.** The
   README highlights it as a feature and it is the right instinct.
3. **A forced check-in interval is a genuine safety primitive.** `maxNonResponse`
   is a crude version of the approval gate in
   [03-CLIENT-FLOW.md](03-CLIENT-FLOW.md), invented independently because
   anyone who runs an unsupervised agent long enough discovers the need.

## What we must not copy

**The code, for a start — there is no licence.** The GrokBot repository publishes
no licence file. No licence means no grant of rights: default copyright applies
and we may read it for ideas but must not copy, vendor or redistribute the
source. Read it, learn from it, write our own.

**And the security posture, absolutely not.** Administrator privileges plus
unrestricted mouse and keyboard on a user's own machine, driven by a remote
model, is:

- an arbitrary-code-execution path controlled by an API endpoint we do not own;
- unauditable — desktop input events leave no attributable record;
- uncontainable — a mistake reaches every file, credential and browser session
  the logged-in user can reach;
- uninsurable, and unsellable to any client with a procurement process.

Put that on a client's laptop under a managed-service contract and the first
incident is not a support ticket. It is a liability claim, and the contract will
not save us because we installed it.

---

## Where computer use belongs

**Inside Nest VM, one tenant per VM, and nowhere else.**

This is exactly the problem Nest VM was specified to solve, which makes the
GrokBot question easy to answer: it is not a new product decision, it is the
justification for a decision already made.

```
NEVER                                  CORRECT
┌──────────────────────────┐          ┌──────────────────────────────┐
│ Client's own machine     │          │ Nest VM — one tenant         │
│                          │          │                              │
│ agent as Administrator   │          │ agent, unprivileged user     │
│ full desktop control     │          │ isolated workspace           │
│ client's real credentials│          │ tenant-scoped credentials    │
│ no audit trail           │          │ every action logged + signed │
│ blast radius: everything │          │ blast radius: one VM         │
│ recovery: reimage        │          │ recovery: rebuild, audited   │
└──────────────────────────┘          └──────────────────────────────┘
```

### Required properties before any computer-use agent touches client work

Carried over from the Nest VM gates in the Super Agents launch pack, plus three
specific to computer use:

- runs as an unprivileged user, never Administrator or root;
- one tenant per VM, no shared VM ever;
- tenant-scoped credentials injected at runtime, never baked into the image;
- **an allowlist of applications and destinations**, not a blocklist;
- **every action recorded as an attributable event** — screenshot, intent,
  input, outcome;
- **a hard stop on destructive operations** pending human approval: file
  deletion, credential entry, payment forms, sending anything, changing
  account settings;
- rebuild and destroy audited;
- recovery tested before, not after, the first client.

The allowlist point is worth insisting on. A blocklist for desktop automation is
unwinnable — there are infinite ways to reach a bad outcome and you will enumerate
none of them in advance.

---

## What to build on instead

The 23 August consolidation session already identified the right base:
**OpenMausBot**, Apache-2.0, which provides an agent harness, chat, computer use,
approvals and cloud or local desktops. It is the closer MVP runtime and it is
properly licensed for commercial use.

Recommended path:

1. Take OpenMausBot as the computer-use runtime rather than writing the loop.
2. Run it inside a per-tenant VM.
3. Put the approval gate in front of destructive actions.
4. Surface its activity into the client's Buzz `#agent-worklog` so computer-use
   work lands in the same signed record as everything else.
5. Treat "our own GrokBot" as the *demo*, on our own hardware, for showing
   investors and prospects what the capability looks like — never as the
   delivered artefact.

That last point matters commercially. A computer-use demo is genuinely
impressive and worth having for the deck and for sales calls. Just keep the
demo and the product distinct in every conversation, and label the demo as a
demo, exactly as the launch pack requires for the illustrative workspace.

---

## Honest position for client conversations

> Computer use is real and we can show it working. We do not run it on your
> machines. It runs in an isolated workspace we operate, with an allowlist of
> what it may touch, an approval step before anything irreversible, and a
> recorded trail of every action. That is slower than the demos you have seen.
> It is also the only version of this that a business can responsibly buy.

That paragraph will lose a small number of deals to someone promising more. It
will win the ones with a procurement department, which per the ecosystem diagram
is the entire Super Agents target market.

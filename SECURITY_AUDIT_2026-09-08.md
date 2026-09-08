# 🚨 SECURITY AUDIT — StudEx Nexus repo constellation

**Date:** 2026-09-08
**Auditor:** Robusca
**Trigger:** Agent Lord pasted a fleet/repo access table. Verifying "Full read" access turned up a visibility problem before anything else.
**Scope:** All 11 repos declared as submodules of `studex-nexus`, plus `studex-nexus` itself.

---

## Headline

**Every repo in the constellation is public to the anonymous internet.** Confirmed by unauthenticated request, not just by the API's `visibility` field.

The access table said "Full read." That's accurate — but so does everybody else have full read. That's the finding.

Two things need action today:

1. **One live, billable API key is exposed right now** — SambaNova, in `agents-dr.fixit`, public since 2026-05-11. Verified live: HTTP 200 against the SambaNova API, returning the billable model catalogue.
2. **`robusca-brain` is public again.** It was flipped PRIVATE on 2026-06-17 after the last incident. It is public today. The June fix did not hold, and nothing alerted us.

---

## 1. Repository visibility

| Repo | Visibility | Last push |
|---|---|---|
| `studex-nexus` | 🔴 public | 2026-09-05 |
| `The-Nexus-Agents-NEst` | 🔴 public | 2026-09-07 |
| `robusca-brain` | 🔴 public *(was made private 2026-06-17 — regressed)* | 2026-09-07 |
| `agents-dr.fixit` | 🔴 public | 2026-08-07 |
| `StudEx-Valley-OS` | 🔴 public | 2026-07-06 |
| `studex-mission-control` | 🔴 public | 2026-06-23 |
| `Global-Trader` | 🔴 public | 2026-05-14 |
| `agentic-lab-v3` | 🔴 public | 2026-07-08 |
| `dark-factory` | 🔴 public | 2026-07-19 |
| `command-center` | 🔴 public | 2026-04-23 |
| `studx-os` | 🔴 public | 2026-09-03 |
| `StudEX/Africa-Coffee-Bean` | ⚪ not reachable (private or moved) | — |

Note the access table listed 5 submodules. `studex-nexus/.gitmodules` declares **11**. Six repos are in the blast radius that weren't on the list: `Global-Trader`, `agentic-lab-v3`, `dark-factory`, `command-center`, `studx-os`, `Africa-Coffee-Bean`.

## 2. Credential findings

Scanned working trees and full git history of all reachable repos against ~25 credential patterns (cloud providers, LLM vendors, GitHub, Slack, Discord, Telegram, Twilio, Stripe, Shopify, Meta, database URIs, private keys).

### 🔴 LIVE — act today

| What | Where | Status |
|---|---|---|
| **SambaNova API key** | Location withheld — see note below. Sent to Agent Lord directly. | **LIVE.** Verified HTTP 200. Present in working tree *and* history for roughly four months. Billable inference account. |

> **Why the location is withheld:** this document is itself committed to `robusca-brain`, which is currently public. Naming the exact file that holds a *live* credential turns this report into a targeting aid — a scanner sees thousands of dead keys, but "this specific file, verified live today" is the signal an attacker actually wants. Exact paths, commit SHA and file list went to Agent Lord directly. **Restore the detail here only once the repos are private.**

### 🟠 Confirmed leaked, already neutralised by the vendor

| What | Where | Status |
|---|---|---|
| **Google Gemini API key** | Location sent to Agent Lord directly; tree + history | Google's automated scanner disabled it. Their API returns: *"Your API key was reported as leaked. Please use another API key."* Third-party proof the exposure was crawled, not theoretical. Still needs deleting and replacing. |

### 🟡 Dead, but still sitting in public history

| What | Where | Status |
|---|---|---|
| **GitHub classic PAT** | `robusca-brain` — `scripts/github-backup.py`, `memory/2026-03-12.md`; 4 commits (`a9e58ee`, `a1e2644`, `4ff947d`, `59933a2`) | Revoked (HTTP 401). History-only, not in HEAD. |
| **Discord bot token** | `robusca-brain` — `memory/2026-03-12.md`; commits `a9e58ee`, `a4f96cf` | Revoked (HTTP 401). History-only. |
| **Twilio Account SID** | `robusca-brain` history | An identifier, not a secret on its own. No paired auth token found. Low severity. |

### ⚪ Checked and clear

- `studex-nexus`, `studex-mission-control`, `Global-Trader`, `agentic-lab-v3`, `command-center`, `studx-os`, `dark-factory` — clean, tree and history.
- `StudEx-Valley-OS` — numerous hits, all documentation fixtures (`AKIAIOSFODNN7EXAMPLE`, `ghp_abc…`, `sk-1234…`, `EAAAABC…`, and 16 `postgres://user:pass@host` sample URIs). Worth one human spot-check, but the prefixes are textbook placeholder values.
- `robusca-brain` working tree — clean. Every `.env`-shaped hit is in a committed `.env.example` and every value is a placeholder. The June sanitisation held; the repo's *visibility* is what regressed.
- The four services from the June incident (AgentMail, FeedHive, DTN, Affine) — no key-shaped strings remain anywhere in history. Sanitisation was thorough.

---

## 3. What to do, in order

**Right now:**

1. **Rotate the SambaNova key.** Revoke the old one in the SambaNova console before anything else — it is live and billable while you read this. Check the account's usage history for spend you don't recognise.
2. **Flip all 11 repos to private.** Settings → General → Danger Zone → Change visibility. `robusca-brain` and `agents-dr.fixit` first.
3. **Check GitHub's fork/traffic data** on `agents-dr.fixit` before flipping. Forks survive a visibility change; if someone forked it, the key stays public in their copy and only rotation helps.

**This week:**

4. Delete the SambaNova key and Gemini key from the working trees, then rewrite history (`git filter-repo`) on `agents-dr.fixit` and `The-Nexus-Agents-NEst`. Rotation is the real fix; history rewrite is hygiene.
5. Enable **GitHub secret scanning + push protection** on every repo in the org. This is the control that would have caught all of this at push time, for free. It is the single highest-value item on this list.
6. Add a `.gitignore` rule set and a pre-commit hook (`gitleaks`) across the constellation so keys can't reach a commit in the first place.

**Structural — this is the second time:**

7. The June incident was closed by flipping one repo private. That fixed the symptom. The pattern is: agents commit config files with real values in them, into repos that default to public. Until secret scanning and push protection are on, this recurs.
8. Make "new repo is created private" the org default, and require an explicit decision to publish.

---

## 4. On the access table itself

Two corrections for the fleet handoff:

- **The paths don't exist from here.** `/root/.openclaw/workspace/studex-nexus` is on the OpenClaw VM. This cloud agent has only `robusca-brain` checked out at `/workspace`. I audited the others by cloning from GitHub, which worked *because they're public* — not because I hold access to that machine. If the fleet handoff assumes I can read those paths, it's wrong.
- **The list is incomplete.** Five submodules listed, eleven declared. See the table above.

---

*No credential values appear in this document. Keys are identified by service, file location, and status only.*

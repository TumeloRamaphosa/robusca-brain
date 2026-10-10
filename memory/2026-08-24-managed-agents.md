# Session Log — 2026-08-24 (managed agents build)

**Agent:** Robusca Romanov (Cursor cloud agent)
**Branch:** `cursor/managed-agents-service-build-d129`

---

## What was asked

A large multi-part brief: the five-layer ecosystem diagram, `buzz.xyz`, GrokBot,
open-slide, Honcho + Obsidian + Tencent memory for a talking agent, improving the
Puppetier fundraising deck, an n8n onboarding workflow, and "build everything".

Context worth remembering: the owner mentioned bad news and is looking at the
managed service as the revenue move. That instinct is right.

## Findings that must not be lost

**1. Buzz is the answer to the delivery question.** Block's Apache-2.0
Nostr-based workspace. Every participant is a keypair, every event signed into one
log, and delegation preserves authorship — the agent signs its own work, its
credential proves who authorised it. So "a group per client" becomes an auditable
workspace per client. That audit trail is the strongest commercial asset in the
whole business, because it is what procurement asks for and no competitor selling
per-seat chatbots has it. Caveat: Block calls Buzz early; self-host and verify
event export before client one.

**2. Roughly four of six backbone components can be bought, not built.** Honcho
*is* the Business Ghost layer (peers that change over time, including groups and
projects). Buzz is identity + permissions + auditing. Only the Execution Exchange
and the Nest VM lifecycle are genuinely original work. This turns the backbone
from an engineering programme into an integration job.

**3. The deck has four factual defects and a sanctions problem.** All verified
against primary sources:
- Llama 3.1 is **not** MIT — it is the Llama 3.1 Community License, and it
  requires derivative model names to *begin* with "Llama" plus a "Built with
  Llama" notice. So "StudEx-2571" is non-compliant, and a LoRA fine-tune of an 8B
  model is not "Africa's first proprietary LLM".
- **NtechLab has been on the US BIS Entity List since 11 Dec 2024** (facial
  recognition supplied to the Russian government to target protesters,
  presumption of denial) and under **EU human rights sanctions since 20 Jul
  2023**. The deck lists the partnership as "Active" and frames it as a moat.
- Google Cloud and NVIDIA logos sit in partner position on slide 1 while slide 9
  calls them "Opportunity". "13 healthcare partners" vs "Pipeline" likewise.
- "64 agents" do not exist; the 23 Aug audit found one runnable app.
- Patent "Filed" in 8 jurisdictions is unverified.

**4. The token raise is the largest legal exposure.** FSCA declared crypto assets
financial products under FAIS in 2022. No standalone token licence — needs FSP
authorisation with crypto subcategory, plus FIC Item 22 registration and
Directive 9 travel rule. The transitional window (1 Jun–30 Nov 2023) was relief
for existing operators and is closed. As at 31 Mar 2026: 533 applications, 310
approved, 17 declined. Nothing in the ecosystem requires a token.

**5. GrokBot has no licence file.** Read for ideas, never copy code. Its posture
(Administrator, full desktop control, remote model) is exactly what Nest VM
exists to prevent. Use OpenMausBot (Apache-2.0) as the computer-use runtime
instead, inside a per-tenant VM.

**6. Tencent memory needs a POPIA answer.** Routing SA client PII to China is a
cross-border transfer under section 72. Split: client PII in SA/EU, generic
corpus and model artefacts on Tencent.

**7. Honcho latency insight.** Use the static representation endpoint in the
voice turn loop, not `POST /peers/{id}/chat` — the latter is an LLM call and
blows the 300–800 ms budget. Chat endpoint is for async call briefs.

## Skill vetting

`alirezarezvani/claude-skill` returns **404** — cannot be audited, therefore
refused. No install attempted. The Colab link needs Google auth and was not read.

## Shipped

`studex/managed-agents/` 00–08, `automation/n8n/studex-client-onboarding.json`
(validated: 13 nodes, single root, graph integrity), and
`skills/studex-managed-agents/SKILL.md`.

## What I told the owner

The bottleneck is not ideas or content. 18 open PRs, zero ever merged, June
content never approved, first Managed Pilot never delivered. One client delivered
by hand is worth more than this entire pack. Decision sheet item 9 asks him to
name that client.

---

Tags: #managed-agents #buzz #honcho #risk #sanctions #fsca #popia #deck

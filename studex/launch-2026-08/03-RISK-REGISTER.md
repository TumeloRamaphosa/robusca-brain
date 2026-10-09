# Launch Risk Register
**Prepared by:** Robusca Romanov | **Date:** 2026-08-22
**Evidence:** [`research/last30days/2026-08-22-viral-and-agent-narrative.md`](../../research/last30days/2026-08-22-viral-and-agent-narrative.md)

> **Not legal advice.** I am not a lawyer and nothing here is a legal opinion. Risk 1 in
> particular needs a South African financial services attorney before any decision is taken.
> What I can tell you with confidence is the *marketing* consequence, and that part is clear.

---

## Risk 1 — The payment rail is a licensed financial services business

**Severity: high. Recommendation: remove from all launch material until a written licensing position exists.**

### What the diagram describes

```
Member → fiat (USD/ZAR/EUR) → regulated exchange / on-ramp → USDC/USDT
      → swap → STUDEX TOKEN → member wallet
      → spend on: memberships · AI & cloud usage · project payments ·
                  partner settlement · revenue sharing · cross-border work
```

Read plainly, that is: accepting public money, converting it into a crypto asset, issuing a
proprietary token, custodying it in wallets we operate, and settling third-party payments
across borders with it. Each clause in that sentence is a regulated activity in South Africa.

### What the research found

- **FSCA licensing.** Crypto asset service providers must be licensed under the FAIS Act.
  Any business offering crypto trading platforms, wallet provision or related intermediary
  services falls in scope. As at 31 March 2026: 533 applications, 310 approved, 17 declined.
  It is a real process with a real failure rate, not a formality.
- **Enforcement is live.** 30 supervisory inspections in the year to March 2026; 81
  investigations initiated, 56 ongoing. Non-compliance can mean suspension or withdrawal of
  licence under s9 of the FAIS Act.
- **Utility tokens are not carved out.** The framework does not distinguish between bitcoin,
  stablecoins and utility tokens — all sit inside the crypto asset classification for
  oversight purposes. Calling it a "utility credit" does not remove it from scope.
- **Cross-border needs a *second*, separate authorisation.** Under the draft Crypto Asset
  Manual and draft Capital Flow Management Regulations 2026 (published 17 April 2026,
  rewriting the 1961 Exchange Control Regulations), facilitating cross-border crypto movement
  requires standalone authorisation from FinSurv — separate from FSCA licensing and FIC
  registration. Operating without it once the framework takes effect would be unlawful. The
  application requires CIPC registration, FSCA certificate, FIC registration, a business plan,
  a description of wallet infrastructure, client asset segregation arrangements, and an
  FIC-compliant Risk Management and Compliance Programme.
- **The diagram explicitly says "cross-border work."** That is the exact activity requiring
  the second authorisation. It is not an edge case for us; it is the stated use.
- **Crypto is not legal tender.** SARB does not recognise crypto assets as currency, and FSCA
  licensing does not confer that status.
- **Regulatory exams are mandatory.** The exemption for licensed CASPs and their key
  individuals expired 30 June 2025 with no further extensions.

The draft regulations closed for comment on 30 June 2026, so the final text may differ. That
argues for waiting, not for proceeding.

### The part I'm confident about: it destroys the positioning

Set the licensing question aside entirely and it is still the wrong launch decision.

The whole campaign asks enterprise buyers to trust us on governance, auditability and
accountable control — that is the wedge, and it is aimed squarely at procurement teams who
have just been handed an analyst vocabulary for spotting vendors who overclaim. Showing that
same buyer an unlicensed proprietary token in the pricing flow is self-refuting. It is the
one asset on the page that makes a governance-led pitch look like theatre.

It also selects for the wrong audience. A token in the launch narrative attracts crypto
speculators and repels the R20,000-a-month buyer. Those are the only customers who make the
economics work, and they are the most conservative audience in the stack.

### Recommendation

1. **Invoice in ZAR and USD.** Ordinary payment processing, ordinary accounting, no new licences.
2. **If an internal unit of account is genuinely useful, make it unambiguously not a crypto
   asset:** non-transferable, non-redeemable for cash, no secondary market, no blockchain
   issuance, expires. That is a prepaid credit or loyalty balance — closer to airtime than to
   a token. Still worth a legal review, but a materially different conversation.
3. **Take the token out of the diagram, the deck, the site and every script** until counsel
   has given a written position.
4. **If the token is strategically essential**, treat it as a separate regulated venture with
   its own entity, its own timeline and its own licensing path — not as a payment feature of
   the AI business. Do not let it gate the AI launch, and do not let it contaminate the AI
   launch's credibility.
5. **Brief a South African financial services attorney** on FSCA CASP licensing, FIC
   registration and FinSurv cross-border authorisation before any further work.

---

## Risk 2 — Claims we cannot substantiate

**Severity: high. This is the one most likely to actually bite.**

The campaign's thesis is that competitors overclaim. That makes every one of our own
unsupported claims a loaded weapon pointed inward. The failure mode isn't a correction — it's
a story about hypocrisy, which travels further than anything we planned to publish.

| Claim in current material | Status | Action |
|---|---|---|
| Enterprise-tier results for NtechLab, Pharmasyntez, ART Engineering MDC, Project Phoenix | No outcome data anywhere in this workspace | Instrument, get written permission, or say only "four enterprise deployments live" |
| "14 years of AI" | Unsubstantiated in our own records | Drop until evidenced |
| "Replaces consultants, marketing teams, business development staff" | Invites an ROI challenge we cannot answer, in the exact month buyers got sceptical | Reframe to work that currently doesn't happen at all |
| MIT "95% of pilots" figure | Reached only via secondary reporting | Trace to primary source before quoting publicly |
| 86,846 Instagram followers | From a dated internal file | Re-baseline before using in any pitch |

Rule going forward, enforced at the `agentry` approval gate: **any claim about a customer
outcome is Tier 1 (our own instrumented data) or it does not ship.**

---

## Risk 3 — Credential exposure, unresolved

**Severity: high. Blocks launch.**

`MEMORY.md` records a June 2026 incident: the repository was public since creation, exposing
five or more live API keys, marked for rotation in
[`KEY_ROTATION_CHECKLIST.md`](../../KEY_ROTATION_CHECKLIST.md). I cannot confirm from this
workspace that rotation was completed.

A launch is a deliberate campaign to concentrate attention and scrutiny on our
infrastructure. Doing that with known-exposed credentials — while selling governance — is the
worst available combination of real exposure and reputational exposure.

**Action:** complete and confirm rotation before Phase 1. Treat it as a launch gate, not
maintenance.

---

## Risk 4 — Memory is a trust product

**Severity: medium-high, structural.**

We would be asking companies to centralise their most sensitive institutional knowledge —
decisions, customers, internal disagreements. For that product class, a data incident is not
an expensive problem, it is an existential one. There is no version of "we had a breach" that
a memory product survives easily.

**Before Ghost Day:** encryption at rest, tenant isolation verified rather than assumed, a
written incident response plan, and a documented data processing position. When a prospect
asks about security, the answer needs to be a document we hand over, not a sentence we say.

---

## Risk 5 — Complexity collapse

**Severity: medium.**

Seven brands and five layers cannot be launched at once. The failure is quiet: everyone
nods, nobody can repeat it, nothing converts, and it reads as strategy rather than confusion.

**Mitigation:** Memory → Workforce → Market as the only public structure. One product in the
launch. See [`00-POSITIONING.md`](00-POSITIONING.md).

---

## Risk 6 — "Agentic Rise" contains the tell-word

**Severity: low, but free to fix and embarrassing not to.**

`Agentic` is the precise word becoming shorthand for the practice we are campaigning against.
Running an anti-agent-washing campaign alongside a programme named after the tell-word is a
contradiction a journalist will enjoy.

**Mitigation:** rename to **Studex Rise** before launch. Costs nothing now; costs a news
cycle later.

---

## Risk 7 — The window closes

**Severity: medium, and it argues for speed.**

Anti-hype is currently both the highest-reach and the highest-trust position available. That
alignment is unusual and it exists only because the market's correction is recent. Once
priced in, this becomes ordinary positioning and the advantage is gone.

**Mitigation:** start Phase 1 now. The Audit does not depend on product readiness — it
depends only on being willing to publish our own score honestly.

---

## Summary — what blocks launch

| # | Risk | Blocks? | Owner |
|---|---|---|---|
| 1 | Token rail | Blocks the token, not the launch — remove and proceed | Tumelo + attorney |
| 2 | Unsubstantiated claims | **Blocks Phase 1** | Robusca (instrument) |
| 3 | Credential rotation | **Blocks Phase 1** | Tumelo + OpenCode |
| 4 | Memory-product security | **Blocks Ghost Day** | OpenCode |
| 5 | Complexity | Mitigated by positioning | Robusca |
| 6 | "Agentic" naming | Fix this week | Tumelo |
| 7 | Closing window | Argues for speed | — |

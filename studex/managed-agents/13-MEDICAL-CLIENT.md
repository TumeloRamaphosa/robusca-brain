# The medical client — scope, constraints, and where the money actually is

**Prepared:** 24 Aug 2026
**Status:** deliverable, but under a much narrower scope than the general package.

The brief proposes starting with a medical client. I want to be straight with you:
this is the hardest possible first client, and my own recommendation two days ago
was explicitly *not* healthcare for client one. The Super Agents launch pack says
healthcare requires separate risk, privacy and professional review before
onboarding.

I am not refusing it. If this is the relationship that is warm and ready, a
medical practice **can** be delivered — but only as an administration engagement,
under the constraints below. What cannot be delivered is the general package with
the word "medical" in front of it.

---

## Why it is the hard case

Three constraints stack on top of each other.

**1. The practitioner carries the professional consequence for our mistakes.**
The HPCSA position is that a practitioner is responsible for marketing done on
their behalf, and must ensure any agency or platform they use adheres to medical
ethics. That is us. If an agent publishes something that constitutes touting, the
practitioner faces the HPCSA — not StudEx. There is no version of this where we
are casual about content and the client absorbs it.

**2. Health data is special personal information under POPIA.** It requires
explicit consent, stricter storage and stricter retention than ordinary data. The
default is that the agents do not see clinical content at all.

**3. Most of the marketing playbook is prohibited.** The HPCSA Ethical Rules
(Government Notice R.717, August 2006, as updated) and Booklet 16 on social media
(March 2025) rule out much of what a social agent would normally do.

### The content rules, concretely

**Permitted:** name, title, HPCSA-registered qualifications, practice address and
contact details, hours of practice, areas of special interest, and factual,
verifiable information that helps a patient make an informed choice.

**Prohibited:**

- patient testimonials about clinical outcomes, and re-sharing or liking a
  patient's own testimonial, which adopts it as marketing;
- comparative claims — "leading", "best", "most advanced", or any comparison
  against other practitioners;
- before-and-after imagery;
- inducement language — discounts, "special offer", "limited time", free
  screenings, non-medical perks as a drawcard;
- outcome guarantees of any kind;
- content causing unwarranted anxiety that a reader may have a condition;
- claiming "Specialist" or any title not matching the actual registration;
- identifiable patient information or images without written informed consent;
- canvassing or touting, including cold-call tactics;
- endorsing a hospital, medicine or health product for financial gain.

**Also required:** a disclaimer that health information shared online is generic
and does not replace a clinical consultation, and separation of personal and
professional accounts.

Combined with POPIA section 69 on outbound messaging, this means the Social and
Pipeline agents are nearly inert for this client. Say that to them plainly — it
builds more trust than promising reach.

---

## Where the money actually is for a medical practice

This is the part worth reading, because it changes the pitch from a weak one to a
strong one.

For a retailer, the revenue lever is marketing. For a medical practice, marketing
is regulated into near-silence — **so the revenue lever is operational, and it is
bigger.** A practice does not have a demand problem. It has a throughput and
leakage problem.

| Lever | Why it is money | Regulated? |
|---|---|---|
| **Unanswered enquiries** | Every enquiry that never got a reply is a booked appointment lost. Nobody counts these. | No |
| **Cancellation backfill** | An empty slot is unrecoverable revenue. A waiting list worked within minutes of a cancellation fills it. | No — contacting existing patients about their own care is not marketing |
| **No-show reduction** | Structured reminders and confirmations. Direct, measurable revenue. | No, with consent at intake |
| **Admin turnaround** | Referral letters, medical aid pre-authorisations, report requests. Faster turnaround means more clinical time. | No — administration |
| **Billing and coding accuracy** | Rejected claims and under-coded consultations are pure leakage. | No, and it is drafting only |
| **Recall lists** | Patients due for follow-up who never returned. Their own care, not marketing. | Care communication, not s69 marketing — confirm per case |
| **Factual web presence** | Correct hours, services, directions, and a working contact route. Patients leave sites that cannot answer these. | Permitted category |

**The pitch, therefore:** "We are not going to market your practice — your
professional rules mostly forbid it, and any agency promising you reach is
setting you up for an HPCSA problem. We are going to stop your practice leaking
revenue at the front desk." That is honest, it is differentiated, and it is a
larger number than marketing would have been.

---

## Scoped agent roster for a medical practice

Five of the eight roles. Three are withheld and it is worth telling the client
why.

| Agent | Status | Scope |
|---|---|---|
| **Chief of Staff** | Yes | Daily brief, weekly review, vault upkeep. No clinical content. |
| **Inbox** | Yes | Triage administrative mail. Drafts for approval. Clinical mail flagged and untouched. |
| **Patient Admin** | Yes | Appointment requests, cancellation backfill, reminders, referral and pre-auth paperwork. Drafts only. |
| **Research** | Yes | Signal loop on **operational** data — unanswered enquiries, no-show rate, slot utilisation. Never clinical outcomes. |
| **Web** | Yes | Audit against permitted-category content. Merge requests only. |
| **Social** | Withheld initially | Permitted content is so narrow that value is low and risk is high. Revisit at month three. |
| **Pipeline** | **Withheld** | Outbound patient acquisition is canvassing. Not built for this client. |
| **WhatsApp** | Deferred | Possible for appointment administration with consent at intake and platform template approval. Not in phase one. |

### Absolute boundaries — into `BOUNDARIES.md`, signed by the practitioner

The agents must never:

1. give clinical advice, triage a symptom, or interpret a result;
2. read, summarise or store clinical records — administrative metadata only;
3. discuss a patient's condition, even with that patient;
4. publish anything about an identifiable patient;
5. publish a testimonial, comparative claim, before-and-after image, inducement
   or outcome guarantee;
6. state or imply a qualification or title not matching the HPCSA registration;
7. initiate contact with anyone who is not an existing patient;
8. send anything to a patient without the practitioner or practice manager
   approving it;
9. continue with anyone describing an urgent symptom — immediate handoff with the
   emergency route;
10. produce content that could cause a reader unwarranted anxiety about their
    health.

Rule 9 needs a hard-coded rule ahead of the model, not a prompt instruction. A
symptom keyword list that triggers immediate escalation and stops generation. This
is the one place in the whole system where a model failure could cause physical
harm, and it must not rely on the model behaving well.

---

## Extra requirements before this client goes live

Beyond the standard flow in [03-CLIENT-FLOW.md](03-CLIENT-FLOW.md):

- [ ] Practitioner's HPCSA registration number and category confirmed
- [ ] Written confirmation from the practitioner that they have reviewed and
      accept the content boundaries
- [ ] Data processing agreement covering special personal information
- [ ] Clinical data explicitly excluded from the agents' reach, in writing, and
      enforced by configuration rather than instruction
- [ ] Symptom-escalation rule implemented and tested with deliberate attempts to
      get past it
- [ ] Emergency handoff route documented and confirmed working
- [ ] Website content reviewed against the permitted categories before any change
      goes live
- [ ] Storage region confirmed South Africa or EU
- [ ] Retention rules aligned to the practice's statutory obligations
- [ ] A second person reviews every outbound template before first use
- [ ] Someone competent confirms my reading of the HPCSA rules — I have read the
      published guidance, and this client deserves a professional opinion rather
      than an agent's summary

That last item is not modesty. The practitioner is putting their registration
behind our configuration, and they should have advice that carries liability.

---

## My recommendation, stated once

Deliver this client if the relationship is real and warm — the operational
revenue case above is genuinely strong and the constraints are workable.

But **run one non-regulated client in parallel**, and run them in that order if
you have to choose. The point of client one is to learn how our own delivery
breaks, and it is much cheaper to learn that where a configuration error means an
awkward email rather than an HPCSA complaint against someone who trusted us.

If the medical practice is the only warm relationship you have, take it, scope it
exactly as above, and do not let anyone talk you into adding the Social or
Pipeline agents in month one.

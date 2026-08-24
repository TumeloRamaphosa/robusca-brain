# Client intake — the PRD you send them

**Prepared:** 24 Aug 2026
**Use:** send sections A–I to the client before any workspace is provisioned.

Two documents make up onboarding. This is the first: **facts about the business**,
which the client fills in themselves. The second is
[11-COMPANY-SOUL-INTERVIEW.md](11-COMPANY-SOUL-INTERVIEW.md), the guided
interview we run live to produce their agent team's character.

Do not merge them. This one is homework and can be done without us. The
interview needs a person in the room, and doing it as a form produces
generic answers that make generic agents.

---

## How to use it

Send sections A–I as a document or form. Expect it back incomplete — that is
useful information, because **the sections a client cannot answer are the sections
where their business is undocumented**, and those are exactly the areas where an
agent will fail. Treat gaps as findings, not as obstruction.

Rules for us: nothing is provisioned until sections A, E, F and G are complete.
Those four are the legal spine. B, C, D, H and I shape the work.

---

## Section A — Identity *(mandatory)*

1. Registered legal name, and trading name if different.
2. Registration number and VAT number if registered.
3. Physical address, and country/region where the business operates.
4. Website, and every social account you want us to work with.
5. Primary business contact: name, role, email, phone.
6. Who signs contracts on behalf of the business?
7. Are you in a regulated profession or industry? Which regulator, and are you
   personally registered with them?

Question 7 changes everything downstream. Answer it before anything else.

## Section B — How the business actually makes money

8. In plain language, what does the business sell?
9. List your offers with prices. Mark which can be bought online today.
10. What is your average order or engagement value?
11. Roughly how many enquiries do you receive a week, across all channels?
12. Roughly what proportion of enquiries become customers?
13. What is the single biggest reason you lose a deal?
14. Which of your offers is most profitable? Is it the one you sell most of?

Questions 11–13 are the ones that let us find revenue in the first month. Most
businesses have never counted 11, and the counting alone is often worth the fee.

## Section C — Where the work is stuck

15. Name the three most repetitive tasks your team does every week.
16. For each: who does it, how long it takes, how often it is done.
17. Which of those would you be comfortable with a machine drafting, if a person
    always checked before it was sent?
18. Which of those must never be touched by a machine, and why?
19. What currently falls through the cracks when you get busy?
20. What is the first thing you would hand over if you trusted the system?

## Section D — Systems and access

21. Email: what provider, how many mailboxes, shared or individual?
22. Website: what platform, who has admin, is the code in a repository?
23. Do you have a CRM? Which one? Is it actually used?
24. Where do customer records live today? Include spreadsheets — be honest.
25. What do you use for social publishing, if anything?
26. WhatsApp: personal number, WhatsApp Business app, or Business API?
27. Accounting or invoicing system?
28. Anything else the team lives in daily?

## Section E — Data and sensitivity *(mandatory)*

29. Will the agents encounter personal information about your customers? *(Almost
    certainly yes if they touch email.)*
30. Will they encounter **special personal information** — health, biometric,
    religious, political, trade union, criminal, or children's data?
31. Where may that data be stored? Any jurisdiction restriction we must honour?
32. How long must records be retained, and is that a legal requirement or a
    preference?
33. Who in your organisation is accountable for data protection?
34. Do you have a privacy notice published? Link it.
35. Is there anything the agents must never see, even if it arrives in an inbox
    they read?

Question 30 is the fork in the road. A yes moves the engagement into a stricter
configuration and may change the price. Question 35 is the one clients forget and
later care about most.

## Section F — Approval and accountability *(mandatory)*

36. Who approves outbound messages? Name, role, contact.
37. Who is the alternate when they are unavailable? *(Must be a different person.)*
38. Expected response time on an approval request during business hours?
39. What happens to a queued approval nobody answers by end of day?
40. Who may change the agents' permissions? Only that person, and us, will be able to.
41. What are your working hours and time zone?

Question 39 matters more than it looks. An approval queue with no expiry rule
either blocks the work or gets bulk-approved, and both destroy the value.

## Section G — Boundaries: the never-do list *(mandatory)*

42. List everything the agents must never do, regardless of who asks. Be specific.

Start from this and edit it. Every client keeps most of it:

- send anything to a customer without approval;
- quote a price, discount, refund or credit not in the approved list;
- commit to a delivery date, deadline or availability;
- give clinical, legal, tax or financial advice;
- accept liability or apologise in terms admitting fault;
- change, cancel or create an order, appointment or account;
- initiate contact with anyone who has not consented or is not a customer;
- access payroll, HR files, banking or director-level correspondence;
- publish anything naming a customer;
- continue with a person who has asked for a human.

43. Anything on that list you want to *remove*? Tell us why, in writing.

We keep 42 and 43 in the vault as `BOUNDARIES.md`, and it is the document we all
point at when something goes wrong.

## Section H — Voice and brand

44. Send your brand guide if you have one. If not, send five things you have
    written that sound right.
45. Describe your voice in three words.
46. Words, phrases or claims you never use?
47. Do you have written FAQs or standard replies? Send them — they are the
    fastest route to a working agent.
48. Fonts, colours, logo files.

Question 47 is the single highest-value item on this form. Existing standard
replies are a pre-built knowledge pack.

## Section I — Success

49. Three months from now, what has to be true for this to have been worth it?
50. What number would you check to know it worked?
51. What would make you cancel?
52. Has anything like this been tried here before? What happened?

Question 51 is the most useful question on the form. Ask it, write the answer
down, and design against it.

---

## What we do with it

| Section | Becomes |
|---|---|
| A | Client record, tenancy, regulated-industry routing |
| B | `OFFERS.md`, `CUSTOMERS.md`, the revenue baseline |
| C | The workflow list and agent roster |
| D | Integration scope — nothing is "connected" until tested per account |
| E | Data processing agreement, storage region, retention rules |
| F | Approver configuration and the approval SLA |
| G | `BOUNDARIES.md` and each agent's scopes |
| H | `BRAND.md`, `SOUL.md`, initial knowledge pack |
| I | The success measure in the proposal, and the review agenda |

Anything the client cannot answer goes into `corrections/` as a known gap on day
one, so it is visible rather than discovered by an agent being confidently wrong
in front of a customer.

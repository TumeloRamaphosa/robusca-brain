# BOUNDARIES.md — <Client Name>

> **Signed by the client on:** _______________
> **Approver:** <name, role, contact>
> **Alternate approver:** <name, role, contact — must be a different person>
>
> This is the document we point at when something goes wrong. It is enforced by
> configuration, not by instruction — an agent's scopes are set from this file.

---

## The never-do list

Regardless of who asks, including the client's own staff and including us, the
agents must never:

1. send anything to a customer without a named human approving it;
2. quote a price, discount, refund or credit that is not in `OFFERS.md`;
3. commit to a delivery date, deadline or availability;
4. give clinical, legal, tax or financial advice;
5. accept liability, or apologise in terms that admit fault beyond the facts;
6. change, cancel or create an order, appointment or account;
7. initiate contact with anyone who has not consented or is not an existing
   customer;
8. access payroll, HR files, banking or director-level correspondence;
9. publish anything naming an identifiable customer;
10. continue with a person who has asked for a human;
11. approve another agent's action.

**Client additions:**

- <from intake q42>

**Client removals, with written reasons:**

- <from intake q43. If empty, the list above stands in full.>

---

## Approval matrix

| Action | Inside boundary | Needs approval | Never |
|---|---|---|---|
| Draft an email | ✓ | | |
| Send an email | | ✓ | |
| Answer inbound WhatsApp in the service window from approved knowledge | ✓ | | |
| Initiate a WhatsApp message | | ✓ | |
| Draft social content | ✓ | | |
| Publish social content | | ✓ | |
| Add someone to an outreach list | | ✓ | |
| Send marketing to a non-consented person | | | ✓ |
| Open a website merge request | ✓ | | |
| Merge to the live site | | ✓ | |
| Commit to the vault | ✓ | | |
| Quote a price from `OFFERS.md` | ✓ | | |
| Quote any other price | | | ✓ |
| Issue a refund or credit | | | ✓ |
| Escalate to a human | ✓ | | |

Adjust per client, then set each agent's scopes to match. If the table and the
scopes disagree, the scopes win — so keep them in step.

---

## Approval service level

- **Response expected within:** <from intake q38>
- **Unanswered by end of day:** <from intake q39>
- **Working hours:** <from intake q41>

An approval queue with no expiry rule either blocks the work or gets
bulk-approved. Both destroy the control, so this section is mandatory.

---

## Escalation

| Trigger | Goes to | How fast |
|---|---|---|
| Customer asks for a human | <name> | Immediately, same turn |
| Agent has no approved answer | <name> | Same working day |
| Complaint or legal threat | <name> | Immediately |
| Anything on the never-do list was attempted | <name> + StudEx operator | Immediately |
| Suspected data incident | <name> + StudEx operator | Immediately |

---

## Data boundary

**Agents may see:** <from intake q29–q31>
**Agents must never see:** <from intake q35>
**Storage region:** <South Africa / EU>
**Retention:** <from intake q32>
**Special personal information involved:** <yes / no — from intake q30>

If special personal information is involved, exclusion is enforced by
configuration and access control, never by asking the agent not to look.

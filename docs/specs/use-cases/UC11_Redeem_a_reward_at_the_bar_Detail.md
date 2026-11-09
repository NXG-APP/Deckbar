# UC11 - Redeem a reward at the bar - Detail

What the R2SS acceptance criteria leave out: decisions with their reasons and dates, figures, and the old wording.
The criteria themselves live in R2SS PROJ010 (the source of truth); the copy below is as written on 2026-11-09.

| | |
|---|---|
| R2SS name | Redeem a reward at the bar |
| R2SS id | `3dc71436-8388-4fcb-bbf7-2dc9aa39332f` |
| Working number | UC11 (repository only; R2SS has no numbers) |
| Priority | Must |
| Actors | Customer, Staff |
| BA analysis | `docs/ba-analysis/PROJ010_Clarification_QnA_2026-11-08.md` and the source analyses it names |

## Acceptance criteria (copy of R2SS, 2026-11-09)

- AC01 - The customer taps Redeem on an affordable reward; the phone shows the reward, their first name and a one-time code valid 10 minutes.
- AC02 - A staff member confirms the code on their own signed-in staff screen; the points are taken only on that confirmation.
- AC03 - A code can be confirmed once; an expired or used code is refused.
- AC04 - At most one redemption per account per business day.
- AC05 - A reward outside its valid dates, days and hours, or out of stock, cannot be redeemed; this is checked when the code is shown and when it is confirmed.
- AC06 - Every confirmation is logged with the staff member, the time, the customer and the reward.

## Description (R2SS, 2026-11-09)

A customer redeems a reward at the bar with a one-time code that a staff member confirms.

## Decisions and detail

- New 2026-11-09 (A2, A13; PTS-Q2, ADM-Q4). Conflict settled: the staff's own screen, not a staff PIN typed on the customer's phone (a PIN can be watched and reused).
- Staff check ID for a drink reward at the bar and record nothing (UC02-Q10, A8). A12 redeem only at the bar. A15 happy-hour window.

## History

| Date | Change | By |
|---|---|---|
| 2026-11-09 | Created in R2SS from the Q&A that Vincent accepted ("accept all"; A2 proposed it) | Claude Code, accepted by Vincent |

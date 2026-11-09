# UC06 - Admin view customers and engagement - Detail

What the R2SS acceptance criteria leave out: decisions with their reasons and dates, figures, and the old wording.
The criteria themselves live in R2SS PROJ010 (the source of truth); the copy below is as written on 2026-11-09.

| | |
|---|---|
| R2SS name | Admin view customers and engagement (was "Admin view users engagement") |
| R2SS id | `b927d14f-9632-41fd-89fa-48ee7afa9cb3` |
| Working number | UC06 (repository only; R2SS has no numbers) |
| Priority | Must |
| Actors | Admin |
| BA analysis | `docs/ba-analysis/PROJ010_Clarification_QnA_2026-11-08.md` and the source analyses it names |

## Acceptance criteria (copy of R2SS, 2026-11-09)

- AC01 - Only an admin can open it.
- AC02 - The list shows each customer's name, mobile number, email or Google account, consent ticks with their dates, and registration date and time, with the total number of customers.
- AC03 - The list can be searched by name or the last 4 digits of the mobile number, filtered by registration date and consent, and sorted by points.
- AC04 - A customer's page shows the games played, points earned per game, total points earned, used and remaining, and the rewards redeemed with their dates.
- AC05 - Daily counts are shown: landings, registrations with consent, active players and redemptions.
- AC06 - An admin can release a mobile number from an account and carry out a customer's deletion request.
- AC07 - It works on a phone held upright and on a computer.

## Description (R2SS, 2026-11-09)

An admin sees every registered customer and their engagement: games played, points, and rewards redeemed.

## Decisions and detail

- Original name "Admin view users engagement"; renamed and UC05 merged in (A2, ADM-Q3). Original description: basic details (name, Google account, mobile), registration time, games played and points per game, total / used / remaining, redeemed rewards.
- A20 success metrics: the app reports the counts; Deckbar compares its own monthly sales with the 3 months before launch - no till integration (PTS-Q12).
- A5 a clashing number is released by an admin (UC08-Q3). A7 deletion within 30 days (UC08-Q7). B13 device, search and filter (ADM-Q10). A16 export is Phase 2 (UC14).

## History

| Date | Change | By |
|---|---|---|
| 2026-11-08 | Created in R2SS. Description: "Basic customer details like name, gg account, mobile no. / Engagement activities: Reg date time / Games played, points gathered on each game / Total points, used, remain / Redeemed rewards"; no priority, no acceptance criteria | Vincent |
| 2026-11-08 | ba-agent: NOT READY | ba-agent |
| 2026-11-09 | Description rewritten, priority and acceptance criteria written from the Q&A that Vincent accepted ("accept all") | Claude Code, accepted by Vincent |

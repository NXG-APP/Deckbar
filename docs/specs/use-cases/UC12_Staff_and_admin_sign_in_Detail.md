# UC12 - Staff and admin sign-in - Detail

What the R2SS acceptance criteria leave out: decisions with their reasons and dates, figures, and the old wording.
The criteria themselves live in R2SS PROJ010 (the source of truth); the copy below is as written on 2026-11-09.

| | |
|---|---|
| R2SS name | Staff and admin sign-in |
| R2SS id | `1569c440-b7e5-4bbf-ac95-a58400b797be` |
| Working number | UC12 (repository only; R2SS has no numbers) |
| Priority | Must |
| Actors | Admin, Staff |
| BA analysis | `docs/ba-analysis/PROJ010_Clarification_QnA_2026-11-08.md` and the source analyses it names |

## Acceptance criteria (copy of R2SS, 2026-11-09)

- AC01 - Admins and staff sign in with Google; only accounts on the allowed list can sign in.
- AC02 - An admin sees customers and engagement, manages rewards and adds or removes staff.
- AC03 - A staff member can only confirm redemptions and sees the customer's first name and the reward, never mobile numbers or emails.
- AC04 - Every admin and staff member has their own account; no shared accounts.
- AC05 - Sign-ins, reward changes, redemption confirmations and exports are logged, kept 12 months and visible to admins.

## Description (R2SS, 2026-11-09)

Admins and staff sign in with their own Google accounts from an allowed list, each role seeing only what it needs.

## Decisions and detail

- New 2026-11-09 (A2, A14; ADM-Q1, ADM-Q2, PTS-Q5). The Admin actor is the Q&A's "Manager" role; "Staff" added to Q010.
- The allowed list lives in the hosting provider's settings, never in git; to start, Vincent and one Deckbar manager (ADM-Q1). B13 audit log (ADM-Q10).

## History

| Date | Change | By |
|---|---|---|
| 2026-11-09 | Created in R2SS from the Q&A that Vincent accepted ("accept all"; A2 proposed it) | Claude Code, accepted by Vincent |

# UC14 - Promotion campaigns - Detail

What the R2SS acceptance criteria leave out: decisions with their reasons and dates, figures, and the old wording.
The criteria themselves live in R2SS PROJ010 (the source of truth); the copy below is as written on 2026-11-09.

| | |
|---|---|
| R2SS name | Promotion campaigns |
| R2SS id | `01112cb0-f5e9-4012-9485-100d330ea2f8` |
| Working number | UC14 (repository only; R2SS has no numbers) |
| Priority | Phase 2 |
| Actors | Admin |
| BA analysis | `docs/ba-analysis/PROJ010_Clarification_QnA_2026-11-08.md` and the source analyses it names |

## Acceptance criteria (copy of R2SS, 2026-11-09)

- AC01 - An admin can send a promotion only to customers who consented to that channel.
- AC02 - Every message carries a way to unsubscribe; unsubscribing withdraws that consent.
- AC03 - An export of the customer list is open only to admins, holds only consenting customers (name, mobile number, consent date) and is logged.

## Description (R2SS, 2026-11-09)

An admin sends promotions to customers who consented to that channel.

## Decisions and detail

- New 2026-11-09, later phase (A16; ADM-Q9, PTS-Q10). Q008's purpose. Email first; SMS only after the owner approves its cost and a Do Not Call check (A8). An exported file is never put in the repository or chat.

## History

| Date | Change | By |
|---|---|---|
| 2026-11-09 | Created in R2SS from the Q&A that Vincent accepted ("accept all"; A2 proposed it) | Claude Code, accepted by Vincent |

# UC09 - Earn points from a game - Detail

What the R2SS acceptance criteria leave out: decisions with their reasons and dates, figures, and the old wording.
The criteria themselves live in R2SS PROJ010 (the source of truth); the copy below is as written on 2026-11-09.

| | |
|---|---|
| R2SS name | Earn points from a game |
| R2SS id | `b76890b6-d82a-4e6a-bfd1-f337c01fbfe4` |
| Working number | UC09 (repository only; R2SS has no numbers) |
| Priority | Must |
| Actors | Customer |
| BA analysis | `docs/ba-analysis/PROJ010_Clarification_QnA_2026-11-08.md` and the source analyses it names |

## Acceptance criteria (copy of R2SS, 2026-11-09)

- AC01 - A win in any game earns 10 points and a loss none; an admin can change the points per game.
- AC02 - Only the first win per game per business day earns points; a business day runs 06:00 to 05:59 Singapore time.
- AC03 - After that, games can still be played and are clearly marked "no points".
- AC04 - The server starts every game with a one-time ticket, alone decides the result and writes the points, once per ticket.
- AC05 - A result that is impossible for the game (too many throws or taps, too fast, two games at once) is refused and earns nothing.
- AC06 - Points do not expire.

## Description (R2SS, 2026-11-09)

A customer earns points by winning a mini-game, under one rule for all games, decided by the server.

## Decisions and detail

- New 2026-11-09 (A2, PTS-Q7). A10 points rule (PTS-Q1, UC02-Q3, Q5, UC03-Q3, Q4, UC04-Q1, Q2). A11 the server decides (UC02-Q2, UC03-Q2, UC04-Q3). A12 earn anywhere (PTS-Q3).
- Conflicts settled in the Q&A: reset 06:00 not 12:00; 10 points everywhere not 15 for bottle flip; the first win per game, not 3 wins or 1 game.

## History

| Date | Change | By |
|---|---|---|
| 2026-11-09 | Created in R2SS from the Q&A that Vincent accepted ("accept all"; A2 proposed it) | Claude Code, accepted by Vincent |

# UC02 - Dart mini game - Detail

What the R2SS acceptance criteria leave out: decisions with their reasons and dates, figures, and the old wording.
The criteria themselves live in R2SS PROJ010 (the source of truth); the copy below is as written on 2026-11-09.

| | |
|---|---|
| R2SS name | Dart mini game |
| R2SS id | `9edbb6b9-5034-4152-9866-4dcd252db549` |
| Working number | UC02 (repository only; R2SS has no numbers) |
| Priority | Must |
| Actors | Customer |
| BA analysis | `docs/ba-analysis/PROJ010_Clarification_QnA_2026-11-08.md` and the source analyses it names |

## Acceptance criteria (copy of R2SS, 2026-11-09)

- AC01 - The board shows the 7 letters D-E-C-K-B-A-R in a ring that turns slowly.
- AC02 - The customer has 10 darts; holding a thumb on the lower half of the screen shows a drifting crosshair above it, dragging aims and releasing throws.
- AC03 - A hit letter lights up and stays lit; all 7 lit, in any order, is a win; running out of darts is a loss.
- AC04 - Only a signed-in customer can play.
- AC05 - The server decides the win and awards the points (Earn points from a game), once per game.
- AC06 - An interrupted game pauses and resumes where it was; a refresh starts a new game.
- AC07 - Ring size, crosshair drift and turning speed are settings that change without changing code.

## Description (R2SS, 2026-11-09)

Throw darts at a turning board to hit all 7 letters D-E-C-K-B-A-R and win points.

## Decisions and detail

- B2 "all characters of Deckbar" = the 7 letters (UC02-Q1). B3 board, 10 darts, one-thumb aim (UC02-Q6).
- B4 difficulty target, checked by playtest: with at least 5 adults new to the game, at least half win within their first 3 games and nobody wins all of 5 (UC02-Q7).
- A10/A11 points, daily rule and server decision live in UC09 (UC02-Q2, Q3, Q5). C interruption: the result is resent with the same ticket until saved (UC02-Q8).
- B1 art: drawn in code; Deckbar logo and colours once Deckbar agrees; free-licence font; sound optional, off by default (UC02-Q9).
- A8 no drinking references in game text; legal check before the pilot (UC02-Q10).

## History

| Date | Change | By |
|---|---|---|
| 2026-11-08 | Created in R2SS. Description: "Mobile friendly / Through the dart, if can hit all characters of Deckbar then win some ponts"; no priority, no acceptance criteria | Vincent |
| 2026-11-08 | ba-agent: NOT READY | ba-agent |
| 2026-11-09 | Description rewritten, priority and acceptance criteria written from the Q&A that Vincent accepted ("accept all") | Claude Code, accepted by Vincent |

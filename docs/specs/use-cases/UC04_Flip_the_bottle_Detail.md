# UC04 - Mini game - Flip the bottle - Detail

What the R2SS acceptance criteria leave out: decisions with their reasons and dates, figures, and the old wording.
The criteria themselves live in R2SS PROJ010 (the source of truth); the copy below is as written on 2026-11-09.

| | |
|---|---|
| R2SS name | Mini game - Flip the bottle |
| R2SS id | `0595cd21-e56c-45b7-8605-13f55da37d96` |
| Working number | UC04 (repository only; R2SS has no numbers) |
| Priority | Must |
| Actors | Customer |
| BA analysis | `docs/ba-analysis/PROJ010_Clarification_QnA_2026-11-08.md` and the source analyses it names |

## Acceptance criteria (copy of R2SS, 2026-11-09)

- AC01 - A game is 10 throws; a swipe up on the lower half of the screen sets the strength (speed) and the direction (angle).
- AC02 - The bottle moves by 2D physics: arc, spin, bounce, wobble and tipping.
- AC03 - A throw succeeds when the bottle rests upright on the table, tilted under 10 degrees and still, for 2 seconds; off the table, on its side or cap, or still moving 8 seconds after release is a failure.
- AC04 - 3 or more successes in a game is a win; each throw's result shows within 3 seconds of the bottle coming to rest.
- AC05 - The bottle is a plain dark bottle with no brand name and no brand-like label.
- AC06 - Only a signed-in customer can play; the server holds the game and its throw count and awards the points (Earn points from a game).
- AC07 - Reopening an interrupted game within 10 minutes resumes it at the next throw; after that it ends with the throws made.
- AC08 - A typical player lands about 1 throw in 5; the tuning settings change without changing code.

## Description (R2SS, 2026-11-09)

Throw a bottle onto a table with a swipe; land it standing at least 3 times in 10 throws to win points.

## Decisions and detail

- Original description (Vincent): a Guinness bottle thrown from two metres onto a table, 10 tries, 3 standing earn points, a physics engine to look real.
- B7 no Guinness name or look; revisit only with Deckbar's written permission from the brand (UC04-Q4).
- B8 2D physics with a free open-source library and a fixed time step; shaded drawn art; no 3D - Q011 and low-end phones (UC04-Q6).
- B9 tuning: about 1 throw in 5, so about 1 game in 3 reaches 3 of 10; measured before the pilot, retuned from pilot data (UC04-Q7).
- C throw: the hand 2.0 m from the table's near edge, table top 1.0 m high; a swipe under about 40 px or too slow costs no throw; page scroll and refresh gestures are off in the play area (UC04-Q8, Q9). C interruption: a throw in flight does not count (UC04-Q10).
- A11 the phone simulates the physics; the server refuses impossible reports (over 10 throws, too fast, two games at once); the remaining risk goes into KNOWN_ISSUES when built (UC04-Q3).
- A8 legal check before launch: may be built on dev, not launched, until then (UC04-Q5).

## History

| Date | Change | By |
|---|---|---|
| 2026-11-08 | Created in R2SS. Description: "through the Guinness bottles from a distance of two meters onto the table and if the Guinness bottle stay stand still then they win if they aggregate they have ten tries if they can do 3 out of 10 then they will gain points You need to apply the physics engine to make it look real. And they also, if the bottle either not land on the table, or land on the table but fall down instead of standing still, then they will not get the point."; no priority, no acceptance criteria | Vincent |
| 2026-11-08 | ba-agent: NOT READY | ba-agent |
| 2026-11-09 | Description rewritten, priority and acceptance criteria written from the Q&A that Vincent accepted ("accept all") | Claude Code, accepted by Vincent |

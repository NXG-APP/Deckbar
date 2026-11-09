# UC03 - Memory card - Detail

What the R2SS acceptance criteria leave out: decisions with their reasons and dates, figures, and the old wording.
The criteria themselves live in R2SS PROJ010 (the source of truth); the copy below is as written on 2026-11-09.

| | |
|---|---|
| R2SS name | Memory card |
| R2SS id | `51f7c6b7-c32e-446d-81c6-53eaa10a6d03` |
| Working number | UC03 (repository only; R2SS has no numbers) |
| Priority | Must |
| Actors | Customer |
| BA analysis | `docs/ba-analysis/PROJ010_Clarification_QnA_2026-11-08.md` and the source analyses it names |

## Acceptance criteria (copy of R2SS, 2026-11-09)

- AC01 - 12 face-down cards in 3 columns x 4 rows hold the letters D-E-C-K-B-A-R and 5 picture cards; the word DECKBAR is shown above the grid.
- AC02 - Tapping a card turns it face up; the right next letter stays face up.
- AC03 - A wrong card shows for 1 second, then every card turns face down and the run restarts from D.
- AC04 - Turning up D-E-C-K-B-A-R in order within 60 seconds is a win; time up is a loss.
- AC05 - The server shuffles each game and reveals one card per tap; the phone never holds the layout.
- AC06 - Only a signed-in customer can play; the server decides the win and awards the points (Earn points from a game).
- AC07 - An interrupted game is not resumed: it ends as a loss when its time runs out, and the next game has a new layout.

## Description (R2SS, 2026-11-09)

Find and turn up the cards D-E-C-K-B-A-R in order among face-down cards to win points.

## Decisions and detail

- B5 a sequence game, not pairs; "in one row" = in one unbroken run (UC03-Q1).
- B6 the 5 picture cards: pint, bottle, glass, star, heart; one card back with the Deckbar name; no preview; unlimited mistakes within the time; the server allows 3 s slack for slow connections (UC03-Q6, Q7, Q8).
- A11 server-held layout so it cannot be read in the browser (UC03-Q2). A10 points in UC09 (UC03-Q3, Q4). C interruption (UC03-Q9). B1 art (UC03-Q10).

## History

| Date | Change | By |
|---|---|---|
| 2026-11-08 | Created in R2SS. Description: "This one is also mobile friendly. Player will need to open the cards which are face down. So when they click on a card, it will be face up and show what is on the card. Players will need to remember and be able to open all the characters in one row and in the correct order then they will get some points Thank you."; no priority, no acceptance criteria | Vincent |
| 2026-11-08 | ba-agent: NOT READY | ba-agent |
| 2026-11-09 | Description rewritten, priority and acceptance criteria written from the Q&A that Vincent accepted ("accept all") | Claude Code, accepted by Vincent |

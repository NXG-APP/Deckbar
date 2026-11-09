# UC01 - Scan QR to land on Deckbar gaming page - Detail

What the R2SS acceptance criteria leave out: decisions with their reasons and dates, figures, and the old wording.
The criteria themselves live in R2SS PROJ010 (the source of truth); the copy below is as written on 2026-11-09.

| | |
|---|---|
| R2SS name | Scan QR to land on Deckbar gaming page |
| R2SS id | `f12b8e67-fc1e-4ad7-a40e-a171588da288` |
| Working number | UC01 (repository only; R2SS has no numbers) |
| Priority | Must |
| Actors | Customer |
| BA analysis | `docs/ba-analysis/PROJ010_Clarification_QnA_2026-11-08.md` and the source analyses it names |

## Acceptance criteria (copy of R2SS, 2026-11-09)

- AC01 - Scanning the Deckbar QR code opens the landing page in a phone browser held upright.
- AC02 - Signed out, the landing page shows the Deckbar name, one line on what can be won, the three games, two example rewards and a "Register / Log in" button.
- AC03 - Choosing a game while signed out leads to register or log in, then back to that game.
- AC04 - The landing page states it is for guests aged 18 and over and links the privacy notice.
- AC05 - Signed in, the customer lands on their home page (My points and rewards).
- AC06 - Each landing is counted anonymously per day and per QR tag, with no tracking cookies and no third-party analytics.
- AC07 - Every page of a dev or test copy shows a "TEST - not Deckbar" banner.

## Description (R2SS, 2026-11-09)

A visitor scans the Deckbar QR code and lands on the games page, which invites them to register or log in.

## Decisions and detail

- A3 sign in first, as Q015; the signed-out page content (UC01-Q1).
- A12 no presence check at the bar: the QR code is a plain link; protection is at redemption and by the daily points rule (UC01-Q2).
- A17 one code for the whole bar with a fixed tag (e.g. `?src=bar`); printed table cards plus one poster at the counter, the short address under the code; artwork from this project, Deckbar prints and pays (UC01-Q4, Q5).
- A18 pilot on the free host's address with a small print run; decide a domain before any large print run - printed codes cannot change (UC01-Q3).
- A19 dev codes only on a screen during testing, never printed; only the owner makes the production code (`docs/DEPLOYMENT_RUNBOOK.md`; KNOWN_ISSUES #5) (UC01-Q6).
- C counting: anonymous landings per day per tag in the app's own database (UC01-Q10); A20 metrics.

## History

| Date | Change | By |
|---|---|---|
| 2026-11-08 | Created in R2SS. Description: "(empty)"; no priority, no acceptance criteria | Vincent |
| 2026-11-08 | ba-agent: NOT READY | ba-agent |
| 2026-11-09 | Description rewritten, priority and acceptance criteria written from the Q&A that Vincent accepted ("accept all") | Claude Code, accepted by Vincent |

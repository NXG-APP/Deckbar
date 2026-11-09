# UC07 - Admin create more rewards - Detail

What the R2SS acceptance criteria leave out: decisions with their reasons and dates, figures, and the old wording.
The criteria themselves live in R2SS PROJ010 (the source of truth); the copy below is as written on 2026-11-09.

| | |
|---|---|
| R2SS name | Admin create more rewards |
| R2SS id | `51cb8793-edcb-48f4-9055-4b77e2af1acd` |
| Working number | UC07 (repository only; R2SS has no numbers) |
| Priority | Must |
| Actors | Admin |
| BA analysis | `docs/ba-analysis/PROJ010_Clarification_QnA_2026-11-08.md` and the source analyses it names |

## Acceptance criteria (copy of R2SS, 2026-11-09)

- AC01 - Only an admin can create, edit or retire a reward.
- AC02 - A reward has a name, a short description, a points cost (a whole number of at least 1) and a status Draft, Active or Retired; optionally an image (JPG or PNG up to 1 MB), a total stock, a limit per customer, valid dates and valid days and hours (Singapore time).
- AC03 - Customers see a reward as a card in a fixed Deckbar template with its name, text, points and image.
- AC04 - Only an Active reward within its dates, days and hours and in stock can be redeemed.
- AC05 - An edit applies to new redemptions only; a code already shown is honoured until it expires.
- AC06 - A retired reward is hidden from customers and never deleted; each redemption keeps the reward's name and points at that moment.

## Description (R2SS, 2026-11-09)

An admin creates, edits and retires the rewards customers can redeem with points.

## Decisions and detail

- Original description: "Design reward card, set points". B11 = a fixed template plus one image, no free-form designer (ADM-Q7).
- B10 reward fields (ADM-Q5). A15 happy hour = valid days and hours per reward, checked when the code is shown and when it is confirmed; Deckbar supplies the hours (PTS-Q8). B12 edit / retire rules (ADM-Q8).

## History

| Date | Change | By |
|---|---|---|
| 2026-11-08 | Created in R2SS. Description: "Design reward card, set points"; no priority, no acceptance criteria | Vincent |
| 2026-11-08 | ba-agent: NOT READY | ba-agent |
| 2026-11-09 | Description rewritten, priority and acceptance criteria written from the Q&A that Vincent accepted ("accept all") | Claude Code, accepted by Vincent |

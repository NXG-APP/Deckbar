# UC08 - Reg account - Detail

What the R2SS acceptance criteria leave out: decisions with their reasons and dates, figures, and the old wording.
The criteria themselves live in R2SS PROJ010 (the source of truth); the copy below is as written on 2026-11-09.

| | |
|---|---|
| R2SS name | Reg account |
| R2SS id | `8db37376-affc-438a-be32-41fdfe47536d` |
| Working number | UC08 (repository only; R2SS has no numbers) |
| Priority | Must |
| Actors | Customer |
| BA analysis | `docs/ba-analysis/PROJ010_Clarification_QnA_2026-11-08.md` and the source analyses it names |

## Acceptance criteria (copy of R2SS, 2026-11-09)

- AC01 - A customer registers and logs in with a Google account or with a one-time sign-in link sent by email.
- AC02 - Registration requires a name and a mobile number, checked for format (8 digits for Singapore; other countries with a country code).
- AC03 - One account per mobile number; a number already registered is refused with "This number is already registered - ask the staff".
- AC04 - Registration requires ticking "I am 18 or older" and accepting the terms and the privacy notice.
- AC05 - Promotions consent is optional and unticked, one tick per channel (SMS, WhatsApp, email); each tick is stored with its time and wording version and can be withdrawn in the profile.
- AC06 - The customer stays signed in on that browser for 90 days and can log out from the profile menu.
- AC07 - The customer can ask from the profile to delete their account; it is completed within 30 days, erasing their personal details.
- AC08 - An account with no sign-in for 24 months is deleted after one reminder.

## Description (R2SS, 2026-11-09)

A visitor registers with Google or an emailed sign-in link, gives their name and mobile number and consents, then logs in and out.

## Decisions and detail

- Original description: Google, email, or username + password; each needs a mobile number and consent.
- A4 username + password left out of the MVP (no forgotten-password flow); revisit after the pilot (UC08-Q1). A5 no SMS check - SMS costs money (UC08-Q2, Q3).
- A6 consent design (UC08-Q4, Q6). A7 Deckbar is the responsible organisation; anonymous points history kept on deletion (UC08-Q5, Q7, Q8). A8 wording checked by someone qualified in Singapore law before the first real customer. A9 90 days (UC08-Q10; UC01-Q8 said 30 - the Q&A chose 90).

## History

| Date | Change | By |
|---|---|---|
| 2026-11-08 | Created in R2SS. Description: "By google account. / By email / By username + password. / Whichever option requires mobile no. and consent"; no priority, no acceptance criteria | Vincent |
| 2026-11-08 | ba-agent: NOT READY | ba-agent |
| 2026-11-09 | Description rewritten, priority and acceptance criteria written from the Q&A that Vincent accepted ("accept all") | Claude Code, accepted by Vincent |

# BA Analysis - Points and rewards core, and the end-to-end flow (2026-11-08)

**Scope:** the chain from QR scan to a redeemed benefit (R2SS PROJ010 Q008, Q015, Q083, Q001, Q013), the
points-and-rewards core that no use case covers, and anti-abuse. **Sources read:** R2SS PROJ010 snapshot of
2026-11-08 (UC01-UC08 in R2SS list order; no ACs anywhere), `CLAUDE.md`, `WORKFLOW.md`, `docs/MASTER_PLAN.md`
(sections 3-4), `docs/KNOWN_ISSUES.md`. No code, no `docs/ARCHITECTURE.md`, no spec yet: dependencies and edge
cases below are about what the requirements assume.

## Verdict: NOT READY

No use case covers earning, seeing or redeeming points; UC01-UC08 have no actors (UC05), priority or acceptance
criteria; Q015 stops at "after they play they will"; and the core decisions (points rules, how staff verify a
redemption, one account per person, birthday date, marketing consent, SMS spend) are all on the `CLAUDE.md`
ask-first list. Nothing in this area can be planned until PTS-Q1 to PTS-Q5 are answered.

## 1. Acceptance criteria

- **G1** - Every use case: acceptance criteria empty (snapshot, "Use cases" header). MASTER_PLAN A1 already open.
- **G2** - Points amounts are not stated: UC02 "win some ponts", UC03 "get some points", UC04 "gain points". A
  testable AC needs a number per win and what a loss gives (0?).
- **G3** - UC07 "Design reward card, set points" gives a reward a price, but no AC says what a customer can do with
  it, or what "design" means (image upload? text and colour?).
- **G4** - UC06 lists "Total points, used, remain" and "Redeemed rewards" - the only written trace of a points
  ledger and of redemption; neither has an owning use case or AC.
- **G5** - Untestable as written: UC04 "make it look real" (MASTER_PLAN B3), Q008 "proactive approach campaign".

## 2. The chain UC01 to UC08, step by step

| Step (Q008 / Q015) | Covered by | Gap |
|---|---|---|
| 1. Scan the QR code | UC01 (description empty) | One code for the bar or one per table? Address stable across dev/prod (KNOWN_ISSUES #5) |
| 2. Log in or register | UC08 (register only) | No "log in" for a returning customer, no password reset, no log out. Three sign-in methods vs Q011. Phone number not verified (A4). No admin or staff login at all (snapshot line 17) |
| 3. Pick a game | none | Q015 step 3: no game list / home screen use case; where the balance is shown |
| 4. Play | UC02, UC03, UC04 | Win rules only partly given (B1-B3); who decides a win - the phone or the server |
| 5. Earn points | none | No points rules, caps or ledger (**new UC09**) |
| 6. See balance and history | none (admin side only, UC06) | Customer view of balance, history, what is affordable (**new UC10**) |
| 7. Choose a reward | UC07 creates rewards | No customer-facing catalogue (in UC10) |
| 8. Redeem at the bar | none | How staff verify, one-time, expiry, points deducted when (**new UC11**) |
| 9. Staff confirm | none | "Staff" is not an actor - Q010 lists only Customer and Admin; Q036 roles unanswered (**new UC12**) |
| 10. Birthday gift | none (Q083) | UC08 asks only "mobile no. and consent": no date of birth (**new UC13**) |
| 11. Happy-hour drink set | none (Q083) | No time window on a reward; Q006 opening hours 4pm-2am cross midnight |
| 12. Promotion campaigns | none (Q008, Q013) | Channel, consent, Do Not Call rules, cost (**new UC14**) |
| 13. Success measured | UC05, UC06 partly | Q001 "1,000 customer info" countable; "sale increase" needs Deckbar's own sales figures - nothing links them |

Also: **G6** - UC05 "Admin view registered user" (no actor, no description) overlaps UC06 "Basic customer details";
merge, or make UC05 the list and UC06 the per-customer engagement. **G7** - UC06 shows "gg account", which assumes
Google sign-in, while UC08 offers three methods.

## 3. Conflicts not reconciled

- **C1** - Q011 "try not to over-engineer it" vs UC08 three sign-in methods (Google, email, username + password),
  UC04 "physics engine", Q013 three notification channels. Propose one sign-in method for the MVP (A4).
- **C2** - Q015 step 2 puts registration before any play; Q001 counts registrations. A points system with nothing
  to see before signing up may still be right (it is the data capture) - confirm it is intended, not a side effect.
- **C3** - UC08 "username + password" gives no channel for a password reset; Q008's minimum is name + phone.
- **C4** - MASTER_PLAN section 3 puts the ledger and redemption in P5 after the first game (P4), but P4 "end to
  end with points" needs the ledger rules of UC09 first. Either move UC09 into P4 or define P4 without points.
- **C5** - KNOWN_ISSUES #1: reward costs and Deckbar's commercial terms must not be committed; the points prices
  of rewards will live in the database (set in UC07), never in specs or seed files.

## 4. Dependencies assumed but not existing

- **D1** - A server-side store for accounts, ledger and redemptions: stack and hosting not chosen (A6, Q050-Q054).
- **D2** - A staff role and staff sign-in, and an admin sign-in (none specified; Q036).
- **D3** - The reward catalogue (UC07) before any redemption; rewards need an active / inactive state and possibly stock.
- **D4** - A trusted clock in Singapore time (UTC+8) for caps, happy hour and birthdays - the phone's clock cannot be trusted.
- **D5** - Deckbar's sales figures and a pre-launch baseline for Q001 item 2 (outside the system; Deckbar must agree to share them).
- **D6** - A message provider for campaigns (SMS is paid; free email tiers have monthly limits) and a Do Not Call check process for Singapore numbers.
- **D7** - The organisation responsible for the data under Singapore's PDPA (Deckbar) and its contact for requests (A5, Q035-Q042).

## 5. Edge cases, failure modes and anti-abuse

- **E1 Forged wins** - the games run in the browser, so a "won" result can be sent without playing. Server-issued
  round ID, one result per round, a minimum play time, a daily cap. Residual risk accepted only if rewards are low value.
- **E2 Replay, refresh, two tabs, two phones** - each round ID scores once; two redemptions in flight on one account
  must not both succeed; the balance can never go negative.
- **E3 One person, many accounts** - phone numbers are not verified (A4), Google and email accounts are free. Caps
  per account are bypassed by a second account. Control at the bar instead: staff see the name on the account,
  one redemption per account per business day; SMS verification only if the owner accepts its cost.
- **E4 Playing from home** - nothing in R2SS says presence is required. Geolocation (permission prompt, poor indoors,
  more personal data) and bar Wi-Fi checks are fragile. Simplest: earn anywhere within the daily cap, redeem only
  at the bar with staff.
- **E5 Staff abuse** - staff confirming rewards for friends or without serving. Each staff member has their own
  sign-in or PIN; each confirmation logs staff, time, customer and reward; admin sees the log (extends UC06).
- **E6 Reused or screenshotted code** - the redemption code is one-time, server-checked, expires in minutes; a
  screenshot of a used code shows "already used" to staff.
- **E7 Weak bar Wi-Fi** - redemption needs the server; a failed confirm must not deduct points twice or lose them.
- **E8 Business day** - 4pm-2am crosses midnight: a "per day" cap reset at 00:00 lets a 23:59 and 00:01 play count
  twice in one visit. Use a business day that turns at 06:00 Singapore time.
- **E9 Birthday abuse** - an editable date of birth gives a gift every month; a date entered the day before the
  claim; one gift per account per year; staff may look at an ID card but must not record its number (PDPA).
- **E10 Changes under a saving customer** - admin re-prices or deletes a reward; points expiry; account deletion
  (Q042) with an unconfirmed code; an issued code for a happy-hour reward confirmed after happy hour ends.

## 6. Non-functional

- Every screen above (balance, rewards, redeem code, staff confirm) on a phone held upright, one thumb, readable
  in a dim bar; the staff screen too. English text (CLAUDE.md, MASTER_PLAN B4).
- Personal data: date of birth only if UC13 is kept (day and month are enough); marketing consent separate from
  the terms and not pre-ticked (PDPA); Do Not Call rules before any SMS or call (A5).
- Cost: $0 on free plans; SMS verification or SMS campaigns are spend - owner's decision first.
- Public repository: no reward prices, no Deckbar commercial terms, test data only (`+65 0xxx xxxx`, example.com).

## 7. Scope - proposed new use cases (working numbers; R2SS names are the owner's)

| # | Proposed name | Covers | Phase |
|---|---|---|---|
| UC09 | Earn points from a game | Points per win per game, caps per business day, one result per round, expiry | P4 |
| UC10 | My points and rewards | Balance, history (earned, spent), reward catalogue showing what is affordable | P5 |
| UC11 | Redeem a reward at the bar | One-time code on the customer's phone, staff confirm, points deducted on confirm, expiry, happy-hour window check | P5 |
| UC12 | Staff and admin sign-in | Roles (customer, staff, admin), staff confirm only, admin manages staff, redemption log | P5 |
| UC13 | Birthday gift | Optional day and month of birth, gift window, once a year | Later |
| UC14 | Promotion campaigns | Consent check, channel, Do Not Call, unsubscribe | P7 |

Folded into existing use cases rather than new ones (Q011): happy-hour rewards become a "valid days and hours"
setting on a reward in UC07; the success metrics become counts in UC06 (registrations with consent, redemptions
per business day) plus Deckbar's own sales comparison outside the app. UC08 gains "log in" and "log out".

## Top three risks

1. **Free drinks farmed** - unverified accounts, browser-decided wins and no presence check together let anyone
   collect rewards from home with many accounts; Deckbar pays in real drinks and loses trust in the app (E1-E4).
2. **Personal data and marketing without valid consent** - Q008's purpose is promotion to collected contacts; PDPA
   consent, Do Not Call rules, birthdays and retention are undecided, and the repository is public (A5, KNOWN_ISSUES #1).
3. **The second success metric cannot be shown** - "observe sale increase" (Q001) has no data path; without a
   baseline from Deckbar the project cannot prove its value, and the requirements may drift towards a till integration that Q011 rules out.

## Clarification questions

| # | Question | Why it matters | Recommended answer (a concrete default the owner can simply accept) | STOP-AND-CONFIRM |
|---|---|---|---|---|
| PTS-Q1 | What do the points rules look like - points per game, caps, expiry? | UC02-UC04 say only "some points"; without caps rewards are farmed by replaying (E1, E8) | A win scores 10 points (bottle flip 15), a loss 0; at most 3 scoring wins per game per business day (06:00-05:59 Singapore time); points do not expire in the MVP | yes - scope, anti-cheat model |
| PTS-Q2 | How does staff verify a redemption at the bar? | Rewards are real drinks; a screenshot or a reused code must not work (E6, E7) | Customer taps Redeem; the phone shows reward, customer name and a one-time 6-digit code valid 10 minutes; staff enter their own 4-digit PIN on that phone to confirm; points are deducted on confirm; an expired code returns nothing to deduct | yes - security model |
| PTS-Q3 | Must the customer be at Deckbar to earn, or only to redeem? | Q005 wants visits and sales; presence checks add data and fragility (E4) | Earn anywhere within the daily cap; redeem only at the bar through staff; no location check | yes - scope, security model |
| PTS-Q4 | How is one person kept to one account? | Caps and birthday gifts are worthless if accounts are free (E3) | One account per phone number, not verified by SMS in the MVP (no spend); one redemption per account per business day; staff can refuse when the name does not match | yes - login, spend |
| PTS-Q5 | Who are the staff, and what may they do? | Q010 has no staff actor; staff abuse (E5) | A Staff role separate from Admin: staff can only confirm redemptions with a personal PIN; admin creates and removes staff; every confirmation is logged and shown in UC06 | yes - security model, roles |
| PTS-Q6 | Confirm Q015's missing end: "after they play they will ..."? | The whole chain is inferred from Q008 | "... earn points, see their balance and the rewards, and redeem a reward at the bar by showing their phone to staff" | yes - scope |
| PTS-Q7 | Are the proposed new use cases UC09-UC14 (section 7) accepted, and which are in the MVP? | No AC can be written for a use case that does not exist | Add UC09-UC12 to the MVP; UC13 and UC14 later; happy hour as a setting in UC07; metrics in UC06 | yes - scope |
| PTS-Q8 | Happy-hour rewards: which hours, and checked when? | Q083 names them; a code issued at 6:58 confirmed at 7:05 (E10) | Admin sets valid days and hours (Singapore time) per reward in UC07; the server checks at issue and at confirm; hours supplied by Deckbar | yes - scope |
| PTS-Q9 | Birthday gift: in the MVP, and what is collected? | Date of birth is personal data not in UC08 (E9) | Later phase; when added, optional day and month only, set once, gift claimable once a year in the birthday month; staff never record an ID number | yes - personal data |
| PTS-Q10 | Marketing consent and the first campaign channel? | Q008's purpose; PDPA consent and Do Not Call rules; SMS costs money | A separate, unticked marketing consent box at registration; campaigns (UC14) later, by email first; no SMS until the owner approves the spend and a Do Not Call check | yes - personal data, spend |
| PTS-Q11 | Who at Deckbar is responsible for the data, how long is it kept, and how is it deleted? | PDPA; Q035-Q042 unanswered; nothing personal may enter the public repository | Deckbar is the responsible organisation and names a data contact; inactive accounts deleted after 24 months; a customer can ask for deletion, which also cancels their points | yes - personal data, deleting data |
| PTS-Q12 | How is "sale increase" (Q001) measured? | Without a data path the second goal cannot be shown (risk 3) | No till integration; the app reports registrations, active players and redemptions per business day; Deckbar compares its own monthly sales with the 3 months before launch | yes - scope, contact with Deckbar |

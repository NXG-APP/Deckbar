# PROJ010 Deckbar Games — Clarification Q&A (2026-11-08)

The ba-agent pass on all 8 R2SS use cases (snapshot 2026-11-08) gave **NOT READY** for every one: none has a
priority, acceptance criteria or logic flow yet. The 7 analyses asked 72 questions; this file merges them into
**33 decisions**, each with one recommended answer. Where the analyses disagreed, the conflict and the choice
made are in the last section.

**How to answer:** reply "accept all", or "accept all except A4: ..., B6: ...". Your answers then go, in one
change, into R2SS (each use case's numbered AC; new use cases only with your OK) and into
`docs/specs/use-cases/UCxx_<name>_Detail.md`.

Working numbers UC01-UC08 follow the R2SS list order (R2SS names are unchanged): UC01 QR landing · UC02 Darts ·
UC03 Memory card · UC04 Bottle flip · UC05 Admin view registered user · UC06 Admin view engagement · UC07 Admin
create rewards · UC08 Register account.

Sources (each holds the full reasoning): `UC01_QR_Landing_…`, `UC02_Dart_Game_…`, `UC03_Memory_Card_…`,
`UC04_Bottle_Flip_…`, `UC08_Registration_Login_…`, `Admin_Back_Office_…`, `Points_Rewards_Flow_…` (all
`_BA_Analysis_2026-11-08.md` in this folder).

---

## A. Decisions that shape the whole app (all on the ask-first list)

### Scope and flow

| # | Question | Recommended answer | From |
|---|---|---|---|
| A1 | Q015 stops at "after they play they will ..." - what is the end? | "... earn points, see their balance and the rewards, and redeem a reward at the bar by showing their phone to staff." | PTS-Q6 |
| A2 | Add the missing use cases, and what is in the MVP? | Add **UC09 Earn points from a game** (one rule for all three games), **UC10 My points and rewards**, **UC11 Redeem a reward at the bar**, **UC12 Staff and admin sign-in** - all MVP. Later: UC13 Birthday gift, UC14 Promotion campaigns. Merge UC05 into UC06 ("Admin view customers and engagement"). Happy hour becomes a setting of UC07 | PTS-Q7, ADM-Q3, UC01-Q7 |
| A3 | Sign in before playing, or play first? | Sign in first, as Q015 says. Signed out, the landing page shows the logo, one line of what you can win, the three games and two example rewards, and a "Register / Log in" button | UC01-Q1, UC02-Q4, UC03-Q5, UC08-Q9 |

### Accounts and personal data

| # | Question | Recommended answer | From |
|---|---|---|---|
| A4 | Which sign-in methods in the MVP? | Two, from one free sign-in provider: **Google** and an **emailed one-time sign-in link**. No username + password in the MVP (so no forgotten-password flow) | UC08-Q1 |
| A5 | Is the mobile number checked by SMS code? One account per number? | No SMS code in the MVP (no spend); the number is format-checked (8 digits for Singapore, other countries with a country code) and **unique**: "this number is already registered - ask the staff"; an admin can release it | UC08-Q2, UC08-Q3, PTS-Q4 |
| A6 | What do customers tick at registration? | Required: "I am 18 or older", and the terms and privacy notice. Optional and unticked: promotions from Deckbar, one tick per channel (SMS, WhatsApp, email). Each tick is stored with its time and the wording's version; unsubscribe from the profile | UC08-Q4, UC08-Q6, UC01-Q9, PTS-Q10 |
| A7 | Who is responsible for the data, how long is it kept, how is it deleted? | Deckbar is the organisation named in the privacy notice, with a contact for data requests. Accounts with no sign-in for 24 months are deleted after one reminder. "Delete my account" in the profile, done by an admin within 30 days (personal details erased, anonymous points history kept) | UC08-Q5, Q7, Q8, PTS-Q11 |
| A8 | Legal check before the first real customer? | Yes. You have the consent wording, privacy notice, alcohol-reward promotion, age rule and prize-game question checked by someone qualified in Singapore law before the pilot. The games can be built on dev before that, not launched | UC08-Q5, UC02-Q10, UC04-Q5 |
| A9 | How long does a customer stay signed in? | 90 days on that phone's browser; "Log out" in the profile menu | UC01-Q8, UC08-Q10 |

### Points, rewards and fairness

| # | Question | Recommended answer | From |
|---|---|---|---|
| A10 | Points per game, limits, expiry? | A win earns **10 points** in every game (a setting the admin can change); a loss 0. Points only for the **first win per game per business day** (so at most 30 a day); unlimited practice games after that, marked "no points". A business day runs **06:00-05:59 Singapore time**, so a night past midnight is one day. Points do not expire in the MVP | PTS-Q1, UC02-Q3, Q5, UC03-Q3, Q4, UC04-Q1, Q2 |
| A11 | Who decides a win - the server or the phone? | The **server**. It starts each game with a one-time ticket, holds the layout or rules, checks the result is plausible, and alone writes the points, once per ticket. Bottle flip: the phone simulates the physics and the server checks it (try count, timing, one game at a time). The remaining risk is logged in KNOWN_ISSUES and capped by A10 | UC02-Q2, UC03-Q2, UC04-Q3 |
| A12 | Must the customer be at Deckbar? | Earn points anywhere (within A10); **redeem only at the bar**, confirmed by staff. No location check | PTS-Q3, UC01-Q2 |
| A13 | How is a reward redeemed? | The customer taps Redeem at the bar; the phone shows the reward, their first name and a **one-time code valid 10 minutes**. A staff member enters or scans it in **their own signed-in staff screen**; points are deducted on that confirmation; one confirmation per code; at most one redemption per account per business day; staff check ID for a drink reward | PTS-Q2, ADM-Q4, UC02-Q10 |
| A14 | Who are the admins and staff? | Two roles. **Manager**: customers, engagement, rewards, the staff list. **Staff**: confirm redemptions only, sees first name and reward, never phone numbers. Sign-in with Google for a short list of named accounts (kept in the host's settings, never in git); to start, you and one Deckbar manager; no shared accounts; every confirmation logged | ADM-Q1, ADM-Q2, PTS-Q5 |
| A15 | Happy-hour rewards? | Each reward can have valid days and hours (Singapore time), set by a manager in UC07 and checked when the code is issued and when it is confirmed. Deckbar supplies the hours | PTS-Q8 |
| A16 | Birthday gift and campaigns - in the MVP? | Later. Birthday gift (UC13): optional day and month only, set once, claimable once a year in the birthday month. Campaigns and exporting the customer list (UC14): decided then - managers only, consenting customers only, every export logged, email first, no SMS until you approve the cost | PTS-Q9, ADM-Q6, ADM-Q9, PTS-Q10 |

### QR code, launch and measuring success

| # | Question | Recommended answer | From |
|---|---|---|---|
| A17 | One QR code or one per table; printed or on a screen? | One code for the whole bar, with a fixed tag so scans can be counted apart from shared links. Printed table cards plus one poster at the counter, with the short address under the code. Artwork from this project; Deckbar prints and pays | UC01-Q4, UC01-Q5 |
| A18 | Which address does the printed code open? | Pilot on the free host's address with a small print run; decide whether to buy a domain before any large print run (printed codes cannot change) | UC01-Q3 |
| A19 | How are dev and production kept apart? | Dev codes only on a screen during testing, never printed; every dev page carries a "TEST - not Deckbar" banner; only you make the production code (`docs/DEPLOYMENT_RUNBOOK.md`) | UC01-Q6 |
| A20 | How is "sales increase" (Q001) shown? | No till integration. The app counts landings (anonymously), registrations with consent, active players and redemptions per business day; Deckbar compares its own monthly sales with the 3 months before launch | PTS-Q12, UC01-Q10 |

---

## B. The games, the admin side and the brand

| # | Question | Recommended answer | From |
|---|---|---|---|
| B1 | Brand: Deckbar's logo and colours? | You ask Deckbar for its logo, colours and consent; until then plain text "Deckbar" and simple shapes drawn in code; free-licence font; no paid art; sound optional, off by default | UC02-Q9, UC03-Q10 |
| B2 | Darts: what are "all characters of Deckbar"? | The 7 letters **D-E-C-K-B-A-R**, hit in any order; a hit letter lights up and stays lit | UC02-Q1 |
| B3 | Darts: board, darts and aiming with one thumb? | A round board with the 7 letters in a ring, turning slowly; **10 darts**. Hold a thumb on the lower half: a crosshair appears above it and drifts gently; drag to aim, release to throw. Win when all 7 are lit; lose when the darts run out | UC02-Q6 |
| B4 | Darts: how hard? | Playtest with at least 5 adults new to it: at least half win within their first 3 games, and nobody wins all of 5. Ring size, drift and speed are settings | UC02-Q7 |
| B5 | Memory card: pairs, or a sequence? | **Sequence**: tap D-E-C-K-B-A-R in order; a right card stays face up; a wrong card shows for 1 second, then all close and the run restarts from D. The word DECKBAR is shown above the grid. No pairs mode | UC03-Q1 |
| B6 | Memory card: cards, grid, preview, limit? | 12 cards in 3 columns x 4 rows: the 7 letters plus 5 decoys (pint, bottle, glass, star, heart); one card back with the Deckbar name; no preview; **60 seconds**, unlimited mistakes; time up = a loss | UC03-Q6, Q7, Q8 |
| B7 | Bottle flip: Guinness or a plain bottle? | A plain dark-brown bottle, no brand name, no label that looks like Guinness; "Guinness" nowhere in the game. Revisit only with Deckbar's written permission from the brand | UC04-Q4 |
| B8 | Bottle flip: "physics engine, look real" - 2D or 3D? | **2D** physics with a free open-source library; shaded drawn art; the arc, spin, bounce and tipping come from the simulation. No 3D (Q011, low-end phones) | UC04-Q6 |
| B9 | Bottle flip: how hard? | A typical player lands about 1 throw in 5 (about 1 game in 3 reaches 3 of 10), measured before the pilot and retuned from pilot data | UC04-Q7 |
| B10 | Reward fields | Name, short description, image, points cost (whole number, at least 1), optional total stock, optional limit per customer, optional valid dates and daily hours (A15), all Singapore time; status Draft / Active / Retired | ADM-Q5 |
| B11 | "Design reward card"? | A fixed card template in Deckbar's colours, filled with name, text and points; one optional image (JPG or PNG, up to 1 MB); no free-form designer | ADM-Q7 |
| B12 | Editing or retiring a reward customers already have? | Changes apply to new redemptions only; a code already shown is honoured until it expires; Retired hides it and is never deleted; each redemption keeps the reward's name and price at that moment | ADM-Q8 |
| B13 | Admin screens: device, search, audit? | Phone held upright first (staff at the bar), also usable on a computer; search by name or the last 4 digits of the phone; filter by registration date and consent; an audit log of sign-ins, reward changes, redemption confirmations and exports, kept 12 months, visible to managers | ADM-Q10 |

---

## C. Defaults applied unless you object (no decision needed)

- **Darts interrupted** (a call, a locked screen): the game pauses and resumes. A refresh starts a new game, which is harmless with A10. The result is resent with the same ticket until it is saved (UC02-Q8).
- **Memory card interrupted:** no resume. An unfinished game is a loss when its 60 seconds run out, and a new game gets a new layout. A win the server accepted stands (UC03-Q9).
- **Bottle flip interrupted:** reopening within 10 minutes resumes at the next try. After that the game closes with the tries made. A throw in flight does not count (UC04-Q10).
- **Bottle flip throw:** swipe up in the lower half of the screen; speed sets the strength and angle sets the direction. The hand is 2.0 m from the table edge. A bottle "stands" when it is upright, tilted under 10°, and still for 2 seconds. The verdict shows within 3 seconds (UC04-Q8, Q9).
- **Counting visits:** anonymous landings per day per tag, in the app's own database. No third-party analytics and no tracking cookies (UC01-Q10).

---

## Conflicts between the analyses, and the choice made

| Topic | Analyses said | Chosen | Why |
|---|---|---|---|
| Business-day reset | 06:00 (UC02, UC03, PTS) vs 12:00 (UC04) | 06:00 | The bar opens 4 pm to 2 am (Q006); 06:00 keeps one night as one day, the same in every game |
| Points per win | 10 (UC02, UC03, UC04) vs 15 for bottle flip (PTS) | 10 everywhere | One rule (UC09); the admin can change it per game later |
| Points-earning wins per day | first win per game (UC02, UC03) vs 3 per game (PTS) vs 1 game (UC04) | first win per game | The smallest farming surface; at most 30 points a day |
| Staying signed in | 30 days (UC01) vs 90 days (UC08) | 90 days | Regulars return weekly or monthly; staff check at redemption limits the risk |
| Redemption confirm | staff PIN typed on the customer's phone (PTS) vs staff's own signed-in screen (ADM) | staff's own screen | A PIN typed on a customer's phone can be watched and reused; the staff screen also gives the log |

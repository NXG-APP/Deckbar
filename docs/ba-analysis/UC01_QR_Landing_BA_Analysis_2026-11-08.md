# UC01 "Scan QR to land on Deckbar gaming page" - BA analysis, 2026-11-08

**Verdict: NOT READY.** The use case has no description, no priority and no acceptance criteria, and every expansion
field is empty (R2SS PROJ010 snapshot 2026-11-08, "Use cases"). The only requirement text is in the main bank: Q008
("scan a URL ... from the URL they should be able to log in") and Q015 steps 1-2 ("scan a URL and land on a landing
page ... required to either log in or to register"). Nothing can be tested yet. No spec, code or `docs/ARCHITECTURE.md`
exists, so the dependency and edge-case checks below are about what the requirements assume.

Source checked: R2SS snapshot (UC01-UC08, Q001-Q109 as copied); `CLAUDE.md`; `WORKFLOW.md`; `docs/MASTER_PLAN.md`;
`docs/KNOWN_ISSUES.md`; `docs/DEPLOYMENT_RUNBOOK.md`. Registration methods are left to the UC08 check.

## 1. Acceptance criteria - missing

R2SS UC01 has none. A numbered list (`AC01 - ...`, `CLAUDE.md` "Standing rules") needs at least, each testable:

- What a visitor sees before login (branding, the games, the rewards, the log in / register buttons) - verified by opening the address on a phone held upright, signed out.
- Whether anything can be used without an account (Q015 says login is required; nothing says what is visible first).
- What a signed-in customer sees (game list? points balance? rewards?) and where a returning customer lands.
- Which address the QR code opens, and that the code scans and opens it on common phone cameras (iPhone and Android).
- How long a customer stays signed in, and that log out exists.
- A page-weight or load-time target on a weak connection (bar Wi-Fi, mobile data) - "fast" is not testable.
- That the production QR code opens production and never dev (KNOWN_ISSUES #5).

## 2. Conflicts and unreconciled points

- **"Scan a URL" vs "Scan QR"**: Q008 and Q015 say URL, the UC name says QR. Whether a typed short address is also offered (for a camera that fails) is not said.
- **Login wall vs attracting people**: Q015 step 2 requires log in or register on the landing page; Q083 wants to "attract people with the games". Whether a visitor may see the games and rewards first is not reconciled.
- **`docs/MASTER_PLAN.md` section 4 A1** says "the 4 use cases"; the snapshot has 8 (UC01-UC08). A1 needs correcting.
- **`docs/MASTER_PLAN.md` section 3**: P2 ("an empty page reachable from a test QR code") and P3 ("landing page, register and log in") split UC01 across two phases; P3 also bundles UC08. Fine, but UC01's AC must say which part each phase delivers.
- **Admin entry**: UC05-UC07 are admin screens with no admin-login use case (snapshot line 17). Whether the admin enters from the same landing page is not said.
- **PROJ003 rules that do not apply here**: the six-language rule, host/guest online roles and map sizes are Dark Maze rules; Deckbar's standing rule is English only until Vincent decides (`CLAUDE.md`; MASTER_PLAN B4).

## 3. Dependencies assumed but unverified

| Assumed | State today |
|---|---|
| Log in / register (UC08) - the landing page's main action | UC08 not ready: no AC; methods (Google, email, username + password) and consent undefined |
| A list of games to show after login (UC02-UC04) | No AC; UC04 open on brand and physics (MASTER_PLAN B3) |
| A points balance and rewards to show | No use case for the customer's balance or for redeeming (snapshot line 17); UC07 is admin-side only |
| A stable public address for the printed code | No hosting, domain or environments chosen (Q050-Q054, Q109; MASTER_PLAN A6); `docs/DEPLOYMENT_RUNBOOK.md` dev and production rows are `{{FILL}}` |
| Deckbar's logo, colours and wording | Design unanswered (Q088-Q091; MASTER_PLAN B5); who signs off unknown |
| A privacy notice to link from the page | Personal-data questions unanswered (Q035, Q038, Q041, Q042; MASTER_PLAN A5) |
| Someone at Deckbar to print and place the codes | Not agreed; contacting the client is the owner's step |

## 4. Edge cases and failure modes

- **The link is just a link**: a photo or forward of the QR code lets anyone register and play from home. Points farming and fake registrations inflate the 1,000-customer metric (Q001). Whether presence at the bar is checked is a security-model decision (Q3 below).
- **Printed codes cannot be changed**: if the hosting address moves (a free host's subdomain, a later domain), every printed code is dead. The address must be fixed before the first large print run.
- **Dev code printed by mistake**: real customers' details land in the dev database (KNOWN_ISSUES #5). Dev and production codes and pages must be told apart at a glance.
- **In-app browsers**: some QR-scanner apps and chat apps open links in their own embedded browser; Google sign-in refuses embedded browsers. Connects to UC08's Google option - the landing page may need an "open in your browser" hint.
- **Returning visitor**: already signed in -> skip the landing page? Signed in on a phone lent to a friend -> the friend plays on the owner's account.
- **Outside opening hours (4pm-2am, Q006)**: page available or not? Points earned at home?
- **Weak connection**: a heavy landing page (large images, a game engine loaded up front, e.g. UC04's physics) fails on bar Wi-Fi. Games should load only when chosen.
- **Per-table codes**: a table tag in the address can be edited by hand; any table-based feature must not trust it.
- **Alcohol rewards**: rewards are drinks (Q083); the audience is 25-60 (Q007) but nothing stops a minor scanning. Age wording on the page is undecided.

## 5. Non-functional

- Phone browser held upright, one thumb (`CLAUDE.md`; Q009): no layout stated yet.
- Low-end phone and weak connection: no target stated (see section 1).
- Personal data: the landing page itself collects none if visit counts are anonymous; a privacy notice link is still needed before UC08 collects any (A5; Singapore PDPA).
- Cost: QR codes can be made with free tools; a domain is paid (ask first); printing is Deckbar's or the owner's cost - not agreed.
- Text: English (assumption, B4). No invisible Unicode in committed text.

## 6. Scope size

UC01 bundles three concerns. Proposed split:
1. **UC01 - landing page** (signed out): what is shown, the way into UC08, privacy link, load target.
2. **Customer home** (signed in): game list, points balance, rewards - depends on a points use case that does not exist yet; better as its own use case or part of the points/rewards one (MASTER_PLAN P5).
3. **QR code production and placement** (one or per table, printed or on screen, dev vs production): mostly an operating procedure - belongs in `docs/DEPLOYMENT_RUNBOOK.md` plus one AC in UC01 ("the production code opens the production address").

Against Q011: one code for the whole bar, no location check, no per-table tracking is the simplest option that meets Q008.

## 7. Owner decisions (STOP-AND-CONFIRM)

Scope of what is visible before login (scope); per-table codes (scope, data); presence check (security model);
domain and address (spend, plan risk); printing and placement with Deckbar (external contact, spend); dev vs
production codes (deploying to production); signed-in duration (security model); age and privacy wording
(personal data). See the questions below.

## Top three risks

1. **A printed code that points at the wrong or a temporary address** - dead codes after a host change, or real customers' data in dev (KNOWN_ISSUES #5). Costly to undo once printed and placed in the bar.
2. **The code is a shareable link with no presence or anti-farming rule** - remote sign-ups and replayed games give free drinks away and make the 1,000-customer metric (Q001) unreliable.
3. **Drop-off at the landing page** - a login wall before anything is shown, a slow page on bar Wi-Fi, or Google sign-in failing inside an in-app browser loses customers before they register, which is the project's main goal.

## Clarification questions

| # | Question | Why it matters | Recommended answer (a concrete default the owner can simply accept) | STOP-AND-CONFIRM |
|---|---|---|---|---|
| UC01-Q1 | Before logging in, what may a visitor see or do? | Q015 requires login first; Q083 wants to attract people; drives AC and drop-off | Signed out: Deckbar logo, one line of what you win, the three games and two example rewards as pictures, a "Register / Log in" button. Playing any game requires an account, as Q015 | yes (scope) |
| UC01-Q2 | Must the app check that the customer is at Deckbar (location, a code that changes on a screen) before points count? | The link can be shared; free drinks can be farmed (MASTER_PLAN A3) | No presence check in the MVP. The QR code is a plain link; protection is at redemption (staff confirm at the bar) and by daily point limits decided in the points use case | yes (security model) |
| UC01-Q3 | Which permanent address does the printed code open: the free host's own address, or a domain bought for it? | Printed codes cannot be changed; a domain is spend | Pilot on the free host's address with a small print run only (a few table cards); decide a domain before any large print run | yes (spend, plan risk) |
| UC01-Q4 | One code for the whole bar, or one per table? | Per table adds tracking and data for little MVP value (Q011) | One code for the whole bar, carrying a fixed tag (for example `?src=bar`) so visits from the code can be counted apart from shared links | yes (scope) |
| UC01-Q5 | Printed or on a screen, where, and who at Deckbar prints and pays? | Placement decides how many scans happen; needs the client | Printed table cards on every table plus one poster at the bar counter, the short address printed under the code; artwork from this project, printing by Deckbar at its cost, agreed by the owner with the client | yes (external contact, spend) |
| UC01-Q6 | How are dev and production codes kept apart? | KNOWN_ISSUES #5: a dev code in the bar sends real data to dev | Dev code is only ever shown on a screen during testing, never printed; every dev page shows a "TEST - not Deckbar" banner; only the owner makes the production code, following `docs/DEPLOYMENT_RUNBOOK.md` | yes (production) |
| UC01-Q7 | After login, what does the customer's home page show? | Needs a points/rewards use case that does not exist | Greeting by first name, points balance, the three games, rewards with their point cost, a log out link; added as a new use case "Customer home and points", UC01 covers only the signed-out page | yes (scope) |
| UC01-Q8 | How long does a customer stay signed in on their phone? | Shared phones vs re-typing details every visit | Stay signed in for 30 days on that browser; a visible log out on the home page | yes (security model) |
| UC01-Q9 | What age and privacy wording appears on the landing page? | Rewards are alcohol; PDPA consent before data is collected (A5) | Landing page states "For guests aged 18 and over" and links a privacy notice; the 18+ confirmation and promotion consent are ticked at registration (UC08) | yes (personal data) |
| UC01-Q10 | Count visits to the landing page to measure scans against registrations? | Q001 success needs a funnel; must not collect personal data | Yes: an anonymous count of landings per day and per tag in the app's own database; no third-party analytics, no tracking cookies | no |

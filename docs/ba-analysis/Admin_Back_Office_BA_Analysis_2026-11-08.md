# Admin back office (UC05, UC06, UC07) - BA Analysis 2026-11-08

**Reviewed by:** ba-agent (Mode 1). **Scope:** R2SS PROJ010 UC05 "Admin view registered user", UC06 "Admin view
users engagement", UC07 "Admin create more rewards", reviewed together.
**Sources:** the R2SS PROJ010 snapshot read 2026-11-08 (R2SS could not be reached; the snapshot stands in for it -
re-read R2SS before acting on this); `CLAUDE.md`; `WORKFLOW.md`; `docs/MASTER_PLAN.md`; `docs/KNOWN_ISSUES.md`.
There is no code and no `docs/ARCHITECTURE.md`: the dependency and edge-case checks are about what the
requirements assume.

## Verdict: NOT READY

None of the three use cases has an acceptance criterion; UC05 has neither an actor nor a description; admin
sign-in, roles and the handling of customers' personal data - all on the `CLAUDE.md` ask-first list - are
undecided; and the points ledger and redemption that UC06 and UC07 rest on have no use case.

## Gaps

**1. Acceptance criteria** (snapshot "Use cases": all three Unanswered, AC and expansion fields empty)
- UC05: nothing to test - no actor, description or AC.
- UC06: a field list, not criteria. Missing: what the admin can do with the list (search, filter, sort, open one
  customer); whether "points gathered on each game" means per play or a total per game; the period shown (all time
  or a date range); a count of registered customers - the first success metric (Q001: 1,000 customers) has no screen
  that shows it.
- UC07: "Design reward card, set points" - no criterion for what a card holds, when customers see it, how it is
  published, changed or withdrawn.
- No AC anywhere for the second success metric (Q001 "observe sale increase"): the app cannot see bar sales; at
  most it can count redemptions. Whether the admin side must report that is not stated.

**2. Conflicts and overlap**
- UC05 is contained in UC06: UC06's first line ("Basic customer details like name, gg account, mobile no.") is the
  registered-user view. Two use cases for one screen will get two sets of AC that drift. Merge (ADM-Q3).
- UC06 vs UC08: UC06 shows "gg account", but UC08 allows Google, email or username + password - the view must show
  whichever was used. UC08 requires consent; UC06 does not list consent, yet the data is collected for campaigns
  (Q008) - consent status and date must be visible.
- UC07 vs Q083 / UC08: a "surprise Birthday gift" needs a birthday; UC08 collects only mobile number and consent.
  Adding a birthday is new personal data (ask-first).
- Q010 lists only Customer and Admin. Redeeming a free drink at the bar needs someone to confirm it (MASTER_PLAN
  section 4 A3); if bar staff are "Admin", they would see every customer's phone number. Not reconciled.
- MASTER_PLAN section 3: the admin view sits in P5 with the ledger and rewards; campaigns (where an export would be
  used) are P7. The export asked about here belongs to P7 unless the owner moves it.
- `CLAUDE.md` "Every customer screen works on a phone browser held upright" does not cover admin screens - device
  unstated.
- KNOWN_ISSUES #1 (public repository): real reward names, point prices and any customer export must never be
  committed; seed and test data must be made up.
- Q011 "try not to over-engineer it" pulls against roles, an audit log and a card designer - each needs a minimum.

**3. Dependencies assumed, none existing** (snapshot line 17 lists the missing use cases)
- Admin sign-in: no use case. Customer accounts (UC08): no AC.
- Points ledger (earned per game, spent, remaining): no use case; UC06 "Total points, used, remain" and UC07 "set
  points" assume it. Points per game in UC02-UC04 are "some points" - no figures.
- Redemption (UC06 "Redeemed rewards"): no use case - neither the customer's side nor the staff's.
- A customer-facing reward catalogue (where cards are seen): no use case.
- Stack and hosting (Q050-Q054, MASTER_PLAN A6): image storage for cards and admin sign-in depend on it.
- Notifications / campaigns (Q013, MASTER_PLAN B7): no use case; an export would be its stand-in.

**4. Edge cases and failure modes not covered**
- A reward's points cost, stock or dates edited, or the reward retired, while customers have claimed it but not yet
  used it; history must keep the name and price at the time of redemption.
- Stock reaching zero while two customers redeem at once; a points cost of 0, negative or not a whole number.
- Time: Singapore time (UTC+8); the bar is open 4pm-2am (Q006), so "today", daily limits and a happy-hour window
  cross midnight.
- Birthday gift: once a year; birthday unknown; a customer changing the birthday to claim again.
- Duplicates: one person registered by Google and by email with the same phone number inflates the 1,000 count.
- A customer withdrawing consent or asking to be deleted (Q041, Q042): must leave the view and any export.
- An admin who leaves Deckbar: access must be removable at once. A bar phone left signed in to the admin screen.
- Search by phone in different formats (with or without +65, spaces); a list of 1,000+ customers needs paging.
- Card image upload: file type and size, free-plan storage quota, a missing image.

**5. Non-functional**
- Text in English (`CLAUDE.md` standing rule, until MASTER_PLAN B4); no invisible Unicode.
- Security: admin access to all customers' personal data must be enforced on the server (not by hiding a page);
  admin-only actions stay admin-only, staff-only stay staff-only - the analogue of PROJ002 UC16's host-only rule.
- Personal data: Singapore PDPA consent and the Do Not Call rules (MASTER_PLAN A5); an export is data leaving the
  system - `.gitignore` refuses `*.csv` and `exports/`, but nothing stops a file going by email or chat.
- Cost: $0 on free plans - image storage and admin sign-in must fit; no SMS for admin codes without approval.
- Low-end phone and dark pub: if staff confirm redemptions at the bar, that screen must be phone-first, large text.

**6. Scope size** - the three use cases hold five concerns. Proposed split:
(a) admin sign-in and roles, with the audit log - new use case; (b) customer list and engagement - UC06 with UC05
merged in; (c) reward catalogue management - UC07; (d) redemption at the bar, customer and staff side - new use case;
(e) customer export - with the campaigns use case (P7), not in the MVP.

**7. STOP-AND-CONFIRM** (`CLAUDE.md` ask-first): who the admins are and how they sign in; the roles and who may see
phone numbers (security model, personal data); merging UC05 into UC06 and the new use cases (scope); collecting a
birthday (personal data); any export of customer data (personal data leaving the system); how long the audit log
and retired rewards are kept (data lifecycle); any paid storage or SMS (spend).

## Top three risks

1. **Customers' personal data exposed through the admin side** - a weak or shared admin login, a bar phone left
   signed in, or an exported list forwarded by chat. A PDPA breach would hit the client directly; the public
   repository (KNOWN_ISSUES #1) makes a committed export public at once.
2. **Rewards are free drinks, and nothing yet protects them** - no redemption use case, no staff confirmation, no
   rule for editing a reward customers already hold, no stock or per-customer limit. Points farming or a double
   redemption costs Deckbar real money and trust.
3. **Over-building before the pilot** - a reward-card designer, many roles and full reporting would delay P8 against
   Q011. The minimum below (template card, two roles, one log) keeps the admin side small.

## Clarification questions

| # | Question | Why it matters | Recommended answer | STOP-AND-CONFIRM |
|---|---|---|---|---|
| ADM-Q1 | Who are the admins, how many, and how do they sign in? | Admins see every customer's phone number; login is the security model | Google sign-in only, for a short allow-list of named accounts kept in the hosting provider's settings (never in git); to start: Vincent and one Deckbar manager; no shared accounts; access removed by taking the account off the list | yes |
| ADM-Q2 | One admin role, or two (bar staff vs managers)? | Staff confirming a drink should not see the whole customer list | Two roles: Manager (customers, engagement, rewards, staff list) and Staff (confirm a redemption only; sees the customer's first name and the reward, no phone number) | yes |
| ADM-Q3 | Merge UC05 into UC06? | UC05 is empty and is a subset of UC06 | Yes: one use case "Admin view customers and engagement" - a searchable list (name, phone, sign-in method, consent and its date, registered at) with a total count toward 1,000, and a customer detail page (games played, points per game, total earned / used / remaining, rewards redeemed with dates); UC05 marked merged in R2SS | yes |
| ADM-Q4 | How is a reward redeemed at the bar, and who confirms it? | UC06 and UC07 assume it; it is where cheating costs money | New use case: the customer taps Redeem at the bar, points are taken, the phone shows a code valid 15 minutes; staff confirm it in their own signed-in screen; one confirmation per code | yes |
| ADM-Q5 | Which fields does a reward have? | Decides the data model and the AC of UC07 | Name, short description, image, points cost (whole number, at least 1), optional total stock, optional limit per customer (per day or per visit), optional valid-from / valid-to dates and a daily time window (e.g. happy hour), all in Singapore time; status Draft / Active / Retired | no |
| ADM-Q6 | The birthday gift: may we ask customers for their birthday? | New personal data, not in UC08 | Day and month only, optional at registration, cannot be changed by the customer once set; the gift claimable once a year within the birthday month | yes |
| ADM-Q7 | What does "design reward card" mean? | A designer is a project in itself (Q011) | A fixed card template in Deckbar's colours, filled with name, text and points; one optional uploaded image (JPG or PNG, up to 1 MB) with a default image; no free-form design | no |
| ADM-Q8 | What happens when a reward customers already hold is edited or retired? | Customers lose points or trust; history breaks | Changes apply to new redemptions only; a claimed, unused reward is honoured until its code expires; Retired hides it from the catalogue and is never deleted; each redemption keeps the reward's name and price at that moment | no |
| ADM-Q9 | Export the customer list for campaigns? | Personal data leaving the system; PDPA and Do Not Call | Not in the MVP; decide with the campaigns use case (P7). If needed then: Manager only, consenting customers only (name, phone, consent date), every export logged, the file never put in the repository or chat | yes |
| ADM-Q10 | Admin screen device, search and filter, and audit of admin actions? | Sets the UI and what can be traced after a dispute | Phone held upright first (staff at the bar), also usable on a computer; search by name or the last 4 digits of the phone; filter by registration date and consent; sort by points; an audit log of admin sign-ins, reward create / edit / retire, redemption confirmations and exports, kept 12 months, visible to Managers | no |

# UC08 "Reg account" plus log in - BA Analysis (2026-11-08)

**Source:** R2SS PROJ010 use case "Reg account" (working number UC08), read from the R2SS snapshot of 2026-11-08
(R2SS itself not reachable in this pass). No spec in `docs/specs/`, no code, no `docs/ARCHITECTURE.md` yet, so
dependencies and edge cases are judged against what the requirements assume.

**R2SS text, in full:** actors Customer; "By google account. By email. By username + password. Whichever option
requires mobile no. and consent". Status Unanswered, priority empty, acceptance criteria empty, every expansion
field empty. There is no use case for log in, log out, a forgotten password, admin log in, or account deletion.

## Verdict: NOT READY

No acceptance criteria; the login, consent, age and personal-data questions are all ask-first items under
`CLAUDE.md` (scope; login and the security model; collecting, keeping or using customers' personal data; paid
SMS). Nothing here can be built until the owner answers the questions at the end.

## Gaps

**1. Acceptance criteria (R2SS UC08: none)**
- No numbered AC at all. Untestable as written: "requires mobile no." (format? Singapore only? checked?) and
  "consent" (to what, worded how, optional or required, recorded where?).
- Name is missing: Q008 says the minimum is "name and the phone number"; UC08 only names mobile number and consent.
- Log in, log out, staying signed in and a forgotten password are not described anywhere (Q015 step 2 says only
  "log in or register").
- Once the questions are answered, the AC should cover at least: register with the chosen method(s); name and
  mobile number required and format-checked; consent ticks shown and stored with time and wording version; log in;
  log out; recovery for the chosen method; the age confirmation; a customer can ask for deletion; one testable rule
  per duplicate case (same phone, same email, same Google account).

**2. Conflicts not reconciled**
- Q083 promises a "surprise Birthday gift", but UC08 collects no birthday - the gift cannot work without it.
- UC06 (admin view) lists "name, gg account, mobile no." - it assumes Google sign-in and does not mention email or
  username, so it does not match UC08's three methods. UC05 "Admin view registered user" is empty and overlaps UC06.
- Q015 requires log in before choosing a game; UC01 (landing page) is empty, so where the sign-in gate sits and
  what a visitor sees before it is undefined.
- Q013 wants notifications by email / SMS / push and Q008 wants the contacts for promotion campaigns; the consent
  in UC08 must cover exactly those channels (and WhatsApp, if used), but no channel is named.
- `docs/MASTER_PLAN.md` A4 and A5 already raise phone checking, one account per phone and consent; still open.
- "By email" is ambiguous: email + password (then it duplicates "username + password") or an emailed sign-in link.

**3. Dependencies assumed but not verified**
- Stack, hosting, sign-in provider and budget not chosen (Q043, Q050-Q054, MASTER_PLAN A6). Google sign-in needs a
  Google Cloud project with an OAuth consent screen, a privacy policy page and a stable address (a domain may cost
  money - ask first). Email sign-in or password reset needs an email-sending service within a free plan.
- SMS one-time codes for the phone number are paid per message (CLAUDE.md lists SMS as ask-first spend).
- A privacy notice and terms page do not exist; who at Deckbar is responsible for the data is not named
  (Q035, Q038, Q041, Q042 unanswered).
- Admin log in (needed by UC05-UC07) has no use case.
- Points and rewards (MASTER_PLAN A3) - the reason accounts must resist duplicates - have no use case.

**4. Edge cases and failure modes (from the requirements)**
- QR codes opened inside chat or social apps' built-in browsers: Google blocks its sign-in in many of these, so the
  Google path can fail at the bar with no visible reason. Needs a tested fallback or an "open in browser" hint.
- One person, several accounts (Google + email + username, or friends sharing one phone) to farm free drinks.
- Unverified numbers: typos, fake numbers, someone else's number - the 1,000-contacts goal (Q001) counts junk, and
  a unique-phone rule lets a squatter block the real owner unless an admin can release the number.
- Phone formats: +65 with or without spaces, 8 digits, tourists' foreign numbers.
- Username + password has no recovery channel unless an email or SMS is also kept - a forgotten password then
  needs staff help or paid SMS.
- Consent refused or withdrawn later (unsubscribe), consent wording changed after people registered.
- Under-18 visitors in a pub; a drink reward redeemed by someone under age.
- Low signal in the bar, a half-finished registration, the back button mid sign-in, a shared bar phone left signed in.
- Password guessing (rate limiting) and password storage - a reason to leave passwords to a provider or drop them.

**5. Non-functional**
- Language: English only (CLAUDE.md assumption, MASTER_PLAN B4). The PROJ003 checks in this agent's brief
  (6 game languages, 35x35 maps, host-only online actions) do not apply to Deckbar.
- Portrait phone browser, large touch targets, one short form (CLAUDE.md standing rule; Q009).
- Cost: $0 on free plans - SMS codes and a domain are paid and need the owner first.
- Personal data: no real names, numbers or emails in git, tests or screenshots; the repository is public
  (KNOWN_ISSUES #1). A QR code pointing at dev would put real customers in dev (KNOWN_ISSUES #5).
- Singapore personal-data (PDPA) and Do Not Call rules may affect the consent wording, whether marketing consent
  can be a condition of playing, how consent is recorded, data stored abroad, and SMS / WhatsApp / calls to
  Singapore numbers. This analysis draws no legal conclusion: the owner should confirm with someone qualified.

**6. Scope size - split proposed**
UC08 bundles five concerns. Proposed: (a) Register and log in, with log out and recovery for the method(s) chosen;
(b) Consent and privacy notice - capture, record, withdraw; (c) Customer profile - name, phone, birthday, age
confirmation; (d) Account deletion and export - manual by admin for the MVP; (e) Admin log in - its own use case.
Three sign-in methods, each with its own recovery and duplicate-account linking, is more than an MVP needs (Q011
"Try not to over-engineer it"): one or two methods from one free sign-in provider cover the goal.

**7. Owner decisions (STOP-AND-CONFIRM)**
Sign-in methods (scope, security model); phone checking by SMS (spend); one account per phone (anti-cheat);
consent wording, channels and whether it is required (personal data, outside advice); age gate and birthday
(personal data); deletion, export and retention (data); who is responsible for the data at Deckbar.

## Top three risks

1. **Consent and personal-data handling wrong or unconfirmed** - the contacts collected (the project's first goal,
   Q001) may not be usable for campaigns, or Deckbar is exposed. Mitigation: owner confirms wording and channels
   with someone qualified before the first real customer registers.
2. **Duplicate and fake accounts farming free drinks** - three methods and an unverified phone make multiple
   accounts easy and fill the 1,000 with junk. Mitigation: unique phone per account, rewards checked at the bar,
   per-visit limits (MASTER_PLAN A3).
3. **Over-built, fragile sign-in at the bar** - three methods, password recovery and Google failing in in-app
   browsers delay the MVP and lose customers at the first screen. Mitigation: one or two methods from one free
   provider, tested from the QR code on real phones.

## Clarification questions

| # | Question | Why it matters | Recommended answer (a concrete default the owner can simply accept) | STOP-AND-CONFIRM |
|---|---|---|---|---|
| UC08-Q1 | Which sign-in methods are in the MVP? | Three methods triple the flows, recovery paths and duplicate cases (Q011); UC06 already assumes Google | Two, both from one free sign-in provider: Google sign-in and an emailed one-time sign-in link. No username + password in the MVP, so no forgotten-password flow; revisit after the pilot | yes |
| UC08-Q2 | Is the mobile number checked with an SMS one-time code? | SMS costs money per message; unchecked numbers can be fake and weaken Q001 | Not in the MVP: number typed once, format-checked (Singapore 8 digits by default, other countries allowed with a country code). Add SMS codes only if fake numbers become a problem and a cost is approved | yes |
| UC08-Q3 | One account per phone number? | The main guard against farming rewards with several accounts | Yes, unique per account; a clash shows "this number is already registered - ask the staff", and an admin can release the number | yes |
| UC08-Q4 | Is marketing consent required to play, and which channels does it cover? | It decides whether the collected contacts can be used for promotions (Q008, Q013) | Two separate ticks: required - terms and privacy notice (data used to run the games and points); optional, unticked - promotions from Deckbar, one tick per channel (SMS, WhatsApp, email). Time and wording version stored with each tick; unsubscribe in the profile and in every message | yes |
| UC08-Q5 | Who at Deckbar is responsible for the customer data, and who checks the consent text and privacy notice against Singapore PDPA and Do Not Call rules? | Legal exposure for the client; this analysis gives no legal conclusion | Deckbar is the organisation named in the notice with a contact for data requests; the owner has the final wording checked by someone qualified in Singapore law before the first real customer registers | yes |
| UC08-Q6 | Age gate and birthday: what is asked? | A pub serving drink rewards; Q083 promises a birthday gift that needs a birthday | A required "I am 18 or older" tick; optional birthday (day and month only) for the gift; staff check ID when any drink reward is redeemed | yes |
| UC08-Q7 | Can customers delete their account or get a copy of their data? | Q042 unanswered; a common personal-data expectation | MVP: a "Delete my account" request in the profile, done by an admin within 30 days (personal details erased, anonymous points history kept); a copy of the data on request by the admin. Self-service later | yes |
| UC08-Q8 | How long are customer details kept? | Q041 unanswered; keeping data longer than needed is a risk | While the account is in use; accounts with no sign-in for 24 months are deleted after one reminder | yes |
| UC08-Q9 | Must a visitor sign in before playing, or play first and sign in to keep the points? | Q015 says sign in first; playing first may convert more visitors but adds guest points | Sign in first, as Q015 says; the landing page (UC01) shows the games and rewards above the sign-in buttons | yes |
| UC08-Q10 | How long does a customer stay signed in, and where is log out? | A shared or lost phone left signed in exposes points and details | Stay signed in on that phone browser for 90 days; a "Log out" item in the profile menu; signing in again on another phone is allowed | yes |

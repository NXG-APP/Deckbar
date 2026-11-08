# UC02 Dart mini game - BA Analysis (2026-11-08)

- **Use case:** R2SS PROJ010 "Dart mini game" (working number UC02, R2SS list order). Actor: Customer. Description, in full:
  "Mobile friendly. Through the dart, if can hit all characters of Deckbar then win some ponts". Status Unanswered,
  priority empty, acceptance criteria empty, every expansion field empty (R2SS snapshot read 2026-11-08).
- **Read:** `CLAUDE.md`, `WORKFLOW.md`, `docs/MASTER_PLAN.md`, `docs/KNOWN_ISSUES.md`, the other PROJ010 use cases and
  main-bank answers. There is no spec, no `docs/ARCHITECTURE.md` and no code yet, so checks 3 and 4 are against what
  the requirements assume.

## Verdict: NOT READY

One sentence and no acceptance criteria. The board, the throw, the number of darts, the points, the limits and the
anti-cheat model are all undefined, and three of the open points are owner decisions (security model, login, personal
data and compliance). Nothing can be built or tested until the questions below are answered in R2SS.

## Gaps

**1. Acceptance criteria** (R2SS UC02 "acceptance criteria": empty)
- No numbered AC at all. "Mobile friendly" and "win some ponts" are not testable.
- Missing: what the targets are; how a throw is aimed and released; how many darts; what a hit is; the win and lose
  condition; points per win (and whether a loss earns any); replay and daily limits; what the customer sees after a
  win, a loss and a limit reached; what is recorded for the admin (UC06).
- Difficulty has no measurable target: "beatable after a few drinks, not trivially farmed" needs a playtest criterion
  (Q7), not a feeling.

**2. Conflicts** (other use cases, `docs/MASTER_PLAN.md`)
- UC03 Memory card requires "the correct order"; UC02 says only "all characters". Whether darts must be hit in
  D-E-C-K-B-A-R order is undefined; the two games should not differ by accident.
- UC04 Bottle flip sets "3 out of 10" tries; UC02 has no count. Points, tries and limits are decided per game with no
  shared rule - the three games will drift unless one points rule covers them (section 6).
- UC06 needs "games played, points gathered on each game": every play (not only wins) must be recorded per customer,
  which means the server must see each game start - this shapes the anti-cheat design (Q2).
- `docs/MASTER_PLAN.md` section 3 puts darts in P6 (memory cards first, P4). The anti-cheat and limits decided here
  apply to P4 too - decide them once, before P4.
- MASTER_PLAN B1 already asks the darts question; A3 (points, limits) and A4 (login) are unanswered and block this.

**3. Dependencies assumed but not verified** (none exists yet)
- Log in / register: UC08 "Reg account" has no AC; how the customer is identified (and whether one person can hold
  several accounts - Google, email, username) is open (MASTER_PLAN A4).
- A points ledger and a points balance the customer sees: no use case exists (snapshot "No use case exists for").
- Rewards and redemption: UC07 has a description only; redeeming has no use case. The value of a dart win is
  meaningless until a reward's cost is known.
- A server and database able to run the award logic on a free plan: stack not chosen (A6, Q050-Q054).
- Deckbar's logo, colours and font, and any mascot art: not supplied (Q085 "Na.", Q088-Q091 unanswered, B5).

**4. Edge cases and failure modes** (to be covered by AC)
- **Forged win:** a game decided in the browser can be faked by editing the request. Only the server may award
  points, once per game, with a one-time game ticket; the daily cap bounds what a forger gains (Q2).
- **Farming:** unlimited replays; refresh after a bad throw; two tabs playing at once; a second account on the same
  phone. A cap on awarded wins (not on attempts) makes abandoning a losing game worthless; the cap must hold under
  two simultaneous submissions.
- **The "day":** the bar is open 4pm to 2am (Q006); a midnight reset gives a customer two awards in one night. The
  limit needs a business-day reset in Singapore time (Q3).
- **Played away from the bar:** the QR URL can be shared or reused at home. Nothing in the requirements ties play to
  being at Deckbar; staff checks at redemption are the real control (redemption use case).
- **Not logged in:** an opened game link without a session; a session that expires mid-game, before the win is sent.
- **Interrupted:** a phone call or lock screen mid-throw (the page is hidden - pause, do not count a throw); a weak
  bar connection when the result is sent (retry with the same ticket, no double award); a ticket that expires.
- **Rotation:** portrait only; the phone turned sideways mid-game.

**5. Non-functional**
- Phone browser held upright, one thumb, in a dark noisy bar: the finger must not hide the target, sound off by
  default, high contrast (CLAUDE.md standing rule; Q009). Accessibility unanswered (Q049).
- Low-end phone and weak connection: no measurable budget (page weight, load time); proposed AC: playable within
  5 seconds on a throttled "Slow 4G" profile, and the game needs the network only to start and to send the result.
- Text: English (CLAUDE.md assumption, B4). The exact strings (how to play, win, lose, limit reached, connection lost,
  please log in) go in `docs/specs/use-cases/UC02_Dart_Game_Detail.md`.
- Personal data: the game needs only the account id; nothing new collected. Cost: no paid asset, no paid service.

**6. Scope size**
- UC02 bundles two concerns: the dart game itself, and earning points safely (ledger entry, caps, server check).
  Proposed split: UC02 keeps the game (board, throw, win/lose, what is shown); a new shared use case "Earn points from
  a game" holds points per game, limits and anti-cheat for UC02, UC03 and UC04.
- Q011 ("don't over-engineer"): a 2D canvas game is enough; no physics library, no 3D, no geofencing in the MVP.

**7. Owner decisions (STOP-AND-CONFIRM)** - Q2, Q3, Q4, Q9, Q10 below: how points are protected from cheating and the
daily limit (security model); playing without login (login, personal data); using Deckbar's brand and supplying
art (client, possible spend); free drinks as prizes for a drinking game (compliance, A5).

## Top three risks

1. **Points farmed into free drinks.** Without a server-side award, a daily cap and a business-day reset, one person
   with a script or several accounts turns the game into a free-drink machine - the cost lands on Deckbar.
2. **Compliance.** Drinks as prizes, a game pitched as "beatable after a few drinks", and no age check at
   registration: alcohol promotion rules and the legal drinking age (18) in Singapore are worth confirming before
   launch, together with PDPA consent (MASTER_PLAN A5).
3. **Built before the shared rules exist.** Points, limits and the ledger have no use case; if UC02 (or UC03 in P4)
   is built first with its own rules, the other games and the admin view (UC06) will be reworked.

## Clarification questions

| # | Question | Why it matters | Recommended answer (a concrete default the owner can simply accept) | STOP-AND-CONFIRM |
|---|---|---|---|---|
| UC02-Q1 | What are "all characters of Deckbar": the letters D-E-C-K-B-A-R, or mascot characters? | Defines the targets, the art and the win condition | The 7 letters D-E-C-K-B-A-R, hit in any order; a hit letter lights up and stays lit. Mascots do not exist (Q085) and would need paid or commissioned art | no |
| UC02-Q2 | Are points decided on the server, and do points, limits and anti-cheat move into one shared use case for all three games? | A browser-decided win can be forged; three games with three rules drift | Yes. The server issues a one-time game ticket at start (also recording the play for UC06), receives the throws, checks they are plausible (count, timing, all 7 letters), and alone writes the points, once per ticket. New use case "Earn points from a game" for UC02-UC04 | yes |
| UC02-Q3 | What replay and daily limits apply? | Stops farming; decides what an abandoned game costs | Unlimited plays; points only for the first win per account per business day, reset at 06:00 Singapore time; later wins show "You've already won today - come back tomorrow" | yes |
| UC02-Q4 | Can a customer who is not logged in play? | Login and personal data are ask-first; it also drives the 1,000-contacts goal | No - as Q015: a game link without a session goes to log in or register, then back to the game. A session that expires mid-game asks to log in again and then sends the same result | yes |
| UC02-Q5 | How many points is a win worth, and does a loss earn any? | Rewards (UC07) are priced in points; the value must fit them | 10 points per win, 0 for a loss, held in one setting changeable without code; reward prices are set in UC07 | no |
| UC02-Q6 | What does the board look like, how many darts, and how is a throw aimed with one thumb? | The core of the game; without it nothing is testable | A round board with the 7 letters in a ring, turning slowly. 10 darts. Hold a thumb anywhere on the lower half: a crosshair appears above the thumb and drifts gently; drag to aim, release to throw. Win when all 7 are lit; lose when the darts run out | no |
| UC02-Q7 | What difficulty target makes it beatable after a few drinks but not trivial? | "Beatable" must become a test | Playtest with at least 5 adults new to the game: at least half win within their first 3 games, and nobody wins every one of 5 games. Ring size, drift and turning speed are settings tuned in the playtest | no |
| UC02-Q8 | What happens on a call, lock screen, refresh or weak connection? | Customers will be interrupted; no lost win, no double award | Hidden page pauses the game; it resumes where it was. The ticket lasts 30 minutes; a refresh starts a new game (harmless with the win cap). The result is resent with the same ticket until it is saved; if it cannot be saved in time, "We couldn't save this game - please play again" | no |
| UC02-Q9 | Who supplies the art: Deckbar's logo, colours and font? | Using the client's brand needs its consent; bought art is spend | Deckbar supplies its logo and colours (owner asks the client); the board, darts and letters are drawn in code; a free-licence font; no paid assets; sound optional, off by default | yes |
| UC02-Q10 | Are free drinks as prizes, and wording such as "after a few drinks", acceptable under Singapore rules, and who checks age 18 at redemption? | Alcohol promotion and age rules; reputational risk for Deckbar | Confirm with someone who knows Singapore law before the pilot (with A5); no drinking references in the game text; bar staff check age when a drink reward is redeemed | yes |

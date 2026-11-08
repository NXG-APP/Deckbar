# UC03 "Memory card" - BA Analysis (2026-11-08)

**Source:** R2SS PROJ010 use case "Memory card" (working number UC03), read from the 2026-11-08 snapshot of
R2SS (R2SS was not reachable from this session). Also read: `CLAUDE.md`, `WORKFLOW.md`, `docs/MASTER_PLAN.md`,
`docs/KNOWN_ISSUES.md`. There is no spec in `docs/specs/`, no `docs/ARCHITECTURE.md` and no code yet, so
the dependency and edge-case checks are about what the requirement assumes.

## Verdict: NOT READY

The use case is one dictated paragraph: status Unanswered, priority empty, no acceptance criteria, every
expansion field empty. The rule itself can be read two ways, and nothing about points, limits or cheating
is said. Nothing below can be built or tested until the owner answers the questions at the end.

**How the rule reads.** "Open the cards which are face down ... remember and be able to open all the
characters in one row and in the correct order". This describes a **sequence-recall game**, not classic
pairs: nothing is said about matching two cards. "In one row" most likely means "in a row", i.e. one
unbroken run with no mistake, not cards laid out in a single row. "The characters" matches UC02's "all
characters of Deckbar", so the likely order is the spelling D-E-C-K-B-A-R. Those 7 letters are all
different, so each letter has exactly one place in the order. This is a reading, not a decision (UC03-Q1).

## Gaps

### 1. Acceptance criteria (R2SS UC03 - none written)
Each item below needs a numbered, testable AC:
- the rule: what a correct tap does, what a wrong tap does (card flips back? the whole run restarts? the game ends?);
- the cards: what is on them (letters only, or letters plus decoys), how many, the grid on an upright phone;
- whether the cards are shown face up first, and for how many seconds;
- the order (DECKBAR spelled left to right?) and whether the player is told the target word;
- how a game is won and lost: time limit, mistake limit, or neither (with no limit every player wins in the end);
- the points for a win, any partial points, and points for a loss (none?);
- replays: how many games, and how many points-earning wins, per customer per day;
- the layout is shuffled on every game (if it is fixed, a regular customer learns it once and wins every time);
- an interrupted game (refresh, back button, phone locked, lost connection): resume, or counted as a loss;
- what the customer sees at the end (result, points earned, new balance, play again).
"Mobile friendly" alone cannot be tested. It needs a criterion such as "playable with one thumb on a
360 px wide upright screen, every card at least 44 px".

### 2. Conflicts and overlaps
- **UC02 Darts** (R2SS) also says "all characters of Deckbar". Both games have to read "characters" the same
  way (MASTER_PLAN 4 B1 and B2 are open). Settle it once for both.
- **UC06 Admin view users engagement** needs "games played, points gathered on each game". So UC03 must
  keep a record of every game (customer, game, start, end, result, points). UC03 does not say this.
- **MASTER_PLAN 3, P4** puts memory cards first "end to end with points", but the points ledger is P5 and
  has no use case (snapshot: "No use case exists for: redeeming a reward, the points balance"). Building
  UC03 first would mean designing the ledger without a use case for it. Keep the game and the points
  apart (see 6).
- **Q015** puts log in or register before choosing a game. Can a customer play without logging in? That
  is not settled (UC03-Q5).

### 3. Dependencies assumed, none verified (none exists yet)
- Log in / register (UC08). It has no AC, and one account per phone number is still open (MASTER_PLAN 4 A4).
- A points ledger and its balance: no use case. Reward costs (A3) set what a memory-card win should be worth.
- A server that can hold the game state and award points: no stack or hosting chosen (A6, Q050-Q054).
- Card art and Deckbar's brand (logo, colours, font): not supplied; who owns the design is open (B5, Q088-Q091).
- Business day and time zone: Deckbar is open 4pm to 2am (Q006). A day boundary at midnight would split one evening into two "days".

### 4. Edge cases and failure modes (no code yet - each needs an AC or a stated decision)
- **Cheating:** if the browser gets the whole layout, anyone who opens the page source or developer tools
  sees where every letter is and wins every time. The layout must stay on the server, and the browser gets
  one card face per tap. The win, the time taken and the points must be decided on the server, never sent
  by the browser.
- Replaying for points; two tabs or two phones on one account at the same time; a second account on the
  same phone (A4); a forged or repeated "win" request, so the award must happen once per game.
- A timer kept in the browser can be paused or edited. A timer kept on the server also counts network
  delay, so on weak bar Wi-Fi each tap needs a round trip and the time limit needs some slack.
- Taps during the flip animation, a double tap, two fingers at once, a tap on a card already open.
- Refresh or back mid-game: refreshing must not give a fresh layout and a free retry if tries are limited.
- The connection drops on the final correct tap: the win must still be recorded, and recorded only once.
- Turning the phone sideways mid-game; large system font settings; colour as the only clue on a card.

### 5. Non-functional
- Upright phone, one thumb: 12 cards in 3 columns x 4 rows fit a 360 px screen with cards about 100 px
  wide. Seven cards in one physical row would be about 45 px each, the smallest a fingertip can hit.
- Low-end phone: CSS card flips only, no game engine (Q011).
- Text in English only (`CLAUDE.md` standing rule; languages open, MASTER_PLAN 4 B4). The 6-language,
  host/guest and 35x35-map checks in the ba-agent prompt are PROJ003 rules and do not apply here.
- Cost: one request per tap is well inside free serverless tiers at 1,000 customers. Confirm once A6 is chosen.
- Personal data: only the game record tied to the account. No new personal data.
- Players are mostly aged 25-60 (Q007) and play in a dim bar at night: letters must be large and high-contrast.

### 6. Scope size
UC03 bundles three separate concerns: (a) the game rules and screen; (b) awarding points, which needs
the ledger, and is shared with UC02 and UC04; (c) limits against cheating (daily cap, server-side result),
also shared. Proposed split: UC03 keeps (a) and calls "award points for game X" from a new
"Earn points" use case that owns (b) and (c) once, for all three games. A server-side layout is the
smallest fix that still prevents cheating. Anything more (location checks, device fingerprints) would be
over-engineering against Q011.

### 7. Owner decisions (STOP-AND-CONFIRM)
The rule and scope (Q1). How points are protected from cheating: a security-model item (Q2). What points
are worth and the daily cap, which together are the reward economy (Q3, Q4). Play before logging in,
which touches scope and personal data (Q5).

## Top three risks

1. **Building the wrong game.** Pairs and sequence recall are different games. The dictated text is
   ambiguous ("in one row"), and without Q1 the build may be thrown away.
2. **Free drinks farmed.** A layout readable in the browser, unlimited replays, refresh retries, a
   midnight day boundary or a second account each turn points into rewards Deckbar pays for (A3).
3. **Pulled ahead of its dependencies.** As the first game (P4), UC03 needs login (UC08), a points ledger
   (no use case) and a server (A6, not chosen). Starting it now would decide all three without the owner.

## Clarification questions

| # | Question | Why it matters | Recommended answer (a concrete default the owner can simply accept) | STOP-AND-CONFIRM |
|---|---|---|---|---|
| UC03-Q1 | Is this a sequence game (tap the letters of DECKBAR in order) rather than match-the-pairs? What does "in one row" mean? | Decides the whole game. Pairs and sequence are different builds | Sequence recall: tap D-E-C-K-B-A-R in that order. A correct card stays face up. A wrong card shows for 1 s, then every open card flips back and the run restarts from D. "In one row" = in one unbroken run. The word DECKBAR is shown above the grid. No pairs mode | yes |
| UC03-Q2 | Must the layout and the result be decided on the server, so the browser never holds the card positions? | Otherwise anyone can read the layout in the browser and win every time, for free drinks | Yes. The server shuffles a new layout for each game and returns one card face per tap. It decides win or loss and the time taken, and it alone writes the points, once per game | yes |
| UC03-Q3 | How many points is a win worth? Any partial points, or points for a loss? | Points must match reward costs (A3), or rewards are too easy or out of reach | A fixed 10 points per win, none for a loss and no partial points. The figure is reviewed when reward costs are set | yes |
| UC03-Q4 | Can a customer replay, and how many wins per day earn points? | Unlimited points-earning replays turn the game into a free-drink machine | Unlimited plays for fun, but points only for the first win per customer per business day. The business day runs 06:00 to 05:59 Singapore time, so one evening that runs past midnight counts as one day | yes |
| UC03-Q5 | Must the customer log in before playing (Q015), or play first and log in to collect the points? | Affects how many customers register (goal Q001) and when personal data is taken | Log in first, as Q015 says. A logged-out visitor sees the game rules and a "log in to play" button | yes |
| UC03-Q6 | What is on the cards, how many are there, and what is the grid? | Sets difficulty and what fits an upright phone | 12 cards in 3 columns x 4 rows. The 7 letters D-E-C-K-B-A-R plus 5 decoys (pint, bottle, glass, star, heart). All cards share one back with the Deckbar name | no |
| UC03-Q7 | Are the cards shown face up before the game, and for how long? | Decides whether it is a "peek and remember" game or a "discover and remember" game | No preview. The player learns where the cards are by flipping them, as the description says | no |
| UC03-Q8 | Is there a time limit, a mistake limit, or both? | With no limit everyone wins in the end, and the points mean nothing | A 60-second limit kept on the server, plus 3 s slack for slow connections. Mistakes are unlimited within the time. Time up = a loss | no |
| UC03-Q9 | What happens to a game that is interrupted (refresh, phone locked, connection lost)? | Refresh must not give a free retry, and a win must not be lost or counted twice | No resume. An unfinished game becomes a loss when its time runs out, and the next game gets a new layout. A win the server has accepted stands even if the reply never reaches the phone | no |
| UC03-Q10 | Who supplies the art (Deckbar's logo, colours, letter font), and may the logo be used? | The cards and the card back need Deckbar's brand (B5) | Build with plain large letters, simple icons and the name "Deckbar" in text. The logo and colours come from Deckbar once they agree | no |

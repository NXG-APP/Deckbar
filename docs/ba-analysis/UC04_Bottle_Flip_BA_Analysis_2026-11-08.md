# UC04 Bottle Flip - BA Analysis (2026-11-08)

**Use case:** R2SS PROJ010 "Mini game - Flip the bottle" (working number UC04; R2SS name unchanged).
**Read:** the R2SS PROJ010 snapshot of 2026-11-08 (R2SS itself was not reachable in this session), `CLAUDE.md`,
`WORKFLOW.md`, `docs/MASTER_PLAN.md`, `docs/KNOWN_ISSUES.md`. There is no code, no spec in `docs/specs/` and no
`docs/ARCHITECTURE.md` yet, so the dependency and edge-case checks cover what the requirements assume.
Rules applied are this project's (`CLAUDE.md`: English text, phone held upright, $0 on free plans, no customer data in git).

## Verdict: NOT READY

The use case has a description only: status Unanswered, no priority, no acceptance criteria, and every expansion
field empty (snapshot, "Use cases"). Five of the questions below are STOP-AND-CONFIRM decisions for the owner.

## Gaps

### 1. Acceptance criteria (missing or untestable)
- **There are none** (snapshot, "Use cases": acceptance criteria empty). Nothing can be checked by qc-agent.
- **"Look real" / "apply the physics engine"** - can't be tested as written. It needs observable behaviour: the bottle follows an arc, spins, bounces, wobbles and tips over because of the physics simulation, not a canned animation.
- **"Stand still"** - no tilt limit, no rest threshold, no length of time. It isn't said whether a bottle landing on its cap counts.
- **"Two metres"** - no on-screen meaning given (scene scale, camera, table height and size).
- **"If they aggregate they have ten tries"** - probably speech-to-text for "in aggregate / in total". It isn't said whether the 10 tries are per game, per day or per visit.
- **"3 out of 10 ... gain points"** - "at least 3" or "exactly 3"? How many points? Does a 4th or later success earn more? Does the game end at the 3rd success?
- **The throw gesture** - not described. What makes a swipe a try (a tap or a tiny swipe should not use one)?
- **Results screen** - what the customer sees after each try and after the game: successes so far, tries left, points earned, balance.
- **Missing non-functional criteria** - which phones are the low-end target, a frame rate and a load time on bar Wi-Fi / 4G, sound (default on or off in a pub).

### 2. Conflicts and unreconciled items
- `docs/MASTER_PLAN.md` section 3 puts the bottle flip in P6 ("the other mini-games") and proposes memory cards first (P4). Building UC04 first would change that order: owner's call.
- "Physics engine ... look real" (UC04) pulls against Q011 "Try not to over-engineer it" and MASTER_PLAN B3. Neither has been reconciled.
- UC02, UC03 and UC04 each say "earn points" in their own words. There is no shared rule for points per game, limits or awarding (snapshot line 17: no points or redeem use case; MASTER_PLAN A3). The three games will drift apart unless one shared rule exists.
- UC06 (admin engagement) expects "Games played, points gathered on each game". So UC04 must record each game per customer, not only a points total. This is not stated in UC04.
- Q015 stops mid-sentence after "after they play they will" (MASTER_PLAN A2), so what happens after a game is not defined.
- Q007 (customers aged 25-60) is a description of the audience, not a gate. UC08 registration has no age check, but the game is themed on beer and its rewards are drinks (Q083).

### 3. Dependencies assumed but not verified (none exist yet)
- **Login / registered customer** (UC08: no AC; MASTER_PLAN A4). Points need a known customer, so a guest can't play for points.
- **Points ledger and rewards** - there is no use case for earning, the balance or redeeming (snapshot line 17). UC07 has no AC.
- **Landing page and game selection** (UC01: empty description).
- **Server and storage** to keep games, tries and limits (Q050-Q054 and MASTER_PLAN A6 unanswered). It is needed if the server owns the result (Q3 below).
- **A free physics library** that runs in a phone browser (the stack isn't chosen yet).
- **Art**: bottle, table, bar background, maybe sounds. None exist (Q085 "Na."), and the design questions Q088-Q091 and B5 are unanswered.

### 4. Edge cases and failure modes
- **Faked result** - the physics runs in the browser, so a customer can send "success" without throwing. The browser alone can't be trusted with points, and the rewards are real drinks.
- **Refresh or restart to wipe a bad game** - if the browser keeps the try count, a reload at try 8 with 2 successes gives a fresh 10 tries. Two tabs could run two games at once.
- **Replays without limit** - this farms points (MASTER_PLAN A3). A second account on the same phone does the same, and depends on the one-account-per-phone rule (A4).
- **A daily limit that resets at midnight** - the bar is open 4pm to 2am (Q006), so a midnight reset lets one evening count as two days. The limit needs a business-day boundary.
- **Interrupted game** - a call, the screen locking, the tab closed, or the connection lost during a throw or between tries. It isn't said whether the game resumes or ends, or what happens to the try that was in flight.
- **Gesture conflicts** - a vertical swipe can trigger browser pull-to-refresh, scrolling, or the edge-swipe back gesture. Accidental taps shouldn't use up tries.
- **Fairness across phones** - if the physics step follows the frame rate, a slow phone gets different outcomes from the same swipe. A fixed time step is required. Even then, identical results across devices aren't guaranteed, which matters only if the server re-runs the throw.
- **Ambiguous landings** - the bottle comes to rest on the table edge, half off; it rests upright on the floor; it is still rolling after a long time (needs a timeout); it lands on its cap.
- **Portrait framing** - a 2 m side view on a narrow portrait screen makes a bottle about 0.25 m tall only a few dozen pixels high. The view needs a camera that follows the bottle, or a view from behind the thrower.
- **Shared phone in a group** - friends pass one phone around, so the results must go to whoever is logged in.

### 5. Non-functional
- **Phone held upright, one thumb** (`CLAUDE.md` standing rule). The gesture and the results must fit portrait without scrolling.
- **Low-end phone and weak Wi-Fi** - 2D physics in the browser is light, while 3D (a 3D engine plus 3D models) is heavier to download and to run. No target phone is named.
- **Cost**: physics in the browser costs $0. Re-running each throw on the server would need server compute, possibly beyond free plans (ask-first: spend).
- **Text in English** (`CLAUDE.md`). No customer data in tests or screenshots. The game should store only the customer id, game, tries and result.
- **Assets are public** because the repository is public (KNOWN_ISSUES #1). Their licences must allow commercial use. A brand logo must not be committed without the right to use it.

### 6. Scope size
UC04 bundles three concerns:
- (a) the playable physics game and its per-try verdict;
- (b) the points rule - amount, limits, awarding, anti-replay - which UC02 and UC03 share;
- (c) brand, art and legal suitability.

Proposed split:
- UC04 keeps (a);
- a new shared use case "Earn points from a game" covers (b) for all three games;
- (c) is decided by the owner and the client before the art is made.

A 3D "realistic" version would be over-engineering against Q011.

### 7. Owner decisions (STOP-AND-CONFIRM)
- The points and limits (scope and the security model).
- Who decides the result (security model).
- The Guinness brand (an external party; legal).
- The alcohol-promotion and age concerns (to confirm with Deckbar and someone who knows Singapore rules; nothing here is stated as law).
- 2D vs 3D (scope).
- The target success rate (reward cost to Deckbar).

**Tuning reference:** chance of at least 3 successes in 10 throws, by the chance p of one throw succeeding.
| p | 10% | 15% | 20% | 30% |
|---|---|---|---|---|
| chance of 3+ of 10 | about 7% | about 18% | about 32% | about 62% |

## Top three risks
1. **Points and drinks farmed.** The result is computed in the browser, and replays, reloads, two tabs and second accounts are all open. The rewards are real drinks paid for by Deckbar, so without server-held games and limits the reward budget is open-ended.
2. **Brand and promotion exposure.** A Guinness-branded bottle in a public app without the brand owner's permission, and a beer-themed game with drink rewards and no age check, could expose Deckbar and the owner. Both must be confirmed before launch, not after.
3. **"Look real" turns into an open-ended physics project.** Tuning a 3D or "realistic" throw can eat the plan, and outcomes that depend on frame rate are unfair on low-end phones. A 2D, fixed-time-step game with a measured success rate keeps it bounded.

## Clarification questions

| # | Question | Why it matters | Recommended answer (a concrete default the owner can simply accept) | STOP-AND-CONFIRM |
|---|---|---|---|---|
| UC04-Q1 | What exactly does one game earn? | No testable win rule; it sets reward cost (MASTER_PLAN A3) | A game is 10 tries and always plays all 10. 3 or more successes earn a fixed 10 points, set by the admin, once per game; fewer earn 0. The points rule is a shared use case for all three games | yes |
| UC04-Q2 | How many points-earning games per customer, and when does the limit reset? | Unlimited replays farm drinks; a midnight reset splits one evening into two | One points-earning bottle-flip game per customer per business day, resetting at 12:00 Singapore time. Unlimited practice games after that, clearly marked "no points" | yes |
| UC04-Q3 | Does the server or the browser decide the result? | A browser result can be faked; re-running every throw on the server is heavy and may cost money | The server creates the game and holds the try count, the daily limit and the award. The browser simulates and reports each try. The server rejects impossible reports (more than 10 tries, throws too fast, two games at once). The remaining risk is capped by Q2 and logged in KNOWN_ISSUES. No server re-simulation in the MVP | yes |
| UC04-Q4 | Use the Guinness name and bottle look, or a plain bottle? | A third party's trademark in a public app needs its written permission; asking means contacting an external party | A plain dark-brown stout-style bottle with no brand name and no label that looks like Guinness. "Guinness" does not appear in the game's name or text. Revisit only if Deckbar gets written permission | yes |
| UC04-Q5 | Is a beer-themed game with drink rewards fine to promote, is an age confirmation needed at registration, and does a chance-and-skill game with prizes need anything? | Possible alcohol-promotion, age and prize-game concerns; this analysis does not state the rules | The owner confirms with Deckbar, and if needed someone who knows Singapore rules, before launch. Until then UC04 may be built on dev but not launched | yes |
| UC04-Q6 | How should "physics engine, look real" be done: 2D or 3D? | 3D costs art, time and low-end performance; it conflicts with Q011 | 2D physics with a free open-source library and a fixed time step, shaded drawn art, no 3D. "Look real" means arc, spin, bounce, wobble and tipping come from the simulation. Simple art made for the project or with a CC0 licence; a Deckbar logo only if Deckbar supplies and approves it (B5) | yes |
| UC04-Q7 | What success rate should the game be tuned to? | Reward cost to Deckbar, and fairness | A typical player succeeds on about 1 throw in 5 (about 1 game in 3 earns points; see the table above), measured with test throws before the pilot and retuned from pilot data. The same physics on every phone | yes |
| UC04-Q8 | How does the throw work on the phone, and what is "two metres" on screen? | The core interaction; it can't be tested without it | Swipe upward in the lower half of the screen: swipe speed sets the strength, swipe angle sets the direction, and spin follows the strength. A swipe under about 40 px, or too slow, is ignored and costs no try. The world is in metres: hand 2.0 m from the table's near edge, table top 1.0 m high. The camera follows the bottle, then holds on the table. Browser scrolling and refresh gestures are disabled in the play area | no |
| UC04-Q9 | When does a bottle count as "standing still"? | Defines success; otherwise untestable | It rests upright on its base on the table top, tilted under 10 degrees and almost motionless, for 2 seconds in a row. Landing on its cap or side, off the table, or still moving 8 seconds after release is a failure. The verdict shows within 3 seconds of the bottle coming to rest | no |
| UC04-Q10 | What happens to an interrupted game? | A reload must not wipe bad tries; a phone call should not cost the customer | A started game counts toward the daily limit. Reopening within 10 minutes resumes it at the next try. After that it closes with the tries already made and earns points only if they include 3 successes. A try in flight when the game is interrupted is not counted | no |

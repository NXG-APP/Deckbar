# Deckbar Games — Master Plan (live)

> **Live document.** Updated by Claude Code at the end of every session that changes any line below, and
> by Vincent whenever he likes. **Re-read this file from git immediately before editing it** — never
> edit from an earlier copy. Every status change carries a date.
>
> **Use cases live in R2SS, project "PROJ010 - Deckbar gamification".** This plan orders the work; the use
> cases say what "done" means. When the two disagree, the use case wins and this plan is corrected.

**Last updated:** 2026-11-09 (`main` created from the cloud session; R2SS Q026 = ready for 10,000 customers; stack, hosting and budget proposed with the open questions)

Status keys: ✅ done · 🔄 in progress · ⏳ next · ⬜ not started · ⛔ blocked · 🟡 waiting on Vincent

---

## 1. Where we are

| | |
|---|---|
| Phase | **P0 - repository set-up** ✅ 2026-11-08. qc review done, its findings fixed. No app code yet |
| On `main` | `ce056a3` - the whole set-up and P1 so far; created 2026-11-09 from `ccr-67d107f0-67ed0e`, which nobody works on any more. Work continues in cloud sessions, each on its own branch, back to `main` by pull request |
| Released | Not released |
| Next step | 🟡 **Vincent answers `docs/ba-analysis/PROJ010_Clarification_QnA_2026-11-09.md`** (S1-S10 stack, hosting, budget = A6; P1-P13 open questions; R1-R10 R2SS answers to fill). Then the answers go into R2SS, `docs/ARCHITECTURE.md` is written, and ba-agent re-checks the 11 Must use cases against the stack, to READY |
| Blocked on | 🟡 Vincent: A6 (stack, hosting, budget) before any build; set `main` as the default branch on GitHub (B10) |
| Hand-over | KNOWN_ISSUES #6: the hook gaps fixed here are still open in dark-maze-mobile - for its next session |

---

## 2. Decisions taken (dated, never rewritten)

| Date | Decision | By |
|---|---|---|
| 2026-11-08 | A new system (Q084), a web application (Q009), for Deckbar customers in Singapore and an admin (Q010) | Vincent (R2SS) |
| 2026-11-08 | Customers scan a QR code, land on the page, log in or register (at least name and phone number), pick a mini-game, earn points, redeem them for benefits (Q008, Q015) | Vincent (R2SS) |
| 2026-11-08 | Success = 1,000 customers' details collected, and a rise in sales (Q001) | Vincent (R2SS) |
| 2026-11-08 | Notifications (email / SMS / push) are a needed common feature (Q013) | Vincent (R2SS) |
| 2026-11-08 | "Try not to over-engineer it" (Q011) | Vincent (R2SS) |
| 2026-11-08 | Mini-games proposed: darts, memory cards, bottle flip (R2SS use cases) | Vincent (R2SS) |
| 2026-11-08 | Same framework, development process and governance as PROJ003 Dark Maze Mobile: CLAUDE.md, WORKFLOW.md, ba/qc/pm agents, the five hooks, the records in `docs/` | Vincent (this session) |
| 2026-11-08 | Git identity `vuhoang.biz@gmail.com` - PROJ003's rule (its Q202), carried over with the framework; PROJ010's own answer pending (B8) | Copied from PROJ003 |
| 2026-11-08 | Worked on from cloud sessions and from Vincent's laptop; `main` is the shared branch, cloud branches come back by pull request | Vincent (this session); branch rule proposed by Claude Code |
| 2026-11-09 | All 33 decisions of `docs/ba-analysis/PROJ010_Clarification_QnA_2026-11-08.md` accepted as recommended ("accept all"): sign-in first; Google or emailed link; one account per unverified mobile number; 18+ and per-channel consent; 10 points for the first win per game per business day (06:00 Singapore); the server decides; redeem only at the bar with a 10-minute code confirmed on the staff's own screen; Admin and Staff roles; plain bottle, 2D physics; birthday gift and campaigns in Phase 2 | Vincent |
| 2026-11-09 | The laptop checkout lives in `D:\Projects\Proj010 - Deckbar` | Vincent |
| 2026-11-09 | `main` created from the cloud session (option A of the hand-over), not from the laptop; work continues in cloud sessions from here on | Vincent |
| 2026-11-09 | Ready for 10,000 registered customers (R2SS Q026); the Q001 goal of 1,000 is unchanged unless P1 says otherwise | Vincent |

---

## 3. Phases (proposed - Vincent confirms or reorders)

| Phase | What | Status |
|---|---|---|
| P0 | Repository set-up: governance, agents, hooks and their self-test, records, CI | ✅ 2026-11-08 |
| P1 | Requirements to READY: BA pass ✅ 2026-11-08 (all NOT READY); Q&A accepted by Vincent ✅ 2026-11-09; written into R2SS ✅ 2026-11-09 (14 use cases: 11 Must, 2 Phase 2, 1 merged; numbered AC; detail files in `docs/specs/use-cases/`); BA re-check to READY ⏳ after A6 | 🔄 |
| P2 | Stack and hosting chosen (free plans), dev environment up, an empty page reachable from a test QR code | ⬜ |
| P3 | Landing page, register and log in (name + phone), consent | ⬜ |
| P4 | First mini-game end to end with points (the simplest first - proposed: memory cards) | ⬜ |
| P5 | Points ledger and rewards: earn, see, redeem at the bar, admin view | ⬜ |
| P6 | The other mini-games | ⬜ |
| P7 | Notifications and promotion campaigns to registered customers | ⬜ |
| P8 | Pilot at Deckbar, then go-live | ⬜ |

---

## 4. Open questions for Vincent (answer in R2SS PROJ010; the plan follows)

> **2026-11-08/09: the BA pass answered A1-A5, B1-B3 and B7 below, through
> `docs/ba-analysis/PROJ010_Clarification_QnA_2026-11-08.md` (33 decisions, all accepted by Vincent 2026-11-09 and
> written into R2SS). Still open: A6, B4, B5, B6, B8, B9, B10 (default branch only).** (Correction 2026-11-09: the 2026-11-08 note said
> A1-A6 and B1-B7 were all covered; A6, B4, B5 and B6 were not.)

**A. Needed before anything is built**

| # | Question | Where in R2SS | Why it matters |
|---|---|---|---|
| A1 | The 4 use cases have no actors, priority or acceptance criteria; "Scan QR to land on Deckbar gaming page" has no description. Which are in the MVP? | Use Cases; Q071 | Nothing can pass the BA gate without numbered AC |
| A2 | Q015 (business process) stops mid-sentence: "after they play they will ..." - what happens after a game, up to redeeming? | Q015 | The end-to-end flow |
| A3 | Points and rewards: points per game, what each reward costs, how a reward is redeemed at the bar (staff checks a code on the phone?), limits per day or per visit | New use case(s) | Rewards are free drinks: they must not be farmed by replaying |
| A4 | Login: name + phone number with no check, or a one-time code by SMS (costs money per SMS)? One account per phone number? | Q035, Q036 | Security model and spend - ask-first items |
| A5 | Consent and personal data: customers' details are used for promotion (Q008). Singapore's PDPA expects clear consent for that, and SMS/calls to Singapore numbers fall under the Do Not Call rules. Who at Deckbar is responsible for the data, and how long is it kept? | Q034-Q042, Q101 | Compliance - ask-first; worth confirming with someone who knows Singapore law |
| A6 | Tech stack, hosting and budget - proposed 2026-11-09 in `docs/ba-analysis/PROJ010_Clarification_QnA_2026-11-09.md` S1-S10 (Cloudflare Pages + Supabase + Brevo, USD 0 a month; open: Deckbar's domain, backups, account ownership) | Q043, Q050-Q054, Q109 | Decides P2 |

**B. Needed before the item they touch**

| # | Question | Where in R2SS |
|---|---|---|
| B1 | Darts: what are "all characters of Deckbar" - the letters D-E-C-K-B-A-R, or Deckbar's mascot characters? How many darts, how is a throw aimed on a phone? | Use case "Dart mini game" |
| B2 | Memory cards: how many cards, what is "the correct order", any time or tries limit? | Use case "Memory card" |
| B3 | Bottle flip: a Guinness bottle is a brand - use it (Deckbar's arrangement with the brand?) or a plain bottle? "Physics engine, look real" vs "don't over-engineer": is a 2D physics library enough? | Use case "Mini game - Flip the bottle" |
| B4 | Languages: English only, or also Chinese, Malay, Tamil? | Q013 |
| B5 | What does the client contact (Q086) sign off: rewards, design, go-live? Who owns the design (Deckbar's logo, colours)? | Q086, Q088-Q091 |
| B6 | Q008 says "DECPA" and "TechBar" - both read as speech-to-text for "Deckbar"; correct in R2SS? | Q008 |
| B7 | Notifications: which channel first - email, SMS (paid) or browser push? | Q013 |
| B8 | Should PROJ010's own governance answers be filled in R2SS (Q191 and the AI Development Approach area) as copied from PROJ003, so R2SS can generate this project's AI Working Agreement? | Q191 |
| B9 | Keep this repository public, or make it private (PROJ003's is private)? | - (GitHub setting) |
| B10 | ~~Create `main`~~ done 2026-11-09 from the cloud session. Still open: set `main` as the default branch in Settings - Branches (only you can - KNOWN_ISSUES #3); then `ccr-67d107f0-67ed0e` can be deleted | - (GitHub setting) |

---

## 5. Money

| Item | Cost | Status |
|---|---|---|
| Claude subscription | flat, as PROJ003 | in use |
| GitHub Actions | $0 (public repository) | in use |
| Hosting, database, SMS, domain | not chosen | 🟡 A4, A6 |

---

## 6. Change log

| Date | What |
|---|---|
| 2026-11-08 | Repository set up from PROJ003's framework: CLAUDE.md, WORKFLOW.md, README catalogue, ba/qc/pm agents, the five hooks with a self-test (`npm.cmd run test`, 19 checks; the self-test found that check-progress-updated missed a MASTER_PLAN inside a new untracked folder - fixed with `--untracked-files=all`), records in `docs/`, CI on every push. R2SS PROJ010 read: open questions in section 4 |
| 2026-11-08 | qc review of the set-up: hooks now refuse staging in the commit command, identity overrides (`-c user.email`, `--author`, `GIT_AUTHOR_EMAIL=`), check the `git -C` repository, read non-ASCII names, catch Singapore phone numbers and email addresses, check specs at any depth with a dated analysis; self-test 40 checks. AI Working Agreement completed; client contact's name moved out of the public repository; KNOWN_ISSUES #5-#7 (prod/dev trap, the same gaps in dark-maze-mobile, cloud and laptop). Cloud and laptop rules in CLAUDE.md and WORKFLOW.md; laptop setup in README |
| 2026-11-08 | BA pass (ba-agent, 7 checks) on R2SS PROJ010's 8 use cases plus the uncovered points/redemption flow: all NOT READY, 72 questions merged into 33 decisions with recommended answers (`docs/ba-analysis/PROJ010_Clarification_QnA_2026-11-08.md`); 4 new use cases proposed (UC09-UC12 MVP, UC13-UC14 later), UC05 to merge into UC06; 5 conflicts between the analyses resolved in the Q&A. Nothing written to R2SS yet |
| 2026-11-09 | Vincent accepted the Q&A. Written into R2SS PROJ010 (writing switched on by Vincent): Q010 (+Staff), Q015 (completed), Q071, Q074, Q035, Q036, Q037, Q038, Q100, Q101; 8 use cases given description, priority and numbered AC (UC05 merged as Won't; UC06 renamed "Admin view customers and engagement"); 6 created (Earn points from a game, My points and rewards, Redeem a reward at the bar, Staff and admin sign-in - Must; Birthday gift, Promotion campaigns - Phase 2). Nothing refused. 14 detail files `docs/specs/use-cases/UC01-UC14_*_Detail.md`. Hand-over for the laptop session (`D:\Projects\Proj010 - Deckbar`) |
| 2026-11-09 | Cloud session: hand-over steps checked on Linux - self-test 40 passed, 0 failed (Node 22); the session-start reading appeared at session start (KNOWN_ISSUES #4 confirmed for cloud sessions; the laptop is unchecked). `main` pushed from `ccr-67d107f0-67ed0e` at `ce056a3` with Vincent's OK. Vincent: work continues in cloud sessions |
| 2026-11-09 | R2SS Q026 written: ready for 10,000 registered customers (Vincent). `docs/ba-analysis/PROJ010_Clarification_QnA_2026-11-09.md`: stack, hosting and budget proposed (S1-S10, sized for 10,000), 13 open questions (P1-P13, new concerns: staff Google accounts, public repository and bottle-flip anti-cheat, email sender domain) and 10 R2SS answers to fill (R1-R10). Provider pricing pages blocked from the cloud session: figures from web search, marked to check at sign-up |

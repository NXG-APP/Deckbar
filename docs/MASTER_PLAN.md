# Deckbar Games — Master Plan (live)

> **Live document.** Updated by Claude Code at the end of every session that changes any line below, and
> by Vincent whenever he likes. **Re-read this file from git immediately before editing it** — never
> edit from an earlier copy. Every status change carries a date.
>
> **Use cases live in R2SS, project "PROJ010 - Deckbar gamification".** This plan orders the work; the use
> cases say what "done" means. When the two disagree, the use case wins and this plan is corrected.

**Last updated:** 2026-11-08 (repository set up with PROJ003's framework, process and governance; R2SS PROJ010 read)

Status keys: ✅ done · 🔄 in progress · ⏳ next · ⬜ not started · ⛔ blocked · 🟡 waiting on Vincent

---

## 1. Where we are

| | |
|---|---|
| Phase | **P0 - repository set-up** ✅ 2026-11-08, on branch `ccr-67d107f0-67ed0e` (the first branch pushed to an empty repository, so GitHub shows it as the default until `main` is made - KNOWN_ISSUES #3). No app code yet |
| On `main` | Nothing - `main` does not exist yet |
| Released | Not released |
| Next step | **P1 - requirements to READY**: Vincent answers the questions in section 4 (in R2SS PROJ010); then a ba-agent pass per use case |
| Blocked on | 🟡 Vincent: section 4, at least A1-A6 before any build |

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
| 2026-11-08 | Git identity `vuhoang.biz@gmail.com`, as PROJ003 | Vincent (copied from PROJ003) |

---

## 3. Phases (proposed - Vincent confirms or reorders)

| Phase | What | Status |
|---|---|---|
| P0 | Repository set-up: governance, agents, hooks and their self-test, records, CI | ✅ 2026-11-08 |
| P1 | Requirements to READY: section 4 answered in R2SS; each use case gets actors, priority and numbered AC; a ba-agent pass per use case | ⏳ 🟡 |
| P2 | Stack and hosting chosen (free plans), dev environment up, an empty page reachable from a test QR code | ⬜ |
| P3 | Landing page, register and log in (name + phone), consent | ⬜ |
| P4 | First mini-game end to end with points (the simplest first - proposed: memory cards) | ⬜ |
| P5 | Points ledger and rewards: earn, see, redeem at the bar, admin view | ⬜ |
| P6 | The other mini-games | ⬜ |
| P7 | Notifications and promotion campaigns to registered customers | ⬜ |
| P8 | Pilot at Deckbar, then go-live | ⬜ |

---

## 4. Open questions for Vincent (answer in R2SS PROJ010; the plan follows)

**A. Needed before anything is built**

| # | Question | Where in R2SS | Why it matters |
|---|---|---|---|
| A1 | The 4 use cases have no actors, priority or acceptance criteria; "Scan QR to land on Deckbar gaming page" has no description. Which are in the MVP? | Use Cases; Q071 | Nothing can pass the BA gate without numbered AC |
| A2 | Q015 (business process) stops mid-sentence: "after they play they will ..." - what happens after a game, up to redeeming? | Q015 | The end-to-end flow |
| A3 | Points and rewards: points per game, what each reward costs, how a reward is redeemed at the bar (staff checks a code on the phone?), limits per day or per visit | New use case(s) | Rewards are free drinks: they must not be farmed by replaying |
| A4 | Login: name + phone number with no check, or a one-time code by SMS (costs money per SMS)? One account per phone number? | Q035, Q036 | Security model and spend - ask-first items |
| A5 | Consent and personal data: customers' details are used for promotion (Q008). Singapore's PDPA expects clear consent for that, and SMS/calls to Singapore numbers fall under the Do Not Call rules. Who at Deckbar is responsible for the data, and how long is it kept? | Q034-Q042, Q101 | Compliance - ask-first; worth confirming with someone who knows Singapore law |
| A6 | Tech stack, hosting and budget (proposed: a static web app on a free host plus a free-tier database with sign-in; to be confirmed) | Q043, Q050-Q054 | Decides P2 |

**B. Needed before the item they touch**

| # | Question | Where in R2SS |
|---|---|---|
| B1 | Darts: what are "all characters of Deckbar" - the letters D-E-C-K-B-A-R, or Deckbar's mascot characters? How many darts, how is a throw aimed on a phone? | Use case "Dart mini game" |
| B2 | Memory cards: how many cards, what is "the correct order", any time or tries limit? | Use case "Memory card" |
| B3 | Bottle flip: a Guinness bottle is a brand - use it (Deckbar's arrangement with the brand?) or a plain bottle? "Physics engine, look real" vs "don't over-engineer": is a 2D physics library enough? | Use case "Mini game - Flip the bottle" |
| B4 | Languages: English only, or also Chinese, Malay, Tamil? | Q013 |
| B5 | What does Saleem (client) sign off: rewards, design, go-live? Who owns the design (Deckbar's logo, colours)? | Q086, Q088-Q091 |
| B6 | Q008 says "DECPA" and "TechBar" - both read as speech-to-text for "Deckbar"; correct in R2SS? | Q008 |
| B7 | Notifications: which channel first - email, SMS (paid) or browser push? | Q013 |
| B8 | Should PROJ010's own governance answers be filled in R2SS (Q191 and the AI Development Approach area) as copied from PROJ003, so R2SS can generate this project's AI Working Agreement? | Q191 |
| B9 | Keep this repository public, or make it private (PROJ003's is private)? | - (GitHub setting) |

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

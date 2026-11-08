# Deckbar Games — Build Guardrails

A mobile-first web app for Deckbar, a pub in Singapore: a visitor scans a QR code at the bar, lands on the Deckbar
games page, logs in or registers (at least name and phone number), plays simple mini-games (darts, memory cards,
bottle flip), earns points and redeems them for benefits at Deckbar (an extra drink set in happy hour, a surprise
birthday gift). Deckbar keeps the contact details for later promotion campaigns. Goals: collect 1,000 customers'
details and see sales rise (R2SS PROJ010 Q001). "Try not to over-engineer it" (Q011).
Who does what: `WORKFLOW.md`. Every living document: `README.md` ("Project files"). The plain-language
version of these rules: `docs/AI_Working_Agreement_PROJ010_Deckbar.md`.

**Methodology:** Agile (as PROJ003; to confirm in R2SS Q079). **Requirements:** R2SS project "PROJ010 - Deckbar
gamification", read and written over the R2SS MCP connector; the repo holds the *how* (specs in `docs/specs/`,
BA analyses in `docs/ba-analysis/`).

The framework, process and governance are copied from PROJ003 (Dark Maze Mobile, repository
NXG-APP/dark-maze-mobile) on 2026-11-08, at Vincent's request. PROJ010 has not yet answered its own governance
questions in R2SS (Q191 and the AI Development Approach area); until it does, these rules stand as copied, and
any difference agreed later is applied here (`docs/MASTER_PLAN.md` section 4).

**AI autonomy**
- Proceed without asking: implementation details and code structure; bug fixes; writing tests; minor UI
  choices; choosing between equivalent free tools; refactors that change no behaviour.
- Ask first: anything that changes scope; any paid tier or spend (SMS, hosting, domains included); upgrading a
  paid tier or switching to a more expensive model; long or paid generation runs; adding a paid third-party
  service; anything that risks the plan or deadline; login, credentials or the security model (how customers
  log in, how points and rewards are protected from cheating); collecting, keeping or using customers' personal
  data; deleting or migrating data; deploying to production; contacting external people or services; changing
  a standing rule.
- When unsure whether approval is needed: do the part that needs no decision, ask about the rest.

**Standing rules — every time, no exceptions**
- R2SS PROJ010 is the source of truth for what to build: re-read a use case right before writing it, never
  write a status or lock. A use case's acceptance criteria are a numbered list (`AC01 - ...`), short, saying only
  what the app must be able to do - no history, reasons or solutions; a change edits the list itself. Everything
  else - the reason, the date, exact texts, figures, how it is built, the old wording - goes in the same change
  into `docs/specs/use-cases/UCxx_<name>_Detail.md`.
- A BA pass (ba-agent) before any use case is planned or built; a fresh-context review (qc-agent) before it is called done.
- Every customer screen works on a phone browser held upright (R2SS Q009 web application; the games are "mobile friendly").
- User-facing text is in English (assumption until Vincent decides the languages - `docs/MASTER_PLAN.md` section 4).
- No real customer data (names, phone numbers, emails, birthdays) in git, tests, screenshots, logs or chat; tests use
  made-up data: phone numbers `+65 0xxx xxxx` (not a Singapore number range), emails at `example.com` *(hook: check-no-secrets)*.
- Never use the Google Drive connector unless the product owner asks for it in that session.
- No invisible Unicode (soft hyphen U+00AD, zero-width space U+200B, non-BOM U+FEFF) in committed text.
- No secrets in git.
- Commands for the product owner (Windows PowerShell) are `npm.cmd run <script>`, never bare `npm`/`npx`;
  commands that carry identifiers live in committed scripts, not in chat.
- Keep `docs/MASTER_PLAN.md` live: re-read it from git right before editing, update it at the end of every
  session that changed anything in it.
- Never edit the R2SS or dark-maze-mobile repositories from this project; anything they need is done in their own sessions.

**Hard constraints**
- This repository is **public**: everything committed can be read by anyone. Nothing confidential goes in -
  no secrets, no customer data, no client commercial terms (KNOWN_ISSUES #1).
- Budget: not set in R2SS (Q043, Q078). Until it is: $0 running cost on free plans; anything paid is the product
  owner's decision first. AI usage: Claude subscription, flat - no API keys or pay-per-use AI (as PROJ003).
- Dates: MVP date and project end date not set (Q073, Q077).
- Git identity: one fixed identity for the repository — commit only as `vuhoang.biz@gmail.com`; verify before every commit. *(hook: verify-git-identity)*
- Secrets live in GitHub Actions secrets or the hosting provider's variables. Never written into code, docs,
  commits or chat: passwords; API keys and tokens; connection strings; customer or personal data. *(hook: check-no-secrets)*

**Verification and reporting**
- Done means: the tests pass (`npm.cmd run test` - exits non-zero on a failure; GitHub Actions runs it on every
  push and pull request - free for a public repository); verified live on a dev environment; qc-agent review;
  a person has reviewed it; the docs that describe it are updated in the same change.
- Before reporting a change as done, show: the test output; the diff; a screenshot or recording. Never report from intent.

**Environments and deployment**
- Environments: not chosen yet (R2SS Q109, Q054). Act on dev only. Confirm which environment before any
  command that changes data or a running build.
- Production means the live site customers reach from the QR code, and its customer data — published by the
  product owner. Production data is never read or changed by the AI. Procedure: `docs/DEPLOYMENT_RUNBOOK.md`;
  record: `docs/DEPLOYMENT_HISTORY.md`.

**Cloud and laptop** — the repository is worked on from Claude Code on the web (cloud sessions) and from a checkout
on Vincent's Windows laptop (setup: `README.md`). Git is the only link between them:
- `main` is the shared branch. A cloud session works on its own branch and comes back to `main` by pull request;
  the laptop works on `main` or a branch of its own.
- Never work on the same branch from both places at once. Pull before starting; push before stopping - a cloud
  session's copy is fresh each time and sees nothing that was not pushed (KNOWN_ISSUES #7).
- `docs/MASTER_PLAN.md` is the file most likely to collide: re-read it from git right before editing, as below.
- Stage first, then `git commit` on its own: the commit hooks refuse a commit that stages in the same command.

**Every session**
- Start: read `docs/MASTER_PLAN.md` first, then `docs/KNOWN_ISSUES.md`; pull the latest code; re-read these standing rules. *(hook: session-start)*
- During: commit locally as the work goes; push at the end of the session or a finished item.
- End: update `docs/MASTER_PLAN.md`; log risks accepted in `docs/KNOWN_ISSUES.md`; commit and push; update
  the spec or backlog for what was built. *(hook: check-progress-updated)*
- A known risk left unfixed goes into `docs/KNOWN_ISSUES.md`, not only into chat.

**Agents** (`.claude/agents/`): **ba-agent** — requirements check before anything is planned or built; writes
`docs/ba-analysis/<feature>_BA_Analysis_<YYYY-MM-DD>.md`, and a spec `docs/specs/<feature>_Spec.md` cannot be
committed without it *(hook: check-ba-analysis)*; **qc-agent** — fresh-eyes adversarial review of a finished
change, by an AI that did not write it; **pm-agent** — keeps the records (MASTER_PLAN, known issues,
deployment history) and takes over repeated tasks as they are handed over.

**Enforced automatically** (`.claude/hooks/`, wired in `.claude/settings.json`; self-tested by
`tests/test-hooks.js`): a commit is blocked on the wrong git identity (an override in the command included), a
staged secret or personal data, a spec without its BA analysis, or staging in the same command; a turn cannot end while code changed and `docs/MASTER_PLAN.md` did not; the start-of-session reading
is injected at session start. Each commit hook names a one-shot escape variable in its header — use it
deliberately, from your own terminal, and say so in the commit message.

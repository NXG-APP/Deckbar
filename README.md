# Deckbar Games

A mobile-first web app for Deckbar, a pub in Singapore. A visitor scans a QR code at the bar, logs in or
registers, plays a short mini-game, earns points and redeems them for benefits at Deckbar.
Requirements: R2SS project **PROJ010 - Deckbar gamification**.

Status: repository set up (2026-11-08); no app code yet. Where things stand: `docs/MASTER_PLAN.md`.

## Commands (Windows PowerShell)

| Command | What |
|---|---|
| `npm.cmd run test` | The one test command. Today: the self-test of the governance hooks (`tests/test-hooks.js`, 40 checks). GitHub Actions runs it on every push and pull request |

## On the laptop (once)

Work happens both in Claude Code on the web and on this checkout; rules in `CLAUDE.md` "Cloud and laptop".

1. Install Git for Windows and Node.js 20 or later.
2. Clone into the laptop folder `D:\Projects\Proj010 - Deckbar` (Vincent 2026-11-09):
   `git clone https://github.com/NXG-APP/Deckbar.git "D:\Projects\Proj010 - Deckbar"`, then in the folder:
   `git config user.email vuhoang.biz@gmail.com` and `git config user.name "Vincent Le"` - the commit hook refuses any other identity.
3. `npm.cmd run test` - must end `0 failed`; it proves the hooks run on this machine.
4. Start Claude Code in the folder: the session-start reading appears first (KNOWN_ISSUES #4).
5. Every time: `git pull` before starting, push before stopping; never the branch a cloud session is using.

## Layout

| Path | What |
|---|---|
| `.claude/agents/` | ba-agent, qc-agent, pm-agent |
| `.claude/hooks/` · `.claude/settings.json` | The automatic checks (below) and their wiring |
| `.github/workflows/test.yml` | CI: `npm test` on every push and pull request |
| `docs/` | The records (below), `ba-analysis/`, `specs/`, `specs/use-cases/` |
| `tests/` | Tests; `tests/test-hooks.js` checks the hooks |

The app's own folders arrive with the stack (MASTER_PLAN A6); `.claude/hooks/check-progress-updated.js` lists
which folders count as code.

## Project files

Every file that carries a rule or a record, who updates it, and the event that makes it need updating. A file
not in this table is not a record — code is listed by the specs, not here.

| File | What it is for | Who updates it | Trigger |
|---|---|---|---|
| `CLAUDE.md` | The build guardrails Claude Code reads every session: autonomy, standing rules, hard constraints, definition of done, environments, session start/end, agents and hooks | Owner decides; Claude Code edits | A new rule is agreed, or an incident teaches one |
| `WORKFLOW.md` | Who does what: tools, people, agents, git, definition of done, the feature loop | Owner decides; Claude Code edits | A role or a tool changes |
| `README.md` (this table) | The catalogue of the files above and below | Claude Code | A record file is added, removed or changes owner |
| `docs/MASTER_PLAN.md` | The progress file: where we are, decisions, phases, open questions, money, change log. Read first every session | pm-agent / Claude Code; Vincent may edit | End of every session that changed it; a task changes status |
| `docs/KNOWN_ISSUES.md` | Every risk deliberately left unfixed, in six fixed fields, with its revisit trigger | pm-agent writes; owner sets Status | A risk is accepted or deferred; a revisit trigger fires |
| `docs/ba-analysis/<feature>_BA_Analysis_<YYYY-MM-DD>.md` | ba-agent's verdict on a spec or use case before it is built | ba-agent | Before any use case is planned or built |
| `docs/ba-analysis/PROJ010_Clarification_QnA_<YYYY-MM-DD>.md` | The BA questions of a pass merged into one list of decisions with recommended answers, for the owner to answer | Claude Code from the ba-agent analyses, or from its own proposals (e.g. the stack); owner answers | After a BA pass over several use cases, or when several owner decisions are pending |
| `docs/specs/<feature>_Spec.md` | How a feature is built; cannot be committed without its BA analysis | Claude Code | A feature is planned |
| `docs/specs/use-cases/UCxx_<name>_Detail.md` | One per R2SS use case: everything its numbered acceptance criteria leave out - exact texts, figures, how it is built, decisions with their reasons and dates, and the criteria's old wording | Claude Code | The use case's criteria change in R2SS (same change) |
| `docs/DEPLOYMENT_RUNBOOK.md` | How production changes safely: confirm the environment, backup, tag, release, rollback | Owner decides; pm-agent keeps it in step with the history | A release step changes; a rollback happens |
| `docs/DEPLOYMENT_HISTORY.md` | One line per production release and per credential rotation (never a value) | pm-agent | Every production release; every rotation |
| `docs/AI_Working_Agreement_PROJ010_Deckbar.md` | The rules above in plain language, for people. Adapted by hand from PROJ003 until PROJ010's governance is answered in R2SS | Owner; regenerate in R2SS and apply the difference by hand | A rule changes in R2SS |
| `.claude/agents/ba-agent.md` · `qc-agent.md` · `pm-agent.md` | Requirements gate, fresh-eyes review, the project's record keeper. pm-agent's Duties list grows as the owner hands over more | Owner decides; Claude Code edits | A duty is added; a check changes |
| `.claude/hooks/*` + `.claude/settings.json` · `tests/test-hooks.js` | Automatic checks: git identity, no secrets, BA analysis before a spec, MASTER_PLAN updated before a turn ends, the session-start reading - and their self-test | Claude Code | A rule becomes enforced, or an escape is used (say so in the commit) |

## Origin

The framework, process and governance are those of PROJ003 Dark Maze Mobile (NXG-APP/dark-maze-mobile), copied
and adapted on 2026-11-08. Differences: no game-specific rules (6 languages, host/guest, builds); added rules for
customers' personal data, phone-first screens and a public repository; CI runs on every push (free for a
public repository); the progress hook also sees files inside new, untracked folders.

# Known Issues

Risks deliberately left unfixed, each with the condition that should make us look again — so "we decided to
accept this" is a record, not a memory. Written by pm-agent; the product owner sets Status. Numbered, newest
last; an entry is never deleted, only its Status changes. Every entry has exactly these six fields:

- **Date logged** · **Item** (short title) · **Impact/Risk level** (Low / Medium / High) ·
  **Status** (To be reviewed / To be fixed / Fixed / Won't fix) · **Revisit trigger** (a condition, not a date) ·
  **Details** (context, findings, reasoning)

---

## 1. The repository is public

- **Date logged:** 2026-11-08
- **Item:** NXG-APP/Deckbar is public, while the project will hold a client's plans and collect customers' personal data.
- **Impact/Risk level:** Medium
- **Status:** To be reviewed
- **Revisit trigger:** Before anything about Deckbar's commercial terms, reward costs or customer data would be committed; or before the first real customer registers.
- **Details:** Public means free GitHub Actions minutes and nothing to hide in code, but every spec, BA analysis
  and record is readable by anyone. PROJ003's repository is private. The guards for now: the hard constraint in
  `CLAUDE.md` (nothing confidential committed), `.gitignore` refusing `*.csv` and `exports/`, and the
  check-no-secrets hook. Making it private is Vincent's decision (MASTER_PLAN B9); if private, CI minutes are
  counted and the workflow may need PROJ003's weekly schedule.

## 2. PROJ010's governance is copied, not yet answered in R2SS

- **Date logged:** 2026-11-08
- **Item:** The rules in `CLAUDE.md` come from PROJ003's R2SS answers; PROJ010's own Q191 and AI Development Approach area are empty.
- **Impact/Risk level:** Low
- **Status:** To be reviewed
- **Revisit trigger:** Vincent answers Q191 / the AI Development Approach area in PROJ010, or decides a rule differs from PROJ003.
- **Details:** Until then R2SS is not the source for this project's working rules, and
  `docs/AI_Working_Agreement_PROJ010_Deckbar.md` is hand-adapted, not generated. Fix: fill the answers in R2SS
  (MASTER_PLAN B8), regenerate, and apply the difference here by hand.

## 3. The default branch is the session branch

- **Date logged:** 2026-11-08
- **Item:** The repository was empty; the first branch pushed (`ccr-67d107f0-67ed0e`) became GitHub's default branch. There is no `main`.
- **Impact/Risk level:** Low
- **Status:** To be reviewed
- **Revisit trigger:** The first pull request is opened, or the first build is deployed.
- **Details:** Fix (Vincent, on GitHub): create `main` from this branch, set it as the default in Settings - Branches,
  and from then on work arrives on `main` by pull request.

## 4. Hooks only apply to sessions started after they are committed

- **Date logged:** 2026-11-08
- **Item:** `.claude/settings.json` is read when a Claude Code session starts; the session that set the repository up was not guarded by its own hooks.
- **Impact/Risk level:** Low
- **Status:** To be reviewed
- **Revisit trigger:** The first session started on a checkout that contains `.claude/settings.json` - confirm the session-start reading appears.
- **Details:** The set-up session checked the same things by hand: the git identity before committing, and the
  hook self-test (`npm.cmd run test`, 19 passed).

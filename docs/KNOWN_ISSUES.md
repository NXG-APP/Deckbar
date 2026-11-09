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
  check-no-secrets hook (which also refuses Singapore phone numbers and email addresses outside an allow-list).
  Already public by design: the owner's email `vuhoang.biz@gmail.com` (the agreed git identity, in commit
  metadata, `CLAUDE.md`, the hooks and the tests) and the owner's first name. The client contact's name is kept
  in R2SS, not here. Making the repository private is Vincent's decision (MASTER_PLAN B9); if private, CI minutes
  are counted and the workflow may need PROJ003's weekly schedule.

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
  2026-11-09: `main` created from `ccr-67d107f0-67ed0e` (`ce056a3`) by the cloud session, with Vincent's OK. Still
  to do (Vincent): set `main` as the default branch; then the old branch can be deleted.

## 4. Hooks only apply to sessions started after they are committed

- **Date logged:** 2026-11-08
- **Item:** `.claude/settings.json` is read when a Claude Code session starts; the session that set the repository up was not guarded by its own hooks.
- **Impact/Risk level:** Low
- **Status:** To be reviewed
- **Revisit trigger:** The first session started on a checkout that contains `.claude/settings.json` - confirm the session-start reading appears.
- **Details:** The set-up session checked the same things by hand: the git identity before committing, and the
  hook self-test (`npm.cmd run test`).
  2026-11-09: confirmed in a cloud session started on the committed checkout - the session-start reading appeared
  unprompted. Not yet checked on the laptop. Status for Vincent to set.

## 5. Production/dev mix-up is the known trap

- **Date logged:** 2026-11-08
- **Item:** Dev and production will differ only by where a build is sent and which address the QR code opens; a command or a QR code aimed at the wrong one passes silently.
- **Impact/Risk level:** High
- **Status:** To be reviewed
- **Revisit trigger:** The environments are chosen (MASTER_PLAN A6); the first printed QR code; the first production release.
- **Details:** Carried over from PROJ003 (its KNOWN_ISSUES #2). The AI acts on dev only; production is done by the
  product owner. The guard is procedural (`docs/DEPLOYMENT_RUNBOOK.md`, "STOP — confirm the environment");
  nothing enforces it automatically. Here it has a second form: a QR code printed for the bar that points at dev
  would send real customers' details into the dev database.

## 6. The hook gaps found here also exist in dark-maze-mobile

- **Date logged:** 2026-11-08
- **Item:** The qc review of this set-up found holes in the hooks copied from PROJ003; they are fixed here but still open in NXG-APP/dark-maze-mobile.
- **Impact/Risk level:** Medium
- **Status:** To be reviewed
- **Revisit trigger:** The next dark-maze-mobile session - hand it this entry (this project never edits that repository).
- **Details:** In dark-maze-mobile's `.claude/hooks/`: (a) `git add . && git commit` and `git commit -a` / `<path>`
  pass check-no-secrets and check-ba-analysis, which see the index before the command runs; (b) `-c user.email=`,
  `--author` and a `GIT_AUTHOR_EMAIL=` prefix pass verify-git-identity, and the `VAR=x git commit` form skips every
  commit hook; (c) `git -C <other repo> commit` is checked against the session's folder; (d) a non-ASCII file name
  makes check-no-secrets skip the file silently; (e) check-progress-updated misses a MASTER_PLAN inside a new
  untracked folder and counts a deleted MASTER_PLAN as an update; (f) check-ba-analysis ignores specs two folders
  deep and accepts an analysis without its date. The fixed versions and their 40-check self-test are in this
  repository's `.claude/hooks/` and `tests/test-hooks.js`.

## 7. The same branch edited from the cloud and the laptop

- **Date logged:** 2026-11-08
- **Item:** Work happens in cloud sessions and on Vincent's laptop; two places on one branch, or unpushed work, ends in a conflict or in a session working from an old copy.
- **Impact/Risk level:** Medium
- **Status:** To be reviewed
- **Revisit trigger:** The first merge conflict, or the first session that finds work it expected missing.
- **Details:** The rule (`CLAUDE.md` "Cloud and laptop"): `main` shared, one branch per place, pull before starting,
  push before stopping. Procedural only - nothing checks it. `docs/MASTER_PLAN.md` is edited in every session and is
  the most likely conflict; it is re-read from git right before each edit.

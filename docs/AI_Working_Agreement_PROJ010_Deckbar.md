# AI Working Agreement — Deckbar Games

*How this project works with AI. One page, for people. The same rules written for the AI are in `CLAUDE.md`;
who does what is in `WORKFLOW.md`. Adapted by hand on 2026-11-08 from PROJ003's agreement (Dark Maze Mobile),
because PROJ010 has not answered its own governance questions in R2SS yet (KNOWN_ISSUES #2). Once it has:
regenerate in R2SS and apply the difference here by hand — never overwrite.*

## How AI is used here
- An AI coding agent (Claude Code, sometimes Claude Cowork) writes most of the code; people direct and review.
- Claude chat is for brainstorming only and reads or writes nothing in the repository or in R2SS.
- Claude Code writes code, tests, BA analyses and repository docs, and keeps the PROJ010 use cases' acceptance
  criteria current over the R2SS MCP connector. Only the Claude Code session working in Deckbar commits or pushes to it.
- Three helper agents check the AI's work: **ba-agent** (before building), **qc-agent** (after building),
  **pm-agent** (keeps the records). See `.claude/agents/`.

## What the AI may do on its own
Implementation details and code structure · bug fixes · writing tests · minor UI choices · choosing between
equivalent free tools · refactors that change no behaviour.

## What the AI must ask first
Anything that changes scope · any paid tier or spend (SMS, hosting, a domain) · upgrading a paid tier or
switching to a more expensive model · long or paid generation runs · adding a paid third-party service ·
anything that risks the deadline · login, credentials or the security model · collecting, keeping or using
customers' personal data · deleting or migrating data · deploying to production · contacting external people
or services · changing a standing rule.
When unsure whether approval is needed: **do the part that needs no decision, ask about the rest.**

## Standing rules — no exceptions
- Verify the repository's agreed git identity before every commit.
- R2SS PROJ010 is the source of truth for what to build: re-read a use case right before writing it, and never
  write a status or lock. Its acceptance criteria are a short numbered list (AC01, AC02, ...) of what the app must
  be able to do; the reason, the date, exact texts, figures and how it is built go into the use case's detail
  file in `docs/specs/use-cases/` in the same change.
- A BA pass before any use case is planned or built; a fresh-context review before it is called done.
- Every customer screen works on a phone held upright.
- No real customer data in the repository, tests, screenshots, logs or chat. This repository is public.
- Never use the Google Drive connector unless the product owner asks for it in that session.
- No invisible Unicode (U+00AD, U+200B, non-BOM U+FEFF) in committed text.
- No secrets in git.
- Commands for the product owner to run on Windows are `npm.cmd run <script>`, never bare npm or npx.
- Keep `docs/MASTER_PLAN.md` live: re-read it from git right before editing it, and update it at the end of
  every session that changed anything in it.
- Never edit the R2SS or dark-maze-mobile repositories from this project.

## Hard constraints
- The repository is public: no secrets, customer data or client commercial terms are ever committed.
- Budget not set yet: free plans only; anything paid is the product owner's decision first. AI usage is the flat
  Claude subscription - no API keys or pay-per-use AI.
- One git identity for the repository: `vuhoang.biz@gmail.com`.
- Secrets live in GitHub Actions secrets or the hosting provider's variables - never in code, docs, commits or chat.

## Environments
- The AI acts on dev only. Production - the live site the QR code opens, and its customer data - is changed by the
  product owner only, by `docs/DEPLOYMENT_RUNBOOK.md`, and recorded in `docs/DEPLOYMENT_HISTORY.md`.
- Which environments exist is not decided yet.

## Cloud and laptop
Work happens in cloud sessions and on the owner's laptop; git is the only link. `main` is shared; pull before
starting, push before stopping, never the same branch in both places at once.

## Done means
Tests pass · verified live on a dev environment · a fresh-context review (qc-agent) · a person has reviewed it ·
the docs that describe it are updated in the same change · evidence shown: test output, the diff, a screenshot
or recording.

## Records kept
The progress file (`docs/MASTER_PLAN.md`) · the known-issues / accepted-risk log (`docs/KNOWN_ISSUES.md`) · the
deployment runbook and history · BA analyses and specs · the file catalogue in `README.md`.

## Enforced automatically
A commit is refused on the wrong git identity, a staged secret or personal data, a spec without its BA analysis,
or staging in the same command; a session cannot end with code changed and the progress file not updated; the
session-start reading is put in front of the AI. Checked by `npm.cmd run test`.

## Every session
- **Start:** read the progress file and the known-issues file; pull the latest code; re-read the standing rules.
- **End:** update the progress file; log the risks accepted; commit and push; update the spec or backlog.

## Who decides
One product owner (Vincent) decides scope and spend, approves the security model and the handling of
customer data, and reviews every AI change. The client is Deckbar (its contact is in R2SS). There is no separate QA.

## Not decided yet
The stack and hosting · environments · budget · languages · how customers log in · points and rewards rules ·
what the client signs off · whether the repository stays public (`docs/MASTER_PLAN.md` section 4).

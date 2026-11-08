# Deckbar Games — Workflow: who does what

The rules live in `CLAUDE.md`; this file says who applies them. Every file named here is in the
`README.md` catalogue ("Project files"). Copied from PROJ003 (Dark Maze Mobile) on 2026-11-08.

## Tools and roles

| Tool | Role | Touches the repository? |
|---|---|---|
| Claude (chat) | Brainstorming only; reads or writes nothing in the repository or in R2SS | No |
| Claude Code (and sometimes Claude Cowork) | Writes code, tests, BA analyses and repository docs; keeps the PROJ010 use cases' numbered acceptance criteria current over the R2SS MCP connector (details and history in `docs/specs/use-cases/`) | Yes — the only git tool. Only the Claude Code session working in Deckbar commits or pushes to it; r2ss and dark-maze-mobile sessions never edit this repository |
| ba-agent (`.claude/agents/ba-agent.md`) | Requirements check before anything is planned or built | Writes BA analyses in `docs/ba-analysis/` |
| qc-agent (`.claude/agents/qc-agent.md`) | Fresh-eyes review of a finished change, by an AI that did not write it | No — reports findings only |
| pm-agent (`.claude/agents/pm-agent.md`) | Keeps the records (MASTER_PLAN, known issues, deployment history) and takes over repeated tasks as they are handed over | Records in `docs/` only, never code |

## Who decides

- **One product owner** (Vincent, R2SS Q086): decides scope and spend, approves the security model and how
  customer data is handled, reviews every AI change and tries each build on a phone.
- **The client** (Deckbar; the contact is named in R2SS Q086, not here - the repository is public): what the
  client signs off (rewards, design, go-live) is not yet agreed - `docs/MASTER_PLAN.md` section 4.
- There is no separate QA — qc-agent plus the owner's review is the QA.
- Spend is approved by the product owner before any paid plan, paid model or paid service.

## Git

- One fixed identity for the repository: `vuhoang.biz@gmail.com` *(hook: verify-git-identity)*.
- Commit; push; never rewrite published history; tag releases — see `docs/DEPLOYMENT_RUNBOOK.md`.
- Stage first, then `git commit` on its own (the commit hooks check only what is already staged).
- `main` is the shared branch; cloud session branches come back to it by pull request, reviewed by the owner.

## Cloud and laptop

| | Cloud (Claude Code on the web) | Laptop (Windows, Claude Code locally) |
|---|---|---|
| Copy of the repository | Fresh clone each session | One checkout, kept |
| Branch | The session's own branch | `main` or a branch of its own |
| Start | Pull; read MASTER_PLAN and KNOWN_ISSUES (hook) | `git pull`; the same reading (hook) |
| End | Commit, push, pull request to `main` | Commit, push |
| Owner's commands | - | `npm.cmd run <script>` |

Never the same branch in both places at once (KNOWN_ISSUES #7).

## Definition of done

Tests pass · verified live on a dev environment · qc-agent review · a person has reviewed it · the docs that
describe it are updated in the same change · evidence shown: test output, diff, screenshot or recording.

## A feature, end to end

1. The owner and Claude Code frame the use case in R2SS PROJ010; the detail spec goes in `docs/specs/`.
2. **ba-agent** reviews it — not ready → back to step 1.
3. Claude Code builds it; spec and backlog status move in the same change. The use case is re-read in R2SS
   right before writing to it; no status or lock is written. Its acceptance criteria stay a short numbered list of
   what the app must do; the reason, date and detail of a change go into `docs/specs/use-cases/UCxx_<name>_Detail.md`.
4. **qc-agent** reviews the diff with fresh eyes; findings are fixed.
5. The owner reviews the evidence; done.
6. **pm-agent** records it: `docs/MASTER_PLAN.md`, accepted risks in `docs/KNOWN_ISSUES.md`, the spec or backlog updated for what was built.

## Session start and end

- **Start:** read `docs/MASTER_PLAN.md`, then `docs/KNOWN_ISSUES.md`; pull the latest code; re-read the standing rules *(hook: session-start)*.
- **End:** update `docs/MASTER_PLAN.md`; log accepted risks; commit and push; update the spec or backlog for what was built *(hook: check-progress-updated)*.

`docs/MASTER_PLAN.md` is the progress file: re-read it from git right before editing, and update it at the
end of every session that changed anything in it.

## Long term

Built and maintained by AI tools under the product owner's direction, as PROJ003 (assumption — answer Q046 in
R2SS PROJ010 to change it).

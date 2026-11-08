# Production Deployment History — Deckbar Games

> **For ba-agent** — *what this file is for:* what production actually runs and how it got there, so a
> rollback knows which tag and which backup to return to, and a rotated credential is a known event with a
> known blast radius. *Complete before:* the first production release — the first line is written that day.
> *Ask the owner:* what counts as a release here (a site deploy, a database change, a config change); who
> writes the line. *Kept current by:* pm-agent, one line per release and per credential rotation, in the same
> session. Remove this block once the first line exists.

Procedure: `docs/DEPLOYMENT_RUNBOOK.md`. Every production release gets a line — no exceptions, hot-fixes and
"redeploy, nothing changed" included.

## Releases

| Date | Target | Tag | Commit SHA | Backup | What shipped |
|---|---|---|---|---|---|

## Credential rotations (never a value)

| Date | Credential (name only) | Where it lives | Why | Blast radius |
|---|---|---|---|---|

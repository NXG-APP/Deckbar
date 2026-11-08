# Deployment Runbook — Deckbar Games

> **For ba-agent** — *what this file is for:* the only way production changes, so a late-night release follows
> the same steps as a midday one, and "which environment am I in?" is asked before each command.
> *Complete before:* the first production release - the first time the QR code at Deckbar points to a live
> build. Every `{{FILL}}` below must be a real command by then.
> *Ask the owner:* where dev and production run (R2SS Q054, Q109); how the environments are told apart; what
> counts as a backup of the customer and points data; who runs a release - the AI with confirmation, or only
> the owner (as PROJ003: only the owner); what "rollback" means for a site customers are using at the bar.
> *Kept current by:* pm-agent, in step with `docs/DEPLOYMENT_HISTORY.md`. Remove this block once complete.

## What "production" means here

- **The live site** that the QR code at Deckbar opens, and its data: customer accounts (name, phone number),
  points and redeemed rewards. `{{FILL: host and address, once chosen - Q054}}`

## STOP — confirm the environment

| | Ref | Used by |
|---|---|---|
| Dev | `{{FILL: dev / preview address and database}}` | Claude Code, Vincent |
| Prod | `{{FILL: production address and database}}` | Deckbar's customers and staff |

Before **any** command that creates, changes or removes a release or data: say which environment you mean,
then check the target matches. A mismatch means stop, not continue.

## Rules (from `CLAUDE.md`)

- The AI acts on dev only; the product owner runs every production step.
- Production customer data is never read or changed by the AI, and never copied into dev.
- No production change without the backup step below (procedure — no hook enforces it).
- Every production release gets one line in `docs/DEPLOYMENT_HISTORY.md`.

## Before every release

1. `main` is green: the tests pass, qc-agent has reviewed what is about to ship.
2. Sign-in check: `{{FILL: login / auth check command}}` — catch an expired session here, not at the last step.
3. **Backup:** `{{FILL: backup command for customer and points data}}` → `{{FILL: where backups are stored}}`,
   named `deckbar-prod-YYYY-MM-DD-HHMM`.

## Release

4. Tag `prod-YYYY-MM-DD-HHMM` on the commit being released.
5. Release: `{{FILL: release command}}`.
6. Verify on the running build, from a phone: the QR code opens the page, log in works, the change shipped, one feature that already existed.
7. pm-agent writes the line in `docs/DEPLOYMENT_HISTORY.md`: date, target, tag, commit SHA, backup, one-line summary.

## Rollback

`{{FILL: how to return to the previous tag, and what happens to points earned since}}`

#!/usr/bin/env node
// Hook - check-progress-updated (Stop)
// When the agent is about to end its turn and code has changed since the last commit (or was committed in
// the last 8 hours) while docs/MASTER_PLAN.md was not updated, the agent is told to update MASTER_PLAN
// first (pm-agent duty 2). Rule: CLAUDE.md "Every session - End".
// Sees files inside new, untracked folders and non-ASCII names; a deleted MASTER_PLAN is not an update
// (qc review 2026-11-08, finding 7).
// `stop_hook_active` is true when the agent is continuing because this hook blocked before - then the stop
// is allowed, so it can never loop.
// Escape: PROJ010_DECKBAR_SKIP_PROGRESS=1

const { execSync } = require("child_process");
const { readInput } = require("./_common");

const PROGRESS = "docs/MASTER_PLAN.md";
// Code in this repository: the app's folders (the layout is set when the stack is chosen - R2SS Q050; widen
// this then), the hooks and agents, CI, and code or config files at the root.
const CODE = /^(app|src|web|public|server|api|functions|supabase|tests|tools|\.claude|\.github)\/|^[^/]+\.(html|css|js|mjs|cjs|ts|tsx|jsx|json)$/;

const input = readInput();
if (!input || input.stop_hook_active) process.exit(0);
if (process.env.PROJ010_DECKBAR_SKIP_PROGRESS === "1") process.exit(0);
if (input.cwd) { try { process.chdir(input.cwd); } catch { /* keep cwd */ } }

function git(cmd) {
  try { return execSync(`git --no-optional-locks -c core.quotePath=false ${cmd}`, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }); } catch { return ""; }
}

// `git status --porcelain`: "XY path" or "XY old -> new"; paths with spaces come quoted.
const unquote = (p) => p.replace(/^"(.*)"$/, "$1");
const status = git("status --porcelain --untracked-files=all").split("\n").filter(Boolean).map((l) => ({
  xy: l.slice(0, 2), path: unquote(l.slice(3).split(" -> ").pop().trim()),
}));
const recent = git('log --since="8 hours ago" --name-only --diff-filter=ACMR --pretty=format:').split("\n").map((l) => l.trim()).filter(Boolean);
const codeTouched = status.map((s) => s.path).concat(recent).some((f) => CODE.test(f));
const progressTouched = status.some((s) => s.path === PROGRESS && !s.xy.includes("D")) || recent.includes(PROGRESS);

if (!codeTouched || progressTouched) process.exit(0);

process.stdout.write(JSON.stringify({
  decision: "block",
  reason: `Code changed in this session but ${PROGRESS} was not updated. Before ending: record what was done, what is on main / released, and the one immediate next step (CLAUDE.md session end; pm-agent duty 2). Then stop.`,
}));
process.exit(0);

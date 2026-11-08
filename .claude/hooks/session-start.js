#!/usr/bin/env node
// Hook - session-start (SessionStart)
// Puts the session-start rule in front of the agent before its first action: read docs/MASTER_PLAN.md,
// then docs/KNOWN_ISSUES.md, verify claims against the real tree, report, wait - pm-agent duty 1.
// Rule: CLAUDE.md "Every session - Start". The hook injects context; it does not read the files itself, so
// the agent reads the current version, not a copy this hook took.
// No escape: reading two files costs nothing; forgetting them costs a session.

const fs = require("fs");
const { readInput } = require("./_common");

const PROGRESS = "docs/MASTER_PLAN.md";
const KNOWN_ISSUES = "docs/KNOWN_ISSUES.md";

const input = readInput() || {};
if (input.cwd) { try { process.chdir(input.cwd); } catch { /* keep cwd */ } }

const missing = [PROGRESS, KNOWN_ISSUES].filter((f) => !fs.existsSync(f));

const lines = [
  "Session start (CLAUDE.md, pm-agent duty 1) - before anything else:",
  `1. read all of ${PROGRESS} - section 1 "Where we are" is current, the change log is history;`,
  `2. read ${KNOWN_ISSUES} and name every entry whose revisit trigger has fired;`,
  "3. verify before repeating: git log --oneline -5, git status --short, and confirm anything claimed as built really exists;",
  "4. if the product owner's first message is a task, do it; otherwise report where we are, what is open, and the ONE next step - then wait.",
];
if (missing.length) {
  lines.push(`Missing: ${missing.join(", ")} - ask the product owner before doing anything else.`);
}

process.stdout.write(JSON.stringify({
  hookSpecificOutput: { hookEventName: "SessionStart", additionalContext: lines.join("\n") },
}));
process.exit(0);

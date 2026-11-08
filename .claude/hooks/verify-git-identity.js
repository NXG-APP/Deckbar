#!/usr/bin/env node
// Hook - verify-git-identity (PreToolUse, Bash|PowerShell)
// Blocks `git commit` unless the commit will carry the agreed identity: git user.email, and no override in
// the command (`-c user.email=`, `--author`, `GIT_AUTHOR_EMAIL=` / `GIT_COMMITTER_EMAIL=`) or in the
// environment naming another address (qc review 2026-11-08, finding 2).
// Rule: CLAUDE.md "Hard constraints - Git identity" (PROJ003 Q202; PROJ010 not answered yet - KNOWN_ISSUES #2).
// Escape (deliberate, one commit, say so in the commit message): PROJ010_DECKBAR_SKIP_IDENTITY=1
// Test: npm.cmd run test (tests/test-hooks.js)

const { execSync } = require("child_process");
const { commitHook, deny } = require("./_common");

const EXPECTED = "vuhoang.biz@gmail.com";

const { command } = commitHook("verify-git-identity", "PROJ010_DECKBAR_SKIP_IDENTITY");

let configured = "";
try { configured = execSync("git config user.email", { encoding: "utf8" }).trim(); } catch { configured = ""; }
if (configured !== EXPECTED) {
  deny(`Git identity mismatch: configured "${configured}", expected "${EXPECTED}" (CLAUDE.md hard constraint). Fix with: git config user.email ${EXPECTED}`);
}

const VALUE = `("(?:\\\\.|[^"\\\\])*"|'[^']*'|[^\\s;&|]+)`;
const strip = (v) => v.replace(/^["']|["']$/g, "");
const overrides = [];
for (const m of command.matchAll(new RegExp(`user\\.email=${VALUE}`, "g"))) overrides.push(strip(m[1]));
for (const m of command.matchAll(new RegExp(`GIT_(?:AUTHOR|COMMITTER)_EMAIL=${VALUE}`, "g"))) overrides.push(strip(m[1]));
for (const m of command.matchAll(new RegExp(`--author[=\\s]${VALUE}`, "g"))) {
  const email = /<([^>]*)>/.exec(strip(m[1]));
  overrides.push(email ? email[1] : `(--author ${strip(m[1])} names no <email>)`);
}
for (const v of ["GIT_AUTHOR_EMAIL", "GIT_COMMITTER_EMAIL"]) if (process.env[v]) overrides.push(process.env[v]);

const wrong = overrides.filter((e) => e.trim() !== EXPECTED);
if (wrong.length === 0) process.exit(0);

deny(`Git identity override in the commit: ${wrong.join(", ")} - expected "${EXPECTED}" (CLAUDE.md hard constraint). Commit without the override.`);

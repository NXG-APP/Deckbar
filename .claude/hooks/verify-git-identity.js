#!/usr/bin/env node
// Hook - verify-git-identity (PreToolUse, Bash|PowerShell)
// Blocks `git commit` unless git user.email is the agreed identity.
// Rule: CLAUDE.md "Hard constraints - Git identity"; AI Working Agreement (Q202).
// Escape (deliberate, one commit, say so in the commit message): PROJ010_DECKBAR_SKIP_IDENTITY=1
// Test: echo '{"tool_input":{"command":"git commit -m x"}}' | node verify-git-identity.js

const { execSync } = require("child_process");
const { commitHook, deny } = require("./_common");

const EXPECTED = "vuhoang.biz@gmail.com";

commitHook("verify-git-identity", "PROJ010_DECKBAR_SKIP_IDENTITY");

let configured = "";
try { configured = execSync("git config user.email", { encoding: "utf8" }).trim(); } catch { configured = ""; }

if (configured === EXPECTED) process.exit(0);

deny(`Git identity mismatch: configured "${configured}", expected "${EXPECTED}" (CLAUDE.md hard constraint). Fix with: git config user.email ${EXPECTED}`);

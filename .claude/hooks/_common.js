#!/usr/bin/env node
// Shared helpers for the hooks in this folder (copied from PROJ003 dark-maze-mobile, 2026-11-08; originally the R2SS AI Governance Samples).
// Every commit-time hook:
//   1. parses the hook input Claude Code sends on stdin,
//   2. acts only on an actual `git commit`,
//   3. honours a one-shot escape variable named in its header,
//   4. never fails open silently - a hook that cannot read its input SAYS SO.
// Caveat (R2SS KNOWN_ISSUES #54): an escape set from inside a session through .claude/settings.local.json
// stays live for the whole session, even after the line is removed. Set escapes from your own terminal,
// one commit at a time.

const { execSync } = require("child_process");

function readInput() {
  let raw = "";
  try { raw = require("fs").readFileSync(0, "utf8"); } catch { return null; }
  try { return JSON.parse(raw); } catch { return null; }
}

// Exit 0 but tell the session the gate did NOT run - never an invisible pass.
function skip(hook, message) {
  process.stdout.write(JSON.stringify({
    systemMessage: `${hook}: ${message} - SKIPPED, this check was NOT verified.`,
  }));
  process.exit(0);
}

// Deny through JSON on stdout with exit 0: Claude Code reads hookSpecificOutput only on exit 0
// (on exit 2 it ignores stdout and shows stderr), so the reason reaches the session.
function deny(reason) {
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: reason,
    },
  }));
  process.exit(0);
}

// True only for an actual commit - tolerates `git -c x=y commit`, `a && git commit`, `a; git commit`.
function isGitCommit(command) {
  return /(^|[;&|\n])\s*git\s+(?:-[^\s]+(?:\s+[^\s-][^\s]*)?\s+)*commit\b/.test(command || "");
}

function stagedFiles(filter) {
  const out = execSync(`git --no-optional-locks diff --cached --name-only --diff-filter=${filter || "ACMR"}`, {
    encoding: "utf8", stdio: ["ignore", "pipe", "ignore"],
  });
  return out.split("\n").map((f) => f.trim()).filter(Boolean);
}

function stagedContent(file) {
  return execSync(`git --no-optional-locks show ":${file}"`, {
    encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], maxBuffer: 64 * 1024 * 1024,
  });
}

// Standard prologue for a commit-time hook: returns the parsed input, or exits.
function commitHook(hook, escapeVar) {
  const input = readInput();
  if (!input) skip(hook, "could not parse hook input");
  const command = input?.tool_input?.command || "";
  if (!isGitCommit(command)) process.exit(0);
  if (process.env[escapeVar] === "1") process.exit(0);
  if (input.cwd) { try { process.chdir(input.cwd); } catch { /* keep the inherited cwd */ } }
  return input;
}

module.exports = { readInput, skip, deny, isGitCommit, stagedFiles, stagedContent, commitHook };

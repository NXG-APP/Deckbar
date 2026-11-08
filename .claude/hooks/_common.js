#!/usr/bin/env node
// Shared helpers for the hooks in this folder (copied from PROJ003 dark-maze-mobile, 2026-11-08; originally the R2SS AI Governance Samples).
// Every commit-time hook:
//   1. parses the hook input Claude Code sends on stdin,
//   2. acts only on an actual `git commit` (also `VAR=x git commit`, `git -C dir commit`, `a && git commit`),
//   3. honours a one-shot escape variable named in its header,
//   4. refuses a commit that stages in the same command (`git add . && git commit`, `git commit -a`,
//      `git commit <path>`): a PreToolUse hook sees the index BEFORE the command runs, so it would check the
//      wrong content (qc review 2026-11-08, finding 1),
//   5. never fails open silently - a hook that cannot read its input SAYS SO.
// Caveat (R2SS KNOWN_ISSUES #54): an escape set from inside a session through .claude/settings.local.json
// stays live for the whole session, even after the line is removed. Set escapes from your own terminal,
// one commit at a time.

const { execSync } = require("child_process");
const path = require("path");

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

// --- reading a shell command -------------------------------------------------------------------------
const Q = `"(?:\\\\.|[^"\\\\])*"|'[^']*'`;                         // a quoted word
const ARG = `(?:${Q}|[^\\s\\-;&|][^\\s;&|]*)`;                      // an option's value
const OPT = `(?:-[^\\s;&|]+(?:\\s+${ARG})?\\s+)`;                   // a git option before the subcommand
const ENV = `(?:[A-Za-z_][A-Za-z0-9_]*=(?:${Q}|[^\\s;&|]*)\\s+)`;   // VAR=value prefixes
const gitRe = (sub) => new RegExp(`(^|[;&|\\n(])\\s*${ENV}*git\\s+(${OPT}*)(?:${sub})(?=\\s|$|[;&|)])`);
const COMMIT_RE = gitRe("commit");
const STAGING_RE = gitRe("add|rm|mv|restore|reset|apply|stash");

const unquote = (s) => s.replace(/^"(.*)"$|^'(.*)'$/s, (_, a, b) => (a !== undefined ? a : b));

// True only for an actual commit.
function isGitCommit(command) {
  return COMMIT_RE.test(command || "");
}

// The repository the commit runs in: `git -C <dir> commit` moves it away from the session's cwd.
function commitDir(command, cwd) {
  const m = COMMIT_RE.exec(command);
  const c = m && new RegExp(`(?:^|\\s)-C\\s+(${ARG})`).exec(` ${m[2]}`);
  return c ? path.resolve(cwd, unquote(c[1])) : cwd;
}

// The words after `commit`, up to the end of that command.
function commitWords(command) {
  const m = COMMIT_RE.exec(command);
  const rest = command.slice(m.index + m[0].length);
  const words = [];
  // A word joins quoted and bare parts: --author="Vincent Le <a@b>" is one word.
  for (const w of rest.match(new RegExp(`[;&|\\n]|(?:${Q}|[^\\s;&|"'])+`, "g")) || []) {
    if (/^[;&|\n]$/.test(w)) break;
    words.push(w);
  }
  return words;
}

const VALUE_OPTS = new Set(["-m", "-F", "-C", "-c", "-t", "--message", "--file", "--reuse-message",
  "--reedit-message", "--author", "--date", "--template", "--cleanup", "--fixup", "--squash", "--trailer"]);

// True when the commit takes content from the working tree instead of the index the hook can see.
function stagesInSameCommand(command) {
  if (STAGING_RE.test(command)) return true;
  const words = commitWords(command);
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    if (w === "--") return i < words.length - 1;
    if (VALUE_OPTS.has(w)) { i++; continue; }
    if (/^--[^=]+=/.test(w)) continue;
    if (["--all", "--include", "--only", "--interactive", "--patch", "-i", "-o", "-p"].includes(w)) return true;
    if (/^-[A-Za-z]+$/.test(w)) {
      if (w.includes("a")) return true;
      if (/[mFCct]$/.test(w)) i++; // a cluster ending in a value option takes the next word
      continue;
    }
    if (w.startsWith("-")) continue;
    return true; // a path: `git commit -m x file.js` commits that file from the working tree
  }
  return false;
}

// -z: file names arrive raw, never quoted - a non-ASCII name would otherwise fail `git show` (finding 4).
function stagedFiles(filter) {
  const out = execSync(`git --no-optional-locks diff --cached --name-only -z --diff-filter=${filter || "ACMR"}`, {
    encoding: "utf8", stdio: ["ignore", "pipe", "ignore"],
  });
  return out.split("\0").filter(Boolean);
}

function stagedContent(file) {
  return execSync(`git --no-optional-locks show ":${file.replace(/"/g, '\\"')}"`, {
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
  const dir = commitDir(command, input.cwd || process.cwd());
  try { process.chdir(dir); } catch { skip(hook, `cannot enter the commit's repository ${dir}`); }
  if (stagesInSameCommand(command)) {
    deny(`${hook}: this commit stages files in the same command (git add/rm/... before it, -a, or a path after it). ` +
      "The checks see only what is already staged, so they would check the wrong content. " +
      "Stage first in one command, then run `git commit -m ...` on its own.");
  }
  return { ...input, command };
}

module.exports = { readInput, skip, deny, isGitCommit, stagesInSameCommand, stagedFiles, stagedContent, commitHook };

#!/usr/bin/env node
// Hook - check-no-secrets (PreToolUse, Bash|PowerShell)
// Blocks `git commit` when a staged text file holds something that looks like a password, API key, token,
// connection string or private key - the "never written down" list (CLAUDE.md hard constraints; Q205).
// Reports file:line. A pattern check, not a security scanner: it catches an obvious paste, not a
// deliberate hiding. Add patterns for the providers actually used once the stack is chosen (R2SS Q050).
// Escape (only for a confirmed false positive): PROJ010_DECKBAR_SKIP_SECRETS=1

const { commitHook, deny, stagedFiles, stagedContent } = require("./_common");

const PATTERNS = [
  [/\b(sk|rk)-[A-Za-z0-9_-]{20,}/, "an API key"],
  [/\bAKIA[0-9A-Z]{16}\b/, "an AWS access key"],
  [/\bgh[pousr]_[A-Za-z0-9]{30,}/, "a GitHub token"],
  [/\bAIza[0-9A-Za-z_-]{35}\b/, "a Google API key"],
  [/\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}/, "a JWT"],
  [/\b(postgres|postgresql|mysql|mongodb(\+srv)?|redis):\/\/[^\s:]+:[^\s@]+@/i, "a connection string with a password"],
  [/\b(password|passwd|secret|api[_-]?key|token|storePassword|keyPassword)\s*[:=]\s*["'][^"'\s]{8,}["']/i, "a hard-coded secret value"],
  [/-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/, "a private key"],
];
const SKIP_FILES = /\.(png|jpg|jpeg|gif|webp|ico|pdf|zip|woff2?|ttf|docx|xlsx|pptx|wav|mp3|jks|keystore|p12|pfx)$|(^|\/)package-lock\.json$/i;
// Files that legitimately hold only the NAME of a secret, never a value:
const ALLOW_EXAMPLE = /\.example$|\.sample$/i;
// Signing material must never be staged at all:
const NEVER_STAGE = /\.(jks|keystore|p12|pfx)$|(^|\/)keystore\.properties$/i;

commitHook("check-no-secrets", "PROJ010_DECKBAR_SKIP_SECRETS");

const hits = [];
for (const file of stagedFiles()) {
  if (NEVER_STAGE.test(file)) { hits.push(`${file} is signing material and must never be committed`); continue; }
  if (SKIP_FILES.test(file) || ALLOW_EXAMPLE.test(file)) continue;
  let text = "";
  try { text = stagedContent(file); } catch { continue; }
  if (text.includes("\0")) continue; // binary
  text.split("\n").forEach((line, i) => {
    for (const [re, what] of PATTERNS) {
      if (re.test(line)) { hits.push(`${file}:${i + 1} looks like ${what}`); break; }
    }
  });
}

if (hits.length === 0) process.exit(0);

deny(`Staged content looks like a secret (CLAUDE.md: never write passwords, API keys and tokens, connection strings, customer or personal data into code, commits or docs):\n  ${hits.slice(0, 10).join("\n  ")}${hits.length > 10 ? `\n  ... and ${hits.length - 10} more` : ""}\nMove the value to GitHub Actions secrets or a git-ignored env file and refer to it by name.`);

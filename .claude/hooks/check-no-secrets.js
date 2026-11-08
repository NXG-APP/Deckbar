#!/usr/bin/env node
// Hook - check-no-secrets (PreToolUse, Bash|PowerShell)
// Blocks `git commit` when a staged text file holds something that looks like a password, API key, token,
// connection string, private key - or customer personal data (a Singapore phone number, an email address
// outside the allow-list) - the "never written down" list (CLAUDE.md hard constraints; PROJ003 Q205).
// Reports file:line. A pattern check, not a security scanner: it catches an obvious paste, not a
// deliberate hiding. Add patterns for the providers actually used once the stack is chosen (R2SS Q050).
// Made-up test data that passes: phone numbers +65 0xxx xxxx (not a Singapore number range), emails at
// example.com / example.org / example.net or a .test / .invalid domain.
// A staged file it cannot read is refused, never skipped silently (qc review 2026-11-08, finding 4).
// Escape (only for a confirmed false positive): PROJ010_DECKBAR_SKIP_SECRETS=1

const { commitHook, deny, stagedFiles, stagedContent } = require("./_common");

const PATTERNS = [
  [/\b(sk|rk)-[A-Za-z0-9_-]{20,}/, "an API key"],
  [/\bAKIA[0-9A-Z]{16}\b/, "an AWS access key"],
  [/\bgh[pousr]_[A-Za-z0-9]{30,}/, "a GitHub token"],
  [/\bAIza[0-9A-Za-z_-]{35}\b/, "a Google API key"],
  [/\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}/, "a JWT"],
  [/\b(postgres|postgresql|mysql|mongodb(\+srv)?|redis):\/\/[^\s:]+:[^\s@]+@/i, "a connection string with a password"],
  [/\b(password|passwd|secret|api[_-]?key|token|client[_-]?secret)\s*[:=]\s*["'][^"'\s]{8,}["']/i, "a hard-coded secret value"],
  [/-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/, "a private key"],
  [/(?<![\w+])\+?65[\s-]?[3689]\d{3}[\s-]?\d{4}(?!\d)/, "a Singapore phone number (personal data)"],
];
const EMAIL = /[A-Za-z0-9._%+-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,}/g;
const ALLOWED_EMAILS = new Set(["vuhoang.biz@gmail.com", "noreply@anthropic.com"]);
const ALLOWED_DOMAIN = /@(?:[A-Za-z0-9-]+\.)*(?:example\.(?:com|org|net)|[A-Za-z0-9-]+\.(?:test|invalid))$/i;

const SKIP_FILES = /\.(png|jpg|jpeg|gif|webp|ico|pdf|zip|woff2?|ttf|docx|xlsx|pptx|wav|mp3|ogg|p12|pfx)$|(^|\/)package-lock\.json$/i;
// Files that legitimately hold only the NAME of a secret, never a value:
const ALLOW_EXAMPLE = /\.example$|\.sample$/i;
// Key material must never be staged at all:
const NEVER_STAGE = /\.(p12|pfx|pem|key)$/i;

commitHook("check-no-secrets", "PROJ010_DECKBAR_SKIP_SECRETS");

const hits = [];
for (const file of stagedFiles()) {
  if (NEVER_STAGE.test(file)) { hits.push(`${file} is key material and must never be committed`); continue; }
  if (SKIP_FILES.test(file) || ALLOW_EXAMPLE.test(file)) continue;
  let text = "";
  try { text = stagedContent(file); } catch { hits.push(`${file} could not be read from the index - check it by hand`); continue; }
  if (text.includes("\0")) continue; // binary
  text.split("\n").forEach((line, i) => {
    for (const [re, what] of PATTERNS) {
      if (re.test(line)) { hits.push(`${file}:${i + 1} looks like ${what}`); return; }
    }
    const email = (line.match(EMAIL) || []).find((e) => !ALLOWED_EMAILS.has(e.toLowerCase()) && !ALLOWED_DOMAIN.test(e));
    if (email) hits.push(`${file}:${i + 1} holds an email address (personal data)`);
  });
}

if (hits.length === 0) process.exit(0);

deny(`Staged content looks like a secret or personal data (CLAUDE.md: never write passwords, API keys and tokens, connection strings, customer or personal data into code, commits or docs - this repository is public):\n  ${hits.slice(0, 10).join("\n  ")}${hits.length > 10 ? `\n  ... and ${hits.length - 10} more` : ""}\nMove a secret to GitHub Actions secrets or a git-ignored env file and refer to it by name; replace personal data with made-up data (see this hook's header).`);

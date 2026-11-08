#!/usr/bin/env node
// Hook - check-ba-analysis (PreToolUse, Bash|PowerShell)
// A feature spec cannot be committed unless ba-agent's analysis for that feature exists - staged in the
// same commit or already tracked. Rule: CLAUDE.md "A BA pass before any use case is planned or built".
// The gate sits on the spec; editing an analysis on its own is never blocked.
// Layout: docs/specs/[<folder>/]<feature>_Spec.md  and  docs/ba-analysis/<feature>_BA_Analysis_<YYYY-MM-DD>.md
// Escape (approved by the product owner, one commit): PROJ010_DECKBAR_SKIP_BA_CHECK=1

const { execSync } = require("child_process");
const { commitHook, deny, stagedFiles } = require("./_common");

const SPECS_DIR = "docs/specs";
const BA_DIR = "docs/ba-analysis";

commitHook("check-ba-analysis", "PROJ010_DECKBAR_SKIP_BA_CHECK");

const staged = stagedFiles();
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const specRe = new RegExp(`^${esc(SPECS_DIR)}/(?:[^/]+/)?([^/]+)_Spec\\.md$`, "i");

let tracked = "";
try { tracked = execSync(`git --no-optional-locks ls-files "${BA_DIR}"`, { encoding: "utf8" }); } catch { tracked = ""; }
const known = tracked.split("\n").concat(staged).map((f) => f.trim().toLowerCase());

const missing = [];
for (const file of staged) {
  const m = specRe.exec(file);
  if (!m) continue;
  const feature = m[1].toLowerCase();
  const has = known.some((f) => f.startsWith(`${BA_DIR}/${feature}_ba_analysis_`));
  if (!has) missing.push(feature);
}

if (missing.length === 0) process.exit(0);

deny(`Spec staged without its BA analysis: ${missing.join(", ")}. Run the ba-agent on it first - it writes ${BA_DIR}/<feature>_BA_Analysis_<date>.md - and stage that file with the spec (CLAUDE.md: no feature is planned or built without a BA pass).`);

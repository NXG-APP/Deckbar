#!/usr/bin/env node
// Self-test of the governance hooks in .claude/hooks/ (CLAUDE.md "Enforced automatically").
// Each case builds a throw-away git repository, stages files, feeds the hook the JSON Claude Code would send,
// and checks the hook's decision. Exits non-zero on any failure. Run: npm.cmd run test
//
// Secret-looking strings are assembled from pieces so this file itself never matches check-no-secrets.

const { execFileSync, spawnSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const HOOKS = path.join(__dirname, "..", ".claude", "hooks");
const IDENTITY = "vuhoang.biz@gmail.com";
let passed = 0;
let failed = 0;

function repo(email, prefix = "") {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), `${prefix}deckbar-hooks-`));
  const git = (...args) => execFileSync("git", args, { cwd: dir, stdio: ["ignore", "pipe", "ignore"] });
  git("init", "-q");
  git("config", "user.email", email);
  git("config", "user.name", "Hook Test");
  git("config", "commit.gpgsign", "false");
  return {
    dir,
    git,
    write(file, text) {
      const full = path.join(dir, file);
      fs.mkdirSync(path.dirname(full), { recursive: true });
      fs.writeFileSync(full, text);
    },
    stage(file, text) { this.write(file, text); git("add", file); },
    commitAll(msg) { git("add", "-A"); git("commit", "-q", "-m", msg); },
  };
}

// Runs a hook; the environment is cleared of the escape variables so a developer's shell cannot skew the test.
function run(hook, input, env = {}) {
  const clean = Object.fromEntries(Object.entries(process.env).filter(([k]) => !k.startsWith("PROJ010_DECKBAR_")));
  const res = spawnSync("node", [path.join(HOOKS, `${hook}.js`)], {
    input: JSON.stringify(input), encoding: "utf8", env: { ...clean, ...env },
  });
  let out = null;
  try { out = res.stdout ? JSON.parse(res.stdout) : null; } catch { out = { unparsed: res.stdout }; }
  return { code: res.status, out };
}

const commit = (cwd, command = "git commit -m test") => ({ cwd, tool_input: { command } });
const denied = (r) => r.code === 0 && r.out?.hookSpecificOutput?.permissionDecision === "deny";
const allowed = (r) => r.code === 0 && r.out === null;

function check(name, ok, detail) {
  if (ok) { passed++; console.log(`  ok   ${name}`); }
  else { failed++; console.log(`  FAIL ${name}${detail ? ` - ${JSON.stringify(detail)}` : ""}`); }
}

console.log("verify-git-identity");
{
  const good = repo(IDENTITY);
  check("agreed identity is allowed", allowed(run("verify-git-identity", commit(good.dir))));
  const bad = repo("someone@example.com");
  const r = run("verify-git-identity", commit(bad.dir));
  check("another identity is denied", denied(r), r);
  check("a non-commit command is ignored", allowed(run("verify-git-identity", commit(bad.dir, "git status"))));
  check("a chained commit is caught", denied(run("verify-git-identity", commit(bad.dir, "git status && git commit -m x"))));
  const dom = "@x" + ".com";
  check("-c user.email= is denied", denied(run("verify-git-identity", commit(good.dir, `git -c user.email=evil${dom} commit -m x`))));
  check("--author with another email is denied",
    denied(run("verify-git-identity", commit(good.dir, `git commit --author="E <e${dom}>" -m x`))));
  check("--author with the agreed email is allowed",
    allowed(run("verify-git-identity", commit(good.dir, `git commit --author="Vincent Le <${IDENTITY}>" -m x`))));
  check("a GIT_AUTHOR_EMAIL= prefix is seen and denied",
    denied(run("verify-git-identity", commit(good.dir, `GIT_AUTHOR_EMAIL=a${dom} git commit -m x`))));
  check("git -C <other repo> checks that repo", denied(run("verify-git-identity", commit(good.dir, `git -C "${bad.dir}" commit -m x`))));
  const spaced = repo("someone@example.com", "with space ");
  check("git -C with a quoted path holding a space checks that repo",
    denied(run("verify-git-identity", commit(good.dir, `git -C "${spaced.dir}" commit -m x`))));
  check("the escape lets one commit through",
    allowed(run("verify-git-identity", commit(bad.dir), { PROJ010_DECKBAR_SKIP_IDENTITY: "1" })));
}

console.log("staging in the same command");
{
  const r = repo(IDENTITY);
  r.stage("src/ok.js", "1\n");
  for (const [name, cmd] of [
    ["git add -A && git commit", "git add -A && git commit -m x"],
    ["git commit -am", "git commit -am x"],
    ["git commit --all", "git commit --all -m x"],
    ["git commit with a path", "git commit -m x src/ok.js"],
  ]) check(`${name} is denied`, denied(run("check-no-secrets", commit(r.dir, cmd))));
  check("a message containing -a is not staging", allowed(run("check-no-secrets", commit(r.dir, 'git commit -m "fix -a flag" -m "body"'))));
  check("--amend is not staging", allowed(run("check-no-secrets", commit(r.dir, "git commit --amend --no-edit"))));
}

console.log("check-no-secrets");
{
  const r1 = repo(IDENTITY);
  r1.stage("src/ok.js", "const greeting = 'hello';\n");
  check("clean content is allowed", allowed(run("check-no-secrets", commit(r1.dir))));

  const r2 = repo(IDENTITY);
  r2.stage("src/config.js", "const api" + "_key = \"" + "x".repeat(16) + "\";\n");
  const res = run("check-no-secrets", commit(r2.dir));
  check("a hard-coded key is denied with file:line", denied(res) &&
    res.out.hookSpecificOutput.permissionDecisionReason.includes("src/config.js:1"), res);

  const r3 = repo(IDENTITY);
  r3.stage("db.txt", "postgres" + "://user:" + "pw123456" + "@db.example.com/x\n");
  check("a connection string with a password is denied", denied(run("check-no-secrets", commit(r3.dir))));

  const r4 = repo(IDENTITY);
  r4.stage(".env.example", "API" + "_KEY=\"" + "y".repeat(16) + "\"\n");
  check("an .example file is allowed", allowed(run("check-no-secrets", commit(r4.dir))));

  const r5 = repo(IDENTITY);
  r5.stage("caf\u00e9.txt", "pass" + "word: \"" + "z".repeat(12) + "\"\n");
  check("a secret in a non-ASCII file name is denied", denied(run("check-no-secrets", commit(r5.dir))));

  const r6 = repo(IDENTITY);
  r6.stage("notes.md", "call +" + "65 9123 4567\n");
  check("a Singapore phone number is denied", denied(run("check-no-secrets", commit(r6.dir))));

  const r7 = repo(IDENTITY);
  r7.stage("notes.md", "mail tan" + "@" + "gmail.com\n");
  check("a real-looking email is denied", denied(run("check-no-secrets", commit(r7.dir))));

  const r8 = repo(IDENTITY);
  r8.stage("tests/data.js", "const c = { phone: '+65 0000 0001', email: 'tan@example.com', sha: 'a65912345678' };\n");
  check("made-up test data and a hash are allowed", allowed(run("check-no-secrets", commit(r8.dir))));
}

console.log("check-ba-analysis");
{
  const r1 = repo(IDENTITY);
  r1.stage("docs/specs/Dart_Game_Spec.md", "# spec\n");
  check("a spec without its BA analysis is denied", denied(run("check-ba-analysis", commit(r1.dir))));

  const r2 = repo(IDENTITY);
  r2.stage("docs/specs/Dart_Game_Spec.md", "# spec\n");
  r2.stage("docs/ba-analysis/Dart_Game_BA_Analysis_2026-11-08.md", "# ba\n");
  check("a spec staged with its BA analysis is allowed", allowed(run("check-ba-analysis", commit(r2.dir))));

  const r3 = repo(IDENTITY);
  r3.write("docs/ba-analysis/Dart_Game_BA_Analysis_2026-11-08.md", "# ba\n");
  r3.commitAll("ba");
  r3.stage("docs/specs/use-cases/Dart_Game_Spec.md", "# spec\n");
  check("a spec in a sub-folder with an already tracked analysis is allowed",
    allowed(run("check-ba-analysis", commit(r3.dir))));

  const r5 = repo(IDENTITY);
  r5.stage("docs/specs/a/b/Login_Spec.md", "# spec\n");
  check("a spec two folders deep is checked", denied(run("check-ba-analysis", commit(r5.dir))));

  const r6 = repo(IDENTITY);
  r6.stage("docs/specs/Login_Spec.md", "# spec\n");
  r6.stage("docs/ba-analysis/Login_BA_Analysis_.md", "# ba\n");
  check("an analysis without its date does not count", denied(run("check-ba-analysis", commit(r6.dir))));

  const r4 = repo(IDENTITY);
  r4.stage("docs/specs/use-cases/UC02_Dart_mini_game_Detail.md", "# detail\n");
  check("a use-case detail file is not a spec", allowed(run("check-ba-analysis", commit(r4.dir))));
}

console.log("check-progress-updated");
{
  const r1 = repo(IDENTITY);
  r1.write("src/app.js", "1\n");
  const res = run("check-progress-updated", { cwd: r1.dir });
  check("code changed without MASTER_PLAN blocks the stop", res.out?.decision === "block", res);

  const r2 = repo(IDENTITY);
  r2.write("src/app.js", "1\n");
  r2.write("docs/MASTER_PLAN.md", "# plan\n");
  check("code changed with MASTER_PLAN lets the stop through", allowed(run("check-progress-updated", { cwd: r2.dir })));

  const r3 = repo(IDENTITY);
  r3.write("README.md", "# docs only\n");
  check("a docs-only change lets the stop through", allowed(run("check-progress-updated", { cwd: r3.dir })));

  const r4 = repo(IDENTITY);
  r4.write(".claude/hooks/x.js", "1\n");
  check("a hook change counts as code", run("check-progress-updated", { cwd: r4.dir }).out?.decision === "block");

  const r5 = repo(IDENTITY);
  r5.write("index.html", "<p>\n");
  check("a code file at the root counts as code", run("check-progress-updated", { cwd: r5.dir }).out?.decision === "block");

  const r6 = repo(IDENTITY);
  r6.write("docs/MASTER_PLAN.md", "# plan\n");
  r6.commitAll("plan");
  execFileSync("git", ["commit", "-q", "--amend", "-m", "plan", "--date", "2000-01-01T00:00:00"],
    { cwd: r6.dir, env: { ...process.env, GIT_COMMITTER_DATE: "2000-01-01T00:00:00" } });
  execFileSync("git", ["rm", "-q", "docs/MASTER_PLAN.md"], { cwd: r6.dir });
  r6.write("src/app.js", "1\n");
  check("deleting MASTER_PLAN is not an update", run("check-progress-updated", { cwd: r6.dir }).out?.decision === "block");

  check("a second stop never loops",
    allowed(run("check-progress-updated", { cwd: r1.dir, stop_hook_active: true })));
}

console.log("session-start");
{
  const r1 = repo(IDENTITY);
  const res = run("session-start", { cwd: r1.dir });
  const ctx = res.out?.hookSpecificOutput?.additionalContext || "";
  check("injects the start-of-session reading", ctx.includes("docs/MASTER_PLAN.md") && ctx.includes("docs/KNOWN_ISSUES.md"), res);
  check("names the missing records in an empty repository", ctx.includes("Missing:"));
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);

const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const configPath = path.join(process.cwd(), ".defeat-me.json");
const outputLimit = 6000;

function respond(value) {
  process.stdout.write(`${JSON.stringify(value)}\n`);
}

function block(reason) {
  respond({ decision: "block", reason });
}

function readConfig() {
  let contents;
  try {
    contents = fs.readFileSync(configPath, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
  return JSON.parse(contents);
}

function summarizeOutput(result) {
  const text = [result.stdout, result.stderr]
    .filter(Boolean)
    .join("\n")
    .trim();
  if (!text) return "";
  return text.length > outputLimit
    ? `${text.slice(-outputLimit)}\n[Earlier test output omitted.]`
    : text;
}

function main() {
  try {
    const eventInput = fs.readFileSync(0, "utf8");
    JSON.parse(eventInput);

    const config = readConfig();
    if (!config || config.enabled !== true) {
      respond({});
      return;
    }

    if (
      typeof config.testCommand !== "string" ||
      config.testCommand.trim() === ""
    ) {
      block(
        "Completion check is enabled, but .defeat-me.json must contain a non-empty testCommand string. Configure the project's test command or set enabled to false."
      );
      return;
    }

    const result = spawnSync(config.testCommand, {
      cwd: process.cwd(),
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024,
      shell: true,
      timeout: 110_000,
    });

    if (result.error || result.signal || result.status !== 0) {
      const output = summarizeOutput(result);
      const details = [
        `The configured test command failed: ${config.testCommand}.`,
        result.error ? `Runner error: ${result.error.message}` : "",
        result.signal ? `Terminated by signal: ${result.signal}.` : "",
        result.status !== null && result.status !== 0
          ? `Exit code: ${result.status}.`
          : "",
        output ? `Test output:\n${output}` : "",
        "Fix the failure and try again, or set enabled to false in .defeat-me.json to disable this hook.",
      ]
        .filter(Boolean)
        .join("\n");
      block(details);
      return;
    }

    respond({});
  } catch (error) {
    block(
      `The completion check could not run: ${error.message}. Fix the hook or its configuration before finishing, or set enabled to false in .defeat-me.json to disable it.`
    );
  }
}

main();

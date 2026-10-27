---
name: defeat-done
description: Require verifiable evidence before reporting a coding task as complete. Use after implementing a change, fixing a bug, or preparing a completion summary.
---

# Defeat Done

Do not report a coding task as complete until you have tried to verify the change with the project's tests, build, and linter. Then challenge your own solution with relevant edge cases and failure paths. Report commands and results accurately; never imply that an unrun check passed.

## Procedure

1. **Inspect the project before choosing commands.**
   - Read the repository's contributor instructions, package manifests, lockfiles, scripts, and CI workflows.
   - Identify the project's documented test, build, and lint commands. Use the repository's existing package manager and scripts; do not install dependencies unless required by the task and approved by the project's conventions.
   - Check the working tree before changing anything so existing user changes are preserved.

2. **For a bug fix, prove the failure first.**
   - Add or update a focused regression test that expresses the reported bug.
   - Run that test before the fix and show that it fails for the expected reason. If it does not fail, revise the test or explain why reproducing the failure is not possible before proceeding.
   - Make the smallest fix that addresses the reproduced failure.

3. **Run the project's verification commands after the change.**
   - Execute the relevant tests, build, and linter as separate, identifiable commands. Do not substitute reading source code or relying on a previous run for actually executing them.
   - For a bug fix, rerun the regression test and confirm it passes.
   - If a command is absent, determine whether the project documents an equivalent check. Do not invent a successful result for a missing command.
   - Preserve and report the actual command, exit result, and relevant output. If a command cannot run because of missing tools, dependencies, permissions, or environment, state the blocker and mark that check unverified.

4. **Try to break the change.**
   - Exercise boundary values, empty and malformed inputs, expected failures, and relevant state transitions.
   - Check for unintended side effects in nearby callers, interfaces, persisted data, and platform-specific behavior.
   - Add or run focused tests for meaningful risks. Fix any issue found, then rerun the affected checks.

5. **Review the final diff.**
   - Confirm the change does what was requested and does not introduce unrelated behavior.
   - Review `git diff` and the working-tree status for accidental edits, generated files, or missing changes.

6. **Give an evidence-based completion report.**
   - List the checks that actually ran, their exact commands, and pass/fail results.
   - Include concise relevant output, such as a test summary or build/lint success line; do not claim output you did not observe.
   - List checks not run and why, plus any remaining risks.
   - Only call the task complete when the requested work is done and the verification status is explicit. Never use "should work" as a substitute for a check.

## Example

**Before**

> Fixed the parser; it should work now.

**After**

> Fixed the parser's empty-input case. `npm test -- --runInBand` - passed (18 tests); `npm run build` - passed; `npm run lint` - not run (the project has no lint script). Added a regression test that failed before the fix and passes now. Remaining: lint is unverified.

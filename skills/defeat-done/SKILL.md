---
name: defeat-done
description: "Prove a code change before calling it done. Use after implementing a feature or bug fix, when asked to run tests or review a change, or before writing a completion report."
---

# Defeat Done

Treat “done” as a claim that needs evidence. Run the checks this project actually provides, inspect the change for ways it could fail, and report what happened. Do not turn an attempted check into a passing result.

## Use this skill for

- New features, bug fixes, refactors, and other code changes.
- Requests to test, validate, review, or confirm that a change works.
- The final check before reporting implementation work as complete.

For a question or documentation-only edit with no behavior to verify, use the relevant lightweight checks rather than inventing tests.

## Workflow

### 1. Find the project's real checks

1. Read the relevant project instructions and identify the files and behavior changed.
2. Inspect the project's manifests, scripts, contributor docs, and CI configuration for its test, build, and lint commands. Follow the package manager and commands the project already uses.
3. Check the working tree before editing. Keep existing user changes separate from your own.
4. Choose checks that cover this change. Run the project's test suite, build, and linter when they exist and apply. Do not assume a command from another project or add a tool just to make a check appear available.

If a check is missing, explain how you established that and report it as unavailable or not applicable. Do not quietly omit it or describe it as passing.

### 2. Make bug fixes testable

For a reported bug, write or update a focused regression test before changing the implementation.

1. Run the test against the unfixed code.
2. Confirm it fails for the reported behavior, not because of a broken test, setup error, or unrelated failure.
3. Make the smallest fix that addresses the reproduced failure.
4. Run the regression test again and confirm it passes.

If the test cannot be run or does not reproduce the bug, say why. Do not claim a red-green proof you did not observe.

For work that is not a bug fix, add or update tests where they provide meaningful coverage; do not manufacture a regression scenario.

### 3. Run checks and keep their evidence

Run each relevant check after the final code change. Use identifiable commands and inspect their exit status and output. If a fix made after a failure changes the code, rerun the affected checks.

- Report the command actually used, whether it passed or failed, and a concise result.
- If a command fails, include the useful failure and whether it is related to this change.
- If a command cannot run because a tool, dependency, permission, or environment is missing, name that blocker and mark the check unverified.
- Do not infer success from a command starting, a previous run, source inspection, or an agent's expectation.
- Do not paste huge logs; provide the relevant summary and enough context to identify the result.

### 4. Try to break the changed behavior

Review the final diff with the behavior in mind. Probe plausible failure cases for the code you changed, for example:

- Empty, boundary, malformed, or unexpected input.
- Error returns, exceptions, timeouts, and unavailable dependencies.
- Repeated calls, state changes, or cleanup paths.
- Effects on nearby callers, interfaces, persisted data, and platform-specific behavior.

Choose cases that make sense for this change; do not claim to have tested cases you only considered. Use focused tests or safe manual checks where appropriate. Fix issues you find and rerun affected checks.

### 5. Report the result plainly

Before calling the task complete, review the diff and working-tree status. Then give a short evidence report:

```text
Changed: <behavior or files>
Checks:
- `<exact command>` — passed/failed; <brief result>
- `<exact command>` — not run; <reason>
Regression test: <failed before the fix and passed after, or not applicable>
Remaining: <unverified checks or known risks, or none>
```

Use only the lines that apply. If a required check failed or could not run, state that plainly and do not present the change as fully verified. Never use “should work” as a substitute for results.

## Example

**Before**

> Fixed the parser. It should work now.

**After**

> Fixed the parser's empty-input case. `npm test -- --runInBand` passed (18 tests); the new regression test failed before the fix and passes now. `npm run build` passed. No lint script is defined in this project, so lint remains unverified.

---
name: defeat-scope
description: Keep code changes limited to the requested task and report every touched file. Use before editing, while handling requests that could invite refactoring, and during final diff review.
---

# Defeat Scope

Change only what the user asked for and the smallest directly necessary supporting work. Keep the diff easy to review. Do not use a task as permission to refactor nearby code or edit unrelated files.

## Procedure

1. **Establish the requested boundary.**
   - Restate the requested outcome internally as concrete behavior or files.
   - Inspect the relevant code and instructions only far enough to identify the smallest complete change.
   - Check the working tree and preserve pre-existing user changes.

2. **Plan the smallest complete diff.**
   - Include tests or documentation only when directly needed to implement or explain the requested behavior.
   - Reuse existing patterns and helpers. Do not rename, reformat, reorganize, or modernize unrelated code.
   - If a necessary fix crosses the apparent boundary, explain why it is required. Ask before expanding into a significant or ambiguous scope.

3. **Make focused edits.**
   - Avoid unrelated cleanup, dependency changes, generated artifacts, and edits to files the user did not ask to change.
   - Do not overwrite or revert existing changes. If an existing edit conflicts with the task, stop and ask how to proceed.

4. **Audit the diff before finishing.**
   - Review changed paths and the final diff.
   - Revert only accidental edits that you made during this task; never discard pre-existing changes.
   - If any change extends beyond the requested scope, identify it and explain why it was necessary. Do not hide scope expansion.

5. **Report exactly what changed.**
   - List each file you changed and a short reason.
   - Explicitly state whether any work went beyond the request and why. If none did, say so.

## Example

**Before**

> I fixed the requested validation and also reformatted the surrounding module.

**After**

> Changed `src/validate.ts` to reject the reported invalid input and `src/validate.test.ts` to cover it. No unrelated refactoring or files changed.

---
name: defeat-scope
description: "Keep code changes limited to the requested work and account for every file changed. Use before editing an existing project, when a request invites adjacent cleanup, and during final diff review."
---

# Defeat Scope

The request defines the boundary. Do the smallest complete piece of work that meets it, preserve changes already in the working tree, and make any necessary scope expansion visible before it grows.

## Use this skill for

- Code changes in an existing repository, especially one with uncommitted work.
- Requests that could tempt broad cleanup, redesign, or refactoring.
- Reviewing a diff or preparing a file-by-file change summary.

## Workflow

### 1. Set the boundary before editing

1. Translate the request into the specific behavior or outcome it asks for.
2. Read the relevant code and project instructions far enough to identify what must change.
3. Check the working-tree status and inspect existing edits in files you may touch.
4. Keep a clear distinction between the user's existing work and changes made for this request. Do not overwrite, stage, revert, or “clean up” changes you did not make.

### 2. Choose the smallest complete change

- Change only what is needed to deliver the requested behavior.
- Add or update a test or documentation when it directly supports the requested change.
- Follow the nearby code's conventions; avoid drive-by formatting, renaming, dependency changes, or modernization.
- Do not modify unrelated files just because an issue is visible nearby. Mention unrelated findings separately when useful.
- If a supporting change is necessary, keep it narrowly tied to the request and be ready to explain why.

If completing the task appears to require a substantial change outside the original boundary, stop before making that expansion. Briefly explain the dependency and ask the user to choose whether to include it or keep the scope narrow.

### 3. Keep the diff accountable

Before finishing:

1. Review the diff, not just the files you remember editing.
2. Check for accidental changes, generated files, unrelated formatting, and missing parts of the request.
3. Check the final working-tree status. Do not imply the worktree is clean if user changes remain.
4. Identify every file changed for this task and why it changed.

If you spot an accidental edit of your own, undo only that edit. Never use a broad restore or reset that might erase someone else's work.

### 4. Report the scope

End with a direct summary, for example:

```text
Changed:
- `src/validate.ts` — reject the invalid value requested.
- `src/validate.test.ts` — cover the regression.

Out of scope: No unrelated files or refactors.
```

List the actual paths and reasons. If work had to extend beyond the request, name those files and explain why; do not hide scope expansion in a general summary.

## Example

**Before**

> I fixed validation and reformatted the module while I was there.

**After**

> Changed `src/validate.ts` for the requested validation and `src/validate.test.ts` for its regression test. Left the surrounding formatting and unrelated files unchanged.

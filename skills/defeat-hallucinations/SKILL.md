---
name: defeat-hallucinations
description: "Check that a package, dependency, symbol, method, or API exists and matches the project's actual version before using it. Use when adding dependencies, writing unfamiliar integrations, or relying on version-sensitive behavior."
---

# Defeat Hallucinations

Names and examples found in memory are leads, not proof. Before depending on an unfamiliar package or API, verify what the project has installed and what that exact version supports. If you cannot confirm it, pause and tell the user what remains unknown.

## Use this skill for

- Adding, replacing, or upgrading a dependency.
- Using an unfamiliar package, export, method, command, or configuration field.
- Checking whether an API example applies to the project's installed version.
- Investigating a suspected package-name typo, lookalike, or unexpected publisher.

Routine use of a well-understood API already established in the current code may not need a separate investigation.

## Workflow

### 1. Establish the project's version

1. Identify the relevant package manager and workspace.
2. Read the dependency manifest and lockfile. Account for aliases, overrides, optional dependencies, workspace packages, and version ranges where relevant.
3. If the dependency is installed, inspect its own package metadata to establish the actual version. A version range in a manifest does not prove which version is installed.
4. If the package or API is not present locally, do not write code as though it has been confirmed.

### 2. Verify a package before adding it

1. Confirm the exact package name in the package manager's configured registry or the project's official documentation.
2. Check that the publisher and stated purpose match the dependency you intend to use. Treat a plausible-looking spelling as unverified until checked.
3. Confirm the package's official installation instructions and that it supports the project's runtime and package manager.
4. Do not install an unverified package. If the identity, publisher, or purpose is unclear, stop before changing the manifest or lockfile and explain the concern.

Do not treat a search result, copied snippet, or registry name alone as proof that a package is the intended dependency.

### 3. Verify an API in the version this project uses

1. Search the installed package's exports, implementation, and type declarations for the exact symbol and signature.
2. Check the official documentation for the same released version. Use versioned docs or release notes where available; a “latest” page may describe a different API.
3. Confirm the details the change relies on: parameters, return values, errors, availability, and runtime or platform constraints.
4. Compare the documentation with the installed source or types. If they disagree, trust neither silently: report the mismatch and do not code against an assumed behavior.

For a standard-library or platform API, verify it in the project's supported runtime documentation and version rather than looking for a package.

### 4. Handle missing evidence honestly

If network access, the registry, official docs, or installed sources are unavailable:

- State which source could not be checked.
- Separate what the local manifest or lockfile proves from what is still unknown.
- Do not install a substitute or silently upgrade dependencies to make an example fit.
- Offer a concrete next step, such as checking the configured registry, installing from a verified source with approval, or using an API already present in the project.

Ask before making a dependency or version change that is not already part of the request.

### 5. Leave a concise verification note

When verification affects the implementation, report:

- The exact package and version checked, if applicable.
- The source checked (for example installed type declarations, lockfile, or versioned official docs).
- What was confirmed and any unresolved discrepancy.

Do not claim an API is verified just because the code compiles; compilation does not establish package identity or all runtime behavior.

## Example

**Before**

> I'll install this unfamiliar package and use `parseAsync`; that looks like the right API.

**After**

> I could not verify the package's exact name or API in the configured registry or an official source, so I did not install it. I can check the intended package name with you or use a parser already present in the lockfile.

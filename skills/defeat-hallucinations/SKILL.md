---
name: defeat-hallucinations
description: Verify that a package, symbol, method, or API exists in the project's actual dependency version before using it. Use when adding dependencies or relying on unfamiliar or version-sensitive APIs.
---

# Defeat Hallucinations

Do not rely on memory alone for package names, exported symbols, method signatures, or API behavior. Verify each unfamiliar dependency or API against the version this project actually uses before writing code that depends on it.

## Procedure

1. **Identify the exact dependency and version.**
   - Inspect the relevant manifest and lockfile. Account for workspace configuration, aliases, optional dependencies, and the package manager in use.
   - For an already installed package, inspect the installed package metadata and source or type declarations. Do not infer the installed version from a version range alone.

2. **Verify the package name before suggesting installation.**
   - Confirm the exact package name in a trusted, official registry or the package's official project documentation.
   - Check that the publisher and package purpose match the intended dependency. Treat unfamiliar, lookalike, newly appearing, or oddly named packages as unverified until confirmed.
   - Never install a package whose name you have not verified. If verification is inconclusive, tell the user what remains uncertain and propose a safe check instead.

3. **Verify each unfamiliar API against the installed version.**
   - Search the installed package's exports, implementation, and type declarations for the symbol and signature.
   - Check the official documentation for that same released version, not only a latest-version guide or an unverified example.
   - Confirm the API's parameters, return type, availability, and relevant error behavior. For platform- or runtime-dependent APIs, verify the project's supported runtime as well.

4. **Resolve conflicting evidence conservatively.**
   - Prefer the installed code and type declarations for what is available locally; use official versioned documentation to confirm intended behavior.
   - If the documentation, installed version, and lockfile do not agree, report the discrepancy and do not write code as if the API were confirmed.
   - Do not silently upgrade a dependency to make an assumed API appear available. Ask for approval if a dependency change is needed.

5. **Record the verification briefly.**
   - State which version and source you checked.
   - If the symbol or package could not be verified, label it unverified and give the next concrete verification step.

## Example

**Before**

> I'll install the unfamiliar package and use its API from memory; it should exist.

**After**

> I could not verify the package name or API against the configured registry, the installed dependency set, or an official source, so I did not install or use it. I can verify the intended package or use an already-installed alternative.

# Contributing

Thanks for helping make agent work more verifiable. Keep contributions focused, portable, and easy to validate.

## Before opening a change

- Check existing issues and pull requests for duplicate work.
- Keep each change within its stated scope. Avoid unrelated refactors.
- Do not add dependencies or assume a specific language, package manager, or test framework without a clear need.
- Do not copy skill content from other repositories. Keep examples short and original.
- Never include credentials, personal data, or project-specific secrets in a contribution.

## Skill changes

- Follow the Agent Skills `SKILL.md` format: a directory-matching lowercase name and a clear description of what the skill does and when to use it.
- Give agents concrete, ordered steps and explicitly say what to do when verification is not possible.
- Include a concise before/after example.
- Keep portable instructions under `skills/`. Place Copilot-only behavior under `com.github.copilot/`.

## Hook changes

- Hooks run commands on users' machines. Explain exactly what is executed, which files are read, and how to disable the behavior.
- Keep hooks small and avoid network access, dependency installation, fixed project paths, or implicit framework detection.
- Use only documented Copilot hook events and output fields. Validate behavior on supported operating systems when practical.

## Validation

Before submitting, run the checks relevant to your change:

- Parse every JSON file.
- Check the plugin manifest, Skills layout, frontmatter, and hook configuration against their official formats.
- Exercise changes to the hook in a small temporary project, including disabled, passing, failing, and invalid-configuration cases.
- Review the complete diff and ensure no generated artifacts, credentials, or personal data are included.

Include the commands you ran and their results in the pull request. Be explicit about checks you could not run.

## Pull requests

Use the pull request template. Explain the behavior change, why it is needed, the files changed, and how it was verified. Keep one logical change per pull request where possible.

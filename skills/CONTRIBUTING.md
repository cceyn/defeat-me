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
- Keep the skills portable and avoid assuming a specific agent or project setup.

## Validation

Before submitting, run the checks relevant to your change:

- Parse every JSON file.
- Check the plugin manifest, Skills layout, and frontmatter against their official formats.
- Review the complete diff and ensure no generated artifacts, credentials, or personal data are included.

Include the commands you ran and their results in the pull request. Be explicit about checks you could not run.

## Pull requests

Use the pull request template. Explain the behavior change, why it is needed, the files changed, and how it was verified. Keep one logical change per pull request where possible.

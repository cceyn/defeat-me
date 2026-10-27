# defeat-me

![Defeat Me - Make your agent prove its work](defeatme.png)

**Make your agent prove its work.**

defeat-me is a portable collection of Agent Skills that makes coding agents verify, challenge, and clearly report their own changes before calling a task done.

## Install in under a minute

1. In VS Code, open the Chat view with the **Copilot** session target.
2. Run **Chat: Install Plugin From Source** from the Command Palette.
3. Enter `https://github.com/cceyn/defeat-me` and confirm the source.
4. Start a new Copilot chat and ask it to work on a small change.

Alternatively, in a Copilot harness session, use `/plugin install https://github.com/cceyn/defeat-me`. Plugin support must be enabled in VS Code. Review the hook behavior below before enabling its project configuration.

Skills are available to Copilot and other compatible agents that support the Agent Skills standard. A skill being available does not guarantee that an agent invokes it for every relevant request.

## Skills

### `defeat-done`

Requires actual tests, build, and lint checks before the agent reports completion. It asks for a regression test that fails before a bug fix, then requires the test and relevant checks to pass. It also directs the agent to probe edge cases, malformed inputs, failure paths, and side effects, and to state what could not be verified.

**Before**

> Fixed the parser; it should work now.

**After**

> `npm test -- --runInBand` - passed (18 tests); `npm run build` - passed; lint - not run (no lint script). The empty-input regression test failed before the fix and passes now. Lint remains unverified.

### `defeat-hallucinations`

Requires verification of package names and version-specific APIs against the project's manifests, lockfile, installed sources/types, and official versioned documentation. It prohibits installing an unverified package and asks the agent to state uncertainty instead of guessing.

**Before**

> I'll install the unfamiliar package and use its API from memory; it should exist.

**After**

> I could not verify the package name or API against the configured registry, installed dependencies, or an official source, so I did not install or use it. I can verify the intended package or use an installed parser.

### `defeat-scope`

Keeps the diff limited to the request, protects existing user changes, and requires a final list of changed files with reasons and an explicit note about any necessary scope expansion.

**Before**

> I fixed validation and reformatted the surrounding module.

**After**

> Changed `src/validate.ts` for the requested validation and `src/validate.test.ts` for its regression test. No unrelated refactoring or files changed.

## Optional completion hook

The plugin includes a Copilot-specific `agentStop` hook. VS Code currently documents hooks as **Preview**. The hook is a separate, optional check: it does not replace the `defeat-done` skill's build and lint instructions.

### Enable it for a project

The hook does not guess the project's test framework. To enable it, add a `.defeat-me.json` file to the **root of the project where Copilot runs**:

```json
{
  "enabled": true,
  "testCommand": "npm test"
}
```

Replace `"npm test"` with the exact shell command for that project's tests. For example, a project might use `"pytest"` or `"cargo test"`; use only a command verified for your project. Do not add a package just for this hook.

If `.defeat-me.json` is absent, or `enabled` is not `true`, the hook does nothing. When enabled, it runs the configured test command from the project root on each main-agent completion attempt. A failed command, invalid configuration, or inability to start the test runner blocks that completion and returns the error and, on failure, up to the last 6,000 characters of combined test output to the agent. A successful command returns no test log. The configured test process has a 110-second timeout; the hook itself has a 120-second timeout. The command inherits the current environment and runs project code, so review the configuration and trust the project before enabling it.

The hook requires Node.js, available as `node`, on the machine or remote environment running the Copilot session. It runs:

```text
node "${PLUGIN_ROOT}/scripts/verify-tests.cjs"
```

The verifier reads the hook event from standard input and only reads `.defeat-me.json` in the current project root. If enabled, it executes the configured `testCommand` text through the platform shell in that root; this supports common Windows script commands such as `npm test`. The setting is executable shell input: review it and enable the hook only in a project you trust. The verifier itself does not install dependencies, inspect package manifests, run build/lint commands, or read other project files. The configured command inherits the current environment and can access files and services available to that process.

To turn the check off while keeping the plugin installed, change `"enabled": true` to `"enabled": false` in `.defeat-me.json`. To remove the plugin entirely, uninstall it from VS Code or use `/plugin uninstall defeat-me` in the Copilot harness. Hooks can execute commands on your machine; inspect the source before installation and consult the [official hooks reference](https://docs.github.com/en/copilot/reference/hooks-reference).

## Package structure

```text
plugin.json
skills/
  defeat-done/SKILL.md
  defeat-hallucinations/SKILL.md
  defeat-scope/SKILL.md
com.github.copilot/
  hooks/hooks.json
scripts/
  verify-tests.cjs
```

The skills use the portable Agent Skills format. The completion hook is intentionally under `com.github.copilot`: hooks are Copilot-specific, not a portable Agent Plugins component.

## Official format references

- [VS Code Agent plugin authoring reference](https://code.visualstudio.com/docs/agents/reference/agent-plugin-reference)
- [VS Code Agent Skills guide](https://code.visualstudio.com/docs/agent-customization/agent-skills)
- [GitHub Copilot hooks reference](https://docs.github.com/en/copilot/reference/hooks-reference)

## Repository metadata suggestions

- **Description:** Portable agent skills that make coding agents prove their work before declaring it done.
- **Topics:** `github-copilot`, `ai-agents`, `agent-skills`, `developer-tools`
- Add `mcp` only if a later release includes an MCP integration; the current package does not.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for scope, documentation, and validation expectations.

## License

MIT. See [LICENSE](LICENSE).

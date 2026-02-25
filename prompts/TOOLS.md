# Tools Configuration

# Place this file in ~/.openclaw/workspace/TOOLS.md

# This provides custom instructions for how the agent should use its tools.

# Docs: https://docs.openclaw.ai/reference/templates/TOOLS

## Tool Preferences

- Prefer `web_fetch` for simple page reads; use `browser` only when interaction is needed
- Use `exec` with clear, specific commands — avoid chaining too many commands
- When using `cron`, always confirm the schedule with the user first

## Safety Rules

- Never exec commands that modify system files without explicit confirmation
- Always use `--dry-run` flags when available for destructive operations
- Keep file writes within the workspace directory unless directed elsewhere

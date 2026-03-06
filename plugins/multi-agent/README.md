# 🤖 Multi-Agent Plugin

Orchestrate **3 specialized agents** under a single OpenClaw instance — each with its own workspace, personality, tools, and routing rules.

## Agents

| Agent          | ID           | Emoji | Role                                           |
| -------------- | ------------ | ----- | ---------------------------------------------- |
| **Coder**      | `coder`      | ⚡    | Test-driven developer. TypeScript-first.       |
| **Researcher** | `researcher` | 🔬    | Deep research, data analysis, citations.       |
| **Supervisor** | `supervisor` | 🎯    | Orchestrator. Delegates to Coder & Researcher. |

## Install

```bash
# Dev mode (linked — edits reflect immediately)
openclaw plugins install -l ./plugins/multi-agent

# Production (copied)
openclaw plugins install ./plugins/multi-agent

# Restart gateway
openclaw gateway restart
```

## CLI Commands

```bash
openclaw multiagent status   # Show agent roster
openclaw multiagent config   # Generate openclaw.json snippet
openclaw multiagent init     # Step-by-step setup guide
```

### Config Generation Options

```bash
# All agents (default)
openclaw multiagent config

# Specific agents only
openclaw multiagent config --agents coder,researcher

# Include example channel bindings
openclaw multiagent config --channel telegram
```

## Chat Commands

| Command       | Description                               |
| ------------- | ----------------------------------------- |
| `/agents`     | List all agents with capabilities         |
| `@coder`      | Route message to Coder (group chats)      |
| `@researcher` | Route message to Researcher (group chats) |
| `@supervisor` | Route message to Supervisor (group chats) |

## Agent Tools

| Tool           | Description                                       | Optional |
| -------------- | ------------------------------------------------- | -------- |
| `list_agents`  | Enumerate available agents and capabilities       | Yes      |
| `spawn_worker` | Prepare a `sessions_spawn` payload for delegation | Yes      |

To enable optional tools, add to your agent's `tools.allow`:

```jsonc
{
  "agents": {
    "list": [
      {
        "id": "supervisor",
        "tools": {
          "allow": ["multi-agent"], // enables all plugin tools
        },
      },
    ],
  },
}
```

## Setup

1. **Install the plugin** (see above)

2. **Generate config:**

   ```bash
   openclaw multiagent config
   ```

3. **Merge into `~/.openclaw/openclaw.json`**

4. **Create workspace directories:**

   ```bash
   mkdir -p ~/.openclaw/workspace-coder
   mkdir -p ~/.openclaw/workspace-researcher
   mkdir -p ~/.openclaw/workspace-supervisor
   ```

5. **Copy personality prompts:**

   ```bash
   cp plugins/multi-agent/workspaces/coder/SOUL.md ~/.openclaw/workspace-coder/
   cp plugins/multi-agent/workspaces/researcher/SOUL.md ~/.openclaw/workspace-researcher/
   cp plugins/multi-agent/workspaces/supervisor/SOUL.md ~/.openclaw/workspace-supervisor/
   ```

6. **Restart gateway:**
   ```bash
   openclaw gateway restart
   ```

## Customization

### Add a new agent

Edit `src/agents.js` — add a new entry to the `AGENTS` array. The plugin auto-registers it everywhere.

### Change models

Edit the `model` field in each agent profile, or the `agents.defaults.model` in the generated config.

### Add channel bindings

```bash
openclaw multiagent config --channel telegram
```

Or manually add to `bindings[]` in your config:

```jsonc
{
  "bindings": [
    {
      "agentId": "coder",
      "match": {
        "channel": "telegram",
        "peer": { "kind": "group", "id": "dev-chat" },
      },
    },
    {
      "agentId": "researcher",
      "match": {
        "channel": "telegram",
        "peer": { "kind": "group", "id": "research" },
      },
    },
  ],
}
```

## Gateway RPC

| Method              | Description                                                      |
| ------------------- | ---------------------------------------------------------------- |
| `multiagent.status` | Agent roster + plugin version                                    |
| `multiagent.config` | Generated config snippet (accepts `agentIds`, `bindings` params) |

## Architecture

```
plugins/multi-agent/
├── package.json              # Plugin manifest
├── README.md                 # This file
├── src/
│   ├── index.js              # Main entry: RPC, tools, commands, CLI
│   ├── agents.js             # Agent profile definitions
│   └── config-generator.js   # Config snippet generator
└── workspaces/               # Per-agent prompt templates
    ├── coder/SOUL.md
    ├── researcher/SOUL.md
    └── supervisor/SOUL.md
```

/**
 * Agent profile definitions for the multi-agent plugin.
 *
 * Each profile maps to an entry in `agents.list[]` in openclaw.json.
 * Agents get their own workspace, identity, tool allowlist, and skill set.
 */

export const AGENTS = [
  {
    id: "coder",
    default: true,
    name: "Coder",
    workspace: "~/.openclaw/workspace-coder",
    agentDir: "~/.openclaw/agents/coder/agent",
    model: "anthropic/claude-sonnet-4-5",
    identity: {
      name: "Coder",
      theme: "precise engineer",
      emoji: "⚡",
    },
    groupChat: {
      mentionPatterns: ["@coder", "coder"],
    },
    sandbox: { mode: "off" },
    subagents: {
      allowAgents: ["*"],
    },
    tools: {
      profile: "coding",
      allow: ["browser", "group:plugins"],
      elevated: { enabled: true },
    },
    _meta: {
      description:
        "Sharp, test-driven developer. TypeScript-first. Writes clean, documented code with tests.",
      skills: [
        "tdd",
        "code-reviewer",
        "software-arch",
        "git-worktrees",
        "changelog-gen",
        "webapp-testing",
        "prompt-eng",
        "ollama-local",
      ],
    },
  },
  {
    id: "researcher",
    default: false,
    name: "Researcher",
    workspace: "~/.openclaw/workspace-researcher",
    agentDir: "~/.openclaw/agents/researcher/agent",
    model: "anthropic/claude-sonnet-4-5",
    identity: {
      name: "Researcher",
      theme: "meticulous analyst",
      emoji: "🔬",
    },
    groupChat: {
      mentionPatterns: ["@researcher", "researcher"],
    },
    sandbox: { mode: "off" },
    subagents: {
      allowAgents: ["*"],
    },
    tools: {
      profile: "coding",
      allow: ["browser", "group:plugins"],
      elevated: { enabled: true },
    },
    _meta: {
      description:
        "Thorough researcher. Structured output with citations. Deep dives and data analysis.",
      skills: [
        "deep-research",
        "csv-analyzer",
        "web-summarizer",
        "article-extractor",
        "youtube-transcript",
        "brainstorm",
        "newsletter-ideation",
        "content-extractor",
      ],
    },
  },
  {
    id: "supervisor",
    default: false,
    name: "Supervisor",
    workspace: "~/.openclaw/workspace-supervisor",
    agentDir: "~/.openclaw/agents/supervisor/agent",
    model: "anthropic/claude-sonnet-4-5",
    identity: {
      name: "Supervisor",
      theme: "calm orchestrator",
      emoji: "🎯",
    },
    groupChat: {
      mentionPatterns: ["@supervisor", "supervisor", "@boss"],
    },
    sandbox: { mode: "off" },
    subagents: {
      allowAgents: ["*"],
    },
    tools: {
      profile: "coding",
      allow: [
        "browser",
        "group:plugins",
        "sessions_list",
        "sessions_history",
        "sessions_send",
        "sessions_spawn",
        "session_status",
      ],
      elevated: { enabled: true },
    },
    _meta: {
      description:
        "Task orchestrator. Decomposes complex tasks, delegates to Coder and Researcher, synthesizes results.",
      skills: [
        "tdd",
        "code-reviewer",
        "software-arch",
        "deep-research",
        "csv-analyzer",
        "web-summarizer",
        "brainstorm",
        "flow-bvinci1",
      ],
    },
  },
];

/**
 * Get a flat summary of all agents for display.
 */
export function getAgentSummary() {
  return AGENTS.map((a) => ({
    id: a.id,
    name: a.name,
    emoji: a.identity.emoji,
    default: a.default,
    description: a._meta.description,
    skills: a._meta.skills,
    model: a.model,
  }));
}

/**
 * Get an agent profile by ID.
 */
export function getAgent(id) {
  return AGENTS.find((a) => a.id === id) ?? null;
}

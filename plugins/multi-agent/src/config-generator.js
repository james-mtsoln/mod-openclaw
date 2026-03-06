/**
 * Config generator for multi-agent setup.
 *
 * Produces an openclaw.json snippet that can be merged into the user's
 * existing config. Does NOT modify any files directly.
 */

import { AGENTS } from "./agents.js";

/**
 * Strip internal `_meta` fields from agent profiles so they are
 * valid for openclaw.json.
 */
function cleanAgentProfile(agent) {
  const { _meta, ...profile } = agent;
  return profile;
}

/**
 * Generate the full openclaw.json config snippet for multi-agent setup.
 *
 * @param {Object} options
 * @param {string[]} [options.agentIds] — subset of agent IDs to include (default: all)
 * @param {Object[]} [options.bindings] — custom channel bindings (default: none)
 * @returns {Object} JSON-serializable config snippet
 */
export function generateConfig(options = {}) {
  const { agentIds, bindings = [] } = options;

  // Filter agents if specific IDs requested
  const agents = agentIds
    ? AGENTS.filter((a) => agentIds.includes(a.id))
    : AGENTS;

  const agentList = agents.map(cleanAgentProfile);

  const config = {
    agents: {
      defaults: {
        model: {
          primary: "anthropic/claude-sonnet-4-5",
          fallbacks: ["openai/gpt-4.1"],
        },
        subagents: {
          model: "anthropic/claude-sonnet-4-5",
          maxConcurrent: 2,
          runTimeoutSeconds: 900,
          archiveAfterMinutes: 60,
        },
      },
      list: agentList,
    },
    tools: {
      agentToAgent: {
        enabled: true,
        allow: agents.map((a) => a.id),
      },
      sessions: {
        visibility: "tree",
      },
    },
    session: {
      dmScope: "per-channel-peer",
    },
  };

  // Add bindings if provided
  if (bindings.length > 0) {
    config.bindings = bindings;
  }

  return config;
}

/**
 * Generate example bindings for common channel setups.
 *
 * @param {"telegram" | "discord" | "whatsapp" | "slack"} channel
 * @returns {Object[]} Array of binding objects
 */
export function generateExampleBindings(channel) {
  return AGENTS.filter((a) => !a.default).map((agent) => ({
    agentId: agent.id,
    match: {
      channel,
      peer: {
        kind: "group",
        id: `${agent.id}-channel`,
      },
    },
  }));
}

/**
 * Generate a pretty-printed JSON string ready for copy-paste.
 */
export function generateConfigString(options = {}) {
  return JSON.stringify(generateConfig(options), null, 2);
}

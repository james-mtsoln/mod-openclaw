/**
 * OpenClaw Multi-Agent Plugin
 *
 * Registers 3 specialized agents (Coder, Researcher, Supervisor) with:
 * - Agent management tools (list_agents, spawn_worker)
 * - Gateway RPC methods (multiagent.status, multiagent.config)
 * - Auto-reply command (/agents)
 * - CLI commands (openclaw multiagent status|config|init)
 *
 * Plugin API: https://docs.openclaw.ai/tools/plugin
 * Multi-Agent: https://docs.openclaw.ai/concepts/multi-agent
 *
 * Usage:
 *   openclaw plugins install -l ./plugins/multi-agent   # dev mode (linked)
 *   openclaw plugins install ./plugins/multi-agent       # production (copied)
 */

import { AGENTS, getAgentSummary, getAgent } from "./agents.js";
import {
  generateConfig,
  generateConfigString,
  generateExampleBindings,
} from "./config-generator.js";

export default function register(api) {
  // ═══════════════════════════════════════════════════════════════════════
  // 1. Gateway RPC Methods
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * multiagent.status — returns all agent profiles and plugin version
   */
  api.registerGatewayMethod("multiagent.status", ({ respond }) => {
    respond(true, {
      ok: true,
      plugin: "multi-agent",
      version: "1.0.0",
      agents: getAgentSummary(),
    });
  });

  /**
   * multiagent.config — returns the generated openclaw.json snippet
   */
  api.registerGatewayMethod("multiagent.config", ({ respond, params }) => {
    try {
      const config = generateConfig(params ?? {});
      respond(true, { ok: true, config });
    } catch (err) {
      respond(false, { ok: false, error: err.message });
    }
  });

  // ═══════════════════════════════════════════════════════════════════════
  // 2. Auto-Reply Command (/agents)
  // ═══════════════════════════════════════════════════════════════════════

  api.registerCommand({
    name: "agents",
    description: "List all available agents and their capabilities",
    acceptsArgs: false,
    requireAuth: true,
    handler: () => {
      const summary = getAgentSummary();
      const lines = summary.map(
        (a) =>
          `${a.emoji} **${a.name}** (\`${a.id}\`)${a.default ? " ⭐ default" : ""}\n` +
          `   ${a.description}\n` +
          `   Skills: ${a.skills.join(", ")}`
      );

      return {
        text:
          `🤖 **Multi-Agent Roster** (${summary.length} agents)\n\n` +
          lines.join("\n\n") +
          `\n\n_Use \`@<agent-name>\` in group chats to route messages._`,
      };
    },
  });

  // ═══════════════════════════════════════════════════════════════════════
  // 3. Agent Tools (available to the AI agent)
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * list_agents — lets the agent enumerate its peers
   */
  api.registerTool(
    {
      name: "list_agents",
      description:
        "List all available agents in this OpenClaw instance, including their IDs, " +
        "capabilities, skills, and current configuration. Use this to understand " +
        "what specialized agents are available before delegating tasks.",
      parameters: {
        type: "object",
        properties: {
          agentId: {
            type: "string",
            description:
              "Optional: get details for a specific agent by ID. " +
              "Omit to list all agents.",
          },
        },
        required: [],
      },
      async execute(_id, params) {
        if (params.agentId) {
          const agent = getAgent(params.agentId);
          if (!agent) {
            return {
              content: [
                {
                  type: "text",
                  text: `Agent "${params.agentId}" not found. Available: ${AGENTS.map((a) => a.id).join(", ")}`,
                },
              ],
            };
          }
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    id: agent.id,
                    name: agent.name,
                    emoji: agent.identity.emoji,
                    default: agent.default,
                    model: agent.model,
                    description: agent._meta.description,
                    skills: agent._meta.skills,
                    mentionPatterns: agent.groupChat.mentionPatterns,
                    workspace: agent.workspace,
                  },
                  null,
                  2
                ),
              },
            ],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(getAgentSummary(), null, 2),
            },
          ],
        };
      },
    },
    { optional: true }
  );

  /**
   * spawn_worker — convenience wrapper for sessions_spawn that knows
   * about the available agent profiles. The actual spawn is done by
   * the built-in sessions_spawn tool — this tool just helps the agent
   * pick the right worker and compose the task.
   */
  api.registerTool(
    {
      name: "spawn_worker",
      description:
        "Get a pre-composed sessions_spawn payload for delegating a task to a " +
        "specialized worker agent. Returns the agentId and suggested prompt " +
        "prefix. You should then call sessions_spawn with the returned values " +
        "to actually create the worker session.",
      parameters: {
        type: "object",
        properties: {
          agentId: {
            type: "string",
            description:
              'The worker agent to spawn. One of: "coder", "researcher", "supervisor".',
          },
          task: {
            type: "string",
            description:
              "A clear description of the task to delegate to the worker.",
          },
        },
        required: ["agentId", "task"],
      },
      async execute(_id, params) {
        const agent = getAgent(params.agentId);
        if (!agent) {
          return {
            content: [
              {
                type: "text",
                text: `Unknown agent "${params.agentId}". Available: ${AGENTS.map((a) => a.id).join(", ")}`,
              },
            ],
          };
        }

        const payload = {
          agentId: agent.id,
          prompt: `You are the ${agent.name} agent (${agent._meta.description}).\n\nTask: ${params.task}`,
          runTimeoutSeconds: 900,
        };

        return {
          content: [
            {
              type: "text",
              text:
                `Ready to spawn **${agent.identity.emoji} ${agent.name}**.\n\n` +
                `Call \`sessions_spawn\` with these parameters:\n\`\`\`json\n${JSON.stringify(payload, null, 2)}\n\`\`\``,
            },
          ],
        };
      },
    },
    { optional: true }
  );

  // ═══════════════════════════════════════════════════════════════════════
  // 4. CLI Commands (openclaw multiagent ...)
  // ═══════════════════════════════════════════════════════════════════════

  api.registerCli(
    ({ program }) => {
      const cmd = program
        .command("multiagent")
        .description("Multi-agent orchestration management");

      // openclaw multiagent status
      cmd
        .command("status")
        .description("Show all registered agent profiles")
        .action(() => {
          const summary = getAgentSummary();
          console.log("\n🤖 Multi-Agent Plugin v1.0.0\n");
          console.log(`${summary.length} agents registered:\n`);
          for (const agent of summary) {
            console.log(
              `  ${agent.emoji} ${agent.name} (${agent.id})${agent.default ? " ⭐ default" : ""}`
            );
            console.log(`    ${agent.description}`);
            console.log(`    Model: ${agent.model}`);
            console.log(`    Skills: ${agent.skills.join(", ")}`);
            console.log();
          }
        });

      // openclaw multiagent config
      cmd
        .command("config")
        .description(
          "Generate openclaw.json config snippet for multi-agent setup"
        )
        .option(
          "--agents <ids>",
          "Comma-separated agent IDs to include (default: all)"
        )
        .option(
          "--channel <channel>",
          "Generate example bindings for this channel"
        )
        .option("--pretty", "Pretty-print the JSON output", true)
        .action((opts) => {
          const options = {};

          if (opts.agents) {
            options.agentIds = opts.agents.split(",").map((s) => s.trim());
          }

          if (opts.channel) {
            options.bindings = generateExampleBindings(opts.channel);
          }

          const output = opts.pretty
            ? generateConfigString(options)
            : JSON.stringify(generateConfig(options));

          console.log("\n// Merge this into your ~/.openclaw/openclaw.json:\n");
          console.log(output);
          console.log();
        });

      // openclaw multiagent init
      cmd
        .command("init")
        .description("Show setup instructions for multi-agent workspaces")
        .action(() => {
          console.log("\n🚀 Multi-Agent Setup Instructions\n");
          console.log("1. Generate your config:");
          console.log("   openclaw multiagent config > /tmp/multiagent.json\n");
          console.log(
            "2. Merge the output into ~/.openclaw/openclaw.json\n"
          );
          console.log("3. Create agent workspace directories:");
          for (const agent of AGENTS) {
            const dir = agent.workspace.replace("~", "$HOME");
            console.log(`   mkdir -p ${dir}`);
          }
          console.log();
          console.log("4. Copy SOUL.md prompts to each workspace:");
          console.log(
            "   Plugin includes templates in plugins/multi-agent/workspaces/\n"
          );
          console.log("5. Restart the gateway:");
          console.log("   openclaw gateway restart\n");
          console.log(
            "6. Test with: /agents (auto-reply) or @coder/@researcher in group chats\n"
          );
        });
    },
    { commands: ["multiagent"] }
  );

  // ═══════════════════════════════════════════════════════════════════════

  console.log(
    `[multi-agent] Plugin registered — ${AGENTS.length} agents available`
  );
}

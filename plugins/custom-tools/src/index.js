/**
 * OpenClaw Custom Tools Plugin
 *
 * This plugin registers custom agent tools that extend OpenClaw's capabilities
 * without modifying the core codebase.
 *
 * Plugin API: https://docs.openclaw.ai/tools/plugin
 * Agent Tools: https://docs.openclaw.ai/plugins/agent-tools
 *
 * Usage:
 *   openclaw plugins install -l ./plugins/custom-tools   # dev mode (linked)
 *   openclaw plugins install ./plugins/custom-tools       # production (copied)
 */

export default function register(api) {
  // ── Example 1: Register a custom agent tool ──────────────────────────
  // This tool will be available to the agent alongside built-in tools
  // like exec, browser, web_search, etc.

  // api.registerAgentTool({
  //   name: "my_custom_tool",
  //   description: "Description of what this tool does — the agent reads this",
  //   parameters: {
  //     type: "object",
  //     properties: {
  //       query: {
  //         type: "string",
  //         description: "The input query",
  //       },
  //     },
  //     required: ["query"],
  //   },
  //   execute: async ({ query }) => {
  //     // Your tool logic here
  //     // Return a string or object — it will be sent back to the agent
  //     return { result: `Processed: ${query}` };
  //   },
  // });

  // ── Example 2: Register a Gateway RPC method ─────────────────────────
  // Accessible via WebSocket: { method: "custom-tools.status" }

  api.registerGatewayMethod("custom-tools.status", ({ respond }) => {
    respond(true, {
      ok: true,
      plugin: "custom-tools",
      version: "1.0.0",
      skills: [
        "hello-world",
        "web-summarizer",
        "daily-digest",
        "code-reviewer",
      ],
    });
  });

  // ── Example 3: Register a CLI command ────────────────────────────────
  // Usage: openclaw custom-tools status

  // api.registerCommand({
  //   name: "custom-tools",
  //   description: "Manage custom tools",
  //   subcommands: {
  //     status: {
  //       description: "Show custom tools status",
  //       action: async () => {
  //         console.log("Custom tools plugin is active!");
  //       },
  //     },
  //   },
  // });

  console.log("[custom-tools] Plugin registered successfully");
}

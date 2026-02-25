---
name: llm-router
description: Intelligent proxy that classifies requests by complexity and routes to the right LLM — cheap models for simple tasks, powerful models for hard ones.
user-invocable: true
metadata: { "openclaw": { "emoji": "🔀" } }
---

# LLM Router

Intelligent model routing proxy — auto-selects the right LLM by task complexity. From [openclaw/skills](https://github.com/openclaw/skills/tree/main/skills/alexrudloff/llmrouter) by @alexrudloff.

**Saves money:** Simple "hello" → Haiku. Complex architecture → Opus. Automatic.

## Complexity Levels

| Level      | Use Case                     | Default Model |
| ---------- | ---------------------------- | ------------- |
| super_easy | Greetings, acknowledgments   | Haiku         |
| easy       | Simple Q&A, reminders        | Haiku         |
| medium     | Coding, emails, research     | Sonnet        |
| hard       | Complex reasoning, debugging | Opus          |
| super_hard | System architecture, proofs  | Opus          |

## Model Routing Config

```yaml
# Anthropic example
models:
  super_easy: "anthropic:claude-haiku-4-5-20251001"
  easy: "anthropic:claude-haiku-4-5-20251001"
  medium: "anthropic:claude-sonnet-4-20250514"
  hard: "anthropic:claude-opus-4-20250514"
  super_hard: "anthropic:claude-opus-4-20250514"
```

Supports: Anthropic, OpenAI, Google Gemini, Kimi/Moonshot, and local Ollama.

## Classifier Options

- **Local (free)**: Ollama + `qwen2.5:3b`
- **Anthropic**: Haiku (fast, cheap)
- **OpenAI**: GPT-4o-mini
- **Google**: Gemini Flash

## API (OpenAI-compatible)

```bash
curl http://localhost:4001/v1/chat/completions \
  -H "Authorization: Bearer $ANTHROPIC_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llm-router",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

## OpenClaw Integration

Add to `~/.openclaw/openclaw.json`:

```json
{
  "models": {
    "providers": {
      "localrouter": {
        "baseUrl": "http://localhost:4001/v1",
        "apiKey": "via-router",
        "api": "openai-completions",
        "models": [
          {
            "id": "llm-router",
            "name": "LLM Router (Auto-routes by complexity)",
            "contextWindow": 200000,
            "maxTokens": 8192
          }
        ]
      }
    }
  }
}
```

## Run as macOS Service

Can be configured as a LaunchAgent for always-on routing. See the full skill docs for plist setup.

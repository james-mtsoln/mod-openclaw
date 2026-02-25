---
name: ollama-local
description: Manage and use local Ollama models — list, pull, chat, generate, embeddings, tool-use, and sub-agent spawning.
user-invocable: true
metadata: { "openclaw": { "emoji": "🦙", "requires": { "bins": ["ollama"] } } }
---

# Ollama Local

Work with local LLMs via Ollama. From [openclaw/skills](https://github.com/openclaw/skills/tree/main/skills/timverhoogt/ollama-local) by @timverhoogt.

## Configuration

```bash
export OLLAMA_HOST="http://localhost:11434"    # Default
# Or remote: export OLLAMA_HOST="http://192.168.1.100:11434"
```

## Model Management

```bash
ollama list                    # List installed models
ollama pull llama3.1:8b        # Download a model
ollama rm modelname            # Remove a model
ollama show qwen3:4b           # Model details
```

## Quick Picks

| Use Case     | Model              | Size    |
| ------------ | ------------------ | ------- |
| Fast answers | `qwen3:4b`         | ~2.5 GB |
| Coding       | `qwen2.5-coder:7b` | ~4.5 GB |
| General      | `llama3.1:8b`      | ~4.7 GB |
| Reasoning    | `deepseek-r1:8b`   | ~4.9 GB |

## Chat & Generate

```bash
# Chat
ollama run qwen3:4b "What is the capital of France?"

# With system prompt
ollama run llama3.1:8b --system "You are a code reviewer" "Review this code"
```

## Direct API

```bash
# Chat
curl $OLLAMA_HOST/api/chat -d '{
  "model": "qwen3:4b",
  "messages": [{"role": "user", "content": "Hello"}],
  "stream": false
}'

# Embeddings
curl $OLLAMA_HOST/api/embeddings -d '{
  "model": "bge-m3",
  "prompt": "Text to embed"
}'

# List models
curl $OLLAMA_HOST/api/tags
```

## Sub-Agent Pattern

Spawn local model sub-agents:

```python
sessions_spawn(
    task="Review this Python code for bugs",
    model="ollama/qwen2.5-coder:7b",
    label="code-review"
)
```

### Think Tank (Parallel Agents)

```python
agents = [
    {"label": "architect", "model": "ollama/gemma3:12b", "task": "Design architecture"},
    {"label": "coder", "model": "ollama/qwen2.5-coder:7b", "task": "Implement logic"},
    {"label": "reviewer", "model": "ollama/llama3.1:8b", "task": "Review for bugs"},
]
for a in agents:
    sessions_spawn(task=a["task"], model=a["model"], label=a["label"])
```

## Troubleshooting

- **Connection refused** → `ollama serve` to start
- **Model not loading** → Try smaller model (check VRAM)
- **Slow responses** → Model may be on CPU, use smaller quantization

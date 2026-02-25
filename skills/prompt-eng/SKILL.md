---
name: prompt-eng
description: Apply advanced prompt engineering techniques — chain-of-thought, few-shot, role-play, and Anthropic best practices.
metadata: { "openclaw": { "emoji": "🧠" } }
---

# Prompt Engineering

Prompt design patterns and best practices. Adapted from [context-engineering-kit](https://github.com/NeoLabHQ/context-engineering-kit).

## Instructions

When the user asks to create or improve a prompt, apply these techniques:

### Core Techniques

**1. Role Assignment**

```
You are a [specific expert role] with [years] of experience in [domain].
```

- Be specific: "senior tax accountant" not "helpful assistant"
- Add constraints: "You only answer questions about X"

**2. Chain-of-Thought (CoT)**

```
Think through this step-by-step:
1. First, identify...
2. Then, analyze...
3. Finally, determine...
```

- Forces structured reasoning
- Reduces hallucination on complex tasks

**3. Few-Shot Examples**

```
Here are examples of the desired output:
Input: X → Output: Y
Input: A → Output: B
Now process: {actual input}
```

- 2-3 examples is usually optimal
- Show edge cases if relevant

**4. Output Format Specification**

```
Respond in this exact JSON format:
{ "field": "description" }
```

- Be explicit about structure
- Show the exact format you expect

**5. Negative Constraints**

```
Do NOT:
- Include disclaimers or caveats
- Use bullet points
- Exceed 100 words
```

- Telling the model what to avoid is often more effective than what to do

### Anthropic-Specific Patterns

- **XML tags**: Use `<thinking>`, `<answer>` tags for structured responses
- **Prefill**: Start the assistant's response to guide format
- **System prompts**: Put unchanging instructions in the system message
- **Temperature**: 0 for factual, 0.7-1.0 for creative tasks

### Prompt Review Checklist

When reviewing a prompt, score it against:

- [ ] Is the role/persona clearly defined?
- [ ] Are constraints explicit (not implied)?
- [ ] Is the output format specified?
- [ ] Are there examples (if task is complex)?
- [ ] Are edge cases addressed?
- [ ] Is the prompt concise (no redundant instructions)?

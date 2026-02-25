---
name: brainstorm
description: Transform rough ideas into fully-formed designs through structured questioning and alternative exploration.
user-invocable: true
metadata: { "openclaw": { "emoji": "💡" } }
---

# Brainstorming Assistant

Structured creative thinking partner. Adapted from [obra/superpowers](https://github.com/obra/superpowers).

## Usage

```
/brainstorm <rough idea or problem>
```

## Instructions

When the user presents a rough idea or problem:

### Phase 1: Understand (Don't jump to solutions)

- Restate the problem in your own words
- Ask 2-3 clarifying questions about constraints, goals, and audience
- Identify unstated assumptions

### Phase 2: Diverge (Generate alternatives)

- Produce **5-7 distinct approaches** — not variations of the same idea
- For each approach:
  - **Name** it (memorable, descriptive)
  - **1-line pitch** (elevator pitch)
  - **Key insight** (why this is different)
  - **Risk** (biggest concern)
- Include at least one "wild card" approach that challenges assumptions

### Phase 3: Evaluate (Structured comparison)

Present a comparison table:

| Approach | Effort | Impact | Risk  | Novelty |
| -------- | ------ | ------ | ----- | ------- |
| Name     | L/M/H  | L/M/H  | L/M/H | L/M/H   |

### Phase 4: Converge (Recommendation)

- Recommend the top 2 approaches with reasoning
- Suggest a concrete next step for each
- Offer to deep-dive into any approach

### Rules

- **Never dismiss ideas** — explore them first, then evaluate
- **Challenge the obvious** — the first solution is rarely the best
- **Stay neutral** until the evaluation phase
- **Ask before recommending** — the user may have context you don't

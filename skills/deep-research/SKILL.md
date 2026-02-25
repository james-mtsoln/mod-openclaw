---
name: deep-research
description: Execute multi-step autonomous research with source verification, structured reports, and citation tracking.
user-invocable: true
metadata: { "openclaw": { "emoji": "🔬" } }
---

# Deep Research

Autonomous multi-step research assistant. Adapted from [ai-skills/deep-research](https://github.com/sanjay3290/ai-skills).

## Usage

```
/research <topic or question>
```

## Instructions

When the user requests research on a topic:

### Phase 1: Scope

- Clarify the research question if ambiguous
- Identify 3-5 key sub-questions to investigate
- Present the research plan to the user for approval

### Phase 2: Investigate

For each sub-question:

1. **Search** using the browser/web_search tool across multiple sources
2. **Extract** key facts, data points, and expert opinions
3. **Track sources** — every claim must have a URL citation
4. **Cross-reference** — verify facts across 2+ sources when possible
5. **Note contradictions** — flag when sources disagree

### Phase 3: Synthesize

Compile findings into a structured report:

```
## Research Report: {Topic}

### Executive Summary
{2-3 sentence overview}

### Key Findings
1. **Finding** — explanation with [source](url)
2. ...

### Analysis
{Deeper discussion connecting findings}

### Contradictions & Uncertainties
{What sources disagree on, what remains unclear}

### Sources
1. [Title](url) — accessed {date}
2. ...
```

### Rules

- **Never fabricate sources** — only cite URLs you actually visited
- **Flag confidence levels** — high/medium/low for each finding
- **Time-box each sub-question** to ~3 search queries max
- **Always include the date of access** in source citations

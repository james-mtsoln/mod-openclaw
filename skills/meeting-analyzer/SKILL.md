---
name: meeting-analyzer
description: Analyze meeting transcripts — identify speaking ratios, action items, decisions made, conflict patterns, and follow-ups.
user-invocable: true
metadata: { "openclaw": { "emoji": "🎙️" } }
---

# Meeting Insights Analyzer

Deep meeting transcript analysis. Adapted from [awesome-claude-skills/meeting-insights-analyzer](https://github.com/ComposioHQ/awesome-claude-skills).

## Usage

```
/meeting <transcript-file-or-paste>
```

## Instructions

### Step 1: Parse the Transcript

- Identify speakers (by name or label)
- Segment into speaker turns
- Detect timestamps if present

### Step 2: Quantitative Analysis

```
## Speaking Stats
| Speaker | Words | % of Total | Avg Turn Length | Interruptions |
|---------|-------|------------|-----------------|---------------|
```

### Step 3: Extract Key Items

**Decisions Made:**

- List every explicit decision with who made it and context

**Action Items:**

- `[ ] {Task} — Owner: {name} — Due: {date if mentioned}`

**Questions Asked (Unresolved):**

- Questions raised but not answered in the meeting

**Key Quotes:**

- Notable statements, strong opinions, or commitments

### Step 4: Behavioral Insights

- **Dominance ratio** — is one person doing >50% of talking?
- **Question ratio** — who's asking vs. telling?
- **Filler words** — "um", "like", "you know" by speaker
- **Conflict signals** — "but", "I disagree", "actually"
- **Alignment signals** — "I agree", "exactly", "good point"

### Step 5: Summary

```markdown
## Meeting Summary

**Date:** {if available}
**Attendees:** {names}
**Duration:** {estimated from transcript length}

### TL;DR

{2-3 sentence summary}

### Decisions

1. {decision}

### Action Items

- [ ] {task} → {owner}

### Follow-ups Needed

- {unresolved topic}
```

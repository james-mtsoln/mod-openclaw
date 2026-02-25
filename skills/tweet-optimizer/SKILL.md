---
name: tweet-optimizer
description: Analyze and optimize tweets for maximum reach using Twitter's open-source algorithm insights. Rewrite for engagement.
user-invocable: true
metadata: { "openclaw": { "emoji": "🐦" } }
---

# Tweet Optimizer

Optimize tweets using Twitter's algorithm insights. Adapted from [awesome-claude-skills/twitter-algorithm-optimizer](https://github.com/ComposioHQ/awesome-claude-skills).

## Usage

```
/tweet <draft tweet text>
```

## Instructions

When the user provides a draft tweet, analyze and optimize it:

### Algorithm Scoring Factors (from Twitter's open-source code)

**Positive signals (boost reach):**

- Replies (+1.0x weight) — strongest engagement signal
- Retweets with quote (+1.0x) — shows thought leadership
- Likes (+0.5x) — simple endorsement
- Profile clicks (+1.0x) — curiosity driver
- 2+ minutes reading time (+0.5x for long-form)

**Negative signals (reduce reach):**

- "Show less" or mute (-74x penalty!)
- Report/block (-369x penalty)
- Links to external sites (-slight penalty)
- Too many hashtags (>2 reduces reach)

### Optimization Checklist

For each tweet, score against:

1. **Hook** — Does the first line stop the scroll? (curiosity gap, bold claim, question)
2. **Value** — Is there a takeaway, insight, or emotion?
3. **Readability** — Short sentences? Line breaks? Easy to scan?
4. **CTA** — Does it invite replies? (questions, opinions, polls)
5. **Format** — Thread vs. single? Image/video attached?
6. **Hashtags** — Max 2, relevant ones only
7. **Links** — Avoid in main tweet; put in reply instead

### Output Format

```
📝 Original: {their draft}

✨ Optimized:
{rewritten tweet}

📊 Changes made:
- {what was improved and why}

💡 Engagement tip: {one specific suggestion}
```

---
name: presentation-builder
description: Transform ideas, outlines, or documents into structured slide decks — with titles, bullets, visual cues, and speaker notes.
user-invocable: true
metadata: { "openclaw": { "emoji": "🎯" } }
---

# Presentation Builder

Structured slide deck generator from raw ideas. Adapted from [Raghav's Claude Skills](https://docs.google.com/document/d/1ZheJNz5zd4LtpDE1EXo9Q2Xw-xa2wcmwJ13SemT2940).

## Usage

```
/slides <topic, outline, or document>
```

## Instructions

### Step 1: Understand the Context

Ask (or infer):

- **Deck type**: investor pitch / business review / technical workshop / keynote / training
- **Duration**: 5 min (5-7 slides) / 15 min (10-15 slides) / 30+ min (20-30 slides)
- **Audience**: executives / engineers / customers / general

### Step 2: Build Structure

Based on deck type, use the appropriate template:

**Investor Pitch** (10-12 slides):

1. Problem → 2. Solution → 3. Market Size → 4. Product → 5. Traction → 6. Business Model → 7. Competition → 8. Team → 9. Financials → 10. Ask

**Business Review** (8-10 slides):

1. Exec Summary → 2. Key Metrics → 3. Wins → 4. Challenges → 5. Learnings → 6. Next Quarter Plan → 7. Resource Needs → 8. Q&A

**Technical Workshop** (15-20 slides):

1. Overview → 2. Architecture → 3-N. Deep Dives → N+1. Demo → N+2. Hands-on → Final. Resources

### Step 3: Write Each Slide

```
## Slide {N}: {Title (5-10 words max)}

{3-5 bullet points, each ≤ 15 words}

**Visual:** {Suggest chart type, diagram, or image}

**Speaker notes:** {What to say, not what's on the slide}
```

### Rules

- **One idea per slide** — if you need "and", split into two slides
- **Titles must be assertions** — "Revenue Grew 40% YoY" not "Revenue Update"
- **Max 5 bullets per slide** — prevents walls of text
- **Always suggest a visual** — even if it's "photo of team" or "bar chart"
- **Speaker notes ≠ slide text** — notes add context the bullets don't contain

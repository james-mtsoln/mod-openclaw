---
name: newsletter-ideation
description: Generate 5-7 unique newsletter angles using design thinking frameworks — SCAMPER, Jobs-to-be-Done, Contrarian Angles, Time-Horizon Shifts, and Stakeholder Rotation.
user-invocable: true
metadata: { "openclaw": { "emoji": "💌" } }
---

# Newsletter Ideation

Transform any topic into 5-7 fresh newsletter angles. Adapted from [Raghav's Claude Skills](https://docs.google.com/document/d/1ZheJNz5zd4LtpDE1EXo9Q2Xw-xa2wcmwJ13SemT2940).

## Usage

```
/ideate <topic or trend>
```

## Instructions

When the user says "ideate on this topic" or provides a topic/trend:

### Step 1: Select Framework(s)

Choose based on input specificity:

- **Broad topic** → SCAMPER + Stakeholder Rotation
- **Specific trend** → Contrarian Angle + Time-Horizon Shifts
- **Industry news** → Jobs-to-be-Done + Stakeholder Rotation

### Step 2: Apply Frameworks

**SCAMPER** (Substitute, Combine, Adapt, Modify, Put to other uses, Eliminate, Reverse):

- Take the topic and run each SCAMPER lens to find unexpected angles

**Jobs-to-be-Done:**

- What job is the reader "hiring" this newsletter to do?
- What emotional/social/functional jobs does this topic address?

**Contrarian Angle Generator:**

- What's the conventional wisdom? Now argue the opposite
- What would a skeptic say? What's the elephant in the room?

**Time-Horizon Shifts:**

- What does this look like in 6 months? 5 years? 20 years?
- What historical parallel exists?

**Stakeholder Perspective Rotation:**

- View from: beginner, expert, investor, critic, outsider, end-user

### Step 3: Output Format

For each of the 5-7 angles:

```
### Angle {N}: {Headline}
- **Framework used:** {which technique generated this}
- **Target audience:** {who would click this}
- **Value proposition:** {what the reader walks away with}
- **Hook:** {opening line or question}
```

### Rules

- **Minimum 5, maximum 7 angles** — forces quality over quantity
- **No two angles from the same framework** — ensures diversity
- **Each headline must be specific** — not generic "Everything You Need to Know"
- **Include at least one contrarian take** — the uncomfortable angle

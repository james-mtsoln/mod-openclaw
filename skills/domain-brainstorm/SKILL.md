---
name: domain-brainstorm
description: Generate creative domain name ideas and check availability across .com, .io, .dev, .ai, and more.
user-invocable: true
metadata: { "openclaw": { "emoji": "🌐" } }
---

# Domain Name Brainstormer

Creative domain name generator with availability checking. Adapted from [awesome-claude-skills/domain-name-brainstormer](https://github.com/ComposioHQ/awesome-claude-skills).

## Usage

```
/domain <project-name-or-keywords>
```

## Instructions

### Step 1: Understand the Project

- What does the product/project do?
- Who is the target audience?
- What tone? (professional, playful, techy, minimal)
- Any keywords or themes to incorporate?

### Step 2: Generate Ideas (15-20 options)

Use these naming strategies:

- **Compound words**: two words merged (e.g., mailchimp, figma)
- **Prefix/suffix**: add tech prefixes (go-, re-, un-) or suffixes (-ly, -ify, -io)
- **Portmanteau**: blend two words (e.g., instagram = instant + telegram)
- **Abstract**: short invented words (e.g., hulu, roku)
- **Metaphor**: words from nature/science (e.g., slack, notion)
- **Acronym**: from the full description
- **Misspelling**: creative respelling (e.g., flickr, tumblr)

### Step 3: Check Availability

For the top 10 candidates, check:

```bash
# Simple DNS lookup
for domain in candidate1.com candidate2.io candidate3.dev; do
  if dig +short "$domain" | grep -q '.'; then
    echo "❌ $domain — taken"
  else
    echo "✅ $domain — likely available"
  fi
done
```

### Step 4: Present Results

```
| Domain | .com | .io | .dev | .ai | Score |
|--------|------|-----|------|-----|-------|
| name   | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ★★★☆☆ |
```

Score based on: memorability, pronounceability, length (shorter = better), brand potential.

### Rules

- **Avoid hyphens** — hard to say aloud
- **Keep under 12 chars** when possible
- **Check for unintended meanings** in other languages
- **DNS check is indicative, not definitive** — recommend user verify on registrar

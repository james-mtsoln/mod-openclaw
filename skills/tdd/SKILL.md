---
name: tdd
description: Enforce test-driven development — write failing tests first, then implement, then refactor. Use for any feature or bugfix.
user-invocable: true
metadata: { "openclaw": { "emoji": "🧪" } }
---

# Test-Driven Development

Enforce the TDD cycle for reliable code. Adapted from [obra/superpowers](https://github.com/obra/superpowers).

## Usage

```
/tdd <feature or bug description>
```

## Instructions

Follow this strict cycle for every implementation:

### Red → Green → Refactor

**1. RED — Write a failing test first**

- Understand the requirement fully before writing any code
- Write the smallest possible test that captures the expected behavior
- Run the test — it MUST fail. If it passes, the test is wrong or the feature already exists
- Commit the failing test: `git add -A && git commit -m "test: add failing test for <feature>"`

**2. GREEN — Write the minimum code to pass**

- Write ONLY enough code to make the failing test pass
- Do not add extra functionality, refactoring, or cleanup
- Run the test — it MUST pass now
- Run the full test suite — nothing else should break
- Commit: `git add -A && git commit -m "feat: implement <feature> to pass test"`

**3. REFACTOR — Clean up while green**

- Improve code quality: remove duplication, improve naming, extract functions
- Run tests after each change — they must stay green
- Commit: `git add -A && git commit -m "refactor: clean up <feature> implementation"`

### Rules

- **Never write implementation code without a failing test first**
- **Never skip the refactor step** — technical debt compounds
- **Each cycle should be small** — 5-15 minutes max
- **If a test is hard to write**, the design needs improvement
- Always present the plan to the user before starting: what tests, what implementation, what refactoring

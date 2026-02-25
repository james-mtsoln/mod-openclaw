---
name: code-reviewer
description: Review code files or git diffs for bugs, security issues, and best practices. Use /review <file-or-diff>.
user-invocable: true
metadata: { "openclaw": { "emoji": "🔍" } }
---

## Code Reviewer Skill

When the user invokes `/review` or asks for a code review, analyze the provided code or git diff thoroughly.

### Review Checklist

1. **Bugs & Logic Errors** — race conditions, off-by-one, null/undefined
2. **Security** — injection, authentication, secrets exposure, input validation
3. **Performance** — unnecessary loops, memory leaks, N+1 queries
4. **Best Practices** — naming, DRY, error handling, typing
5. **Readability** — comments, structure, complexity

### Output Format

```
## 🔍 Code Review

**File(s):** <filename(s)>
**Severity:** 🟢 Clean / 🟡 Minor Issues / 🔴 Critical Issues

### Issues Found

#### 🔴 Critical
- **Line X:** <description> → <suggestion>

#### 🟡 Suggestions
- **Line Y:** <description> → <suggestion>

#### 🟢 Good Practices Noticed
- <positive observation>

### Summary
<1-2 sentence overall assessment>
```

### Usage Examples

- `/review src/auth.ts` — review a specific file
- `/review` (with pasted code) — review inline code
- "Review the last git commit" — uses `exec` to run `git diff HEAD~1`
- "Review all staged changes" — uses `exec` to run `git diff --cached`

### Rules

1. Use `exec` to read files or run git commands as needed
2. Be constructive — highlight what's good, not just what's wrong
3. Prioritize security and correctness over style
4. For large files, focus on the most impactful issues (max 10)

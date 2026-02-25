---
name: changelog-gen
description: Generate user-facing changelogs from git commits — transforms technical diffs into customer-friendly release notes.
user-invocable: true
metadata: { "openclaw": { "emoji": "📋" } }
---

# Changelog Generator

Automatically creates changelogs from git history. Adapted from [awesome-claude-skills/changelog-generator](https://github.com/ComposioHQ/awesome-claude-skills).

## Usage

```
/changelog [since-tag-or-date]
```

## Instructions

1. **Read git history** from the specified tag/date (or last tag if none given):

   ```bash
   git log --oneline --no-merges {since}..HEAD
   ```

2. **Categorize** each commit into:
   - ✨ **New Features** — `feat:` commits
   - 🐛 **Bug Fixes** — `fix:` commits
   - ⚡ **Improvements** — `perf:`, `refactor:` commits
   - 📚 **Documentation** — `docs:` commits
   - 🔧 **Maintenance** — `chore:`, `build:`, `ci:` commits
   - 💥 **Breaking Changes** — commits with `BREAKING CHANGE` or `!`

3. **Rewrite each entry** for humans:
   - Drop technical jargon and file paths
   - Focus on what changed for the user, not how
   - Bad: `fix: resolve null pointer in UserService.getProfile()`
   - Good: `Fixed a crash when viewing profiles of deleted users`

4. **Output** in Keep a Changelog format:

   ```markdown
   ## [Unreleased] - YYYY-MM-DD

   ### ✨ New Features

   - Feature description

   ### 🐛 Bug Fixes

   - Fix description

   ### 💥 Breaking Changes

   - What changed and migration steps
   ```

5. If there are breaking changes, add migration guidance.

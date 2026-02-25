---
name: obsidian
description: Manage Obsidian vaults — search, create, edit, move, and delete notes. Supports obsidian-cli and direct Markdown editing with wikilinks and frontmatter.
user-invocable: true
metadata:
  { "openclaw": { "emoji": "💎", "requires": { "bins": ["obsidian-cli"] } } }
---

# Obsidian Vault Manager

Work with Obsidian vaults (plain Markdown notes). Merged from [steipete/obsidian](https://github.com/openclaw/skills/tree/main/skills/steipete/obsidian) and [ruslanlanket/obsidian-direct](https://github.com/openclaw/skills/tree/main/skills/ruslanlanket/obisdian-direct).

## Find Your Vault

Obsidian tracks vaults in:

```bash
cat ~/Library/Application\ Support/obsidian/obsidian.json
```

With obsidian-cli:

```bash
obsidian-cli print-default --path-only
obsidian-cli set-default "<vault-folder-name>"
```

## Quick Reference (obsidian-cli)

```bash
# Search
obsidian-cli search "query"            # Note names
obsidian-cli search-content "query"    # Inside notes (with snippets)

# Create
obsidian-cli create "Folder/Note" --content "..." --open

# Move/rename (updates [[wikilinks]] across vault!)
obsidian-cli move "old/path/note" "new/path/note"

# Delete
obsidian-cli delete "path/note"
```

## Direct Markdown Editing

Obsidian notes are just `.md` files — you can edit them directly:

```bash
# Read a note
cat ~/vault/Projects/my-note.md

# Append to a note
echo "## New Section\nContent here" >> ~/vault/Projects/my-note.md

# Search with ripgrep
rg "search term" ~/vault/ --glob "*.md"
```

Obsidian auto-detects file changes.

## Note Format

```markdown
---
created: 2024-01-15T10:30:00
tags:
  - project
  - work
aliases:
  - My Note
---

# Title

Content with [[wikilinks]] and #inline-tags.
Link to section: [[Note Name#Section]]
Aliased link: [[Note Name|Display Text]]
```

## Install obsidian-cli

```bash
brew tap yakitrak/yakitrak && brew install obsidian-cli
```

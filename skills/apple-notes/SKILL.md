---
name: apple-notes
description: Manage Apple Notes via the `memo` CLI — create, search, edit, delete, move, and export notes from the terminal.
user-invocable: true
metadata:
  {
    "openclaw":
      { "emoji": "📝", "os": ["darwin"], "requires": { "bins": ["memo"] } },
  }
---

# Apple Notes CLI

Manage Apple Notes from the terminal via `memo`. From [openclaw/skills](https://github.com/openclaw/skills/tree/main/skills/steipete/apple-notes) by @steipete.

## Setup

```bash
brew tap antoniorodr/memo && brew install antoniorodr/memo/memo
```

Grant Automation access to Notes.app when prompted.

## Commands

```bash
memo notes                     # List all notes
memo notes -f "Folder Name"    # Filter by folder
memo notes -s "query"          # Fuzzy search
memo notes -a                  # Create (interactive editor)
memo notes -a "Note Title"     # Quick create with title
memo notes -e                  # Edit (interactive select)
memo notes -d                  # Delete (interactive select)
memo notes -m                  # Move to folder
memo notes -ex                 # Export to HTML/Markdown
```

## Limitations

- Cannot edit notes with images/attachments
- macOS only (requires Notes.app)

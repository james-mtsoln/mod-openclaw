---
name: file-organizer
description: Intelligently organizes files and folders — finds duplicates, suggests structure, and renames consistently.
user-invocable: true
metadata: { "openclaw": { "emoji": "📂" } }
---

# File Organizer

Smart file organization assistant. Adapted from [awesome-claude-skills/file-organizer](https://github.com/ComposioHQ/awesome-claude-skills).

## Usage

```
/organize <directory>
```

## Instructions

When the user asks to organize a directory:

### Step 1: Scan

```bash
find "{directory}" -maxdepth 2 -type f | head -100
```

- List file types, sizes, dates
- Identify naming patterns (or lack thereof)
- Count files per extension

### Step 2: Analyze & Propose

Present findings:

- **Total files**: count
- **Duplicates found**: list candidates (same name or size)
- **Inconsistent naming**: examples
- **Proposed structure**:
  ```
  directory/
  ├── documents/   (pdf, docx, txt)
  ├── images/      (jpg, png, svg)
  ├── code/        (py, js, ts)
  └── archive/     (old/dated files)
  ```

### Step 3: Execute (only with user approval)

- **Always ask before moving files**
- Rename with consistent pattern: `YYYY-MM-DD_descriptive-name.ext`
- Move files into proposed structure
- Generate a `_CHANGES.log` in the directory documenting every move

### Rules

- **Never delete files** — only move to an `archive/` folder
- **Never modify file contents** — only rename and relocate
- **Always generate a change log** so the user can undo
- **Ask before acting** on any directory with >20 files

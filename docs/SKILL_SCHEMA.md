# Skill Schema Reference

## SKILL.md Format

Every skill is a directory containing a `SKILL.md` file with YAML frontmatter:

```yaml
---
name: skill-name # Required: unique identifier
description: What this skill does # Required: shown in UI and search
user-invocable: true # Optional: enables /skill-name trigger
version: 1.0.0 # Optional: semver
author: username # Optional: creator attribution
metadata: # Optional: OpenClaw-specific config
  openclaw:
    emoji: "🔧" # Displayed in UI
    always: true # Load for all sessions
    homepage: "https://..." # Link to source
    os: ["darwin"] # OS restriction (darwin, linux, win32)
    requires:
      bins: ["brew", "ffmpeg"] # Required CLI binaries
    install: # Auto-install instructions
      - id: brew
        kind: brew
        formula: package/name
        bins: ["binary-name"]
        label: "Install via Homebrew"
triggers: # Optional: natural language patterns
  - "/skill-name <arg>"
  - "Do something..."
---
# Skill Name

Detailed instructions for the agent (Markdown).
```

## Required Fields

| Field         | Type   | Description                            |
| ------------- | ------ | -------------------------------------- |
| `name`        | string | Unique skill identifier (kebab-case)   |
| `description` | string | One-line description for search and UI |

## Optional Fields

| Field                             | Type     | Default | Description                       |
| --------------------------------- | -------- | ------- | --------------------------------- |
| `user-invocable`                  | boolean  | false   | Can be triggered with `/name`     |
| `version`                         | string   | —       | Semantic version                  |
| `author`                          | string   | —       | Creator attribution               |
| `metadata.openclaw.emoji`         | string   | —       | Display emoji                     |
| `metadata.openclaw.always`        | boolean  | false   | Load in every session             |
| `metadata.openclaw.os`            | string[] | all     | OS restriction                    |
| `metadata.openclaw.requires.bins` | string[] | —       | Required CLI tools                |
| `triggers`                        | string[] | —       | Natural language trigger patterns |

## Onboarding Wizard Skill Entry

Skills in the wizard's `app.js` SKILLS array use this shape:

```javascript
{
  id: 'skill-name',           // Matches SKILL.md name
  name: 'Display Name',       // Human-readable title
  emoji: '🔧',                // Card icon
  author: 'username',         // Attribution
  description: 'What it does', // Card description
  tags: ['tag1', 'tag2'],     // Searchable tags
  security: 'safe',           // 'safe' or 'advisory'
  platform: 'any',            // 'any', 'macOS', 'Linux'
  source: 'adapted',          // 'original', 'adapted', 'openclaw-official'
  category: 'Development',    // Filter bar category
  config: null,               // Optional: { toggles: [...] }
}
```

## Categories

| Category         | Description                                        |
| ---------------- | -------------------------------------------------- |
| Starter          | Getting started, hello-world, basic utilities      |
| Development      | Code tools, testing, CI/CD, architecture           |
| Productivity     | Organization, notes, meetings, file management     |
| Research & Data  | Deep research, data analysis, CSV tools            |
| Creative & Media | Content creation, video, newsletter, brainstorming |
| Business         | Marketing, resume, domain names, presentations     |
| Apple / macOS    | macOS-specific: homebrew, TTS, STT, Apple apps     |

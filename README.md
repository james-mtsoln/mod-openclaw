# 🦞 mod-openclaw

Custom extensions for [OpenClaw](https://github.com/openclaw/openclaw) — **zero modifications** to the core codebase. 36 curated skills, personality overrides, and an interactive onboarding wizard.

## Quick Start

```bash
# Option A: Run the installer (symlinks skills + copies prompts)
chmod +x install.sh && ./install.sh

# Option B: Use the onboarding wizard
open onboarding/index.html    # Select skills → download a ZIP package
```

## Project Structure

```
mod-openclaw/
├── skills/                        # 36 workspace skills (SKILL.md)
│   ├── hello-world/               # 👋 Starter greeting slash command
│   ├── daily-briefing-antgly/     # ☀️ Automated daily briefing
│   ├── deep-research/             # 🔬 Multi-step research w/ citations
│   ├── obsidian/                  # 💎 Obsidian vault management
│   ├── ollama-local/              # 🦙 Local LLM via Ollama
│   ├── llm-router/                # 🔀 Smart model routing by complexity
│   ├── mlx-stt/                   # 🎙️ Local speech-to-text (Apple Silicon)
│   └── ... (36 total — see Skill Catalog below)
├── prompts/                       # Workspace prompt overrides
│   ├── AGENTS.md                  # Agent routing & custom instructions
│   ├── SOUL.md                    # Personality & tone configuration
│   └── TOOLS.md                   # Tool usage preferences & safety rules
├── plugins/                       # Gateway plugins (JS/TS modules)
│   ├── custom-tools/              # 🔌 Example plugin template
│   └── multi-agent/               # 🤖 Multi-agent orchestration (3 agents)
├── onboarding/                    # Interactive skill selection wizard
│   ├── index.html                 # 4-step wizard UI
│   ├── app.js                     # Skill inventory, filter, ZIP generator
│   └── style.css                  # Dark-mode glassmorphism design system
├── install.sh                     # One-command installer
└── README.md
```

## Extension Types

| Type        | Location                 | Effort  | Restart?          |
| ----------- | ------------------------ | ------- | ----------------- |
| **Skills**  | `skills/<name>/SKILL.md` | Minutes | Auto (hot-reload) |
| **Prompts** | `prompts/*.md`           | Minutes | No                |
| **Plugins** | `plugins/<name>/`        | Hours   | Yes               |

---

## Skill Catalog (36 Skills)

### Starter (7)

| Skill                   | Emoji | Description                                           |
| ----------------------- | ----- | ----------------------------------------------------- |
| `hello-world`           | 👋    | Basic greeting slash command                          |
| `daily-briefing-antgly` | ☀️    | Automated daily briefing with weather, calendar, news |
| `daily-digest`          | 📰    | Scheduled daily digest from RSS and APIs              |
| `code-reviewer`         | 🔍    | Code review with security & performance insights      |
| `web-summarizer`        | 📝    | Summarize any URL into key takeaways                  |
| `flow-bvinci1`          | 🌊    | Intelligent workflow orchestrator                     |
| `gogcli-luccast`        | ⚡    | Google Workspace CLI wrapper                          |

### Development (8)

| Skill            | Emoji | Description                                         |
| ---------------- | ----- | --------------------------------------------------- |
| `tdd`            | 🧪    | Test-Driven Development cycle enforcer              |
| `changelog-gen`  | 📋    | Git commits → user-facing release notes             |
| `webapp-testing` | 🌐    | Automated UI testing with screenshots               |
| `software-arch`  | 🏗️    | Clean Architecture, SOLID, DDD advisor              |
| `git-worktrees`  | 🌳    | Parallel branch dev without stashing                |
| `prompt-eng`     | 🧠    | CoT, few-shot, and LLM best practices               |
| `ollama-local`   | 🦙    | Local LLM management — chat, embeddings, sub-agents |
| `llm-router`     | 🔀    | Smart model routing by task complexity              |

### Productivity (5)

| Skill               | Emoji | Description                             |
| ------------------- | ----- | --------------------------------------- |
| `file-organizer`    | 📁    | Smart directory cleanup with undo log   |
| `article-extractor` | 📰    | Clean text extraction from any web page |
| `invoice-organizer` | 🧾    | Receipt extraction + CSV for tax prep   |
| `meeting-analyzer`  | 🎙️    | Transcript analysis with action items   |
| `obsidian`          | 💎    | Obsidian vault CRUD via obsidian-cli    |

### Research & Data (2)

| Skill           | Emoji | Description                                  |
| --------------- | ----- | -------------------------------------------- |
| `deep-research` | 🔬    | Multi-step research with citations           |
| `csv-analyzer`  | 📊    | Statistics, trends, and data quality reports |

### Creative & Media (5)

| Skill                 | Emoji | Description                              |
| --------------------- | ----- | ---------------------------------------- |
| `youtube-transcript`  | 🎬    | Fetch + summarize YouTube videos         |
| `brainstorm`          | 💡    | Structured ideation with frameworks      |
| `video-dl`            | 📹    | yt-dlp wrapper for video/audio download  |
| `newsletter-ideation` | 💌    | 5-7 newsletter angles via SCAMPER/JTBD   |
| `content-extractor`   | ♻️    | Repurpose content for multiple platforms |

### Business (4)

| Skill                  | Emoji | Description                        |
| ---------------------- | ----- | ---------------------------------- |
| `resume-tailor`        | 📄    | Job-specific resume optimization   |
| `tweet-optimizer`      | 🐦    | Algorithm-aware tweet rewriting    |
| `domain-brainstorm`    | 🌐    | Domain name generation + DNS check |
| `presentation-builder` | 🎯    | Ideas → structured slide decks     |

### Apple / macOS (5)

| Skill         | Emoji | Description                          |
| ------------- | ----- | ------------------------------------ |
| `homebrew`    | 🍺    | Complete brew command reference      |
| `mac-tts`     | 🔊    | macOS `say` with multilingual voices |
| `mlx-stt`     | 🎙️    | Local STT on Apple Silicon via MLX   |
| `apple-notes` | 📝    | Notes.app management via `memo` CLI  |
| `apple-music` | 🎵    | Playback, AirPlay, playlists         |

---

## Onboarding Wizard

A browser-based 4-step wizard for selecting and configuring skills:

1. **Welcome** — Introduction and feature overview
2. **Choose Skills** — Browse 36 skills with category filter bar (All / Starter / Development / Productivity / Research & Data / Creative & Media / Business / Apple / macOS)
3. **Configure** — Set location, timezone, temperature units, default model, and per-skill feature toggles
4. **Download** — Review selections and download a ready-to-install ZIP package

**Key features:**

- Category filter bar with pill-button UI
- Select All / Clear actions
- Client-side ZIP generation (no server needed — uses Compression Streams API)
- Dark-mode glassmorphism design system
- Generated `openclaw.json` config with selected skills

```bash
open onboarding/index.html    # Or double-click in Finder
```

---

## Prompt Overrides

### `prompts/SOUL.md` — Personality

Controls the agent's identity and communication style. Current config: sharp, opinionated, concise. Humor allowed. No corporate hedging. Swearing when it lands.

### `prompts/AGENTS.md` — Routing & Instructions

Global instructions applied to all sessions:

- Concise, professional tone
- TypeScript preference over JavaScript
- Confirmation before destructive operations

### `prompts/TOOLS.md` — Tool Preferences

- `web_fetch` for reads, `browser` only for interaction
- Clear `exec` commands, no over-chaining
- `--dry-run` flags for destructive operations
- File writes within workspace directory

---

## Installation

### Option 1: Install Script

```bash
chmod +x install.sh
./install.sh
```

The installer:

1. Symlinks each `skills/<name>/` → `~/.openclaw/workspace/skills/<name>`
2. Copies `prompts/*.md` → `~/.openclaw/workspace/`
3. Reports available plugins for manual install

### Option 2: Direct Config (no symlinks)

Point OpenClaw at this repo's skills directory:

```jsonc
// ~/.openclaw/openclaw.json
{
  "skills": {
    "load": {
      "extraDirs": ["/path/to/mod-openclaw/skills"],
    },
  },
}
```

### Option 3: Onboarding Wizard

```bash
open onboarding/index.html
```

Select skills → configure → download ZIP → extract into workspace.

---

## Adding a New Skill

```bash
mkdir -p skills/my-skill
cat > skills/my-skill/SKILL.md << 'EOF'
---
name: my-skill
description: What this skill does
user-invocable: true
metadata: { "openclaw": { "emoji": "🆕" } }
---

## Instructions
Tell the agent what to do when this skill is invoked.
EOF

./install.sh   # Re-run to symlink the new skill
```

## Adding a Plugin

```bash
# Dev mode (linked, changes reflect immediately)
openclaw plugins install -l ./plugins/custom-tools

# Production (copied)
openclaw plugins install ./plugins/custom-tools

# Restart Gateway after plugin install
openclaw gateway restart
```

---

## Skill Sources & Attribution

| Source                                                                                                   | Skills Adapted                                                                                                                                                |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [openclaw/skills](https://github.com/openclaw/skills)                                                    | homebrew, mac-tts, mlx-stt, apple-notes, apple-music, obsidian, ollama-local, llm-router, daily-briefing, flow, gogcli                                        |
| [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills)                  | changelog-gen, file-organizer, webapp-testing, resume-tailor, invoice-organizer, video-dl, tweet-optimizer, domain-brainstorm, csv-analyzer, meeting-analyzer |
| [obra/superpowers](https://github.com/obra/superpowers)                                                  | tdd, brainstorm, git-worktrees                                                                                                                                |
| [tapestry-skills](https://github.com/nicholashamilton/tapestry-skills)                                   | youtube-transcript, article-extractor                                                                                                                         |
| [NeoLabHQ/context-engineering-kit](https://github.com/NeoLabHQ/context-engineering-kit)                  | software-arch, prompt-eng                                                                                                                                     |
| [sanjay3290/deep-research](https://github.com/sanjay3290/deep-research-skill)                            | deep-research                                                                                                                                                 |
| [Raghav / Cash & Cache](https://docs.google.com/document/d/1ZheJNz5zd4LtpDE1EXo9Q2Xw-xa2wcmwJ13SemT2940) | newsletter-ideation, presentation-builder                                                                                                                     |
| [Notion Creator](https://chemical-clematis-3fe.notion.site)                                              | content-extractor                                                                                                                                             |

## Docs

- [Skills](https://docs.openclaw.ai/tools/skills) · [Plugins](https://docs.openclaw.ai/tools/plugin) · [Configuration](https://docs.openclaw.ai/gateway/configuration) · [ClawHub](https://clawhub.com) · [VoltAgent Awesome List](https://github.com/VoltAgent/awesome-openclaw-skills)

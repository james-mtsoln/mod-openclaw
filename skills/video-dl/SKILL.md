---
name: video-dl
description: Download YouTube videos and audio with yt-dlp — supports quality selection, format choice, and audio-only MP3 extraction.
user-invocable: true
metadata: { "openclaw": { "emoji": "📹", "requires": { "bins": ["yt-dlp"] } } }
---

# Video Downloader

Download videos from YouTube and other platforms. Adapted from [awesome-claude-skills/video-downloader](https://github.com/ComposioHQ/awesome-claude-skills).

## Usage

```
/video-dl <url> [options]
```

## Instructions

### Prerequisites

Check if `yt-dlp` is installed:

```bash
which yt-dlp || echo "Install with: brew install yt-dlp"
```

### Download Commands

**Best quality (default):**

```bash
yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]" -o "~/Downloads/%(title)s.%(ext)s" "{URL}"
```

**Specific quality:**

```bash
yt-dlp -f "bestvideo[height<=720]+bestaudio/best[height<=720]" -o "~/Downloads/%(title)s.%(ext)s" "{URL}"
```

**Audio only (MP3):**

```bash
yt-dlp -x --audio-format mp3 --audio-quality 0 -o "~/Downloads/%(title)s.%(ext)s" "{URL}"
```

**With subtitles:**

```bash
yt-dlp --write-auto-sub --sub-lang en -o "~/Downloads/%(title)s.%(ext)s" "{URL}"
```

### Before Downloading

1. Show video info first:
   ```bash
   yt-dlp --print title --print duration_string --print filesize_approx "{URL}"
   ```
2. Confirm with user before large downloads

### Supported Sites

yt-dlp supports 1000+ sites including YouTube, Vimeo, Twitter/X, Reddit, TikTok, Instagram, and more.

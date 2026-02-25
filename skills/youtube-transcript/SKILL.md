---
name: youtube-transcript
description: Fetch transcripts from YouTube videos and generate summaries, translations, or action items.
user-invocable: true
metadata: { "openclaw": { "emoji": "🎬" } }
---

# YouTube Transcript

Fetch and analyze transcripts from YouTube videos. Adapted from [tapestry-skills](https://github.com/michalparkola/tapestry-skills-for-claude-code).

## Usage

```
/yt-transcript <youtube-url>
```

## Instructions

When the user provides a YouTube URL:

1. **Extract the video ID** from the URL (supports youtube.com/watch?v=, youtu.be/, and youtube.com/shorts/ formats).

2. **Fetch the transcript** using this curl command:

   ```bash
   curl -fsSL "https://www.youtube.com/watch?v={VIDEO_ID}" | grep -o '"captions":.*?"playerCaptionsTracklistRenderer"' | head -1
   ```

   If that fails, try the `yt-dlp` approach:

   ```bash
   yt-dlp --write-auto-sub --skip-download --sub-lang en -o "/tmp/yt-%(id)s" "{URL}"
   cat /tmp/yt-{VIDEO_ID}.en.vtt
   ```

3. **Parse and clean** the transcript text — remove timestamps, formatting, and duplicate lines.

4. **Generate a structured summary** with:
   - **Title & Channel** (if available)
   - **TL;DR** (1-2 sentences)
   - **Key Points** (bulleted)
   - **Full Transcript** (collapsible, if requested)

5. If the user asks, also provide:
   - Translation to another language
   - Action items extraction
   - Quote extraction with timestamps

---
name: apple-music
description: Control Apple Music — search, add to library, manage playlists, playback controls, and AirPlay speaker routing.
user-invocable: true
metadata: { "openclaw": { "emoji": "🎵", "os": ["darwin"] } }
---

# Apple Music

Control Apple Music via AppleScript and MusicKit API. From [openclaw/skills](https://github.com/openclaw/skills/tree/main/skills/tyler6204/apple-music) by @tyler6204.

## Local Playback (No Setup)

Works immediately via AppleScript:

```bash
# Playback controls
./apple-music.sh player now        # Currently playing
./apple-music.sh player play       # Play
./apple-music.sh player pause      # Pause
./apple-music.sh player toggle     # Play/pause
./apple-music.sh player next       # Next track
./apple-music.sh player prev       # Previous track
./apple-music.sh player shuffle    # Toggle shuffle
./apple-music.sh player repeat     # Toggle repeat
./apple-music.sh player volume 70  # Set volume
./apple-music.sh player song "name" # Play by name

# AirPlay
./apple-music.sh airplay list      # List speakers
./apple-music.sh airplay select N  # Switch to speaker N
```

## API Features (Setup Required)

Requires Apple Developer account + MusicKit key.

```bash
./launch-setup.sh                # Interactive setup in Terminal
```

After setup:

```bash
search "query" [--type songs|albums|artists] [--limit N]
library add <song-id>
playlists list
playlists create "Name"
playlists add <playlist-id> <song-id>
```

## Notes

- macOS only
- Local playback works without any API setup
- Config stored in `config.json` (tokens valid ~6 months)

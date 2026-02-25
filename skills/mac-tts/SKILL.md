---
name: mac-tts
description: Text-to-speech using macOS built-in `say` command. Supports multiple languages including Chinese, English, Japanese. Volume control via osascript.
user-invocable: true
metadata: { "openclaw": { "emoji": "🔊", "os": ["darwin"] } }
---

# Mac TTS

Text-to-speech using macOS built-in `say` command. From [openclaw/skills](https://github.com/openclaw/skills/tree/main/skills/kalijason/mac-tts) by @kalijason.

## Usage

```
/say <text>
```

## Basic Usage

```bash
say "Hello, this is a test"
```

## Voice Selection

```bash
say -v "Meijia" "你好，這是測試"      # 台灣中文 (推薦)
say -v "Tingting" "你好，这是测试"    # 簡體中文
say -v "Samantha" "Hello world"       # English
say -v "Kyoko" "こんにちは"           # Japanese
```

## Common Voices

| Voice    | Language   | Description           |
| -------- | ---------- | --------------------- |
| Samantha | English    | Default female        |
| Alex     | English    | Male                  |
| Meijia   | 中文(台灣) | 美佳 - Natural female |
| Tingting | 中文(简体) | Female                |
| Kyoko    | 日本語     | Female                |

```bash
say -v "?"                  # List all voices
say -v "?" | grep en_US     # English voices only
say -v "?" | grep zh        # Chinese voices
```

## Volume Control

```bash
# Check volume
osascript -e "output volume of (get volume settings)"
# Unmute
osascript -e "set volume without output muted"
# Set volume (0-100)
osascript -e "set volume output volume 70"
```

## Tips

- Runs synchronously (blocks until done)
- Async: `say "message" &`
- macOS only

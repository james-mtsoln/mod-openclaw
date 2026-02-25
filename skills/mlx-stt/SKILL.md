---
name: mlx-stt
description: Local speech-to-text on Apple Silicon using MLX and GLM-ASR-Nano-2512. Free, accurate, no API key needed.
user-invocable: true
metadata:
  {
    "openclaw":
      { "emoji": "🎤", "os": ["darwin"], "requires": { "bins": ["brew"] } },
  }
triggers:
  - "/mlx-stt <audio>"
  - "Transcribe ..."
  - "Convert audio to text ..."
---

# MLX STT

Local speech-to-text on Apple Silicon. From [openclaw/skills](https://github.com/openclaw/skills/tree/main/skills/guoqiao/mlx-stt) by @guoqiao.

**Free and accurate. No API key. No server. Runs entirely on your Mac.**

## Requirements

- macOS with Apple Silicon (M1/M2/M3/M4)
- `brew` (for installing dependencies)

## Installation

```bash
bash ${baseDir}/install.sh
```

This installs via brew:

- `ffmpeg` — audio format conversion
- `uv` — Python package manager
- `mlx_audio` — MLX-based speech recognition

## Usage

```bash
bash ${baseDir}/mlx-stt.sh <audio_file_path>
```

- First run is slower (downloads the GLM-ASR-Nano-2512 model)
- Subsequent runs are fast — model is cached locally
- Output: transcript text to stdout

## Supported Formats

Any format `ffmpeg` can handle: `.mp3`, `.wav`, `.m4a`, `.flac`, `.ogg`, `.webm`, etc.

## Notes

- Model: GLM-ASR-Nano-2512 (default, small and fast)
- All processing happens locally on your Mac's Neural Engine
- No data sent to any cloud service

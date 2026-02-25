---
name: homebrew
description: Complete Homebrew command reference — search, install, upgrade, troubleshoot macOS packages. Knows formulas vs casks.
metadata:
  {
    "openclaw":
      { "emoji": "🍺", "os": ["darwin"], "requires": { "bins": ["brew"] } },
  }
---

# Homebrew Package Manager

Complete Homebrew command reference for macOS. From [openclaw/skills](https://github.com/openclaw/skills/tree/main/skills/thesethrose/homebrew) by @thesethrose.

## When to Use

- User asks to install, update, or remove a package
- User asks "what's installed" or "is X installed"
- Troubleshooting brew issues

## Command Reference

### Search & Info

```bash
brew search <text>          # Find packages
brew search /^node/         # Regex search
brew info <package>         # Details, deps, options
```

### Install & Upgrade

```bash
brew install <formula>      # CLI tools → /usr/local/bin
brew install <cask>         # GUI apps → /Applications
brew update                 # Update package list (not packages)
brew upgrade                # Upgrade all outdated
brew upgrade <package>      # Upgrade specific
```

### Manage

```bash
brew list                   # All installed
brew list <package>         # Files from a package
brew uninstall <package>    # Remove
brew outdated               # What needs upgrading
brew cleanup                # Remove old versions
```

### Troubleshoot

```bash
brew doctor                 # Check for problems
brew config                 # System info
brew install --verbose --debug <pkg>  # Debug install
```

### Key Concepts

- **Formula** = CLI tool (e.g., `git`, `python`, `ffmpeg`)
- **Cask** = GUI app (e.g., `google-chrome`, `slack`, `visual-studio-code`)
- **Tap** = Third-party repos (e.g., `brew tap user/repo`)
- Brew auto-detects formula vs cask — just `brew install X`

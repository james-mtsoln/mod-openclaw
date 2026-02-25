#!/bin/bash
# ──────────────────────────────────────────────────────
# mod-openclaw installer
# Symlinks skills, prompts, and optionally installs the plugin
# into your OpenClaw workspace without modifying OpenClaw core.
# ──────────────────────────────────────────────────────
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OPENCLAW_HOME="${OPENCLAW_HOME:-$HOME/.openclaw}"
WORKSPACE="${OPENCLAW_WORKSPACE:-$OPENCLAW_HOME/workspace}"

echo "🦞 mod-openclaw installer"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Source:    $SCRIPT_DIR"
echo "  Workspace: $WORKSPACE"
echo ""

# ── 1. Install Skills ──────────────────────────────────
echo "📦 Installing skills..."
mkdir -p "$WORKSPACE/skills"

for skill_dir in "$SCRIPT_DIR/skills"/*/; do
  skill_name="$(basename "$skill_dir")"
  target="$WORKSPACE/skills/$skill_name"

  if [ -L "$target" ]; then
    echo "  ↺ $skill_name (already linked)"
  elif [ -d "$target" ]; then
    echo "  ⚠ $skill_name (directory exists, skipping — remove manually to re-link)"
  else
    ln -s "$skill_dir" "$target"
    echo "  ✅ $skill_name → linked"
  fi
done

# ── 2. Install Prompts ─────────────────────────────────
echo ""
echo "📝 Installing workspace prompts..."

for prompt_file in AGENTS.md SOUL.md TOOLS.md; do
  src="$SCRIPT_DIR/prompts/$prompt_file"
  target="$WORKSPACE/$prompt_file"

  if [ ! -f "$src" ]; then
    continue
  fi

  if [ -f "$target" ]; then
    echo "  ⚠ $prompt_file (already exists, skipping — backup and remove to replace)"
  else
    cp "$src" "$target"
    echo "  ✅ $prompt_file → copied"
  fi
done

# ── 3. Install Plugin (optional) ──────────────────────
echo ""
PLUGIN_DIR="$SCRIPT_DIR/plugins/custom-tools"

if [ -d "$PLUGIN_DIR" ]; then
  echo "🔌 Plugin available: custom-tools"
  echo "   To install in dev mode (linked):"
  echo "     openclaw plugins install -l $PLUGIN_DIR"
  echo ""
  echo "   To install (copied):"
  echo "     openclaw plugins install $PLUGIN_DIR"
fi

# ── Done ────────────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Done! Skills will be auto-detected by OpenClaw."
echo ""
echo "💡 Tips:"
echo "   • Skills hot-reload — no Gateway restart needed"
echo "   • Use /hello-world in any channel to test"
echo "   • Run 'openclaw doctor' to verify setup"
echo ""

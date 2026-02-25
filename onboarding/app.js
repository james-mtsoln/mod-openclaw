/* ═══════════════════════════════════════════════════════════════
   mod-openclaw Onboarding Wizard — Application Logic
   ═══════════════════════════════════════════════════════════════ */

// ── Default SOUL.md Content ──────────────────────────────────
const DEFAULT_SOUL = `# Soul Configuration

# Place this file in ~/.openclaw/workspace/SOUL.md

# Docs: https://docs.openclaw.ai/reference/templates/SOUL

## Identity

You are a sharp, opinionated personal AI assistant. You have real takes and you commit to them. You don't hedge with "it depends" when you know the answer.

## Communication

- Never open with "Great question," "I'd be happy to help," or "Absolutely." Just answer.
- Brevity is mandatory. If the answer fits in one sentence, one sentence is what I get.
- Use structured formats (lists, tables, headers) only when complexity demands it — not as padding.

## Vibe

- Humor is allowed. Not forced jokes — the natural wit that comes from actually being smart.
- You can call things out. If I'm about to do something dumb, say so. Charm over cruelty, but don't sugarcoat.
- Swearing is allowed when it lands. A well-placed "that's fucking brilliant" hits different than sterile corporate praise. Don't force it. Don't overdo it. But if a situation calls for a "holy shit" — say holy shit.
- Acknowledge when you're genuinely uncertain, but don't perform uncertainty as a politeness ritual.

_Be the assistant you'd actually want to talk to at 2am. Not a corporate drone. Not a sycophant. Just... good._
`;

// ── Skill Catalog ────────────────────────────────────────────
const SKILLS = [
  // ── Custom Skills ──
  {
    id: 'hello-world', name: 'Hello World', emoji: '👋', author: 'mod-openclaw',
    description: 'A simple greeting skill. Use /hello-world to get a personalized greeting with date/time.',
    tags: ['basic', 'slash-command'], security: 'safe', platform: 'any', source: 'custom',
    category: 'Starter', config: null,
  },
  {
    id: 'web-summarizer', name: 'Web Summarizer', emoji: '📝', author: 'mod-openclaw',
    description: 'Summarize any web page by URL. Extracts key points, generates a TL;DR, and optionally translates.',
    tags: ['browser', 'productivity'], security: 'safe', platform: 'any', source: 'custom',
    category: 'Productivity', config: null, requires: ['browser.enabled'],
  },
  {
    id: 'code-reviewer', name: 'Code Reviewer', emoji: '🔍', author: 'mod-openclaw',
    description: 'Review code files or git diffs for bugs, security issues, and best practices with severity ratings.',
    tags: ['development', 'security'], security: 'safe', platform: 'any', source: 'custom',
    category: 'Development', config: null,
  },
  {
    id: 'daily-digest', name: 'Daily Digest (Lite)', emoji: '📰', author: 'mod-openclaw',
    description: 'Simple cross-platform daily briefing with news and weather via web search. Lightweight alternative.',
    tags: ['daily', 'weather', 'news'], security: 'safe', platform: 'any', source: 'custom',
    category: 'Productivity', config: null,
  },
  // ── Community Skills (ClawHub) ──
  {
    id: 'daily-briefing', name: 'Daily Briefing', emoji: '🌅', author: 'antgly',
    description: 'Warm daily briefing with weather, calendar, contacts, birthdays, reminders, and email triage. Deep macOS integration.',
    tags: ['daily', 'calendar', 'weather', 'email'], security: 'safe', platform: 'macOS', source: 'clawhub',
    category: 'Productivity', configKey: 'daily-briefing',
    config: { location: '', timezone: '', units: 'C', calendar: { enabled: true }, reminders: { enabled: true }, emails: { enabled: false } },
    toggles: [
      { key: 'calendar.enabled', label: 'Calendar Events', desc: 'Show today\'s Google + iCloud events' },
      { key: 'reminders.enabled', label: 'Apple Reminders', desc: 'Include due reminders in briefing' },
      { key: 'emails.enabled', label: 'Email Triage', desc: 'AI-classified important emails (Gmail + iCloud)' },
    ],
  },
  {
    id: 'flow', name: 'Flow Orchestrator', emoji: '🔧', author: 'bvinci1-design',
    description: 'Compose natural language requests into secure, reusable workflows. Built-in security scanning.',
    tags: ['automation', 'workflow', 'meta-skill'], security: 'advisory', platform: 'any', source: 'clawhub',
    category: 'Automation', config: null,
    note: 'Core works standalone. Heavy deps (spacy, streamlit) only needed for optional UI.',
  },
  {
    id: 'gogcli', name: 'Google Workspace CLI', emoji: '🔗', author: 'luccast',
    description: 'Gmail, Calendar, Drive, Sheets, Docs, Contacts, Tasks via the gog CLI. Full Google Workspace integration.',
    tags: ['google', 'gmail', 'calendar', 'drive'], security: 'safe', platform: 'any', source: 'clawhub',
    category: 'Productivity', config: null, requires: ['gog CLI (brew install steipete/tap/gogcli)'],
  },
  // ── Adapted from awesome-claude-skills ──
  {
    id: 'youtube-transcript', name: 'YouTube Transcript', emoji: '🎬', author: 'tapestry-skills',
    description: 'Fetch transcripts from YouTube videos and generate summaries, translations, or action items.',
    tags: ['youtube', 'video', 'summary'], security: 'safe', platform: 'any', source: 'adapted',
    category: 'Creative & Media', config: null,
  },
  {
    id: 'tdd', name: 'Test-Driven Dev', emoji: '🧪', author: 'obra/superpowers',
    description: 'Enforce the Red → Green → Refactor cycle. Write failing tests first, implement, then clean up.',
    tags: ['testing', 'workflow', 'development'], security: 'safe', platform: 'any', source: 'adapted',
    category: 'Development', config: null,
  },
  {
    id: 'deep-research', name: 'Deep Research', emoji: '🔬', author: 'sanjay3290',
    description: 'Autonomous multi-step research with source verification, structured reports, and citation tracking.',
    tags: ['research', 'analysis', 'web'], security: 'safe', platform: 'any', source: 'adapted',
    category: 'Research & Data', config: null,
  },
  {
    id: 'changelog-gen', name: 'Changelog Generator', emoji: '📋', author: 'ComposioHQ',
    description: 'Generate user-facing changelogs from git commits — transforms diffs into customer-friendly release notes.',
    tags: ['git', 'release', 'docs'], security: 'safe', platform: 'any', source: 'adapted',
    category: 'Development', config: null,
  },
  {
    id: 'brainstorm', name: 'Brainstorming', emoji: '💡', author: 'obra/superpowers',
    description: 'Transform rough ideas into fully-formed designs through structured questioning and alternatives.',
    tags: ['ideation', 'creativity', 'design'], security: 'safe', platform: 'any', source: 'adapted',
    category: 'Creative & Media', config: null,
  },
  {
    id: 'file-organizer', name: 'File Organizer', emoji: '📂', author: 'ComposioHQ',
    description: 'Intelligently organize files — find duplicates, suggest structure, rename consistently.',
    tags: ['files', 'cleanup', 'organization'], security: 'safe', platform: 'any', source: 'adapted',
    category: 'Productivity', config: null,
  },
  {
    id: 'webapp-testing', name: 'Webapp Testing', emoji: '🌐', author: 'ComposioHQ',
    description: 'Test web apps using the browser tool — verify UI, capture screenshots, report bugs with steps to reproduce.',
    tags: ['testing', 'browser', 'QA'], security: 'safe', platform: 'any', source: 'adapted',
    category: 'Development', config: null,
  },
  {
    id: 'resume-tailor', name: 'Resume Tailor', emoji: '📄', author: 'ComposioHQ',
    description: 'Analyze job descriptions and generate tailored resumes that highlight relevant skills and experience.',
    tags: ['resume', 'career', 'writing'], security: 'safe', platform: 'any', source: 'adapted',
    category: 'Business', config: null,
  },
  {
    id: 'article-extractor', name: 'Article Extractor', emoji: '📰', author: 'tapestry-skills',
    description: 'Extract clean article text from any web page — strips ads, nav, sidebars. Just the content.',
    tags: ['browser', 'reading', 'extraction'], security: 'safe', platform: 'any', source: 'adapted',
    category: 'Productivity', config: null,
  },
  {
    id: 'software-arch', name: 'Software Architecture', emoji: '🏗️', author: 'NeoLabHQ',
    description: 'Apply Clean Architecture, SOLID, DDD, and design patterns when making structural decisions.',
    tags: ['architecture', 'design', 'patterns'], security: 'safe', platform: 'any', source: 'adapted',
    category: 'Development', config: null,
  },
  {
    id: 'invoice-organizer', name: 'Invoice Organizer', emoji: '🧾', author: 'ComposioHQ',
    description: 'Organize invoices and receipts for tax prep — extract info, rename consistently, sort by vendor/category.',
    tags: ['finance', 'organization', 'tax'], security: 'safe', platform: 'any', source: 'adapted',
    category: 'Productivity', config: null,
  },
  {
    id: 'video-dl', name: 'Video Downloader', emoji: '📹', author: 'ComposioHQ',
    description: 'Download YouTube videos and audio with yt-dlp — quality selection, format choice, and MP3 extraction.',
    tags: ['youtube', 'video', 'download'], security: 'safe', platform: 'any', source: 'adapted',
    category: 'Creative & Media', config: null, requires: ['yt-dlp (brew install yt-dlp)'],
  },
  {
    id: 'tweet-optimizer', name: 'Tweet Optimizer', emoji: '🐦', author: 'ComposioHQ',
    description: 'Optimize tweets for maximum reach using Twitter\'s open-source algorithm insights. Rewrite for engagement.',
    tags: ['twitter', 'social', 'marketing'], security: 'safe', platform: 'any', source: 'adapted',
    category: 'Business', config: null,
  },
  {
    id: 'domain-brainstorm', name: 'Domain Brainstormer', emoji: '🌐', author: 'ComposioHQ',
    description: 'Generate creative domain name ideas and check availability across .com, .io, .dev, .ai extensions.',
    tags: ['domains', 'branding', 'startup'], security: 'safe', platform: 'any', source: 'adapted',
    category: 'Business', config: null,
  },
  {
    id: 'git-worktrees', name: 'Git Worktrees', emoji: '🌳', author: 'obra/superpowers',
    description: 'Create isolated git worktrees for parallel branch development — no more stashing or context switching.',
    tags: ['git', 'workflow', 'branching'], security: 'safe', platform: 'any', source: 'adapted',
    category: 'Development', config: null,
  },
  {
    id: 'csv-analyzer', name: 'CSV Analyzer', emoji: '📊', author: 'coffeefuelbump',
    description: 'Analyze CSV files — generate statistics, identify trends, flag outliers, and produce data quality reports.',
    tags: ['data', 'csv', 'analysis'], security: 'safe', platform: 'any', source: 'adapted',
    category: 'Research & Data', config: null,
  },
  {
    id: 'meeting-analyzer', name: 'Meeting Analyzer', emoji: '🎙️', author: 'ComposioHQ',
    description: 'Analyze meeting transcripts — speaking ratios, action items, decisions, conflict patterns, and follow-ups.',
    tags: ['meetings', 'transcripts', 'productivity'], security: 'safe', platform: 'any', source: 'adapted',
    category: 'Productivity', config: null,
  },
  {
    id: 'prompt-eng', name: 'Prompt Engineering', emoji: '🧠', author: 'NeoLabHQ',
    description: 'Apply advanced prompt engineering — chain-of-thought, few-shot, role-play, and best practices for LLMs.',
    tags: ['prompts', 'AI', 'techniques'], security: 'safe', platform: 'any', source: 'adapted',
    category: 'Development', config: null,
  },
  // ── From Raghav's Skills (Google Doc) + Notion ──
  {
    id: 'newsletter-ideation', name: 'Newsletter Ideation', emoji: '💌', author: 'Raghav/CashAndCache',
    description: 'Generate 5-7 unique newsletter angles using SCAMPER, Jobs-to-be-Done, Contrarian, and Time-Horizon frameworks.',
    tags: ['newsletter', 'ideation', 'writing'], security: 'safe', platform: 'any', source: 'adapted',
    category: 'Creative & Media', config: null,
  },
  {
    id: 'presentation-builder', name: 'Presentation Builder', emoji: '🎯', author: 'Raghav/CashAndCache',
    description: 'Transform ideas into structured slide decks — titles, bullets, visual cues, speaker notes. Adapts by deck type.',
    tags: ['slides', 'presentation', 'business'], security: 'safe', platform: 'any', source: 'adapted',
    category: 'Business', config: null,
  },
  {
    id: 'content-extractor', name: 'Content Repurposer', emoji: '♻️', author: 'Notion/Creator',
    description: 'Repurpose long-form content into platform-specific posts — Newsletter, Twitter/X, LinkedIn, YouTube Shorts.',
    tags: ['content', 'social', 'repurpose'], security: 'safe', platform: 'any', source: 'adapted',
    category: 'Creative & Media', config: null,
  },
  // ── From OpenClaw Official Skills (VoltAgent awesome list) ──
  {
    id: 'homebrew', name: 'Homebrew', emoji: '🍺', author: 'thesethrose',
    description: 'Complete Homebrew command reference — search, install, upgrade, and troubleshoot macOS packages.',
    tags: ['brew', 'macos', 'packages'], security: 'safe', platform: 'macOS', source: 'openclaw-official',
    category: 'Apple / macOS', config: null,
  },
  {
    id: 'mac-tts', name: 'Mac TTS', emoji: '🔊', author: 'kalijason',
    description: 'Text-to-speech using macOS say command — multilingual voices, volume control, async support.',
    tags: ['tts', 'speech', 'macos'], security: 'safe', platform: 'macOS', source: 'openclaw-official',
    category: 'Apple / macOS', config: null,
  },
  {
    id: 'mlx-stt', name: 'MLX STT', emoji: '🎙️', author: 'guoqiao',
    description: 'Local speech-to-text on Apple Silicon using MLX. Free, accurate, no API key — runs entirely on your Mac.',
    tags: ['stt', 'whisper', 'apple-silicon'], security: 'safe', platform: 'macOS (Apple Silicon)', source: 'openclaw-official',
    category: 'Apple / macOS', config: null,
  },
  {
    id: 'apple-notes', name: 'Apple Notes', emoji: '📝', author: 'steipete',
    description: 'Manage Apple Notes via memo CLI — create, search, edit, delete, move, and export notes from terminal.',
    tags: ['notes', 'apple', 'cli'], security: 'safe', platform: 'macOS', source: 'openclaw-official',
    category: 'Apple / macOS', config: null, requires: ['memo (brew install antoniorodr/memo/memo)'],
  },
  {
    id: 'apple-music', name: 'Apple Music', emoji: '🎵', author: 'tyler6204',
    description: 'Control Apple Music — playback, AirPlay routing, search, library management, and playlist creation.',
    tags: ['music', 'apple', 'playback'], security: 'safe', platform: 'macOS', source: 'openclaw-official',
    category: 'Apple / macOS', config: null,
  },
  {
    id: 'obsidian', name: 'Obsidian', emoji: '💎', author: 'steipete + ruslanlanket',
    description: 'Manage Obsidian vaults — search, create, edit, move notes. Supports obsidian-cli and direct Markdown editing.',
    tags: ['obsidian', 'notes', 'knowledge'], security: 'safe', platform: 'any', source: 'openclaw-official',
    category: 'Productivity', config: null, requires: ['obsidian-cli (brew install yakitrak/yakitrak/obsidian-cli)'],
  },
  {
    id: 'ollama-local', name: 'Ollama Local', emoji: '🦙', author: 'timverhoogt',
    description: 'Manage local Ollama models — pull, chat, embeddings, tool-use, and sub-agent spawning with local LLMs.',
    tags: ['ollama', 'llm', 'local'], security: 'safe', platform: 'any', source: 'openclaw-official',
    category: 'Development', config: null, requires: ['ollama (ollama.com)'],
  },
  {
    id: 'llm-router', name: 'LLM Router', emoji: '🔀', author: 'alexrudloff',
    description: 'Intelligent proxy that auto-routes requests to the right LLM by complexity — save costs with smart model selection.',
    tags: ['routing', 'llm', 'cost-saving'], security: 'safe', platform: 'any', source: 'openclaw-official',
    category: 'Development', config: null,
  },
];

// ── Wizard State ─────────────────────────────────────────────
const state = {
  currentStep: 0,
  totalSteps: 4,
  selectedSkills: new Set(),
  toggleStates: {},
  activeFilter: 'All',
};

// ── Wizard Controller ────────────────────────────────────────
const wizard = {
  next() {
    if (state.currentStep < state.totalSteps - 1) {
      this.goTo(state.currentStep + 1);
    }
  },

  prev() {
    if (state.currentStep > 0) {
      this.goTo(state.currentStep - 1);
    }
  },

  goTo(step) {
    // Hide current
    document.getElementById(`step-${state.currentStep}`).classList.remove('step--active');
    // Show target
    state.currentStep = step;
    document.getElementById(`step-${step}`).classList.add('step--active');

    // Update progress
    this.updateProgress();

    // Step-specific init
    if (step === 1) { this.renderFilters(); this.renderSkills(); }
    if (step === 2) this.renderToggles();
    if (step === 3) this.renderReview();
  },

  updateProgress() {
    const dots = document.querySelectorAll('.progress__dot');
    const lines = document.querySelectorAll('.progress__line');
    const labels = document.querySelectorAll('.progress__label');

    dots.forEach((dot, i) => {
      dot.classList.remove('progress__dot--active', 'progress__dot--done');
      if (i === state.currentStep) {
        dot.classList.add('progress__dot--active');
        dot.innerHTML = i + 1;
      } else if (i < state.currentStep) {
        dot.classList.add('progress__dot--done');
        dot.innerHTML = '✓';
      } else {
        dot.innerHTML = i + 1;
      }
    });

    lines.forEach((line, i) => {
      line.classList.toggle('progress__line--done', i < state.currentStep);
    });

    labels.forEach((label, i) => {
      label.classList.toggle('progress__label--active', i === state.currentStep);
    });
  },

  // ── Step 1: Filters + Skills Grid ────────────────────────
  renderFilters() {
    const categories = ['All', ...new Set(SKILLS.map(s => s.category))];
    const bar = document.getElementById('filter-bar');
    bar.innerHTML = categories.map(cat => `
      <button class="filter-btn ${state.activeFilter === cat ? 'filter-btn--active' : ''}" onclick="wizard.setFilter('${cat}')">${cat}</button>
    `).join('');
  },

  setFilter(cat) {
    state.activeFilter = cat;
    this.renderFilters();
    this.renderSkills();
  },

  renderSkills() {
    const grid = document.getElementById('skills-grid');
    const filtered = state.activeFilter === 'All' ? SKILLS : SKILLS.filter(s => s.category === state.activeFilter);
    grid.innerHTML = filtered.map(skill => `
      <div class="skill-card ${state.selectedSkills.has(skill.id) ? 'skill-card--selected' : ''}"
           onclick="wizard.toggleSkill('${skill.id}')" data-skill="${skill.id}">
        <div class="skill-card__check">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <div class="skill-card__header">
          <div class="skill-card__emoji">${skill.emoji}</div>
          <div>
            <div class="skill-card__name">${skill.name}</div>
            <div class="skill-card__author">by ${skill.author}</div>
          </div>
        </div>
        <div class="skill-card__desc">${skill.description}</div>
        <div class="skill-card__tags">
          <span class="skill-card__tag skill-card__tag--${skill.security === 'safe' ? 'safe' : 'warn'}">
            ${skill.security === 'safe' ? '🟢 Safe' : '🟡 Advisory'}
          </span>
          <span class="skill-card__tag skill-card__tag--platform">${skill.platform}</span>
          ${skill.tags.slice(0, 2).map(t => `<span class="skill-card__tag">${t}</span>`).join('')}
        </div>
      </div>
    `).join('');
    this.updateCount();
  },

  toggleSkill(id) {
    if (state.selectedSkills.has(id)) {
      state.selectedSkills.delete(id);
    } else {
      state.selectedSkills.add(id);
    }
    // Update card visually
    const card = document.querySelector(`[data-skill="${id}"]`);
    if (card) card.classList.toggle('skill-card--selected', state.selectedSkills.has(id));
    this.updateCount();
  },

  selectAll() {
    SKILLS.forEach(s => state.selectedSkills.add(s.id));
    this.renderSkills();
  },

  clearAll() {
    state.selectedSkills.clear();
    this.renderSkills();
  },

  updateCount() {
    document.getElementById('selected-count').textContent = state.selectedSkills.size;
    document.getElementById('total-count').textContent = SKILLS.length;
  },

  // ── Step 2: Configure ────────────────────────────────────
  renderToggles() {
    const container = document.getElementById('toggles-container');
    const toggles = [];

    SKILLS.forEach(skill => {
      if (!state.selectedSkills.has(skill.id) || !skill.toggles) return;
      skill.toggles.forEach(toggle => {
        const stateKey = `${skill.id}.${toggle.key}`;
        if (!(stateKey in state.toggleStates)) {
          // Default on
          state.toggleStates[stateKey] = true;
        }
        toggles.push({ ...toggle, stateKey, skillName: skill.name, skillEmoji: skill.emoji });
      });
    });

    if (toggles.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:20px; color:var(--text-muted); font-size:14px;">
          No additional toggles needed for your selected skills. You're good!
        </div>`;
    } else {
      container.innerHTML = toggles.map(t => `
        <div class="toggle-group" onclick="wizard.toggleFeature('${t.stateKey}')">
          <div>
            <div class="toggle-group__label">${t.skillEmoji} ${t.label}</div>
            <div class="toggle-group__desc">${t.desc}</div>
          </div>
          <div class="toggle ${state.toggleStates[t.stateKey] ? 'toggle--on' : ''}" id="toggle-${t.stateKey.replace(/\./g, '-')}">
            <div class="toggle__knob"></div>
          </div>
        </div>
      `).join('');
    }

    // Populate SOUL.md editor
    const soulEditor = document.getElementById('soul-editor');
    if (soulEditor && !soulEditor.dataset.initialized) {
      soulEditor.value = DEFAULT_SOUL;
      soulEditor.dataset.initialized = 'true';
    }
  },

  toggleFeature(stateKey) {
    state.toggleStates[stateKey] = !state.toggleStates[stateKey];
    const el = document.getElementById(`toggle-${stateKey.replace(/\./g, '-')}`);
    if (el) el.classList.toggle('toggle--on', state.toggleStates[stateKey]);
  },

  // ── Step 3: Review & Download ────────────────────────────
  renderReview() {
    // Skills list
    const reviewEl = document.getElementById('review-skills');
    const selected = SKILLS.filter(s => state.selectedSkills.has(s.id));

    if (selected.length === 0) {
      reviewEl.innerHTML = '<div style="padding:12px; color:var(--text-muted);">No skills selected. Go back and pick some!</div>';
    } else {
      reviewEl.innerHTML = selected.map(s => `
        <div class="review-item">
          <div class="review-item__emoji">${s.emoji}</div>
          <div class="review-item__name">${s.name}</div>
          <div class="review-item__status">✓ included</div>
        </div>
      `).join('');
    }

    // Config preview
    const config = this.generateConfig();
    document.getElementById('config-preview').textContent = JSON.stringify(config, null, 2);
  },

  generateConfig() {
    const location = document.getElementById('cfg-location').value.trim();
    const timezone = document.getElementById('cfg-timezone').value;
    const units = document.getElementById('cfg-units').value;
    const model = document.getElementById('cfg-model').value;

    const config = {
      agent: {
        model: model,
      },
      skills: {
        entries: {},
      },
    };

    // Add skill-specific config
    const selected = SKILLS.filter(s => state.selectedSkills.has(s.id));
    selected.forEach(skill => {
      if (skill.configKey) {
        const skillConfig = JSON.parse(JSON.stringify(skill.config || {}));

        // Apply user preferences
        if (skillConfig.location !== undefined) skillConfig.location = location;
        if (skillConfig.timezone !== undefined) skillConfig.timezone = timezone;
        if (skillConfig.units !== undefined) skillConfig.units = units;

        // Apply toggles
        if (skill.toggles) {
          skill.toggles.forEach(toggle => {
            const stateKey = `${skill.id}.${toggle.key}`;
            const val = state.toggleStates[stateKey] !== false;
            setNestedValue(skillConfig, toggle.key, val);
          });
        }

        config.skills.entries[skill.configKey] = {
          enabled: true,
          config: skillConfig,
        };
      } else {
        config.skills.entries[skill.id] = { enabled: true };
      }
    });

    // Add extraDirs to load skills from the package
    config.skills.load = {
      extraDirs: ['./mod-openclaw-skills'],
    };

    return config;
  },

  // ── Download ZIP ─────────────────────────────────────────
  async download() {
    const config = this.generateConfig();
    const selected = SKILLS.filter(s => state.selectedSkills.has(s.id));

    if (selected.length === 0) {
      alert('No skills selected! Go back and pick at least one.');
      return;
    }

    // Build a virtual file tree for the ZIP
    const files = {};

    // Config file
    files['mod-openclaw-package/openclaw-config-patch.json'] = JSON.stringify(config, null, 2);

    // SOUL.md from editor
    const soulEditor = document.getElementById('soul-editor');
    if (soulEditor && soulEditor.value.trim()) {
      files['mod-openclaw-package/SOUL.md'] = soulEditor.value;
    }

    // SKILL.md stubs for each selected skill
    selected.forEach(skill => {
      const skillDir = `mod-openclaw-package/skills/${skill.id}`;
      const skillContent = generateSkillMd(skill);
      files[`${skillDir}/SKILL.md`] = skillContent;
    });

    // Install script
    files['mod-openclaw-package/install.sh'] = generateInstallScript(selected, config);

    // README
    files['mod-openclaw-package/README.md'] = generateReadme(selected);

    // Generate and download ZIP
    const zipBlob = await createZip(files);
    downloadBlob(zipBlob, 'mod-openclaw-package.zip');
  },
};

// ── Helpers ──────────────────────────────────────────────────

function setNestedValue(obj, path, value) {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!(keys[i] in current)) current[keys[i]] = {};
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
}

function generateSkillMd(skill) {
  const lines = [
    '---',
    `name: ${skill.id}`,
    `description: ${skill.description}`,
    `user-invocable: true`,
    `metadata: { "openclaw": { "emoji": "${skill.emoji}" } }`,
    '---',
    '',
    `# ${skill.name}`,
    '',
    skill.description,
    '',
    `> Source: ${skill.source === 'clawhub' ? 'ClawHub (' + skill.author + ')' : 'mod-openclaw'}`,
    '',
    `Platform: ${skill.platform}`,
    '',
    skill.note ? `> Note: ${skill.note}` : '',
  ];
  return lines.filter(Boolean).join('\n');
}

function generateInstallScript(skills, config) {
  return `#!/bin/bash
# ──────────────────────────────────────────────────────────
# mod-openclaw Package Installer
# Generated by the Onboarding Wizard
# ──────────────────────────────────────────────────────────
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
WORKSPACE="\${OPENCLAW_WORKSPACE:-\$HOME/.openclaw/workspace}"

echo "🦞 mod-openclaw Package Installer"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Install skills
echo "📦 Installing ${skills.length} skill(s)..."
mkdir -p "$WORKSPACE/skills"

for skill_dir in "$SCRIPT_DIR/skills"/*/; do
  skill_name="$(basename "$skill_dir")"
  target="$WORKSPACE/skills/$skill_name"
  if [ -L "$target" ] || [ -d "$target" ]; then
    echo "  ↺ $skill_name (already exists)"
  else
    cp -R "$skill_dir" "$target"
    echo "  ✅ $skill_name"
  fi
done

echo ""
echo "📋 Config patch saved to:"
echo "   $SCRIPT_DIR/openclaw-config-patch.json"
echo ""
echo "   Merge it into ~/.openclaw/openclaw.json manually,"
echo "   or copy the skills.entries section."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Done! Skills will be auto-detected by OpenClaw."
echo ""
`;
}

function generateReadme(skills) {
  const list = skills.map(s => `- ${s.emoji} **${s.name}** — ${s.description}`).join('\n');
  return `# mod-openclaw Package

Generated by the [mod-openclaw Onboarding Wizard](https://github.com/openclaw/openclaw).

## Included Skills

${list}

## Installation

\`\`\`bash
chmod +x install.sh
./install.sh
\`\`\`

Then merge \`openclaw-config-patch.json\` into your \`~/.openclaw/openclaw.json\`.
`;
}

// ── Minimal ZIP Generator (no dependencies) ──────────────────
// Uses the Compression Streams API (supported in all modern browsers)

async function createZip(files) {
  const entries = Object.entries(files);
  const parts = [];

  // ZIP local file headers + data
  const centralDir = [];
  let offset = 0;

  for (const [path, content] of entries) {
    const encoded = new TextEncoder().encode(content);
    const crc = crc32(encoded);
    const nameBytes = new TextEncoder().encode(path);

    // Local file header
    const header = new ArrayBuffer(30 + nameBytes.length);
    const view = new DataView(header);
    view.setUint32(0, 0x04034b50, true); // signature
    view.setUint16(4, 20, true); // version needed
    view.setUint16(6, 0, true); // flags
    view.setUint16(8, 0, true); // compression (stored)
    view.setUint16(10, 0, true); // mod time
    view.setUint16(12, 0, true); // mod date
    view.setUint32(14, crc, true); // crc32
    view.setUint32(18, encoded.length, true); // compressed size
    view.setUint32(22, encoded.length, true); // uncompressed size
    view.setUint16(26, nameBytes.length, true); // name length
    view.setUint16(28, 0, true); // extra length

    const headerArr = new Uint8Array(header);
    headerArr.set(nameBytes, 30);

    parts.push(headerArr, encoded);

    // Central directory entry
    const cdEntry = new ArrayBuffer(46 + nameBytes.length);
    const cdView = new DataView(cdEntry);
    cdView.setUint32(0, 0x02014b50, true); // signature
    cdView.setUint16(4, 20, true); // version made by
    cdView.setUint16(6, 20, true); // version needed
    cdView.setUint16(8, 0, true); // flags
    cdView.setUint16(10, 0, true); // compression
    cdView.setUint16(12, 0, true); // mod time
    cdView.setUint16(14, 0, true); // mod date
    cdView.setUint32(16, crc, true); // crc32
    cdView.setUint32(20, encoded.length, true); // compressed
    cdView.setUint32(24, encoded.length, true); // uncompressed
    cdView.setUint16(28, nameBytes.length, true); // name length
    cdView.setUint16(30, 0, true); // extra length
    cdView.setUint16(32, 0, true); // comment length
    cdView.setUint16(34, 0, true); // disk start
    cdView.setUint16(36, 0, true); // internal attrs
    cdView.setUint32(38, 0, true); // external attrs
    cdView.setUint32(42, offset, true); // relative offset

    const cdArr = new Uint8Array(cdEntry);
    cdArr.set(nameBytes, 46);
    centralDir.push(cdArr);

    offset += 30 + nameBytes.length + encoded.length;
  }

  // Central directory
  const cdOffset = offset;
  let cdSize = 0;
  centralDir.forEach(cd => {
    parts.push(cd);
    cdSize += cd.length;
  });

  // End of central directory
  const eocd = new ArrayBuffer(22);
  const eocdView = new DataView(eocd);
  eocdView.setUint32(0, 0x06054b50, true);
  eocdView.setUint16(4, 0, true);
  eocdView.setUint16(6, 0, true);
  eocdView.setUint16(8, entries.length, true);
  eocdView.setUint16(10, entries.length, true);
  eocdView.setUint32(12, cdSize, true);
  eocdView.setUint32(16, cdOffset, true);
  eocdView.setUint16(20, 0, true);
  parts.push(new Uint8Array(eocd));

  return new Blob(parts, { type: 'application/zip' });
}

// CRC-32 implementation
function crc32(data) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < data.length; i++) {
    crc ^= data[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0);
    }
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}

// ── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  wizard.updateProgress();
});

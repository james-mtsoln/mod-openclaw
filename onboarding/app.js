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
    id: 'gws-drive-upload', name: 'gws-drive-upload', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Drive: Upload a file with automatic metadata.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'recipe-save-email-attachments', name: 'recipe-save-email-attachments', emoji: '📜', author: 'googleworkspace',
    description: 'Find Gmail messages with attachments and save them to a Google Drive folder.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'recipe-transfer-file-ownership', name: 'recipe-transfer-file-ownership', emoji: '📜', author: 'googleworkspace',
    description: 'Transfer ownership of Google Drive files from one user to another.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'recipe-triage-security-alerts', name: 'recipe-triage-security-alerts', emoji: '📜', author: 'googleworkspace',
    description: 'List and review Google Workspace security alerts from Alert Center.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'gws-groupssettings', name: 'gws-groupssettings', emoji: '☁️', author: 'googleworkspace',
    description: 'Manage Google Groups settings.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'gws-gmail-triage', name: 'gws-gmail-triage', emoji: '☁️', author: 'googleworkspace',
    description: 'Gmail: Show unread inbox summary (sender, subject, date).',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'recipe-create-gmail-filter', name: 'recipe-create-gmail-filter', emoji: '📜', author: 'googleworkspace',
    description: 'Create a Gmail filter to automatically label, star, or categorize incoming messages.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'gws-people', name: 'gws-people', emoji: '☁️', author: 'googleworkspace',
    description: 'Google People: Manage contacts and profiles.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'recipe-label-and-archive-emails', name: 'recipe-label-and-archive-emails', emoji: '📜', author: 'googleworkspace',
    description: 'Apply Gmail labels to matching messages and archive them to keep your inbox clean.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'gws-gmail-watch', name: 'gws-gmail-watch', emoji: '☁️', author: 'googleworkspace',
    description: 'Gmail: Watch for new emails and stream them as NDJSON.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'recipe-send-personalized-emails', name: 'recipe-send-personalized-emails', emoji: '📜', author: 'googleworkspace',
    description: 'Read recipient data from Google Sheets and send personalized Gmail messages to each row.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'gws-admin-reports', name: 'gws-admin-reports', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Workspace Admin SDK: Audit logs and usage reports.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'gws-workflow', name: 'gws-workflow', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Workflow: Cross-service productivity workflows.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'recipe-send-team-announcement', name: 'recipe-send-team-announcement', emoji: '📜', author: 'googleworkspace',
    description: 'Send a team announcement via both Gmail and a Google Chat space.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'gws-docs', name: 'gws-docs', emoji: '☁️', author: 'googleworkspace',
    description: 'Read and write Google Docs.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'gws-modelarmor', name: 'gws-modelarmor', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Model Armor: Filter user-generated content for safety.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'recipe-share-event-materials', name: 'recipe-share-event-materials', emoji: '📜', author: 'googleworkspace',
    description: 'Share Google Drive files with all attendees of a Google Calendar event.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'recipe-schedule-recurring-event', name: 'recipe-schedule-recurring-event', emoji: '📜', author: 'googleworkspace',
    description: 'Create a recurring Google Calendar event with attendees.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'recipe-reschedule-meeting', name: 'recipe-reschedule-meeting', emoji: '📜', author: 'googleworkspace',
    description: 'Move a Google Calendar event to a new time and automatically notify all attendees.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'recipe-sync-contacts-to-sheet', name: 'recipe-sync-contacts-to-sheet', emoji: '📜', author: 'googleworkspace',
    description: 'Export Google Contacts directory to a Google Sheets spreadsheet.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'gws-workflow-email-to-task', name: 'gws-workflow-email-to-task', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Workflow: Convert a Gmail message into a Google Tasks entry.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'recipe-collect-form-responses', name: 'recipe-collect-form-responses', emoji: '📜', author: 'googleworkspace',
    description: 'Retrieve and review responses from a Google Form.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'recipe-post-mortem-setup', name: 'recipe-post-mortem-setup', emoji: '📜', author: 'googleworkspace',
    description: 'Create a Google Docs post-mortem, schedule a Google Calendar review, and notify via Chat.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'persona-event-coordinator', name: 'persona-event-coordinator', emoji: '🧑‍💻', author: 'googleworkspace',
    description: 'Plan and manage events — scheduling, invitations, and logistics.',
    tags: ['google-workspace', 'persona'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Persona', config: null,
  },
  {
    id: 'gws-meet', name: 'gws-meet', emoji: '☁️', author: 'googleworkspace',
    description: 'Manage Google Meet conferences.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'persona-sales-ops', name: 'persona-sales-ops', emoji: '🧑‍💻', author: 'googleworkspace',
    description: 'Manage sales workflows — track deals, schedule calls, client comms.',
    tags: ['google-workspace', 'persona'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Persona', config: null,
  },
  {
    id: 'recipe-audit-external-sharing', name: 'recipe-audit-external-sharing', emoji: '📜', author: 'googleworkspace',
    description: 'Find and review Google Drive files shared outside the organization.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'recipe-create-meet-space', name: 'recipe-create-meet-space', emoji: '📜', author: 'googleworkspace',
    description: 'Create a Google Meet meeting space and share the join link.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'gws-reseller', name: 'gws-reseller', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Workspace Reseller: Manage Workspace subscriptions.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'recipe-backup-sheet-as-csv', name: 'recipe-backup-sheet-as-csv', emoji: '📜', author: 'googleworkspace',
    description: 'Export a Google Sheets spreadsheet as a CSV file for local backup or processing.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'recipe-batch-reply-to-emails', name: 'recipe-batch-reply-to-emails', emoji: '📜', author: 'googleworkspace',
    description: 'Find Gmail messages matching a query and send a standard reply to each one.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'recipe-share-doc-and-notify', name: 'recipe-share-doc-and-notify', emoji: '📜', author: 'googleworkspace',
    description: 'Share a Google Docs document with edit access and email collaborators the link.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'gws-sheets-read', name: 'gws-sheets-read', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Sheets: Read values from a spreadsheet.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'gws-calendar-insert', name: 'gws-calendar-insert', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Calendar: Create a new event.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'gws-gmail', name: 'gws-gmail', emoji: '☁️', author: 'googleworkspace',
    description: 'Gmail: Send, read, and manage email.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'recipe-forward-labeled-emails', name: 'recipe-forward-labeled-emails', emoji: '📜', author: 'googleworkspace',
    description: 'Find Gmail messages with a specific label and forward them to another address.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'persona-researcher', name: 'persona-researcher', emoji: '🧑‍💻', author: 'googleworkspace',
    description: 'Organize research — manage references, notes, and collaboration.',
    tags: ['google-workspace', 'persona'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Persona', config: null,
  },
  {
    id: 'recipe-bulk-download-folder', name: 'recipe-bulk-download-folder', emoji: '📜', author: 'googleworkspace',
    description: 'List and download all files from a Google Drive folder.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'gws-workflow-weekly-digest', name: 'gws-workflow-weekly-digest', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Workflow: Weekly summary: this week\'s meetings + unread email count.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'recipe-find-free-time', name: 'recipe-find-free-time', emoji: '📜', author: 'googleworkspace',
    description: 'Query Google Calendar free/busy status for multiple users to find a meeting slot.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'persona-exec-assistant', name: 'persona-exec-assistant', emoji: '🧑‍💻', author: 'googleworkspace',
    description: 'Manage an executive\'s schedule, inbox, and communications.',
    tags: ['google-workspace', 'persona'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Persona', config: null,
  },
  {
    id: 'recipe-create-presentation', name: 'recipe-create-presentation', emoji: '📜', author: 'googleworkspace',
    description: 'Create a new Google Slides presentation and add initial slides.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'gws-gmail-send', name: 'gws-gmail-send', emoji: '☁️', author: 'googleworkspace',
    description: 'Gmail: Send an email.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'gws-chat', name: 'gws-chat', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Chat: Manage Chat spaces and messages.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'recipe-create-doc-from-template', name: 'recipe-create-doc-from-template', emoji: '📜', author: 'googleworkspace',
    description: 'Copy a Google Docs template, fill in content, and share with collaborators.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'gws-vault', name: 'gws-vault', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Vault: Manage eDiscovery holds and exports.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'gws-keep', name: 'gws-keep', emoji: '☁️', author: 'googleworkspace',
    description: 'Manage Google Keep notes.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'gws-modelarmor-sanitize-prompt', name: 'gws-modelarmor-sanitize-prompt', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Model Armor: Sanitize a user prompt through a Model Armor template.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Security', config: null,
  },
  {
    id: 'gws-classroom', name: 'gws-classroom', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Classroom: Manage classes, rosters, and coursework.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'gws-chat-send', name: 'gws-chat-send', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Chat: Send a message to a space.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'gws-events', name: 'gws-events', emoji: '☁️', author: 'googleworkspace',
    description: 'Subscribe to Google Workspace events.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'recipe-save-email-to-doc', name: 'recipe-save-email-to-doc', emoji: '📜', author: 'googleworkspace',
    description: 'Save a Gmail message body into a Google Doc for archival or reference.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'gws-workflow-file-announce', name: 'gws-workflow-file-announce', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Workflow: Announce a Drive file in a Chat space.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'recipe-create-shared-drive', name: 'recipe-create-shared-drive', emoji: '📜', author: 'googleworkspace',
    description: 'Create a Google Shared Drive and add members with appropriate roles.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'gws-drive', name: 'gws-drive', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Drive: Manage files, folders, and shared drives.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'recipe-watch-drive-changes', name: 'recipe-watch-drive-changes', emoji: '📜', author: 'googleworkspace',
    description: 'Subscribe to change notifications on a Google Drive file or folder.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'gws-events-subscribe', name: 'gws-events-subscribe', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Workspace Events: Subscribe to Workspace events and stream them as NDJSON.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'gws-forms', name: 'gws-forms', emoji: '☁️', author: 'googleworkspace',
    description: 'Read and write Google Forms.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'gws-workflow-standup-report', name: 'gws-workflow-standup-report', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Workflow: Today\'s meetings + open tasks as a standup summary.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'recipe-create-feedback-form', name: 'recipe-create-feedback-form', emoji: '📜', author: 'googleworkspace',
    description: 'Create a Google Form for feedback and share it via Gmail.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'recipe-share-folder-with-team', name: 'recipe-share-folder-with-team', emoji: '📜', author: 'googleworkspace',
    description: 'Share a Google Drive folder and all its contents with a list of collaborators.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'recipe-draft-email-from-doc', name: 'recipe-draft-email-from-doc', emoji: '📜', author: 'googleworkspace',
    description: 'Read content from a Google Doc and use it as the body of a Gmail message.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'recipe-plan-weekly-schedule', name: 'recipe-plan-weekly-schedule', emoji: '📜', author: 'googleworkspace',
    description: 'Review your Google Calendar week, identify gaps, and add events to fill them.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'recipe-search-and-export-emails', name: 'recipe-search-and-export-emails', emoji: '📜', author: 'googleworkspace',
    description: 'Find Gmail messages matching a query and export them for review.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'recipe-create-vacation-responder', name: 'recipe-create-vacation-responder', emoji: '📜', author: 'googleworkspace',
    description: 'Enable a Gmail out-of-office auto-reply with a custom message and date range.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'recipe-create-expense-tracker', name: 'recipe-create-expense-tracker', emoji: '📜', author: 'googleworkspace',
    description: 'Set up a Google Sheets spreadsheet for tracking expenses with headers and initial entries.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'recipe-log-deal-update', name: 'recipe-log-deal-update', emoji: '📜', author: 'googleworkspace',
    description: 'Append a deal status update to a Google Sheets sales tracking spreadsheet.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'recipe-review-overdue-tasks', name: 'recipe-review-overdue-tasks', emoji: '📜', author: 'googleworkspace',
    description: 'Find Google Tasks that are past due and need attention.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'gws-calendar', name: 'gws-calendar', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Calendar: Manage calendars and events.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'gws-sheets', name: 'gws-sheets', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Sheets: Read and write spreadsheets.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'gws-docs-write', name: 'gws-docs-write', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Docs: Append text to a document.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'recipe-cancel-and-notify', name: 'recipe-cancel-and-notify', emoji: '📜', author: 'googleworkspace',
    description: 'Delete a Google Calendar event and send a cancellation email via Gmail.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'recipe-review-meet-participants', name: 'recipe-review-meet-participants', emoji: '📜', author: 'googleworkspace',
    description: 'Review who attended a Google Meet conference and for how long.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'persona-content-creator', name: 'persona-content-creator', emoji: '🧑‍💻', author: 'googleworkspace',
    description: 'Create, organize, and distribute content across Workspace.',
    tags: ['google-workspace', 'persona'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Persona', config: null,
  },
  {
    id: 'recipe-copy-sheet-for-new-month', name: 'recipe-copy-sheet-for-new-month', emoji: '📜', author: 'googleworkspace',
    description: 'Duplicate a Google Sheets template tab for a new month of tracking.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'recipe-batch-rename-files', name: 'recipe-batch-rename-files', emoji: '📜', author: 'googleworkspace',
    description: 'Rename multiple Google Drive files matching a pattern to follow a consistent naming convention.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'recipe-generate-report-from-sheet', name: 'recipe-generate-report-from-sheet', emoji: '📜', author: 'googleworkspace',
    description: 'Read data from a Google Sheet and create a formatted Google Docs report.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'gws-tasks', name: 'gws-tasks', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Tasks: Manage task lists and tasks.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'gws-workflow-meeting-prep', name: 'gws-workflow-meeting-prep', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Workflow: Prepare for your next meeting: agenda, attendees, and linked docs.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'recipe-create-task-list', name: 'recipe-create-task-list', emoji: '📜', author: 'googleworkspace',
    description: 'Set up a new Google Tasks list with initial tasks.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'recipe-compare-sheet-tabs', name: 'recipe-compare-sheet-tabs', emoji: '📜', author: 'googleworkspace',
    description: 'Read data from two tabs in a Google Sheet to compare and identify differences.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'gws-apps-script-push', name: 'gws-apps-script-push', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Apps Script: Upload local files to an Apps Script project.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'gws-slides', name: 'gws-slides', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Slides: Read and write presentations.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'recipe-email-drive-link', name: 'recipe-email-drive-link', emoji: '📜', author: 'googleworkspace',
    description: 'Share a Google Drive file and email the link with a message to recipients.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'gws-licensing', name: 'gws-licensing', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Workspace Enterprise License Manager: Manage product licenses.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'gws-admin', name: 'gws-admin', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Workspace Admin SDK: Manage users, groups, and devices.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'gws-modelarmor-sanitize-response', name: 'gws-modelarmor-sanitize-response', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Model Armor: Sanitize a model response through a Model Armor template.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Security', config: null,
  },
  {
    id: 'gws-sheets-append', name: 'gws-sheets-append', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Sheets: Append a row to a spreadsheet.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'gws-alertcenter', name: 'gws-alertcenter', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Workspace Alert Center: Manage Workspace security alerts.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'gws-shared', name: 'gws-shared', emoji: '☁️', author: 'googleworkspace',
    description: 'gws CLI: Shared patterns for authentication, global flags, and output formatting.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'gws-calendar-agenda', name: 'gws-calendar-agenda', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Calendar: Show upcoming events across all calendars.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'gws-apps-script', name: 'gws-apps-script', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Apps Script: Manage and execute Apps Script projects.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'recipe-deploy-apps-script', name: 'recipe-deploy-apps-script', emoji: '📜', author: 'googleworkspace',
    description: 'Push local files to a Google Apps Script project.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'gws-modelarmor-create-template', name: 'gws-modelarmor-create-template', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Model Armor: Create a new Model Armor template.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Security', config: null,
  },
  {
    id: 'persona-it-admin', name: 'persona-it-admin', emoji: '🧑‍💻', author: 'googleworkspace',
    description: 'Administer IT — manage users, monitor security, configure Workspace.',
    tags: ['google-workspace', 'persona'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Persona', config: null,
  },
  {
    id: 'persona-customer-support', name: 'persona-customer-support', emoji: '🧑‍💻', author: 'googleworkspace',
    description: 'Manage customer support — track tickets, respond, escalate issues.',
    tags: ['google-workspace', 'persona'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Persona', config: null,
  },
  {
    id: 'persona-team-lead', name: 'persona-team-lead', emoji: '🧑‍💻', author: 'googleworkspace',
    description: 'Lead a team — run standups, coordinate tasks, and communicate.',
    tags: ['google-workspace', 'persona'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Persona', config: null,
  },
  {
    id: 'persona-project-manager', name: 'persona-project-manager', emoji: '🧑‍💻', author: 'googleworkspace',
    description: 'Coordinate projects — track tasks, schedule meetings, and share docs.',
    tags: ['google-workspace', 'persona'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Persona', config: null,
  },
  {
    id: 'recipe-create-classroom-course', name: 'recipe-create-classroom-course', emoji: '📜', author: 'googleworkspace',
    description: 'Create a Google Classroom course and invite students.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'recipe-create-events-from-sheet', name: 'recipe-create-events-from-sheet', emoji: '📜', author: 'googleworkspace',
    description: 'Read event data from a Google Sheets spreadsheet and create Google Calendar entries for each row.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'persona-hr-coordinator', name: 'persona-hr-coordinator', emoji: '🧑‍💻', author: 'googleworkspace',
    description: 'Handle HR workflows — onboarding, announcements, and employee comms.',
    tags: ['google-workspace', 'persona'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Persona', config: null,
  },
  {
    id: 'gws-events-renew', name: 'gws-events-renew', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Workspace Events: Renew/reactivate Workspace Events subscriptions.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'recipe-organize-drive-folder', name: 'recipe-organize-drive-folder', emoji: '📜', author: 'googleworkspace',
    description: 'Create a Google Drive folder structure and move files into the right locations.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'recipe-find-large-files', name: 'recipe-find-large-files', emoji: '📜', author: 'googleworkspace',
    description: 'Identify large Google Drive files consuming storage quota.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'gws-cloudidentity', name: 'gws-cloudidentity', emoji: '☁️', author: 'googleworkspace',
    description: 'Google Cloud Identity: Manage identity groups and memberships.',
    tags: ['google-workspace', 'gws'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Productivity', config: null,
  },
  {
    id: 'recipe-batch-invite-to-event', name: 'recipe-batch-invite-to-event', emoji: '📜', author: 'googleworkspace',
    description: 'Add a list of attendees to an existing Google Calendar event and send notifications.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
  },
  {
    id: 'recipe-block-focus-time', name: 'recipe-block-focus-time', emoji: '📜', author: 'googleworkspace',
    description: 'Create recurring focus time blocks on Google Calendar to protect deep work hours.',
    tags: ['google-workspace', 'recipe'], security: 'safe', platform: 'any', source: 'googleworkspace',
    category: 'Recipe', config: null,
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
  {
    id: 'agency-design-ux-architect', name: 'UX Architect', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Technical architecture and UX specialist who provides developers with solid foundations, CSS systems, and clear implementation guidance',
    tags: ['agency-agents', 'persona', 'design'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Design', config: null,
  },
  {
    id: 'agency-design-whimsy-injector', name: 'Whimsy Injector', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert creative specialist focused on adding personality, delight, and playful elements to brand experiences. Creates memorable, joyful interactions that differentiate brands through unexpected moments of whimsy',
    tags: ['agency-agents', 'persona', 'design'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Design', config: null,
  },
  {
    id: 'agency-design-ux-researcher', name: 'UX Researcher', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert user experience researcher specializing in user behavior analysis, usability testing, and data-driven design insights. Provides actionable research findings that improve product usability and user satisfaction',
    tags: ['agency-agents', 'persona', 'design'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Design', config: null,
  },
  {
    id: 'agency-design-brand-guardian', name: 'Brand Guardian', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert brand strategist and guardian specializing in brand identity development, consistency maintenance, and strategic brand positioning',
    tags: ['agency-agents', 'persona', 'design'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Design', config: null,
  },
  {
    id: 'agency-design-ui-designer', name: 'UI Designer', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert UI designer specializing in visual design systems, component libraries, and pixel-perfect interface creation. Creates beautiful, consistent, accessible user interfaces that enhance UX and reflect brand identity',
    tags: ['agency-agents', 'persona', 'design'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Design', config: null,
  },
  {
    id: 'agency-design-image-prompt-engineer', name: 'Image Prompt Engineer', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert photography prompt engineer specializing in crafting detailed, evocative prompts for AI image generation. Masters the art of translating visual concepts into precise language that produces stunning, professional-quality photography through generative AI tools.',
    tags: ['agency-agents', 'persona', 'design'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Design', config: null,
  },
  {
    id: 'agency-design-visual-storyteller', name: 'Visual Storyteller', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert visual communication specialist focused on creating compelling visual narratives, multimedia content, and brand storytelling through design. Specializes in transforming complex information into engaging visual stories that connect with audiences and drive emotional engagement.',
    tags: ['agency-agents', 'persona', 'design'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Design', config: null,
  },
  {
    id: 'agency-xr-cockpit-interaction-specialist', name: 'XR Cockpit Interaction Specialist', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Specialist in designing and developing immersive cockpit-based control systems for XR environments',
    tags: ['agency-agents', 'persona', 'spatial-computing'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Spatial Computing', config: null,
  },
  {
    id: 'agency-xr-immersive-developer', name: 'XR Immersive Developer', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert WebXR and immersive technology developer with specialization in browser-based AR/VR/XR applications',
    tags: ['agency-agents', 'persona', 'spatial-computing'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Spatial Computing', config: null,
  },
  {
    id: 'agency-terminal-integration-specialist', name: 'Terminal Integration Specialist', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Terminal emulation, text rendering optimization, and SwiftTerm integration for modern Swift applications',
    tags: ['agency-agents', 'persona', 'spatial-computing'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Spatial Computing', config: null,
  },
  {
    id: 'agency-macos-spatial-metal-engineer', name: 'macOS Spatial/Metal Engineer', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Native Swift and Metal specialist building high-performance 3D rendering systems and spatial computing experiences for macOS and Vision Pro',
    tags: ['agency-agents', 'persona', 'spatial-computing'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Spatial Computing', config: null,
  },
  {
    id: 'agency-xr-interface-architect', name: 'XR Interface Architect', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Spatial interaction designer and interface strategist for immersive AR/VR/XR environments',
    tags: ['agency-agents', 'persona', 'spatial-computing'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Spatial Computing', config: null,
  },
  {
    id: 'agency-visionos-spatial-engineer', name: 'visionOS Spatial Engineer', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Native visionOS spatial computing, SwiftUI volumetric interfaces, and Liquid Glass design implementation',
    tags: ['agency-agents', 'persona', 'spatial-computing'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Spatial Computing', config: null,
  },
  {
    id: 'agency-project-management-studio-producer', name: 'Studio Producer', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Senior strategic leader specializing in high-level creative and technical project orchestration, resource allocation, and multi-project portfolio management. Focused on aligning creative vision with business objectives while managing complex cross-functional initiatives and ensuring optimal studio operations.',
    tags: ['agency-agents', 'persona', 'project-management'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Project Management', config: null,
  },
  {
    id: 'agency-project-management-project-shepherd', name: 'Project Shepherd', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert project manager specializing in cross-functional project coordination, timeline management, and stakeholder alignment. Focused on shepherding projects from conception to completion while managing resources, risks, and communications across multiple teams and departments.',
    tags: ['agency-agents', 'persona', 'project-management'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Project Management', config: null,
  },
  {
    id: 'agency-project-manager-senior', name: 'Senior Project Manager', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Converts specs to tasks, remembers previous projects\n - Focused on realistic scope, no background processes, exact spec requirements',
    tags: ['agency-agents', 'persona', 'project-management'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Project Management', config: null,
  },
  {
    id: 'agency-project-management-studio-operations', name: 'Studio Operations', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert operations manager specializing in day-to-day studio efficiency, process optimization, and resource coordination. Focused on ensuring smooth operations, maintaining productivity standards, and supporting all teams with the tools and processes needed for success.',
    tags: ['agency-agents', 'persona', 'project-management'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Project Management', config: null,
  },
  {
    id: 'agency-project-management-experiment-tracker', name: 'Experiment Tracker', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert project manager specializing in experiment design, execution tracking, and data-driven decision making. Focused on managing A/B tests, feature experiments, and hypothesis validation through systematic experimentation and rigorous analysis.',
    tags: ['agency-agents', 'persona', 'project-management'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Project Management', config: null,
  },
  {
    id: 'agency-data-analytics-reporter', name: 'Data Analytics Reporter', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert data analyst transforming raw data into actionable business insights. Creates dashboards, performs statistical analysis, tracks KPIs, and provides strategic decision support through data visualization and reporting.',
    tags: ['agency-agents', 'persona', 'specialized'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Specialized', config: null,
  },
  {
    id: 'agency-agentic-identity-trust', name: 'Agentic Identity & Trust Architect', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Designs identity, authentication, and trust verification systems for autonomous AI agents operating in multi-agent environments. Ensures agents can prove who they are, what they\'re authorized to do, and what they actually did.',
    tags: ['agency-agents', 'persona', 'specialized'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Specialized', config: null,
  },
  {
    id: 'agency-lsp-index-engineer', name: 'LSP/Index Engineer', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Language Server Protocol specialist building unified code intelligence systems through LSP client orchestration and semantic indexing',
    tags: ['agency-agents', 'persona', 'specialized'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Specialized', config: null,
  },
  {
    id: 'agency-agents-orchestrator', name: 'Agents Orchestrator', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Autonomous pipeline manager that orchestrates the entire development workflow. You are the leader of this process.',
    tags: ['agency-agents', 'persona', 'specialized'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Specialized', config: null,
  },
  {
    id: 'agency-sales-data-extraction-agent', name: 'Sales Data Extraction Agent', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'AI agent specialized in monitoring Excel files and extracting key sales metrics (MTD, YTD, Year End) for internal live reporting',
    tags: ['agency-agents', 'persona', 'specialized'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Specialized', config: null,
  },
  {
    id: 'agency-data-consolidation-agent', name: 'Data Consolidation Agent', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'AI agent that consolidates extracted sales data into live reporting dashboards with territory, rep, and pipeline summaries',
    tags: ['agency-agents', 'persona', 'specialized'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Specialized', config: null,
  },
  {
    id: 'agency-report-distribution-agent', name: 'Report Distribution Agent', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'AI agent that automates distribution of consolidated sales reports to representatives based on territorial parameters',
    tags: ['agency-agents', 'persona', 'specialized'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Specialized', config: null,
  },
  {
    id: 'agency-product-feedback-synthesizer', name: 'Feedback Synthesizer', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert in collecting, analyzing, and synthesizing user feedback from multiple channels to extract actionable product insights. Transforms qualitative feedback into quantitative priorities and strategic recommendations.',
    tags: ['agency-agents', 'persona', 'product'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Product', config: null,
  },
  {
    id: 'agency-product-trend-researcher', name: 'Trend Researcher', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert market intelligence analyst specializing in identifying emerging trends, competitive analysis, and opportunity assessment. Focused on providing actionable insights that drive product strategy and innovation decisions.',
    tags: ['agency-agents', 'persona', 'product'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Product', config: null,
  },
  {
    id: 'agency-product-sprint-prioritizer', name: 'Sprint Prioritizer', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert product manager specializing in agile sprint planning, feature prioritization, and resource allocation. Focused on maximizing team velocity and business value delivery through data-driven prioritization frameworks.',
    tags: ['agency-agents', 'persona', 'product'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Product', config: null,
  },
  {
    id: 'agency-testing-api-tester', name: 'API Tester', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert API testing specialist focused on comprehensive API validation, performance testing, and quality assurance across all systems and third-party integrations',
    tags: ['agency-agents', 'persona', 'testing'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Testing', config: null,
  },
  {
    id: 'agency-testing-workflow-optimizer', name: 'Workflow Optimizer', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert process improvement specialist focused on analyzing, optimizing, and automating workflows across all business functions for maximum productivity and efficiency',
    tags: ['agency-agents', 'persona', 'testing'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Testing', config: null,
  },
  {
    id: 'agency-testing-reality-checker', name: 'Reality Checker', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Stops fantasy approvals, evidence-based certification - Default to NEEDS WORK, requires overwhelming proof for production readiness',
    tags: ['agency-agents', 'persona', 'testing'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Testing', config: null,
  },
  {
    id: 'agency-testing-performance-benchmarker', name: 'Performance Benchmarker', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert performance testing and optimization specialist focused on measuring, analyzing, and improving system performance across all applications and infrastructure',
    tags: ['agency-agents', 'persona', 'testing'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Testing', config: null,
  },
  {
    id: 'agency-testing-test-results-analyzer', name: 'Test Results Analyzer', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert test analysis specialist focused on comprehensive test result evaluation, quality metrics analysis, and actionable insight generation from testing activities',
    tags: ['agency-agents', 'persona', 'testing'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Testing', config: null,
  },
  {
    id: 'agency-testing-evidence-collector', name: 'Evidence Collector', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Screenshot-obsessed, fantasy-allergic QA specialist - Default to finding 3-5 issues, requires visual proof for everything',
    tags: ['agency-agents', 'persona', 'testing'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Testing', config: null,
  },
  {
    id: 'agency-testing-tool-evaluator', name: 'Tool Evaluator', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert technology assessment specialist focused on evaluating, testing, and recommending tools, software, and platforms for business use and productivity optimization',
    tags: ['agency-agents', 'persona', 'testing'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Testing', config: null,
  },
  {
    id: 'agency-support-legal-compliance-checker', name: 'Legal Compliance Checker', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert legal and compliance specialist ensuring business operations, data handling, and content creation comply with relevant laws, regulations, and industry standards across multiple jurisdictions.',
    tags: ['agency-agents', 'persona', 'support'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Support', config: null,
  },
  {
    id: 'agency-support-analytics-reporter', name: 'Analytics Reporter', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert data analyst transforming raw data into actionable business insights. Creates dashboards, performs statistical analysis, tracks KPIs, and provides strategic decision support through data visualization and reporting.',
    tags: ['agency-agents', 'persona', 'support'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Support', config: null,
  },
  {
    id: 'agency-support-support-responder', name: 'Support Responder', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert customer support specialist delivering exceptional customer service, issue resolution, and user experience optimization. Specializes in multi-channel support, proactive customer care, and turning support interactions into positive brand experiences.',
    tags: ['agency-agents', 'persona', 'support'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Support', config: null,
  },
  {
    id: 'agency-support-infrastructure-maintainer', name: 'Infrastructure Maintainer', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert infrastructure specialist focused on system reliability, performance optimization, and technical operations management. Maintains robust, scalable infrastructure supporting business operations with security, performance, and cost efficiency.',
    tags: ['agency-agents', 'persona', 'support'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Support', config: null,
  },
  {
    id: 'agency-support-finance-tracker', name: 'Finance Tracker', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert financial analyst and controller specializing in financial planning, budget management, and business performance analysis. Maintains financial health, optimizes cash flow, and provides strategic financial insights for business growth.',
    tags: ['agency-agents', 'persona', 'support'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Support', config: null,
  },
  {
    id: 'agency-support-executive-summary-generator', name: 'Executive Summary Generator', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Consultant-grade AI specialist trained to think and communicate like a senior strategy consultant. Transforms complex business inputs into concise, actionable executive summaries using McKinsey SCQA, BCG Pyramid Principle, and Bain frameworks for C-suite decision-makers.',
    tags: ['agency-agents', 'persona', 'support'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Support', config: null,
  },
  {
    id: 'agency-marketing-reddit-community-builder', name: 'Reddit Community Builder', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert Reddit marketing specialist focused on authentic community engagement, value-driven content creation, and long-term relationship building. Masters Reddit culture navigation.',
    tags: ['agency-agents', 'persona', 'marketing'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Marketing', config: null,
  },
  {
    id: 'agency-marketing-instagram-curator', name: 'Instagram Curator', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert Instagram marketing specialist focused on visual storytelling, community building, and multi-format content optimization. Masters aesthetic development and drives meaningful engagement.',
    tags: ['agency-agents', 'persona', 'marketing'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Marketing', config: null,
  },
  {
    id: 'agency-marketing-social-media-strategist', name: 'Social Media Strategist', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert social media strategist for LinkedIn, Twitter, and professional platforms. Creates cross-platform campaigns, builds communities, manages real-time engagement, and develops thought leadership strategies.',
    tags: ['agency-agents', 'persona', 'marketing'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Marketing', config: null,
  },
  {
    id: 'agency-marketing-app-store-optimizer', name: 'App Store Optimizer', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert app store marketing specialist focused on App Store Optimization (ASO), conversion rate optimization, and app discoverability',
    tags: ['agency-agents', 'persona', 'marketing'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Marketing', config: null,
  },
  {
    id: 'agency-marketing-tiktok-strategist', name: 'TikTok Strategist', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert TikTok marketing specialist focused on viral content creation, algorithm optimization, and community building. Masters TikTok\'s unique culture and features for brand growth.',
    tags: ['agency-agents', 'persona', 'marketing'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Marketing', config: null,
  },
  {
    id: 'agency-marketing-twitter-engager', name: 'Twitter Engager', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert Twitter marketing specialist focused on real-time engagement, thought leadership building, and community-driven growth. Builds brand authority through authentic conversation participation and viral thread creation.',
    tags: ['agency-agents', 'persona', 'marketing'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Marketing', config: null,
  },
  {
    id: 'agency-marketing-content-creator', name: 'Content Creator', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert content strategist and creator for multi-platform campaigns. Develops editorial calendars, creates compelling copy, manages brand storytelling, and optimizes content for engagement across all digital channels.',
    tags: ['agency-agents', 'persona', 'marketing'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Marketing', config: null,
  },
  {
    id: 'agency-marketing-growth-hacker', name: 'Growth Hacker', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert growth strategist specializing in rapid user acquisition through data-driven experimentation. Develops viral loops, optimizes conversion funnels, and finds scalable growth channels for exponential business growth.',
    tags: ['agency-agents', 'persona', 'marketing'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Marketing', config: null,
  },
  {
    id: 'agency-engineering-mobile-app-builder', name: 'Mobile App Builder', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Specialized mobile application developer with expertise in native iOS/Android development and cross-platform frameworks',
    tags: ['agency-agents', 'persona', 'engineering'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Engineering', config: null,
  },
  {
    id: 'agency-engineering-backend-architect', name: 'Backend Architect', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Senior backend architect specializing in scalable system design, database architecture, API development, and cloud infrastructure. Builds robust, secure, performant server-side applications and microservices',
    tags: ['agency-agents', 'persona', 'engineering'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Engineering', config: null,
  },
  {
    id: 'agency-engineering-rapid-prototyper', name: 'Rapid Prototyper', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Specialized in ultra-fast proof-of-concept development and MVP creation using efficient tools and frameworks',
    tags: ['agency-agents', 'persona', 'engineering'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Engineering', config: null,
  },
  {
    id: 'agency-engineering-ai-engineer', name: 'AI Engineer', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert AI/ML engineer specializing in machine learning model development, deployment, and integration into production systems. Focused on building intelligent features, data pipelines, and AI-powered applications with emphasis on practical, scalable solutions.',
    tags: ['agency-agents', 'persona', 'engineering'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Engineering', config: null,
  },
  {
    id: 'agency-engineering-senior-developer', name: 'Senior Developer', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Premium implementation specialist - Masters Laravel/Livewire/FluxUI, advanced CSS, Three.js integration',
    tags: ['agency-agents', 'persona', 'engineering'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Engineering', config: null,
  },
  {
    id: 'agency-engineering-devops-automator', name: 'DevOps Automator', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert DevOps engineer specializing in infrastructure automation, CI/CD pipeline development, and cloud operations',
    tags: ['agency-agents', 'persona', 'engineering'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Engineering', config: null,
  },
  {
    id: 'agency-engineering-frontend-developer', name: 'Frontend Developer', emoji: '🧑‍💻', author: 'msitarzewski',
    description: 'Expert frontend developer specializing in modern web technologies, React/Vue/Angular frameworks, UI implementation, and performance optimization',
    tags: ['agency-agents', 'persona', 'engineering'], security: 'safe', platform: 'any', source: 'agency-agents',
    category: 'Engineering', config: null,
  },
  {
    "id": "ab-test-setup",
    "name": "ab-test-setup",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "When the user wants to plan, design, or implement an A/B test or experiment. Also use when the user mentions \"A/B test,\" \"split test,\" \"experiment,\" \"test this change,\" \"variant copy,\" \"multivariate test,\" \"hypothesis,\" \"should I test this,\" \"which version is better,\" \"test two versions,\" \"statistical significance,\" or \"how long should I run this test.\" Use this whenever someone is comparing two approaches and wants to measure which performs better. For tracking implementation, see analytics-tracking. For page-level conversion optimization, see page-cro.",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  },
  {
    "id": "ad-creative",
    "name": "ad-creative",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "\"When the user wants to generate, iterate, or scale ad creative \u2014 headlines, descriptions, primary text, or full ad variations \u2014 for any paid advertising platform. Also use when the user mentions 'ad copy variations,' 'ad creative,' 'generate headlines,' 'RSA headlines,' 'bulk ad copy,' 'ad iterations,' 'creative testing,' 'ad performance optimization,' 'write me some ads,' 'Facebook ad copy,' 'Google ad headlines,' 'LinkedIn ad text,' or 'I need more ad variations.' Use this whenever someone needs to produce ad copy at scale or iterate on existing ads. For campaign strategy and targeting, see paid-ads. For landing page copy, see copywriting.\"",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  },
  {
    "id": "ai-seo",
    "name": "ai-seo",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "\"When the user wants to optimize content for AI search engines, get cited by LLMs, or appear in AI-generated answers. Also use when the user mentions 'AI SEO,' 'AEO,' 'GEO,' 'LLMO,' 'answer engine optimization,' 'generative engine optimization,' 'LLM optimization,' 'AI Overviews,' 'optimize for ChatGPT,' 'optimize for Perplexity,' 'AI citations,' 'AI visibility,' 'zero-click search,' 'how do I show up in AI answers,' 'LLM mentions,' or 'optimize for Claude/Gemini.' Use this whenever someone wants their content to be cited or surfaced by AI assistants and AI search engines. For traditional technical and on-page SEO audits, see seo-audit. For structured data implementation, see schema-markup.\"",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  },
  {
    "id": "analytics-tracking",
    "name": "analytics-tracking",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "When the user wants to set up, improve, or audit analytics tracking and measurement. Also use when the user mentions \"set up tracking,\" \"GA4,\" \"Google Analytics,\" \"conversion tracking,\" \"event tracking,\" \"UTM parameters,\" \"tag manager,\" \"GTM,\" \"analytics implementation,\" \"tracking plan,\" \"how do I measure this,\" \"track conversions,\" \"attribution,\" \"Mixpanel,\" \"Segment,\" \"are my events firing,\" or \"analytics isn't working.\" Use this whenever someone asks how to know if something is working or wants to measure marketing results. For A/B test measurement, see ab-test-setup.",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  },
  {
    "id": "churn-prevention",
    "name": "churn-prevention",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "\"When the user wants to reduce churn, build cancellation flows, set up save offers, recover failed payments, or implement retention strategies. Also use when the user mentions 'churn,' 'cancel flow,' 'offboarding,' 'save offer,' 'dunning,' 'failed payment recovery,' 'win-back,' 'retention,' 'exit survey,' 'pause subscription,' 'involuntary churn,' 'people keep canceling,' 'churn rate is too high,' 'how do I keep users,' or 'customers are leaving.' Use this whenever someone is losing subscribers or wants to build systems to prevent it. For post-cancel win-back email sequences, see email-sequence. For in-app upgrade paywalls, see paywall-upgrade-cro.\"",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  },
  {
    "id": "cold-email",
    "name": "cold-email",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "Write B2B cold emails and follow-up sequences that get replies. Use when the user wants to write cold outreach emails, prospecting emails, cold email campaigns, sales development emails, or SDR emails. Also use when the user mentions \"cold outreach,\" \"prospecting email,\" \"outbound email,\" \"email to leads,\" \"reach out to prospects,\" \"sales email,\" \"follow-up email sequence,\" \"nobody's replying to my emails,\" or \"how do I write a cold email.\" Covers subject lines, opening lines, body copy, CTAs, personalization, and multi-touch follow-up sequences. For warm/lifecycle email sequences, see email-sequence. For sales collateral beyond emails, see sales-enablement.",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  },
  {
    "id": "competitor-alternatives",
    "name": "competitor-alternatives",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "\"When the user wants to create competitor comparison or alternative pages for SEO and sales enablement. Also use when the user mentions 'alternative page,' 'vs page,' 'competitor comparison,' 'comparison page,' '[Product] vs [Product],' '[Product] alternative,' 'competitive landing pages,' 'how do we compare to X,' 'battle card,' or 'competitor teardown.' Use this for any content that positions your product against competitors. Covers four formats: singular alternative, plural alternatives, you vs competitor, and competitor vs competitor. For sales-specific competitor docs, see sales-enablement.\"",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  },
  {
    "id": "content-strategy",
    "name": "content-strategy",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "When the user wants to plan a content strategy, decide what content to create, or figure out what topics to cover. Also use when the user mentions \"content strategy,\" \"what should I write about,\" \"content ideas,\" \"blog strategy,\" \"topic clusters,\" \"content planning,\" \"editorial calendar,\" \"content marketing,\" \"content roadmap,\" \"what content should I create,\" \"blog topics,\" \"content pillars,\" or \"I don't know what to write.\" Use this whenever someone needs help deciding what content to produce, not just writing it. For writing individual pieces, see copywriting. For SEO-specific audits, see seo-audit. For social media content specifically, see social-content.",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  },
  {
    "id": "copy-editing",
    "name": "copy-editing",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "\"When the user wants to edit, review, or improve existing marketing copy. Also use when the user mentions 'edit this copy,' 'review my copy,' 'copy feedback,' 'proofread,' 'polish this,' 'make this better,' 'copy sweep,' 'tighten this up,' 'this reads awkwardly,' 'clean up this text,' 'too wordy,' or 'sharpen the messaging.' Use this when the user already has copy and wants it improved rather than rewritten from scratch. For writing new copy, see copywriting.\"",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  },
  {
    "id": "copywriting",
    "name": "copywriting",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "When the user wants to write, rewrite, or improve marketing copy for any page \u2014 including homepage, landing pages, pricing pages, feature pages, about pages, or product pages. Also use when the user says \"write copy for,\" \"improve this copy,\" \"rewrite this page,\" \"marketing copy,\" \"headline help,\" \"CTA copy,\" \"value proposition,\" \"tagline,\" \"subheadline,\" \"hero section copy,\" \"above the fold,\" \"this copy is weak,\" \"make this more compelling,\" or \"help me describe my product.\" Use this whenever someone is working on website text that needs to persuade or convert. For email copy, see email-sequence. For popup copy, see popup-cro. For editing existing copy, see copy-editing.",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  },
  {
    "id": "email-sequence",
    "name": "email-sequence",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "When the user wants to create or optimize an email sequence, drip campaign, automated email flow, or lifecycle email program. Also use when the user mentions \"email sequence,\" \"drip campaign,\" \"nurture sequence,\" \"onboarding emails,\" \"welcome sequence,\" \"re-engagement emails,\" \"email automation,\" \"lifecycle emails,\" \"trigger-based emails,\" \"email funnel,\" \"email workflow,\" \"what emails should I send,\" \"welcome series,\" or \"email cadence.\" Use this for any multi-email automated flow. For cold outreach emails, see cold-email. For in-app onboarding, see onboarding-cro.",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  },
  {
    "id": "form-cro",
    "name": "form-cro",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "When the user wants to optimize any form that is NOT signup/registration \u2014 including lead capture forms, contact forms, demo request forms, application forms, survey forms, or checkout forms. Also use when the user mentions \"form optimization,\" \"lead form conversions,\" \"form friction,\" \"form fields,\" \"form completion rate,\" \"contact form,\" \"nobody fills out our form,\" \"form abandonment,\" \"too many fields,\" \"demo request form,\" or \"lead form isn't converting.\" Use this for any non-signup form that captures information. For signup/registration forms, see signup-flow-cro. For popups containing forms, see popup-cro.",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  },
  {
    "id": "free-tool-strategy",
    "name": "free-tool-strategy",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "When the user wants to plan, evaluate, or build a free tool for marketing purposes \u2014 lead generation, SEO value, or brand awareness. Also use when the user mentions \"engineering as marketing,\" \"free tool,\" \"marketing tool,\" \"calculator,\" \"generator,\" \"interactive tool,\" \"lead gen tool,\" \"build a tool for leads,\" \"free resource,\" \"ROI calculator,\" \"grader tool,\" \"audit tool,\" \"should I build a free tool,\" or \"tools for lead gen.\" Use this whenever someone wants to build something useful and give it away to attract leads or earn links. For content-based lead generation, see content-strategy.",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  },
  {
    "id": "launch-strategy",
    "name": "launch-strategy",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "\"When the user wants to plan a product launch, feature announcement, or release strategy. Also use when the user mentions 'launch,' 'Product Hunt,' 'feature release,' 'announcement,' 'go-to-market,' 'beta launch,' 'early access,' 'waitlist,' 'product update,' 'how do I launch this,' 'launch checklist,' 'GTM plan,' or 'we're about to ship.' Use this whenever someone is preparing to release something publicly. For ongoing marketing after launch, see marketing-ideas.\"",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  },
  {
    "id": "marketing-ideas",
    "name": "marketing-ideas",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "\"When the user needs marketing ideas, inspiration, or strategies for their SaaS or software product. Also use when the user asks for 'marketing ideas,' 'growth ideas,' 'how to market,' 'marketing strategies,' 'marketing tactics,' 'ways to promote,' 'ideas to grow,' 'what else can I try,' 'I don't know how to market this,' 'brainstorm marketing,' or 'what marketing should I do.' Use this as a starting point whenever someone is stuck or looking for inspiration on how to grow. For specific channel execution, see the relevant skill (paid-ads, social-content, email-sequence, etc.).\"",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  },
  {
    "id": "marketing-psychology",
    "name": "marketing-psychology",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "\"When the user wants to apply psychological principles, mental models, or behavioral science to marketing. Also use when the user mentions 'psychology,' 'mental models,' 'cognitive bias,' 'persuasion,' 'behavioral science,' 'why people buy,' 'decision-making,' 'consumer behavior,' 'anchoring,' 'social proof,' 'scarcity,' 'loss aversion,' 'framing,' or 'nudge.' Use this whenever someone wants to understand or leverage how people think and make decisions in a marketing context.\"",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  },
  {
    "id": "onboarding-cro",
    "name": "onboarding-cro",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "When the user wants to optimize post-signup onboarding, user activation, first-run experience, or time-to-value. Also use when the user mentions \"onboarding flow,\" \"activation rate,\" \"user activation,\" \"first-run experience,\" \"empty states,\" \"onboarding checklist,\" \"aha moment,\" \"new user experience,\" \"users aren't activating,\" \"nobody completes setup,\" \"low activation rate,\" \"users sign up but don't use the product,\" \"time to value,\" or \"first session experience.\" Use this whenever users are signing up but not sticking around. For signup/registration optimization, see signup-flow-cro. For ongoing email sequences, see email-sequence.",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  },
  {
    "id": "page-cro",
    "name": "page-cro",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "When the user wants to optimize, improve, or increase conversions on any marketing page \u2014 including homepage, landing pages, pricing pages, feature pages, or blog posts. Also use when the user says \"CRO,\" \"conversion rate optimization,\" \"this page isn't converting,\" \"improve conversions,\" \"why isn't this page working,\" \"my landing page sucks,\" \"nobody's converting,\" \"low conversion rate,\" \"bounce rate is too high,\" \"people leave without signing up,\" or \"this page needs work.\" Use this even if the user just shares a URL and asks for feedback \u2014 they probably want conversion help. For signup/registration flows, see signup-flow-cro. For post-signup activation, see onboarding-cro. For forms outside of signup, see form-cro. For popups/modals, see popup-cro.",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  },
  {
    "id": "paid-ads",
    "name": "paid-ads",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "\"When the user wants help with paid advertising campaigns on Google Ads, Meta (Facebook/Instagram), LinkedIn, Twitter/X, or other ad platforms. Also use when the user mentions 'PPC,' 'paid media,' 'ROAS,' 'CPA,' 'ad campaign,' 'retargeting,' 'audience targeting,' 'Google Ads,' 'Facebook ads,' 'LinkedIn ads,' 'ad budget,' 'cost per click,' 'ad spend,' or 'should I run ads.' Use this for campaign strategy, audience targeting, bidding, and optimization. For bulk ad creative generation and iteration, see ad-creative. For landing page optimization, see page-cro.\"",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  },
  {
    "id": "paywall-upgrade-cro",
    "name": "paywall-upgrade-cro",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "When the user wants to create or optimize in-app paywalls, upgrade screens, upsell modals, or feature gates. Also use when the user mentions \"paywall,\" \"upgrade screen,\" \"upgrade modal,\" \"upsell,\" \"feature gate,\" \"convert free to paid,\" \"freemium conversion,\" \"trial expiration screen,\" \"limit reached screen,\" \"plan upgrade prompt,\" \"in-app pricing,\" \"free users won't upgrade,\" \"trial to paid conversion,\" or \"how do I get users to pay.\" Use this for any in-product moment where you're asking users to upgrade. Distinct from public pricing pages (see page-cro) \u2014 this focuses on in-product upgrade moments where the user has already experienced value. For pricing decisions, see pricing-strategy.",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  },
  {
    "id": "popup-cro",
    "name": "popup-cro",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "When the user wants to create or optimize popups, modals, overlays, slide-ins, or banners for conversion purposes. Also use when the user mentions \"exit intent,\" \"popup conversions,\" \"modal optimization,\" \"lead capture popup,\" \"email popup,\" \"announcement banner,\" \"overlay,\" \"collect emails with a popup,\" \"exit popup,\" \"scroll trigger,\" \"sticky bar,\" or \"notification bar.\" Use this for any overlay or interrupt-style conversion element. For forms outside of popups, see form-cro. For general page conversion optimization, see page-cro.",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  },
  {
    "id": "pricing-strategy",
    "name": "pricing-strategy",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "\"When the user wants help with pricing decisions, packaging, or monetization strategy. Also use when the user mentions 'pricing,' 'pricing tiers,' 'freemium,' 'free trial,' 'packaging,' 'price increase,' 'value metric,' 'Van Westendorp,' 'willingness to pay,' 'monetization,' 'how much should I charge,' 'my pricing is wrong,' 'pricing page,' 'annual vs monthly,' 'per seat pricing,' or 'should I offer a free plan.' Use this whenever someone is figuring out what to charge or how to structure their plans. For in-app upgrade screens, see paywall-upgrade-cro.\"",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  },
  {
    "id": "product-marketing-context",
    "name": "product-marketing-context",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "\"When the user wants to create or update their product marketing context document. Also use when the user mentions 'product context,' 'marketing context,' 'set up context,' 'positioning,' 'who is my target audience,' 'describe my product,' 'ICP,' 'ideal customer profile,' or wants to avoid repeating foundational information across marketing tasks. Use this at the start of any new project before using other marketing skills \u2014 it creates `.agents/product-marketing-context.md` that all other skills reference for product, audience, and positioning context.\"",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  },
  {
    "id": "programmatic-seo",
    "name": "programmatic-seo",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "When the user wants to create SEO-driven pages at scale using templates and data. Also use when the user mentions \"programmatic SEO,\" \"template pages,\" \"pages at scale,\" \"directory pages,\" \"location pages,\" \"[keyword] + [city] pages,\" \"comparison pages,\" \"integration pages,\" \"building many pages for SEO,\" \"pSEO,\" \"generate 100 pages,\" \"data-driven pages,\" or \"templated landing pages.\" Use this whenever someone wants to create many similar pages targeting different keywords or locations. For auditing existing SEO issues, see seo-audit. For content strategy planning, see content-strategy.",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  },
  {
    "id": "referral-program",
    "name": "referral-program",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "\"When the user wants to create, optimize, or analyze a referral program, affiliate program, or word-of-mouth strategy. Also use when the user mentions 'referral,' 'affiliate,' 'ambassador,' 'word of mouth,' 'viral loop,' 'refer a friend,' 'partner program,' 'referral incentive,' 'how to get referrals,' 'customers referring customers,' or 'affiliate payout.' Use this whenever someone wants existing users or partners to bring in new customers. For launch-specific virality, see launch-strategy.\"",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  },
  {
    "id": "revops",
    "name": "revops",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "\"When the user wants help with revenue operations, lead lifecycle management, or marketing-to-sales handoff processes. Also use when the user mentions 'RevOps,' 'revenue operations,' 'lead scoring,' 'lead routing,' 'MQL,' 'SQL,' 'pipeline stages,' 'deal desk,' 'CRM automation,' 'marketing-to-sales handoff,' 'data hygiene,' 'leads aren't getting to sales,' 'pipeline management,' 'lead qualification,' or 'when should marketing hand off to sales.' Use this for anything involving the systems and processes that connect marketing to revenue. For cold outreach emails, see cold-email. For email drip campaigns, see email-sequence. For pricing decisions, see pricing-strategy.\"",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  },
  {
    "id": "sales-enablement",
    "name": "sales-enablement",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "\"When the user wants to create sales collateral, pitch decks, one-pagers, objection handling docs, or demo scripts. Also use when the user mentions 'sales deck,' 'pitch deck,' 'one-pager,' 'leave-behind,' 'objection handling,' 'deal-specific ROI analysis,' 'demo script,' 'talk track,' 'sales playbook,' 'proposal template,' 'buyer persona card,' 'help my sales team,' 'sales materials,' or 'what should I give my sales reps.' Use this for any document or asset that helps a sales team close deals. For competitor comparison pages and battle cards, see competitor-alternatives. For marketing website copy, see copywriting. For cold outreach emails, see cold-email.\"",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  },
  {
    "id": "schema-markup",
    "name": "schema-markup",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "When the user wants to add, fix, or optimize schema markup and structured data on their site. Also use when the user mentions \"schema markup,\" \"structured data,\" \"JSON-LD,\" \"rich snippets,\" \"schema.org,\" \"FAQ schema,\" \"product schema,\" \"review schema,\" \"breadcrumb schema,\" \"Google rich results,\" \"knowledge panel,\" \"star ratings in search,\" or \"add structured data.\" Use this whenever someone wants their pages to show enhanced results in Google. For broader SEO issues, see seo-audit. For AI search optimization, see ai-seo.",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  },
  {
    "id": "seo-audit",
    "name": "seo-audit",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "When the user wants to audit, review, or diagnose SEO issues on their site. Also use when the user mentions \"SEO audit,\" \"technical SEO,\" \"why am I not ranking,\" \"SEO issues,\" \"on-page SEO,\" \"meta tags review,\" \"SEO health check,\" \"my traffic dropped,\" \"lost rankings,\" \"not showing up in Google,\" \"site isn't ranking,\" \"Google update hit me,\" \"page speed,\" \"core web vitals,\" \"crawl errors,\" or \"indexing issues.\" Use this even if the user just says something vague like \"my SEO is bad\" or \"help with SEO\" \u2014 start with an audit. For building pages at scale to target keywords, see programmatic-seo. For adding structured data, see schema-markup. For AI search optimization, see ai-seo.",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  },
  {
    "id": "signup-flow-cro",
    "name": "signup-flow-cro",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "When the user wants to optimize signup, registration, account creation, or trial activation flows. Also use when the user mentions \"signup conversions,\" \"registration friction,\" \"signup form optimization,\" \"free trial signup,\" \"reduce signup dropoff,\" \"account creation flow,\" \"people aren't signing up,\" \"signup abandonment,\" \"trial conversion rate,\" \"nobody completes registration,\" \"too many steps to sign up,\" or \"simplify our signup.\" Use this whenever the user has a signup or registration flow that isn't performing. For post-signup onboarding, see onboarding-cro. For lead capture forms (not account creation), see form-cro.",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  },
  {
    "id": "site-architecture",
    "name": "site-architecture",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "When the user wants to plan, map, or restructure their website's page hierarchy, navigation, URL structure, or internal linking. Also use when the user mentions \"sitemap,\" \"site map,\" \"visual sitemap,\" \"site structure,\" \"page hierarchy,\" \"information architecture,\" \"IA,\" \"navigation design,\" \"URL structure,\" \"breadcrumbs,\" \"internal linking strategy,\" \"website planning,\" \"what pages do I need,\" \"how should I organize my site,\" or \"site navigation.\" Use this whenever someone is planning what pages a website should have and how they connect. NOT for XML sitemaps (that's technical SEO \u2014 see seo-audit). For SEO audits, see seo-audit. For structured data, see schema-markup.",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  },
  {
    "id": "social-content",
    "name": "social-content",
    "emoji": "\ud83d\udcc8",
    "author": "coreyhaines31",
    "description": "\"When the user wants help creating, scheduling, or optimizing social media content for LinkedIn, Twitter/X, Instagram, TikTok, Facebook, or other platforms. Also use when the user mentions 'LinkedIn post,' 'Twitter thread,' 'social media,' 'content calendar,' 'social scheduling,' 'engagement,' 'viral content,' 'what should I post,' 'repurpose this content,' 'tweet ideas,' 'LinkedIn carousel,' 'social media strategy,' or 'grow my following.' Use this for any social media content creation, repurposing, or scheduling task. For broader content strategy, see content-strategy.\"",
    "tags": [
      "marketing"
    ],
    "security": "safe",
    "platform": "any",
    "source": "adapted",
    "category": "Marketing",
    "config": null
  }
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

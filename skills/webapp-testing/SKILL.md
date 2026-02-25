---
name: webapp-testing
description: Test web applications using Playwright — verify UI, capture screenshots, and report bugs with reproducible steps.
user-invocable: true
metadata: { "openclaw": { "emoji": "🧪", "requires": { "bins": ["npx"] } } }
---

# Webapp Testing

Automated web application testing with Playwright. Adapted from [awesome-claude-skills/webapp-testing](https://github.com/ComposioHQ/awesome-claude-skills).

## Usage

```
/test-webapp <url-or-localhost-port>
```

## Instructions

When the user asks to test a web application:

### Step 1: Access the Application

- Open the URL in the browser tool
- Take an initial screenshot
- Identify the main UI components and navigation

### Step 2: Test Plan

Propose a test checklist:

- [ ] Page loads without console errors
- [ ] Navigation links work
- [ ] Forms submit correctly
- [ ] Responsive layout (desktop/mobile)
- [ ] Interactive elements respond (buttons, dropdowns)
- [ ] Error states handled (invalid input, 404)

### Step 3: Execute Tests

For each test:

1. Describe what you're testing
2. Perform the action (click, type, navigate)
3. Capture a screenshot of the result
4. Log: ✅ PASS or ❌ FAIL with details

### Step 4: Report

```
## Test Report: {App Name}

**URL:** {url}
**Date:** {date}
**Result:** {X}/{Y} tests passed

### ❌ Failures
1. **Test name** — Expected: X, Got: Y
   - Screenshot: [attached]
   - Steps to reproduce: ...

### ✅ Passes
1. Test name — verified
```

### Rules

- **Always capture screenshots** for failures
- **Test on both narrow (375px) and wide (1440px) viewports** if responsive
- **Check the browser console** for JS errors
- **Report performance** — note if any page takes >3s to load

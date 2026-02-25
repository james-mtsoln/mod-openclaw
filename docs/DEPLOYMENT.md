# Deployment & Hosting

mod-openclaw has two deployment concerns:

1. **Skills + prompts** → installed locally into OpenClaw workspace (not "deployed")
2. **Onboarding wizard** → a static site that can be hosted anywhere

---

## Hosting the Onboarding Wizard

The wizard is pure HTML/CSS/JS — no build step, no server, no dependencies.

### Option 1: GitHub Pages (Recommended)

Free, zero config, automatic deploys on push.

```bash
# In your repo settings:
# Settings → Pages → Source: "Deploy from a branch"
# Branch: main, Folder: /onboarding
```

Your wizard will be live at:

```
https://<username>.github.io/mod-openclaw/onboarding/
```

**Or use a custom domain:**

1. Add a `CNAME` file in `/onboarding/` with your domain
2. Configure DNS: CNAME → `<username>.github.io`

### Option 2: Cloudflare Pages

Fastest global CDN, free tier.

```bash
# Connect GitHub repo in Cloudflare dashboard
# Build command: (leave empty — no build needed)
# Build output directory: onboarding
```

### Option 3: Any Static Host

The wizard is 3 files — it works anywhere:

```bash
# Netlify
netlify deploy --dir=onboarding --prod

# Vercel
cd onboarding && vercel --prod

# AWS S3
aws s3 sync onboarding/ s3://your-bucket/ --delete

# Even Python's built-in server for local sharing
cd onboarding && python3 -m http.server 8080
```

### Option 4: Local Only

```bash
open onboarding/index.html    # Works directly from filesystem
```

The wizard generates ZIP packages entirely client-side — no server upload needed.

---

## Installing Skills (Local)

Skills are not "deployed" — they're installed into a local OpenClaw instance.

### Via Install Script

```bash
./install.sh
```

### Via Direct Config

```jsonc
// ~/.openclaw/openclaw.json
{
  "skills": {
    "load": {
      "extraDirs": ["/path/to/mod-openclaw/skills"],
    },
  },
}
```

### Via Onboarding Wizard ZIP

1. Open the wizard (local or hosted)
2. Select skills → configure → download ZIP
3. Extract to `~/.openclaw/workspace/`

---

## Environment Variables

| Variable             | Default                    | Description                  |
| -------------------- | -------------------------- | ---------------------------- |
| `OPENCLAW_HOME`      | `~/.openclaw`              | OpenClaw home directory      |
| `OPENCLAW_WORKSPACE` | `$OPENCLAW_HOME/workspace` | Skills and prompts directory |

---
name: resume-tailor
description: Analyze job descriptions and generate tailored resumes that highlight relevant skills and experience.
user-invocable: true
metadata: { "openclaw": { "emoji": "📄" } }
---

# Resume Tailor

Job-specific resume generator. Adapted from [awesome-claude-skills/tailored-resume-generator](https://github.com/ComposioHQ/awesome-claude-skills).

## Usage

```
/resume <job-posting-url-or-paste>
```

## Instructions

### Step 1: Gather Inputs

- **Job description**: from URL or pasted text
- **User's resume/CV**: ask user to provide their current resume file or paste it
- If no resume available, ask for: name, experience, skills, education

### Step 2: Analyze the Job

Extract from the job description:

- **Must-have skills** (mentioned in requirements)
- **Nice-to-have skills** (mentioned as preferred)
- **Keywords** (terms repeated multiple times)
- **Company culture signals** (team-oriented, fast-paced, etc.)
- **Seniority level** indicators

### Step 3: Tailor the Resume

- **Reorder experience** — put most relevant roles first
- **Rewrite bullets** — mirror the job description's language and keywords
- **Highlight matching skills** — surface them prominently
- **Quantify achievements** — add metrics wherever possible (%, $, time saved)
- **Trim irrelevant experience** — condense or omit unrelated roles

### Step 4: Output

Provide the tailored resume in both:

1. **Clean markdown** (for review)
2. **Plain text** (for ATS-friendly pasting)

### Rules

- **Never fabricate experience** — only reframe existing achievements
- **Keep it to 1-2 pages** — respect the reader's time
- **Match the tone** — formal for enterprise, punchy for startups
- **Include a "match score"** — % of required skills the user covers

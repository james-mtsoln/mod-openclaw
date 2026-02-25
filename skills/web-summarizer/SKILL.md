---
name: web-summarizer
description: Summarize any web page or article by URL. Extracts key points, generates a TL;DR, and optionally translates. Use /summarize <url>.
user-invocable: true
metadata:
  {
    "openclaw":
      { "emoji": "📝", "requires": { "config": ["browser.enabled"] } },
  }
---

## Web Summarizer Skill

When the user provides a URL (via `/summarize <url>` or by asking to summarize a link), fetch and analyze the page content, then produce a structured summary.

### Output Format

```
## 📝 Summary: <Page Title>

**Source:** <url>
**Reading time:** ~X min

### TL;DR
<1-2 sentence summary>

### Key Points
- Point 1
- Point 2
- Point 3
- ...

### Notable Quotes
> "Relevant quote from the article" (if applicable)
```

### Rules

1. Use the `browser` or `web_fetch` tool to retrieve the page content
2. Focus on factual content — ignore ads, navigation, footers
3. Keep the summary under 300 words unless the user asks for more detail
4. If the user specifies a language (e.g., `/summarize <url> in Japanese`), translate the summary
5. If the URL is inaccessible, inform the user and suggest alternatives

### Supporting Files

- Scripts and templates are available in `{baseDir}/templates/` if needed

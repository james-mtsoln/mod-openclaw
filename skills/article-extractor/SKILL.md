---
name: article-extractor
description: Extract full article text and metadata from any web page — clean, readable text without ads or navigation.
user-invocable: true
metadata: { "openclaw": { "emoji": "📰" } }
---

# Article Extractor

Clean article extraction from web pages. Adapted from [tapestry-skills](https://github.com/michalparkola/tapestry-skills-for-claude-code).

## Usage

```
/extract <url>
```

## Instructions

When the user provides a URL:

1. **Fetch the page** using the browser tool
2. **Extract** the following:
   - **Title**
   - **Author** (if available)
   - **Publication date**
   - **Reading time** (estimate at 200 wpm)
   - **Full article text** — cleaned of:
     - Navigation menus, headers, footers
     - Ads, popups, cookie banners
     - Related article links, sidebars
     - Social share buttons
   - **Key images** (with alt text if present)

3. **Output format**:

   ```markdown
   # {Title}

   _By {Author} · {Date} · {X} min read_

   {Clean article text with preserved headings and structure}

   ---

   Source: [{domain}]({url})
   ```

4. **Optional**: If user requests, also provide:
   - TL;DR summary (3-5 sentences)
   - Key quotes extracted
   - Translation to another language
   - Saved to a local file

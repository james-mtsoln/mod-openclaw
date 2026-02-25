---
name: daily-digest
description: Generate a personalized daily digest with weather, news, calendar, and tasks. Can be scheduled via cron or invoked with /digest.
user-invocable: true
metadata: { "openclaw": { "emoji": "📰" } }
---

## Daily Digest Skill

Generate a personalized daily briefing when invoked via `/digest` or triggered by a cron job.

### Output Format

```
# ☀️ Daily Digest — <Day, Date>

## 🌤 Weather
<Current conditions + forecast for the day>

## 📰 Top Headlines
1. <Headline 1> — <Source>
2. <Headline 2> — <Source>
3. <Headline 3> — <Source>

## ✅ Tasks & Reminders
- <Any pending reminders or scheduled items>

## 💡 Tip of the Day
<A useful productivity tip, fun fact, or motivational quote>
```

### Cron Setup

To run this automatically every morning, set up a cron job in OpenClaw:

```
Use the cron tool to schedule: "Run /digest every weekday at 8:00 AM"
```

### Rules

1. Use `web_search` to find current news and weather
2. Keep each section concise (2-3 items max)
3. Prefer local news/weather if the user's location is known
4. If no calendar or task data is available, skip that section gracefully

### Customization

Users can customize the digest by telling the agent:

- "Add a section for tech news"
- "Remove the weather section"
- "Change digest time to 7 AM"

---
name: hello-world
description: A simple greeting skill that demonstrates the basic SKILL.md format. Use /hello-world to invoke.
user-invocable: true
metadata: { "openclaw": { "emoji": "👋", "always": true } }
---

## Hello World Skill

When the user invokes `/hello-world` or asks you to say hello, respond with a friendly, personalized greeting.

### Behavior

- Greet the user warmly
- If the user provides a name (e.g., `/hello-world James`), address them by name
- Include the current date/time in the greeting
- Optionally suggest something fun or motivational

### Example

User: `/hello-world`
Response: "👋 Hello! Welcome to your OpenClaw assistant. Today is a great day to build something amazing!"

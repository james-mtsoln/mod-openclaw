---
name: software-arch
description: Apply Clean Architecture, SOLID, DDD, and design patterns. Use when designing systems, reviewing architecture, or making structural decisions.
metadata: { "openclaw": { "emoji": "🏗️" } }
---

# Software Architecture

Architecture patterns and best practices advisor. Adapted from [context-engineering-kit](https://github.com/NeoLabHQ/context-engineering-kit).

## Instructions

When the user asks about architecture or design decisions, apply these frameworks:

### Clean Architecture Layers

```
Entities (domain) → Use Cases (application) → Controllers/Gateways (interface) → Frameworks (infrastructure)
```

- Dependencies point inward — outer layers depend on inner, never the reverse
- Domain entities never import framework code

### SOLID Principles

- **S**ingle Responsibility — one reason to change per module
- **O**pen/Closed — extend behavior without modifying existing code
- **L**iskov Substitution — subtypes must be interchangeable with base types
- **I**nterface Segregation — many specific interfaces > one fat interface
- **D**ependency Inversion — depend on abstractions, not concretions

### Domain-Driven Design

- Identify bounded contexts and aggregate roots
- Use ubiquitous language from the domain
- Separate domain logic from infrastructure concerns
- Event-driven communication between bounded contexts

### When Reviewing Architecture

1. **Draw the dependency graph** — are there cycles? Do dependencies point the right way?
2. **Check coupling** — can you change one module without ripple effects?
3. **Assess testability** — can each layer be tested in isolation?
4. **Evaluate scalability** — what breaks at 10x load? 100x?
5. **Identify the hard parts** — where are the distributed systems challenges (consistency, availability, partition tolerance)?

### Output Format

When proposing architecture, always include:

- Component diagram (text-based or mermaid)
- Data flow description
- Key trade-offs and why they were made
- Alternative approaches considered

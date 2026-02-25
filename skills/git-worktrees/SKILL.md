---
name: git-worktrees
description: Create isolated git worktrees for parallel development — work on multiple branches simultaneously without stashing.
user-invocable: true
metadata: { "openclaw": { "emoji": "🌳" } }
---

# Git Worktrees

Parallel branch development with git worktrees. Adapted from [obra/superpowers](https://github.com/obra/superpowers).

## Usage

```
/worktree <branch-name> [base-branch]
```

## Instructions

### What Are Worktrees?

Git worktrees let you check out multiple branches in separate directories simultaneously. No more stashing, no more context switching headaches.

### Creating a Worktree

```bash
# Create from current branch
git worktree add ../project-{branch-name} -b {branch-name}

# Create from a specific base
git worktree add ../project-{branch-name} -b {branch-name} origin/main
```

**Directory naming convention**: `../{repo-name}-{branch-name}`
This keeps worktrees as siblings of the main repo.

### Listing Worktrees

```bash
git worktree list
```

### Removing a Worktree

```bash
# When done with the branch
git worktree remove ../project-{branch-name}
# Force remove if there are changes
git worktree remove --force ../project-{branch-name}
```

### Workflow

1. **Create worktree** for the new feature/fix
2. **Work in the new directory** — it has its own working tree and index
3. **Commit and push** from the worktree directory
4. **Create PR** from the worktree branch
5. **Clean up** — remove worktree after merge

### Safety Checks

Before creating a worktree:

- Verify branch name doesn't already exist: `git branch --list {name}`
- Verify worktree doesn't already exist: `git worktree list | grep {name}`
- Verify target directory doesn't exist: `ls ../project-{name} 2>/dev/null`

### Rules

- **Never create worktrees inside the repo** — always use `../` parent directory
- **Don't checkout a branch that's already checked out** — git prevents this
- **Clean up after merge** — stale worktrees waste disk space

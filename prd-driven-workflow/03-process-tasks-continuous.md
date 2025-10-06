---
description: Process and manage task lists for PRD implementation (Continuous Mode)
globs:
  - "**/tasks/tasks-*.md"
  - "**/tasks-*.md"
alwaysApply: false
---
# Task List Management (Continuous Implementation Mode)

Guidelines for managing task lists in markdown files to track progress on completing a PRD with continuous, uninterrupted implementation.

## Task Implementation (Continuous Mode)

- **Continuous execution:** Implement sub-tasks continuously without waiting for permission between each sub-task
- **Work through task list sequentially:** Process sub-tasks in order from top to bottom
- **Pause only for major decisions:** Only stop to ask the user if you encounter:
  - Ambiguity requiring design decisions
  - Multiple valid implementation approaches where user input is needed
  - Breaking changes or architectural decisions
  - Missing information that cannot be reasonably inferred from the PRD
- **Keep user informed:** Provide periodic progress updates every 3-5 sub-tasks completed

## Completion Protocol

### After Each Sub-Task:
1. **Mark completed:** Change `[ ]` to `[x]` in the task list file
2. **Continue immediately** to the next sub-task (no permission needed)

### After Completing All Sub-Tasks Under a Parent Task:

Follow this sequence before moving to the next parent task:

1. **Run Tests:**
   - Execute the full test suite (`npm test`, `pytest`, `bin/rails test`, etc.)
   - If tests fail, fix issues before proceeding
   - For V1 without tests yet, run manual verification checks

2. **Clean Up:**
   - Remove any temporary files created during development
   - Remove any debug code, console.logs, or commented-out code
   - Remove any TODO comments that have been addressed
   - Ensure code follows project linting rules

3. **Stage Changes:**
   - `git add .` (stage all changes for the parent task)

4. **Commit:**
   - Use a descriptive commit message following this format:
   
   ```bash
   git commit -m "feat: [parent task summary]" \
              -m "[Key change 1]" \
              -m "[Key change 2]" \
              -m "[Key change 3]" \
              -m "Completed: Task [X.0] - [Parent Task Name]" \
              -m "PRD: [PRD number and name]"
   ```

   **Example:**
   ```bash
   git commit -m "feat(landing): complete project setup and infrastructure" \
              -m "- Initialize Next.js 14 with TypeScript and Tailwind CSS" \
              -m "- Configure Thai-friendly fonts (Sarabun, Prompt, Kanit)" \
              -m "- Set up project folder structure and TypeScript types" \
              -m "- Create environment variables template" \
              -m "Completed: Task 1.0 - Project Setup & Infrastructure" \
              -m "PRD: 0000-prd-landing-page.md"
   ```

   **Commit Message Guidelines:**
   - Use conventional commit format: `feat:`, `fix:`, `refactor:`, `style:`, `test:`, `docs:`, `chore:`
   - Add scope in parentheses if helpful: `feat(landing):`, `fix(auth):`, `style(dashboard):`
   - First line: Clear summary of what was accomplished
   - Subsequent lines: Bullet points of key changes (use `-` prefix)
   - Always include task number and PRD reference
   - Format as single command using multiple `-m` flags

5. **Mark Parent Task Complete:**
   - Change parent task `[ ]` to `[x]` in the task list file

6. **Provide Progress Update:**
   - Report completion to user with summary
   - Show what was accomplished
   - Indicate what's next

7. **Continue:**
   - Move immediately to the next parent task (no permission needed)

## When to Pause and Ask for Input

**DO pause and ask the user if you encounter:**

❓ **Design Decisions:**
- Multiple valid UI/UX approaches and PRD doesn't specify
- Color scheme choices beyond what PRD specifies
- Layout decisions not covered in PRD

❓ **Technical Decisions:**
- Choice between multiple libraries/frameworks not specified in PRD
- Architectural patterns requiring strategic decision
- Performance trade-offs requiring business input

❓ **Missing Information:**
- Required data not in PRD and cannot be reasonably assumed
- External dependencies not documented
- API endpoints or credentials needed

❓ **Scope Clarification:**
- Uncertain if a feature should be implemented now or deferred
- Edge cases not covered in PRD that affect user experience
- Potential breaking changes to existing functionality

**DO NOT pause for:**
- ✅ Standard implementation decisions within clear PRD requirements
- ✅ Code organization and file structure (follow best practices)
- ✅ Variable naming and function signatures
- ✅ Minor styling choices within design system
- ✅ Error handling patterns
- ✅ Standard testing approaches

## Task List Maintenance

### Continuous Updates:
1. **Update task list file after each sub-task completion:**
   - Mark completed sub-tasks `[x]`
   - Add any newly discovered sub-tasks under appropriate parent task
   - Update task descriptions if implementation reveals better understanding

2. **Maintain "Relevant Files" section:**
   - Add new files as they're created
   - Update descriptions as files evolve
   - Remove files that are deleted or consolidated

3. **Track blockers and issues:**
   - If you encounter a blocker, add a note in the task list
   - If a sub-task cannot be completed, mark it `[?]` and add explanation

### Progress Reporting:

Provide updates to the user at these intervals:
- ✅ After completing each parent task (Task 1.0, 2.0, etc.)
- ✅ Every 5-10 sub-tasks if working within a large parent task
- ✅ When encountering decisions that need user input
- ✅ When significant milestones are reached (e.g., "Hero section now functional")

**Update Format:**
```
✅ Completed: Task X.Y - [Sub-task name]
📊 Progress: [X] of [Y] sub-tasks complete in Task X.0
🚀 Next: Task X.Z - [Next sub-task name]
```

## AI Instructions

When working with task lists in continuous mode, the AI must:

1. **Work continuously** through sub-tasks without stopping for permission
2. **Update task list** after completing each sub-task (mark `[x]`)
3. **Follow completion protocol** when all sub-tasks under a parent are complete:
   - Run tests
   - Clean up code
   - Stage changes
   - Commit with descriptive message
   - Mark parent task complete
4. **Provide progress updates** after each parent task completion
5. **Only pause** when encountering ambiguity, design decisions, or missing information
6. **Maintain momentum** - keep coding until parent task is complete or blocker is hit
7. **Keep "Relevant Files" section** accurate and up-to-date
8. **Add newly discovered tasks** as needed under appropriate parent task
9. **Prioritize completion** - aim to finish entire parent tasks before stopping

## Benefits of Continuous Mode

✅ **Faster Development:** No context switching between tasks  
✅ **Better Flow:** Maintain focus and momentum  
✅ **Efficient Progress:** Complete logical units of work (parent tasks) in one go  
✅ **Cleaner Commits:** One commit per parent task with all related changes  
✅ **Less Interruption:** User can review completed parent tasks rather than individual sub-tasks  

## Example Workflow

```
Start: Task 1.0 - Project Setup & Infrastructure

→ 1.1 Initialize Next.js ✅
→ 1.2 Install dependencies ✅
→ 1.3 Configure Tailwind ✅
→ 1.4 Set up fonts ✅
→ 1.5 Configure Next.js ✅
→ 1.6 Create .env.local.example ✅
→ 1.7 Set up folder structure ✅
→ 1.8 Configure ESLint ✅
→ 1.9 Create TypeScript types ✅
→ 1.10 Update README ✅

All sub-tasks complete → Run tests → Clean up → Commit

✅ Task 1.0 Complete!

📊 Progress Update to User:
---
Completed: Task 1.0 - Project Setup & Infrastructure
- Next.js 14 initialized with TypeScript
- Tailwind CSS configured with custom theme
- Thai fonts (Sarabun, Prompt, Kanit) set up
- Project structure created
- Ready to implement Hero section

Next: Task 2.0 - Hero Section Implementation
---

Continue → Start Task 2.1 immediately
```

## Task Completion Checklist

Before marking a parent task as complete, verify:

- [ ] All sub-tasks marked `[x]`
- [ ] Tests pass (or manual verification complete)
- [ ] No temporary files remaining
- [ ] No debug code or console.logs
- [ ] Code follows linting rules (no errors)
- [ ] Changes staged with `git add`
- [ ] Descriptive commit created
- [ ] "Relevant Files" section updated
- [ ] Parent task marked `[x]`
- [ ] Progress update provided to user

---

**This continuous mode is designed for clear, well-defined PRDs where implementation decisions are straightforward. For complex features with many unknowns, consider using the standard `03-process-tasks.md` workflow instead.**


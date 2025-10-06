# PRD-Driven Development Workflow Cursor Rules

## Introduction

An execution-focused workflow that turns ideas into shipped features. It helps teams author high-quality PRDs, generate code-aware task plans, and drive disciplined delivery with testing and clean commits—optimized for clarity and traceability end-to-end.

## What This Workflow Does

A systematic workflow that transforms user requirements into working features through structured planning and execution. Starting from an initial idea or request, this workflow helps you create comprehensive PRDs, break them down into manageable tasks, and guide implementation step-by-step - ideal for feature development where clear documentation and systematic execution are essential.

## Workflow at a Glance

```
Step 1: Create PRD → Step 2: Generate Tasks → Step 3: Process Tasks
  (01-create-prd.mdc)  (02-generate-tasks.mdc)  (03-process-tasks.mdc)
         ↓                      ↓                       ↓
    PRD Document          Task Hierarchy          Working Feature
```

Each step maps directly to a Cursor rule file as shown below.

## File Mapping

| Step | File | Purpose |
|------|------|---------|
| **1** | `01-create-prd.mdc` | Transform requirements into comprehensive PRD |
| **2** | `02-generate-tasks.mdc` | Break down PRD into actionable task hierarchy |
| **3** | `03-process-tasks.mdc` | Execute tasks systematically with testing |

## When to Use This Workflow

✅ **Use this workflow when:**
- Building new features from user requirements
- Need clear documentation before implementation
- Working with junior developers who need detailed guidance
- Want systematic task breakdown and tracking
- Require traceable development from idea to implementation

❌ **Consider other workflows when:**
- Designing system architecture (→ Architecture Workflow)
- Reviewing existing code (→ Review-Driven Workflow)
- Refactoring without new features (→ Refactoring Workflow)
- Only need test coverage (→ Test Generation Workflow)

## Overview

The PRD-driven workflow establishes a systematic approach to feature development, starting from initial requirements gathering through to complete implementation. It emphasizes clarity, thoroughness, and maintainability while ensuring junior developers can successfully execute complex features.

## Workflow Structure

The PRD-driven workflow consists of three sequential phases that guide you through the complete feature development lifecycle:

### 1. `01-create-prd.mdc` - Product Requirements Document Creation
**Purpose**: Transform user requests into comprehensive PRDs with clear requirements  
**Trigger**: Manual invocation when starting a new feature  
**Output**: `prd-[FEATURE_NAME].md` in `/tasks/` directory

**What it does:**
- Conducts interactive requirements gathering through clarifying questions
- Generates structured PRD with goals, user stories, and functional requirements
- Defines success metrics and non-goals for scope management
- Validates requirements completeness and clarity for junior developers
- Creates actionable documentation suitable for implementation

**Key Features:**
- Interactive clarification process with numbered/lettered options
- Comprehensive validation and quality gates
- Error handling for ambiguous or conflicting requirements
- Progress tracking through PRD sections

### 2. `02-generate-tasks.mdc` - Task List Generation
**Purpose**: Break down PRDs into hierarchical, actionable development tasks  
**Trigger**: After PRD completion or manual invocation  
**Output**: `tasks-prd-[FEATURE_NAME].md` in `/tasks/` directory

**What it does:**
- Analyzes PRD requirements and existing codebase structure
- Generates high-level parent tasks (Phase 1)
- Waits for user confirmation before proceeding
- Creates detailed sub-tasks for implementation (Phase 2)
- Maps tasks to relevant files and dependencies

**Key Features:**
- Two-phase generation with user checkpoint
- Codebase-aware task creation
- Hierarchical task numbering (1.0, 1.1, 1.2)
- File mapping and dependency identification
- Quality validation against PRD requirements

### 3. `03-process-tasks.mdc` - Task Execution Management
**Purpose**: Guide systematic implementation with progress tracking and quality control  
**Trigger**: Auto-attached to task list files (`tasks-*.md`)  
**Output**: Completed features with proper commits and documentation

**What it does:**
- Enforces one-sub-task-at-a-time implementation discipline
- Manages task completion with testing requirements
- Handles git workflow with conventional commits
- Maintains accurate progress tracking
- Ensures quality gates at each completion level

**Key Features:**
- Systematic sub-task execution with user approval gates
- Automated test execution before parent task completion
- Clean commit protocol with descriptive messages
- Real-time task list maintenance
- Comprehensive error handling and recovery

## Usage Examples

### Complete Feature Development
```bash
# 1. Create PRD from initial requirements
@prd-driven-workflow/01-create-prd
# Answer clarifying questions interactively
# PRD saved as /tasks/prd-user-authentication.md

# 2. Generate implementation tasks
@prd-driven-workflow/02-generate-tasks
# Review parent tasks, respond "Go" to continue
# Tasks saved as /tasks/tasks-prd-user-authentication.md

# 3. Execute implementation (auto-attached to task files)
# Work through tasks systematically with approval gates
```

### Quick PRD Creation
```bash
# For well-defined features with clear requirements
@prd-driven-workflow/01-create-prd
# Provide comprehensive initial description
# Answer minimal clarifying questions
```

### Task Regeneration
```bash
# When PRD is updated or requirements change
@prd-driven-workflow/02-generate-tasks
# Point to updated PRD file
# Generate new task list with current codebase awareness
```

## Configuration

The workflow is configured through MDC front matter in each rule file:

- **`alwaysApply: false`** - Rules are invoked manually or via triggers
- **`globs`** - Pattern matching for automatic rule attachment
- **Placeholders** - Use `[FEATURE_NAME]`, `[PRD_NAME]`, etc. for consistency

## Integration Points

### With Other Workflows
- **Architecture Design**: For features requiring architectural changes
- **Test Generation**: Create comprehensive test suites from PRDs
- **Review-Driven**: Validate implementation against PRD requirements
- **Refactoring**: Identify technical debt during implementation

### With Development Tools
- **Version Control**: Git integration for commits and branches
- **Testing Frameworks**: Automatic test execution (pytest, jest, etc.)
- **Documentation**: Maintains `/tasks/` directory structure
- **CI/CD**: Compatible with standard development pipelines

## Best Practices

### PRD Creation
1. Be thorough with clarifying questions - better requirements save implementation time
2. Include specific acceptance criteria for each requirement
3. Define clear success metrics that are measurable
4. Document non-goals to prevent scope creep
5. Consider edge cases and error conditions upfront

### Task Generation
1. Review existing codebase before generating tasks
2. Ensure tasks follow logical implementation order
3. Include testing tasks alongside feature tasks
4. Keep sub-tasks small enough for single work sessions
5. Map dependencies between tasks clearly

### Task Execution
1. Complete one sub-task fully before moving to the next
2. Run tests after each parent task completion
3. Maintain clean commits with descriptive messages
4. Update task lists immediately upon completion
5. Document any discovered tasks or blockers

## Quality Standards

### PRD Quality Gates
- All sections populated with meaningful content
- User stories follow proper format
- Requirements are numbered and unambiguous
- Success metrics are measurable
- Non-goals explicitly documented

### Task Quality Gates
- All PRD requirements mapped to tasks
- Tasks numbered hierarchically
- Each task is actionable and specific
- Test tasks included where applicable
- Dependencies clearly identified

### Implementation Quality Gates
- Sub-task implementation complete
- Unit tests written and passing
- Code follows project conventions
- No linting errors or warnings
- Documentation updated as needed

## Troubleshooting

### Common Issues and Solutions

**Issue**: PRD lacks sufficient detail for implementation  
**Solution**: Re-run clarifying questions phase, focusing on gaps

**Issue**: Generated tasks don't match codebase patterns  
**Solution**: Ensure codebase analysis completes before task generation

**Issue**: Tests fail during parent task completion  
**Solution**: Fix issues before marking complete, don't skip test phase

**Issue**: Task list becomes outdated during implementation  
**Solution**: Add newly discovered tasks, maintain accurate status

**Issue**: Commits fail due to pre-commit hooks  
**Solution**: Fix issues, retry commit with hook-compliant code

## Performance Metrics

Track workflow effectiveness with these metrics:

### PRD Metrics
- Time from request to completed PRD
- Number of clarification rounds needed
- PRD revision count after implementation
- Requirement clarity score (team feedback)

### Task Metrics
- Task estimation accuracy
- Percentage of discovered vs planned tasks
- Task completion velocity
- Rework rate per task

### Quality Metrics
- Test coverage percentage
- Defect density per feature
- Time to production deployment
- Post-deployment issue rate

## Comparison with Other Workflows

| Aspect | PRD-Driven | Architecture-Design | Test-Generation | Review-Driven |
|--------|------------|-------------------|-----------------|---------------|
| **Focus** | Requirements → Implementation | System design | Quality assurance | Code review |
| **Starting Point** | User request | Technical needs | Existing code | Complete code |
| **Primary Output** | Working features | Design documents | Test suites | Review reports |
| **Best For** | New features | Complex systems | Quality improvement | Code validation |
| **Team Level** | All levels | Senior/Architect | QA/Dev | All levels |

## Future Enhancements

### Planned Improvements
- AI-powered requirement validation
- Automatic dependency resolution
- Smart task estimation
- Integration with project management tools
- Multi-language PRD support

### Community Contributions
We welcome contributions to improve the PRD-driven workflow:
- Enhanced clarifying question templates
- Industry-specific PRD formats
- Task generation optimizations
- Integration examples
- Success story documentation

## Support and Resources

### Documentation
- Cursor Rules Documentation: https://docs.cursor.com/en/context/rules
- Workflow Examples: `/tasks/` directory samples
- Best Practices Guide: See above sections

### Getting Help
- Review existing PRDs for examples
- Check task lists for patterns
- Consult team for clarifications
- Submit issues for workflow improvements

## License

This workflow is part of the AI Developer Workflows collection and follows the same licensing terms as the parent repository.
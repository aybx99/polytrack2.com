# Claude Command: Project Planning

## Command: /planner

### Purpose

Execute Stage 1: Foundation & Verification. Read context/PRD.md requirements and create/update context/PLAN.md with a comprehensive project roadmap for approval.

### Execution Flow

## Step 1: Memory Check

First, check if context/PLAN.md exists:

- **If exists:** Read current state, validate against context/PRD.md, and update if needed
- **If not exists:** Proceed with full planning phase

## Step 2: Read Requirements

Analyze context/PRD.md to extract:

1. **Product Overview**
   - Project name and description
   - Target audience and goals
   - Core value proposition

2. **Technical Requirements**
   - Tech stack specifications
   - CMS/Backend integration details
   - Third-party services
   - Performance budgets

3. **Features & Functionality**
   - Core features list
   - User flows and journeys
   - Content types and structures
   - SEO requirements

4. **Design & UX**
   - Information architecture
   - Component requirements
   - Responsive breakpoints
   - Accessibility standards

5. **Deployment & Operations**
   - Hosting requirements
   - Environment variables
   - CI/CD needs
   - Monitoring and analytics

## Step 3: Create Module Roadmap

Break down the project into logical, implementable modules based on PRD requirements:

### Module Categories Examples

**Foundation**

- Project scaffolding and setup
- Design system and configuration
- i18n infrastructure (if needed)

**Core**

- Data integration and API setup
- SEO foundation and meta system
- Layout and navigation system

**Pages**

- Homepage implementation
- Dynamic pages per PRD
- Forms and interactions

**Enhancement**

- Performance optimization
- Analytics and monitoring
- Testing and documentation

### Module Structure Template

Each module should include:

- Clear name and purpose
- Priority level (High/Medium/Low)
- Dependencies on other modules
- Estimated duration
- 3-10 specific acceptance criteria

The exact modules will depend on PRD requirements. Aim for modules that can each be completed in 30-90 minutes.

## Step 4: Create context/PLAN.md

Generate comprehensive context/PLAN.md with this structure:

```markdown
# Project Plan & Progress Tracker

## Project Metadata

- **Project:** [Name from PRD]
- **Description:** [Brief description]
- **Created:** [Current date]
- **Last Updated:** [Current timestamp]
- **Current Status:** Planning Phase
- **Agent Version:** PerfectSeoSiteBuilder v2.0

## Technical Specifications

- **Framework:** Next.js [version] with TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **CMS:** [From PRD]
- **Deployment:** [From PRD]
- **Performance Budget:**
  - LCP: < 2.5s
  - CLS: < 0.1
  - INP: < 200ms

## Product Roadmap

### Module 1: Project Scaffolding

- **Status:** [ ] pending
- **Priority:** High
- **Dependencies:** None
- **Estimated Duration:** 30 minutes
- **Started:** --
- **Completed:** --
- **Acceptance Criteria:**
  - [ ] Next.js app created with TypeScript
  - [ ] Folder structure established
  - [ ] ESLint and Prettier configured
  - [ ] Git repository initialized
  - [ ] Environment variables setup
  - [ ] README.md created

### Module 2: Design System

- **Status:** [ ] pending
- **Priority:** High
- **Dependencies:** Module 1
- **Estimated Duration:** 45 minutes
- **Started:** --
- **Completed:** --
- **Acceptance Criteria:**
  - [ ] Tailwind configured with custom theme
  - [ ] Typography system defined
  - [ ] Color palette implemented
  - [ ] Spacing and sizing scales
  - [ ] Base components created

[Continue for all modules...]
```

## Risk Assessment

- **Technical Risks:** [List any identified risks]
- **Mitigation Strategies:** [How to handle risks]

## Change Log

- [Date]: Initial plan created from context/PRD.md

## Issues & Resolutions

[Track any blockers or issues here as they arise]

## Notes

[Any additional context or decisions]

````

## Step 5: Request Approval

Present the roadmap for approval:

> **Planning Phase Complete** ✅
>
> I've analyzed context/PRD.md and created a comprehensive project roadmap with [X] modules.
>
> **Key Highlights:**
> - Total modules: [X]
> - Estimated total duration: [X hours]
> - Priority modules: [List high-priority items]
> - Dependencies mapped and validated
>
> The complete roadmap has been saved to **context/PLAN.md**.
>
> Please review the module breakdown and acceptance criteria.
>
> **Ready to proceed with Module 1: [Name]?**
>
> Type "approved" to begin implementation, or provide feedback for adjustments.

## Step 6: Post-Approval

Once approved:
1. Update context/PLAN.md with approval timestamp
2. Set project status to "Implementation Phase"
3. Prepare to execute Module 1
4. Confirm readiness to proceed

## Error Handling

If context/PRD.md is missing or incomplete:
> ⚠️ **context/PRD.md not found or incomplete**
>
> To create a project plan, I need a Product Requirements Document (context/PRD.md) that includes:
> - Product overview and goals
> - Target audience
> - Feature requirements
> - Technical specifications
> - Design guidelines
>
> Please create context/PRD.md with these details, then run `/planner` again.

If unable to create files:
> ⚠️ **File Creation Error**
>
> Unable to create context/PLAN.md or CHANGELOG.md. Please ensure:
> - Write permissions in the project directory
> - No file locks on existing files
> - Sufficient disk space
>
> Manual creation may be required.

## Usage

```bash
# In Claude Code:
/planner

# Or with specific PRD file:
/planner PRD-v2.md
````

## Notes

- This command is idempotent - can be run multiple times safely
- Updates existing context/PLAN.md without losing progress tracking
- Preserves completed module status when updating
- Automatically detects and flags conflicting requirements
- Provides clear dependency chains for module execution

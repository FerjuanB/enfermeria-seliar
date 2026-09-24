# Feature: Workflow intro and transitions

## Objective
Reduce Cambio de guardia header density by moving workflow context into a shared intro wrapper and add a softer transition between workflow views.

## Problem
The Cambio header currently contains title, description, status, and the three-step progress rail. Control de guardia already establishes a clearer compact-header-plus-intro pattern.

## Why
The user approved a more consistent hierarchy based on the provided mobile screenshots.

## Scope
- Add a reusable intro wrapper below the shared workflow header.
- Move Cambio de guardia status and progress rail into that wrapper.
- Keep Control de guardia's “Pase de guardia” composition aligned with the shared pattern.
- Add a reduced-motion-safe fade transition to workflow shells.

## Constraints
- Preserve form behavior, validation, integrations, and route navigation.
- Do not introduce a backend or change Apps Script contracts.
- TDD mode: disabled. Checks: `npm.cmd run lint` and `npm.cmd run build`.
- Repository check: the workspace is not a usable Git repository, so work-unit commit evidence is blocked.

## Tasks
- [x] WORKFLOW-INTRO-001 Create the reusable intro wrapper and compact header API.
- [x] WORKFLOW-INTRO-002 Move Cambio status/progress into the intro wrapper and align Control.
- [x] WORKFLOW-INTRO-003 Add reduced-motion-safe workflow fade transition.
- [ ] WORKFLOW-INTRO-004 Run focused/full checks and review responsive behavior.

## Acceptance criteria
- Cambio header contains only compact identity and route context.
- Status and three-step progress appear in a bordered intro wrapper below the header.
- Control and Cambio share the same hierarchy and spacing conventions.
- Workflow entry transitions fade smoothly without being the only state indicator and are disabled/reduced when requested.
- Future workflow views can reuse the wrapper and transition through shared primitives.

## Progress
- User explicitly authorized implementation after reviewing screenshots.
- Existing `WorkflowHeader` and `WorkflowShell` primitives are the extension points.
- The header is compact; Cambio status and progress now live in `WorkflowIntro` below it.

## Verification evidence
- `rtk npm.cmd exec -- eslint src/components/WorkflowIntro.tsx src/components/WorkflowHeader.tsx src/components/WorkflowShell.tsx src/routes/control-guardia.tsx src/routes/cambio-guardia.tsx`: passed.
- `rtk npm.cmd run build`: passed for client, SSR, and Nitro output; existing Vite/TanStack warnings remain.
- `WorkflowShell` applies an entry fade with `motion-safe` and disables animation with `motion-reduce`; responsive visual QA remains pending.
- Full lint remains known to fail on two pre-existing Prettier errors in `src/routes/index.tsx`; six Fast Refresh warnings remain.
- No work-unit commit was created because the workspace is not a usable Git repository.

## Next step
- Perform visual QA at mobile and desktop widths and confirm reduced-motion behavior.

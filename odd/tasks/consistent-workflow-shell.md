# Feature: Consistent workflow shell

## Objective
Unify the visual language of workflow headers and outer wrappers across Control de guardia, Cambio de guardia, and future workflow views.

## Problem
Control de guardia uses a sticky operational header while Cambio de guardia uses an independent card header. Their outer wrappers also use different spacing and width conventions, making the workflows feel unrelated.

## Why
The user requested a more consistent visual system that can be reused as future forms are added.

## Scope
- Create a reusable workflow header and outer-shell pattern.
- Migrate Control de guardia and Cambio de guardia without changing their behavior or integrations.
- Preserve route-specific content, statuses, progress indicators, and mobile navigation.
- Keep the shared background and responsive/reduced-motion behavior consistent.

## Constraints
- Do not alter the control-guardia data flow or Apps Script integration.
- Do not change form validation or submission behavior.
- TDD mode: disabled. Checks: `npm.cmd run lint` and `npm.cmd run build`.
- Repository check: the workspace is not a usable Git repository, so work-unit commit evidence is blocked.

## Tasks
- [x] WORKFLOW-SHELL-001 Create reusable workflow header and shell primitives.
- [x] WORKFLOW-SHELL-002 Apply the primitives to Control de guardia and Cambio de guardia.
- [x] WORKFLOW-SHELL-003 Run focused and full lint/build checks.
- [ ] WORKFLOW-SHELL-004 Review mobile, desktop, and reduced-motion consistency.

## Acceptance criteria
- Both workflows use the same header hierarchy, logo treatment, border accent, spacing, and wrapper conventions.
- Future workflow routes can reuse the primitives without copying route-specific header markup.
- Existing form behavior, validation, integrations, and navigation remain unchanged.
- Responsive layout and reduced-motion behavior remain accessible.

## Progress
- User authorized the visual consistency refactor.
- Existing global background token is already shared by all views.
- `WorkflowHeader` and `WorkflowShell` now provide the shared structure for both workflow routes and future views.

## Verification evidence
- `rtk npm.cmd exec -- eslint src/components/WorkflowHeader.tsx src/components/WorkflowShell.tsx src/routes/control-guardia.tsx src/routes/cambio-guardia.tsx`: passed.
- `rtk npm.cmd run lint`: failed only on two pre-existing Prettier errors in `src/routes/index.tsx`; six existing Fast Refresh warnings remain.
- `rtk npm.cmd run build`: passed for client, SSR, and Nitro output; existing deprecation and inlineDynamicImports warnings remain.
- No work-unit commit was created because the workspace is not a usable Git repository.

## Next step
- Review both workflows at mobile and desktop widths and confirm reduced-motion behavior (WORKFLOW-SHELL-004).

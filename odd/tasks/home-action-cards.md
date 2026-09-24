# Feature: Modern Home action cards

## Objective

Give the Home navigation cards a more modern, original, and operationally clear visual language without changing routes or workflow behavior.

## Problem

The available Home workflows currently use nearly identical flat cards with a trailing arrow. The primary action, active management flow, and upcoming workflows do not have enough visual hierarchy.

## Why

The user wants the Home buttons to feel more modern while preserving the existing institutional tone and the current gradient background.

## Scope

- Introduce a reusable navigation card for active workflows.
- Visually distinguish Control de guardia as the primary action and Cambio de guardia as an active management action.
- Improve upcoming workflow cards with a clear disabled/provisional state.
- Preserve all routes, form behavior, email behavior, and accessibility semantics.

## Constraints

- Navigation actions remain semantic links, not buttons.
- Compensatorio and Solicitud de LAO remain non-interactive.
- Keep the existing Home gradient and responsive layout.
- TDD mode: disabled. Checks: focused ESLint, full lint, production build, and structural readback.
- Repository check: the workspace is not a usable Git repository, so work-unit commit evidence is blocked.

## Tasks

- [x] HOME-CARDS-001 Build reusable active workflow navigation card.
- [x] HOME-CARDS-002 Restyle active and upcoming Home workflows with clear hierarchy and status affordances.
- [x] HOME-CARDS-003 Run formatting, lint, build, and structural checks.

## Acceptance criteria

- Control de guardia is visually the strongest Home action.
- Cambio de guardia uses the same component with a distinct management identity.
- Upcoming workflows look unavailable and remain non-clickable.
- Links retain keyboard focus states and existing routes.
- No form, Apps Script, email, or route contract changes.

## Progress

- Task document created before source changes.
- `ActiveWorkflowCard` now provides a shared link treatment with eyebrow, status badge, icon tile, accent rail, directional affordance, hover motion, and keyboard focus state.
- Control de guardia is the primary dark card; Cambio de guardia is the secondary management card.
- Compensatorio and Solicitud de LAO use locked, muted, non-interactive cards in a responsive two-column layout.
- Existing routes and form/email integrations were not changed.

## Verification evidence

- `npx.cmd prettier --write src/routes/index.tsx odd/tasks/home-action-cards.md` — passed.
- `npm.cmd exec eslint -- src/routes/index.tsx` — passed with 0 errors/warnings.
- `npm.cmd run lint` — passed with 0 errors and 6 pre-existing `react-refresh/only-export-components` warnings.
- `npm.cmd run build` — passed. Existing warnings remain for `vite-tsconfig-paths`, deprecated `createServerFn().inputValidator()`, and Nitro `inlineDynamicImports`.
- Structural readback — confirmed active cards remain semantic TanStack links with unchanged routes and focus rings; upcoming cards remain `article[aria-disabled="true"]` without links or click handlers.

## Next step

- Perform manual browser QA for spacing, contrast, and mobile wrapping when a browser session is available. No commit or deployment was performed because the workspace is not a usable Git repository.

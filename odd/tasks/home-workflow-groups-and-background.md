# Feature: Home workflow groups and shared background

## Objective

Use the Home gradient as the shared background for Control, Cambio, and future workflow views, and organize the Home with a `GESTIONES` section that exposes Cambio while keeping Compensatorio and LAO as upcoming.

## Problem

The Home owns its gradient inline while workflow routes inherit the paper-grid body background. The Home also separates available and upcoming workflows without a Gestiones grouping.

## Why

The user requested one visual surface across current and future views, plus a clearer operational hierarchy as Cambio becomes available.

## Scope

- Extract one reusable background token/class for Home and `WorkflowShell`.
- Add a `GESTIONES` Home section with Cambio as the available workflow.
- Keep Compensatorio and LAO visible as upcoming work without enabling their routes.
- Preserve Control, Cambio, navigation, and email behavior.

## Constraints

- Future views must inherit the shared background by using `WorkflowShell`.
- Do not alter the working Control or Cambio submission contracts.
- Cambio email decision is already resolved: keep automatic collection enabled and store the explicit required Form item `1891793506`; MailApp remains server-side.
- TDD mode: disabled. Checks: focused ESLint, `npm.cmd run build`, and manual visual readback.
- Repository check: the workspace is not a usable Git repository, so work-unit commit evidence is blocked.

## Tasks

- [x] HOME-BACKGROUND-001 Extract and apply the shared Home gradient to Home and `WorkflowShell`.
- [x] HOME-GESTIONES-002 Add the `GESTIONES` section with Cambio active and future workflows upcoming.
- [x] HOME-VERIFY-003 Run focused/full checks and record visual/manual evidence.
- [x] HOME-GESTIONES-004 Consolidate upcoming management cards inside the `GESTIONES` group.

## Acceptance criteria

- Home, Control, Cambio, and future `WorkflowShell` views use the same gradient background.
- Home exposes a `GESTIONES` heading and a working Cambio link.
- Compensatorio and LAO remain visibly upcoming and do not become clickable.
- Existing Control/Cambio form behavior and email mapping remain unchanged.

## Progress

- Added `--workflow-background` and the `.workflow-background` utility in `src/styles.css`; Home and `WorkflowShell` now use that one utility.
- Moved Cambio de guardia into the active `GESTIONES` section with its existing `/cambio-guardia` route. Compensatorio and Solicitud de LAO remain non-interactive upcoming cards.
- Nested the non-interactive Compensatorio and Solicitud de LAO cards beneath the active Cambio card within `GESTIONES`. The nested heading is level three and card titles are level four, preserving an accessible hierarchy.
- Control remains the only card in `Empezá tu guardia`; no form, route implementation, Apps Script, or email code changed.

## Verification evidence

- `npx.cmd prettier --write src/routes/index.tsx` — passed.
- `npx.cmd eslint src/routes/index.tsx` — passed (exit 0).
- `npm.cmd run build` — passed after the nested Gestiones refinement; it retains the existing Vite/TanStack deprecation warnings.
- Manual structural readback — confirmed the upcoming nested section is inside `GESTIONES`, uses an `h3` heading, card titles are `h4`, and the cards remain `article[aria-disabled="true"]` with no links.

- `npx.cmd prettier --write src/routes/index.tsx src/components/WorkflowShell.tsx src/styles.css` — passed.
- `npx.cmd eslint src/routes/index.tsx src/components/WorkflowShell.tsx` — passed (exit 0).
- `npm.cmd run lint` — passed (0 errors, 6 existing Fast Refresh warnings).
- `npm.cmd run build` — passed. Existing warnings remain: `vite-tsconfig-paths` is redundant with Vite native support, and `createServerFn().inputValidator()` is deprecated in `src/lib/cambio-guardia.functions.ts` and `src/lib/registro.functions.ts`.
- Manual structural readback — confirmed there is one gradient declaration, Home and `WorkflowShell` both use `.workflow-background`, Cambio is a `Link` to `/cambio-guardia`, and the upcoming cards have no links.

## Next step

- Review the Home, Control, and Cambio views in a browser if a visual QA pass is desired. No commit or deployment was performed because the repository is not usable as Git and this task explicitly prohibits both.

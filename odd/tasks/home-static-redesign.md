# Feature: Static Home UX redesign

## Objective

Redesign the SeLIAR Home as a static mobile-first access point with a softened institutional gradient, a dominant Control de guardia action, and a white Gestiones sheet.

## Problem

The Home currently presents several similarly styled cards, redundant status labels, and an oversized unavailable-workflows block. The visual hierarchy does not clearly prioritize the primary operational action.

## Why

The user requested a static, no-login Home redesign following Von Restorff, Hick, and Fitts principles without adding user-dependent states or functionality.

## Scope

- Preserve the existing petroleum-green header content and institutional gradient, reducing gradient intensity with a white base/alpha treatment.
- Make Control de guardia the dominant petroleum-green card with a full-width amber navigation action.
- Replace the Gestiones cards with simple white-sheet rows for Cambio and Compensatorio.
- Replace the large unavailable block with one muted, locked Próximamente line for LAO.
- Remove redundant badges/eyebrows and any red UI accents from the Home.
- Preserve routes, static copy, keyboard focus, touch targets, reduced-motion behavior, and all workflow integrations.

## Constraints

- No greetings, user names, dates, dynamic status, progress, or counters.
- Keep the institutional gradient recognizable but softened.
- No new functionality or login/session behavior.
- TDD mode: disabled. Checks: focused ESLint, full lint, production build, and structural readback.
- Repository check: the workspace is not a usable Git repository, so work-unit commit evidence is blocked.

## Tasks

- [x] HOME-REDESIGN-001 Rebuild the static Home hierarchy and navigation surfaces.
- [x] HOME-REDESIGN-002 Soften the shared gradient without changing its institutional colors.
- [x] HOME-REDESIGN-003 Run formatting, lint, build, and structural checks.

## Acceptance criteria

- Header remains the petroleum-green institutional card with the specified copy.
- Control de guardia is the most prominent action and includes the exact amber CTA copy.
- Gestiones is a white rounded-top sheet with simple Cambio and Compensatorio rows.
- LAO is represented only by a muted locked Próximamente line.
- No redundant labels, red UI accents, dynamic user state, or new functionality are introduced.
- All active surfaces have accessible focus/active states and at least 48px touch height.

## Progress

- Task document created before source changes.
- Rebuilt the Home with the preserved 107/SIES logo, petroleum-green header, exact title/subtitle, dominant Control de guardia card, amber CTA, white Gestiones sheet, two management links, and a single muted LAO availability line.
- Removed redundant availability/eyebrow labels, red Home accents, circular action buttons, and the large unavailable-workflows block without changing routes or adding functionality.
- Softened the shared institutional gradient by applying 85% alpha over a white base while retaining the original yellow, orange, pink, and blue stops.

## Verification evidence

- `npx.cmd prettier --write src/routes/index.tsx src/styles.css odd/tasks/home-static-redesign.md` — passed.
- Focused ESLint for `src/routes/index.tsx` — passed.
- `npm.cmd run lint` — passed with 0 errors and 6 pre-existing Fast Refresh warnings in unrelated UI files.
- `npm.cmd run build` — passed with existing `vite-tsconfig-paths`, server-function deprecation, and Nitro warnings.
- Parent spot check: `npm.cmd run build` — passed with the same pre-existing warnings.
- Structural readback confirmed exact header/subtitle copy, exact Control CTA, only Cambio/Compensatorio active Home links, one LAO non-interactive line, no stale Home status labels, no `brand-red` usage in Home, and preserved route targets.
- Final interaction readback confirmed 150ms transitions, visible `:active` darkening, solid white Gestiones sheet, semibold sentence-case section title, and accessible focus rings on every active Home link.
- Repository check remains blocked: the workspace is not a usable Git repository, so no work-unit commit was created.

## Next step

- Perform manual visual QA at 360–420px widths and across keyboard focus states; no source or deployment changes remain required for this task.

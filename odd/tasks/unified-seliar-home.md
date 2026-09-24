# Feature: Unified SeLIAR home

## Objective
Create a mobile-first SeLIAR entry point with persistent navigation and dedicated local views before connecting external Google Forms or Apps Script endpoints.

## Problem
The only current route opens the operational guard-transfer form directly, so nursing staff have no unified place from which to discover or enter the workflows.

## Why
The user requested a unified nursing frontend that begins with a home, a mobile navigation control, and separate views; external-form and Apps Script links will be added in a subsequent phase.

## Scope
- Replace the root route with a mobile-first home.
- Preserve the existing guard-transfer workflow in its own route.
- Add reachable local placeholder views for Change of Guard, Compensatory Leave, and LAO.
- Add persistent mobile navigation appropriate for the current local views.

## Constraints
- Do not link to Google Forms or Apps Script in this phase.
- Preserve the existing guard-transfer form behavior and server integration.
- Treat mobile as the primary viewport; desktop support is secondary.
- TDD mode: disabled (source: package.json has no test runner). Checks: `npm run lint` and `npm run build`.
- Repository check: `git status` reports that this workspace is not a Git repository; commit evidence is therefore pending until repository metadata is available.

## Tasks
- [x] SELIAR-HOME-001 Create the mobile-first home and navigation shell.
- [x] SELIAR-HOME-002 Move the existing guard-transfer workflow into its dedicated route and add the three local workflow views.
- [x] SELIAR-HOME-003 Run lint/build checks and record observed results.
- [x] SELIAR-HOME-004 Restore UTF-8 presentation literals in the preserved guard-control route without changing its integration contract.
- [x] SELIAR-HOME-005 Make upcoming workflows visibly non-actionable in the home and persistent navigation.
- [x] SELIAR-HOME-006 Reframe the home as an operational dashboard with the approved gradient background and a clear available-workflow priority.
- [x] SELIAR-HOME-007 Run lint/build checks and record the observed results for the UX improvements.

## Acceptance criteria
- `/` presents SeLIAR nursing workflows as a mobile-first home.
- Navigation remains available on the local workflow views and returns to the home.
- The existing guard-transfer form remains reachable and functional on a dedicated route.
- Change of Guard, Compensatory Leave, and LAO each have a local view without external integrations.
- No Google Forms or Apps Script links are introduced in this phase.
- Upcoming workflows are visibly distinct and cannot be activated as normal links.
- The home prioritizes the available guard-control workflow and uses the approved linear-gradient background.

## Progress
- The root route now provides a mobile-first SeLIAR nursing home and the persistent bottom navigation is rendered from the root application shell.
- The existing guard-transfer workflow was moved intact to `/control-guardia`. Local placeholder routes exist at `/cambio-guardia`, `/compensatorio`, and `/lao`; none connects to Google Forms or Apps Script.
- Reopened for SELIAR-HOME-004 after visual verification found mojibake in the guard-control presentation strings. The correction is limited to `src/routes/control-guardia.tsx`; Google Forms payload keys, Apps Script, IDs, and inventory contract are out of scope.
- Repaired the corrupted presentation literals in `src/routes/control-guardia.tsx`, preserving UTF-8 with BOM. A UTF-8 scan now reports zero `Ã`, `Â`, or `â` mojibake patterns; form payload and local-draft structures remain present.
- Scoped normalization: `npx.cmd prettier --write` completed successfully for the new/updated shell and route files. PowerShell blocked `npx` because its script is unsigned; `npx.cmd` is the working equivalent in this workspace.
- Route generation updated `src/routeTree.gen.ts` from the file-based route set during the production build.
- Estimated authored change size: approximately 250–350 lines; delivery strategy: ask-on-risk.
- The home UX follow-up now separates the available Control de guardia action from upcoming workflows. Upcoming home previews are non-interactive articles, and upcoming bottom-navigation entries are disabled buttons with explicit status text.
- The home now behaves as an operational dashboard: the available workflow is presented first under “Disponible ahora”, upcoming workflows are grouped under “Próximamente”, and the approved linear-gradient background is applied to the page.

## Verification evidence
- `npm run lint` (executed as `npm.cmd run lint` because PowerShell blocks unsigned `npm.ps1`): passed; observed output: `> lint` then `> eslint .`.
- `npm run build` (executed as `npm.cmd run build` for the same PowerShell limitation): passed; observed output: `> build` then `> vite build`.
- Encoding repair checks: `npm.cmd run lint` passed with six pre-existing Fast Refresh warnings and no errors; `npm.cmd run build` passed. Existing build warnings remain for vite-tsconfig-paths, deprecated `createServerFn().inputValidator()`, and Nitro `inlineDynamicImports`.
- Commit limitation: `git status` fails with `fatal: not a git repository (or any of the parent directories): .git`; no commit can be created or recorded.
- UX follow-up verification: `npm.cmd run lint` passed with six pre-existing Fast Refresh warnings; `npm.cmd run build` passed with the existing Vite/TanStack/Nitro warnings. No commit was created because the `.git` directory is unusable/empty.

## Next step
- Review the updated home in a browser on mobile and desktop widths. Keep the existing section-level completion feedback, do not redesign form complexity, and do not connect external Google Forms or Apps Script in this task.

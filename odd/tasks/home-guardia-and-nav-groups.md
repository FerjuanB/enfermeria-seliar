# Home Guardia and Navigation Groups

## Objective
Make the working `/ingreso` flow discoverable from the Home page and reduce mobile navigation clutter by grouping destinations into `Tu guardia` and `Gestiones`.

## Problem and Why
`/ingreso` currently works but is not linked from Home or the mobile navbar. Home gives `Control de guardia` a single prominent CTA, while the bottom navbar shows six unrelated destinations as individual cells. The user wants to see the new hierarchy locally before deciding whether to refine it further.

## Scope
- Add `Registrar ingreso` beside `Control de guardia` in a new `Tu guardia` Home section, preserving the current CTA visual treatment for both links.
- Keep the existing `Gestiones` Home destinations together after `Tu guardia`.
- Replace the crowded mobile navbar's individual workflow links with grouped `Tu guardia` and `Gestiones` navigation, preserving direct access to every current route.
- Keep existing route paths and behavior unchanged; no backend, form, or global shell changes.

## Constraints
- Mobile-first; preserve readable touch targets and keyboard focus visibility.
- Preserve current adaptive navbar reveal/hide behavior, `aria-current`, and reduced-motion behavior.
- `Tu guardia` routes: `/ingreso`, `/control-guardia`.
- `Gestiones` routes: `/horarios`, `/cambio-guardia`, `/compensatorio`, `/lao`.
- TDD: disabled, based on existing project task records; no test runner is configured.
- Engram mirror: pending because the memory tool rejected the available session identity; resynchronize when available.
- Estimated authored change: approximately 100–180 lines across source, task file, and any focused tests (if a test harness is discovered); generated files excluded.
- Delivery strategy: `ask-on-risk` (default); no PR requested.

## Authorized Scope
The user explicitly authorized these local UX changes after approving the proposed Home and navbar grouping. Do not deploy, push, open a PR, or alter remote state.

## Tasks
- [x] HNG-1: Group the Home's operational actions under `Tu guardia`, add the `/ingreso` CTA with the existing Home CTA styling, and retain `Gestiones` below.
- [x] HNG-2: Group mobile navbar destinations into `Tu guardia` and `Gestiones` controls with accessible, keyboard-operable subnavigation while preserving existing destinations and adaptive visibility behavior.
- [x] HNG-3: Verify route coverage, active states, keyboard/touch access, responsive layout, lint, typecheck, and production build; record results and commit identity.

## Acceptance Criteria
- Home presents `/ingreso` and `/control-guardia` at equal visual hierarchy within `Tu guardia`.
- Home retains the existing four `Gestiones` destinations and working routes.
- Navbar shows the two requested groups rather than seven crowded route cells; each current destination remains reachable, with active route state exposed accessibly.
- Opening/closing group subnavigation works with pointer and keyboard and does not regress navbar hide/reveal behavior.
- TDD remains disabled; required available functional checks are run and reported honestly.
- Changes are committed as one Conventional Commit work unit on the current feature branch; no AI attribution.

## Verification
- `npx.cmd eslint src/routes/index.tsx src/components/SeliarMobileNav.tsx`
- `npm.cmd run typecheck`
- `npm.cmd run lint`
- `npm.cmd run build`
- Structural readback and local visual check at mobile and desktop widths.

## Progress
- Route hierarchy and navigation structure mapped from current source. Current source takes precedence over older task documents where they differ.
- HNG-1 implemented in `src/routes/index.tsx`: both guardia actions now share the same CTA treatment under `Tu guardia`, with `Gestiones` retained below.
- HNG-1 commit: `ba1d7546fad3ca2596f92322b8d751eb7ea61a3d` (`feat(home): group guardia actions and add ingreso CTA`).
- HNG-1 focused verification: `npx.cmd eslint src/routes/index.tsx src/components/SeliarMobileNav.tsx` passed; route readback confirms `/control-guardia`, `/ingreso`, and the four management links are retained.
- HNG-2 implemented in `src/components/SeliarMobileNav.tsx`: replaced six route cells with Inicio plus two group controls; menus preserve all six workflow destinations, expose `aria-current`, support native keyboard activation, Escape-to-close/focus return, outside-click close, and maintain adaptive reveal/hide with reduced-motion classes.
- HNG-2 commit: `1cb7ad8ed82551c42589f179f9d87c489919d08f` (`feat(nav): group mobile workflow destinations`).
- HNG-2 structural readback: the nav has three bottom-bar controls (Inicio and the two requested groups), with all six workflow destinations in grouped submenus. `aria-current` identifies the active route; the current group is announced on its trigger. Menu links retain 48px minimum height. Keyboard activation opens/focuses the first link; Escape closes and restores focus; pointer outside closes. Existing scroll-driven reveal/hide listeners remain, and reduced-motion transition suppression is preserved. Popup switches to a two-column layout at `sm`.
- HNG-3 commands: `npx.cmd eslint src/routes/index.tsx src/components/SeliarMobileNav.tsx` passed; `npm.cmd run typecheck` passed; `npm.cmd run lint` passed with 0 errors and 6 existing `react-refresh/only-export-components` warnings in `src/components/ui/{badge,button,form,navigation-menu,sidebar,toggle}.tsx`; `npm.cmd run build` passed with existing TanStack `inputValidator()` deprecation and Vite plugin notices.
- HNG-3 route and accessibility readback: Home contains `/control-guardia`, `/ingreso`, and all four management routes; navbar groups cover `/control-guardia`, `/ingreso`, `/horarios`, `/cambio-guardia`, `/compensatorio`, and `/lao`. Keyboard, outside-pointer, Escape, active route, touch-target sizing, responsive utility classes, adaptive visibility, and reduced-motion behavior were verified structurally. No live browser screenshot/visual interaction run was performed.
- HNG-3 final integrity: `git diff --check` passed and the worktree was clean before this task-document update. No generated build outputs were tracked.
- Current task route: delegated direct implementation, required by the two-file non-trivial writer trigger.
- Next step: none for implementation. The Engram mirror remains pending because the available session identity was rejected; no memory write was retried.

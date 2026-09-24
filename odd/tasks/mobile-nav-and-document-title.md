# Feature: App title and adaptive mobile navigation

## Objective

Align the app-wide document title with the multi-workflow home and make the mobile navigation recede while reading, returning predictably on intentional navigation gestures.

## Problem

The root title still describes only Control de Guardia. The fixed bottom navigation also occupies valuable mobile viewport space while the user scrolls through forms.

## Why

The user authorized a broader app title and requested a mobile behavior that maximizes content while preserving discoverable navigation.

## Scope

- Change the root document and Open Graph title to `Enfermería SeLIAR — Panel operativo`.
- Keep workflow-specific route titles unchanged.
- Hide the fixed mobile navbar on downward scrolling after a small threshold.
- Reveal it on upward scrolling, touch/pointer interaction near the bottom edge, keyboard focus, and route changes.
- Respect reduced-motion preferences and preserve a minimum accessible target area.

## Constraints

- Do not remove navigation or make it unreachable.
- Do not hide the navbar while the page is at the top, while focus is inside it, or when the user is navigating with keyboard/screen reader.
- Keep the behavior mobile-first and avoid horizontal layout changes.
- TDD mode: disabled. Checks: focused ESLint, typecheck, full lint, production build, and structural readback.

## Tasks

- [x] NAVTITLE-001 Update root title and matching Open Graph metadata.
- [x] NAVTITLE-002 Implement adaptive mobile navbar visibility and accessibility safeguards.
- [x] NAVTITLE-003 Run typecheck, lint, build, and structural checks.

## Acceptance criteria

- Browser title and `og:title` identify the whole operational app.
- Navbar remains visible at the top and during upward navigation.
- Navbar hides only after intentional downward scrolling and can be revealed without requiring a route change.
- Focused navigation remains visible and keyboard/screen-reader access is preserved.
- Reduced-motion users do not receive animated movement.

## Progress

- Task document created before source changes.
- Updated `src/routes/__root.tsx` with the app-wide title and description; workflow route titles remain specific.
- Added scroll-direction, bottom-edge touch/pointer reveal, focus protection, route-change reveal, cleanup, and reduced-motion behavior to `src/components/SeliarMobileNav.tsx`.
- Added `.netlify/` to `.gitignore` after the Netlify preset generated that deployment directory and slowed broad lint traversal.

## Verification evidence

- `npm.cmd exec prettier -- --check src/routes/__root.tsx src/components/SeliarMobileNav.tsx` — passed.
- `npm.cmd run typecheck` — passed with zero errors.
- Focused ESLint and ESLint over `src` — passed with 0 errors and 6 pre-existing Fast Refresh warnings.
- `npm.cmd run build` — passed with existing `vite-tsconfig-paths`, deprecated `inputValidator()`, and Nitro warnings.
- Structural readback confirmed listeners are cleaned up, focus prevents hiding, route changes reveal the nav, and reduced motion disables movement.

## Next step

- Perform mobile visual QA on long forms to tune the hide/reveal thresholds if needed.

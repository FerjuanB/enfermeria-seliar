# Feature: Strict TypeScript cleanup

## Objective

Make the repository pass `tsc --noEmit` under its existing strict compiler options and expose that check through a repeatable package script, without weakening type safety or changing workflow behavior.

## Problem

The production bundle and ESLint pass, but direct TypeScript checking fails because `noUncheckedIndexedAccess` treats date-array parts as possibly undefined and `exactOptionalPropertyTypes` rejects explicit `undefined` values passed to optional error props.

## Why

The user authorized correcting the type errors so the strict compiler check and lint workflow become trustworthy before continuing feature work.

## Scope

- Fix strict date-part narrowing in shared route/server date validators.
- Fix optional error prop construction so undefined values are omitted rather than passed explicitly.
- Add a `typecheck` package script that runs `tsc --noEmit`.
- Preserve runtime behavior and existing validation semantics.
- Verify focused lint, full lint, typecheck, and production build.

## Constraints

- Do not loosen `tsconfig` strictness or add broad type casts that hide invalid data.
- Keep user-facing behavior unchanged.
- TDD mode: disabled. Checks: focused ESLint, full lint, typecheck, production build, and structural readback.
- Repository check: the workspace is not a usable Git repository, so work-unit commit evidence may be blocked.

## Tasks

- [x] TYPES-001 Fix date-part narrowing under `noUncheckedIndexedAccess`.
- [x] TYPES-002 Fix optional error prop handling under `exactOptionalPropertyTypes`.
- [x] TYPES-003 Add the package `typecheck` script.
- [x] TYPES-004 Run all checks and record evidence.

## Acceptance criteria

- `npm.cmd run typecheck` passes with zero TypeScript errors.
- Focused and full ESLint pass without new errors.
- Production build passes.
- No strict compiler options are disabled and no workflow behavior changes.

## Progress

- Task document created before source changes.
- Initial diagnosis confirmed strict errors in Compensatorio and analogous LAO/Cambio routes and server functions.
- Narrowed split date components explicitly before numeric conversion in all affected route/server validators, preserving existing calendar-date behavior.
- Changed optional form-field props to conditional spreads so `error`, `type`, `inputMode`, and `autoComplete` are omitted when absent; removed the non-uniform mobile-nav `exact` property.
- Added `npm run typecheck` as the canonical strict compiler check.

## Verification evidence

- `npx.cmd prettier --check src/lib/cambio-guardia.functions.ts src/lib/compensatorio.functions.ts src/lib/lao.functions.ts src/routes/compensatorio.tsx src/routes/lao.tsx src/routes/cambio-guardia.tsx src/components/SeliarMobileNav.tsx package.json odd/tasks/strict-typescript-cleanup.md` — passed.
- `npm.cmd run typecheck` — passed with zero TypeScript errors.
- Focused ESLint for affected route, server-function, and navigation files — passed.
- `npm.cmd run lint` — passed with 0 errors and 6 pre-existing Fast Refresh warnings in unrelated UI files.
- `npm.cmd run build` — passed with existing `inputValidator`, `vite-tsconfig-paths`, and Nitro warnings.
- Structural readback confirmed strict compiler options remain enabled, the `typecheck` script is present, and no broad casts or workflow changes were introduced.

## Next step

- No implementation steps remain. External deployment is not required; the next feature can use `npm.cmd run typecheck` before handoff.

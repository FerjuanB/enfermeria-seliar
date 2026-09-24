# Feature: Cambio de guardia Google Form integration

## Objective
Connect the Cambio de guardia frontend to its own Google Apps Script deployment and Google Form without changing the working Control de guardia integration.

## Problem
Control already submits through `src/lib/registro.functions.ts` and `docs/google-apps-script/Code.gs`. Cambio currently only advances to a local confirmation state and has no server contract or Apps Script bridge.

## Why
The user approved separate deployments per workflow, preserving Control's existing environment names, and using flat script filenames for future forms.

## Scope
- Add a Cambio-specific server function and validation schema.
- Add flat `docs/google-apps-script/cambioGuardia.gs` with the Cambio Form IDs and mapping.
- Wire the Cambio route confirmation to real submission states.
- Document the new environment variables and deployment contract.
- Preserve the existing Control endpoint, secret names, Apps Script, and behavior.

## Constraints
- Control keeps `GOOGLE_APPS_SCRIPT_URL` and `GOOGLE_APPS_SCRIPT_SECRET` unchanged.
- Cambio uses `GOOGLE_APPS_SCRIPT_CAMBIO_GUARDIA_URL` and `GOOGLE_APPS_SCRIPT_CAMBIO_GUARDIA_SECRET`.
- Future scripts use flat names such as `compensatorio.gs` and `lao.gs`; do not create one folder per form.
- Do not call Apps Script directly from the browser or expose secrets to the client.
- TDD mode: disabled. Checks: `npm.cmd run lint` and `npm.cmd run build`.
- Repository check: the workspace is not a usable Git repository, so work-unit commit evidence is blocked.

## Tasks
- [x] FORM-INTEGRATION-001 Add the Cambio server function, schema, and typed response handling.
- [x] FORM-INTEGRATION-002 Create `docs/google-apps-script/cambioGuardia.gs` with isolated Form mapping and secret validation.
- [x] FORM-INTEGRATION-003 Wire the route to pending/success/error/retry states and prevent false confirmation.
- [x] FORM-INTEGRATION-004 Document deployment/env setup and run focused/full checks.
- [x] EMAIL-CONFIRMATION-005 Add requester email capture and post-submit confirmation email in `cambioGuardia.gs`.
- [x] EMAIL-CONFIRMATION-006 Map the new Google Form email item `1891793506` and refresh `datosForm.json`.

## Acceptance criteria
- A Cambio submission reaches only the Cambio deployment and Form.
- Control submission remains unchanged and continues using its existing env names.
- The browser never receives either Apps Script secret.
- Cambio displays confirmation only after a successful server response.
- A successful Cambio response attempts a plain-text confirmation email; email failure does not invalidate the saved Form response and is shown as a warning.
- Apps Script mapping covers complete/partial coverage, people, dates, optional times, and clarification.
- Future form bridges have a clear flat filename and env naming convention.

## Progress
- Separate deployment and flat filename decisions explicitly approved by the user.
- Existing Cambio UI schema is available in `docs/google-apps-script/datosForm.json`.
- Added an isolated server function and server-only env contract for Cambio.
- Added the flat `cambioGuardia.gs` bridge with the exact Form item mapping and strict date/time validation.
- Confirmation now renders only after Apps Script returns `{ ok: true }`; pending/error/retry states are explicit.
- Documented deployment and future flat bridge conventions in `docs/google-apps-script/README.md`.
- Added required requester email capture and validation; it appears in the review summary and is stored in the explicit required Google Form email item `1891793506`.
- `cambioGuardia.gs` submits the Form response before sending a complete plain-text confirmation copy; email failure preserves the successful submission and is surfaced as a client warning.
- README documents the explicit email Form item, continued automatic email collection, and required `MailApp` authorization.
- The refreshed Cambio Form metadata now includes the explicit required email item `1891793506` at index 0.
- Mapped the required explicit email item into the Cambio Form response before the existing request fields; MailApp confirmation behavior remains unchanged.

## Verification evidence
- `npm.cmd run build` — passed (client, SSR, Nitro); existing deprecation warnings only.
- `npx.cmd eslint src/routes/cambio-guardia.tsx src/lib/cambio-guardia.functions.ts src/components/SeliarMobileNav.tsx` — passed.
- RTK-prefixed commands were unavailable in this environment (`rtk.exe: Access is denied`); direct equivalents passed.
- No remote deployment or secret configuration performed; workspace has no usable Git commit evidence.
- `npx.cmd eslint src/routes/cambio-guardia.tsx src/lib/cambio-guardia.functions.ts` — passed.
- `npm.cmd run build` — passed (existing `createServerFn().inputValidator()` and `vite-tsconfig-paths` deprecation warnings only).
- `node.exe` dynamic syntax check of `cambioGuardia.gs` — passed.
- `node.exe` dynamic syntax and Cambio metadata mapping check — passed (email item, refreshed timestamp, item count, and indexes 0–11).
- `rg` documentation consistency check — passed; no stale transport-only or unmapped-email claim remains.

## Next step
- Deploy `docs/google-apps-script/cambioGuardia.gs` from an authorized Google account, authorize `MailApp`, set `CAMBIO_GUARDIA_SECRET`, and configure the two Cambio server env vars before production use.

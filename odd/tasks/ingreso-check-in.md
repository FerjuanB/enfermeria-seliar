# Ingreso Check-in

## Objective
Add an independent, mobile-first `/ingreso` check-in flow that can be deployed and previewed without adding any navigation link, captures a one-time current location, and forwards submissions to a future dedicated Google Apps Script bridge.

## Problem and Why
The user needs a separate way to record a person's entry with identity, assigned mobile, timestamp, and current location, while previewing the UI before linking it from the rest of the app.

## Scope
- Add `/ingreso` with the established SeLIAR workflow UX: data entry, review, submission, and confirmation states.
- Ask for full name, email, and the same required mobile list as Compensatorio.
- Offer a conditional MailApp confirmation copy, unchecked by default, matching existing workflow behavior.
- Request geolocation through a clear user action, show capture/error status and accuracy, and block submission until a location is available.
- Capture the location once (no continuous tracking); preserve browser location timestamp and let the future server/Form submission timestamp be authoritative for submission time.
- Add a server-side validated bridge contract and a dedicated Apps Script source/documentation for future Form/deployment configuration; never expose the script secret in the browser.
- Keep `/ingreso` out of Home actions and mobile navigation.

## Constraints
- No sign-in/authentication or claim that GPS proves identity.
- Geolocation is required to submit; if permission is denied or location cannot be obtained, explain how to retry and do not submit.
- Do not make remote Google calls, deploy Apps Script, or invent Form IDs/item IDs/secrets.
- Keep email-copy failure independent from successful form submission, as in existing flows.
- TDD mode: disabled (existing project conventions; no test runner configured). Verification: focused ESLint, typecheck, full lint, and production build.
- Delivery strategy: ask-on-risk. Forecast was approximately 350 authored changed lines; the implementation produced about 900 additions.
- User selected `feature-branch-chain`. Tracker branch: `staging`. This end-to-end check-in is one coherent PR slice; local child branch `feat/ingreso-check-in` targets `staging`. Only `staging` should later merge to `main`.

## Authorized Scope
- `src/routes/ingreso.tsx` and route-specific components/types as needed.
- A dedicated server bridge in `src/lib/ingreso.functions.ts`.
- `docs/google-apps-script/ingreso.gs` and corresponding setup/contract notes.
- Generated TanStack route tree files only if required by repository conventions.
- This task document.
- Do not change global navigation, Home CTAs, or existing forms except where a shared component change is strictly necessary and accepted.

## Acceptance Criteria
- `/ingreso` can be loaded directly and renders a responsive check-in view without any new visible link to it.
- The mobile selector exactly matches Compensatorio's options and required behavior.
- User can explicitly request location; success shows at least that location is captured and its estimated accuracy; denied/unavailable/timeout states are recoverable.
- Submit stays disabled until required identity/email/mobile fields are valid and geolocation is successfully captured.
- Payload validation is server-side; Apps Script URL and secret remain server-only; future setup requirements are documented without fabricated deployment values.
- Optional MailApp copy defaults off and cannot turn a successful check-in into a failed submission.
- Timestamp and coordinates are included in the bridge payload; no continuous location tracking.
- No CTA/nav link to `/ingreso` is introduced.

## Tasks
- [x] ING-1: Implement the standalone mobile-first `/ingreso` UI, required field validation, location capture states, and review/confirmation flow. Focused ESLint and `npm.cmd run typecheck` passed. Route registration was generated in `src/routeTree.gen.ts`; it does not add a Home or navigation CTA.
- [x] ING-2: Implement the server-side payload validation/Apps Script bridge contract and dedicated Apps Script persistence/email-copy source with deployment prerequisites documented. The server validates all user/location fields and keeps the URL/secret server-only; `ingreso.gs` creates a dedicated Form with a run-once setup helper, validates the same mobile list and geolocation, stores location data, and treats MailApp failure independently. Setup/deployment requirements are documented without concrete IDs or secrets.
- [x] ING-3: Ran checks and structural readback; recorded the work-unit commit. Focused ESLint, typecheck, build, and full lint passed. Full lint passed after `.netlify` was added to ESLint ignores. Commit `c6193c2` (`feat(ingreso): add standalone location check-in`).

## Progress and Evidence
- Exploration confirmed the existing Compensatorio mobile list, required email, conditional MailApp copy, and workflow UX patterns.
- Location denial policy resolved: a check-in must not submit without a successfully captured location.
- Added the direct route with explicit user-triggered, one-time geolocation, retryable permission/unavailable/timeout messaging, accuracy and capture-time display, identity disclaimer, required mobile/email/full name, and review/confirmation states. Submit remains blocked until location is captured.
- The future Apps Script route returns a clear not-configured message when its server-only environment values are absent.
- A read-only independent verification found no blocking issues; it identified that requesting a fresh fix could leave an older capture valid. The route now clears the previous capture at the start of every location request, keeping submission blocked until the new current-location request succeeds.
- Added `src/lib/ingreso.functions.ts` with server-side Zod validation, a dedicated environment-variable pair, and a POST proxy; switched the new server function to TanStack's `.validator()` API to avoid introducing the deprecated `.inputValidator()` warning.
- Added `docs/google-apps-script/ingreso.gs` with no fabricated IDs/secrets. The operator-run `setupIngresoForm()` creates the dedicated Form, stores its generated ID in script properties, and logs the edit URL. Form response time remains authoritative; the browser capture timestamp is stored as a separate field.
- Updated the Apps Script setup guide. Generated route registration includes `/ingreso`; Home and bottom navigation do not link to it.
- Verification: focused ESLint passed in the writer run and a parent spot check after the location-refresh fix; `npm.cmd run typecheck` passed in the writer run and parent spot check; `npm.cmd run build` passed; Apps Script syntax check via `Get-Content docs/google-apps-script/ingreso.gs -Raw | node --check -` passed. Initially `npm.cmd run lint` produced no result after >4 minutes because generated `.netlify` bundles were traversed. After adding `.netlify` to `eslint.config.js` ignores, full lint completed in 4.87 seconds, exit code 0, zero errors and six existing React Refresh warnings.
- Runtime harness: N/A — no staging deployment or configured Apps Script endpoint is available/authorized in this task. Manual scenario to run after HTTPS deployment: open `/ingreso` directly, deny location and confirm submission remains blocked with retry guidance, allow location and verify accuracy/capture time, then attempt submission with absent bridge variables and confirm the not-configured message. HTTPS is required for device geolocation (localhost is a secure development origin).
- Authored additions are about 900 lines excluding generated route-tree lines, above the task's ~400-line forecast. User selected `feature-branch-chain`: `staging` is the tracker branch; local child `feat/ingreso-check-in` targets `staging`; only the tracker should later merge to `main`. No remote push or PR creation was requested/performed.
- Current branch is `feat/ingreso-check-in`, created from `staging` with the feature changes preserved. Work-unit commit `c6193c2` contains the six scoped files.

## Next Step
The local work is complete. The first PR should target `staging`; only `staging` should later merge into `main`. No push or PR was performed.

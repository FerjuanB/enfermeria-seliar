# Ingreso Location Timestamp and Maps Answer

## Objective
Show the location capture time in Argentina time while preserving its original UTC value, and store a generated Google Maps URL as an additional short-text answer in the existing Google Form.

## Problem and Why
The current `/ingreso` flow captures a UTC ISO timestamp and the Apps Script Form stores raw coordinates. A manager needs a locally legible capture time and a convenient Maps link in the same response. The Form already exists, so its fields need an explicit safe migration rather than rerunning the Form-creating setup helper.

## Scope
- Format the location capture time in the UI using `America/Argentina/Buenos_Aires`, without changing the UTC payload.
- Store both the raw UTC capture timestamp and a deterministic Argentina-local timestamp in the Form response.
- Add a Maps URL derived from validated latitude/longitude as a short-text Form response.
- Update future setup behavior and provide an idempotent migration helper for the existing Form.
- Document deployment, migration, and manager use.

## Constraints
- Do not call Google/Apps Script remotely, deploy, push, or rerun `setupIngresoForm()` against the existing Form.
- The migration helper must open only `INGRESO_FORM_ID`, add only missing short-text items, and fail clearly if a target title exists with a non-text type.
- Preserve raw latitude, longitude, accuracy, UTC capture time, and the separate Form submission timestamp.
- A Maps pin and GPS timestamp do not prove identity or exact physical presence.
- TDD mode: disabled (source: `odd/tasks/ingreso-check-in.md`); no test runner is configured. Use existing typecheck, lint, build, and Apps Script syntax checks.
- Delivery strategy: `ask-on-risk`; chain strategy: `feature-branch-chain`; branch: `feat/ingreso-check-in`.
- Estimated authored additions plus deletions: about 200 lines, comfortably below the ~400-line planning heuristic.

## Authorized Scope
- `src/routes/ingreso.tsx`
- `docs/google-apps-script/ingreso.gs`
- `docs/google-apps-script/README.md`
- This task document
- No remote services, secrets, deployments, pushes, or unrelated UI changes.

## Acceptance Criteria
- [x] Location time shown by the UI explicitly uses the Argentina timezone.
- [x] The original UTC ISO `capturedAt` remains in the submitted payload.
- [x] Each Form response contains raw UTC, deterministic Argentina-local capture time, raw coordinates/accuracy, and a Google Maps search URL.
- [x] Future setup creates the complete schema; the separate existing-Form migration is idempotent and never creates a duplicate Form or changes unrelated fields.
- [x] README tells the operator to deploy updated Apps Script and run the migration once, and does not claim it ran remotely.
- [x] Checks and one Conventional Commit are recorded below.

## Tasks
- [x] LOC-1: Created and read back this recovery document and its Engram mirror before source edits.
- [x] LOC-2: Updated `/ingreso`, Apps Script schema/submission, and setup guide; added the guarded migration helper.
- [x] LOC-3: Verification commands passed, the diff was read back, and the work-unit commit was created.

## Progress and Evidence
- Initial state: user authorized the feature; existing task `odd/tasks/ingreso-check-in.md` confirms TDD disabled and no test runner configured.
- Migration/deployment sequence: save the updated standalone Apps Script source, run `migrateIngresoFormLocationFields()` in the editor against the existing Form, deploy a new web-app version immediately after, then verify the new items and submit a test check-in. Do not rerun `setupIngresoForm()` on the existing Form.
- Engram mirror: `odd/ingreso-location-review/tasks`; initial file and full observation were read back before source edits.
- Verification results: `npm.cmd run typecheck` passed; `npx.cmd eslint src/routes/ingreso.tsx` passed; `npm.cmd run lint` passed with six existing React Refresh warnings and zero errors; `npm.cmd run build` passed with existing deprecation/plugin warnings; `Get-Content docs/google-apps-script/ingreso.gs -Raw | node --check -` passed; `git diff --check` passed.
- Runtime Google/Form verification: N/A — no remote authorization was given. Operator verification is described above.
- Commit: this task's work-unit commit, `feat(ingreso): add Argentina capture time and Maps answer` (identity is available in Git history).

## Rollout Hazard Correction
- Finding: deploying the new handler before adding its two required-by-handler Form items would cause submissions to fail during the gap because `resolveFormItems()` requires both exact-title items.
- Correction: the Argentina-time and Maps text items are optional in `setupIngresoForm()` and in `migrateIngresoFormLocationFields()`; the updated handler still supplies both values on every submission. The migration validates both fields before making changes, ensures existing target items are optional, and keeps unrelated Form fields untouched.
- Safe rollout: save source in Apps Script, run `migrateIngresoFormLocationFields()`, immediately deploy the new web-app version, and smoke-test. During the gap, the old deployment can still accept check-ins because the new questions are optional; those interim responses have blank values for both new fields. Schedule at low volume or pause intake if complete reporting is required.
- Verification: Apps Script syntax check via `Get-Content docs/google-apps-script/ingreso.gs -Raw | node --check -` passed; read back the README migration section and confirmed the migration-first/deploy-second sequence and gap behavior.
- Correction commit: `fix(ingreso): sequence Form migration safely` (identity is available in Git history).

## Next Step
The local implementation is complete. Next, the operator must save the updated Apps Script, run the migration against the existing Form, deploy the new web-app version, and perform the Form smoke test. No remote operation was performed.

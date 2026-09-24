# Feature: Compensatorio Google Form integration

## Objective

Replace the Compensatorio placeholder with a validated local workflow that submits to its dedicated Google Apps Script bridge and sends a MailApp confirmation to the required requester email.

## Problem

The Compensatorio route was a placeholder. Its Google Form has four required fields but no explicit email item, so there was no safe destination for a server-side confirmation email.

## Why

The user authorized implementing Compensatorio and explicitly requested a required email field plus MailApp confirmation, following the established Cambio de guardia pattern.

## Scope

- Add a required requester email to the Compensatorio workflow contract.
- Implement the local form, review, submission, and confirmation states.
- Add a dedicated server function and environment variables.
- Add `docs/google-apps-script/compensatorio.gs` with FormApp validation, response submission, and MailApp confirmation.
- Update Form metadata and documentation after the required email item is created in Google Forms.

## Constraints

- Keep Control and Cambio deployments and environment variables unchanged.
- Use a separate deployment and the flat script name `compensatorio.gs`.
- Validate dates, hours, email, and allowed mobile choices on the server and bridge.
- Do not infer or invent the Google Form email item ID; the Apps Script setup helper must expose it after the field is added.
- TDD mode: disabled. Checks: focused ESLint, full lint, production build, and structural readback.
- Repository check: the workspace is not a usable Git repository, so work-unit commit evidence is blocked.

## Tasks

- [x] COMP-FORM-001 Implement the Compensatorio workflow UI and validation.
- [x] COMP-FORM-002 Implement the server function and dedicated environment contract.
- [x] COMP-FORM-003 Implement the Apps Script bridge and MailApp confirmation.
- [x] COMP-FORM-004 Update metadata/docs and verify the full flow.

## Acceptance criteria

- Compensatorio is reachable from its local route and uses the shared WorkflowShell.
- Required fields are requester name, email, mobile, date, and hours.
- Review and confirmation states match the existing Cambio interaction pattern.
- Successful Form submission is independent from email delivery failure; the UI warns without reporting a failed saved request.
- The bridge never sends a confirmation to an unvalidated address.
- No Control/Cambio behavior changes.

## Progress

- Task document created before source changes.
- Implemented the local form with required name, email, mobile, date, and positive decimal hours fields, including review and confirmation states. The mobile starts empty with an explicit selection prompt.
- Added the dedicated server function and environment contract: `GOOGLE_APPS_SCRIPT_COMPENSATORIO_URL` and `GOOGLE_APPS_SCRIPT_COMPENSATORIO_SECRET`.
- Added `docs/google-apps-script/compensatorio.gs` with the known Form item IDs, dynamic email-item lookup, one-time setup helper, strict validation, FormResponse submission, and MailApp confirmation.
- Activated Compensatorio in Home and the mobile navigation without changing Control/Cambio behavior.
- External Form setup and metadata refresh are complete per the supplied snapshot: `itemCount` is 5, with required `Correo electrónico` item ID `1851963092` at index 0; existing items remain IDs `77797409`, `1572866606`, `556605314`, and `718502073` at indexes 1–4.
- Root cause of `Datos no válidos al actualizar el formulario.`: automatic Google Forms email collection was enabled while the bridge submitted `FormResponse` objects programmatically, which cannot populate Google's respondent-email metadata.
- Corrective fix: `setupCompensatorioEmailField()` now disables automatic collection, preserves the required explicit `Correo electrónico` item, and logs its ID. `doPost` guards against the incompatible setting without mutating the production Form per request.
- Remaining external steps are rerunning the updated helper, redeploying the script, authorizing MailApp, configuring `COMPENSATORIO_SECRET`, configuring application URL/secret values, and running a real end-to-end submission test. No remote account or deployment access was used.

## Verification evidence

- `npx.cmd prettier --write src/routes/compensatorio.tsx src/lib/compensatorio.functions.ts src/routes/index.tsx src/components/SeliarMobileNav.tsx docs/google-apps-script/compensatorio.gs docs/google-apps-script/README.md` — passed.
- `npm.cmd run lint` — passed with 0 errors and 6 pre-existing Fast Refresh warnings in unrelated UI files.
- `npm.cmd run build` — passed. Existing warnings remain for `vite-tsconfig-paths`, deprecated `inputValidator()`, and Nitro `inlineDynamicImports`.
- Structural readback confirmed no fabricated Compensatorio email item ID was added to `datosForm.json`; the Apps Script resolves the item by title and logs its actual ID after setup.
- Corrective readback confirmed hours use only the supplied contract: a positive decimal quantity with no unverified maximum/minimum business limit.
- Apps Script readback confirmed the dynamically resolved email item uses its native `TextItem.createResponse()` path and does not double-cast an already typed item.
- Corrective checks: `npx.cmd prettier --write src/routes/compensatorio.tsx src/lib/compensatorio.functions.ts docs/google-apps-script/compensatorio.gs docs/google-apps-script/README.md odd/tasks/compensatorio-google-form-integration.md` and focused ESLint both passed; the repeated full lint and production build also passed with the same pre-existing warnings.
- Refreshed metadata readback confirmed Compensatorio has `itemCount: 5`, generated at `2026-09-23T12:10:25.930Z`, `Correo electrónico` ID `1851963092` at index 0, and the four existing items shifted to indexes 1–4 without ID changes.
- Apps Script correction readback confirmed `setCollectEmail(false)`, the explicit email item remains required, and `doPost` fails clearly when automatic collection is still enabled instead of changing production settings.
- Corrective checks: `npx.cmd prettier --write docs/google-apps-script/compensatorio.gs docs/google-apps-script/README.md odd/tasks/compensatorio-google-form-integration.md` and the corresponding Prettier check passed.
- Repeated `npm.cmd run lint` passed with 0 errors and the same 6 pre-existing Fast Refresh warnings; `npm.cmd run build` passed with the existing Vite server-function deprecation and Nitro warnings.
- `node --check docs/google-apps-script/compensatorio.gs` — unavailable because Node does not recognize the `.gs` extension; Apps Script syntax still requires validation in the Apps Script editor/deployment.
- Repository check remains blocked: the workspace is not a usable Git repository, so no work-unit commit was created.

## Next step

- Rerun the updated setup helper, redeploy the Apps Script, configure the separate deployment/env values, and run a production submission test.

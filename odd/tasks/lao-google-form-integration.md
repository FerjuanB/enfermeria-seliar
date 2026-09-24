# Feature: LAO Google Form integration

## Objective

Replace the LAO placeholder with a validated local workflow that submits to a dedicated Google Apps Script bridge and sends a MailApp confirmation to the requester.

## Problem

LAO is currently presented as an upcoming, disabled workflow. Its Google Form has required name and date fields but no explicit email item, so there is no safe destination for a server-side confirmation email.

## Why

The user authorized implementing the LAO form and the project convention is to use explicit requester email fields with separate Apps Script deployments and MailApp confirmations.

## Scope

- Add a required requester email to the LAO workflow contract and Apps Script setup helper.
- Implement the local form, review, submission, and confirmation states using the shared WorkflowShell.
- Model "MES DE INICIO DE LAO" as a month input and submit the first day of the selected month to the existing Google Forms date item.
- Validate that LAO start is not after LAO end.
- Add a dedicated server function and environment variables.
- Add `docs/google-apps-script/lao.gs` with FormApp validation, response submission, and MailApp confirmation.

## Constraints

- Keep Control, Cambio, and Compensatorio deployments and environment variables unchanged.
- Use a separate deployment and the flat script name `lao.gs`.
- Do not invent an email item ID; resolve it by title after the setup helper creates or reuses it.
- No age/antigüedad or concurrent-license validation is added because the form does not collect the data required to enforce those rules.
- TDD mode: disabled. Checks: focused ESLint, full lint, production build, and structural readback.
- Repository check: the workspace is not a usable Git repository, so work-unit commit evidence may be blocked.

## Tasks

- [x] LAO-FORM-001 Implement the LAO workflow UI and client/server validation.
- [x] LAO-FORM-002 Implement the dedicated server function and environment contract.
- [x] LAO-FORM-003 Implement the Apps Script bridge, setup helper, and MailApp confirmation.
- [x] LAO-FORM-004 Activate LAO in Home/navigation and update metadata/docs.
- [x] LAO-FORM-005 Run focused/full checks and record external deployment steps.

## Acceptance criteria

- LAO is reachable from Home and the mobile navigation through its local route.
- Required fields are requester name, email, start month, start date, and end date.
- Start month is submitted as the first day of the selected month to the existing date item.
- Review and confirmation states match the established workflow interaction pattern.
- The bridge validates dates and never sends a confirmation to an invalid address.
- Successful Form submission is independent from email delivery failure; the UI warns without reporting a failed saved request.
- No Control, Cambio, or Compensatorio behavior changes.

## Progress

- Task document created before source changes.
- Implemented the local LAO form with required name, email, start month, start date, and end date fields, review/confirmation states, date ordering validation, and policy information without unsupported seniority or concurrency validation.
- Added policy copy that makes the supplied form limits visible while explicitly noting that seniority and simultaneous-license checks remain external because the workflow does not collect those inputs.
- Added `src/lib/lao.functions.ts` with strict email/month/date validation and dedicated environment variables `GOOGLE_APPS_SCRIPT_LAO_URL` and `GOOGLE_APPS_SCRIPT_LAO_SECRET`.
- Added `docs/google-apps-script/lao.gs` with Form ID, known item IDs, title-based email lookup, `setupLaoEmailField()`, automatic email collection disabled, first-day-of-month mapping, date validation, and MailApp confirmation.
- Activated LAO in Home and mobile navigation without changing Control, Cambio, or Compensatorio behavior.
- Updated metadata to the supplied five-item snapshot: required `Correo Electrónico` ID `1849920835` at index 0; existing items IDs `1489095025`, `497043890`, `1242305715`, and `864116122` at indexes 1–4.
- Refreshed `datosForm.json` generatedAt to the supplied snapshot timestamp `2026-09-24T00:28:44.015Z`.
- External setup and deployment remain pending: rerun the helper, authorize MailApp, configure `LAO_SECRET` and application URL/secret values, redeploy, and run an end-to-end submission test.

## Verification evidence

- `npx.cmd prettier --write src/routes/lao.tsx src/lib/lao.functions.ts src/routes/index.tsx src/components/SeliarMobileNav.tsx docs/google-apps-script/lao.gs docs/google-apps-script/datosForm.json docs/google-apps-script/README.md odd/tasks/lao-google-form-integration.md` — passed.
- Focused ESLint for LAO/Home/navigation sources — passed.
- `npm.cmd run lint` — passed with 0 errors and 6 pre-existing Fast Refresh warnings in unrelated UI files.
- `npm.cmd run build` — passed with existing Vite server-function deprecation, tsconfig-paths, and Nitro warnings.
- Final policy-copy normalization: `npx.cmd prettier --write src/routes/lao.tsx` — passed; focused ESLint, full lint, and production build rerun — passed with the same existing warnings.
- Structural readback confirmed exact LAO metadata indexes/IDs/titles, no fabricated email ID, first-day month mapping in the bridge, `setCollectEmail(false)`, and active LAO route targets in Home/navigation.
- Parent spot check: focused ESLint for LAO, server function, Home, and mobile navigation passed after implementation; metadata timestamp readback matches the supplied snapshot.
- Repository check: the workspace is not a usable Git repository, so no work-unit commit was created.

## Next step

- Rerun `setupLaoEmailField()`, deploy the separate Apps Script, configure environment values, authorize MailApp, and execute an end-to-end submission test.

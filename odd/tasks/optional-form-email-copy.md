# Feature: Optional email copy for form submissions

## Objective

Let users opt in to receiving a copy of each submitted form by email without making email delivery part of successful form submission.

## Problem

All active forms currently send a MailApp copy unconditionally after saving their Google Form response. Users need a per-form choice, including the multi-step workflows in Gestión.

## Why

Make email delivery optional while preserving the existing Google Form record and server-side Apps Script boundary.

## Scope

- Add one unchecked checkbox next to the final send action on each active form: Control de guardia, Cambio, Compensatorio, and LAO.
- For multi-step forms, preserve the checkbox state and show it alongside the final confirmation action.
- Include and validate the opt-in flag through the existing server function and Apps Script bridge; call MailApp only when requested.
- Preserve form submission success when email is not requested or email delivery fails. Show a delivery warning only when the user opted in and delivery failed.
- Update Apps Script bridge documentation and this task document.

## Constraints

- Apps Script secrets and MailApp remain server-side.
- Use each form's existing requester email as the copy recipient.
- Do not change Google Form schemas, deployments, secrets, or remote resources.
- Do not rename or combine the separate workflow bridges.
- TDD is disabled (project/session context); use the existing lint, typecheck, and build checks. No test script is configured.
- Delivery strategy: `ask-on-risk`; no PR is authorized or planned here.

## Acceptance Criteria

- Each active form has one accessible, unchecked opt-in adjacent to its final submit CTA.
- In stepped workflows, the selected value survives navigation and is visible on the review/confirmation step.
- The checkbox value is parsed/validated by the server and honored by the matching Apps Script bridge.
- No email is sent when unchecked; a copy goes to the existing requester address when checked.
- A failed email after successful FormResponse submission does not undo submission, and only an opted-in delivery failure is surfaced as a warning.
- Existing validation, Form item mappings, attachment handling, and independent bridge configuration remain intact.

## Applicable Checks

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- Parse all four `.gs` bridge sources with Node `new Function(...)` for syntax validation.
- Structural readback of every route, server function, bridge, and updated documentation.

## Tasks

- [x] EMAIL-OPT-001 Add checkbox state and final-CTA UI to all four forms, including stepped review screens.
- [x] EMAIL-OPT-002 Carry and validate the opt-in through each server function and Apps Script bridge; suppress delivery-failure warnings when email was not requested.
- [x] EMAIL-OPT-003 Update Apps Script documentation and verify the full changed surface with the applicable checks.

## Progress and Evidence

- Exploration confirmed all four active workflows currently send a copy unconditionally after the form response is saved.
- Exploration confirmed Cambio, Compensatorio, and LAO use details/review/confirmed stages; Control's final CTA is “Enviar registro.”
- Exploration identified that optional delivery requires distinguishing “not requested” from “requested but failed” in the result contract.
- Added an unchecked opt-in next to each final CTA; stepped workflows preserve it through review. Control persists it with its local draft.
- Server functions validate and forward the opt-in. Each bridge saves the response before conditionally calling MailApp and returns the request/delivery states separately.
- Delivery warnings are now reserved for opted-in email failures; saved responses remain successful if delivery fails.
- Updated `docs/google-apps-script/README.md`; Form schemas, secrets, and deployments were not changed.
- Verification: `npm run typecheck`, `npm run build`, targeted ESLint for all changed TypeScript files, Apps Script syntax parsing, and `git diff --check` passed. Parent spot-check `npm run typecheck` also passed.
- `npm run lint` did not complete: it stalled without output and was interrupted. The changed TypeScript files passed targeted ESLint instead.
- Independent read-only verification found no concrete code regressions; it noted this task document needed progress reconciliation, now completed.
- Risk assessment was unclassifiable because `gentle-ai review assess` refused the untracked ODD task document; per policy this was treated as high, and an independent verifier completed successfully.
- Commit evidence: pending.

## Next Step

Create the feature work-unit commit, then record its identity here and synchronize this document to Engram.

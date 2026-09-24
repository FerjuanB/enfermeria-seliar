# Feature: Generic Google Forms inspector

## Objective
Create a read-only Apps Script utility that snapshots the metadata and question schemas of the SeLIAR Google Forms before implementing each frontend workflow.

## Problem
The existing Apps Script is coupled to the guard-control form through one FORM_ID and fixed item IDs, so it cannot safely describe the additional forms.

## Why
The user now has access to all required forms and authorized a generic discovery script as the first integration step.

## Scope
- Add FormInspector.gs next to the existing Code.gs.
- Inspect configured form IDs without submitting responses or modifying forms.
- Capture common item metadata and type-specific choices, rows, columns, scale data, and date settings where supported.
- Log a JSON snapshot and optionally persist it as a Drive JSON file.

## Constraints
- Do not modify docs/google-apps-script/Code.gs.
- Do not add doGet/doPost endpoints to the inspector.
- Do not include API secrets or response data in the snapshot.
- Form IDs for forms not already present in the repository remain configuration placeholders until supplied.
- Apps Script runtime verification requires the user to authorize Forms/Drive access in Google.

## Tasks
- [x] FORMS-INSPECTOR-001 Add the generic read-only inspector and configured form registry.
- [x] FORMS-INSPECTOR-002 Capture common and type-specific item metadata in JSON.
- [x] FORMS-INSPECTOR-003 Add optional Drive snapshot persistence without changing forms.
- [x] FORMS-INSPECTOR-004 Run local syntax/format checks and record the result.

## Acceptance criteria
- The inspector can enumerate every configured form and every item in order.
- Each item includes a stable ID, index, type, title, help text, and required state when supported.
- Choice, grid, scale, and date-specific details are included when available.
- Missing or inaccessible forms are reported per form without hiding other results.
- The existing guard-control Code.gs and frontend contract remain unchanged.

## Progress
- Added `docs/google-apps-script/FormInspector.gs` with the existing guard form configured and placeholders for the three additional form IDs.
- The inspector captures form metadata plus ordered item IDs, indexes, types, titles, help text, required state, choices, grid rows/columns, scale bounds, and date settings where supported.
- Added `saveAllFormsSnapshot()` as an optional Drive JSON export; the inspector does not expose an endpoint and never submits or edits forms.

## Verification evidence
- `npx.cmd prettier --write docs/google-apps-script/FormInspector.gs`: passed.
- `node --check` against a temporary `.js` copy: passed.
- Live Apps Script execution: pending user authorization in Google Apps Script.

## Next step
- Fill the three missing form IDs, run `inspectAllForms()` in Apps Script, and review the generated JSON before implementing individual frontend views.

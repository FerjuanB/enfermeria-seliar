# Feature: Inventory display labels

## Objective
Correct the visible equipment labels in the frontend without changing the inventory keys sent to the Google Form.

## Scope
- Preserve existing `nombre` values as integration keys.
- Add presentation-only labels for the four oxygen/manometer items.
- Use presentation labels in visible incomplete-item and annotation summaries.

## Constraints
- Do not modify `docs/google-apps-script/Code.gs` or Google Form contracts.
- Preserve expected quantities in the visible labels.

## Tasks
- [x] LABEL-001 Add presentation-only labels while preserving internal names.
- [x] LABEL-002 Render the labels throughout the frontend inventory UI.
- [x] LABEL-003 Run applicable checks and record results.

## Acceptance criteria
- The frontend shows corrected O₂/equipment labels.
- Payload keys remain byte-for-byte unchanged.
- Apps Script and Google Form require no changes.

## Progress
- Completed all implementation tasks.
- `npx tsc --noEmit`: passed.
- `npm run lint -- --no-fix`: no new errors from this feature; one pre-existing formatting error remains in `src/lib/registro-entry-ids.ts`.
- Existing internal inventory names were verified unchanged.

## Next step
- Review the frontend labels visually in the browser.

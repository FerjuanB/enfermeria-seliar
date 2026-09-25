# Published Schedule Viewer

## Objective
Make the current duty schedule published in Telegram available from the app at `/horarios`, using a single current PDF in a Google Drive folder and allowing coordinators to update it without editing or redeploying the frontend.

## Problem and Why
The schedule is currently shared in Telegram and is not centrally discoverable in the app. Coordination needs a simple Drive-based update workflow; app users need a single inline viewer.

## Scope
- Add `/horarios` with the current PDF in an inline viewer; do not add a download button or archive list.
- Read exactly one PDF from a configured Drive folder. Return clear empty/duplicate/invalid-file states instead of silently selecting an arbitrary file.
- Make the schedule viewable by anyone who can open the app. Document the Drive owner's manual setting to disable reader download/print/copy; do not change Drive permissions from application code. This cannot prevent screenshots or capture of displayed content.
- Provide a minimal setup guide for the Apps Script bridge, Drive folder, public viewing, and coordinator replacement workflow.
- Add entry points in the existing home workflow list and mobile navigation.
- Local source changes only. Do not access, create, or configure the user's Google Drive, Apps Script deployment, hosting secrets, or remote services.

## Constraints and Decisions
- One active PDF only; coordination replaces the existing file rather than keeping monthly history in this folder.
- The viewer is the only in-app action; Drive should disable reader download/print/copy for the current file, but browser/network extraction and screenshots cannot be technically prevented for public content.
- Secrets remain server-side. The browser must not receive Apps Script secrets.
- TDD mode: disabled (source: existing project task conventions; `odd/tasks/optional-form-email-copy.md`). No test runner is configured.
- Delivery strategy: `ask-on-risk` (default). Forecast: approximately 300 authored changed lines, excluding generated files; advisory only.
- Current branch is already a non-default feature branch; do not rewrite existing history.

## Authorized Scope
Implement the local app and Apps Script source/documentation needed for the public, single-current-PDF viewer. No remote deployment, Drive permission mutation, secret entry, push, or PR creation is authorized.

## Acceptance Criteria
- `/horarios` is reachable from the app's existing navigation and displays the one configured PDF inline.
- The app exposes no download action or historical-PDF list.
- The route exposes no download action; setup instructions explain how the Drive owner disables reader download/print/copy. Screenshot/technical capture limitations are documented honestly.
- Zero, multiple, or non-PDF folder contents produce explicit actionable states.
- Coordinator instructions explain how to replace the current PDF without changing its public app route or redeploying the frontend.
- Existing form/server-function behavior remains unchanged.

## Applicable Checks
- `npm.cmd run lint`
- `npm.cmd run typecheck`
- `npm.cmd run build`
- Structural readback of route, navigation, server-side secret handling, Apps Script folder validation, and setup instructions.

## Tasks
- [ ] **PSV-1 — Add single-PDF Drive bridge and server data path.** Added a dedicated `PublishedSchedule.gs` Apps Script bridge and a TanStack server function. The bridge rejects empty/multiple/non-PDF folder contents; the server forwards its secret only in a server-side POST and returns validated status, filename, and viewer URL. Structural readback confirmed the secret is not included in the client result and the existing bridge files are unchanged. Code is ready; conventional commit is pending.
- [ ] **PSV-2 — Add viewer route, navigation, and coordinator setup guide.** Added `/horarios` with the current PDF inline and no app download/archive actions; linked it from home and mobile navigation; added local Apps Script/Drive deployment and replacement steps. Typecheck and build passed; focused ESLint passed; full lint remained incomplete after stalling. Structural verification found no concrete defects. Conventional commit is pending.

## Progress and Evidence
- Exploration completed read-only. App uses TanStack file routes; `src/lib/lao.functions.ts` is the server-function pattern. Existing Apps Script code uploads Drive files but has no PDF-list endpoint. The app has no apparent authentication.
- Receipt-driven development: off (clone-local unset; global unset). No review lifecycle will be started while off.
- Both implementation tasks are present and were structurally verified. `npm.cmd run typecheck` passed again as the parent spot check. The writer reported `npm.cmd run build` and focused ESLint passed; the independent verifier confirmed no concrete defects. Full `npm.cmd run lint` did not complete after two stalled attempts and remains partial. Git staging/commit was denied by the sandbox's `.git/index.lock` protection; explicit approval is needed before committing.

## Next Step
Obtain approval for the Git metadata write, create the two work-unit commits, record their identities, and finish the local task/Engram mirror. Report full lint as partial unless a later authorized run completes.

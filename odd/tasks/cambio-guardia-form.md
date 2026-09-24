# Feature: Cambio de guardia form

## Objective
Replace the `/cambio-guardia` placeholder with a mobile-first request flow for the new Cambio de guardia Google Form schema.

## Problem
The route currently exposes only a placeholder. The new form has a complete/partial coverage branch, requester and counterpart data, dates, optional partial-replacement times, and an optional clarification.

## Why
The user approved a progressive, visually distinctive form based on the researched Laws of UX proposal.

## Scope
- Implement the Cambio de guardia route and its form interaction.
- Use an accessible radio group styled as a segmented switch for complete/partial coverage.
- Reveal partial-replacement time fields only when the partial mode is active.
- Add a progress rail, responsive sections, smooth transitions, review summary, and pending-approval confirmation.
- Preserve the existing home, navigation, guard-control workflow, and Apps Script integration.

## Constraints
- The existing guard-control form is complete and out of scope.
- Do not implement response consultation or history.
- Keep the approved visual identity; the home gradient is not required inside the form.
- Motion must respect `prefers-reduced-motion` and cannot be the only state indicator.
- TDD mode: disabled (source: current project task conventions). Checks: `npm.cmd run lint` and `npm.cmd run build`.
- Delegated implementation is required for this multi-file change. `multi_agent_v2` is enabled in the global Codex configuration and the restarted session exposes the required agent management surface.
- Repository check: the workspace is not a usable Git repository, so work-unit commit evidence is currently blocked.

## Tasks
- [x] CAMBIO-GUARDIA-001 Implement the accessible segmented mode selector and progressive form state.
- [x] CAMBIO-GUARDIA-002 Add responsive form sections, validation, transitions, review summary, and confirmation state.
- [x] CAMBIO-GUARDIA-003 Run lint/build checks and record observed results.
- [ ] CAMBIO-GUARDIA-004 Review the route on mobile and desktop widths and confirm reduced-motion behavior.

## Acceptance criteria
- `/cambio-guardia` no longer renders the placeholder.
- Complete and partial coverage are mutually exclusive and keyboard accessible.
- Partial-only fields appear and disappear without exposing irrelevant inputs.
- The form has one clear primary action per stage and a final review before submission.
- The confirmation communicates that the request was received and is pending approval.
- Existing routes and integrations remain unchanged.

## Progress
- Research and interaction proposal approved by the user.
- Task document created before source implementation.
- The Codex configuration now enables `multi_agent_v2` and the restarted session exposes `list_agents`.
- The Cambio de guardia route and mobile navigation link are implemented; the new form keeps partial replacement times optional as defined by the Forms schema.

## Verification evidence
- `rtk git status --short`: failed because the workspace is not a Git repository.
- `rtk codex features list`: `multi_agent` and `multi_agent_v2` both report `true`.
- `rtk codex doctor --summary --no-color --ascii`: configuration loaded successfully; no multi-agent configuration failure was reported.
- `rtk npm.cmd exec -- eslint src/routes/cambio-guardia.tsx src/components/SeliarMobileNav.tsx`: passed with no output.
- `rtk npm.cmd run lint`: failed on two pre-existing Prettier errors in `src/routes/index.tsx`; six existing Fast Refresh warnings remain.
- `rtk npm.cmd run build`: passed for client, SSR, and Nitro output; existing deprecation/inlineDynamicImports warnings remain.
- No work-unit commit was created because the workspace is not a usable Git repository.

## Next step
- Review the route at mobile and desktop widths and confirm reduced-motion behavior (CAMBIO-GUARDIA-004).

---
title: 'Copy the current component source with clear feedback and attribution'
type: 'feature'
created: '2026-09-17'
status: 'done'
baseline_commit: '9f718b4f000c3a4b6d1bff6c21074090edb960aa'
route: 'dispatch'
review_loop_iteration: 0
context:
  - 'C:\Projects\sahamofficial.github.io\_bmad-output\implementation-artifacts\epic-2-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Playground visitors can edit and preview supported component source, but they do not yet have a reliable way to copy the exact current source with clear, recoverable feedback and visible usage/attribution details. This weakens the learning and reuse flow for components that are meant to be inspected and reused responsibly.

**Approach:** Add a current-source copy action on each supported Playground component route. Keep the action aligned with the most recent submitted source, provide clear success/failure messages without interrupting the workflow, and surface dependency, attribution, and usage conditions in the action context or the component record so the visitor can reuse the example with confidence.

## Boundaries & Constraints

**Always:** Keep the copy action scoped to the current submitted source, visible while editing or after a preview refresh, and non-blocking for navigation or further edits. Keep the source, preview, and action surfaces distinct and accessible; announce copy status updates without moving focus unexpectedly. Preserve the static-export route and authored explanation while making dependency or attribution details visible at the action point or in the component context. Use the browser’s clipboard only when available, with a documented fallback such as Download when clipboard access is denied.

**Never:** Add server persistence, account state, or a CMS. Do not rely on popup or ad-driven recovery, hide dependencies or attribution behind invisible UI, or claim support for arbitrary JavaScript or network access beyond the documented preview boundary. Do not remove the editor, preview, error state, or Reset flow while the copy action is added.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Successful copy | Visitor has a valid supported component and selects Copy | The current submitted source is copied and a clear success message appears | No navigation or focus jump; copy status remains readable |
| Clipboard denied | Browser blocks clipboard access or returns an error | The page explains the failure and offers a recoverable alternative such as Download or selecting the source manually | Status remains visible and editor/preview remain usable |
| Attribution/dependency context | Component includes dependencies, attribution, or usage conditions | Those details remain visible in the component context and/or at the action point before or during copy | If missing, the status message explains the limitation rather than misleading the visitor |
| Dirty editor state | User changes source without running the preview | Copy continues to use the last submitted source, not a stale or partially edited draft | The page clearly communicates which source is being copied |
| Keyboard/screen-reader use | Visitor triggers Copy via keyboard or assistive technology | Control has an accessible label and status is announced without unexpected focus changes | Failure state is recoverable and readable |

</frozen-after-approval>

## Code Map

- `src/app/playground/[slug]/playground-editor.tsx` -- implement the client-side Copy action, status messaging, clipboard fallback, and current-source attribution contract for the supported component editor.
- `src/app/playground/[slug]/page.tsx` -- preserve the route structure, authored context, and dependency/usage information while integrating the copy state and action feedback into the existing detail layout.
- `src/data/components.ts` -- keep the component metadata, dependencies, limitations, and authoring context aligned with the copy action so attribution and usage conditions remain accurate and local to the source of truth.
- `src/app/globals.css` -- ensure copy/download status, action grouping, and accessibility styles remain readable, visually distinct, and consistent with the dark technical Playground UI.
- `_bmad-output\implementation-artifacts\epic-2-context.md` -- provide the story-level goal, constraints, and cross-story dependency context for the copy flow.
- `src/app/playground/page.tsx` -- preserve collection navigation while the component detail page handles action-state specifics.

## Tasks & Acceptance

**Execution:**
- [x] `src/app/playground/[slug]/playground-editor.tsx` -- wire the current submitted source into the Copy action and announce success/failure states -- keep the action aligned with the exact previewed source.
- [x] `src/data/components.ts` -- ensure each component exposes dependency, attribution, and usage conditions needed for legal and reuse-safe copy flows -- keep details close to component source definitions.
- [x] `src/app/playground/[slug]/page.tsx` -- surface the associated context and continue-link actions around the editor, preview, and source metadata -- avoid hiding important conditions behind a click path.
- [x] `src/app/globals.css` -- style success/error status and action grouping using the existing focus and dark-theme conventions -- preserve accessible contrast and responsive layout.

**Acceptance Criteria:**
- Given a visitor has selected or edited a supported component, when they activate Copy, then the copied output matches the current submitted source and includes the exact source required for the documented example.
- Given browser clipboard access is available, when copying succeeds, then the page reports success clearly without navigating away, requiring an ad click, or obscuring the editor or preview.
- Given clipboard access is denied or writing fails, when the visitor chooses Copy, then the page explains the failure and offers a recoverable alternative such as Download or selecting the source manually.
- Given a component includes attribution, dependency, or usage conditions, when the visitor copies or downloads the source, then those conditions remain visible in the action context or associated component description.
- Given a visitor uses keyboard navigation or assistive technology, when the copy status changes, then the action has an accessible name and the status announcement is clear without moving focus unexpectedly.

## Implementation Notes

- The current Playground implementation already satisfies the Story 2.5 contract: it copies the last `submittedSource` rather than the in-flight draft, exposes a visible `Download` fallback when clipboard access is unavailable, and announces status changes via the live region and accessible button group.
- Dependency and usage context remain in `src/data/components.ts` and in the detail layout, so attribution and implementation notes stay visible beside the editor and preview rather than hidden behind a separate interaction.
- The existing `RenderSafePreview` flow keeps the source/preview boundary constrained while preserving the route, Reset flow, and global navigation in the static-export app.
- Verified with `npm run build` and the existing static route matrix; the route set includes ` /playground` and `/playground/[slug]` without breaking the exported portfolio shell.

## Spec Change Log

## Review Triage Log

### Review Findings

- [x] [Review][Patch] Enforce the preview execution budget during validation and preserve specific validation failures [src/app/playground/[slug]/playground-editor.tsx:215-240] — Added budget checks to validation loops and preserved specific validation errors.
- [x] [Review][Patch] Add runtime coverage for preview failure recovery [tests/components.test.mjs:50-61] — Added executable invalid and valid rerun assertions for the preview renderer.
- [x] [Review][Patch] Add runtime coverage for execution-time-limit handling [tests/components.test.mjs:50-61] — Added executable timeout and validation-error assertions for the preview renderer.

**Rejected**

- `false` — The concern that editing the draft leaves a stale failure visible is expected behavior: the preview remains tied to the last submitted source and only changes after Run or Reset.

## Design Notes

## Verification

**Commands:**
- `npm test` -- expected: existing test suite continues to pass and component/Playground assertions remain green.
- `npm run build` -- expected: static export succeeds with the route and action intact.

**Manual checks (if no CLI):**
- Open a supported component detail route, make a valid edit, and confirm Copy uses the most recently submitted source rather than the draft.
- Simulate clipboard denial or use a browser without clipboard support and verify a clear fallback remains available.
- Confirm dependency/attribution text remains visible and that keyboard focus and status announcements remain usable.

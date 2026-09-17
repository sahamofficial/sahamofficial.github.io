---
title: 'Story 2.4: Recover from invalid, unsafe, unsupported, timed-out, or failed previews'
type: 'feature'
created: '2026-09-16'
baseline_commit: 'c293f7c89f2a9f2d44c42839383f08c68d411021'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
context:
  - '{project-root}/src/app/playground/[slug]/playground-editor.tsx'
  - '{project-root}/src/app/playground/[slug]/page.tsx'
  - '{project-root}/src/data/components.ts'
  - '{project-root}/_bmad-output/implementation-artifacts/epic-2-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The Playground currently validates source before previewing, but it does not yet present a durable recovery experience when the source is invalid, unsafe, unsupported, timed out, or otherwise fails. Without that recovery path, a broken edit can leave the editor and preview in a confusing state and undercut the trust goal of the Playground.

**Approach:** Add an explicit, recoverable preview-error state that preserves the editor, status messaging, and reset flow while clarifying why a preview was rejected and what the visitor can do next.

## Boundaries & Constraints

**Always:**
- Keep the Playground usable when preview execution fails, including editing, reset, browsing back to the collection, and reading component context.
- Preserve the existing safe-by-default preview boundary: no arbitrary script execution, unrestricted browser access, credentials, network calls, or unsupported dependencies.
- Maintain semantic labels, focus states, and status messaging so the failure state remains understandable to keyboard and screen-reader users.
- Keep recovery actions visible and non-destructive; Reset or re-edit must restore a usable baseline without removing the context route.

**Never:**
- Do not allow arbitrary JavaScript, external CSS, network access, credential use, or unsupported tags to pass the preview boundary.
- Do not hide the error state behind a spinner or suppress the reason behind a failed preview.
- Do not remove or rename the editor, source, preview, or navigation controls that Story 2.3 established.
- Do not broaden the accepted preview contract beyond the component’s documented source type and limitations.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| HAPPY_PATH | Valid source is entered and Run is clicked | Preview renders inside the constrained iframe and status text confirms the preview is active | N/A |
| INVALID_SOURCE | Source exceeds char or line limits, contains a disallowed tag, or misses required structure | Preview is blocked, a clear reason is surfaced, and the user can keep editing or reset to the canonical example | Show a specific reason such as character limit, unsupported tag, or invalid structure |
| UNSAFE_SOURCE | Input contains script/event-handler/network/browser APIs or executable URLs | Preview is rejected before execution, with the editor left intact and no unsafe behavior executed | Announce the rejection in the status area and keep recovery controls available |
| TIMEOUT | Render exceeds the per-component execution budget | Preview fails gracefully and displays a timeout explanation rather than hanging or leaving blank output | Preserve the last valid source and provide a Reset path |
| FAILED_RENDER | The component or preview logic throws or returns an unusable result | The preview area shows a recoverable error state and existing navigation remains usable | Status description informs the user how to recover without leaving the route |
| EMPTY_OR_UNSUPPORTED | Source is blank, incomplete, or uses a documented unsupported pattern | The preview remains empty or blocked with an explanatory status, while the component context and editor remain visible | Offer Reset and a return path back to the collection |

</frozen-after-approval>

## Code Map

- `src/app/playground/[slug]/playground-editor.tsx` -- Primary preview validation, failure messaging, rendering boundary, editor state, and recovery actions.
- `src/app/playground/[slug]/page.tsx` -- Route-level component context and fallback handling around incomplete or unpublishable records.
- `src/data/components.ts` -- Supported source formats, preview limits, dependencies, and per-component usage metadata that define the failure states.

## Tasks & Acceptance

**Execution:**
- [ ] `src/app/playground/[slug]/playground-editor.tsx` -- Add explicit error-state handling for preview rejection and timeouts without removing the current editor or recovery actions.
- [ ] `src/app/playground/[slug]/playground-editor.tsx` -- Keep Reset, edit state, and route navigation available as the primary recovery path after a failed preview.
- [ ] `src/data/components.ts` -- Confirm each component’s documented preview limit and unsupported patterns align with the failure states surfaced in UI.
- [ ] `src/app/playground/[slug]/page.tsx` -- Preserve the detail-route context text and return-to-collection flow when a preview fails or a component is incomplete.

**Acceptance Criteria:**
- Given a visitor enters invalid, unsafe, unsupported, or timed-out source in a Playground component, when they click Run, then the preview is rejected with a clear, user-facing explanation and the editor remains usable.
- Given a preview failure occurs, when the visitor inspects the page, then the status message identifies the failure class and provides a direct recovery action such as Reset or editing to restore a supported example.
- Given a preview error is triggered, when the user uses keyboard navigation or screen readers, then focus stays on meaningful controls and the status/error message is announced without losing context or navigation.
- Given the preview boundary denies a disallowed capability, when the user attempts a run, then the page does not execute network calls, scripts, browser APIs, or unsupported resources outside the documented contract.
- Given the component detail route is visited with incomplete or failed state, when the route loads, then the context, explanation, and return navigation remain useful instead of presenting a blank or misleading preview.

## Implementation Notes

## Verification

**Commands:**
- `npm run build` -- expected: static export succeeds and no client-side bundle/build errors are introduced by the Playground recovery changes.

**Manual checks:**
- Confirm invalid HTML/React source returns a clear inline failure message and keeps the editor usable.
- Confirm Reset restores the original component source and re-enables a valid preview path.
- Confirm keyboard navigation still reaches the editor, Run, Reset, and collection-return links after a rejected preview.

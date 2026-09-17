---
title: 'Edit supported component source and render a constrained live preview'
type: 'feature'
created: '2026-09-14'
status: 'done'
baseline_commit: 'c293f7c89f2a9f2d44c42839383f08c68d411021'
route: 'dispatch'
review_loop_iteration: 0
context:
  - 'C:\Projects\sahamofficial.github.io\_bmad-output\implementation-artifacts\epic-2-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Playground detail pages identify source and preview areas but do not let visitors safely change supported component source or see the current result. This limits the Playground's value as a learning and evaluation surface.

**Approach:** Add browser-scoped editor state and an explicit Run/Reset workflow to supported component detail pages. Render only documented HTML/CSS and React examples inside a constrained preview boundary with clear limits and failure-safe controls, using a narrowly allowlisted, dependency-free renderer/transformation for the existing React example, while preserving the static-export route, authored explanation, navigation, and later Copy/Download integration points.

## Boundaries & Constraints

**Always:** Keep source definitions local, typed, and static-export compatible. Distinguish editor, rendered output, Run, Reset, Copy, and Download surfaces semantically and visually. Render the current edited source only after an explicit Run, preserve the last known result while editing, and keep Reset/navigation/explanation usable in every preview state. Enforce a documented allowlist of formats and dependencies plus code, resource, capability, and time limits; isolate preview content from credentials, unrelated page content, unrestricted browser capabilities, and unrestricted network access.

**Never:** Add a CMS, server state, authentication, persistence, arbitrary JavaScript execution, arbitrary languages/frameworks, unrestricted network access, or a dependency that requires server rendering. Do not implement Story 2.4's complete recovery matrix or Story 2.5's final copy/download behavior beyond compatible controls and state contracts.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Initial editor | Supported component route loads | Editor contains the canonical source, preview shows the canonical result, and actions are distinct | Unsupported/incomplete records retain the existing unavailable state |
| Valid edit | Visitor changes allowed HTML/CSS or React source and selects Run | Preview reflects exactly the current submitted source, not stale source | Invalid or unsupported input produces an announced recoverable status |
| Reset | Edited source or failed preview exists and Reset is selected | Source and preview return to the known component example | Controls and navigation remain usable |
| Boundary rejection | Source exceeds limits or requests denied capability/dependency | Preview does not run unsafe content and explains the limitation | Editor, Reset, navigation, and authored explanation remain available |
| Reload/leave | Visitor reloads or navigates away | Route remains functional without server or account state | No persistence or misleading claim of saved work |

</frozen-after-approval>

## Code Map

- `src/data/components.ts` -- extend the typed component records with canonical editable source, supported format/dependency metadata, and preview limits; reuse `getComponentBySlug`, `isComponentComplete`, and `publishedComponents`.
- `src/app/playground/[slug]/page.tsx` -- preserve static route generation, metadata, explanation, and unavailable recovery while replacing read-only source/preview placeholders with the interactive surface.
- `src/app/playground/[slug]/` -- add a client-side editor/preview boundary with browser-scoped state, explicit Run/Reset actions, current-source handling, and safe failure/status contracts.
- `src/app/globals.css` -- add editor, preview, action-group, status, and responsive styles using existing Playground tokens and focus-visible conventions.
- `tests/components.test.mjs` -- extend the existing Node test/data-transpilation pattern for editable source contracts, supported formats, route wiring, and safety-limit declarations.
- `package.json` -- use only existing Next/React/Node capabilities unless a dependency is proven necessary and compatible with static export.
- `_bmad-output/implementation-artifacts/spec-2-2-explain-each-component-with-original-usage-and-dependency-context.md` -- preserve prior data completeness, explanation, dependency, and recovery decisions.

## Tasks & Acceptance

**Execution:**
- [x] `src/data/components.ts` -- define validated canonical editable sources and explicit supported preview constraints -- provide one safe static source of truth.
- [x] `src/app/playground/[slug]/` and `src/app/playground/[slug]/page.tsx` -- implement the client editor/preview workflow and integrate it without breaking static routes or recovery -- make current edits observable and recoverable.
- [x] `src/app/globals.css` -- style the editor, rendered output, actions, status, and responsive layout -- preserve the existing dark technical system and keyboard focus.
- [x] `tests/components.test.mjs` -- test data contracts, supported formats, source freshness, reset wiring, and boundary declarations -- prevent stale or unrestricted preview behavior.

**Acceptance Criteria:**
- Given a supported component opens, when the detail page renders, then editor, preview, Run, Reset, Copy, and Download surfaces are distinct and keyboard-operable.
- Given valid supported source is edited and Run is selected, when preview updates, then the rendered output reflects the current submitted source rather than the initial source.
- Given source is edited without Run, when the visitor inspects the preview, then the last submitted result remains stable and the editor retains the draft.
- Given preview code requests unsupported syntax, dependencies, capabilities, or exceeds declared limits, when execution is attempted, then unsafe content is rejected with a usable status and no access to credentials, unrelated page content, or unrestricted browser capabilities.
- Given the route is reloaded or the visitor leaves it, when the page renders again, then no server-side or persistent account state is required.

## Implementation Notes

- Added typed editable source definitions and explicit format, dependency, tag, character, and line limits for the published HTML/CSS and React examples.
- Added a client-side editor with draft/submitted source separation, explicit Run and Reset behavior, safe allowlisted React transformation, HTML/CSS tag and capability checks, sandboxed `srcDoc` preview rendering, Copy and Download action contracts, and live status messaging.
- Replaced the detail route placeholders and collection copy with the interactive Playground surface while preserving static route generation, authored explanation, recovery, and global navigation.
- Added responsive editor, preview, action, constraint, and status styling; allowed the canonical HTML example's `style` tag through its declared boundary.
- Review fixes reject CSS resource loads and executable attributes, honor per-record limits, preserve route-local state through keyed editor remounts, delay download URL revocation, and reject React source that leaves the documented structure.
- `npm test` and `npm run build` pass. The repository-wide `npm run lint` remains blocked by 171 pre-existing errors and 1,729 warnings across legacy/vendor files; targeted ESLint for the changed application files passes.

## Verification

**Commands:**
- `npm test` -- expected: existing and new component/editor contract tests pass.
- `npm run lint` -- expected: no new lint errors.
- `npm run build` -- expected: static export succeeds and includes Playground collection/detail routes.

**Manual checks (if no CLI):**
- Open both published component routes, edit, Run, Reset, and verify keyboard focus, mobile stacking, and clear status messaging.
- Confirm unsupported or over-limit input cannot escape the preview boundary and that the route remains navigable.

## Review Triage Log

- patch — Static export assertions covered labels but not draft/submitted/reset contracts; added focused source-contract assertions for state separation and reset behavior.
- patch — Preview safety checks were not represented in tests; added assertions for sandboxing, unsafe-input guards, and declared render limits.
- patch — HTML/CSS accepted external CSS resource references; reject `@import`, `url()`, and `expression()`.
- patch — Allowed HTML tags were not enough to constrain executable attributes; reject event-handler and executable URL attributes.
- patch — React source outside the parsed feature array could be silently ignored; require the documented component structure before rendering.
- patch — Hardcoded React/HTML limits could diverge from component metadata; use each record's declared limits.
- patch — Blob URLs were revoked immediately after click; defer revocation to the next task.
- patch — Editor state could persist across reused dynamic-route instances; key the editor by component slug.

### Review Findings
- [x] [Review][Patch] Downloaded blob is revoked too soon [src/app/playground/[slug]/playground-editor.tsx:103-110] — the click handler creates a blob URL, triggers the anchor click, and then revokes the object with a 0 ms timeout. Some browsers cancel or truncate the in-flight download before the click is fully processed, so the action can fail even though the file was generated successfully.

# Epic 2 Context: Interactive Component Playground

<!-- Compiled from planning artifacts. Edit freely. Regenerate with compile-epic-context if planning docs change. -->

## Goal

Create a useful, trustworthy Playground where visitors can browse original front-end components, open stable detail routes, understand each example and its usage conditions, safely experiment with supported HTML/CSS and React source, and copy the current implementation. The experience should remain valuable when previews or dependencies fail, preserve portfolio navigation, and keep interactive content separate from advertising.

## Stories

- Story 2.1: Browse the component collection and stable detail routes
- Story 2.2: Explain each component with original usage and dependency context
- Story 2.3: Edit supported component source and render a constrained live preview
- Story 2.4: Recover from invalid, unsafe, unsupported, timed-out, or failed previews
- Story 2.5: Copy the current component source with clear feedback and attribution
- Story 2.6: Make Playground states and actions accessible and responsive

## Requirements & Constraints

- Publish a scannable component collection showing each component’s title, purpose, supported technology, and relevant usage context.
- Give every published component a stable, deep-linkable detail route with source, preview, explanation, and a path back to the collection and global navigation. Unavailable or incomplete components need an informative, recoverable state.
- Support selected HTML/CSS and React examples only; distinguish the editor, rendered output, and Run, Reset, Copy, and Download actions.
- Preview execution must have explicit code, resource, and time limits and must deny credentials, unrelated page content, and unrestricted browser capabilities. Invalid, unsafe, unsupported, timed-out, crashed, and unavailable-dependency states must leave navigation, editing, Reset, and explanatory content usable.
- Copy and download actions must use the current source, provide non-blocking success or failure feedback, and expose attribution, dependencies, or usage conditions at the action point or in the component context. Clipboard failure needs a usable alternative where supported.
- Component pages need original authored purpose, implementation notes, intended use, supported technology, limitations, and dependency context so the page remains useful without a live preview.
- Keep advertising visually and behaviorally separate from navigation, editors, previews, errors, copy, and downloads; ads must not obstruct controls or serve as recovery actions.
- Preserve semantic labels, logical keyboard focus, visible focus, status/error announcements, readable hierarchy, and usable layouts across desktop, tablet, mobile, zoom, and assistive technology. Avoid accidental horizontal scrolling.

## Technical Decisions

- Keep Playground routes compatible with the project’s Next.js static export. Do not require server rendering, a database, authentication, or persistent account state.
- Store published component definitions, source, explanatory content, and metadata as local static content or a small shared data module; do not introduce a CMS or query layer.
- Keep user editing and preview state lightweight and browser-scoped. A reload or route change must not depend on server-side persistence.
- Preserve the shared layout, global navigation, and any legacy DOM contracts consumed by browser-only scripts. Browser integrations must initialize after hydration and guard browser globals.
- The preview boundary is a security requirement, not an unrestricted code runner: support only the documented source formats and dependencies, with explicit limits and denied capabilities. Do not imply support for arbitrary languages, frameworks, JavaScript, or network access beyond the agreed MVP contract.

## UX & Interaction Patterns

- Use the site’s dark, technical visual language: clear headings, readable secondary text, cyan action/focus emphasis, restrained geometry, and monospace-style metadata.
- Organize collection, component purpose, source/editor, preview, explanatory content, and return navigation with clear hierarchy rather than hidden interactions or ad-dependent discovery.
- Treat empty, loading, success, and failure states as first-class content with an understandable status and an obvious next action. Keep recovery controls visible and separate from secondary content.
- Use direct, capable, original microcopy; explain limitations without making the live preview the sole source of value.
- Reflow from multi-surface desktop layouts to stacked tablet and single-column mobile layouts with accessible tap targets and no loss of action grouping.

## Cross-Story Dependencies

- Story 2.1 establishes the collection, stable routes, component identity, and return path needed by the detail, explanation, editor, and action stories.
- Story 2.2’s authored metadata and usage/dependency context must be available before Copy or Download actions in Story 2.5.
- Story 2.3 defines the editor and preview state that Stories 2.4 and 2.5 operate on; Story 2.4’s failure and recovery behavior must not remove Story 2.3’s controls.
- Story 2.6 applies across every collection, detail, editor, preview, action, and recovery state and depends on the shared portfolio shell remaining available.

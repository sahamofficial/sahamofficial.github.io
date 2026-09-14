---
title: 'Browse the component collection and stable detail routes'
type: 'feature'
created: '2026-09-14'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
baseline_commit: 'dd392465938585fc42d475ac55e2d22c7eb81e52'
context:
  - 'C:\Projects\sahamofficial.github.io\_bmad-output\implementation-artifacts\epic-2-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The portfolio has no Playground collection where visitors can discover front-end examples or revisit a specific component through a stable, shareable URL. Without a collection and dependable detail routes, component work cannot provide useful comparison, context, or a foundation for later editing and preview capabilities.

**Approach:** Add a static Playground collection backed by local typed component definitions and a generated detail route for each published component. Each route will identify the component, show authored purpose and usage context, reserve clearly labeled source and preview surfaces, preserve the global portfolio shell, and provide an informative recovery path when a component is unavailable.

## Boundaries & Constraints

**Always:** Preserve the static-export App Router and shared shell/navigation contracts. Use local static content with typed records and deterministic route generation. Keep collection cards scannable and expose title, purpose, supported technology, and usage context. Keep detail pages useful without a live preview and provide visible collection and global-navigation return paths. Preserve theme tokens, responsive layouts, semantic landmarks, visible focus, and legacy browser-script compatibility.

**Never:** Add a CMS, backend, database, authentication, runtime persistence, or server-rendered dependency. Do not execute arbitrary user code or implement the editor, preview security limits, recovery engine, copy/download behavior, or later Playground stories beyond compatible placeholders and data fields. Do not alter existing portfolio project routes or remove legacy DOM hooks.

**Decisions:** Publish a small curated set of concrete examples in this story so the first Playground is immediately useful. Use `/playground` for the collection and `/playground/[slug]` for stable component detail routes.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Collection load | Visitor opens Playground | Scannable cards show each published component's identity, purpose, technology, and usage context | Static content remains readable if optional enhancement scripts are unavailable |
| Detail navigation | Visitor selects a published card or opens its deep link | Stable detail route identifies the component and exposes authored context, source area, preview area, and return links | Unknown slugs resolve to an informative not-found/recovery state with a route back to the collection |
| Incomplete component | A published record lacks required detail content | Page explains that the component is unavailable or incomplete rather than showing misleading empty output | Collection and global navigation remain usable |

</frozen-after-approval>

## Code Map

- `src/app/layout.tsx` -- shared header, navigation, footer, theme wiring, and stable DOM contracts; extend the global destination without creating a competing shell.
- `src/app/portfolio/page.tsx` -- existing static collection/card composition pattern to reuse for scannable Playground cards.
- `src/app/portfolio/[slug]/page.tsx` -- established deep-linkable dynamic route pattern including `generateStaticParams`, static-only routing, metadata, breadcrumbs, related links, and `notFound`.
- `src/data/projects.ts` -- typed local-data pattern; create a separate component data module rather than mixing Playground records with portfolio projects.
- `src/app/globals.css` and `public/assets/css/` -- existing theme tokens and responsive visual conventions; reuse compatible styles and avoid unrelated theme changes.
- `public/assets/js/navigation-state.js` and `tests/navigation-state.test.mjs` -- pathname-based active navigation and shell behavior; preserve contracts and extend coverage only for the new global destination if needed.
- `src/app/sitemap.ts` -- static route enumeration; add Playground collection/detail URLs when routes exist.

## Tasks & Acceptance

**Execution:**
- [x] `src/data/components.ts` -- define typed published component records, stable slugs, collection metadata, authored context, and compatible source/preview fields -- provide one local source of truth for generated routes and later Playground stories.
- [x] `src/app/playground/page.tsx` -- render the collection with scannable cards and return/navigation context -- satisfy collection discovery without runtime state.
- [x] `src/app/playground/[slug]/page.tsx` -- generate static detail routes and metadata, render component identity/context/source/preview regions, and handle unknown or incomplete records -- make each component deep-linkable and recoverable.
- [x] `src/app/layout.tsx`, `src/app/globals.css`, and `src/app/sitemap.ts` -- add the Playground destination, compatible responsive styling, and exported URLs -- wire the feature into shared navigation and static discovery without breaking existing routes.
- [x] `tests/` -- add focused route/data contract coverage where the existing test runner supports it -- verify stable slugs, published records, and unknown-route handling.

**Acceptance Criteria:**
- Given a visitor opens Playground, when the collection loads, then every published component appears as a scannable card with title, purpose, supported technology, and usage context.
- Given a visitor selects or directly opens a published component, when its stable detail route renders, then the page identifies the component, exposes source and preview areas, preserves the global shell, and offers a usable return path to the collection.
- Given a visitor opens an unknown or incomplete component, when the route is resolved, then the page provides an understandable unavailable state and a route back to the collection instead of blank or misleading content.
- Given a visitor uses desktop, tablet, mobile, keyboard navigation, or a missing optional browser enhancement, when the collection or detail route renders, then content and essential navigation remain usable with visible focus and no reliance on enhancement scripts.

## Implementation Notes

## Spec Change Log

## Review Triage Log

- false — `src/app/playground/[slug]/page.tsx` unknown slugs would not reach the nested static not-found page for arbitrary static-export URLs; the added global `src/app/not-found.tsx` now provides a recoverable fallback with Playground and portfolio links.
- patch — `src/data/components.ts` and `src/app/playground/[slug]/page.tsx` did not guard malformed source/preview/limitations fields; completeness now rejects missing or empty fields before rendering the detail surface.
- patch — `src/data/components.ts` and `src/app/playground/[slug]/page.tsx` omitted dependency context; published records now include and display concise dependency information.
- patch — `src/app/playground/page.tsx` rendered an unexplained empty grid when no records were published; it now renders a status message and portfolio recovery link.
- patch — `tests/components.test.mjs` relied only on source-text matching; it now transpiles and executes the component data contract and adds checks for empty-state, recovery, dependency, and sitemap wiring.
- false — `tests/components.test.mjs` lacked integration checks for navigation and sitemap behavior; the updated test suite checks sitemap wiring, while the existing navigation-state suite covers the shared navigation contract, and the production build verifies exported routes.
- false — The detail source and preview surfaces are intentionally read-only placeholders; the approved intent explicitly reserves these regions for later editor and preview stories rather than requiring execution in Story 2.1.

## Verification

**Commands:**
- `npm test` -- expected: existing and new route/data contract tests pass.
- `npm run lint` -- expected: no lint errors.
- `npm run build` -- expected: static export succeeds and includes Playground collection/detail routes.

### Review Findings

- [x] [Review][Patch] Keep the global 404 recovery copy route-agnostic [src/app/not-found.tsx:9-12]
- [x] [Review][Patch] Apply one complete-record policy to collection and sitemap consumers [src/data/components.ts:67-93; src/app/playground/page.tsx:20-35; src/app/sitemap.ts:21-23]
- [x] [Review][Patch] Replace source-text route checks with executable route and export verification [tests/components.test.mjs:40-75]
- [x] [Review][Patch] Validate published slug contracts from runtime data rather than matching every source literal [tests/components.test.mjs:15-19]

#### Rejected

- `false` — `getComponentBySlug` searches all records, but the detail route uses `dynamicParams = false` and `generateStaticParams` from `publishedComponents`, so unpublished slugs are not reachable through this static route.
- `false` — The acceptance auditor reported no spec or acceptance-criteria violations.
- `incomplete review layer` — The Edge Case Hunter returned no findings; the review may be incomplete for edge-case coverage.

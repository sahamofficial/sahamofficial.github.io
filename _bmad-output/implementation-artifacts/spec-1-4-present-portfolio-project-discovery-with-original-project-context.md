---
title: 'Present portfolio project discovery with original project context'
type: 'feature'
created: '2026-09-10'
status: 'done'
baseline_commit: 'a273060bb76a590746a2e594caa4bb036bc3570f'
route: 'dispatch'
review_loop_iteration: 0
context:
  - 'C:\Projects\sahamofficial.github.io/_bmad-output/implementation-artifacts/epic-1-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The Portfolio route and Home portfolio section expose work samples, but their cards use duplicated, minimal metadata and do not provide stable detail paths or enough authored context for a visitor to understand purpose, outcome, and limitations beyond an image or demo.

**Approach:** Establish one local, grounded project collection shared by the Portfolio route, Home discovery section, and static project detail routes. Give each project a scan-friendly card and an authored detail page with purpose, implementation context, technology/category metadata, limitations, related-work navigation, and a clear Contact path while preserving the existing portfolio hooks and static architecture.

## Boundaries & Constraints

**Always:** Keep project content local and authored from repository-supported facts; preserve `#portfolio`, `.portfolio`, `.isotope-layout`, `.isotope-container`, `.isotope-item`, filter classes, lightbox hooks, stable asset paths, and the Win11 theme contract; keep detail routes statically exportable with stable slugs; make titles, descriptions, metadata, links, headings, focus states, and mobile layouts accessible; keep useful content and navigation available when optional previews, APIs, or scripts are unavailable.

**Never:** Add a CMS, backend, database, runtime API, authentication, or project claims not supported by the repository; make a demo or third-party service required to understand a project; remove legacy gallery/filter behavior or create ambiguous nested interactive controls; expand into the Playground, Weather, Contact, legal, or ad stories.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Portfolio discovery | Visitor opens `/portfolio` | Cards show title, concise description, purpose/outcome framing, category, stack, image, and a stable detail link | Local authored content remains complete without a preview |
| Detail reading | Visitor opens a published project slug | Detail page shows original explanation, implementation/usage context, relevant limitations, related project links, and Contact/Portfolio actions | Unknown slugs resolve through the static route contract without a client-only lookup |
| Home compatibility | Visitor uses Home filters or lightbox | Existing section IDs, data attributes, filter classes, gallery hooks, and image behavior remain functional | Optional Isotope/GLightbox absence does not remove project text or route links |
| Narrow or keyboard view | Mobile, zoomed, or keyboard navigation | Metadata reflows, links remain tappable, focus is visible, and no nested card interaction is ambiguous | Layout remains readable without horizontal scrolling |

</frozen-after-approval>

## Code Map

- `src/app/portfolio/page.tsx` -- replace the private project array with shared local data and render accessible discovery cards with purpose, category, stack, image, and detail links.
- `src/app/page.tsx` -- preserve the Home portfolio section and all legacy isotope/lightbox hooks while aligning its five project entries and accessible links with shared project data.
- `src/app/portfolio/[slug]/page.tsx` -- add statically generated detail routes with authored context, limitations, related-work links, and conversion navigation.
- `src/data/projects.ts` -- add the typed local project model and five grounded project records reused by all project surfaces.
- `src/app/sitemap.ts` -- include each published detail URL from the shared project collection.
- `src/app/globals.css` and `public/assets/css/main.css` -- reuse existing portfolio tokens and selectors; add only focused card/detail responsive and focus rules.
- `public/assets/js/main.js` and `public/assets/js/theme-win11.js` -- preserve isotope, GLightbox, `#portfolio`, and Win11 relocation contracts; do not make enhancements required for content.
- `_bmad-output/implementation-artifacts/epic-1-context.md` -- source of static-export, accessibility, legacy-contract, and content constraints.

## Tasks & Acceptance

**Execution:**
- [x] `src/data/projects.ts` -- define the shared typed project records, stable slugs, grounded purpose/outcome wording, categories, stacks, images, authored detail sections, limitations, and related slugs.
- [x] `src/app/portfolio/page.tsx` and `src/app/page.tsx` -- render discovery surfaces from shared data while retaining required Home DOM hooks, filters, lightbox behavior, and clear accessible navigation.
- [x] `src/app/portfolio/[slug]/page.tsx` -- implement static detail pages with `generateStaticParams`, metadata, semantic headings, original context, fallback messaging, related links, and Contact/Portfolio actions.
- [x] `src/app/sitemap.ts` -- add detail URLs from the same data source.
- [x] `src/app/globals.css` and narrowly related legacy/theme styles -- provide responsive, readable, focus-visible card/detail presentation without breaking alternate themes.
- [x] Existing validation surfaces -- run lint and `npm run build`; inspect generated routes and sitemap output.

**Acceptance Criteria:**
- Given a visitor opens Portfolio, when the collection renders, then every published project has a meaningful title, short description, purpose or outcome framing, technology/category metadata, image, and stable detail path.
- Given a visitor opens a project detail route, when the content is read, then it provides original explanation, implementation or usage context, relevant limitations, related-work navigation, and a next useful Contact or Portfolio action.
- Given a preview, API, or enhancement is unavailable, when a project page is opened, then authored content and navigation remain usable and no advertisement is presented as a control.
- Given a visitor uses Home filters, keyboard navigation, assistive technology, mobile layout, or an alternate theme, when project cards are displayed, then legacy hooks remain intact, links have clear names, focus is visible, metadata is scannable, and controls do not create ambiguous nested interactions.

## Implementation Notes

- Added `src/data/projects.ts` as the single local source for five grounded project records, detail content, limitations, and related slugs.
- Reused the project records across Home, Portfolio, static detail routes, and sitemap output while preserving isotope, GLightbox, `#portfolio`, and Win11 contracts.
- Added static project pages with authored context, fallback-safe content, related work, and Contact/Portfolio actions.
- Added responsive theme-aware discovery/detail presentation, native filter fallback, and keyboard-visible lightbox controls.
- Lint completed with two pre-existing image optimization warnings; the static export and generated route/sitemap contract audit passed.

## Review Triage Log

| Finding | Verdict and evidence |
|---|---|
| Default primary CTA contrast | **defer** -- shared button-token contrast predates Story 1.4 and is outside the project-discovery change. |
| Win11 primary CTA contrast | **defer** -- shared Win11 token contrast predates Story 1.4 and is outside the project-discovery change. |
| Theme-specific button hover contrast | **defer** -- alternate-theme link rules are shared-shell styling outside this story and were not introduced by the project routes. |
| Keyboard focus can leave the Home lightbox control hidden | **patch** -- added `:focus-within` so the optional preview control becomes visible and operable when focused. |
| Home filters depend on Isotope for filtering | **patch** -- added native `hidden` filtering from the React state while retaining the existing Isotope data hooks. |
| Segment-level custom not-found page is unreachable with static params | **patch** -- removed the dead custom fallback; static export now uses the generated not-found contract without shipping misleading unreachable code. |
| Invalid related slugs are silently filtered | **false** -- every current record has valid related slugs and at least two related projects; no empty section is reachable in this change. |
| New sitemap entries use an old modification date | **patch** -- updated the shared date to the current content date, 2026-09-10. |
| About focus cards lack concrete proof | **defer** -- this is Story 1.3 credibility content, not caused by Story 1.4 project discovery. |
| Education section lacks formal credentials | **defer** -- this is pre-existing Story 1.3 content outside the current story. |
| Theme storage is absent from privacy content | **defer** -- this is pre-existing shared privacy policy scope outside project discovery. |
| Implementation Notes were empty | **patch** -- recorded the shared-data, route, fallback, accessibility, and verification decisions for handoff. |
| Deferred-work heading structure | **defer** -- pre-existing BMAD artifact formatting outside the shipped feature. |
| Duplicate Story 1.3 deferred-work heading | **defer** -- pre-existing BMAD artifact content outside the shipped feature. |
| Absolute local paths in implementation artifacts | **defer** -- pre-existing workflow artifact convention outside the shipped feature. |
| Story 1.3 status does not match its completed tasks | **defer** -- unrelated prior-story tracking state. |
| Portfolio active navigation is unverified on detail routes | **defer** -- shared navigation behavior predates this story and requires browser-level coverage. |
| Late vendor loading may miss portfolio enhancement initialization | **defer** -- pre-existing optional-script timing behavior outside the project route change. |
| Optional vendor globals may be non-callable | **defer** -- shared legacy initialization behavior outside this story. |
| Tablet navigation state lacks runtime verification | **defer** -- no browser test runner exists and the behavior is pre-existing shared-shell scope. |
| Active route and hash-scrollspy behavior lacks runtime verification | **defer** -- no browser test runner exists and the behavior is pre-existing shared-shell scope. |
| Persisted theme startup lacks runtime verification | **defer** -- no browser test runner exists and the behavior is pre-existing shared-shell scope. |
| AOS fallback lacks runtime verification | **defer** -- no browser test runner exists and the behavior is pre-existing shared-shell scope. |

## Verification

**Commands:**
- `npx eslint src/app/portfolio/page.tsx src/app/portfolio/[slug]/page.tsx src/data/projects.ts src/app/sitemap.ts` -- expected: no errors.
- `npm run build` -- expected: static export completes and emits `/portfolio/` plus every project detail route.

**Manual checks (if no CLI):**
- Inspect Home and Portfolio at desktop/mobile widths, keyboard focus, alternate themes, and with optional scripts unavailable; confirm project detail links, related links, Contact path, and sitemap entries remain usable.

### Review Findings

- [x] [Review][Patch] Return keyboard focus to the navigation toggle after a mobile navigation link closes the menu [public/assets/js/main.js:72-78]
- [x] [Review][Patch] Include project purpose or outcome context in Home portfolio cards [src/app/page.tsx:322-350]
- [x] [Review][Patch] Give each Home and Portfolio project-detail link a project-specific accessible name [src/app/page.tsx:347-349; src/app/portfolio/page.tsx:34-36]
- [x] [Review][Defer] Add browser-level regression coverage for Home filters [src/app/page.tsx:302-327] — deferred: the repository has no browser or unit test runner; lint and static build cannot exercise filter state or native visibility.
- [x] [Review][Defer] Add a static contract assertion for every generated project detail page [src/app/portfolio/[slug]/page.tsx:13-111] — deferred: the repository has no existing test harness for exported HTML contracts.
- [x] [Review][Defer] Add runtime coverage for mobile navigation semantics and visibility [src/app/layout.tsx:90; public/assets/js/main.js:16-41; public/assets/css/soft-light.css:234-247] — deferred: browser-level accessibility coverage is unavailable and this shared-shell behavior predates the story.
- [x] [Review][Defer] Add runtime coverage for active-route and hash-scrollspy synchronization [public/assets/js/main.js:48-82,293-322] — deferred: browser-level route-transition coverage is unavailable and this shared-shell behavior predates the story.
- [x] [Review][Defer] Execute optional-enhancement fallback paths in verification [public/assets/js/main.js:131-241] — deferred: browser fallback coverage is unavailable and the optional-script behavior is shared infrastructure.
- [x] [Review][Defer] Make late GLightbox and Isotope loading reinitialize enhancements [public/assets/js/main.js:199-241] — deferred: optional vendor timing is shared legacy infrastructure outside this story.
- [x] [Review][Defer] Derive `index-page` and `data-page` from the active route [src/app/layout.tsx:82] — deferred: this is pre-existing shared route-shell behavior outside the project-discovery change.
- [x] [Review][Defer] Provide a no-JavaScript navigation fallback [public/assets/css/soft-light.css:234-247] — deferred: this is pre-existing shared-shell behavior outside this story.
- [x] [Review][Defer] Align metadata with the current portfolio content [src/app/layout.tsx:7-26] — deferred: shared metadata predates this story.
- [x] [Review][Defer] Document all globally loaded external services in the privacy policy [src/app/privacy-policy/page.tsx:17-47] — deferred: shared privacy and data-flow scope outside this story.
- [x] [Review][Defer] Disclose localStorage theme preference in the privacy policy [src/app/privacy-policy/page.tsx:42-47] — deferred: shared privacy scope outside this story.
- [x] [Review][Defer] Add concrete proof to About focus areas [src/app/about/page.tsx:30-45] — deferred: Story 1.3 content outside this review.
- [x] [Review][Defer] Add verified education and experience chronology [src/app/page.tsx:254-275] — deferred: Story 1.3 content outside this review.
- [x] [Review][Defer] Reconcile Story 1.3 sprint status and deferred-work formatting [sprint-status.yaml:41; deferred-work.md] — deferred: workflow artifacts outside this story.
- [x] [Review][Defer] Replace absolute paths in implementation artifacts [spec-1-1...md; deferred-work.md] — deferred: pre-existing workflow artifact convention outside this story.

#### Rejected

- `false` — The claim that project records lack provenance is disproved by the explicit local-study framing and limitations in `src/data/projects.ts`.
- `false` — The claimed fixed `waitForRoute` retry loop does not exist in the changed `public/assets/js/main.js`; navigation uses direct synchronization and two bounded timers.
- `low` — A non-callable optional vendor global or non-callable `requestAnimationFrame` could throw, but those malformed globals are unlikely in ordinary use and fixing them would add guards for an unshown state.
- `low` — A generic `aria-label` on the social-links `<div>` is a minor semantics concern; each child link already has a unique accessible name and the proposed structural change is not warranted for this story.
- `low` — Remaining Terminal theme color literals and shared button contrast are pre-existing theme-token concerns, not defects introduced by the project-discovery change.

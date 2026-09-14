---
title: 'Present the home identity and conversion-ready hero paths'
type: 'feature'
created: '2026-09-10'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
baseline_commit: 'a273060bb76a590746a2e594caa4bb036bc3570f'
context:
  - 'C:\Projects\sahamofficial.github.io\_bmad-output\implementation-artifacts\epic-1-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The Home route contains Saham's identity and useful content, but the opening experience is visually noisy and does not clearly frame a grounded value proposition or conversion path before visitors scan deeper into the page.

**Approach:** Refine the existing Home hero and its immediate supporting content into a clear first read: name, full-stack developer role, concise capability statement, role chip, and a visible CTA pair for work discovery and contact. Preserve the existing one-page section anchors and legacy hooks while making the hero responsive, accessible, and resilient when optional animation is unavailable.

## Boundaries & Constraints

**Always:** Keep Home owned by `src/app/page.tsx`; use the shared tokens and shell from Story 1.1; preserve `hero`, `about`, `resume`, `portfolio`, `services`, and other existing section IDs and legacy selectors; keep copy direct, specific, and free of unsupported claims; keep Portfolio and Contact routes reachable from the hero; provide visible focus, semantic headings, readable contrast, and tap-sized actions; keep static export and local content.

**Never:** Build About, Resume, Portfolio-detail, Contact, legal, ad, weather, or playground features owned by later stories; require a demo, API, ad, third-party data, or browser-only enhancement for the identity or CTA content; remove the typed/pendulum hooks or redesign every Home section without a story-level need; hide the primary paths behind hover, delayed animation, or click-to-reveal behavior.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|---|---|---|---|
| First visit | Home loads with scripts and styles available | Hero immediately shows name, role chip, value proposition, and Portfolio/Contact CTA pair | Core content remains present if enhancement initialization is delayed |
| Narrow viewport | Mobile or tablet width, including zoomed text | Identity and both actions reflow without clipping or obscuring the role statement | Use the existing responsive selectors and preserve keyboard access |
| Optional enhancement unavailable | Typed, AOS, pendulum, or related vendor global is absent | Static hero copy and links remain usable with no uncaught initialization failure | Enhancement degrades to stable content |
| Reduced motion | Visitor prefers reduced motion | Hero remains readable and actions remain available without attention-demanding movement | Follow existing reduced-motion rules |

</frozen-after-approval>

## Code Map

- `src/app/page.tsx` -- Home hero and all existing section markup. Refine the opening section and immediate context; preserve section IDs, route links, data attributes, and later-story content boundaries.
- `src/app/globals.css` -- Shared portfolio tokens and reusable chip/button primitives from Story 1.1. Reuse these rather than adding page-local token duplicates.
- `public/assets/css/soft-light.css` -- Default hero, CTA, responsive, focus, and reduced-motion presentation. Reuse compatible selectors and correct only conflicts introduced by the revised hero.
- `public/assets/css/main.css` -- Legacy layout and mobile hero sizing. Preserve its baseline selectors and breakpoint behavior unless the new hero requires a narrowly scoped override.
- `public/assets/js/main.js` -- Typed text, AOS, CTA shadow/pendulum hooks, and optional-global guards. Keep `.typed`, `.btn-chrome`, `.btn-ghost`, and related hooks compatible; do not make enhancement code a rendering dependency.
- `public/assets/js/hero-3d.js` -- Optional hero visual integration. Treat it as progressive enhancement and do not make identity or conversion copy depend on its canvas.
- `src/app/layout.tsx` -- Shared navigation and metadata established by Story 1.1. Do not move Home content or duplicate shell ownership here.
- `_bmad-output/planning-artifacts/ux-designs/ux-sahamali.dev-2026-09-09/DESIGN.md` and `EXPERIENCE.md` -- Source of truth for dark technical visual direction, direct tone, compact mobile hero actions, and non-blocking motion.

## Tasks & Acceptance

**Execution:**
- [x] `src/app/page.tsx` -- revise the hero identity hierarchy, role chip, grounded value proposition, and Portfolio/Contact CTA pair while retaining stable Home section contracts.
- [x] `src/app/globals.css`, `public/assets/css/soft-light.css`, and narrowly related theme overrides -- style the revised hero and actions with shared tokens, responsive reflow, focus states, and reduced-motion-safe behavior without breaking alternate themes.
- [x] `public/assets/js/main.js` and optional hero scripts -- verify or adjust progressive enhancement so missing vendor globals leave static hero content and links functional.
- [x] Existing validation surfaces -- run targeted lint, JavaScript syntax checks where available, and `npm run build` for the static export.

**Acceptance Criteria:**
- Given a visitor lands on Home, when the hero is displayed, then it presents “Saham Ali”, a clear full-stack developer role statement, a concise grounded value proposition, and a visible role chip without exaggerated claims.
- Given the visitor can take a next action, when the hero is viewed on desktop, then the Portfolio/work and Contact CTA pair remains above the fold and each route is clear from its accessible name.
- Given the visitor scans Home content, when optional animation or interactive demos are unavailable, then identity, useful project-discovery context, and conversion links remain readable and usable without an advertisement or demo.
- Given the visitor uses mobile, tablet, keyboard, zoom, or reduced-motion settings, when hero actions reflow or receive focus, then controls remain visible, keyboard-operable, readable, and large enough to tap.
- Given the browser initializes legacy enhancements, when a vendor global or browser API is absent, then the static Home route renders without an uncaught error or lost CTA.

## Implementation Notes

- Added the Home hero role chip, grounded value proposition, semantic heading, and accessible Portfolio/Contact CTA names while preserving existing section and animation hooks.
- Added responsive hero action reflow and theme-specific `h1`/value-proposition styling; optional typed text and AOS now degrade to static content when vendor globals are unavailable.
- Synchronized active navigation immediately on script load and aligned terminal-theme tablet navigation with the shared collapse breakpoint.

## Review Triage Log

| Finding | Verdict and evidence |
|---|---|
| Missing AOS fallback can hide the hero | **patch** — `main.js` now adds `aos-animate` to `[data-aos]` elements when AOS is unavailable; static output and build checks pass. |
| Terminal tablet menu can inherit the light background | **patch** — terminal navigation styling now covers the shared `1199.98px` collapse breakpoint. |
| Active navigation may miss direct script-load synchronization | **patch** — `syncActiveNav()` now runs immediately before event listeners; syntax and build checks pass. |
| Win11 hero value copy lacks explicit muted styling | **patch** — `.hero-value` now shares the Win11 muted color rule. |
| Shared route active-state behavior lacks browser-level runtime tests | **defer** — no browser test runner or test script exists; this is recorded for the later validation story. |
| Mobile navigation semantics lack browser-level runtime tests | **defer** — no browser test runner exists, and the current story does not add test infrastructure. |
| Optional vendor fallback lacks browser-level runtime tests | **defer** — static assertions, syntax checks, and build cover the available repository validation surface; browser smoke coverage needs later infrastructure. |
| Spec implementation notes and verification prose were not exhaustive | **false** — documentation completeness is not a runtime defect, and the implementation notes now record the story decisions and checks. |
| Spec artifacts use absolute local paths | **false** — this finding targets workflow artifacts rather than the shipped Home behavior and does not change the implementation outcome. |
| Terminal theme retains unrelated green legacy surfaces | **defer** — those pre-existing theme surfaces are outside the Home hero change and belong with the broader theme cleanup. |
| Terminal breakpoint mismatch | **patch** — carried duplicate of the patched tablet menu issue above. |
| Immediate active-nav call missing | **patch** — carried duplicate of the patched direct-load issue above. |
| No-JavaScript mobile navigation fallback is hidden | **defer** — this is pre-existing shell behavior and requires a broader no-JavaScript navigation decision. |
| Portfolio primitives do not override every selectable theme | **defer** — pre-existing shared token/theme scope, not introduced by the Home hero implementation. |
| Portfolio primary-button contrast may be below target | **defer** — pre-existing shared primitive issue outside this story's hero surface. |
| Portfolio primitive focus rules are incomplete | **defer** — pre-existing shared primitive issue outside this story's hero surface. |
| Hero repeats role wording | **false** — the eyebrow, required role chip, and progressive typed role intentionally serve different hierarchy and accessibility purposes. |
| Value proposition lacks target-client evidence | **false** — the accepted intent requires concise grounded capability copy, not a new proof or audience-content system. |
| Hero heading shadow selector was lost | **false** — `TEXT_SEL` already includes `.hero h1`, so the enhancement remains attached after the semantic heading change. |
| AOS fallback claim repeated by verification review | **patch** — covered by the AOS fallback patch above and verified with exported-output assertions. |

## Verification

**Commands:**
- `npx eslint src/app/page.tsx` -- passed with five pre-existing `no-img-element` warnings and no errors.
- `node --check public/assets/js/main.js` -- passed.
- `npm run build` -- passed; static Home and published routes compiled.
- Exported `out/index.html` content checks -- passed for identity, role chip, value proposition, and both CTA destinations.
- Responsive and reduced-motion CSS checks -- passed.

**Manual checks (if no CLI):**
- Inspect Home at desktop, tablet, mobile, keyboard focus, zoom, and reduced-motion settings; confirm the hero is immediately readable and both CTA destinations remain obvious.

## Design Notes

- The hero is a conversion gateway, not a decorative animation demo. Motion may reinforce the existing visual language, but the name, role, value proposition, and CTA pair must be complete in the initial DOM.

### Review Findings

- [x] [Review][Patch] Reveal the hero when optional AOS initialization is unavailable or delayed [public/assets/js/main.js:131-145] — the hero fallback now initializes immediately as well as on `load`.
- [x] [Review][Patch] Use an own-key theme allowlist for persisted theme startup [src/app/layout.tsx:70] — persisted values are now checked with a `Set`.
- [x] [Review][Patch] Guard the optional AOS initializer before isotope filters call it [public/assets/js/main.js:231-237] — the filter path now confirms `AOS.init` is callable.
- [x] [Review][Patch] Keep a navigation item active after leaving a hash section [public/assets/js/main.js:308-313] — Home is restored whenever no hash section is active on the Home route.
- [x] [Review][Patch] Retarget cursor-shadow text enhancement to the semantic hero heading [public/assets/js/main.js:339] — `TEXT_SEL` now selects `.hero h1`.
- [x] [Review][Defer] Add browser-level mobile navigation state coverage [src/app/layout.tsx:90-118] — deferred: no browser test runner or test script exists; this requires later validation infrastructure.
- [x] [Review][Defer] Add browser-level active-route and hash-scrollspy coverage [public/assets/js/main.js:48-106] — deferred: no browser test runner or test script exists; this requires later validation infrastructure.
- [x] [Review][Defer] Add browser-level persisted-theme startup coverage [src/app/layout.tsx:70] — deferred: no browser test runner or test script exists; this requires later validation infrastructure.
- [x] [Review][Defer] Verify focus behavior when a mobile same-page hash link closes the menu [public/assets/js/main.js:77-83] — deferred: the outcome depends on browser focus behavior and needs a browser-level accessibility check.
- [x] [Review][Defer] Make active navigation synchronization independent of fixed timers [public/assets/js/main.js:68-70] — deferred: client-side transition timing needs browser-level route testing to establish a reproducible regression and choose the correct navigation event.
- [x] [Review][Defer] Correct terminal suffixes for legal links [public/assets/css/theme-terminal.css:165-170] — deferred: this is a cosmetic alternate-theme/legal-shell concern outside the Home hero story.
- [x] [Review][Defer] Audit remaining terminal green legacy surfaces [public/assets/css/theme-terminal.css:133-190] — deferred: broader pre-existing theme cleanup is outside this story's hero surface.
- [x] [Review][Defer] Reconcile shared metadata with hero copy [src/app/layout.tsx:7-26] — deferred: metadata was pre-existing shared-shell content and is outside this story's Home hero implementation.
- [x] [Review][Defer] Derive `index-page` and `data-page` from the active route [src/app/layout.tsx:82] — deferred: shared route-shell behavior is outside this story and needs a broader navigation decision.
- [x] [Review][Defer] Improve reusable light-theme contrast, glow tokens, and focus primitives [src/app/globals.css:95-145] — deferred: these are shared token/primitives concerns from the shell work, not introduced by the Home hero behavior.
- [x] [Review][Defer] Use a semantic container for social-profile labeling [src/app/layout.tsx:93-98] — deferred: shared shell semantics are outside this story's hero change.

#### Rejected

- [x] `false` — the generic hero capability statement satisfies the accepted concise grounded capability requirement; adding audience proof would expand the story intent.
- [x] `false` — the repeated full-stack wording intentionally supplies eyebrow, role-chip, and progressive typed-role hierarchy; the acceptance criteria require the role statement and chip.
- [x] `false` — removing “Freelancer” does not violate the story, which does not require an availability claim.
- [x] `false` — the progress-width finding cited a `Number`/clamp implementation not present at the reported location; the actual legacy handler is unrelated to that claim.
- [x] `false` — the requested fixes to the Story 1.1 spec's verification prose would edit an artifact rather than fix shipped behavior.

---
title: 'Establish shared portfolio shell, design tokens, and accessible navigation'
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

**Problem:** The shared layout currently mixes a light legacy presentation with the new portfolio direction, and its mobile navigation is not a semantic keyboard-operable control. Shared metadata, trust links, responsive behavior, and legacy script contracts must be made reliable across every static route.

**Approach:** Establish the shared shell as the single source of global navigation and visual primitives, preserve the current light theme as the default while adding the documented dark token system as an opt-in theme, and upgrade navigation state and browser-only initialization without removing the DOM contracts used by legacy integrations.

## Boundaries & Constraints

**Always:** Keep `src/app/layout.tsx` as the shared App Router shell; preserve the current light theme as the default and expose the documented dark token system as an opt-in theme; preserve required IDs, classes, links, and script hooks; keep static export and local content; use semantic landmarks, visible focus, accessible names/states, and responsive tap targets; guard optional browser-only integrations; keep contact, portfolio, privacy, and terms paths discoverable.

**Never:** Add a CMS, backend, database, authentication, server session, or server-only API; move shell ownership into individual routes; make ads or optional integrations required for navigation; remove legacy hooks without proving they are unused; expand into hero, About, portfolio-detail, contact, legal-content, or final cross-route validation work owned by later stories.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Desktop route | Any published static route at desktop width | Shared metadata, header, navigation, main landmark, footer trust links, tokens, and primary paths render without clipped controls | Route remains usable if optional enhancement scripts are unavailable |
| Mobile navigation | Narrow viewport; toggle receives click or keyboard activation | A semantic toggle exposes its name, `aria-expanded`, and controlled navigation state; links remain keyboard reachable and close the menu after navigation | No mouse-only action; focus remains visible |
| Active route | Visitor opens a route or hash-backed section | The corresponding navigation item has an identifiable active state without breaking existing hash links | Unknown/non-matching path leaves navigation usable without a false active match |
| Optional browser integration | Hydration/DOM readiness occurs with a missing vendor global or unavailable browser API | Core route rendering and shell interaction continue; optional enhancement is skipped or reports through existing project conventions | No uncaught initialization failure blocks the page |

</frozen-after-approval>

## Code Map

- `src/app/layout.tsx` — shared metadata, root layout, shell markup, navigation, footer, asset registration, and browser script loading; upgrade the toggle semantics/state and align global shell contracts here.
- `src/app/globals.css` — global stylesheet entry point; keep the Tailwind import and add/import shared token primitives in the project’s established CSS layer.
- `public/assets/css/soft-light.css` — currently overrides the site with light tokens and top-navbar behavior; reuse compatible responsive/focus patterns or replace conflicting primitives with the documented dark system.
- `public/assets/css/main.css` and `public/assets/css/theme-*.css` — legacy base and theme rules; preserve selectors consumed by the layout and page scripts while preventing conflicting defaults from defeating the shared shell.
- `public/assets/js/main.js` — document-global mobile toggle, link-close behavior, scroll-top, and enhancement initialization; make the navigation behavior safe for semantic controls and absent optional globals.
- `public/assets/js/theme-toggle.js` — browser-scoped theme persistence and injected theme control; retain or revise only according to the resolved default-theme decision.
- `src/app/page.tsx` and route directories under `src/app/` — existing page anchors and route surfaces that must continue to render beneath the shared shell; do not move story-specific content into this change.
- `next.config.ts`, `package.json`, `eslint.config.mjs` — static-export and available validation commands; no test framework is currently present.

## Tasks & Acceptance

**Execution:**
- [x] `src/app/layout.tsx` — implement a semantic, responsive shared shell with stable metadata, landmarks, active-route signals, accessible mobile-nav state, and persistent trust/conversion links — satisfy the shell and navigation acceptance criteria without removing legacy hooks.
- [x] `src/app/globals.css` and the relevant `public/assets/css/*` files — define the documented reusable dark surfaces, ink, accent, typography, spacing, radius, card, button, chip, stat, focus, and responsive tokens — avoid conflicting light defaults and preserve compatibility selectors.
- [x] `public/assets/js/main.js` and, if required by the resolved theme policy, `public/assets/js/theme-toggle.js` — synchronize semantic navigation state and guard browser-only/optional integrations — keep route rendering functional when an enhancement is unavailable.
- [x] `package.json`/existing project validation surfaces only as needed — run the repository’s existing lint/build checks — do not add a test framework or dependency for this story.

**Acceptance Criteria:**
- Given a visitor opens any published route, when the static-export page renders, then the shared layout provides stable metadata, navigation, footer trust links, global styles, and required legacy DOM IDs/classes without server-only behavior.
- Given the shared shell is rendered, when styles are applied, then the documented dark surfaces, ink hierarchy, cyan/mint/amber accents, typography, spacing, radii, card, button, chip, and stat tokens are available as reusable styles.
- Given a visitor uses keyboard navigation or assistive technology, when they move through links, buttons, and the mobile toggle, then focus is visible, names and states are semantic, the active route is identifiable, and no action requires a mouse.
- Given a visitor opens the site on desktop, tablet, or mobile, when the viewport changes, then navigation and content reflow without clipped controls, inaccessible tap targets, or loss of primary contact/portfolio paths.
- Given browser-only integrations initialize, when hydration or DOM readiness occurs, then browser globals and optional integrations are guarded so unavailable enhancements do not break route rendering.

## Implementation Notes

- Preserved the existing light theme as the default and kept alternate theme switching browser-scoped; the documented cyan/mint/amber dark token system is available through the opt-in dark theme and reusable portfolio primitives.
- Replaced the non-semantic mobile navigation icon with a button exposing `aria-expanded` and `aria-controls`, and synchronized its state with legacy `.header-show` behavior, Escape handling, and link-close behavior.
- Added pathname/hash-based active navigation state while retaining legacy hash scrollspy and dropdown behavior.
- Guarded optional vendor globals in `main.js` and restored all unrelated cursor, ripple, trail, and pendulum integrations after implementation review.
- Full `npm run lint` reports existing warning-only violations across legacy/vendor assets and exits non-zero; targeted lint for changed TS/JS files reports zero errors and exits successfully. `npm run build` and JavaScript syntax checks pass.

## Review Triage Log

| Finding | Verdict and evidence |
|---------|----------------------|
| Client-side route navigation leaves active state stale | **patch** — added delayed link resynchronization and `popstate` handling; static checks and build pass. |
| Services navigation link was removed | **patch** — restored the `/#services` link and preserved its legacy anchor. |
| Terminal theme suffix selectors targeted old hash-only URLs | **patch** — selectors now use the stable `data-nav` hooks. |
| Mobile toggle kept an “Open” name while expanded | **patch** — toggle label now changes to Open/Close with state. |
| Trailing-slash routes missed active matching | **patch** — path comparison now normalizes trailing slashes. |
| Closed mobile links remained keyboard reachable | **patch** — closed nav now uses visibility and pointer gating; open state restores interaction. |
| Scrollspy did not synchronize `aria-current` | **patch** — section changes now update location state and restore Home when appropriate. |
| Hash-backed links used page instead of location semantics | **patch** — `aria-current="location"` is used for hash targets. |
| Home could lose its active state after scrolling | **patch** — scrollspy restores Home when no section is active. |
| Missing custom swiper pagination fell through to generic initialization | **patch** — tab swipers now skip when their optional initializer is unavailable. |
| Malformed swiper configuration could abort load initialization | **patch** — JSON parsing is guarded per swiper. |
| Malformed URL hashes could throw during load | **patch** — selector lookup is guarded. |
| Tablet widths could overflow the full navigation | **patch** — responsive collapse now applies through 1199px and script behavior matches. |
| Terminal theme retained old green hard-coded surfaces | **patch** — key backgrounds and scrollbar colors now use the cyan/dark token palette. |
| Reusable portfolio tokens were dark in the light default | **patch** — root tokens now align with the current light theme and dark overrides remain available. |
| Invalid persisted theme values were accepted before paint | **patch** — inline persistence validates against supported theme keys. |
| Missing `requestAnimationFrame` could break optional theme scrolling | **patch** — theme scroll syncing now has a timeout fallback. |
| Reviewer reported duplicate absolute-path diff sections | **false** — this was introduced by temporary review-diff assembly, not repository files or implementation. |
| Reviewer requested a browser route-navigation test | **defer** — no browser test runner or test script exists in the repository; static assertions, targeted lint, syntax checks, and the production build cover the available validation surface. |
| Reviewer reported verification commands were ambiguous | **false** — the spec records the full lint/build commands and implementation notes record targeted lint, syntax checks, and the full-lint warning limitation. |
| Reviewer reported sprint/spec workflow status inconsistency | **false** — `in-review` is the required review-stage status and sprint status remains `in-progress` until review completion. |

## Verification

**Commands:**
- `npm run lint` — expected: lint completes without new errors.
- `npm run build` — expected: static export completes and all published routes compile.

**Manual checks (if no CLI):**
- Inspect desktop and narrow viewport shell behavior, keyboard focus, toggle state announcements, active-route styling, and fallback behavior with optional scripts unavailable.

# Epic 1 Context: Trusted Portfolio and Project Discovery

<!-- Compiled from planning artifacts. Edit freely. Regenerate with compile-epic-context if planning docs change. -->

## Goal

This epic establishes the trust and discovery layer for sahamali.dev: visitors can quickly understand Saham's identity, review his capabilities and credibility, browse original project context, and reach contact/privacy/trust surfaces through a responsive, accessible, static-export portfolio shell. It matters because the portfolio is the primary content layer for hiring, client acquisition, and project discovery, and it must remain useful even when demos, APIs, or ads are unavailable.

## Stories

- Story 1.1: Establish shared portfolio shell, design tokens, and accessible navigation
- Story 1.2: Present the home identity and conversion-ready hero paths
- Story 1.3: Present About and Resume credibility content
- Story 1.4: Present portfolio project discovery with original project context
- Story 1.5: Provide contact conversion and trust/legal surfaces
- Story 1.6: Validate responsive, keyboard-accessible, and recoverable portfolio states

## Requirements & Constraints

- The portfolio must present Saham’s identity, capabilities, project collection, and navigation without relying on ads or interactive tools.
- Related-project and original-content discovery must remain usable when demos or third-party data fail; ads must be visually and behaviorally distinct from navigation and CTAs.
- The site must keep a route-light, static-export architecture with shared metadata, navigation, footer trust links, and browser-safe legacy compatibility; no server-only APIs or CMS layer.
- Important content surfaces include Home, About, Resume, Portfolio, Contact, Privacy, and Terms, with clear discovery paths and a hiring/client conversion flow.
- The experience must prioritize direct, professional microcopy; avoid hype, hidden CTAs, or click-to-reveal behavior.
- Accessibility is a baseline requirement: semantic headings/landmarks, visible keyboard focus, screen-reader labels, strong contrast, semantic forms, readable zoom behavior, and responsive controls.
- The design system requires the documented dark visual tokens, technical typography, generous spacing, pill controls, and reusable cards/buttons/chips.
- Contact and legal surfaces must explain applicable privacy, advertising, weather, and data-handling decisions, while avoiding precise location collection in MVP.
- Portfolio pages must provide original authored context, project purpose/outcome, stack/category metadata, and stable navigation; content remains useful without demos or APIs.
- Success criteria center on clarity, trust, navigability, and conversion without sacrificing responsive or accessibility quality.

## Technical Decisions

- Use the static-export App Router pattern with shared shell in `src/app/layout.tsx`; routes stay under `src/app/` and static assets remain served from `/assets/...`.
- Keep local content and route-owned data rather than introducing a CMS or backend persistence layer.
- Preserve legacy DOM IDs/classes/hooks in `public/assets/css/*` and `public/assets/js/*` so navigation, theme toggles, gallery hooks, and forms continue working.
- Browser-only integrations such as theme persistence, analytics, FormSubmit, and legacy scripts must initialize after hydration or DOM readiness and guard `window` / `document`.
- Theme preference remains browser-scoped in `localStorage`; no auth or server session model is part of this epic.
- Keep route and footer trust links stable and available across published pages, with the main conversion path to contact always visible.
- Use a small, consistent design token system for dark surfaces, accent colors, spacing, radii, and typography; avoid decorative motion that competes with content.

## UX & Interaction Patterns

- Home hero should immediately convey identity, role, and next actions without forcing interaction or AI-style hype.
- Core pattern: direct scanning through clear CTA pair, secondary navigation, and project cards with headline/context/stack metadata.
- About/Resume flows should support hiring managers and clients by making capability, credibility, and proof points easy to scan.
- Portfolio cards and detail pages should emphasize purpose, outcome, category, and original context rather than demo-only presentation.
- Contact flow should be low-friction and explicit, with clear success and error feedback and persistent trust links.
- Mobile/tablet behavior should preserve hierarchy, tap targets, and route clarity without obstructing the primary CTA path.
- Motion should be light and non-blocking; route transitions should feel responsive while preserving reading and navigation clarity.

## Cross-Story Dependencies

- Story 1.1 creates the shared shell, tokens, navigation, and responsive foundations that every other story depends on.
- Stories 1.2–1.5 all build on that shared layout and trust architecture, with 1.2 establishing the home conversion flow, 1.3–1.4 shaping credibility and project discovery, and 1.5 adding contact/legal surfaces.
- Story 1.6 validates the combined portfolio experience across devices, keyboard usage, and failure/recovery states, so it acts as the final quality gate for the epic.

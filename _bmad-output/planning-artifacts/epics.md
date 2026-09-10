---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
  - step-04-final-validation
inputDocuments:
  - _bmad-output/planning-artifacts/prds/prd-sahamali.dev-2026-09-09/prd.md
  - _bmad-output/planning-artifacts/prds/prd-sahamali.dev-2026-09-09/addendum.md
  - _bmad-output/planning-artifacts/architecture/architecture-sahamali.dev-2026-09-09/ARCHITECTURE-SPINE.md
  - _bmad-output/planning-artifacts/ux-designs/ux-sahamali.dev-2026-09-09/DESIGN.md
  - _bmad-output/planning-artifacts/ux-designs/ux-sahamali.dev-2026-09-09/EXPERIENCE.md
---

# sahamali.dev - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for sahamali.dev, decomposing the requirements from the PRD, UX Design, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Present Saham's identity, capabilities, project collection, original descriptions, and navigation to Playground, Weather, and Contact without relying on ads.
FR2: Support trustworthy project-to-project and original-content discovery that remains usable when demos/APIs fail, with ads distinct from links and CTAs.
FR3: Let visitors browse and select Playground components through stable deep links with purpose, technology, usage context, source, and return navigation.
FR4: Let visitors edit supported HTML/CSS and React source, run/view constrained live previews, distinguish editor/output/actions, and recover from invalid, unsafe, unsupported, timed-out, or failed previews.
FR5: Let visitors copy the current component source with clear success/failure feedback and attribution, dependency, and usage conditions.
FR6: Let visitors submit a manually entered location and receive readable weather results or actionable errors, with provider attribution/terms, rate-limit handling, and documented location data flow.
FR7: Publish original explanations, tutorials, examples, implementation notes, limitations, authorship, and project context around interactive experiences.
FR8: Display ads only in clearly separate, labeled, stable placements that cannot be mistaken for or obstruct navigation, editors, previews, controls, copy, downloads, or results; review desktop/mobile/keyboard/responsive paths before enablement.
FR9: Provide privacy policy and applicable consent/data handling for AdSense, analytics, weather, and any future precise location; avoid invalid-traffic practices and record regional decisions before personalized ads.

### NonFunctional Requirements

NFR1: Remain compatible with Next.js static export; no server-only APIs, persistent runtime state, or database-backed rendering without a new architecture decision.
NFR2: Preserve shared layout and legacy DOM IDs/classes/hooks so navigation, themes, galleries, forms, and page scripts continue to work across routes.
NFR3: Keep local content/page ownership; no CMS, query layer, accounts, or backend persistence in MVP.
NFR4: Browser-only integrations must initialize after hydration/DOM readiness and guard window/document.
NFR5: Live preview must enforce an execution boundary, code/resource limits, denied capabilities, and recoverable timeout/error behavior.
NFR6: Live preview must not access credentials, unrelated page content, or unrestricted browser capabilities.
NFR7: Meet the accessibility floor: semantic landmarks/headings, keyboard operation, visible focus, screen-reader labels, strong contrast, labeled forms, and error recovery.
NFR8: Support desktop, tablet, and mobile layouts with readable content, clear navigation, and adequate tap targets.
NFR9: Weather integration must satisfy the selected provider's commercial-use, attribution, caching, rate-limit, client-key, and location-data terms.
NFR10: Ads must be separately styled/labeled, non-overlapping, non-obstructive, non-auto-refreshing, and reviewed across interaction states before monetization.
NFR11: Instrument discovery, Playground selection, preview/copy success and failure, Weather success/failure, and return visits; establish baseline and launch targets before ads.

### Additional Requirements

- Use the existing static-export site as the implementation substrate; no starter or greenfield template is specified.
- Keep `src/app/layout.tsx` as the shared shell for metadata, CSS/JS imports, navigation, and vendor scripts.
- Preserve legacy asset compatibility and DOM contracts in `public/assets/css/*` and `public/assets/js/*`.
- Keep routes under `src/app/` and static assets referenced from `/assets/...`.
- Keep content local to routes or small shared data modules; no CMS, backend, or API layer for page rendering.
- Externalize and guard AOS, Typed.js, GLightbox, Swiper, Purecounter, theme persistence, FormSubmit, fonts, and analytics integrations.
- Keep theme preference browser-scoped in `localStorage`; no auth or server sessions.
- Deferred: CMS/admin, database leads/analytics, accounts/auth, editorial tooling, and a separate backend API.

### UX Design Requirements

UX-DR1: Maintain route-light information architecture for Home, About, Resume, Portfolio, Playground, Contact, Privacy, and Terms.
UX-DR2: Keep identity, work, credibility, and contact paths immediately discoverable from the shell and primary navigation.
UX-DR3: Use direct, concise, professional microcopy; avoid hype, hidden conversion paths, and click-to-reveal gimmicks.
UX-DR4: Implement the dark visual token system: surfaces #0B1020, #121A2B, #1A2336, #0F172A; ink hierarchy; cyan, mint, and amber accents; border and glow tokens.
UX-DR5: Implement typography tokens for Space Grotesk/Sora display/headings, Inter/Nunito Sans body, and Spline Sans Mono metadata with specified sizes, weights, spacing, and line heights.
UX-DR6: Implement spacing, radius, and layout tokens, including the 4-64px scale, 24px gutter, 88px sections, 8-28px radii, and pill controls.
UX-DR7: Standardize reusable nav links, hero chips, primary/secondary buttons, card surfaces, stat pills, project cards, intro blocks, capability chips, contact paths, and footer utility links.
UX-DR8: Keep primary hero CTA actions above the fold on desktop and route clearly to work/contact paths.
UX-DR9: Ensure project/service cards scan via headline, short context, outcome/stack/category metadata, and click-through.
UX-DR10: Provide clear initial-load, empty/incomplete Playground, contact-success, mobile-nav-open, and route-transition states.
UX-DR11: Use light, fast motion only; preserve reading and navigation, and avoid heavy decorative hero/nav animation.
UX-DR12: Provide semantic headings/landmarks, visible cyan/high-contrast keyboard focus, screen-reader-announced links/buttons, semantic form labels, and straightforward errors.
UX-DR13: Support desktop/laptop, tablet stacked panels, and mobile single-column flow with compact actions and tap targets.
UX-DR14: Implement Home hero, About, Resume, Portfolio, Playground, and Contact screens aligned to the information architecture.
UX-DR15: Support the hiring-manager flow from identity through About/Resume/Portfolio to contact.
UX-DR16: Support the client-inquiry flow with visible role, proof points, portfolio, and a low-friction inquiry path.
UX-DR17: Support the creative-experiment flow so Playground demonstrates craft while remaining connected to portfolio credibility.
UX-DR18: Keep contact and trust links repeatable and discoverable from global/footer navigation.
UX-DR19: Preserve behavior/state rules for stable side navigation, footer links, explicit interactions, and non-mouse operation.

### FR Coverage Map

FR1: Epic 1 - Portfolio identity, capabilities, projects, and navigation.
FR2: Epic 1 - Trustworthy related-project and original-content discovery.
FR3: Epic 2 - Component collection and stable detail routes.
FR4: Epic 2 - Constrained editing, preview, and recovery.
FR5: Epic 2 - Copy feedback and usage context.
FR6: Epic 3 - Weather requests, results, attribution, and failures.
FR7: Epic 1, Epic 2, and Epic 3 - Original content is established portfolio-wide and attached to each interactive experience.
FR8: Epic 4 - Separated, labeled, stable, and reviewed ad placements.
FR9: Epic 1, Epic 3, and Epic 4 - Privacy, consent, trust, and location-data handling.

## Epic List

### Epic 1: Trusted Portfolio and Project Discovery

Visitors can quickly understand who Saham is, evaluate work and credibility, navigate between projects, read original supporting content, and reach contact, privacy, and trust surfaces across responsive, accessible routes.
**FRs covered:** FR1, FR2, FR7, and portfolio/contact portions of FR9.

### Story 1.1: Establish shared portfolio shell, design tokens, and accessible navigation

As a visitor,
I want a consistent, responsive shell with clear navigation and recognizable visual patterns,
So that I can understand the site and move between its core surfaces without friction.

**Acceptance Criteria:**

**Given** a visitor opens any published route
**When** the page renders in the static-export build
**Then** the shared layout provides stable metadata, navigation, footer trust links, global styles, and required legacy DOM IDs/classes without server-only behavior.

**Given** the shared shell is rendered
**When** visual styles are applied
**Then** the documented dark surfaces, ink hierarchy, cyan/mint/amber accents, typography, spacing, radii, card, button, chip, and stat tokens are available through consistent reusable styles.

**Given** a visitor uses keyboard navigation or assistive technology
**When** they move through navigation links, buttons, and the mobile-nav toggle
**Then** focus is visible, controls have semantic names and states, the active route is identifiable, and no action requires a mouse.

**Given** a visitor opens the site on desktop, tablet, or mobile
**When** the viewport changes
**Then** navigation and content reflow without clipped controls, inaccessible tap targets, or loss of the primary contact/portfolio paths.

**Given** browser-only integrations initialize
**When** hydration or DOM readiness occurs
**Then** they guard browser globals and do not break route rendering if an optional legacy integration is unavailable.

### Story 1.2: Present the home identity and conversion-ready hero paths

As a first-time visitor,
I want to immediately understand who Saham is, what he builds, and where I can go next,
So that I can evaluate the portfolio without hunting for identity or contact paths.

**Acceptance Criteria:**

**Given** a visitor lands on Home
**When** the hero is displayed
**Then** it presents Saham's name, a clear full-stack developer role statement, a concise value proposition, and a visible role chip without exaggerated claims.

**Given** the visitor can take a next action
**When** the hero is viewed on desktop
**Then** the primary and secondary CTA pair remains above the fold and routes clearly to Portfolio/work and Contact or another approved conversion path.

**Given** the visitor scans the Home page
**When** content sections are read
**Then** the page communicates useful context and project discovery value without requiring an interactive demo or an advertisement.

**Given** the visitor uses a mobile or tablet viewport
**When** hero actions reflow
**Then** they remain readable, keyboard-operable, and large enough to tap without obscuring the identity or value proposition.

**Given** motion is enabled
**When** the hero loads or receives focus
**Then** motion is light and non-blocking, and the identity and CTA content remain immediately available.

### Story 1.3: Present About and Resume credibility content

As a hiring manager or prospective client,
I want to review Saham's background, capabilities, skills, and experience,
So that I can judge fit and trust before starting a conversation.

**Acceptance Criteria:**

**Given** a visitor opens About or Resume
**When** the page content is displayed
**Then** it provides an authored professional introduction, capabilities, experience/skills context, and scannable proof points using semantic headings and logical reading order.

**Given** the visitor scans capability and experience content
**When** cards, stat pills, or tags are shown
**Then** each item has meaningful context and does not rely on decorative labels or unsupported claims.

**Given** the visitor wants to continue evaluating the work
**When** they reach a relevant CTA or navigation link
**Then** they can move to Portfolio or Contact without losing the global navigation or trust links.

**Given** the content is viewed at enlarged browser zoom or on a narrow viewport
**When** text and sections reflow
**Then** readable contrast, line length, spacing, and heading hierarchy are preserved without horizontal scrolling.

### Story 1.4: Present portfolio project discovery with original project context

As a visitor evaluating Saham's work,
I want to scan projects by purpose, outcome, stack, and category and open useful detail context,
So that I can understand the value of each project beyond a demo or API result.

**Acceptance Criteria:**

**Given** a visitor opens Portfolio
**When** the project collection is displayed
**Then** each published project card includes a meaningful title, short description, purpose or outcome, technology/category context, and a stable navigation path.

**Given** a visitor opens a project detail route
**When** the project content is read
**Then** it includes original authored explanation, implementation or usage context, limitations where relevant, and links to related work or the next useful action.

**Given** a demo, external API, or project preview is unavailable
**When** the visitor opens the project page
**Then** the original description and navigation remain usable and the failure is explained without presenting an advertisement as a control.

**Given** a visitor navigates with keyboard or assistive technology
**When** they move through project cards and detail actions
**Then** links have clear accessible names, focus is visible, and the card does not create ambiguous nested interactions.

**Given** the project collection is viewed on tablet or mobile
**When** cards reflow
**Then** metadata remains scannable, controls remain tappable, and the route to Contact and other projects stays discoverable.

### Story 1.5: Provide contact conversion and trust/legal surfaces

As a prospective client or hiring manager,
I want a low-friction way to contact Saham and find privacy and terms information,
So that I can take a confident next step and understand how the site handles trust and data.

**Acceptance Criteria:**

**Given** a visitor opens Contact
**When** the contact surface is displayed
**Then** it provides a clearly labeled, semantically structured inquiry path with only necessary fields and a prominent alternative contact path where applicable.

**Given** a visitor submits valid contact information
**When** the external submission flow succeeds
**Then** the page confirms success clearly, preserves the global navigation, and explains the next expected step without exposing sensitive data.

**Given** the contact submission fails or validation finds an error
**When** the visitor reviews the result
**Then** each error is understandable, associated with the relevant field or action, recoverable, and does not leave the page in a misleading success state.

**Given** a visitor wants to understand privacy or site terms
**When** they use footer or relevant trust links
**Then** Privacy and Terms routes are reachable from every published surface and describe applicable analytics, weather/location handling, advertising, and contact submission data flows.

**Given** precise device location is not part of MVP
**When** a visitor uses the Weather or contact-adjacent trust surfaces
**Then** the site does not request precise location and does not imply that it is collected.

### Story 1.6: Validate responsive, keyboard-accessible, and recoverable portfolio states

As a visitor using any device or input method,
I want the portfolio's important states and actions to remain understandable and operable,
So that responsive layout, navigation, and contact journeys do not block me.

**Acceptance Criteria:**

**Given** a visitor opens the portfolio on desktop, tablet, or mobile
**When** the route, navigation, cards, forms, and footer reflow
**Then** the layout remains readable, has no unintended horizontal scrolling, preserves hierarchy, and keeps tap targets usable.

**Given** a visitor opens or closes mobile navigation
**When** the toggle is activated by mouse, keyboard, or assistive technology
**Then** the state change is obvious, focus behavior is sensible, the menu can be dismissed, and navigation links remain reachable.

**Given** a visitor encounters initial load, incomplete content, contact success, or a route transition
**When** that state is displayed
**Then** it provides a clear status or fallback without hiding core identity, blocking navigation, or relying on motion alone.

**Given** a visitor uses keyboard navigation at enlarged zoom
**When** they traverse headings, links, buttons, form fields, and errors
**Then** the focus order is logical, focus indicators are visible, text remains readable, and all essential actions are operable.

**Given** a legacy browser script or optional visual enhancement fails
**When** the route is otherwise rendered
**Then** core content, navigation, project discovery, and contact paths remain available with an understandable fallback where needed.

## Epic 2: Interactive Component Playground

Visitors can browse stable component routes, inspect and edit supported HTML/CSS and React examples, run constrained live previews, reset and recover from failures, and copy usable code with clear attribution and dependency context.
**FRs covered:** FR3, FR4, FR5, and Playground-specific portions of FR7.

### Story 2.1: Browse the component collection and stable detail routes

As a visitor exploring front-end examples,
I want to browse a collection and open a stable route for each component,
So that I can compare examples, share or revisit a component, and understand what it demonstrates.

**Acceptance Criteria:**

**Given** a visitor opens Playground
**When** the collection loads
**Then** published components are presented as scannable cards with a title, purpose, supported technology, and relevant usage context.

**Given** a visitor selects a component
**When** its detail route opens
**Then** the route is stable/deep-linkable, identifies the selected component, exposes its source and preview area, and preserves access to the broader portfolio navigation.

**Given** a visitor returns from a component detail route
**When** they use the collection or navigation path
**Then** they can return to the component collection without losing the global shell or encountering a broken route.

**Given** a component is unavailable or incomplete
**When** the visitor attempts to open it
**Then** the page explains the state and provides a usable route back to the collection rather than a blank or misleading result.

### Story 2.2: Explain each component with original usage and dependency context

As a visitor learning from a component,
I want original explanation, implementation notes, and usage conditions alongside the example,
So that I can understand why it exists and how to use it responsibly.

**Acceptance Criteria:**

**Given** a visitor opens a published component detail route
**When** the explanatory content is displayed
**Then** it describes the component's purpose, intended use, implementation approach, supported technology, and meaningful limitations in original authored content.

**Given** the component has dependencies, attribution, or usage conditions
**When** the visitor reviews the detail content or source actions
**Then** those conditions are visible before copying or reusing the code.

**Given** the live preview or a dependency is unavailable
**When** the visitor reads the component page
**Then** the original explanation remains useful and does not imply that the preview or external result is the only content value.

**Given** a visitor scans the page on desktop or mobile
**When** sections and metadata are presented
**Then** the component purpose, source, preview, explanation, and return navigation have clear hierarchy and do not rely on ad placement or hidden interactions.

### Story 2.3: Edit supported component source and render a constrained live preview

As a visitor experimenting with a component,
I want to edit supported source and see the result in a live preview,
So that I can learn by changing the example and evaluate the outcome immediately.

**Acceptance Criteria:**

**Given** a visitor opens a supported component
**When** the editor and preview are displayed
**Then** source editing, rendered output, and actions such as Run, Reset, Copy, and Download are visually and semantically distinct.

**Given** the visitor changes valid supported HTML/CSS or React source
**When** they run the preview
**Then** the preview reflects the current edited state and does not silently render stale source.

**Given** preview code executes
**When** the runtime evaluates it
**Then** it runs inside the agreed constrained execution boundary with explicit code/resource limits and cannot access credentials, unrelated page content, or unrestricted browser capabilities.

**Given** the visitor reloads or leaves the component route
**When** the page is rendered again
**Then** no server-side or persistent account state is required, and the static-export route remains functional.

**Given** supported dependencies are unavailable
**When** the visitor runs the preview
**Then** the page reports the limitation clearly and keeps the editor, navigation, and recovery actions available.

### Story 2.4: Recover from invalid, unsafe, unsupported, timed-out, or failed previews

As a visitor experimenting with code,
I want preview failures to explain what happened and provide recovery actions,
So that one bad edit does not break the page or prevent me from continuing to learn.

**Acceptance Criteria:**

**Given** the visitor submits invalid syntax or unsupported source
**When** the preview runs
**Then** an understandable error state identifies the problem at an appropriate level and leaves the editor, Reset, navigation, and explanatory content usable.

**Given** code attempts a denied capability or exceeds code/resource/time limits
**When** the execution boundary rejects or stops it
**Then** the page reports a safe, recoverable failure without exposing credentials, unrelated page content, or unrestricted browser capabilities.

**Given** a preview times out, crashes, or returns an unavailable dependency error
**When** the failure state is shown
**Then** the visitor can Reset to a known working example, edit again, navigate away, or retry without a full-page failure.

**Given** a failure is displayed
**When** an ad or other secondary content is present on the route
**Then** it is not presented as a recovery control, is not placed over the editor/preview, and does not obstruct the error message or actions.

**Given** the visitor uses keyboard navigation or a screen reader
**When** the preview state changes
**Then** the error/status is announced or associated with the relevant output and focus can reach the recovery actions.

### Story 2.5: Copy the current component source with clear feedback and attribution

As a visitor who wants to reuse or study a component,
I want to copy the exact current source and understand its usage conditions,
So that I can take a useful implementation with confidence.

**Acceptance Criteria:**

**Given** a visitor has selected or edited a component
**When** they activate Copy
**Then** the copied output corresponds to the current component state and includes the supported source required for the documented example.

**Given** the browser permits clipboard access
**When** copying succeeds
**Then** the page provides clear, non-blocking confirmation without navigating away, requiring an advertisement click, or obscuring the editor/preview.

**Given** clipboard access is denied or copying fails
**When** the visitor activates Copy
**Then** the page explains the failure and provides a recoverable alternative such as selecting or downloading the source where supported.

**Given** the component has attribution, dependency, or usage conditions
**When** the visitor copies or downloads its source
**Then** those conditions are visible at the action point or in the associated component context.

**Given** the visitor uses keyboard navigation or assistive technology
**When** copy status changes
**Then** the action has an accessible name and the success/failure status is announced without moving focus unexpectedly.

### Story 2.6: Make Playground states and actions accessible and responsive

As a visitor using a keyboard, screen reader, or small screen,
I want the Playground editor, preview, controls, and states to remain clear and operable,
So that experimentation is not limited to a mouse or wide display.

**Acceptance Criteria:**

**Given** the Playground is viewed on desktop, tablet, or mobile
**When** the collection, editor, preview, explanatory content, and controls reflow
**Then** the layout preserves readable hierarchy, usable editor/preview dimensions, clear action grouping, and no accidental horizontal scrolling.

**Given** a visitor navigates through Playground controls with a keyboard
**When** they move between collection links, editor, Run, Reset, Copy, Download, preview output, and recovery actions
**Then** focus order is logical, focus is visible, and every essential action is operable without a mouse.

**Given** an editor or preview has an empty, loading, success, or failure state
**When** that state appears
**Then** it communicates status and next action without hiding the component purpose, navigation, or explanatory content.

**Given** the visitor zooms text or uses assistive technology
**When** labels, code controls, errors, and status messages are read
**Then** semantic names, relationships, and status announcements remain understandable.

## Epic 3: Useful Weather Experience

Visitors can manually enter a supported location, understand the weather result and data source, and recover from invalid locations, unavailable data, rate limits, or provider failures without losing navigation or trust.
**FRs covered:** FR6, Weather-specific portions of FR7, and Weather-specific portions of FR9.

### Story 3.1: Select and document a compliant weather provider contract

As the product owner,
I want the Weather experience to use a reviewed WeatherAPI.com provider contract,
So that visitor data handling and the public feature remain legally and technically supportable.

**Acceptance Criteria:**

**Given** WeatherAPI.com is selected for MVP
**When** its terms and API documentation are reviewed
**Then** commercial use, attribution, rate limits, caching, client-key exposure, service availability, and location-data handling are recorded for the selected plan and endpoints.

**Given** WeatherAPI.com requires attribution or specific usage language
**When** the Weather surface is designed
**Then** the required attribution and limitations are represented in the page content and are not hidden behind an advertisement or control.

**Given** the provider cannot support the documented MVP data flow
**When** the contract review completes
**Then** the provider is rejected or the scope is explicitly revised before implementation proceeds; the site does not silently ship an unsupported integration.

**Given** MVP uses manual location entry only
**When** the Weather feature is specified
**Then** no precise device-location permission or collection is required, and the location sent to WeatherAPI.com is documented for the privacy surface.

### Story 3.2: Submit a manual location and display readable weather results

As a visitor checking the weather,
I want to enter a city or supported location and receive a readable result,
So that I can use the feature without granting precise device location.

**Acceptance Criteria:**

**Given** a visitor opens Weather
**When** the form is displayed
**Then** it provides a clearly labeled manual location field, an explicit submit action, and a clear indication of the WeatherAPI.com data source.

**Given** the visitor submits a supported location
**When** the request succeeds
**Then** the page displays a readable weather result with the location context, relevant conditions, update/time context where supplied, and required provider attribution.

**Given** the visitor submits a new location
**When** a previous result exists
**Then** the new request replaces or clearly supersedes the previous result without presenting stale data as current.

**Given** a visitor opens or reloads the static-export route
**When** no location has been submitted
**Then** the page provides useful explanatory content and an empty state rather than requiring a server session or prefilled precise location.

**Given** an advertisement is present on the Weather route
**When** the visitor enters a location or reviews results
**Then** the ad is visually and behaviorally separate from the form, submit action, result, and attribution.

### Story 3.3: Handle invalid locations, unavailable data, rate limits, and provider failures

As a visitor checking the weather,
I want actionable feedback when the request cannot be completed,
So that I understand what happened and can recover without losing navigation.

**Acceptance Criteria:**

**Given** the visitor submits an empty, malformed, or unsupported location
**When** validation runs or WeatherAPI.com responds with no matching location
**Then** the page identifies the problem in clear language, keeps the form usable, and suggests how to correct the input.

**Given** WeatherAPI.com is unavailable, rate-limited, or returns an unexpected error
**When** the request fails
**Then** the page shows a recoverable error state with retry or revised-search guidance and does not display a blank or fabricated result.

**Given** a request is in progress
**When** the visitor waits for a response
**Then** the loading state is distinct from the result and error states, prevents accidental duplicate submission where appropriate, and does not block access to site navigation or trust links.

**Given** a prior result exists and a new request fails
**When** the failure state is displayed
**Then** the page clearly distinguishes the failed new request from the prior result and does not imply that stale data is current.

**Given** the visitor uses keyboard navigation or assistive technology
**When** loading, success, or failure status changes
**Then** the relevant status is programmatically associated or announced and recovery actions are reachable.

### Story 3.4: Explain weather data, attribution, limitations, and location handling with original content

As a visitor deciding whether to use the Weather experience,
I want to understand what the data means and how my manual location input is handled,
So that I can use the result with appropriate context and trust.

**Acceptance Criteria:**

**Given** a visitor opens Weather before submitting a location
**When** the explanatory content is read
**Then** it explains the feature's purpose, what the displayed conditions represent, relevant limitations, and that the source is WeatherAPI.com.

**Given** a visitor reviews a result
**When** provider attribution, update context, or limitations apply
**Then** they are visible near the relevant result or in a clearly linked explanation, not hidden behind an advertisement or unrelated control.

**Given** a visitor enters a location
**When** the request is submitted
**Then** the page explains what location information is sent to WeatherAPI.com, does not claim to collect precise device location, and links to the applicable privacy policy.

**Given** WeatherAPI.com data is unavailable
**When** the visitor reads the fallback state
**Then** original explanatory content remains useful and does not present the external API response as the site's only value.

### Story 3.5: Make Weather controls, results, states, and trust links accessible and responsive

As a visitor using any device or input method,
I want the Weather form and result states to remain understandable and operable,
So that I can complete a search and interpret its outcome without barriers.

**Acceptance Criteria:**

**Given** Weather is viewed on desktop, tablet, or mobile
**When** the form, result, explanatory content, attribution, errors, and footer reflow
**Then** the layout remains readable, controls have usable tap targets, and no result or action is clipped or hidden.

**Given** a visitor uses keyboard navigation
**When** they move through the location field, submit action, status, result, privacy link, and recovery controls
**Then** focus order is logical, focus is visible, and all essential actions work without a mouse.

**Given** the Weather surface is empty, loading, successful, or failed
**When** the state is rendered
**Then** it communicates the current state and next action without relying on color or motion alone.

**Given** a visitor uses a screen reader or enlarged text
**When** they review form labels, result values, attribution, errors, and privacy context
**Then** semantic structure and relationships remain understandable and the result does not depend on visual-only presentation.

## Epic 4: AdSense-Safe Monetization Readiness

The site can pass a documented pre-monetization review for original content, privacy and consent, invalid-traffic safeguards, analytics baselines, and clearly separated ad placements across desktop, mobile, keyboard, responsive, Playground, Weather, and failure states.
**FRs covered:** FR8, FR9, and launch-gate/NFR11 requirements.

### Story 4.1: Establish privacy, consent, and data-flow readiness for monetized experiences

As a visitor,
I want clear privacy and consent information before applicable data use,
So that I can understand how advertising, analytics, WeatherAPI.com, and location input affect me.

**Acceptance Criteria:**

**Given** a visitor opens a monetized or potentially monetized surface
**When** they look for trust information
**Then** the privacy policy is reachable before or during use and describes AdSense, analytics, WeatherAPI.com requests, manual location data flow, contact submission, and any applicable cookies or local storage.

**Given** a region requires consent before personalized advertising or related data processing
**When** the visitor enters the applicable flow
**Then** the consent experience provides understandable information, an appropriate choice, and a way to change the decision where required before the applicable processing occurs.

**Given** precise device location is not enabled in MVP
**When** privacy and consent content is published
**Then** it explicitly states that the Weather experience uses manual location input and does not request precise device location.

**Given** consent or data-flow decisions are not yet approved
**When** the site is prepared for launch
**Then** personalized advertising remains disabled and the unresolved decision is visible in the readiness record.

### Story 4.2: Instrument discovery, interaction, failure, and return-visit analytics with baselines

As the product owner,
I want trustworthy measurement of how visitors use the portfolio and interactive projects,
So that launch decisions are based on user value and not ad clicks or artificial engagement.

**Acceptance Criteria:**

**Given** a visitor uses the site
**When** they discover a project, select a Playground component, run a preview, copy code, search Weather, or return to the site
**Then** the corresponding success/failure or discovery event is recorded with a documented event name and non-sensitive context.

**Given** an interaction fails
**When** a preview, copy action, or Weather request reports an error
**Then** the failure event distinguishes the relevant surface and outcome without collecting source secrets, precise device location, or unnecessary personal data.

**Given** analytics is loaded in the browser
**When** the static-export route renders or an optional analytics provider is unavailable
**Then** initialization is guarded and core content and interactions continue to work.

**Given** the site has a non-monetized soft-launch period
**When** baseline measurement is reviewed
**Then** sampling definitions, baseline values, and proposed launch targets are recorded for the required discovery, interaction, failure, and return-visit events before ads are enabled.

### Story 4.3: Define clearly separated, labeled, non-obstructive ad placements

As a visitor,
I want advertisements to be clearly distinct from site content and controls,
So that I can use the portfolio, Playground, and Weather experience without accidental clicks or confusion.

**Acceptance Criteria:**

**Given** an ad unit is placed on a published surface
**When** the page is rendered
**Then** the unit has independent styling, sufficient whitespace, and a clear Advertisement or Sponsored Links label where required; it does not resemble navigation, a resource, download, tool, editor, preview, form, result, or CTA.

**Given** the visitor uses a Playground editor/preview or Weather form/result
**When** they interact with controls
**Then** no ad overlays, sits immediately beside, or obstructs the control, output, error, attribution, or recovery action.

**Given** the visitor edits, runs, resets, copies, downloads, or searches Weather
**When** the interaction state changes
**Then** the ad does not auto-refresh, reposition, or appear as a consequence of the action.

**Given** an ad is unavailable or disabled
**When** the page renders
**Then** the content layout remains coherent and no empty ad state is mistaken for a site control or required content.

### Story 4.4: Protect against invalid traffic and misleading ad interactions

As the site owner,
I want monetization behavior to avoid invalid traffic and deceptive interaction patterns,
So that the site protects visitor trust and remains aligned with advertising policy.

**Acceptance Criteria:**

**Given** public copy, CTAs, and project content are published
**When** the site is reviewed for monetization
**Then** no content encourages ad clicks, self-clicking, artificial impressions, paid-to-click traffic, automated clicks, or other invalid traffic.

**Given** a visitor uses a navigation link, project link, download, editor action, preview action, copy action, Weather control, or recovery action
**When** they click or activate it
**Then** the action has a truthful label and does not route through, imitate, or depend on an ad unit.

**Given** ad placement or analytics signals suggest an accidental-click path
**When** the issue is identified
**Then** the placement can be disabled or corrected without breaking the underlying content and the issue is recorded for readiness review.

**Given** a visitor declines applicable consent
**When** a monetized route renders
**Then** the site does not use dark patterns, repeated prompts, or blocked content to pressure a consent or ad interaction.

### Story 4.5: Execute the responsive, keyboard, content, and interaction-path monetization readiness review

As the site owner,
I want a repeatable pre-launch review across every monetized surface and state,
So that ads are enabled only after foreseeable usability, accessibility, and policy risks are addressed.

**Acceptance Criteria:**

**Given** the Portfolio, Playground, Weather, Contact, Privacy, and Terms surfaces are available
**When** the readiness review is executed
**Then** each route is checked for working navigation, original supporting content, useful failure states, trust links, and no ad-dependent user outcome.

**Given** the review is performed on desktop, mobile, responsive breakpoints, and keyboard-only navigation
**When** reviewers traverse project discovery, component selection, editing, preview success/failure, copy, Weather success/failure, contact, and consent paths
**Then** ad placement does not overlap, resemble, obstruct, reposition around, or create foreseeable accidental-click paths near any interactive control.

**Given** a route or interaction fails a review criterion
**When** the finding is recorded
**Then** the finding includes the affected surface/state, risk, owner, remediation, and retest status, and the affected ad remains disabled until resolved.

**Given** all review paths pass
**When** the readiness record is finalized
**Then** it includes the review date, tested viewport/input combinations, policy/privacy checks, content checks, and evidence for the launch gate.

### Story 4.6: Gate ad enablement on all launch criteria and preserve a safe disabled state

As the site owner,
I want advertising to remain disabled until every documented launch gate passes,
So that monetization never outruns content quality, safety, privacy, or trust readiness.

**Acceptance Criteria:**

**Given** any required gate is incomplete, failed, or not evidenced
**When** the site is built or deployed
**Then** ad units remain disabled or absent and the site continues to provide the full portfolio, Playground, Weather, contact, and trust experience.

**Given** all launch gates pass
**When** ad enablement is approved
**Then** the readiness record confirms working navigation, original content, preview isolation, WeatherAPI.com terms, privacy/consent decisions, responsive/keyboard placement review, invalid-traffic safeguards, and analytics baselines.

**Given** ad configuration is changed after approval
**When** a placement, label, responsive rule, or interaction behavior changes
**Then** the affected review is invalidated and the unit remains disabled until the change is retested and reapproved.

**Given** an ad provider or optional monetization script fails to load
**When** a monetized route renders
**Then** core content, controls, previews, Weather results, navigation, and trust links remain available without a blocking error or misleading placeholder.

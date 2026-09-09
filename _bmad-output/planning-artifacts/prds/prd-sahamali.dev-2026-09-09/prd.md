---
title: AdSense-Ready Interactive Portfolio
status: final
created: 2026-09-09
updated: 2026-09-09
---

# PRD: AdSense-Ready Interactive Portfolio

*Working title — confirm.*

## 0. Document Purpose

This PRD defines the product direction and requirements for expanding sahamali.dev from a personal portfolio into a public, content-rich web destination with interactive projects. It is intended for the product owner and downstream UX, architecture, and implementation work. The PRD treats Google AdSense policy compliance as a product constraint, not as a guarantee of approval; implementation details and policy evidence belong in the downstream design and architecture artifacts.

## 1. Vision

sahamali.dev helps visitors understand Saham’s work and spend meaningful time exploring useful, original web experiences. Alongside the portfolio itself, visitors can learn from interactive projects, starting with a component playground where they can inspect, edit, preview, and copy React, HTML, and CSS examples, plus a weather experience powered by a third-party API.

The site should be content-first and trustworthy. Each interactive experience is surrounded by original explanations, examples, implementation notes, and clear navigation so visitors receive value whether or not they use an ad. Advertising must remain secondary to the content and separated from controls, editors, previews, and results.

The product goal is meaningful exploration and repeat value, not maximizing raw time on site. Visitors should stay because the content and tools are useful, with no forced interaction, deceptive navigation, or ad-heavy interruption.

The launch hierarchy is deliberate: the Portfolio is the trust and identity layer, the Playground is the primary engagement and original-content engine, and the Weather experience is a secondary proof-of-capability project. AdSense monetization is enabled only after the content and trust layers meet the documented launch gates.

## 2. Target User

### 2.1 Jobs To Be Done

- Understand who Saham is and what he builds.
- Browse practical, working examples rather than only reading a project list.
- Experiment with a component and quickly understand how it is built.
- Copy a useful code example for learning or reuse.
- Discover additional projects through clear, trustworthy navigation.
- Return to the site for new examples and useful content.

### 2.2 Key User Journeys

- **UJ-1. A visitor explores Saham’s work and tries a component.**
  - **Persona + context:** A broad public visitor arrives without a narrowly defined role and wants to understand the person behind the site and find something useful.
  - **Entry state:** The visitor lands on the portfolio site from an external link, search result, or direct visit.
  - **Path:** The visitor understands Saham’s profile, scans the project collection, opens the Playground, selects a component, edits it in the available editors, previews the result, and copies the code.
  - **Climax:** The visitor sees their change reflected in the live preview and can copy a usable component implementation.
  - **Resolution:** The visitor can return to the component collection, read related explanatory content, open another project, or contact Saham.
  - **Edge case:** If a demo, API result, or preview fails, the site explains the failure without blocking navigation or presenting an ad as a control.

## 3. Glossary

- **Portfolio** — The personal site and its profile, project, and contact surfaces.
- **Playground** — The interactive component collection where a visitor selects, edits, previews, and copies examples.
- **Component** — A reusable UI example presented in the Playground.
- **Editor** — The text-editing surface used to change a Component’s source.
- **Live preview** — The rendered result of the current Editor content.
- **Weather experience** — A project that presents weather information using a third-party weather API.
- **Original content** — Explanations, examples, implementation notes, and other material authored specifically for the site rather than copied or scraped.
- **Ad unit** — A Google-served advertising placement shown separately from the site’s content and controls.

## 4. Features

### 4.1 Portfolio and project discovery

**Description:** The Portfolio gives visitors a clear understanding of Saham and an accessible path to browse projects. Project cards and detail pages must explain what each project does and why it is useful, rather than presenting only a demo or an API result. Realizes UJ-1.

**Functional Requirements:**

#### FR-1: Explain the portfolio and projects

The Portfolio can present Saham’s identity, capabilities, and project collection with clear descriptions and links to each project. Realizes UJ-1.

**Consequences (testable):**
- A first-time visitor can identify who Saham is and what the site offers without using an interactive tool.
- Every published project has an original description, purpose, and working navigation path.
- Visitors can reach the Playground, Weather experience, and contact surface without relying on an Ad unit.

#### FR-2: Support project-to-project discovery

The Portfolio can recommend or link to related projects and Original content without misleading labels or interactions.

**Consequences (testable):**
- Project navigation remains usable when a demo or third-party API is unavailable.
- Ad units are visually and behaviorally distinct from navigation, project links, downloads, and calls to action.

### 4.2 Component Playground

**Description:** The Playground presents a Uiverse-style collection of Components, extended with React examples. A visitor selects a Component, edits its source in an Editor, views the Live preview, and copies code. Each Component page includes Original content that explains the example and its intended use. Realizes UJ-1.

**Functional Requirements:**

#### FR-3: Browse and select components

A visitor can browse the Playground collection and open a Component detail view with its example, description, and available source.

**Consequences (testable):**
- Each published Component has a stable route or equivalent deep link.
- The collection communicates the Component’s purpose, technology, and relevant usage context.
- The visitor can return to the collection without losing the broader Portfolio navigation.

#### FR-4: Edit and preview component code

A visitor can edit supported Component source in the Editor and run or view the resulting Live preview.

**Consequences (testable):**
- The visitor can distinguish source editing, preview output, and actions such as Run, Reset, Copy, and Download.
- Invalid or unsafe input produces an understandable error state without breaking the surrounding page.
- The Live preview does not execute unbounded behavior that can compromise the page or visitor device.
- The Live preview runs within a constrained execution boundary and cannot access site credentials, unrelated page content, or unrestricted browser capabilities.
- Preview failures, timeouts, and unsupported dependencies have a recoverable state with Reset and navigation still available.

#### FR-5: Copy usable component code

A visitor can copy the current Component source and receives clear confirmation of the copy result.

**Consequences (testable):**
- Copying does not require clicking an Ad unit or navigating away from the Component.
- The copied output corresponds to the selected or edited Component state.
- The page identifies any attribution, dependency, or usage conditions that apply.

### 4.3 Weather experience

**Description:** The Weather experience provides useful weather information through a third-party API and includes original explanatory content about what it shows, how to interpret it, and any limitations. The API provider’s commercial-use, attribution, rate-limit, and location-data requirements must be confirmed before launch. [ASSUMPTION: The first release allows a visitor to enter a city or location manually; precise device location is not required.]

**Functional Requirements:**

#### FR-6: Request and display weather information

A visitor can submit a supported location and receive a readable weather result or an actionable error state.

**Consequences (testable):**
- The request control and result state are distinct from every Ad unit.
- The page identifies the weather data source and any required attribution.
- Rate limits, unavailable data, and invalid locations result in useful feedback rather than a blank or misleading page.
- Before launch, the selected provider’s commercial-use, attribution, rate-limit, caching, and client-key terms are recorded and accepted.
- The site documents whether a location is sent to the provider and does not collect precise device location in MVP without an approved consent and privacy flow.

### 4.4 AdSense-safe content and advertising

**Description:** The site publishes Original content around projects and places Ad units only where they do not interfere with content, navigation, editors, previews, weather controls, or results. The site must not encourage clicks or create artificial traffic. AdSense approval is external and cannot be guaranteed by this product.

**Functional Requirements:**

#### FR-7: Publish original supporting content

The site can publish original explanations, tutorials, examples, implementation notes, limitations, and project context alongside interactive experiences.

**Consequences (testable):**
- A visitor can understand the purpose and value of a project without relying solely on API output or an interactive demo.
- Published content has clear authorship and is not copied or automatically generated without meaningful editorial value.
- Content remains useful when a third-party API or Live preview is unavailable.

#### FR-8: Separate advertising from interactive actions

The site can display Ad units in clearly distinct locations that do not resemble or obstruct navigation, Editors, Live previews, weather controls, copy actions, downloads, or other interactive content.

**Consequences (testable):**
- No Ad unit overlays or sits immediately beside a control where an accidental click is foreseeable.
- Ad units have independent styling, clear whitespace, and a consistent “Advertisement” or “Sponsored Links” label where labeling is required; they never resemble navigation, resources, downloads, tools, or project controls.
- Ad units are not labeled as resources, downloads, tools, or other site functionality.
- The site does not auto-refresh or reposition an Ad unit in response to editing, running, copying, or weather searches.
- A pre-launch placement review covers desktop, mobile, keyboard navigation, responsive layout changes, and the full Playground and Weather interaction paths.

#### FR-9: Support trust and privacy requirements

The site can provide a linked privacy policy and any required consent experience covering AdSense, analytics, the Weather experience, and location-related data handling.

**Consequences (testable):**
- Visitors can find the privacy policy before or while using monetized experiences.
- If precise location is added, the site obtains appropriate consent and explains collection and sharing before use.
- The site does not encourage ad clicks, self-clicking, artificial impressions, paid-to-click traffic, automated clicks, or other invalid traffic, and public copy explicitly avoids such requests.
- Consent, privacy, and data-flow decisions are recorded before enabling personalized advertising in any region where they are required.

## 5. Non-Goals (Explicit)

- Guaranteeing Google AdSense approval or a specific revenue level.
- Building a general-purpose code hosting platform or unrestricted user-generated publishing system.
- Showing advertisements inside the Editor, Live preview, generated code, or primary weather controls.
- Treating third-party weather output or copied component collections as sufficient Original content.
- Supporting every programming language or framework in the first Playground release.

## 6. MVP Scope

### 6.1 In Scope

- A clear Portfolio identity and project discovery experience.
- A first Playground release with selected HTML/CSS and React Components.
- Component selection, editing, Live preview, reset, and copy actions.
- Original explanatory content for each published project and Component.
- A Weather experience with a confirmed API contract, attribution, and failure states.
- Privacy and advertising surfaces designed around AdSense policy constraints.
- Launch readiness review covering preview isolation, API terms, privacy/consent, ad placement, and invalid-traffic safeguards before Ad units are enabled.

### 6.2 Out of Scope for MVP

- Visitor accounts, saved projects, or cloud synchronization.
- Arbitrary public sharing of visitor-generated code.
- Precise device geolocation unless a later privacy and consent design supports it.
- Ads inside interactive surfaces or any click-incentive program.
- A full tutorial or community platform with comments, ratings, or user submissions.

### 6.3 Launch Gates

The public launch may expose Ad units only after all of the following are true:

- The Portfolio, Playground, and Weather experience each have working navigation, useful failure states, and original supporting content.
- The Playground preview has an agreed execution boundary, code limits, denied capabilities, and recovery behavior.
- The Weather provider has been selected and its commercial-use, attribution, rate-limit, caching, and client-key terms have been reviewed.
- Privacy policy, consent, and location-data decisions are implemented for the regions and data flows that apply.
- Responsive and keyboard-accessible ad placement review passes without foreseeable accidental-click paths.
- Analytics instrumentation is active for project discovery, Playground selection, preview success/failure, copy success/failure, Weather request success/failure, and return visits; baseline values and launch targets are recorded before monetization is enabled.

## 7. Success Metrics

**Primary**

- **SM-1:** At least 70% of sampled visitors can identify Saham’s work and reach a project from the landing page without assistance. Validates FR-1 and FR-2. [ASSUMPTION: Initial target; confirm with baseline data.]
- **SM-2:** At least 30% of Playground visitors select a Component and reach a successful Live preview or copy action. Validates FR-3, FR-4, and FR-5. [ASSUMPTION: Initial target; confirm after instrumentation.]

**Secondary**

- **SM-3:** 90% of published project pages contain the required Original content, attribution, and limitation notes before Ad units are enabled. Validates FR-7 and FR-9.
- **SM-4:** Fewer than 1% of monitored sessions produce an accidental-ad-click investigation signal attributable to placement near an interactive control. Validates FR-8.
- **SM-5:** 100% of monetized project pages pass the documented content, privacy, attribution, and ad-placement readiness review before Ad units are enabled. Validates FR-7, FR-8, and FR-9.

Measurement method: instrument the events named in §6.3, review a baseline during a non-monetized soft launch, and record final targets and sampling definitions before enabling Ad units. SM-1 and SM-2 are planning targets, not a promise of AdSense approval.

**Counter-metrics (do not optimize)**

- **SM-C1:** Time on site must not be increased through obstructive navigation, forced interstitials, deceptive links, or ad-heavy layouts. Counterbalances SM-1 and protects user trust.
- **SM-C2:** Ad impressions or clicks must not be increased by placing Ad units near controls or encouraging clicks. Counterbalances monetization goals and protects policy compliance.

## 8. Open Questions

1. **Owner: Saham.** What page name should replace “Playground,” if any?
2. **Owner: Saham.** Which visitor outcome matters most after exploring: learning, copying code, contacting Saham, hiring, or returning for new content?
3. **Owner: Saham/architecture.** Which Component technologies are supported in MVP, and how will React dependencies be represented?
4. **Owner: Saham.** Which weather API will be used, and what are its commercial-use, attribution, rate-limit, caching, and client-key requirements?
5. **Owner: Saham.** Will the site use manual location entry only in MVP, or is precise device location required?
6. **Owner: Saham/privacy.** Which regions require a consent management experience before personalized advertising is enabled?
7. **Owner: Saham/analytics.** What baseline and target values should replace the initial success-metric assumptions, and which events will be measured?
8. **Owner: architecture/security.** What execution boundary will isolate Live preview code, and which browser capabilities are explicitly denied?

## 9. Assumptions Index

- §4.3: The first Weather experience allows manual location entry and does not require precise device location.
- §7: The initial success-metric targets are placeholders until baseline measurement exists.
- §4.2: The Playground’s first release supports selected HTML/CSS and React Components.

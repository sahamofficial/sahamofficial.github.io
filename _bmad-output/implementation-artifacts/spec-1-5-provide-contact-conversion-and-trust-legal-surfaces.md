---
title: 'Provide contact conversion and trust/legal surfaces'
type: 'feature'
created: '2026-09-14'
status: 'done'
baseline_commit: 'a273060bb76a590746a2e594caa4bb036bc3570f'
route: 'dispatch'
review_loop_iteration: 0
context:
  - 'C:\Projects\sahamofficial.github.io/_bmad-output/implementation-artifacts/epic-1-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The portfolio needs a clear, low-friction contact path and persistent trust/legal surfaces so visitors can reach out confidently and understand site privacy and terms without hunting through the shell or project pages.

**Approach:** Ship a contact surface that pairs a compact inquiry form with direct email and WhatsApp alternatives, then keep privacy and terms pages available from the shared shell footer and navigation so trust and legal information remain discoverable across the static-export portfolio.

## Boundaries & Constraints

**Always:** Keep the contact flow static-export-safe, accessible, and browser-safe; maintain the shared navigation/footer trust links in the global shell; use semantic labels and clear success/error states; make contact and legal content local and authored directly in-repo; preserve legacy DOM contracts and optional script guards.

**Never:** Add a CMS, backend persistence, or authentication layer for contact handling; make ads or a demo required for conversion; remove the global privacy/terms navigation or create duplicated trust surfaces; add a different contact mechanism that weakens the existing inquiry flow.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Contact route | Visitor opens `/contact` | The page renders a semantically structured inquiry form, direct email, and WhatsApp alternative | Missing or invalid form configuration is surfaced as a recoverable inline error and direct email remains available |
| Legal discovery | Visitor uses shell navigation or footer | Privacy and Terms links are visible and route to clear legal/trust pages | The default route contract remains usable if a browser script or enhancement is unavailable |
| Form submission | Visitor sends a message | Name, email, subject, and message are transmitted through the configured FormSubmit endpoint and inline status updates appear | Network or endpoint failures show a clear recovery message and direct email remains on-page |
| Narrow or keyboard view | Mobile or keyboard navigation | The form, contact actions, and legal links remain readable, focus-visible, and tap-friendly | Layout retains the primary contact path without clipping or ambiguity |

</frozen-after-approval>

## Code Map

- `src/app/contact/page.tsx` -- main Contact page with structured form, direct contact channels, and accessible inquiry flow.
- `src/app/privacy-policy/page.tsx` -- privacy page covering data handling, cookies/advertising, and contact-form disclosure.
- `src/app/terms/page.tsx` -- site terms and ownership/information boundaries.
- `src/app/layout.tsx` -- shared shell with main navigation and footer trust/legal links for persistent discovery.
- `public/assets/js/contact-form.js` -- AJAX form submission logic that guards the FormSubmit response and surfaces success/error messaging.
- `C:\Projects\sahamofficial.github.io/_bmad-output/implementation-artifacts/epic-1-context.md` -- epic-level requirements for trust, responsiveness, and static-export constraints.

## Tasks & Acceptance

**Execution:**
- [x] `src/app/contact/page.tsx` -- build a conversion-oriented Contact route with a labeled inquiry form and direct alternatives to email or WhatsApp.
- [x] `src/app/privacy-policy/page.tsx` -- document the site's data handling, cookie/ad personalization, and form-submission usage.
- [x] `src/app/terms/page.tsx` -- state site ownership, general use limits, and contact details.
- [x] `src/app/layout.tsx` -- keep the shared nav/footer trust links for Contact, Privacy, and Terms visible across the portfolio shell.
- [x] `public/assets/js/contact-form.js` -- replace the brittle server-side form handler with a FormSubmit-safe AJAX flow and user feedback.

**Acceptance Criteria:**
- Given a visitor opens Contact, when the page renders, then it provides a clearly labeled inquiry path with only necessary fields and a prominent alternative contact option.
- Given a visitor wants to review trust and privacy information, when they use the global navigation or footer, then Privacy Policy and Terms links remain visible and route to the appropriate pages.
- Given a visitor submits the contact form, when the request succeeds or fails, then the site shows the appropriate success or recovery message without breaking the static-export contract.
- Given a visitor uses mobile or keyboard navigation, when the contact and trust surfaces are displayed, then the actions remain readable, tappable, and focus-visible without obscuring the main conversion path.

## Implementation Notes

- Kept Contact, Privacy, and Terms as local route-owned pages rather than moving the content behind a server or CMS.
- Reused the global layout shell to keep Contact, Privacy, and Terms discoverable from both the sidebar nav and footer utility links.
- Updated the contact form to use a FormSubmit AJAX request with inline loading, success, and recovery states that remain compatible with the static-export site.
- Preserved semantic field labeling and clear direct alternatives (email and WhatsApp) so the contact route remains legible even when the form is unavailable.

### Review Findings

- [x] [Review][Patch] WhatsApp contact shortcut uses the wrong number format [src/app/contact/page.tsx:15-21]
  - The WhatsApp CTA points to `https://wa.me/0778502300` while the visible number is `+94 77 850 2300`. The link drops the country code and uses a non-normalized local format, so the direct conversion path can route incorrectly even though the email fallback remains available.

- [x] [Review][Patch] Contact form success and error states are not announced to assistive technology [src/app/contact/page.tsx:76-86] [public/assets/js/contact-form.js:13-43]
  - The form exposes `div.error-message` and `div.sent-message` but never sets `role="status"`, `aria-live`, or equivalent semantics. Screen-reader users will not reliably hear the result of submitting the form, which violates the accessibility and clear feedback requirements in the story.

#### Rejected
- `false` / review-gap concern: missing browser-level nav and portfolio-filter tests are a verification gap, not a current functional defect in this story. The code under review already implements the requested routes and behaviors; the critique is about test coverage, not a broken user path.
- `low` / review-gap concern: the repo lacks automated browser smoke tests for route and interactive DOM behavior. This is a valid quality concern, but not a direct user-facing defect in the story’s implemented contact/legal surfaces and it requires a broader testing strategy beyond this patch.

## Verification

**Commands:**
- `npx eslint src/app/contact/page.tsx src/app/privacy-policy/page.tsx src/app/terms/page.tsx public/assets/js/contact-form.js` -- expected: no lint errors.
- `npm run build` -- expected: static export completes and the Contact, Privacy, and Terms routes are generated without server-only breakage.

**Manual checks (if no CLI):**
- Open `/contact`, `/privacy-policy`, and `/terms` at desktop and mobile widths; confirm the form labels, alternative contact methods, and trust links remain visible and readable.
- Submit the form with a valid and invalid payload to confirm success and error messaging match the inline state updates.

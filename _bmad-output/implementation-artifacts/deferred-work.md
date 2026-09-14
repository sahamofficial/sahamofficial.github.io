- source_spec: `C:\Projects\sahamofficial.github.io\_bmad-output\implementation-artifacts\spec-1-1-establish-shared-portfolio-shell-design-tokens-and-accessible-navigation.md`
  summary: Add browser-level route-navigation tests for shared active navigation and mobile accessibility state.
  evidence: The repository has no browser test runner or test script; current validation uses static shell assertions, targeted lint, JavaScript syntax checks, and the production build.

## Deferred from: code review of spec-1-2-present-the-home-identity-and-conversion-ready-hero-paths (2026-09-10)

- Add browser-level mobile navigation state coverage; no browser test runner or test script exists.
- Add browser-level active-route and hash-scrollspy coverage; no browser test runner or test script exists.
- Add browser-level persisted-theme startup coverage; no browser test runner or test script exists.
- Verify focus behavior when a mobile same-page hash link closes the menu; this needs a browser-level accessibility check.
- Make active navigation synchronization independent of fixed timers; client-side transition timing needs browser-level route testing.
- Correct terminal suffixes for legal links; cosmetic alternate-theme/legal-shell concern outside the Home hero story.
- Audit remaining terminal green legacy surfaces; broader pre-existing theme cleanup is outside this story's hero surface.
- Reconcile shared metadata with hero copy; pre-existing shared-shell content outside this story.
- Derive `index-page` and `data-page` from the active route; shared route-shell behavior needs a broader navigation decision.
- Improve reusable light-theme contrast, glow tokens, and focus primitives; shared shell token concerns outside this story.
- Use a semantic container for social-profile labeling; shared shell semantics outside this story.

## Deferred from: code review of spec-1-3-present-about-and-resume-credibility-content (2026-09-10)

- source_spec: `C:\Projects\sahamofficial.github.io\_bmad-output\implementation-artifacts\spec-1-3-present-about-and-resume-credibility-content.md`
  summary: Add browser-level coverage for active navigation, optional AOS fallback, and persisted theme startup.
  evidence: The repository has no browser test runner or test script; targeted lint, static export, and exported-content assertions cover the available validation surface.

- source_spec: `C:\Projects\sahamofficial.github.io\_bmad-output\implementation-artifacts\spec-1-3-present-about-and-resume-credibility-content.md`
  summary: Clarify target-client and service-outcome language in the Home hero.
  evidence: This is Story 1.2 hero scope and is not caused by the About/Resume credibility implementation.
- source_spec: `C:\Projects\sahamofficial.github.io\_bmad-output\implementation-artifacts\spec-1-3-present-about-and-resume-credibility-content.md`
  summary: Reconcile recency wording and metadata in portfolio discovery content.
  evidence: This is Story 1.4 portfolio-content scope and is not caused by Story 1.3.
- source_spec: `C:\Projects\sahamofficial.github.io\_bmad-output\implementation-artifacts\spec-1-3-present-about-and-resume-credibility-content.md`
  summary: Expand project records and detail pages with ownership, scope, chronology, and inspection artifacts.
  evidence: Project-discovery data-model and detail-page work is outside this story.
- source_spec: `C:\Projects\sahamofficial.github.io\_bmad-output\implementation-artifacts\spec-1-3-present-about-and-resume-credibility-content.md`
  summary: Align shared metadata with the current portfolio claims.
  evidence: This is pre-existing shared-shell scope excluded from the credibility-content story.
- source_spec: `C:\Projects\sahamofficial.github.io\_bmad-output\implementation-artifacts\spec-1-3-present-about-and-resume-credibility-content.md`
  summary: Expand privacy disclosures for external resources and browser storage.
  evidence: This is pre-existing shared privacy scope outside this story.
- source_spec: `C:\Projects\sahamofficial.github.io\_bmad-output\implementation-artifacts\spec-1-3-present-about-and-resume-credibility-content.md`
  summary: Keep Portfolio navigation active on project detail routes.
  evidence: The issue is pre-existing shared navigation behavior and is outside this story.
- source_spec: `C:\Projects\sahamofficial.github.io\_bmad-output\implementation-artifacts\spec-1-3-present-about-and-resume-credibility-content.md`
  summary: Add runtime verification for Home portfolio filters.
  evidence: The repository has no browser or unit-test harness capable of exercising the client-side filter state.
- source_spec: `C:\Projects\sahamofficial.github.io\_bmad-output\implementation-artifacts\spec-1-3-present-about-and-resume-credibility-content.md`
  summary: Add a sitemap-to-generated-project-route contract test.
  evidence: No exported-HTML route test harness exists, and the concern belongs to Story 1.4.
- source_spec: `C:\Projects\sahamofficial.github.io\_bmad-output\implementation-artifacts\spec-1-3-present-about-and-resume-credibility-content.md`
  summary: Add runtime accessibility verification for mobile navigation state.
  evidence: No browser test runner exists and the behavior is shared-shell infrastructure.
- source_spec: `C:\Projects\sahamofficial.github.io\_bmad-output\implementation-artifacts\spec-1-3-present-about-and-resume-credibility-content.md`
  summary: Add runtime verification for AOS fallback visibility.
  evidence: No browser test runner exists and the optional enhancement is shared infrastructure.

## Deferred from: code review of spec-1-3-present-about-and-resume-credibility-content (2026-09-10)

- Active navigation synchronization relies on fixed timer retries; defer until browser-level route-transition coverage or a shared navigation synchronization design is available.
- Privacy policy disclosure of globally loaded external scripts and consent/data-flow implications is pre-existing shared-shell scope outside this story.
- Privacy policy disclosure of localStorage theme preference is pre-existing shared-shell privacy scope outside this story.

## Deferred from: code review of spec-1-3-present-about-and-resume-credibility-content (2026-09-10)

- Home portfolio filtering combines React `hidden` with the legacy Isotope controller; defer to Story 1.4 portfolio interaction work and browser-level validation.
- Terminal theme migration leaves green-era header, navigation, mobile-menu, and portfolio-overlay colors; defer as shared alternate-theme cleanup outside the About/Resume credibility change.
- Hero identity repeats the Full-Stack label across the eyebrow, chip, and typed role; defer to Story 1.2 hero scope.
- Home portfolio filter behavior has no executable interaction regression coverage; defer because the repository has no browser or unit-test harness.

## Deferred from: code review of spec-1-4-present-portfolio-project-discovery-with-original-project-context (2026-09-10)

- Add browser-level regression coverage for Home filters; the repository has no browser or unit test runner.
- Add a static contract assertion for every generated project detail page; no existing exported-HTML test harness is available.
- Add runtime coverage for mobile navigation semantics and visibility; this shared-shell behavior predates the story and lacks browser-level accessibility infrastructure.
- Add runtime coverage for active-route and hash-scrollspy synchronization; this shared-shell behavior predates the story and lacks browser-level route-transition infrastructure.
- Execute optional-enhancement fallback paths in verification; browser fallback coverage is unavailable and the behavior is shared infrastructure.
- Make late GLightbox and Isotope loading reinitialize enhancements; optional vendor timing is shared legacy infrastructure outside this story.
- Derive `index-page` and `data-page` from the active route; shared route-shell behavior outside the project-discovery change.
- Provide a no-JavaScript navigation fallback; pre-existing shared-shell behavior outside this story.
- Align metadata with the current portfolio content; shared metadata predates this story.
- Document all globally loaded external services in the privacy policy; shared privacy and data-flow scope outside this story.
- Disclose localStorage theme preference in the privacy policy; shared privacy scope outside this story.
- Add concrete proof to About focus areas; Story 1.3 content outside this review.
- Add verified education and experience chronology; Story 1.3 content outside this review.
- Reconcile Story 1.3 sprint status and deferred-work formatting; workflow artifacts outside this story.
- Replace absolute paths in implementation artifacts; pre-existing workflow artifact convention outside this story.

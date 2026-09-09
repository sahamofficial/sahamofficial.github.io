# AdSense Policy Review

## Verdict

Mostly policy-aware, but the first draft needed explicit product requirements for ad separation, labeling, invalid-traffic safeguards, and weather/location data handling before launch.

## Findings and disposition

### High — Ad placement near interactive controls

The original requirement said ads should be distinct from controls but did not require a placement review across responsive and error states. The PRD now requires independent styling, clear whitespace, no foreseeable accidental-click paths, and a pre-launch review covering desktop, mobile, keyboard navigation, Playground interactions, and Weather interactions.

### High — Deceptive navigation and labels

The PRD now requires clear “Advertisement” or “Sponsored Links” labeling where required and prohibits ad styling or placement that resembles navigation, resources, downloads, tools, or project controls.

### Medium — Invalid traffic and click encouragement

The PRD now explicitly prohibits self-clicking, click encouragement, artificial impressions, paid-to-click traffic, automated clicks, and related public copy.

### Medium — Weather/privacy data flow

The PRD now requires provider-term review before launch, attribution and rate-limit documentation, manual location as the MVP assumption, and an approved privacy/consent flow before precise location or personalized advertising is enabled.

### Disposition

No claim of guaranteed AdSense approval is made. The remaining provider, regional-consent, and implementation choices are launch-gate decisions owned by the product and architecture work.

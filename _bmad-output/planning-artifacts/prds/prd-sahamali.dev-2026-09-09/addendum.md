# Addendum: Policy and Downstream Notes

This addendum preserves supporting research and implementation-facing context that should inform UX and architecture without expanding the PRD's capability requirements.

## Google AdSense policy references

The following official Google guidance informed the PRD:

- [Publisher Policies](https://support.google.com/publisherpolicies/answer/10502938) — ads must not be placed on pages that exist primarily to show ads, and publishers need appropriate privacy disclosures.
- [Content and user experience](https://support.google.com/adsense/answer/10015918) — useful, original content and accessible, functional navigation support a quality user experience.
- [Program policies](https://support.google.com/adsense/answer/48182) — prohibits deceptive navigation, encouragement of clicks, and artificial traffic.
- [Ad placement policies](https://support.google.com/adsense/answer/1346295) — ads must not be placed where users could mistake them for controls or accidentally click them.
- [Invalid traffic](https://support.google.com/adsense/answer/16737) — publishers must not generate their own clicks or impressions or use incentivized or automated traffic.
- [EU user consent policy](https://www.google.com/about/company/user-consent-policy/) — consent and control requirements apply to relevant visitors and personalized-ad data flows.
- [Use of device and location data](https://support.google.com/publisherpolicies/answer/10437073) — precise location collection requires additional disclosure, consent, and handling controls.

These links are a point-in-time research record. Google policies can change, so the launch gate requires a current policy review before Ad units are enabled.

## Downstream design and architecture questions

- Define the Playground's supported source formats, dependency model, code-size limits, timeout behavior, and isolation boundary.
- Decide whether the preview is limited to static HTML/CSS/React output or supports arbitrary JavaScript and network access.
- Select a Weather provider and document commercial use, attribution, caching, rate limits, key exposure, and location-data flow.
- Design ad placements only after the interaction layout exists; evaluate mobile, keyboard, responsive, and error states.
- Define the consent and privacy surface for AdSense, analytics, weather requests, and any future location capability.


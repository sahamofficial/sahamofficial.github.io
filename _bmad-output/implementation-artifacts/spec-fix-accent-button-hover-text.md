---
title: 'Fix accent button hover text visibility'
type: 'bugfix'
created: '2026-09-14'
status: 'done'
route: 'oneshot'
review_loop_iteration: 0
context: ['C:\Projects\sahamofficial.github.io\AGENTS.md']
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Buttons using the indigo `#6D5DFC` accent lose readable text on hover because the theme-wide link hover color overrides their foreground color.

**Approach:** Add a shared hover rule for both portfolio button variants so their intended foreground colors remain stable while the button keeps its existing hover motion and theme styling.

</frozen-after-approval>

## Implementation Notes

The affected buttons use `.portfolio-button-primary` and `.portfolio-button-secondary` in shared page components. `public/assets/css/theme-neo.css` applies `html[data-theme="neo"] a:hover { color: var(--accent); }`, which matches the primary button background. The fix belongs in `src/app/globals.css` so all shared portfolio buttons are protected consistently without changing unrelated links or theme files.

Implemented a base hover foreground rule plus a higher-specificity theme-aware rule. This covers both anchor and button elements, remains safe if the theme attribute is briefly absent, and preserves the existing transform and focus behavior. The production build completed successfully.

## Review Triage Log

- Patched: the initial selectors only matched anchors, so they were broadened to cover any element using the shared button classes.
- Patched: a base fallback was added so the foreground remains stable even before a theme attribute is present.
- Rejected: acceptance-criteria and validation-plan findings were not implementation defects; this small one-shot spec records the verification in its implementation notes instead.

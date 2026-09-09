---
name: Saham Ali Portfolio
status: final
description: Premium developer portfolio for a full-stack builder with strong technical credibility, personal warmth, and conversion-focused contact pathways.
sources:
  - src/app/layout.tsx
  - src/app/page.tsx
  - public/assets/css/
updated: 2026-09-09
colors:
  surface-base: '#0B1020'
  surface-raised: '#121A2B'
  surface-soft: '#1A2336'
  surface-muted: '#0F172A'
  ink-primary: '#F5F7FB'
  ink-secondary: '#B7C3D9'
  ink-tertiary: '#7D8AA5'
  accent: '#62E3FF'
  accent-strong: '#7AF0B5'
  accent-warm: '#FFBA5C'
  border-subtle: '#21314C'
  border-strong: '#35507D'
  shadow-glow: '#62E3FF'
typography:
  display:
    fontFamily: 'Space Grotesk, Sora, sans-serif'
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.08'
    letterSpacing: '-0.04em'
  h2:
    fontFamily: 'Sora, Space Grotesk, sans-serif'
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.15'
  body:
    fontFamily: 'Inter, Nunito Sans, sans-serif'
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.7'
  caption:
    fontFamily: 'Spline Sans Mono, monospace'
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.5'
    letterSpacing: '0.08em'
rounded:
  sm: 8px
  md: 14px
  lg: 20px
  xl: 28px
  full: 9999px
spacing:
  '1': 4px
  '2': 8px
  '3': 12px
  '4': 16px
  '5': 24px
  '6': 32px
  '7': 40px
  '8': 48px
  '9': 64px
  gutter: 24px
  section: 88px
components:
  nav-link:
    color: '{colors.ink-secondary}'
    color-active: '{colors.accent}'
    radius: '{rounded.full}'
  hero-chip:
    background: '{colors.surface-soft}'
    border: '1px solid {colors.border-subtle}'
    color: '{colors.accent}'
    radius: '{rounded.full}'
  primary-button:
    background: '{colors.accent}'
    foreground: '{colors.surface-base}'
    radius: '{rounded.full}'
    shadow: '0 0 0 1px {colors.shadow-glow}, 0 14px 32px rgba(98, 227, 255, 0.25)'
  secondary-button:
    background: 'transparent'
    border: '1px solid {colors.border-strong}'
    foreground: '{colors.ink-primary}'
    radius: '{rounded.full}'
  card-surface:
    background: '{colors.surface-raised}'
    border: '1px solid {colors.border-subtle}'
    radius: '{rounded.lg}'
  stat-pill:
    background: '{colors.surface-soft}'
    color: '{colors.ink-secondary}'
    radius: '{rounded.full}'
---

## Brand & Style

This portfolio is intentionally confident and technical without becoming cold. The product reads as a specialist's portfolio: clear, precise, and modern, with a subtle sense of motion and the kind of engineering polish that tells a hiring manager or client that the work is grounded in real delivery. The brand voice is direct and capable, not exaggerated; it communicates craftsmanship and trust through type, spacing, and restraint.

The visual posture is a hybrid of premium technology product and personal portfolio. It balances developer practicality with a bit of personality: a dark canvas, luminous accent color, dominant typography, and strong CTA paths that invite inquiry without overwhelming the visitor. This is a portfolio built for professional persuasion.

## Colors

The palette leans dark and technical to support a trusted, engineering-first impression while still feeling human. It uses one cool neon accent as the primary signal, with a soft green accent for success and a warm amber accent for emphasis or secondary highlight.

- **Night Base (`#0B1020`)** is the default background. It creates a premium, immersive shell and keeps code-like or dashboard-like credibility high.
- **Slate Panels (`#121A2B` / `#1A2336`)** create structure without visual noise. Cards, nav surfaces, stat blocks, and list containers all sit within this tonal stack.
- **Ink (`#F5F7FB`)** is the leading text color. It maintains legibility with strong contrast while feeling crisp and modern.
- **Secondary Ink (`#B7C3D9`)** provides supporting copy and weak hierarchy. It preserves clarity in dense sections like About and Resume.
- **Cyan Signal (`#62E3FF`)** is the primary brand accent. It establishes the core identity and drives hover, active states, and emphasis moments.
- **Mint (`#7AF0B5`)** introduces a positive or “ready to ship” pulse for success-oriented moments. It is a secondary accent, not the default signal.
- **Warm Gold (`#FFBA5C`)** is reserved for attention-grabbing moments such as highlights, quick facts, or service emphasis and should remain secondary to the cyan system.

Avoid: overly saturated rainbow palettes, low-contrast text on dark surfaces, decorative gradients that obscure hierarchy, or heavy border noise that competes with content.

## Typography

Typography is the major brand tool. The portfolio uses a deliberate mix of modern geometric sans-serif for utility and highly legible display styles for hero statements and section labels.

- **Display** is bold and concise, used for the name and the strongest hero statement. It should feel like a skilled maker introducing themselves with confidence, not a startup slogan.
- **Heading** styles are compact and structured, optimized for scanning. They create a strong reading rhythm through the site, especially in About, Resume, Skills, and Portfolio sections.
- **Body text** maintains open line height and strong legibility, suited to long-form bio text and portfolio descriptions.
- **Caption and metadata** use a monospace tone to signal that this is a technical portfolio: dates, keywords, tags, and labels should feel like code or status metadata rather than marketing copy.

Use uppercase or tracking sparingly. The system should feel modern and capable, not gimmicky. Headings and label text should be clear first, expressive second.

## Layout & Spacing

The layout is built for scan, not clutter. Most content uses a centered editorial grid with a resilient single-column structure on smaller screens and roomy, two-column content blocks where needed. The portfolio is designed to support discovery: a first read in under 15 seconds, then deeper engagement with work, resume, and contact cues.

A generous rhythm keeps the content calm. The spacing system is intentionally larger than consumer app defaults to give the portfolio an air of authority and readability. Major sections sit in full-width bands with comfortable padding around the content area, while individual cards and rows use modest, consistent internal gutters.

- Desktop: a layered shell with a consistent left-rail or anchored masthead plus content columns.
- Tablet: content reflows to a simpler stack with preserved hierarchy.
- Mobile: single-column flow with strong tap targets and compact hero actions to preserve conversion flow.

## Elevation & Depth

Depth is expressed through subtle layering rather than dramatic shadows. The portfolio uses tonal contrast between surfaces, not heavy 3D effects. This keeps the experience premium and clean while allowing key elements like CTA buttons or card states to pop without becoming noisy.

Use a restrained glow around the primary accent in high-value moments such as CTA buttons or hero interactions. Avoid heavy drop shadows that look like dashboard chrome. The visual hierarchy should come from content architecture, contrast, and spacing, not from neon backgrounds or heavy casting.

## Shapes

Rounded corners are applied as a modern detail layer, never as an aesthetic gimmick. The overall system uses soft but defined corners that keep elements approachable while maintaining a professional product feel.

- `rounded/sm` for small chips and compact metadata
- `rounded/md` for cards and low-level surfaces
- `rounded/lg` for larger content blocks and layered panels
- `rounded/full` for pills, emphasis chips, and hero CTA buttons

Keep the shape language consistent: more geometric than playful, more polished than trendy. Curves should help readability and create product calm, not personality noise.

## Components

- **Nav link** — low-contrast text by default, cyan active state on the current section, pill-like focus ring reachable through keyboard navigation. Minimal, clear, and deliberate.
- **Hero chip** — small capsule with a subtle border and cyan text. It signals special role language—"Full-Stack Web Developer" or similar—without competing with the main headline.
- **Primary button** — bright cyan finish with dark text. High-contrast, attention-grabbing, and designed for request or contact actions. Use on primary call-to-action paths only.
- **Secondary button** — transparent surface with slim border. For alternate actions like viewing work, browsing more, or staying in the flow without committing to a primary action.
- **Card surface** — elevated panel with subtle border, ideal for projects, services, skills, or resume entries. The card should feel like an object on a dark table: tangible but not flashy.
- **Stat pill** — compact, metadata-like value block with muted background and clear text. Used for resume stats, capabilities, or quick confidence cues.

## Do's and Don'ts

| Do | Don't |
|---|---|
| Keep the dark theme consistent and comfortable across surfaces | Introduce many competing accent colors or gradient-heavy UI |
| Use bold hero typography and crisp CTAs to support conversion | Rebalance the page around decorative gimmicks or animation-heavy hero moments |
| Let the accent color signal depth and action without taking over the page | Overuse cyan on every control or surface |
| Keep metadata and tags in a technical tone | Turn resume and portfolio content into generic marketing copy |
| Use generous white space to keep the content believable and premium | Overcrowd sections with too many items or too much text |
| Encourage straightforward client inquiry and hiring contact | Hide contact pathways behind complex navigation |

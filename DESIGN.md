# Bloom Dental Portfolio Design System

**Purpose:** A public, beginner-friendly systems case study for marketing and data hiring managers.

**Design dials:** Variance 8/10 | Motion 8/10 | Density 4/10

**Truth boundary:** This is a completed workshop simulation. Projected goals are planning inputs, not live campaign results.

## Experience Hierarchy

The opening offers two distinct paths:

1. **90-second tour:** the business problem, proposed journey, Andre's contribution, and simulation boundary.
2. **30-minute presentation:** an 18-slide, five-chapter narrative that stands on its own with optional presenter notes.

The five persistent views are Quick Tour, System, 10-Phase Build, Deliverables, and Measurement. Detailed evidence is available without interrupting the opening story.

## Visual Tokens

| Role | Value | CSS token |
|---|---:|---|
| Graphite green background | `#13201D` | `--bg` |
| Deep graphite | `#0C1412` | `--bg-deep` |
| Surface | `#1B2A26` | `--surface` |
| Raised surface | `#22342E` | `--surface-raised` |
| Technical border | `#3B5149` | `--line` |
| Warm ivory | `#F2EAD9` | `--ivory` |
| Muted text | `#A7B7AD` | `--muted` |
| Clinical mint | `#A9D7B7` | `--mint` |
| Coral action | `#EF8B6C` | `--coral` |
| Amber projected target | `#E8BD70` | `--amber` |

Dark mode is the only theme. Avoid purple, cyan-neon styling, gradients, decorative orbs, and excessive glow. Mint marks active relationships, coral marks actions, and amber marks projected targets or launch dependencies.

## Typography

- **Instrument Serif:** major display headings only.
- **Manrope:** body copy, controls, and navigation.
- **JetBrains Mono:** system labels, formulas, and data definitions.
- Fonts are self-hosted in `assets/fonts` with `font-display: swap`.
- Hero-scale type is not used inside documents, controls, tables, or dashboards.

## Layout And Components

- Constrain primary reading content to 1240px and preserve generous vertical space.
- Use full-width bands and structured rows. Do not nest decorative cards.
- Use 6px radii, thin borders, visible focus, and minimum 44px interactive targets.
- Top-level navigation and nested document/KPI controls use ARIA tabs and keyboard arrows.
- The workflow lab is an authored explanation, not a screenshot recreation. Every node exposes its trigger, action, condition, and business purpose.
- The ten phases share one teaching structure: input, decision, actions, GHL location, output, purpose, and status.
- The eight deliverables remain complete, hardcoded, searchable website content.

## Presentation Rules

- The deck contains 18 slides grouped into Context, Journey, Build, Automation, and Measurement.
- The default is a clean audience slide. Presenter notes are optional and never change the URL.
- Five chapter markers replace a row of tiny slide dots; the outline provides direct slide access.
- Direct `#present/1-18` links, history navigation, arrow keys, Escape, focus restoration, an accessible focus trap, and slide announcements must remain supported.
- Motion emphasizes chapter changes and active relationships. It must not imply that projected figures are achieved results.

## Motion And Resilience

- Signature motion: a signal travels through the funnel path.
- Use short reveal staggers, path drawing, connected-node highlighting, and deliberate panel transitions.
- Pin at most one desktop story section and disable pinning on mobile.
- GSAP 3.12.5, ScrollTrigger 3.12.5, and Lucide 0.468.0 are pinned and self-hosted in `assets/vendor`.
- If animation libraries fail, all content remains visible and usable.
- Reduced motion disables travel, path drawing, reveal movement, and pinned behavior while preserving clear state changes.

## Content And Measurement Rules

- Explain GHL concepts in plain language before platform detail.
- Label `60 bookings in 60 days`, `<15% no-show rate`, and `40% whitening attach rate` as projected everywhere.
- Separate the 60-day acquisition window, appointment maturity window, and six-month recall cohort.
- Keep ad clicks and successful landing-page views as separate events.
- Show formulas with explicit denominators and use the KPI Diagnostic Lab to connect a symptom to evidence and one next test.
- Never add fake testimonials, client endorsements, production-readiness claims, or observed performance without verifiable live evidence.

## Release Checklist

- [ ] Quick Tour can be understood in roughly 90 seconds.
- [ ] Presenter notes support 28-32 minutes across all 18 slides.
- [ ] Ten phases, six workflows, and eight full deliverables are present.
- [ ] Hashes, legacy aliases, browser history, keyboard controls, and focus restoration work.
- [ ] 375px, 768px, 1024px, and 1440px layouts have no page-level overflow or overlap.
- [ ] Focus, contrast, heading order, touch targets, reduced motion, and library-failure fallbacks pass review.
- [ ] No external runtime dependencies, personal account screenshots, duplicate IDs, or false performance claims ship.


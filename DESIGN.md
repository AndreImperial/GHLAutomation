# Bloom Dental Portfolio Design System

**Purpose:** A public, beginner-first systems case study for marketing and data hiring managers. The site teaches the project through one fictional visitor, Sam, before exposing implementation vocabulary.

**Design dials:** Variance 8/10 | Motion 8/10 | Density 4/10

**Truth boundary:** This is a completed workshop simulation. Projected goals are planning inputs, not live campaign results.

## Experience Hierarchy

The opening offers two distinct paths:

1. **90-second diagnosis:** five customer handoff problems, their likely root causes, proposed responses, evidence, KPIs, and the simulation boundary.
2. **45-minute team presentation:** a 25-slide, six-chapter lesson that bridges B2B analytics into DTC martech through problem, diagnosis, solution, implementation, evidence, and measurement.

The five persistent views use the audience labels The Problem, The Fix, How I Built It, What I Made, and How We’d Know. They map to `#problem`, `#solution`, `#build`, `#evidence`, and `#measurement`. They use one canonical five-problem story so terminology and relationships remain consistent across the website and presentation.

The page also carries one recommended reading path: start with the problem, follow the fix, inspect the build, open the outputs, and finish with measurement. Every view has one next-stop handoff, while the header remains available for non-linear browsing.

## Beginner-First Content

- The first sentence answers the human question before naming a platform object.
- The teaching example is always Sam, a fictional visitor. Sam sees an offer, asks for help, chooses a time, gets reminders, attends, receives follow-up, and helps the team learn.
- The public layer uses concrete verbs: saw, asked, booked, attended, followed up, and checked.
- GHL is explained once in plain language: “GoHighLevel, or GHL, is a tool that keeps customer information, bookings, follow-up messages, and progress in one place.”
- Technical vocabulary appears inside `details` disclosures, the analyst layer, the glossary, or presenter notes.
- Each phase, document, workflow node, and measurement step uses the same order: what happened, why it matters, what I made, then technical detail.
- The 25-slide presentation is self-contained. Audience slides teach one idea at a time; notes carry the deeper walkthrough.

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
- The Automatic Helpers lab is an authored explanation, not a screenshot recreation. Every node exposes what it notices, what it does, why it matters, and its technical GHL location.
- The ten phases share one teaching structure: what I needed, what I decided, what I produced, which part of Sam’s journey it improves, and the technical setup.
- Each phase also names the problem addressed and solution delivered.
- The eight evidence documents remain complete, hardcoded, searchable website content.
- Problem selection remains consistent across the diagnostic explorer, solution detail, evidence matrix, and KPI diagnostic.

## Presentation Rules

- The deck contains 25 slides grouped into Setup, Conversion, Booking, Attendance, Customer State, and Learning Loop.
- The default is a clean audience slide. Presenter notes are optional and never change the URL.
- Six chapter markers replace a row of tiny slide dots; the outline provides direct slide access.
- Direct `#present/1-25` links, history navigation, arrow keys, Escape, focus restoration, an accessible focus trap, and slide announcements must remain supported.
- Motion emphasizes chapter changes and active relationships. It must not imply that projected figures are achieved results.

## Motion And Resilience

- Signature motion: a signal travels through five problem nodes as each friction resolves into a proposed solution and KPI.
- Use short reveal staggers, path drawing, connected-node highlighting, and deliberate panel transitions.
- Pin at most one desktop story section and disable pinning on mobile.
- GSAP 3.12.5, ScrollTrigger 3.12.5, and Lucide 0.468.0 are pinned and self-hosted in `assets/vendor`.
- If animation libraries fail, all content remains visible and usable.
- Reduced motion disables travel, path drawing, reveal movement, and pinned behavior while preserving clear state changes.

## Content And Measurement Rules

- Explain GHL concepts in plain language before platform detail. “Simple explanation” is the default; “Show the GHL setup” is opt-in.
- Label `60 bookings in 60 days`, `<15% no-show rate`, and `40% whitening attach rate` as projected everywhere.
- Separate the 60-day acquisition window, appointment maturity window, and six-month recall cohort.
- Keep ad clicks and successful landing-page views as separate events.
- Show formulas with explicit denominators and use the KPI Diagnostic Lab to connect a symptom to evidence and one next test.
- Never add fake testimonials, client endorsements, production-readiness claims, or observed performance without verifiable live evidence.

## Release Checklist

- [ ] The five problems and proposed solutions can be understood in roughly 90 seconds.
- [ ] Presenter notes and interactive pauses support exactly 45 minutes across all 25 slides.
- [ ] Ten phases, six workflows, and eight full deliverables are present.
- [ ] Hashes, legacy aliases, browser history, keyboard controls, and focus restoration work.
- [ ] 375px, 768px, 1024px, and 1440px layouts have no page-level overflow or overlap.
- [ ] Focus, contrast, heading order, touch targets, reduced motion, and library-failure fallbacks pass review.
- [ ] No external runtime dependencies, personal account screenshots, duplicate IDs, or false performance claims ship.

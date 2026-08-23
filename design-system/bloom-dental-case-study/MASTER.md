# Bloom Dental Dark Portfolio System

**Project:** Bloom Dental Studio Consultation Funnel and Automation System
**Purpose:** Public portfolio case study and beginner-friendly learning experience
**Design Dials:** Variance 8/10 | Motion 8/10 | Density 4/10
**Stack:** Vanilla HTML, CSS, JavaScript, GSAP 3.12.5, ScrollTrigger, Lucide
**Truth boundary:** Workshop simulation only. Projected goals are not live results.

## Product Reading

The experience teaches the build in one sequence: business problem, customer journey, GHL implementation, measurement, and launch dependencies. The primary audience is a non-GHL reviewer. The secondary audience is a marketing or data analytics reviewer who wants the complete deliverables and technical details.

## Visual Tokens

| Role | Hex | CSS variable |
|---|---|---|
| Graphite green background | `#13201D` | `--bg` |
| Deep graphite | `#0C1412` | `--bg-deep` |
| Surface | `#1B2A26` | `--surface` |
| Raised surface | `#22342E` | `--surface-raised` |
| Technical border | `#3B5149` | `--line` |
| Warm ivory | `#F2EAD9` | `--ivory` |
| Soft ivory | `#D7D5C8` | `--ivory-soft` |
| Muted text | `#A7B7AD` | `--muted` |
| Clinical mint | `#A9D7B7` | `--mint` |
| Strong mint | `#6EAA88` | `--mint-strong` |
| Coral action | `#EF8B6C` | `--coral` |
| Amber projected target | `#E8BD70` | `--amber` |
| Dark text on action | `#10201A` | `--ink` |

Rules:

- Dark mode is the only theme.
- Do not introduce purple, cyan-neon accents, gradient backgrounds, decorative orbs, or excessive glows.
- Keep borders thin and technical. The shared radius is 6px; circles are reserved for node and icon markers.
- Use color to explain state: mint means connected or active, coral means action, amber means projected target or launch dependency.
- Keep contrast at WCAG AA or higher for all body text and controls.

## Typography

- Display: `Instrument Serif`, regular weight, reserved for hero and section titles.
- Body and controls: `Manrope`, 400 to 800.
- System labels and data: `JetBrains Mono`, 400 to 600, uppercase only for labels.
- Letter spacing stays at 0 except small technical labels, which may use 0.04em to 0.08em.
- Do not use hero-scale type inside tables, lists, document panels, or navigation.

## Layout Rules

- The header is sticky and compact, with five hash-linked tabs: Quick Tour, System, 10-Phase Build, Deliverables, Measurement.
- The hero is a full-width automation scene. At desktop it stays below roughly 82% of the viewport so the orientation strip appears in the first view.
- Each top-level view uses a constrained 1240px reading width with generous vertical spacing.
- Use full-width bands and structured rows. Cards are reserved for repeated targets or genuinely framed tools; do not nest cards inside cards.
- The system map is allowed one horizontal scrolling region on narrow screens. The page itself must never overflow horizontally.
- Deliverables remain native hardcoded website content. Do not load Markdown, PDF pages, or old GHL screenshots.

## Component Rules

### Buttons and tabs

- Minimum touch target: 44px high.
- Primary action uses coral fill with dark text.
- Secondary action uses a transparent surface and mint or technical border.
- Top-level navigation uses ARIA tabs with one active state, keyboard arrows, Home, End, and visible focus.
- Familiar actions use Lucide icons. Icon-only controls must have an accessible label.

### Journey nodes

- The signal path is an authored diagram, not decoration. Every node has a business label and a GHL detail state.
- Plain English is the default. The GHL Detail toggle changes the explanation without hiding the node path.
- A selected node uses mint border and coral top rule. Do not use a glow as the only state signal.

### Phase rows

- Ten phases use the same teaching structure: input, decision, actions taken, where it lives in GHL, output, business purpose, status.
- Native `details` elements keep the page scannable while preserving full content and keyboard access.
- Completion is labeled `Complete` for the simulation. Production dependencies are called out separately.

### Deliverable library

- Eight documents use a persistent index and one visible native document panel.
- Document content must remain complete, readable, and searchable by browser find.
- No fake testimonials, client quotes, achieved revenue, or personal account information.

## Motion Rules

- Use pinned GSAP 3.12.5 core and ScrollTrigger from the public CDN.
- Signature moment: a coral signal travels through the hero path while the mint path draws into view.
- Use short reveal staggers, SVG path drawing, tab entry transitions, and node highlighting.
- Pin only the desktop system-map storytelling stage. Disable pinning below 1024px.
- Do not use `window` scroll listeners. Use IntersectionObserver and ScrollTrigger.
- When GSAP fails, every section and all content remain visible with no required animation state.
- When `prefers-reduced-motion` is active, remove SVG motion, disable pinning, and keep content at rest.

## Content Rules

- The public reader should understand the problem, solution, path, ten phases, and simulation boundary without opening Deliverables.
- Label `60 bookings in 60 days`, `<15% no-show rate`, and `40% whitening attach rate` as projected goals wherever they appear.
- Explain GHL concepts before using platform names without context.
- Keep the six workflow names and modular ownership visible.
- Explain the decision log: form-first booking, no fake testimonials, modular workflows, SMS consent gating, free hosted URLs, and sender configuration dependency.

## QA Checklist

- [ ] Five top-level tabs work with click, keyboard arrows, Home, End, hashes, and back/forward.
- [ ] Legacy aliases map correctly: `#beginner-path`, `#implementation`, `#board`, `#process`, `#documents`, `#results`.
- [ ] Ten phases, six workflows, and eight full deliverables remain present.
- [ ] 375px, 768px, 1024px, and 1440px have no horizontal overflow or clipped text.
- [ ] Hero shows a hint of the next section on desktop and mobile.
- [ ] Focus states, heading order, contrast, and 44px touch targets pass review.
- [ ] GSAP failure and reduced motion preserve readable content.
- [ ] No old screenshots with personal email or fake performance claims are published.

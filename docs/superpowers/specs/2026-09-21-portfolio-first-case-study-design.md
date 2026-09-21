# Bloom Dental Portfolio-First Case Study Design

## Purpose

Reframe the Bloom Dental website as a polished portfolio case study first and a teaching resource second. A hiring manager should understand Andre's contribution, judgment, and technical range within two to three minutes. A technical reviewer should be able to inspect the complete implementation, and a teammate should still be able to use the optional presentation mode for a longer knowledge-sharing session.

The redesign must preserve the work already recovered and embedded in the site: ten build phases, six interactive workflows, eight full deliverables, two filled templates, seven GHL setup guides, the discovery transcript, the original message sequence, supporting workflow messages, the measurement plan, and the 25-slide presentation.

## Audience Priority

The primary audience is a marketing, martech, CRM, operations, or data hiring manager reviewing Andre's portfolio. Secondary audiences are technical reviewers and teammates learning how the simulated system works.

The default experience therefore answers these questions in order:

1. What business problem did Andre address?
2. What did he personally design and build?
3. How does the complete system work?
4. What evidence shows the depth of the work?
5. How would the team measure and improve it after launch?
6. What did Andre learn, and what remains before production launch?

## Positioning And Truth Boundary

The project is a completed workshop simulation for Bloom Dental Studio. It is not a live client engagement and does not contain observed campaign results. Every performance figure must be labeled as a projected goal, including:

- 60 bookings in 60 days
- Below 15% no-show rate
- 40% whitening attach rate

The website may state that the simulation and its planned build are complete. It must not imply that ads ran, patients participated, revenue was generated, or projected goals were achieved.

## Experience Strategy

The site will use progressive disclosure rather than a course-like guided lesson. Every major view begins with a concise portfolio narrative, then allows the visitor to open deeper technical material.

The default path is:

1. Case Study Overview
2. Customer Journey
3. Interactive Automation System
4. Ten-Phase Build Process
5. Project Deliverables
6. Measurement Plan
7. Conclusion

The 45-minute presentation remains an optional, separate mode. Progress tracking, forced chapter completion, resume prompts, and lesson-style gating will not be introduced into the main website.

## Navigation And Routes

The primary navigation will use these portfolio-facing labels:

| Visible label | Canonical hash | Purpose |
| --- | --- | --- |
| Overview | `#overview` | Concise case study, contribution, scope, and outcome |
| System | `#system` | Customer journey and six interactive workflows |
| Build Process | `#build` | Ten chronological implementation phases |
| Deliverables | `#deliverables` | Complete documents, templates, messages, and guides |
| Measurement | `#measurement` | Projected goals, formulas, diagnostics, and review plan |
| Conclusion | `#conclusion` | Skills, decisions, lessons, and launch dependencies |

The header keeps a distinct `Present` action for the 25-slide presentation.

Existing canonical routes, document deep links, presentation routes, and legacy aliases must continue to resolve. Legacy links such as `#problem`, `#solution`, `#implementation`, `#process`, `#evidence`, `#documents`, `#results`, `#tour`, `#beginner-path`, `#board`, and `#automation` will map to the closest new portfolio view without breaking browser history.

## Overview

The opening view must establish the project as a portfolio case study within the first viewport.

It includes:

- Project title: Bloom Dental Studio Consultation Funnel & Automation System
- One-sentence business challenge
- Andre's role and contribution
- Project type: workshop simulation
- Tools and disciplines used
- Scope inventory: ten phases, six workflows, eight deliverables, two filled templates, and one measurement framework
- Projected-goal boundary
- Primary action: Explore the system
- Secondary action: Open the presentation

The hero should retain the strongest existing dark visual identity and signal animation. Its visual story should depict the customer path rather than a generic decorative scene. The next section must remain visible on common desktop and mobile viewports.

Immediately after the hero, add a visible `My Contribution` section covering:

- Discovery synthesis
- Campaign and funnel strategy
- Conversion content
- GHL data model and configuration
- Workflow architecture
- Measurement design
- Simulation QA

This section should use concise evidence-backed statements rather than a long personal biography.

## System

The System view combines the customer journey and automation architecture in one coherent story.

### Customer Journey

Show the journey as a connected flow:

1. Meta ad
2. Landing page
3. Inquiry form
4. Booking calendar
5. Confirmation and reminders
6. Consultation outcome
7. Whitening or other follow-up
8. Six-month recall
9. KPI review

Each step provides a plain-language explanation first and optional GHL detail second. The existing simple/technical control remains, but its labels should be understandable without platform knowledge.

### Interactive Automation System

Preserve all six interactive workflow models:

1. New Lead to Booking
2. Consultation Booking
3. No-Show Recovery
4. Post-Consultation Whitening
5. Whitening Payment Update
6. Six-Month Recall

The six workflows must be directly discoverable from the System view and from the opening scope inventory. Each workflow shows its complete node path, including trigger, conditions, waits, messages, opportunity updates, branches, and exits where applicable.

Selecting a node reveals:

- What it notices
- What it does
- Why it matters
- GHL action or location
- Related field, tag, stage, or message

The workflow diagram should remain visually interactive but readable when animations are unavailable or reduced motion is enabled.

## Build Process

Preserve all ten phases in chronological order:

1. Discovery
2. Campaign Strategy
3. Funnel Blueprint
4. Conversion Content
5. GHL Data Model
6. Lead Capture
7. Booking
8. Automation
9. Measurement
10. Simulation QA

Each phase opens with a concise portfolio summary:

- Problem addressed
- Input used
- Decision made
- Actions completed
- Output produced
- Business purpose
- Part of the customer journey improved
- Completion status

The full technical implementation remains inside the expanded phase. This includes GHL locations, fields, tags, stages, triggers, waits, branches, exit rules, events, source guides, and linked deliverables. Multiple phases may remain open simultaneously for comparison.

## Deliverables

The Deliverables view is the proof library, not a list of downloads or document screenshots. All content remains hardcoded as native website sections.

It preserves:

- Eight complete workshop deliverables
- Filled Business Case Intake Worksheet
- Filled KPI Scorecard workbook content
- Seven GHL setup guides
- Discovery transcript
- Original 23-message sequence
- Six workflow-linked message assets

Each item begins with a short portfolio introduction:

- What this item is
- Why it was needed
- What decision or system component it supports
- What a reviewer should look for

The full source-faithful content follows inside a clearly labeled expandable section. Filled templates should look like designed project artifacts, not raw Markdown, spreadsheet dumps, or plain text blocks.

Direct document and template hashes must remain functional. A relationship matrix should connect customer-journey stages to the deliverables that support them.

## Measurement

The Measurement view explains how the simulated campaign would be evaluated after launch without implying observed performance.

The visible story follows the funnel:

1. Landing-page views
2. Form submissions
3. Consultation bookings
4. Attended consultations
5. Whitening bookings
6. Six-month recall responses

For every step, show:

- Business question
- People included
- Metric or rate
- Formula
- What a weak result might mean
- Evidence to inspect in GHL
- Recommended next test

The initial 60-day acquisition window must remain separate from the six-month recall measurement. Preserve CTR, arrival rate, landing-page conversion, lead-to-booking rate, show rate, no-show rate, whitening attach rate, and recall conversion.

Retain an interactive diagnostic experience that connects a weak number to likely causes, supporting evidence, and the next experiment. Technical event names, UTMs, data fields, and reporting notes remain available for analytics reviewers.

## Conclusion

The Conclusion view gives the case study a clear ending. It summarizes:

- What Andre built
- The most important design decisions
- What the project demonstrates
- Transferable marketing, CRM, automation, and analytics skills
- What was learned during the build
- The first experiment recommended after launch
- Remaining production dependencies

Production dependencies include sender-domain configuration, live advertising, final compliance review, real contact consent, production data validation, and ongoing optimization. The conclusion must distinguish completed simulation work from work that can only happen after a real launch.

Provide direct links back to the workflows, filled templates, full deliverables, measurement framework, and presentation.

## Presentation Mode

Retain the existing 25-slide, 45-minute presentation as an optional knowledge-sharing mode. It must work independently from the main site and preserve:

- `#present/1-25` deep links
- Six chapter controls
- Presenter notes
- Glossary
- Outline
- Arrow-key navigation
- Escape-to-exit
- Focus trap and restoration
- Browser history behavior

The presentation may use beginner-friendly teaching language and Sam as a fictional example, but the main website should not inherit lesson controls or mandatory sequencing.

## Visual And Interaction Direction

Preserve the current dark identity:

- Graphite-green background
- Warm ivory text
- Mint for connected or completed system relationships
- Coral for friction and important actions
- Amber only for projected goals and unresolved dependencies
- Instrument Serif, Manrope, and JetBrains Mono
- Thin technical borders and restrained corner radii
- Lucide icons

Motion should clarify relationships. Retain the travelling signal, connected-node highlighting, workflow selection, and purposeful reveals. Avoid continuous decoration, excessive glow, generic dashboards, decorative orbs, and animations that suggest projected results were achieved.

The information hierarchy must remain calm despite the volume of material. Use concise summaries, generous spacing, clear section numbering, and expandable technical depth. Dense tables and long documents must scroll within their own containers on narrow screens without causing page-level horizontal overflow.

## Content Model

Reuse the existing canonical JavaScript data where possible. Do not introduce competing copies of workflows, phases, presentation content, or document metadata.

The main content relationships are:

- Overview links to the system, build process, deliverables, measurement, and presentation.
- Customer-journey steps link to relevant workflows, phases, deliverables, and metrics.
- Workflow nodes link to their messages, tags, fields, and pipeline stages.
- Build phases link to their source guides and outputs.
- Deliverables link back to the decisions and journey steps they support.
- Measurement diagnostics link to the relevant event, workflow, or customer step.
- Conclusion links to the strongest evidence for Andre's contribution.

## Accessibility And Resilience

Preserve and verify:

- Semantic heading order
- Keyboard-accessible primary tabs and nested controls
- Visible focus states
- Correct ARIA relationships
- 44px minimum interactive targets
- Browser back and forward behavior
- Focus restoration after presentation mode
- Reduced-motion alternatives
- Full content visibility if GSAP or ScrollTrigger is unavailable
- WCAG AA text contrast
- No duplicate IDs
- No hidden content behind the fixed header

## Implementation Scope

Expected files:

- `index.html`: navigation labels, section hierarchy, portfolio introductions, conclusion structure, and direct placement of deliverables
- `styles.css`: portfolio overview, contribution section, system diagrams, workflow panels, deliverable artifacts, responsive density, and presentation compatibility
- `script.js`: route aliases, canonical content relationships, workflow interactions, document navigation, diagnostics, and presentation behavior
- `README.md`: portfolio purpose, content inventory, routes, editing guidance, testing, and deployment
- `DESIGN.md`: final visual tokens, hierarchy, interaction rules, and portfolio-first rationale
- `tests/`: routing, workflow discoverability, deliverable completeness, presentation behavior, accessibility relationships, and responsive safeguards

`PRODUCT.md` remains untouched.

## Validation

The completed redesign must pass these checks:

1. A hiring manager can explain the problem, Andre's role, the system, and the simulation boundary within two to three minutes.
2. All ten phases, six workflows, eight deliverables, two filled templates, seven setup guides, discovery transcript, and message assets remain available.
3. Every projected target is labeled projected.
4. All canonical routes, legacy aliases, document links, and presentation links work with browser history.
5. Workflow nodes remain keyboard accessible and expose complete descriptions.
6. The presentation retains all 25 slides and exactly 45 minutes of planned timing.
7. The site has no page-level horizontal overflow at 375px, 768px, 1024px, and 1440px.
8. Reduced motion and missing animation-library fallbacks preserve all information.
9. There are no console errors, duplicate IDs, broken ARIA references, inaccessible controls, or external runtime dependencies.
10. Automated tests, the Impeccable detector, browser screenshots, and live Render route checks are completed before release.

## Success Criteria

The finished website should feel like a complete, credible portfolio case study rather than a course, document archive, or simulated dashboard. The default reading path should demonstrate Andre's strategic thinking and implementation depth without requiring the visitor to understand GHL. Full technical and workshop detail must remain available without overwhelming the opening experience.

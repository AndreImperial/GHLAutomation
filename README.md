# Bloom Dental Studio Portfolio Case Study

A dark, static portfolio case study showing how a consultation funnel, GoHighLevel automation system, and measurement plan were designed for the Fast Track Workshop simulation.

The public site leads with Andre's contribution and the complete customer system. Beginner explanations make the work easy to follow, while technical reviewers can inspect all workflows, phases, deliverables, filled templates, source guides, formulas, and QA decisions.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https%3A%2F%2Fgithub.com%2FAndreImperial%2FGHLAutomation)

## Live Site

[ghlautomation.onrender.com](https://ghlautomation.onrender.com/)

## Portfolio Flow

- `#overview`: project challenge, role, contribution, scope, and simulation boundary.
- `#system`: nine-step customer journey and six interactive workflow reconstructions.
- `#automation`: direct shortcut to the workflow lab inside System.
- `#build`: ten chronological phases with decisions, actions, outputs, purpose, and technical setup.
- `#deliverables`: eight complete deliverables, two filled templates, and the full workshop source library.
- `#deliverables/business-case-intake`: completed Business Case Intake Worksheet.
- `#deliverables/kpi-scorecard`: completed KPI Scorecard and dashboard structure.
- `#measurement`: measurement path, formulas, projected goals, reporting windows, and diagnostic lab.
- `#conclusion`: strongest decisions, lessons, first live experiment, and production launch dependencies.
- `#present/1`: optional 25-slide, 45-minute presentation with chapters, glossary, outline, and presenter notes.

Legacy links remain supported, including `#problem`, `#tour`, `#solution`, `#board`, `#implementation`, `#process`, `#evidence`, `#documents`, and `#results`.

## Complete Content Inventory

- 10 start-to-finish build phases.
- 6 interactive automation workflows with inspectable nodes.
- 8 complete final deliverables rendered as native website content.
- 2 completed workshop templates rendered as native website content.
- 7 complete GHL setup guides.
- 1 complete discovery transcript.
- 1 original 23-message email and SMS sequence.
- 6 workflow-linked message assets for the final simulation model.
- 1 measurement framework with formulas, reporting windows, dashboard plan, and diagnostic logic.
- 25 presentation slides totaling 45 minutes.

The site does not load Markdown files, document screenshots, or spreadsheet embeds. The full material is hardcoded into accessible HTML so it can be read, searched, linked, and reviewed directly.

## Open Locally

Serve this folder with any static server. For example:

```powershell
py -3 -m http.server 4173 --bind 127.0.0.1
```

Then open `http://127.0.0.1:4173/#overview`.

There is no build step or runtime package installation. Render serves the repository root using `render.yaml`.

## Verification

The browser tests use Playwright and Node's test runner:

```powershell
node --check script.js
node --test tests/*.test.js
```

The suite checks content completeness, canonical and legacy routes, workflow interactions, responsive overflow, ARIA relationships, reduced motion, missing animation libraries, presentation timing, keyboard focus, and focus restoration.

## Editing Notes

- Edit public copy and native deliverable content in `index.html`.
- Edit route, workflow, phase, measurement, and presentation behavior in `script.js`.
- Edit the dark visual system, responsive layouts, focus states, and motion alternatives in `styles.css`.
- Keep fonts and Lucide, GSAP, and ScrollTrigger self-hosted in `assets/`.
- Update the title, description, canonical URL, and social preview URLs if the site moves.
- Replace `assets/og-bloom-dental.png` only with a publication-safe `1200x630` image.
- Keep projected figures labeled as projected until verified campaign data exists.
- Do not add personal account screenshots, fake testimonials, client endorsements, or achieved-result claims.

## Truth Boundary

This is a completed workshop simulation, not a live client campaign. `10/10` means the documented simulation build is complete. The campaign was not launched, so `60 bookings in 60 days`, `below 15% no-show rate`, and `40% whitening attach rate` are projected goals. Sender-domain setup, live ads, production compliance review, clinic process validation, and real campaign data remain launch dependencies.

# Bloom Dental Studio Portfolio Site

Static portfolio case study for the Fast Track Workshop project, updated to show the implemented GoHighLevel simulation rather than only the original blueprint.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https%3A%2F%2Fgithub.com%2FAndreImperial%2FGHLAutomation)

## Open Locally

From this folder:

```powershell
py -3 -m http.server 4173 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:4173/
```

## Edit Before Publishing

- Update the footer email in `index.html`.
- Replace "Andre" with your preferred public name if needed.
- Keep the results language as targets unless you later add verified campaign performance data.
- The site now uses the workshop content directly instead of document preview images.
- The Workshop Docs section has tabs for each deliverable with the full content hardcoded into `index.html`.
- The implementation tracker shows all ten workshop phases as complete, from strategy through simulation QA.
- The tracker can show all phases or only completed phases; each phase opens into an educational explanation.
- The Guide, Implemented System, Glossary, Status, and Reflection sections frame the project as a simulation learning showcase.
- The Process and Funnel sections use flowchart-style visuals to show how the strategic workstreams connect.
- The Project Map and phase links connect the visual flow directly to the matching Workshop Docs tab.
- The Board layer presents the workshop as a Miro-style canvas with phase lanes, sticky-note decisions, funnel steps, and deliverable links.
- Each Workshop Docs tab includes a key-decision callout to make the hardcoded deliverables feel more guided and less static.
- The hardcoded Workshop Docs are enhanced into native reading pages with section cards, mini tables of contents, and desktop reading progress.

## Structure

- `index.html`: case study content, phase-by-phase process narrative, workshop document-content tabs, and learning guide sections
- `styles.css`: visual system, responsive layout, accessibility states
- `script.js`: tabs, hash navigation, phase-status filtering, document interfaces, and reveal motion
- `assets/`: archived workshop preview images, currently not shown on the page
- `render.yaml`: Render static-site deployment configuration

## Portfolio Framing

Best positioning: this is a simulated campaign strategy and implemented GoHighLevel system. It teaches the phase-by-phase flow used to turn a business case into a funnel, conversion copy, CRM objects, workflows, and a measurement plan without claiming live campaign results. Email delivery remains a disclosed configuration/QA item rather than a claimed success.

# Bloom Dental Studio Portfolio Site

Dark, static portfolio case study for the Fast Track Workshop simulation. It teaches the project to a complete beginner through one fictional visitor, Sam: Sam sees an offer, asks for help, chooses a time, receives reminders, attends, receives follow-up, and helps the team learn what to check next.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https%3A%2F%2Fgithub.com%2FAndreImperial%2FGHLAutomation)

## Open Locally

Serve this folder with any static server, then open:

```text
http://127.0.0.1:4173/
```

For example, with Python installed:

```powershell
py -3 -m http.server 4173 --bind 127.0.0.1
```

The site has no build step and no runtime dependency install. Render serves the repository root using `render.yaml`.

The public version is available at [ghlautomation.onrender.com](https://ghlautomation.onrender.com/).

Start at `#problem` and follow the on-page reading path in order: The Problem, The Fix, How I Built It, What I Made, then How We’d Know. Each view ends with one clear next step, so the site can be presented without asking the audience to choose where to go next.

## Experience Map

- `#problem`: The Problem. A short, plain-English story showing five places where Sam could get lost.
- `#solution`: The Fix. Sam’s seven-step journey, a Simple explanation/GHL setup disclosure, and six interactive Automatic Helpers.
- `#build`: How I Built It. Ten chronological beginner phases, with the original technical setup inside each phase.
- `#evidence`: What I Made. Eight complete workshop documents, native website content, beginner introductions, and a journey evidence map.
- `#measurement`: How We’d Know. Six people-based checks, projected goals, measurement windows, analyst details, and the KPI Diagnostic Lab.
- `#present/1`: a self-contained 25-slide, 45-minute beginner knowledge share grouped into six chapters. Use the chapter markers or outline, open the glossary when a term is unfamiliar, toggle presenter notes when speaking, use the arrow keys to move, and press `Escape` to exit.

Legacy hashes continue to work: `#tour` and `#beginner-path` open Problem; `#system` and `#board` open Solution; `#implementation` and `#process` open Build; `#deliverables` and `#documents` open Evidence; and `#results` opens Measurement.

## Edit Before Publishing

- Change the public name and contact email in `index.html` and the footer.
- Update the `<title>`, description, canonical URL, and social preview URLs in `index.html` when the site moves.
- Replace copy directly in the native HTML. The deliverables are intentionally hardcoded into the site; no Markdown or document images are loaded.
- Replace `assets/og-bloom-dental.png` with another 1200x630 publication-safe image if the visual identity changes.
- Keep runtime libraries pinned in `assets/vendor` and fonts in `assets/fonts`; see `THIRD_PARTY_NOTICES.md` before upgrading them.
- Keep `60 bookings in 60 days`, `<15% no-show rate`, and `40% whitening attach rate` labeled as projected goals until verified campaign data exists.
- Add real proof only after it is publication-safe. The current release intentionally contains no GHL screenshots, personal account information, fake testimonials, or achieved campaign results.

## Structure

- `index.html`: five-view shell, Sam’s story, guided reading path, presentation layer, and all hardcoded workshop evidence.
- `styles.css`: dark graphite-green token system, beginner summaries, technical disclosures, responsive layouts, focus states, and reduced-motion rules.
- `script.js`: canonical five-problem story model, ARIA tab navigation, chaptered presentation and notes, hashes and history, legacy aliases, workflow maps, evidence relationships, measurement diagnostics, and GSAP fallback behavior.
- `DESIGN.md`: canonical visual, interaction, content, and release rules for the beginner-first architecture.
- `THIRD_PARTY_NOTICES.md`: versions, licenses, and sources for self-hosted browser assets.
- `assets/favicon.svg`: publication-safe favicon.
- `assets/og-bloom-dental.png`: 1200x630 social preview.
- `PRODUCT.md`: product context used to keep the redesign aligned to the simulation and its audiences.
- `render.yaml`: Render static-site configuration.

## Truth Boundary

This is a completed workshop simulation, not a live performance case study. Sam is a fictional teaching example. `10/10` means the workshop build is documented and configured for simulation QA. Sender-domain setup, live ads, production compliance review, and real campaign data remain launch dependencies.

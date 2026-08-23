# Bloom Dental Studio Portfolio Site

Dark, static portfolio case study for the Fast Track Workshop simulation. The site teaches the project from business problem to customer journey, GHL implementation, automation, measurement, and simulation QA.

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

## Experience Map

- `#tour`: approximately 90 seconds covering the problem, proposed path, Andre's contribution, and simulation boundary.
- `#present/1`: self-contained 18-slide presentation grouped into Context, Journey, Build, Automation, and Measurement. Use the five chapter markers or outline to navigate, toggle presenter notes when speaking, use the arrow keys to move, and press `Escape` to exit.
- `#system`: customer path, Plain English/GHL Detail switch, reconstructed six-workflow node lab, and decision log.
- `#build`: ten completed phases, each with input, decision, actions, GHL location, output, purpose, and status.
- `#deliverables`: eight full workshop documents presented as native website content.
- `#measurement`: projected goals, measurement windows, event model, KPI tree, dashboard plan, formulas, and interactive KPI Diagnostic Lab.

Legacy hashes continue to work: `#beginner-path`, `#implementation`, `#board`, `#process`, `#documents`, and `#results` map to the nearest new view.

## Edit Before Publishing

- Change the public name and contact email in `index.html` and the footer.
- Update the `<title>`, description, canonical URL, and social preview URLs in `index.html` when the site moves.
- Replace copy directly in the native HTML. The deliverables are intentionally hardcoded into the site; no Markdown or document images are loaded.
- Replace `assets/og-bloom-dental.png` with another 1200x630 publication-safe image if the visual identity changes.
- Keep runtime libraries pinned in `assets/vendor` and fonts in `assets/fonts`; see `THIRD_PARTY_NOTICES.md` before upgrading them.
- Keep `60 bookings in 60 days`, `<15% no-show rate`, and `40% whitening attach rate` labeled as projected goals until verified campaign data exists.
- Add real proof only after it is publication-safe. The current release intentionally contains no GHL screenshots, personal account information, fake testimonials, or achieved campaign results.

## Structure

- `index.html`: five-view shell, contribution story, guided presentation layer, and all hardcoded workshop deliverables.
- `styles.css`: dark graphite-green token system, responsive layouts, focus states, and reduced-motion rules.
- `script.js`: ARIA tab navigation, chaptered presentation and notes, hashes and history, legacy aliases, journey explanations, workflow maps, KPI diagnostics, deliverable switching, and GSAP fallback behavior.
- `DESIGN.md`: canonical visual, interaction, content, and release rules.
- `THIRD_PARTY_NOTICES.md`: versions, licenses, and sources for self-hosted browser assets.
- `assets/favicon.svg`: publication-safe favicon.
- `assets/og-bloom-dental.png`: 1200x630 social preview.
- `PRODUCT.md`: product context used to keep the redesign aligned to the simulation and its audiences.
- `render.yaml`: Render static-site configuration.

## Truth Boundary

This is a completed workshop simulation, not a live performance case study. `10/10` means the workshop build is documented and configured for simulation QA. Sender-domain setup, live ads, production compliance review, and real campaign data remain launch dependencies.

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const { chromium } = require("playwright");

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4173";
const root = path.resolve(__dirname, "..");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");

const views = ["overview", "system", "build", "measurement", "conclusion", "deliverables"];
const panelIds = { overview: "view-problem", system: "view-solution", build: "view-build", measurement: "view-measurement", conclusion: "view-conclusion", deliverables: "view-evidence" };
const projectedFigure = /60 bookings|below 15%|<\s?15%|40% whitening/gi;
const qualifier = /projected|goal|target|guardrail|not (a|the) result|not results/i;

test("CSS custom properties are all defined", () => {
  const defined = new Set([
    ...css.matchAll(/(--[\w-]+)\s*:/g),
    ...html.matchAll(/(--[\w-]+)\s*:/g),
    ...script.matchAll(/["'`](--[\w-]+)["'`]/g)
  ].map((match) => match[1]));
  const used = new Set([...css.matchAll(/var\((--[\w-]+)\s*\)/g)].map((match) => match[1]));
  const missing = [...used].filter((name) => !defined.has(name));
  assert.deepEqual(missing, [], `Undefined custom properties: ${missing.join(", ")}`);
});

test("no new dated patch sections are appended to styles.css", () => {
  // Existing sections are allowed until they are folded into the component rules.
  const allowed = [
    "2026-09-29: overview-only hero, nav scroll cue, verification ledger",
    "2026-09-30: story restructure — at a glance, compact phases, library tab",
    "2026-09-30: hero system diagram",
    "2026-09-30: view transitions between case-study views",
    "2026-09-30: measurement funnel chart (baseline vs projected)",
    "2026-09-30: closing contact block",
    "2026-09-30: presentation visuals for measurement, outcomes, and test findings"
  ];
  const headers = [...css.matchAll(/\/\*\s*(20\d\d-\d\d-\d\d[^*]*?)\s*\*\//g)].map((match) => match[1]);
  const added = headers.filter((header) => !allowed.includes(header));
  assert.deepEqual(added, [], "Add styles to the matching component section instead of a new dated patch");
});

test("rendered views have no broken deliverable links, stray 'undefined', or unqualified projections", { timeout: 60000 }, async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const problems = [];
  try {
    for (const view of views) {
      await page.goto(`${baseUrl}/#${view}`, { waitUntil: "networkidle" });
      await page.waitForFunction((id) => document.getElementById(id) && !document.getElementById(id).hidden, panelIds[view]);
      const result = await page.evaluate((id) => {
        const panel = document.getElementById(id);
        // Open every disclosure so collapsed copy is checked too.
        document.querySelectorAll("#new-case-study details").forEach((details) => { details.open = true; });
        // The academy's source material is quoted as supplied, so it is not checked as Andre's claims.
        document.querySelectorAll("[data-workshop-source]").forEach((source) => { source.style.display = "none"; });
        const links = [...document.querySelectorAll('#new-case-study a[href^="#deliverables/"]')]
          .map((link) => link.getAttribute("href").split("/")[1]);
        const missing = [...new Set(links)].filter((docId) => !document.getElementById(`docs-panel-${docId}`));
        const shared = [...document.querySelectorAll("#new-case-study > :not(.view-panel)")].filter((element) => element.offsetParent !== null);
        return { missing, text: [panel.innerText, ...shared.map((element) => element.innerText)].join("\n") };
      }, panelIds[view]);
      if (result.missing.length) problems.push(`${view}: links to missing documents ${result.missing.join(", ")}`);
      for (const word of ["undefined", "NaN", "[object Object]"]) {
        if (new RegExp(`\\b${word.replace(/[[\]]/g, "\\$&")}\\b`).test(result.text)) problems.push(`${view}: rendered text contains "${word}"`);
      }
      for (const match of result.text.matchAll(projectedFigure)) {
        const window = result.text.slice(Math.max(0, match.index - 160), match.index + match[0].length + 160);
        if (!qualifier.test(window)) problems.push(`${view}: "${match[0]}" has no projected/goal qualifier nearby`);
      }
    }

    await page.goto(`${baseUrl}/#present/1`, { waitUntil: "networkidle" });
    const slideCount = await page.locator("[data-presentation-slide]").count();
    for (let index = 1; index <= slideCount; index += 1) {
      await page.evaluate((slide) => { window.location.hash = `#present/${slide}`; }, index);
      await page.waitForTimeout(60);
      const text = await page.evaluate(() => document.querySelector(".presentation-slide.is-active")?.textContent || "");
      if (/\bundefined\b|\bNaN\b/.test(text)) problems.push(`slide ${index}: text contains undefined/NaN`);
    }
  } finally {
    await browser.close();
  }
  assert.deepEqual(problems, []);
});

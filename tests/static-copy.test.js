const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const { chromium } = require("playwright");

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4173";
const html = fs.readFileSync(path.resolve(__dirname, "..", "index.html"), "utf8");

// Interactive widgets legitimately render text from data when the visitor makes a choice.
const dynamicRegions = [
  "[data-problem-panel]",
  "[data-problem-selector]",
  ".workflow-overview",
  ".workflow-node-detail",
  "#journey-node-detail",
  "#kpi-diagnostic-panel",
  ".evidence-matrix"
].join(", ");

test("authored headings and labels are not rewritten by JavaScript", { timeout: 60000 }, async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto(`${baseUrl}/#overview`, { waitUntil: "networkidle" });
    const drift = await page.evaluate(({ source, dynamic }) => {
      const selector = "h1, h2, h3, .section-label";
      const collect = (root) => [...root.querySelectorAll(selector)]
        .filter((element) => !element.closest(dynamic))
        .map((element) => element.textContent.replace(/\s+/g, " ").trim())
        .filter(Boolean);
      const staticDoc = new DOMParser().parseFromString(source, "text/html");
      const authored = new Set(collect(staticDoc));
      const rendered = collect(document);
      return rendered.filter((text) => !authored.has(text));
    }, { source: html, dynamic: dynamicRegions });
    assert.deepEqual(drift, [], "Headings rendered at runtime that are not in index.html; edit the HTML instead of rewriting copy in script.js");
  } finally {
    await browser.close();
  }
});

test("every slide carries its own presenter notes", () => {
  const slides = [...html.matchAll(/<article id="(presentation-slide-[^"]+)"[\s\S]*?<\/article>/g)];
  assert.equal(slides.length, 25);
  const problems = [];
  for (const [block, id] of slides) {
    const heading = block.match(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/)?.[1].trim();
    const notesTitle = block.match(/class="presentation-talk"><h3>([\s\S]*?)<\/h3>/)?.[1].trim();
    if (!notesTitle) problems.push(`${id}: no notes`);
    else if (notesTitle !== heading) problems.push(`${id}: notes titled "${notesTitle}" but slide says "${heading}"`);
    if (!/class="presentation-guide"/.test(block)) problems.push(`${id}: missing speaker guide`);
    if (!/class="presentation-transition">Transition: \S/.test(block)) problems.push(`${id}: missing transition`);
  }
  assert.deepEqual(problems, []);
});

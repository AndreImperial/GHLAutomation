const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4173";

test("all ten phases expose portfolio summaries and technical setup", { timeout: 15000 }, async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto(`${baseUrl}/#build`, { waitUntil: "networkidle" });
    assert.equal(await page.locator(".phase-row").count(), 10);
    assert.equal(await page.locator("[data-phase-problem]").count(), 10);
    assert.equal(await page.locator("[data-phase-output]").count(), 10);
    assert.equal(await page.locator("[data-phase-journey]").count(), 10);
    assert.equal(await page.locator(".phase-technical-setup > summary").count(), 10);
    assert.equal(await page.locator(".phase-row[open]").count(), 1);
  } finally {
    await browser.close();
  }
});

test("deliverables remain complete and gain portfolio introductions", { timeout: 15000 }, async () => {
  assert.equal((html.match(/class="document-panel native-deliverable"/g) || []).length, 8);
  assert.equal((html.match(/class="document-panel native-filled-template"/g) || []).length, 2);
  assert.ok(html.includes('data-workshop-source="discovery"'));
  for (let guide = 1; guide <= 7; guide += 1) assert.ok(html.includes(`data-workshop-source="ghl-0${guide}"`));
  assert.equal((html.match(/data-source-message=/g) || []).length, 23);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto(`${baseUrl}/#deliverables`, { waitUntil: "networkidle" });
    assert.equal(await page.locator("[data-artifact-introduction]").count(), 10);
    const firstIntroduction = page.locator("[data-artifact-introduction]").first();
    for (const label of ["WHAT THIS IS", "WHY IT WAS NEEDED", "WHAT TO LOOK FOR", "SYSTEM AREA SUPPORTED"]) {
      await assert.doesNotReject(() => firstIntroduction.getByText(label, { exact: true }).waitFor());
    }
  } finally {
    await browser.close();
  }
});

module.exports = { html };

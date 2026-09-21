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

module.exports = { html };

const assert = require("node:assert/strict");
const test = require("node:test");
const { chromium } = require("playwright");

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4173";

test("measurement and conclusion close the case study honestly", { timeout: 20000 }, async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto(`${baseUrl}/#measurement`, { waitUntil: "networkidle" });
    assert.equal(await page.locator("[data-measurement-step]").count(), 6);
    const projectedTargets = page.locator(".target-grid");
    for (const phrase of ["PROJECTED: 60 BOOKINGS IN 60 DAYS", "PROJECTED: BELOW 15% NO-SHOW RATE", "PROJECTED: 40% WHITENING ATTACH RATE"]) {
      await assert.doesNotReject(() => projectedTargets.getByText(phrase, { exact: false }).waitFor());
    }
    await assert.doesNotReject(() => page.locator("#view-measurement").getByText(/60-day acquisition window/i).waitFor());
    await assert.doesNotReject(() => page.locator("#view-measurement").getByText(/six-month recall window/i).waitFor());

    await page.goto(`${baseUrl}/#conclusion`, { waitUntil: "networkidle" });
    for (const heading of ["What I built", "Strongest decisions", "What I learned", "First live experiment", "Before production launch"]) {
      await assert.doesNotReject(() => page.getByRole("heading", { name: heading }).waitFor());
    }
    await assert.doesNotReject(() => page.locator(".portfolio-conclusion").locator('a[href="#automation"]').waitFor({ state: "visible" }));
    await assert.doesNotReject(() => page.locator(".conclusion-proof-nav").locator('a[href="#deliverables/business-case-intake"]').waitFor({ state: "visible" }));
  } finally {
    await browser.close();
  }
});

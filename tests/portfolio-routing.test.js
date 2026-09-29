const assert = require("node:assert/strict");
const test = require("node:test");
const { chromium } = require("playwright");

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4173";

test("portfolio routes and legacy aliases resolve without losing deep links", { timeout: 20000 }, async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto(`${baseUrl}/#overview`, { waitUntil: "networkidle" });
    assert.equal((await page.locator(".primary-tab.is-active").textContent()).trim(), "Overview");

    await page.goto(`${baseUrl}/#implementation`, { waitUntil: "networkidle" });
    assert.equal((await page.locator(".primary-tab.is-active").textContent()).trim(), "Build Process");

    await page.goto(`${baseUrl}/#deliverables/kpi-scorecard`, { waitUntil: "networkidle" });
    await assert.doesNotReject(() => page.locator("#docs-panel-kpi-scorecard").waitFor({ state: "visible" }));

    await page.goto(`${baseUrl}/#automation`, { waitUntil: "networkidle" });
    await assert.doesNotReject(() => page.locator("#automation-workflows").waitFor({ state: "visible" }));

    await page.goto(`${baseUrl}/#overview`, { waitUntil: "networkidle" });
    await page.getByRole("tab", { name: "System" }).click();
    assert.equal(new URL(page.url()).hash, "#system");
    await page.goBack();
    assert.equal(new URL(page.url()).hash, "#overview");

    for (const [hash, label] of [
      ["#overview", "Overview"],
      ["#system", "System"],
      ["#build", "Build Process"],
      ["#measurement", "Measurement"],
      ["#conclusion", "Conclusion"],
      ["#deliverables", "Deliverables"]
    ]) {
      await page.goto(`${baseUrl}/${hash}`, { waitUntil: "networkidle" });
      assert.equal((await page.locator(".primary-tab.is-active").textContent()).trim(), label);
    }
    const tabOrder = await page.locator(".primary-tab").allTextContents();
    assert.deepEqual(tabOrder.map((label) => label.trim()), ["Overview", "System", "Build Process", "Measurement", "Conclusion", "Deliverables"]);
  } finally {
    await browser.close();
  }
});

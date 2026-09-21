const assert = require("node:assert/strict");
const test = require("node:test");
const { chromium } = require("playwright");

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4173";

test("system connects the customer journey to all six workflows", { timeout: 20000 }, async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto(`${baseUrl}/#system`, { waitUntil: "networkidle" });
    assert.equal(await page.locator("[data-customer-journey-step]").count(), 9);
    await assert.doesNotReject(() => page.getByText("Meta ad", { exact: true }).waitFor());
    await assert.doesNotReject(() => page.getByText("KPI review", { exact: true }).waitFor());

    const workflows = page.locator('#automation-workflows [role="tab"][data-workflow]');
    assert.equal(await workflows.count(), 6);
    for (let index = 0; index < 6; index += 1) {
      await workflows.nth(index).click();
      assert.equal(await workflows.nth(index).getAttribute("aria-selected"), "true");
      assert.ok(await page.locator(".workflow-node-card").count() > 0);
    }

    await page.locator(".workflow-node-card").first().click();
    const nodeDetail = page.locator(".workflow-node-detail");
    await nodeDetail.getByText("Technical setup", { exact: true }).click();
    for (const label of ["WHAT IT NOTICES", "WHAT IT DOES", "WHY IT MATTERS", "WHERE IT LIVES IN GHL"]) {
      await assert.doesNotReject(() => nodeDetail.getByText(label, { exact: true }).waitFor());
    }
  } finally {
    await browser.close();
  }
});

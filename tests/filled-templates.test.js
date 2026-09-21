const assert = require("node:assert/strict");
const test = require("node:test");
const { chromium } = require("playwright");

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4173";

test("the two completed workshop templates are native, complete website sections", { timeout: 20000 }, async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.setDefaultTimeout(4000);

  try {
    await page.goto(`${baseUrl}/#deliverables/business-case-intake`, { waitUntil: "networkidle" });

    const tabs = page.locator(".doc-tab");
    assert.equal(await tabs.count(), 10);
    await assert.doesNotReject(() => page.getByText("8 COMPLETE DELIVERABLES", { exact: true }).waitFor());
    await assert.doesNotReject(() => page.getByText("2 FILLED WORKSHOP TEMPLATES", { exact: true }).waitFor());

    const intake = page.locator("#docs-panel-business-case-intake");
    await assert.doesNotReject(() => intake.waitFor({ state: "visible" }));
    assert.equal(await intake.locator(".full-document").getAttribute("open"), "");
    await assert.doesNotReject(() => intake.getByText("Around 20 monthly leads, only about 6 book", { exact: false }).waitFor());
    await assert.doesNotReject(() => intake.getByText("Pressure-free guidance and transparent smile options", { exact: false }).waitFor());
    await assert.doesNotReject(() => intake.getByText("Workshop example", { exact: true }).first().waitFor());

    await page.goto(`${baseUrl}/#deliverables/kpi-scorecard`, { waitUntil: "networkidle" });
    const scorecard = page.locator("#docs-panel-kpi-scorecard");
    await assert.doesNotReject(() => scorecard.waitFor({ state: "visible" }));
    assert.equal(await scorecard.locator(".full-document").getAttribute("open"), "");
    await assert.doesNotReject(() => scorecard.getByText("Bloom Dental Studio - 60-Day New Patient Consultation Campaign", { exact: true }).waitFor());
    await assert.doesNotReject(() => scorecard.getByText("Weekly Tracker", { exact: true }).waitFor());
    await assert.doesNotReject(() => scorecard.getByText("=SUM(C2:C9)", { exact: true }).waitFor());
    await assert.doesNotReject(() => scorecard.getByText("=IF(B14<=C14,\"On Track\",\"Needs Attention\")", { exact: true }).waitFor());
    await assert.doesNotReject(() => scorecard.getByText("PROJECTED TARGET", { exact: true }).first().waitFor());

    await page.goto(`${baseUrl}/#build`, { waitUntil: "networkidle" });
    await assert.doesNotReject(() => page.locator("#view-build").getByRole("link", { name: "Open the business case intake", exact: true }).waitFor({ state: "visible" }));

    await page.goto(`${baseUrl}/#measurement`, { waitUntil: "networkidle" });
    await assert.doesNotReject(() => page.locator("#view-measurement").getByRole("link", { name: "Open the KPI scorecard", exact: false }).waitFor({ state: "visible" }));

    await page.goto(`${baseUrl}/#conclusion`, { waitUntil: "networkidle" });
    await assert.doesNotReject(() => page.locator("#view-conclusion").getByRole("link", { name: "Open the business case intake", exact: true }).waitFor({ state: "visible" }));
    await assert.doesNotReject(() => page.locator("#view-conclusion").getByRole("link", { name: "Open the KPI scorecard", exact: false }).waitFor({ state: "visible" }));
  } finally {
    await browser.close();
  }
});

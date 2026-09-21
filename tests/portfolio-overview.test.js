const assert = require("node:assert/strict");
const test = require("node:test");
const { chromium } = require("playwright");

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4173";

test("overview presents the project and Andre's contribution before deep detail", { timeout: 15000 }, async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto(`${baseUrl}/#overview`, { waitUntil: "networkidle" });
    await assert.doesNotReject(() => page.getByRole("heading", { name: /consultation funnel.*automation system/i }).waitFor());
    await assert.doesNotReject(() => page.locator(".hero-status").getByText(/workshop simulation/i).waitFor());
    await assert.doesNotReject(() => page.getByText(/10 phases/i).first().waitFor());
    await assert.doesNotReject(() => page.getByText(/6 workflows/i).first().waitFor());
    await assert.doesNotReject(() => page.getByRole("heading", { name: "My Contribution" }).waitFor());
    for (const phrase of ["Discovery synthesis", "Workflow architecture", "Measurement design", "Simulation QA"]) {
      await assert.doesNotReject(() => page.locator(".contribution-section-primary").getByText(phrase, { exact: false }).waitFor());
    }
    await assert.doesNotReject(() => page.getByRole("link", { name: /explore the system/i }).waitFor());
    await assert.doesNotReject(() => page.getByRole("button", { name: /present/i }).first().waitFor());
  } finally {
    await browser.close();
  }
});

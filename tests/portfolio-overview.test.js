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
    await assert.doesNotReject(() => page.getByText(/5 phases/i).first().waitFor());
    await assert.doesNotReject(() => page.getByText(/6 workflows/i).first().waitFor());
    assert.equal(await page.locator("#project-work .project-phase-list > li").count(), 5);
    assert.equal(await page.locator(".ghl-build-list > div").count(), 9);
    await assert.doesNotReject(() => page.getByText(/email actions queued, but delivery failed/i).waitFor());
    assert.equal(await page.locator(".at-a-glance article").count(), 3);
    assert.equal(await page.locator("#view-problem [data-problem-explorer]").count(), 0);
    await assert.doesNotReject(() => page.getByRole("heading", { name: /my work, phase by phase/i }).waitFor());
    for (const phrase of ["Discovery synthesis", "Workflow architecture", "Measurement design", "Simulation QA"]) {
      await assert.doesNotReject(() => page.locator("#project-work .project-phase-role").getByText(phrase, { exact: false }).first().waitFor());
    }
    const ledgerTop = await page.locator(".project-verification").evaluate((element) => element.getBoundingClientRect().top + window.scrollY);
    const phasesTop = await page.locator("#project-work").evaluate((element) => element.getBoundingClientRect().top + window.scrollY);
    assert.ok(ledgerTop < phasesTop, "The verification ledger should come before the phase detail");
    await assert.doesNotReject(() => page.getByRole("link", { name: /see the project work/i }).waitFor());
    await assert.doesNotReject(() => page.getByRole("button", { name: /present/i }).first().waitFor());
  } finally {
    await browser.close();
  }
});

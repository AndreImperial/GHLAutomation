const assert = require("node:assert/strict");
const test = require("node:test");
const { chromium } = require("playwright");

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4173";
const routes = ["overview", "system", "build", "deliverables", "measurement", "conclusion"];

test("canonical views do not overflow at target widths", { timeout: 60000 }, async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const width of [375, 768, 1024, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      for (const route of routes) {
        await page.goto(`${baseUrl}/#${route}`, { waitUntil: "networkidle" });
        const overflow = await page.evaluate(() =>
          document.documentElement.scrollWidth - document.documentElement.clientWidth
        );
        assert.ok(overflow <= 1, `${route} overflows by ${overflow}px at ${width}px`);
      }
      await page.close();
    }
  } finally {
    await browser.close();
  }
});

test("IDs, ARIA references, reduced motion, and missing animation libraries remain safe", { timeout: 30000 }, async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 900 }, reducedMotion: "reduce" });
  const errors = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  await page.addInitScript(() => {
    Object.defineProperty(window, "gsap", { configurable: true, value: undefined });
    Object.defineProperty(window, "ScrollTrigger", { configurable: true, value: undefined });
  });
  try {
    await page.goto(`${baseUrl}/#system`, { waitUntil: "networkidle" });
    const structural = await page.evaluate(() => {
      const ids = [...document.querySelectorAll("[id]")].map((element) => element.id);
      const duplicates = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
      const references = [...document.querySelectorAll("[aria-controls], [aria-labelledby], [aria-describedby]")]
        .flatMap((element) => ["aria-controls", "aria-labelledby", "aria-describedby"]
          .flatMap((name) => (element.getAttribute(name) || "").split(/\s+/).filter(Boolean)))
        .filter((id) => !document.getElementById(id));
      return { duplicates, references: [...new Set(references)], visibleText: document.body.innerText.length };
    });
    assert.deepEqual(structural.duplicates, []);
    assert.deepEqual(structural.references, []);
    assert.ok(structural.visibleText > 1000);
    assert.deepEqual(errors, []);
  } finally {
    await browser.close();
  }
});

test("presentation deep links, duration, focus trap, and focus restoration work", { timeout: 30000 }, async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1024, height: 900 } });
  try {
    await page.goto(`${baseUrl}/#present/25`, { waitUntil: "networkidle" });
    assert.equal(await page.locator(".presentation-slide.is-active").getAttribute("id"), "presentation-slide-18");
    assert.equal(await page.locator("[data-presentation-slide]").count(), 25);
    const plannedMinutes = await page.locator("[data-presentation-slide]").evaluateAll((slides) =>
      slides.reduce((total, slide) => total + Number(slide.dataset.presentationMinutes || 0), 0)
    );
    assert.equal(plannedMinutes, 45);

    const first = page.locator("#presentation-mode button:visible").first();
    const last = page.locator("#presentation-mode button:visible").last();
    await last.focus();
    await page.keyboard.press("Tab");
    assert.equal(await page.evaluate(() => document.activeElement?.id), await first.getAttribute("id"));
    await page.keyboard.press("Shift+Tab");
    assert.equal(await page.evaluate(() => document.activeElement?.id), await last.getAttribute("id"));

    await page.keyboard.press("Escape");
    await assert.doesNotReject(() => page.locator("#view-problem").waitFor({ state: "visible" }));

    const opener = page.locator("#presentation-open");
    await opener.click();
    await page.locator("#presentation-close").click();
    assert.equal(await page.evaluate(() => document.activeElement?.id), "presentation-open");
  } finally {
    await browser.close();
  }
});

// Steps the demo's virtual clock frame by frame, finds one exact loop, and
// writes JPEG frames for ffmpeg. Usage: node record.js <width> <outdir>
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");
const [, , width, outDir] = process.argv;
const FPS = 30;
(async () => {
  fs.rmSync(outDir, { recursive: true, force: true }); fs.mkdirSync(outDir, { recursive: true });
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: Number(width), height: 700 }, deviceScaleFactor: 2 });
  p.on("pageerror", e => console.log("pageerror", String(e)));
  await p.goto(`http://127.0.0.1:5173/record.html?name=bloom-booking&fps=${FPS}`);
  await p.waitForFunction(() => window.__stageshow && window.__stageshow.clock);
  for (let i = 0; i < 300; i++) {
    if (await p.evaluate(() => !!(window.__recordReady && document.querySelector(".ss-stage")))) break;
    await p.evaluate(() => window.__stageshow.clock.step(1));
    await p.waitForTimeout(20);
  }
  await p.evaluate(() => document.fonts.ready);
  const stage = p.locator(".ss-stage").first();
  const step = () => p.evaluate(() => window.__stageshow.clock.step(1));
  const mark = () => p.evaluate(() => document.querySelector(".ss-stage").getAttribute("data-mark") || document.querySelector("[data-mark]")?.getAttribute("data-mark") || "");
  // Pass 1: find the frames where 'pick' begins, twice
  const picks = []; let last = ""; let f = 0;
  while (picks.length < 2 && f < FPS * 40) { await step(); f++; const m = await mark(); if (m === "pick" && last !== "pick") picks.push(f); last = m; }
  const period = picks[1] - picks[0];
  console.log("pick frames", picks, "period", period, "frames =", (period / FPS).toFixed(2), "s");
  // The loop starts 1.1s before 'pick'. Continue to the next such start, then capture one period.
  const lead = Math.round(1.1 * FPS);
  const target = picks[1] + period - lead; // start of the third run
  while (f < target) { await step(); f++; }
  for (let i = 0; i < period; i++) {
    await step();
    await stage.screenshot({ path: path.join(outDir, `f${String(i).padStart(4, "0")}.jpg`), type: "jpeg", quality: 92 });
  }
  const box = await stage.boundingBox();
  console.log("captured", period, "frames", box);
  await b.close();
})();

# Bloom Dental Portfolio-First Case Study Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the current beginner teaching site into a recruiter-first portfolio case study while preserving every workflow, phase, deliverable, filled template, source guide, message asset, and presentation feature.

**Architecture:** Keep the dependency-free `index.html` / `styles.css` / `script.js` architecture and reuse the current canonical workflow, phase, document, and presentation data. Rename the six visible views and restructure their opening content, while retaining the existing internal view keys and aliasing canonical portfolio hashes to those keys so legacy links continue to work. Use progressive disclosure: concise portfolio summaries are visible first, and complete technical or workshop content remains available below them.

**Tech Stack:** Semantic HTML, CSS custom properties and responsive layouts, vanilla JavaScript, self-hosted Lucide 0.468.0, GSAP 3.12.5, ScrollTrigger 3.12.5, Node.js test runner, Playwright, Render static hosting.

**Spec:** `docs/superpowers/specs/2026-09-21-portfolio-first-case-study-design.md`

## Global Constraints

- The project remains a completed workshop simulation, not a live client campaign.
- Label `60 bookings in 60 days`, `below 15% no-show rate`, and `40% whitening attach rate` as projected wherever they appear.
- Preserve ten build phases, six interactive workflows, eight full deliverables, two filled templates, seven GHL setup guides, the discovery transcript, the original 23-message sequence, six workflow-linked message assets, and the 25-slide presentation.
- Preserve all `#present/1-25` links, document deep links, browser history, focus restoration, presentation controls, and legacy route aliases.
- Keep the existing dark graphite-green, ivory, mint, coral, and amber identity; do not add a light theme.
- Keep fonts and runtime libraries self-hosted. Do not add a framework, package manager, build step, or external runtime dependency.
- Preserve full content when JavaScript animation is unavailable and honor `prefers-reduced-motion`.
- Do not modify `PRODUCT.md`.
- Do not add testimonials, client endorsements, live results, patient claims, or production-readiness claims.
- Do not remove or reset unrelated working-tree changes or the untracked `.impeccable/` directory.

## Review Focus

- A legacy hash such as `#implementation` must open Build Process without rewriting history incorrectly or breaking Back/Forward.
- A direct deliverable hash such as `#deliverables/kpi-scorecard` must activate both the Deliverables view and the requested artifact.
- The workflow shortcut `#automation` must open System, scroll to the six-workflow section, and leave every node description keyboard accessible.
- Long tables and filled templates at 375px must scroll inside their own containers without creating page-level horizontal overflow.
- Missing GSAP, reduced motion, and presentation open/close must leave content visible, preserve focus, and produce no console errors.

---

## File Structure

- `index.html`: Owns semantic page structure, visible portfolio copy, six view panels, hardcoded deliverables, and the presentation DOM.
- `script.js`: Owns canonical route resolution, view state, document selection, workflow rendering, measurement diagnostics, motion enhancement, and presentation behavior.
- `styles.css`: Owns design tokens, component layouts, responsive behavior, focus states, reduced motion, and animation-ready states.
- `tests/portfolio-routing.test.js`: New Playwright coverage for canonical portfolio routes, aliases, deep links, and history.
- `tests/portfolio-overview.test.js`: New Playwright coverage for hero positioning, contribution proof, simulation boundary, and visible scope.
- `tests/system-workflows.test.js`: New Playwright coverage for the journey and six workflow interactions; replaces overlap with `automation-discoverability.test.js` only after equivalent assertions pass.
- `tests/portfolio-content.test.js`: New static assertions for ten phases, relationship summaries, eight deliverables, two templates, source library, and projected labels.
- `tests/measurement-conclusion.test.js`: New Playwright coverage for measurement diagnostics, time windows, conclusion links, and launch dependencies.
- `tests/responsive-accessibility.test.js`: New Playwright coverage for overflow, duplicate IDs, ARIA references, focus visibility, reduced motion, and missing animation libraries.
- `README.md`: Owns public editing, route, local preview, test, and deployment instructions.
- `DESIGN.md`: Owns the canonical portfolio-first visual and interaction rules.

### Task 1: Canonical Portfolio Routing And Navigation

**Files:**
- Create: `tests/portfolio-routing.test.js`
- Modify: `index.html:35-44`
- Modify: `script.js:4-25`
- Modify: `script.js:1036-1070`
- Modify: `script.js:1745-1785`
- Modify: `script.js:2116-2140`

**Interfaces:**
- Consumes: Existing `setView(view, options)`, `activateDocument(documentId, updateUrl)`, and presentation URL handling.
- Produces: `routeDefinitions`, an object mapping public hashes to internal view keys; `getHashState()` returning `{ view, documentId, anchor, presentation, presentationIndex }`; visible tabs labeled Overview, System, Build Process, Deliverables, Measurement, and Conclusion.

- [ ] **Step 1: Write the failing route test**

```js
const assert = require("node:assert/strict");
const test = require("node:test");
const { chromium } = require("playwright");

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4173";

test("portfolio routes and legacy aliases resolve without losing deep links", { timeout: 20000 }, async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto(`${baseUrl}/#overview`, { waitUntil: "networkidle" });
    assert.equal(await page.locator(".primary-tab.is-active").textContent(), "Overview");

    await page.goto(`${baseUrl}/#implementation`, { waitUntil: "networkidle" });
    assert.equal(await page.locator(".primary-tab.is-active").textContent(), "Build Process");

    await page.goto(`${baseUrl}/#deliverables/kpi-scorecard`, { waitUntil: "networkidle" });
    await assert.doesNotReject(() => page.locator("#docs-panel-kpi-scorecard").waitFor({ state: "visible" }));

    await page.goto(`${baseUrl}/#automation`, { waitUntil: "networkidle" });
    await assert.doesNotReject(() => page.locator("#automation-workflows").waitFor({ state: "visible" }));

    await page.goto(`${baseUrl}/#overview`, { waitUntil: "networkidle" });
    await page.getByRole("tab", { name: "System" }).click();
    assert.equal(new URL(page.url()).hash, "#system");
    await page.goBack();
    assert.equal(new URL(page.url()).hash, "#overview");
  } finally {
    await browser.close();
  }
});
```

- [ ] **Step 2: Run the route test and verify the new public names fail**

Run: `node --test tests/portfolio-routing.test.js`

Expected: FAIL because `#overview` currently resolves to the internal Problem view and the visible tabs still use the teaching labels.

- [ ] **Step 3: Add one route-definition map and update navigation labels**

Use internal view keys to avoid rewriting every panel and renderer:

```js
const views = ["problem", "solution", "build", "evidence", "measurement", "conclusion"];
const routeDefinitions = {
  overview: { view: "problem" },
  system: { view: "solution" },
  build: { view: "build" },
  deliverables: { view: "evidence" },
  measurement: { view: "measurement" },
  conclusion: { view: "conclusion" },
  automation: { view: "solution", anchor: "automation-workflows" },
  problem: { view: "problem" },
  tour: { view: "problem" },
  "quick-tour": { view: "problem" },
  "beginner-path": { view: "problem" },
  solution: { view: "solution" },
  board: { view: "solution" },
  implementation: { view: "build" },
  process: { view: "build" },
  evidence: { view: "evidence" },
  documents: { view: "evidence" },
  results: { view: "measurement" },
  learnings: { view: "conclusion" },
  takeaways: { view: "conclusion" }
};

const canonicalRoutes = {
  problem: "overview",
  solution: "system",
  build: "build",
  evidence: "deliverables",
  measurement: "measurement",
  conclusion: "conclusion"
};
```

Update `getHashState()` to resolve through `routeDefinitions`, retain `documentId`, and use the route's `anchor`. Update `writeHash()` to emit `canonicalRoutes[view]`. Change the six visible tab labels but preserve their IDs, `data-view`, `aria-controls`, and panel IDs.

- [ ] **Step 4: Add direct-link and history assertions for every canonical route**

Extend the test with:

```js
for (const [hash, label] of [
  ["#overview", "Overview"],
  ["#system", "System"],
  ["#build", "Build Process"],
  ["#deliverables", "Deliverables"],
  ["#measurement", "Measurement"],
  ["#conclusion", "Conclusion"]
]) {
  await page.goto(`${baseUrl}/${hash}`, { waitUntil: "networkidle" });
  assert.equal((await page.locator(".primary-tab.is-active").textContent()).trim(), label);
}
```

- [ ] **Step 5: Run focused and existing routing-sensitive tests**

Run: `node --test tests/portfolio-routing.test.js tests/automation-discoverability.test.js tests/filled-templates.test.js`

Expected: PASS.

- [ ] **Step 6: Commit the route layer**

```powershell
git add index.html script.js tests/portfolio-routing.test.js
git commit -m "Reframe portfolio navigation and routes"
```

### Task 2: Recruiter-First Overview And Contribution Proof

**Files:**
- Create: `tests/portfolio-overview.test.js`
- Modify: `index.html:206-313`
- Modify: `styles.css:342-730`
- Modify: `script.js:1360-1410`

**Interfaces:**
- Consumes: Existing hero motion, `problemStories`, links using `data-view-link`, and the current contribution section.
- Produces: A first viewport that identifies the challenge, role, simulation boundary, scope, and primary next action; a concise `My Contribution` evidence section.

- [ ] **Step 1: Write the failing overview test**

```js
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
    await assert.doesNotReject(() => page.getByText(/workshop simulation/i).first().waitFor());
    await assert.doesNotReject(() => page.getByText(/10 phases/i).first().waitFor());
    await assert.doesNotReject(() => page.getByText(/6 workflows/i).first().waitFor());
    await assert.doesNotReject(() => page.getByRole("heading", { name: "My Contribution" }).waitFor());
    for (const phrase of ["Discovery synthesis", "Workflow architecture", "Measurement design", "Simulation QA"]) {
      await assert.doesNotReject(() => page.getByText(phrase, { exact: false }).first().waitFor());
    }
    await assert.doesNotReject(() => page.getByRole("link", { name: /explore the system/i }).waitFor());
    await assert.doesNotReject(() => page.getByRole("button", { name: /present/i }).waitFor());
  } finally {
    await browser.close();
  }
});
```

- [ ] **Step 2: Run the overview test and verify it fails on the new portfolio copy**

Run: `node --test tests/portfolio-overview.test.js`

Expected: FAIL because the current first view is framed as a self-guided lesson.

- [ ] **Step 3: Rewrite the first viewport as a case-study hero**

Use this content hierarchy in `index.html`:

```html
<span class="hero-status">BLOOM DENTAL / WORKSHOP SIMULATION</span>
<h1>Bloom Dental Studio <em>Consultation Funnel &amp; Automation System</em></h1>
<p class="hero-lede">I designed a connected path from campaign interest to consultation booking, follow-up, and measurement using GoHighLevel.</p>
<div class="hero-role"><span>MY ROLE</span><strong>Strategy, funnel architecture, automation logic, content, measurement, and simulation QA</strong></div>
<div class="hero-actions">
  <a class="button button-coral" href="#system" data-view-link="solution">Explore the system</a>
  <button class="button button-quiet" type="button" data-open-presentation>Open the presentation</button>
</div>
<p class="hero-boundary">Completed workshop simulation. The campaign was not launched, so all performance targets are projected.</p>
```

Preserve the existing automation scene and signal path, but update its labels to describe the system's customer path. Replace the course-style reading introduction with a compact scope strip showing `10 phases`, `6 workflows`, `8 deliverables`, `2 filled templates`, and `1 measurement framework`.

- [ ] **Step 4: Convert the contribution section into evidence-backed capability statements**

Create seven concise items using the exact labels tested above plus Campaign strategy, Conversion content, and GHL configuration. Each item contains one sentence naming the artifact or decision that proves the contribution. Keep the section immediately after the hero/scope strip.

- [ ] **Step 5: Adjust hero and contribution layout without changing the global palette**

In `styles.css`, keep the hero at or below `82vh` on desktop, expose the scope strip at the bottom edge, keep primary copy under `720px`, and collapse the contribution grid to one column at `max-width: 700px`. Do not use viewport-width font scaling.

- [ ] **Step 6: Run overview and existing completeness tests**

Run: `node --test tests/portfolio-overview.test.js tests/content-completeness.test.js`

Expected: PASS.

- [ ] **Step 7: Commit the overview**

```powershell
git add index.html styles.css script.js tests/portfolio-overview.test.js
git commit -m "Lead with the portfolio case study"
```

### Task 3: Customer Journey And Complete Workflow System

**Files:**
- Create: `tests/system-workflows.test.js`
- Modify: `index.html:314-371`
- Modify: `script.js:65-182`
- Modify: `script.js:887-1026`
- Modify: `script.js:1445-1675`
- Modify: `styles.css` workflow and journey component sections
- Delete after replacement passes: `tests/automation-discoverability.test.js`

**Interfaces:**
- Consumes: `problemStories`, `workflowDefinitions`, `workflowBeginnerCopy`, `renderWorkflow(workflowId)`, and `renderWorkflowNode(workflow, nodeIndex)`.
- Produces: A nine-step customer journey and six inspectable workflow maps, with plain-language summaries and technical node detail.

- [ ] **Step 1: Write the complete system test**

```js
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
    for (const label of ["WHAT IT NOTICES", "WHAT IT DOES", "WHY IT MATTERS", "WHERE IT LIVES IN GHL"]) {
      await assert.doesNotReject(() => page.getByText(label, { exact: true }).last().waitFor());
    }
  } finally {
    await browser.close();
  }
});
```

- [ ] **Step 2: Run the test and verify the nine-step journey assertion fails**

Run: `node --test tests/system-workflows.test.js`

Expected: FAIL because the current System view does not expose the complete nine-step portfolio journey with `data-customer-journey-step`.

- [ ] **Step 3: Build the customer journey from one data model**

Add a `customerJourney` array near `problemStories`:

```js
const customerJourney = [
  { id: "ad", label: "Meta ad", plain: "A person sees the consultation offer.", technical: "Campaign source and UTM values identify the visit." },
  { id: "page", label: "Landing page", plain: "The page explains the offer and next step.", technical: "A successful landing-page view starts the measurable onsite path." },
  { id: "form", label: "Inquiry form", plain: "The person shares useful context and consent.", technical: "The form creates or updates the contact and starts lead capture." },
  { id: "calendar", label: "Booking calendar", plain: "The person chooses an available time.", technical: "The appointment updates the opportunity and booking workflow." },
  { id: "reminders", label: "Confirmation and reminders", plain: "Useful messages protect the appointment.", technical: "Timed email and SMS actions honor consent and stop rules." },
  { id: "consultation", label: "Consultation outcome", plain: "The clinic records what happened.", technical: "Appointment status and pipeline stage route the next workflow." },
  { id: "follow-up", label: "Whitening follow-up", plain: "The next message matches the consultation outcome.", technical: "A modular workflow handles offer, booking, and payment state." },
  { id: "recall", label: "Six-month recall", plain: "Future-care reminders happen at the planned time.", technical: "Long waits and eligibility checks protect relevance and consent." },
  { id: "review", label: "KPI review", plain: "The team checks where people moved forward or stopped.", technical: "Events, formulas, and windows support one diagnostic next test." }
];
```

Render the nine buttons or steps from this array into a container with `data-customer-journey`. Preserve the Simple explanation / Show the GHL setup control and default it to simple on every new page load.

- [ ] **Step 4: Preserve and strengthen the six workflow definitions**

Keep every existing node and ID. Verify that each workflow has a trigger, a stop condition, and complete `description`, `function`, and `ghl` values. Add a `journeyStep` property to each workflow definition so the selected workflow highlights its related customer-journey step without duplicating text.

- [ ] **Step 5: Make node and journey selection fully keyboard accessible**

Keep workflow picker tabs using ArrowLeft, ArrowRight, Home, and End. Add equivalent roving tabindex behavior to the journey steps. Selected journey and workflow controls must set `aria-selected="true"`, and detail updates must remain in the existing `aria-live="polite"` regions.

- [ ] **Step 6: Style the journey and workflows as one connected system**

Use a horizontally connected journey at desktop widths and a vertical path below `800px`. Keep workflow picker controls at least `44px` high. Use coral for the active customer friction, mint for the connected system response, and amber only for projected or unresolved states.

- [ ] **Step 7: Run workflow, routing, and content regression tests**

Run: `node --test tests/system-workflows.test.js tests/portfolio-routing.test.js tests/content-completeness.test.js`

Expected: PASS.

- [ ] **Step 8: Remove the superseded workflow test and run the full suite**

Run: `Remove-Item -LiteralPath tests\automation-discoverability.test.js`

Run: `node --test tests/*.test.js`

Expected: PASS with the new system test covering every assertion from the removed test.

- [ ] **Step 9: Commit the system view**

```powershell
git add index.html script.js styles.css tests/system-workflows.test.js tests/automation-discoverability.test.js
git commit -m "Connect the customer journey and workflows"
```

### Task 4: Ten-Phase Build Process As Portfolio Evidence

**Files:**
- Create: `tests/portfolio-content.test.js`
- Modify: `index.html:373-407`
- Modify: `script.js:344-430`
- Modify: `script.js:1310-1350`
- Modify: `styles.css` phase-row and phase-grid sections

**Interfaces:**
- Consumes: Existing ten `.phase-row` elements and `phaseAnnotations`.
- Produces: Ten phase summaries containing problem, input, decision, actions, output, purpose, journey contribution, status, and expandable technical setup.

- [ ] **Step 1: Write static completeness assertions for the build**

```js
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");

test("all ten phases expose portfolio summaries and technical setup", () => {
  assert.equal((html.match(/class="phase-row/g) || []).length, 10);
  assert.equal((html.match(/data-phase-problem/g) || []).length, 10);
  assert.equal((html.match(/data-phase-output/g) || []).length, 10);
  assert.equal((html.match(/data-phase-journey/g) || []).length, 10);
  assert.equal((html.match(/<summary>Technical setup<\/summary>/g) || []).length, 10);
});
```

- [ ] **Step 2: Run the content test and verify the new phase structure fails**

Run: `node --test tests/portfolio-content.test.js`

Expected: FAIL because current phases do not use the new data hooks and nested technical disclosure consistently.

- [ ] **Step 3: Give every phase the same visible portfolio summary**

For each `.phase-row`, keep its existing text but normalize the visible fields to:

```html
<div class="phase-portfolio-summary">
  <div data-phase-problem><span>PROBLEM ADDRESSED</span><p>...</p></div>
  <div><span>INPUT USED</span><p>...</p></div>
  <div><span>DECISION MADE</span><p>...</p></div>
  <div><span>ACTIONS COMPLETED</span><p>...</p></div>
  <div data-phase-output><span>OUTPUT PRODUCED</span><p>...</p></div>
  <div><span>BUSINESS PURPOSE</span><p>...</p></div>
  <div data-phase-journey><span>CUSTOMER JOURNEY</span><p>...</p></div>
</div>
```

Move GHL paths, fields, tags, stages, triggers, waits, branches, events, and source-guide links into one nested `<details class="phase-technical"><summary>Technical setup</summary>...</details>` per phase. Keep Phase 1 open by default; do not add accordion behavior that closes another phase.

- [ ] **Step 4: Update `phaseAnnotations` to supply relationships, not duplicate phase prose**

Each record should contain `problem`, `solution`, `journeyStep`, `sources`, and `deliverables`. Update `applyPhaseAnnotations()` to insert relationship chips and links only. The phase's primary narrative remains in HTML.

- [ ] **Step 5: Style the phase summary for scanning and comparison**

Use a two-column definition grid above `800px` and one column below. Keep labels in JetBrains Mono, body copy in Manrope, and technical setup visually subordinate. Ensure summaries do not clip when browser text is zoomed to 200%.

- [ ] **Step 6: Run phase and source completeness tests**

Run: `node --test tests/portfolio-content.test.js tests/content-completeness.test.js`

Expected: PASS.

- [ ] **Step 7: Commit the build process**

```powershell
git add index.html script.js styles.css tests/portfolio-content.test.js
git commit -m "Present the ten-phase build as portfolio evidence"
```

### Task 5: Complete Deliverables Proof Library

**Files:**
- Modify: `tests/portfolio-content.test.js`
- Modify: `tests/filled-templates.test.js`
- Modify: `index.html` Deliverables view and source-library sections
- Modify: `script.js:1109-1180`
- Modify: `script.js:1290-1315`
- Modify: `styles.css` document, template, source-library, and table sections

**Interfaces:**
- Consumes: Existing ten `.doc-tab` controls, eight `.native-deliverable` panels, two filled template panels, and `activateDocument(documentId, updateUrl)`.
- Produces: A proof library with portfolio introductions, direct links, relationship matrix, and complete source-faithful content.

- [ ] **Step 1: Extend static tests for the full proof inventory**

Add these assertions to `tests/portfolio-content.test.js`:

```js
test("deliverables remain complete and gain portfolio introductions", () => {
  assert.equal((html.match(/class="document-panel native-deliverable"/g) || []).length, 8);
  assert.equal((html.match(/class="document-panel filled-template"/g) || []).length, 2);
  assert.equal((html.match(/data-artifact-introduction/g) || []).length, 10);
  for (const label of ["WHAT THIS IS", "WHY IT WAS NEEDED", "WHAT TO LOOK FOR", "SYSTEM AREA SUPPORTED"]) {
    assert.ok(html.includes(label), `Missing artifact introduction label: ${label}`);
  }
  assert.ok(html.includes('data-workshop-source="discovery"'));
  for (let guide = 1; guide <= 7; guide += 1) assert.ok(html.includes(`data-workshop-source="ghl-0${guide}"`));
  assert.equal((html.match(/data-source-message=/g) || []).length, 23);
});
```

- [ ] **Step 2: Run the proof-library tests and verify the introduction count fails**

Run: `node --test tests/portfolio-content.test.js tests/filled-templates.test.js tests/content-completeness.test.js`

Expected: FAIL on the new `data-artifact-introduction` requirement while all existing source-completeness assertions continue to pass.

- [ ] **Step 3: Add a concise portfolio introduction before all ten artifacts**

Use the same native structure in each panel:

```html
<div class="artifact-introduction" data-artifact-introduction>
  <div><span>WHAT THIS IS</span><p>...</p></div>
  <div><span>WHY IT WAS NEEDED</span><p>...</p></div>
  <div><span>WHAT TO LOOK FOR</span><p>...</p></div>
  <div><span>SYSTEM AREA SUPPORTED</span><p>...</p></div>
</div>
```

Keep the complete existing artifact content after this introduction. Do not replace it with images, downloads, summaries, or Markdown fetches.

- [ ] **Step 4: Reframe the matrix and source library**

Rename the matrix to `How the project assets support the system`. Use customer-journey stages as rows and link directly to the supporting artifact hashes. Label the transcript, seven guides, and original sequence as `Workshop source material`, clearly separated from Andre's completed outputs.

- [ ] **Step 5: Preserve direct document behavior and improve narrow-screen reading**

Keep `activateDocument()` responsible for tab state, panel visibility, ARIA state, and document hash updates. At `max-width: 700px`, make the document tabs horizontally scrollable with the active tab revealed. Wrap wide tables in existing overflow containers and set `max-width: 100%` on document media.

- [ ] **Step 6: Run all content and direct-link tests**

Run: `node --test tests/portfolio-content.test.js tests/filled-templates.test.js tests/content-completeness.test.js tests/portfolio-routing.test.js`

Expected: PASS.

- [ ] **Step 7: Commit the proof library**

```powershell
git add index.html script.js styles.css tests/portfolio-content.test.js tests/filled-templates.test.js
git commit -m "Turn deliverables into a complete proof library"
```

### Task 6: Measurement Story And Portfolio Conclusion

**Files:**
- Create: `tests/measurement-conclusion.test.js`
- Modify: `index.html` Measurement and Conclusion views
- Modify: `script.js` diagnostic and conclusion renderers
- Modify: `styles.css` measurement and conclusion component sections

**Interfaces:**
- Consumes: Existing measurement steps, KPI Diagnostic Lab controls, `problemStories`, projected targets, conclusion links, and filled-scorecard route.
- Produces: A six-step measurement funnel tied to diagnostic questions, plus a clear portfolio close summarizing contribution, decisions, lessons, first experiment, and launch dependencies.

- [ ] **Step 1: Write the measurement and conclusion test**

```js
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
    for (const phrase of ["PROJECTED: 60 BOOKINGS IN 60 DAYS", "PROJECTED: BELOW 15% NO-SHOW RATE", "PROJECTED: 40% WHITENING ATTACH RATE"]) {
      await assert.doesNotReject(() => page.getByText(phrase, { exact: false }).first().waitFor());
    }
    await assert.doesNotReject(() => page.getByText(/60-day acquisition window/i).waitFor());
    await assert.doesNotReject(() => page.getByText(/six-month recall/i).first().waitFor());

    await page.goto(`${baseUrl}/#conclusion`, { waitUntil: "networkidle" });
    for (const heading of ["What I built", "Strongest decisions", "What I learned", "First live experiment", "Before production launch"]) {
      await assert.doesNotReject(() => page.getByRole("heading", { name: heading }).waitFor());
    }
    await assert.doesNotReject(() => page.locator('a[href="#automation"]').waitFor({ state: "visible" }));
    await assert.doesNotReject(() => page.locator('a[href="#deliverables/business-case-intake"]').waitFor({ state: "visible" }));
  } finally {
    await browser.close();
  }
});
```

- [ ] **Step 2: Run the test and verify the new portfolio close fails**

Run: `node --test tests/measurement-conclusion.test.js`

Expected: FAIL because the existing teaching conclusion does not use all five portfolio headings or canonical Deliverables links.

- [ ] **Step 3: Normalize the six measurement steps**

Each step must expose `Question`, `People included`, `Formula`, `What a weak result may mean`, `Evidence to inspect`, and `Next test`. Keep the sequence page views, form submissions, bookings, attended consultations, whitening bookings, and recall responses. Put event names, UTMs, fields, and reporting notes inside the existing analyst disclosure.

- [ ] **Step 4: Separate reporting windows and projected goals**

Add one comparison row for `60-day acquisition window`, `appointment maturity window`, and `six-month recall window`. Replace any shortened or ambiguous target badge with the exact projected labels asserted by the test.

- [ ] **Step 5: Rebuild the conclusion around portfolio value**

Use five visible sections matching the test headings. `What I built` inventories the system. `Strongest decisions` covers form-first booking, modular workflows, consent gating, and honest evidence. `What I learned` connects customer experience, operations, and analytics. `First live experiment` recommends finding the earliest material drop and changing one variable. `Before production launch` lists sender domain, live ads, compliance review, consent validation, and production data QA.

- [ ] **Step 6: Add direct proof links**

Link the conclusion to `#automation`, `#deliverables/business-case-intake`, `#deliverables/kpi-scorecard`, `#deliverables/workflow-doc`, and `#measurement`. Preserve the presentation action.

- [ ] **Step 7: Run the measurement, routing, and filled-template tests**

Run: `node --test tests/measurement-conclusion.test.js tests/portfolio-routing.test.js tests/filled-templates.test.js`

Expected: PASS.

- [ ] **Step 8: Commit measurement and conclusion**

```powershell
git add index.html script.js styles.css tests/measurement-conclusion.test.js
git commit -m "Close the case study with measurement and learning"
```

### Task 7: Responsive, Accessibility, Motion, And Presentation Hardening

**Files:**
- Create: `tests/responsive-accessibility.test.js`
- Modify: `styles.css`
- Modify: `script.js` motion initialization and presentation focus behavior only if tests expose defects
- Modify: `index.html` ARIA or heading relationships only if tests expose defects

**Interfaces:**
- Consumes: All six views, self-hosted animation libraries, presentation open/close controls, and existing ARIA relationships.
- Produces: No-overflow layouts at four target widths, valid IDs and references, usable reduced motion, graceful animation failure, and intact presentation focus management.

- [ ] **Step 1: Write responsive and structural accessibility tests**

```js
const assert = require("node:assert/strict");
const test = require("node:test");
const { chromium } = require("playwright");

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4173";
const routes = ["overview", "system", "build", "deliverables", "measurement", "conclusion"];

test("canonical views do not overflow at target widths", { timeout: 40000 }, async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const width of [375, 768, 1024, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      for (const route of routes) {
        await page.goto(`${baseUrl}/#${route}`, { waitUntil: "networkidle" });
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        assert.ok(overflow <= 1, `${route} overflows by ${overflow}px at ${width}px`);
      }
      await page.close();
    }
  } finally {
    await browser.close();
  }
});

test("IDs, ARIA references, reduced motion, and missing animation libraries remain safe", { timeout: 25000 }, async () => {
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
      const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
      const references = [...document.querySelectorAll("[aria-controls], [aria-labelledby], [aria-describedby]")]
        .flatMap((element) => ["aria-controls", "aria-labelledby", "aria-describedby"].flatMap((name) => (element.getAttribute(name) || "").split(/\s+/).filter(Boolean)))
        .filter((id) => !document.getElementById(id));
      return { duplicates, references, visibleText: document.body.innerText.length };
    });
    assert.deepEqual(structural.duplicates, []);
    assert.deepEqual(structural.references, []);
    assert.ok(structural.visibleText > 1000);
    assert.deepEqual(errors, []);
  } finally {
    await browser.close();
  }
});
```

- [ ] **Step 2: Run the tests and record every failing width or relationship**

Run: `node --test tests/responsive-accessibility.test.js`

Expected: Either PASS or precise failures naming a route, width, duplicate ID, missing ARIA target, or console error. Do not change unrelated components.

- [ ] **Step 3: Fix overflow and touch-target defects**

Constrain flex and grid children with `min-width: 0`; place wide data tables inside their own `overflow-x: auto` containers; keep navigation and document tabs scrollable; enforce `min-height: 44px` on buttons, tabs, summaries, and icon controls. Avoid global `overflow-x: hidden` as a substitute for fixing the source.

- [ ] **Step 4: Harden reduced-motion and library-failure behavior**

Ensure initial CSS does not hide content unless `body.motion-enhanced` is present. Under `prefers-reduced-motion: reduce`, disable transforms, travelling signals, smooth scrolling, and pinned behavior while preserving selected-state color and borders. Guard every GSAP and ScrollTrigger call behind availability checks.

- [ ] **Step 5: Verify presentation focus and direct links**

Extend the accessibility test:

```js
await page.goto(`${baseUrl}/#present/25`, { waitUntil: "networkidle" });
assert.equal(await page.locator(".presentation-slide.is-active").getAttribute("id"), "presentation-slide-18");
assert.equal(await page.locator("[data-presentation-slide]").count(), 25);
const plannedMinutes = await page.locator("[data-presentation-slide]").evaluateAll((slides) =>
  slides.reduce((total, slide) => total + Number(slide.dataset.presentationMinutes || 0), 0)
);
assert.equal(plannedMinutes, 45);
await page.keyboard.press("Escape");
await assert.doesNotReject(() => page.locator("#view-problem").waitFor({ state: "visible" }));
```

Also test Tab wrapping inside presentation mode and focus returning to the opener when the presentation was opened with its button.

- [ ] **Step 6: Run the full automated suite**

Run: `node --check script.js`

Run: `node --test tests/*.test.js`

Expected: JavaScript syntax check passes and every test passes.

- [ ] **Step 7: Commit hardening changes**

```powershell
git add index.html script.js styles.css tests/responsive-accessibility.test.js
git commit -m "Harden portfolio accessibility and responsive behavior"
```

### Task 8: Documentation, Visual QA, Deployment, And Release Verification

**Files:**
- Modify: `README.md`
- Modify: `DESIGN.md`
- Modify: `index.html` CSS/JS cache query strings and metadata if required
- Verify: `render.yaml`
- Verify: `assets/og-bloom-dental.png`

**Interfaces:**
- Consumes: Final canonical routes, all automated tests, Render configuration, and the portfolio-first design spec.
- Produces: Accurate maintainer documentation, fresh browser assets, committed release, pushed `main`, and verified live routes.

- [ ] **Step 1: Rewrite README route and purpose sections**

Document the recruiter-first purpose, canonical routes, legacy aliases, complete content inventory, local server command, test commands, Render deployment, and simulation truth boundary. State that Presentation mode is optional and that full deliverables are native website content.

- [ ] **Step 2: Update DESIGN.md to match the approved hierarchy**

Replace the self-guided-course hierarchy with Overview, System, Build Process, Deliverables, Measurement, Conclusion, and optional Present. Keep the existing visual tokens, typography, motion rules, accessibility rules, and source-completeness requirements.

- [ ] **Step 3: Increment browser cache keys**

In `index.html`, change the query strings on `styles.css` and `script.js` to the same new release value, for example `?v=20260921-portfolio`. Do not change self-hosted vendor filenames.

- [ ] **Step 4: Run the complete local verification set**

Run: `node --check script.js`

Run: `node --test tests/*.test.js`

Run: `git diff --check`

Expected: All commands pass. Line-ending notices are acceptable; whitespace errors are not.

- [ ] **Step 5: Run Impeccable once against final interface files**

Use the installed Impeccable detector on `index.html`, `styles.css`, and `script.js`. Review each result against the approved portfolio design. Fix actual accessibility, hierarchy, responsiveness, or generic-design issues; document detector limitations rather than changing correct authored content to satisfy an unavailable parser.

- [ ] **Step 6: Perform browser visual QA at all target widths**

At `375x812`, `768x1024`, `1024x768`, and `1440x900`, capture or inspect Overview, System, Build Process, Deliverables with KPI Scorecard active, Measurement, Conclusion, and Presentation slides 1 and 25. Verify no overlap, clipped copy, unreadable type, page-level overflow, hidden controls, or empty animated regions. Check the browser console at every width.

- [ ] **Step 7: Verify metadata and social preview**

Confirm the canonical URL is `https://ghlautomation.onrender.com/`, the title and description identify a Bloom Dental martech portfolio case study, Open Graph image dimensions are `1200x630`, the favicon resolves, and no personal email address appears in public imagery.

- [ ] **Step 8: Commit the final documentation and release metadata**

```powershell
git add README.md DESIGN.md index.html styles.css script.js tests render.yaml assets/og-bloom-dental.png
git commit -m "Complete portfolio-first case study redesign"
```

Before committing, inspect `git status --short` and do not stage `.impeccable/` or unrelated user files.

- [ ] **Step 9: Push main and wait for Render deployment**

Run: `git push origin main`

Expected: GitHub accepts the new commits and Render starts an automatic static-site deployment.

- [ ] **Step 10: Verify every live canonical route**

Open and verify:

```text
https://ghlautomation.onrender.com/#overview
https://ghlautomation.onrender.com/#system
https://ghlautomation.onrender.com/#automation
https://ghlautomation.onrender.com/#build
https://ghlautomation.onrender.com/#deliverables/business-case-intake
https://ghlautomation.onrender.com/#deliverables/kpi-scorecard
https://ghlautomation.onrender.com/#measurement
https://ghlautomation.onrender.com/#conclusion
https://ghlautomation.onrender.com/#present/1
https://ghlautomation.onrender.com/#present/25
```

Expected: Every route displays the intended view or slide, browser Back/Forward works, and the console remains free of errors.

- [ ] **Step 11: Report the release clearly**

Summarize the new portfolio flow, confirm the preserved content inventory, report automated and visual QA results, link the live site, and name any remaining production dependencies without describing projected goals as achieved results.

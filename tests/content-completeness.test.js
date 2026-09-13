const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");

test("the site contains the discovery transcript and all seven complete setup guides", () => {
  assert.ok(html.includes('id="workshop-source-library"'), "Missing the source library section");
  assert.ok(html.includes('data-workshop-source="discovery"'), "Missing the discovery transcript");
  for (let guide = 1; guide <= 7; guide += 1) {
    assert.ok(html.includes(`data-workshop-source="ghl-0${guide}"`), `Missing GHL guide 0${guide}`);
  }
  assert.ok(html.includes("<th>Buffer time before</th><td>10 minutes</td>"), "Calendar guide details are missing");
  assert.ok(html.includes("stop the workflow if the appointment is cancelled or completed"), "Workflow guide details are missing");
  assert.ok(html.includes("Weekly reporting template"), "Analytics guide details are missing");
  for (const phrase of [
    "source-fb-ad",
    "Monday to Saturday",
    "Limited consultation slots available each week",
    "BD - Same-Day Reminder",
    "10DLC",
    "<td>16</td>",
    "Cost per booked consultation",
  ]) {
    assert.ok(html.includes(phrase), `Source guide detail is missing: ${phrase}`);
  }
});

test("every message asset referenced by the six-workflow model has a complete template", () => {
  const templates = [
    ["form-confirmation", "BD Email - Form Confirmation", "email"],
    ["booking-link", "BD SMS - Booking Link", "sms"],
    ["booking-reminder", "BD Email - Booking Reminder", "email"],
    ["no-show-final", "BD SMS - No-Show Final", "sms"],
    ["six-month-recall-email", "BD Email - Six Month Recall", "email"],
    ["six-month-recall-sms", "BD SMS - Six Month Recall", "sms"],
  ];

  for (const [id, name, channel] of templates) {
    assert.ok(html.includes(`data-message-template="${id}"`), `Missing ${name} template`);
    assert.ok(html.includes(name), `Missing GHL asset name ${name}`);
    assert.ok(script.includes(`${channel === "email" ? "Send Email" : "Send SMS"} > ${name}`), `Workflow does not use ${name}`);
  }

  const existingTemplates = [
    "BD SMS - Booking Confirm",
    "BD Email - Booking Confirmation",
    "BD Email - 24hr Reminder",
    "BD SMS - 2hr Reminder",
    "BD SMS - No-Show Follow-Up",
    "BD Email - No-Show Rebook",
    "BD Email - Post Consult Whitening Offer",
    "BD SMS - Whitening Reminder",
    "BD Email - Whitening Final Follow-Up",
  ];
  for (const name of existingTemplates) {
    assert.ok(html.includes(name), `Missing the complete existing project template ${name}`);
  }
});

test("source additions do not replace the eight existing workshop deliverables", () => {
  const deliverables = html.match(/class="document-panel native-deliverable"/g) || [];
  assert.equal(deliverables.length, 8);
});

test("the full original v2 message source is available without blending it into the final simulation", () => {
  const sourceStart = html.indexOf('data-workshop-source="email-sms-v2"');
  assert.notEqual(sourceStart, -1, "Missing the original full message sequence");
  const sourceEnd = html.indexOf("</details>", sourceStart);
  const source = html.slice(sourceStart, sourceEnd);
  assert.equal((source.match(/data-source-message=/g) || []).length, 23, "The original sequence should contain all 23 message assets");
  for (const phrase of [
    "B-1: Booking Confirmation SMS",
    "C-3: No-Show Recovery SMS",
    "D-1: Same-Day Whitening Offer Email",
    "E-1: Six-Month Recall Email",
    "F-5: 2-Hour Upsell SMS Nudge",
    "G-3: Final Upsell Recovery SMS",
    "ADV-2: Day 14 Review Follow-Up Email",
    "Sequence Performance Targets",
    "Assumptions Log",
    "Whitening booking destination not confirmed",
  ]) {
    assert.ok(source.includes(phrase), `Original message sequence is incomplete: ${phrase}`);
  }
  assert.ok(source.toLowerCase().includes("original workshop source"), "The original copy must be distinguished from the final simulation");
});

test("recall messages and helper timing follow the workshop's documented cadence", () => {
  assert.ok(html.includes("30 days after the consultation"), "The source recall email timing is missing");
  assert.ok(html.includes("five months after the consultation"), "The source recall SMS timing is missing");
  const start = script.indexOf('"six-month-recall": {');
  const end = script.indexOf('\n    }\n  };', start);
  const workflow = script.slice(start, end);
  assert.ok(workflow.includes('title: "Wait 30 days"'), "The first recall wait should match the source sequence");
  assert.ok(workflow.includes('title: "Wait 120 days"'), "The second recall wait should reach the five-month reminder");
});

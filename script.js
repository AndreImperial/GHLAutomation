(() => {
  "use strict";

  const views = ["tour", "system", "build", "deliverables", "measurement"];
  const aliases = {
    "": "tour",
    tour: "tour",
    "quick-tour": "tour",
    "beginner-path": "tour",
    system: "system",
    board: "system",
    build: "build",
    implementation: "build",
    process: "build",
    deliverables: "deliverables",
    documents: "deliverables",
    measurement: "measurement",
    results: "measurement"
  };

  const nodeDetails = {
    ad: {
      title: "Interest begins with a focused offer.",
      plain: "The person sees a consultation message designed for time-poor BGC and Makati professionals.",
      detail: "UTM source and campaign values identify where the click came from before the contact record exists.",
      technical: "Source: Meta ad / UTM campaign parameters"
    },
    page: {
      title: "The landing page makes the next step understandable.",
      plain: "The page answers what the consultation is, who it is for, and what happens after someone asks for help.",
      detail: "A GHL funnel step holds the hero, benefit block, FAQ, booking handoff, and footer CTA.",
      technical: "Sites > Funnels > Bloom Dental - Free Consultation"
    },
    form: {
      title: "The inquiry form captures useful intent.",
      plain: "The person shares what they want to improve and gives the team enough context to respond well.",
      detail: "Form submission maps contact fields, preferred date, referral source, whitening interest, and SMS consent.",
      technical: "Sites > Forms > Bloom Dental Smile Consultation"
    },
    calendar: {
      title: "The calendar turns interest into a real time.",
      plain: "After the form, the person chooses a 30-minute consultation slot that fits their schedule.",
      detail: "The Simple Calendar uses Asia/Manila time, buffers, notice, availability, and a booking confirmation trigger.",
      technical: "Calendars > Bloom Dental - Free Consultation"
    },
    pipeline: {
      title: "The pipeline gives the lead a visible place in the process.",
      plain: "The team can see whether someone is new, booked, complete, interested in whitening, paid, or lost.",
      detail: "An opportunity is created in the Free Consultation Funnel with a consistent name, source, value, and stage.",
      technical: "Opportunities > Free Consultation Funnel"
    },
    reminders: {
      title: "Reminders protect the time that was booked.",
      plain: "The system confirms the appointment and sends respectful reminders while honoring SMS consent.",
      detail: "Confirmation and reminder actions use approved email templates, consent-gated SMS snippets, wait steps, and stop conditions.",
      technical: "Automation > Workflows > Appointment actions"
    },
    consultation: {
      title: "The consultation is the first human value moment.",
      plain: "The team understands the patient goal, answers questions, and recommends a next step without pressure.",
      detail: "Appointment status and pipeline stage updates provide the evidence for a completed consultation event.",
      technical: "Calendar status = show / Pipeline stage = Consultation Complete"
    },
    whitening: {
      title: "Relevant interest becomes a measured next step.",
      plain: "If whitening fits the person, follow-up education can continue. The system does not claim a sale happened.",
      detail: "The whitening workflow branches on the interest field, stage, and later payment update to prevent duplicate promotion.",
      technical: "Custom field: Whitening Interest / Stage: Whitening Booked"
    },
    recall: {
      title: "The relationship can continue after the first outcome.",
      plain: "A future cleaning reminder keeps the patient relationship useful beyond the original consultation.",
      detail: "The recall workflow waits six months, checks appointment status, and exits on booking or opt-out.",
      technical: "Workflow: Six-Month Cleaning Recall"
    },
    kpi: {
      title: "The dashboard closes the learning loop.",
      plain: "The team reviews where people move forward or drop, then chooses one improvement to test next.",
      detail: "Opportunity stages, appointments, delivery stats, UTMs, and downstream events populate the measurement plan.",
      technical: "Reporting > Dashboard widgets / KPI event model"
    }
  };

  /*
   * Reconstructed from the completed workflow specification and funnel blueprint.
   * The map keeps the logic inspectable without pretending to be a GHL screenshot.
   */
  const workflowDefinitions = {
    "new-lead-booking": {
      number: "01",
      name: "New Lead to Booking",
      summary: "Turn an inquiry form submission into a structured lead and a clear invitation to book.",
      trigger: "Form submitted: Bloom Dental - New Patient Inquiry",
      location: "Automation > Workflows",
      stop: "Appointment booked",
      nodes: [
        { type: "trigger", title: "Form submitted", description: "A contact completes the Bloom Dental inquiry form.", function: "Starts the workflow and makes the new contact eligible for the next actions.", ghl: "Automation > Workflows > Trigger: Form Submitted" },
        { type: "action", title: "Add tag: bd-new-lead", description: "Marks the contact as a new consultation lead.", function: "Creates a simple lifecycle signal that other workflows and reports can read.", ghl: "Contacts > Tags > bd-new-lead" },
        { type: "action", title: "Create or update opportunity", description: "Creates the consultation opportunity or updates the existing record.", function: "Puts the lead into the New Lead stage instead of leaving the inquiry as an isolated contact.", ghl: "Opportunities > Free Consultation Funnel > New Lead" },
        { type: "action", title: "Save service interest", description: "Stores what the person selected on the inquiry form.", function: "Preserves the context needed for relevant follow-up, including the whitening-interest branch.", ghl: "Contact > Custom field: Service interest" },
        { type: "condition", title: "SMS consent checked?", description: "Checks whether the contact explicitly agreed to appointment and follow-up SMS.", function: "Protects the channel boundary so SMS is only sent to opted-in contacts.", ghl: "If/Else > Custom field: SMS consent", outcomes: [{ label: "YES", text: "Add the SMS opt-in tag." }, { label: "NO", text: "Continue without adding an SMS permission signal." }] },
        { type: "action", title: "Add tag: bd-sms-opt-in", description: "Records the consented SMS channel.", function: "Gives later reminder branches a reusable consent signal.", ghl: "Contacts > Tags > bd-sms-opt-in" },
        { type: "action", title: "Send booking-link email", description: "Sends the form confirmation and consultation booking link.", function: "Moves the lead from submission to the next concrete action: choosing a time.", ghl: "Send Email > BD Email - Form Confirmation" },
        { type: "condition", title: "SMS consent checked again?", description: "Re-checks consent immediately before the optional SMS message.", function: "Keeps the send rule explicit at the point where the SMS action occurs.", ghl: "If/Else > SMS consent = true", outcomes: [{ label: "YES", text: "Send the booking-link SMS." }, { label: "NO", text: "Skip SMS and keep email as the available channel." }] },
        { type: "action", title: "Send booking-link SMS", description: "Sends the short booking prompt to an opted-in contact.", function: "Creates a fast mobile reminder without sending to contacts who did not consent.", ghl: "Send SMS > BD SMS - Booking Link" },
        { type: "wait", title: "Wait 24 hours", description: "Gives the lead time to book after the first invitation.", function: "Prevents an immediate duplicate nudge and creates a deliberate follow-up window.", ghl: "Wait > 24 hours" },
        { type: "condition", title: "Appointment still not booked?", description: "Checks whether the contact remains unbooked after the waiting period.", function: "Only sends a reminder to people who still need the booking step.", ghl: "If/Else > Appointment status is not Booked", outcomes: [{ label: "YES", text: "Send the reminder email." }, { label: "NO", text: "Stop because the appointment is already booked." }] },
        { type: "action", title: "Send booking reminder email", description: "Sends one follow-up reminder with the consultation booking link.", function: "Recovers unfinished intent without starting a new workflow or creating duplicate opportunities.", ghl: "Send Email > Booking reminder" }
      ]
    },
    "consultation-booking": {
      number: "02",
      name: "Consultation Booking",
      summary: "Confirm the booked appointment, protect show-up time, and route the appointment outcome.",
      trigger: "Appointment status = Booked",
      location: "Automation > Workflows",
      stop: "Appointment outcome routes to the correct follow-up workflow",
      nodes: [
        { type: "trigger", title: "Appointment booked", description: "A contact books a time on the Bloom Dental consultation calendar.", function: "Starts the confirmation and reminder sequence only for a real calendar event.", ghl: "Automation > Workflows > Trigger: Appointment Status" },
        { type: "condition", title: "Correct calendar?", description: "Checks that the appointment belongs to Bloom Dental - Free Consultation.", function: "Prevents another calendar in the location from entering this workflow.", ghl: "Filter > Calendar = Bloom Dental - Free Consultation", outcomes: [{ label: "YES", text: "Continue to consultation confirmation." }, { label: "NO", text: "Do not enroll this appointment." }] },
        { type: "action", title: "Add tag: bd-consult-booked", description: "Marks that the consultation has a scheduled time.", function: "Creates a reusable booking signal for the contact record and reporting.", ghl: "Contacts > Tags > bd-consult-booked" },
        { type: "action", title: "Move opportunity to Booked Consultation", description: "Advances the opportunity from New Lead to the booked stage.", function: "Makes the pipeline reflect the customer path instead of only the contact activity.", ghl: "Opportunities > Free Consultation Funnel > Booked Consultation" },
        { type: "action", title: "Send booking confirmation SMS", description: "Confirms the appointment time by SMS when the channel is available.", function: "Gives the patient a fast confirmation and a clear appointment reference.", ghl: "Send SMS > BD SMS - Booking Confirm" },
        { type: "action", title: "Send booking confirmation email", description: "Sends the fuller appointment confirmation and reschedule link.", function: "Provides the durable appointment details and the safe recovery path if plans change.", ghl: "Send Email > BD Email - Booking Confirmation" },
        { type: "wait", title: "Wait until 24 hours before", description: "Pauses until the day-before reminder window.", function: "Aligns the message with appointment timing instead of using a fixed delay from booking.", ghl: "Wait > 24 hours before appointment" },
        { type: "action", title: "Send 24-hour reminder email", description: "Reminds the patient about tomorrow's consultation.", function: "Reduces memory friction and keeps rescheduling available.", ghl: "Send Email > BD Email - 24hr Reminder" },
        { type: "wait", title: "Wait until 2 hours before", description: "Pauses until the final reminder window.", function: "Places the short SMS close enough to the appointment to be useful.", ghl: "Wait > 2 hours before appointment" },
        { type: "condition", title: "SMS consent present?", description: "Checks consent before the two-hour reminder SMS.", function: "Keeps the appointment reminder useful without treating consent as assumed.", ghl: "If/Else > Tag: bd-sms-opt-in", outcomes: [{ label: "YES", text: "Send the two-hour reminder SMS." }, { label: "NO", text: "Skip SMS and continue to the outcome check." }] },
        { type: "action", title: "Send 2-hour reminder SMS", description: "Sends a short appointment reminder to an opted-in contact.", function: "Supports show-up behavior with the minimum necessary message.", ghl: "Send SMS > BD SMS - 2hr Reminder" },
        { type: "wait", title: "Wait 1 hour after start", description: "Waits long enough for the appointment status to be updated.", function: "Avoids routing the contact before the calendar outcome is available.", ghl: "Wait > 1 hour after appointment start" },
        { type: "condition", title: "What was the outcome?", description: "Checks whether the appointment was completed or marked no-show.", function: "Routes the same booking event into the correct next workflow.", ghl: "If/Else > Appointment status", outcomes: [{ label: "COMPLETED", text: "Start Post-Consultation Whitening." }, { label: "NO-SHOW", text: "Start No-Show Recovery." }] },
        { type: "handoff", title: "Start Post-Consultation Whitening", description: "Hands a completed appointment to the whitening follow-up workflow.", function: "Keeps post-consultation education separate from booking reminders.", ghl: "Start Workflow > BD - Post Consultation Whitening" },
        { type: "handoff", title: "Start No-Show Recovery", description: "Hands a missed appointment to the rebooking workflow.", function: "Creates a respectful recovery path without restarting the lead workflow.", ghl: "Start Workflow > BD - No-Show Recovery" }
      ]
    },
    "no-show-recovery": {
      number: "03",
      name: "No-Show Recovery",
      summary: "Give a missed consultation a clear, time-boxed path back to booking.",
      trigger: "Appointment status = No-Show",
      location: "Automation > Workflows",
      stop: "Appointment booked, or opportunity moved to Lost",
      nodes: [
        { type: "trigger", title: "Appointment marked no-show", description: "The calendar records that the contact did not attend.", function: "Starts recovery from the actual appointment outcome instead of guessing from inactivity.", ghl: "Automation > Workflows > Trigger: Appointment Status = No-Show" },
        { type: "action", title: "Add tag: bd-no-show", description: "Marks the missed appointment on the contact record.", function: "Creates a clear segment for recovery reporting and follow-up logic.", ghl: "Contacts > Tags > bd-no-show" },
        { type: "action", title: "Send no-show SMS", description: "Sends a friendly rebooking prompt when SMS consent exists.", function: "Offers a low-friction second chance while keeping the tone respectful.", ghl: "Send SMS > BD SMS - No-Show Follow-Up" },
        { type: "wait", title: "Wait 24 hours", description: "Allows the person a day to respond or rebook.", function: "Creates breathing room before the next channel is used.", ghl: "Wait > 24 hours" },
        { type: "condition", title: "Appointment still not booked?", description: "Checks whether a new consultation has been scheduled.", function: "Prevents recovery messages from continuing after the person takes action.", ghl: "If/Else > Appointment status is not Booked", outcomes: [{ label: "YES", text: "Send the rebooking email." }, { label: "NO", text: "Stop recovery because a new booking exists." }] },
        { type: "action", title: "Send no-show rebook email", description: "Sends the longer rebooking explanation and calendar link.", function: "Provides context and a direct path back to a free consultation.", ghl: "Send Email > BD Email - No-Show Rebook" },
        { type: "wait", title: "Wait 72 hours", description: "Leaves a longer pause before the final reminder.", function: "Time-boxes the recovery sequence so it does not become indefinite chasing.", ghl: "Wait > 72 hours" },
        { type: "condition", title: "Appointment still not booked?", description: "Checks the booking state again before the final message.", function: "Stops the final SMS from sending to someone who already rescheduled.", ghl: "If/Else > Appointment status is not Booked", outcomes: [{ label: "YES", text: "Send the final SMS with the booking link." }, { label: "NO", text: "Stop because the contact rebooked." }] },
        { type: "action", title: "Send final rebooking SMS", description: "Sends the last short reminder with the calendar link.", function: "Closes the active outreach sequence with one clear action.", ghl: "Send SMS > Final rebooking prompt" },
        { type: "condition", title: "Still no appointment?", description: "Checks whether the contact remains inactive after recovery.", function: "Creates a clean end state instead of keeping the opportunity in an ambiguous follow-up loop.", ghl: "If/Else > Appointment status is not Booked", outcomes: [{ label: "YES", text: "Move the opportunity to Lost and add bd-lost." }, { label: "NO", text: "Keep the booked appointment path." }] },
        { type: "action", title: "Move opportunity to Lost", description: "Closes the recovery attempt when no booking occurs.", function: "Makes the funnel drop-off visible for later diagnosis and reporting.", ghl: "Opportunities > Free Consultation Funnel > Lost" }
      ]
    },
    "post-consult-whitening": {
      number: "04",
      name: "Post-Consult Whitening",
      summary: "Follow up on whitening interest after a completed consultation without claiming a sale.",
      trigger: "Appointment status = Completed",
      location: "Automation > Workflows",
      stop: "Whitening booked",
      nodes: [
        { type: "trigger", title: "Consultation completed", description: "The calendar marks the consultation as attended and complete.", function: "Starts the post-consultation path only after the human value moment happens.", ghl: "Automation > Workflows > Trigger: Appointment Status = Completed" },
        { type: "action", title: "Add tag: bd-consult-complete", description: "Records that the consultation was completed.", function: "Creates the lifecycle event needed for recall and reporting.", ghl: "Contacts > Tags > bd-consult-complete" },
        { type: "action", title: "Move opportunity to Consultation Complete", description: "Advances the pipeline after the consultation.", function: "Separates completed conversations from people who only booked.", ghl: "Opportunities > Free Consultation Funnel > Consultation Complete" },
        { type: "action", title: "Send whitening follow-up email", description: "Sends education and a possible whitening next step.", function: "Keeps the next action relevant to the consultation outcome without presenting it as a conversion.", ghl: "Send Email > BD Email - Post Consult Whitening Offer" },
        { type: "wait", title: "Wait 2 days", description: "Gives the patient time to consider the information.", function: "Avoids immediate pressure and creates a measured follow-up window.", ghl: "Wait > 2 days" },
        { type: "condition", title: "Not booked + SMS consent?", description: "Checks both the whitening booking state and SMS permission.", function: "Only sends the reminder when it is still relevant and the channel is allowed.", ghl: "If/Else > Whitening booked = false + bd-sms-opt-in", outcomes: [{ label: "YES", text: "Send the whitening reminder SMS." }, { label: "NO", text: "Skip SMS and continue the follow-up sequence." }] },
        { type: "action", title: "Send whitening reminder SMS", description: "Sends a short reminder to an opted-in contact.", function: "Creates a timely mobile prompt without adding a new offer or claiming a sale.", ghl: "Send SMS > BD SMS - Whitening Reminder" },
        { type: "wait", title: "Wait 3 days", description: "Creates a second consideration window.", function: "Gives the contact time to book, ask a question, or decide not to continue.", ghl: "Wait > 3 days" },
        { type: "condition", title: "Whitening still not booked?", description: "Checks whether the patient has booked whitening.", function: "Stops the final email from sending after a booking is already present.", ghl: "If/Else > Whitening booked = false", outcomes: [{ label: "YES", text: "Send the final whitening follow-up email." }, { label: "NO", text: "Move to the booked outcome." }] },
        { type: "action", title: "Send final whitening email", description: "Sends the last follow-up and invites questions.", function: "Ends the education sequence with a clear response path instead of endless promotion.", ghl: "Send Email > BD Email - Whitening Final Follow-Up" },
        { type: "condition", title: "Whitening booked?", description: "Checks the downstream appointment or opportunity state.", function: "Turns a future booking into a visible pipeline transition.", ghl: "If/Else > Whitening appointment or stage", outcomes: [{ label: "YES", text: "Move to Whitening Booked and add the booking tag." }, { label: "NO", text: "Keep the contact in the completed-consult state." }] },
        { type: "action", title: "Move to Whitening Booked", description: "Moves the opportunity to the whitening-booked stage.", function: "Makes the downstream conversion measurable without inventing results.", ghl: "Opportunities > Free Consultation Funnel > Whitening Booked" },
        { type: "action", title: "Add tag: bd-whitening-booked", description: "Records the whitening booking event.", function: "Creates a reusable signal for payment update and retention logic.", ghl: "Contacts > Tags > bd-whitening-booked" }
      ]
    },
    "whitening-payment": {
      number: "05",
      name: "Whitening Payment Update",
      summary: "Translate a confirmed whitening payment into a clean stage and retention handoff.",
      trigger: "Manual stage update or payment received",
      location: "Automation > Workflows",
      stop: "Retention / recall timer started",
      nodes: [
        { type: "trigger", title: "Payment or stage update", description: "The team records payment received or moves the opportunity to the payment event.", function: "Starts the post-booking update from a verified business event.", ghl: "Automation > Workflows > Trigger: Payment or Pipeline Stage" },
        { type: "action", title: "Move to Whitening Paid", description: "Advances the opportunity after payment is confirmed.", function: "Separates booked treatment from paid treatment for accurate reporting.", ghl: "Opportunities > Free Consultation Funnel > Whitening Paid" },
        { type: "action", title: "Add tag: bd-whitening-paid", description: "Records the payment state on the contact.", function: "Creates a durable event that downstream retention workflows can use.", ghl: "Contacts > Tags > bd-whitening-paid" },
        { type: "handoff", title: "Start retention / recall timer", description: "Hands the completed treatment into the longer-term care path.", function: "Keeps payment handling short and lets recall own the six-month timing.", ghl: "Start Workflow > BD - Six Month Cleaning Recall" }
      ]
    },
    "six-month-recall": {
      number: "06",
      name: "Six-Month Recall",
      summary: "Keep the relationship useful after the consultation or treatment with a timed care reminder.",
      trigger: "Consultation completed, whitening paid, or cleaning completed",
      location: "Automation > Workflows",
      stop: "Appointment booked or contact opts out",
      nodes: [
        { type: "trigger", title: "Care event completed", description: "A consultation, whitening payment, or cleaning completion qualifies the contact for recall.", function: "Starts the long-term timer from a meaningful service event.", ghl: "Automation > Workflows > Trigger: Tag or service event" },
        { type: "wait", title: "Wait 6 months", description: "Holds the contact until the planned recall window.", function: "Turns a one-time campaign interaction into a future care moment.", ghl: "Wait > 6 months" },
        { type: "action", title: "Add tag: bd-recall-due", description: "Marks the contact as due for a reminder.", function: "Creates a measurable recall segment before outreach begins.", ghl: "Contacts > Tags > bd-recall-due" },
        { type: "action", title: "Send cleaning recall email", description: "Invites the contact to schedule a cleaning or check-up.", function: "Creates a useful next step without assuming the person needs a treatment.", ghl: "Send Email > BD Email - Six Month Recall" },
        { type: "condition", title: "SMS consent present?", description: "Checks permission before sending the optional recall SMS.", function: "Keeps long-term outreach aligned with the same channel rule as appointment reminders.", ghl: "If/Else > Tag: bd-sms-opt-in", outcomes: [{ label: "YES", text: "Send the cleaning recall SMS." }, { label: "NO", text: "Keep the recall email as the only message." }] },
        { type: "action", title: "Send cleaning recall SMS", description: "Sends a short recall reminder to an opted-in contact.", function: "Adds a timely mobile option while honoring the contact's consent choice.", ghl: "Send SMS > BD SMS - Six Month Recall" },
        { type: "condition", title: "Appointment booked?", description: "Checks whether the contact has already scheduled care.", function: "Stops repeated reminders and gives the opportunity record a visible next state.", ghl: "If/Else > Appointment status = Booked", outcomes: [{ label: "YES", text: "Create or update the recall opportunity." }, { label: "NO", text: "Leave the contact in recall follow-up." }] },
        { type: "action", title: "Create or update recall opportunity", description: "Creates a visible opportunity when the contact books care.", function: "Makes recall bookings count as a separate, traceable business event.", ghl: "Opportunities > Create or update recall opportunity" },
        { type: "stop", title: "Stop on booking or opt-out", description: "Ends the recall sequence when the contact books or opts out.", function: "Prevents unnecessary outreach after the intended action or a clear preference change.", ghl: "Workflow settings > Stop / remove from workflow" }
      ]
    }
  };

  let activeView = "tour";
  let activeDocument = "strategy-doc";
  let explanationMode = "plain";
  let systemTrigger = null;
  let revealObserver = null;
  let activeWorkflow = "new-lead-booking";
  let activeWorkflowNode = 0;
  let presentationIndex = 0;
  let presentationReturnHash = "#tour";
  let presentationPreviousFocus = null;

  const reduceMotion = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function getHashState() {
    const raw = window.location.hash.replace(/^#/, "");
    const parts = raw.split("/");
    if (parts[0] === "present") {
      const requested = Number.parseInt(parts[1] || "1", 10);
      const slideCount = Math.max(1, document.querySelectorAll("[data-presentation-slide]").length);
      const slide = Number.isFinite(requested) ? Math.max(1, Math.min(slideCount, requested)) : 1;
      return { view: "tour", documentId: null, presentation: true, presentationIndex: slide - 1 };
    }
    const view = aliases[parts[0]] || "tour";
    const documentId = parts[1] || null;
    return { view, documentId, presentation: false, presentationIndex: 0 };
  }

  function writeHash(view, documentId, replace) {
    const next = documentId ? `#${view}/${documentId}` : `#${view}`;
    if (replace) {
      window.history.replaceState(null, "", next);
    } else if (window.location.hash !== next) {
      window.history.pushState(null, "", next);
    }
  }

  function writePresentationHash(index, replace) {
    const next = `#present/${index + 1}`;
    if (replace) {
      window.history.replaceState(null, "", next);
    } else if (window.location.hash !== next) {
      window.history.pushState(null, "", next);
    }
  }

  function updateTabs(view) {
    document.querySelectorAll(".primary-tab").forEach((tab) => {
      const selected = tab.dataset.view === view;
      tab.classList.toggle("is-active", selected);
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
  }

  function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons({ attrs: { "stroke-width": 1.7 } });
    }
  }

  function activateDocument(documentId, updateUrl) {
    const requested = document.getElementById(`docs-panel-${documentId}`) ? documentId : "strategy-doc";
    activeDocument = requested;
    document.querySelectorAll(".doc-tab").forEach((button) => {
      const selected = button.dataset.doc === requested;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    document.querySelectorAll("#deliverable-outlet .document-panel").forEach((panel) => {
      panel.hidden = panel.id !== `docs-panel-${requested}`;
    });
    const activePanel = document.getElementById(`docs-panel-${requested}`);
    if (activePanel && !reduceMotion()) {
      activePanel.classList.remove("is-switching");
      window.requestAnimationFrame(() => {
        activePanel.classList.add("is-switching");
        window.setTimeout(() => activePanel.classList.remove("is-switching"), 480);
      });
    }
    if (updateUrl) writeHash("deliverables", requested, false);
  }

  function moveDeliverables() {
    const outlet = document.getElementById("deliverable-outlet");
    if (!outlet) return;
    const sourcePanels = document.querySelectorAll("#documents .document-panel");
    sourcePanels.forEach((panel) => {
      panel.classList.add("native-deliverable");
      const documentKey = panel.id.replace(/^docs-panel-/, "");
      const tab = document.querySelector(`.doc-tab[data-doc="${documentKey}"]`);
      if (tab) {
        tab.id = `new-doc-tab-${documentKey}`;
        panel.setAttribute("aria-labelledby", tab.id);
      }
      outlet.appendChild(panel);
    });
    activateDocument(activeDocument, false);
  }

  function renderNode(nodeId) {
    const detail = nodeDetails[nodeId] || nodeDetails.ad;
    const title = document.getElementById("node-detail-title");
    const copy = document.getElementById("node-detail-copy");
    const technical = document.getElementById("node-detail-technical");
    const label = document.getElementById("node-detail-label");
    const counter = document.getElementById("journey-counter");
    const node = document.querySelector(`.journey-node[data-node="${nodeId}"]`);
    if (!title || !copy || !technical || !label || !node) return;
    const index = node.querySelector(".node-index")?.textContent || "01";
    title.textContent = detail.title;
    copy.textContent = explanationMode === "plain" ? detail.plain : detail.detail;
    technical.textContent = detail.technical;
    label.textContent = explanationMode === "plain" ? "Plain English" : "GHL detail";
    if (counter) counter.textContent = `${index.padStart(2, "0")} / 10`;
    const journeySignal = document.getElementById("journey-signal");
    if (journeySignal && !systemTrigger) {
      const progress = Math.max(0, Math.min(1, (Number.parseInt(index, 10) - 1) / 9));
      journeySignal.setAttribute("cx", String(55 + (850 * progress)));
      journeySignal.style.opacity = "0.9";
    }
    document.querySelectorAll(".journey-node").forEach((button) => {
      button.classList.toggle("is-selected", button === node);
      button.setAttribute("aria-pressed", String(button === node));
    });
  }

  function initJourney() {
    document.querySelectorAll(".journey-node").forEach((node) => {
      node.addEventListener("click", () => renderNode(node.dataset.node));
    });
    document.querySelectorAll(".segment").forEach((segment) => {
      segment.addEventListener("click", () => {
        explanationMode = segment.dataset.mode === "detail" ? "detail" : "plain";
        document.querySelectorAll(".segment").forEach((button) => {
          const selected = button.dataset.mode === explanationMode;
          button.classList.toggle("is-active", selected);
          button.setAttribute("aria-pressed", String(selected));
        });
        const selectedNode = document.querySelector(".journey-node.is-selected")?.dataset.node || "ad";
        renderNode(selectedNode);
      });
    });
    renderNode("ad");
  }

  const workflowTypeLabels = {
    trigger: "TRIGGER",
    action: "ACTION",
    condition: "IF / ELSE",
    wait: "WAIT",
    handoff: "HANDOFF",
    stop: "STOP"
  };

  function refreshWorkflowDetailMotion() {
    const detailPanel = document.querySelector(".workflow-node-detail");
    if (!detailPanel || reduceMotion()) return;
    detailPanel.classList.remove("is-refreshing");
    window.requestAnimationFrame(() => {
      detailPanel.classList.add("is-refreshing");
      window.setTimeout(() => detailPanel.classList.remove("is-refreshing"), 420);
    });
  }

  function renderWorkflowNode(workflow, nodeIndex) {
    const node = workflow.nodes[nodeIndex];
    if (!node) return;
    activeWorkflowNode = nodeIndex;
    document.querySelectorAll(".workflow-node-card").forEach((button) => {
      const selected = Number(button.dataset.workflowNode) === nodeIndex;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    const type = document.getElementById("workflow-node-type");
    const position = document.getElementById("workflow-node-position");
    const title = document.getElementById("workflow-node-title");
    const description = document.getElementById("workflow-node-description");
    const functionCopy = document.getElementById("workflow-node-function");
    const ghl = document.getElementById("workflow-node-ghl");
    const branch = document.getElementById("workflow-node-branch");
    const outcomes = document.getElementById("workflow-node-outcomes");
    if (type) type.textContent = workflowTypeLabels[node.type] || "NODE";
    if (position) position.textContent = String(nodeIndex + 1).padStart(2, "0") + " / " + String(workflow.nodes.length).padStart(2, "0");
    if (title) title.textContent = node.title;
    if (description) description.textContent = node.description;
    if (functionCopy) functionCopy.textContent = node.function;
    if (ghl) ghl.textContent = node.ghl;
    if (branch && outcomes) {
      outcomes.textContent = "";
      if (node.outcomes?.length) {
        branch.hidden = false;
        node.outcomes.forEach((outcome) => {
          const item = document.createElement("div");
          item.className = "workflow-node-outcome";
          const label = document.createElement("span");
          label.textContent = outcome.label;
          const copy = document.createElement("p");
          copy.textContent = outcome.text;
          item.append(label, copy);
          outcomes.appendChild(item);
        });
      } else {
        branch.hidden = true;
      }
    }
    refreshWorkflowDetailMotion();
  }

  function renderWorkflow(workflowId) {
    const workflow = workflowDefinitions[workflowId];
    const canvas = document.getElementById("workflow-canvas");
    if (!workflow || !canvas) return;
    activeWorkflow = workflowId;
    activeWorkflowNode = 0;

    document.querySelectorAll(".workflow-picker-tab").forEach((tab) => {
      const selected = tab.dataset.workflow === workflowId;
      tab.classList.toggle("is-active", selected);
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    const workspace = document.getElementById("workflow-workspace");
    const activeTab = document.querySelector(`.workflow-picker-tab[data-workflow="${workflowId}"]`);
    if (workspace && activeTab) workspace.setAttribute("aria-labelledby", activeTab.id);

    const values = {
      "workflow-number": workflow.number,
      "workflow-title": workflow.name,
      "workflow-summary": workflow.summary,
      "workflow-trigger": workflow.trigger,
      "workflow-location": workflow.location,
      "workflow-stop": workflow.stop,
      "workflow-count": String(workflow.nodes.length).padStart(2, "0") + " nodes",
      "workflow-canvas-label": String(workflow.nodes.length).padStart(2, "0") + " NODE PATH"
    };
    Object.entries(values).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) element.textContent = value;
    });

    canvas.textContent = "";
    workflow.nodes.forEach((node, nodeIndex) => {
      const wrapper = document.createElement("div");
      wrapper.className = "workflow-node-wrap";
      wrapper.style.setProperty("--flow-index", String(nodeIndex));
      wrapper.setAttribute("role", "listitem");

      const button = document.createElement("button");
      button.className = "workflow-node-card workflow-node-" + node.type + (nodeIndex === 0 ? " is-selected" : "");
      button.type = "button";
      button.dataset.workflowNode = String(nodeIndex);
      button.setAttribute("aria-pressed", String(nodeIndex === 0));
      button.setAttribute("aria-label", String(nodeIndex + 1).padStart(2, "0") + ". " + node.title + ". " + (workflowTypeLabels[node.type] || "Node"));

      const index = document.createElement("span");
      index.className = "workflow-node-index";
      index.textContent = String(nodeIndex + 1).padStart(2, "0");
      const kind = document.createElement("span");
      kind.className = "workflow-node-kind";
      kind.textContent = workflowTypeLabels[node.type] || "NODE";
      const title = document.createElement("strong");
      title.textContent = node.title;
      const summary = document.createElement("p");
      summary.textContent = node.description;
      button.append(index, kind, title, summary);
      button.addEventListener("click", () => renderWorkflowNode(workflow, nodeIndex));
      wrapper.appendChild(button);

      if (nodeIndex < workflow.nodes.length - 1) {
        const connector = document.createElement("span");
        connector.className = "workflow-connector";
        connector.setAttribute("aria-hidden", "true");
        const icon = document.createElement("i");
        icon.dataset.lucide = "arrow-right";
        connector.appendChild(icon);
        wrapper.appendChild(connector);
      }
      canvas.appendChild(wrapper);
    });
    renderWorkflowNode(workflow, 0);
    refreshIcons();
  }

  function initWorkflowLab() {
    const picker = document.querySelector(".workflow-picker-tabs");
    if (!picker || !document.getElementById("workflow-canvas")) return;
    const tabs = Array.from(picker.querySelectorAll(".workflow-picker-tab"));
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => renderWorkflow(tab.dataset.workflow));
      tab.addEventListener("keydown", (event) => {
        if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        let next = index;
        if (event.key === "ArrowDown") next = (index + 1) % tabs.length;
        if (event.key === "ArrowUp") next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = tabs.length - 1;
        tabs[next].focus();
        renderWorkflow(tabs[next].dataset.workflow);
      });
    });
    renderWorkflow(activeWorkflow);
  }

  function setupReveals() {
    if (!window.IntersectionObserver) return;
    if (revealObserver) revealObserver.disconnect();
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-inview");
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));
  }

  function setupSystemMotion() {
    if (!window.gsap || reduceMotion()) return;
    if (systemTrigger) {
      systemTrigger.kill();
      systemTrigger = null;
    }
    const path = document.getElementById("journey-draw-path");
    if (!path) return;
    const signal = document.getElementById("journey-signal");
    const setSignal = (progress) => {
      if (!signal) return;
      const safeProgress = Math.max(0, Math.min(1, progress));
      signal.setAttribute("cx", String(55 + (850 * safeProgress)));
      signal.style.opacity = safeProgress > 0.02 ? "0.9" : "0";
    };
    window.gsap.set(path, { strokeDashoffset: 1 });
    setSignal(0);
    if (window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      if (isDesktop) {
        systemTrigger = window.ScrollTrigger.create({
          trigger: ".journey-map-stage",
          start: "top top+=100",
          end: "+=520",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            path.style.strokeDashoffset = String(1 - self.progress);
            setSignal(self.progress);
          }
        });
      } else {
        window.gsap.to(path, { strokeDashoffset: 0, duration: 1.2, ease: "power2.out" });
        if (signal) window.gsap.to(signal, { attr: { cx: 905 }, opacity: 0.9, duration: 1.2, delay: 0.12, ease: "power2.inOut" });
      }
    } else {
      window.gsap.to(path, { strokeDashoffset: 0, duration: 1.2, ease: "power2.out" });
      if (signal) window.gsap.to(signal, { attr: { cx: 905 }, opacity: 0.9, duration: 1.2, delay: 0.12, ease: "power2.inOut" });
    }
  }

  function setupHeroMotion() {
    if (!window.gsap || reduceMotion()) return;
    window.gsap.from(".hero-copy > *", { y: 18, opacity: 0, duration: 0.55, stagger: 0.07, ease: "power2.out" });
    window.gsap.from(".hero-scene", { y: 20, opacity: 0, duration: 0.7, delay: 0.16, ease: "power2.out" });
    window.gsap.fromTo(".scene-path-front", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, delay: 0.25, ease: "power2.out" });
    window.gsap.from(".scene-node", { scale: 0.76, transformOrigin: "center", opacity: 0, duration: 0.45, stagger: 0.12, delay: 0.3, ease: "back.out(1.4)" });
  }

  function initMotion(view) {
    const canAnimate = Boolean(window.gsap) && !reduceMotion();
    document.body.classList.toggle("motion-enhanced", canAnimate);
    setupReveals();
    if (!canAnimate) return;
    if (view === "tour" && !document.body.dataset.heroAnimated) {
      setupHeroMotion();
      document.body.dataset.heroAnimated = "true";
    }
    if (view === "system") setupSystemMotion();
  }

  function setView(view, options = {}) {
    const nextView = views.includes(view) ? view : "tour";
    activeView = nextView;
    document.querySelectorAll("[data-view-panel]").forEach((panel) => {
      panel.hidden = panel.dataset.viewPanel !== nextView;
      panel.classList.toggle("is-active", panel.dataset.viewPanel === nextView);
    });
    updateTabs(nextView);
    document.body.dataset.view = nextView;
    if (nextView === "deliverables") activateDocument(activeDocument, false);
    if (nextView !== "system" && systemTrigger) {
      systemTrigger.kill();
      systemTrigger = null;
    }
    if (options.updateUrl !== false) writeHash(nextView, nextView === "deliverables" ? activeDocument : null, options.replace === true);
    initMotion(nextView);
    if (options.scroll !== false) {
      window.requestAnimationFrame(() => {
        if (nextView === "tour") {
          window.scrollTo({ top: 0, behavior: reduceMotion() ? "auto" : "smooth" });
        } else {
          document.getElementById(`view-${nextView}`)?.scrollIntoView({ block: "start", behavior: reduceMotion() ? "auto" : "smooth" });
        }
      });
    }
    if (options.focus) document.getElementById(`view-${nextView}`)?.focus({ preventScroll: true });
  }

  function updatePresentation(index, options = {}) {
    const slides = Array.from(document.querySelectorAll("[data-presentation-slide]"));
    if (!slides.length) return;
    presentationIndex = Math.max(0, Math.min(slides.length - 1, index));

    slides.forEach((slide, slideIndex) => {
      const selected = slideIndex === presentationIndex;
      slide.hidden = !selected;
      slide.classList.toggle("is-active", selected);
      slide.setAttribute("aria-hidden", String(!selected));
    });

    const step = document.getElementById("presentation-step");
    const total = document.getElementById("presentation-total");
    const progress = document.querySelector(".presentation-progress");
    const progressFill = document.getElementById("presentation-progress-fill");
    const timing = document.getElementById("presentation-timing");
    const runtime = document.getElementById("presentation-runtime");
    const previous = document.getElementById("presentation-prev");
    const next = document.getElementById("presentation-next");
    if (step) step.textContent = String(presentationIndex + 1).padStart(2, "0");
    if (total) total.textContent = String(slides.length).padStart(2, "0");
    if (progress) {
      progress.setAttribute("aria-valuemax", String(slides.length));
      progress.setAttribute("aria-valuenow", String(presentationIndex + 1));
    }
    if (progressFill) progressFill.style.transform = `scaleX(${(presentationIndex + 1) / slides.length})`;
    if (timing) timing.textContent = `~${slides[presentationIndex].dataset.presentationMinutes || "2"} MIN`;
    if (runtime) {
      const totalMinutes = slides.reduce((sum, slide) => sum + Number(slide.dataset.presentationMinutes || 2), 0);
      runtime.textContent = `${totalMinutes} MIN WALKTHROUGH`;
    }
    if (previous) previous.disabled = presentationIndex === 0;
    if (next) {
      const isLast = presentationIndex === slides.length - 1;
      next.innerHTML = isLast
        ? '<span>Open full case study</span><i data-lucide="arrow-up-right" aria-hidden="true"></i>'
        : '<span>Next</span><i data-lucide="arrow-right" aria-hidden="true"></i>';
      next.setAttribute("aria-label", isLast ? "Open the full case study" : "Next presentation slide");
    }
    document.querySelectorAll("[data-presentation-dot]").forEach((dot) => {
      const selected = Number(dot.dataset.presentationDot) === presentationIndex;
      dot.setAttribute("aria-selected", String(selected));
      dot.setAttribute("aria-controls", `presentation-slide-${Number(dot.dataset.presentationDot) + 1}`);
      dot.tabIndex = selected ? 0 : -1;
    });
    refreshIcons();

    if (options.updateUrl !== false) writePresentationHash(presentationIndex, options.replace === true);
    if (options.focus) document.getElementById("presentation-stage")?.focus({ preventScroll: true });
  }

  function openPresentation(index = 0, options = {}) {
    const overlay = document.getElementById("presentation-mode");
    const header = document.querySelector(".redesign-header");
    const main = document.getElementById("case-study");
    if (!overlay) return;

    const alreadyOpen = document.body.classList.contains("is-presentation-open");
    if (!alreadyOpen) {
      presentationPreviousFocus = document.activeElement;
      if (!window.location.hash.startsWith("#present")) presentationReturnHash = window.location.hash || "#tour";
      overlay.hidden = false;
      overlay.setAttribute("aria-hidden", "false");
      document.body.classList.add("is-presentation-open");
      if (header) {
        header.setAttribute("aria-hidden", "true");
        header.inert = true;
      }
      if (main) main.inert = true;
    }

    updatePresentation(index, { updateUrl: options.updateUrl !== false, replace: options.replace === true });
    if (options.focus !== false && !alreadyOpen) document.getElementById("presentation-close")?.focus();
  }

  function closePresentation(options = {}) {
    const overlay = document.getElementById("presentation-mode");
    const header = document.querySelector(".redesign-header");
    const main = document.getElementById("case-study");
    if (!overlay || !document.body.classList.contains("is-presentation-open")) return;

    overlay.hidden = true;
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-presentation-open");
    if (header) {
      header.inert = false;
      header.removeAttribute("aria-hidden");
    }
    if (main) main.inert = false;

    const returnHash = options.returnHash || presentationReturnHash || "#tour";
    if (options.updateUrl !== false && window.location.hash !== returnHash) window.history.replaceState(null, "", returnHash);
    const state = getHashState();
    if (state.documentId) activeDocument = state.documentId;
    setView(state.view, { updateUrl: false, scroll: options.scroll !== false });
    if (options.restoreFocus !== false) presentationPreviousFocus?.focus?.({ preventScroll: true });
    presentationPreviousFocus = null;
  }

  function syncUrlState() {
    const state = getHashState();
    if (state.presentation) {
      if (document.body.classList.contains("is-presentation-open")) {
        updatePresentation(state.presentationIndex, { updateUrl: false });
      } else {
        openPresentation(state.presentationIndex, { updateUrl: false });
      }
      return;
    }
    if (document.body.classList.contains("is-presentation-open")) {
      closePresentation({ updateUrl: false, returnHash: window.location.hash || "#tour" });
      return;
    }
    if (state.documentId) activeDocument = state.documentId;
    setView(state.view, { updateUrl: false });
  }

  function initPresentation() {
    const slides = Array.from(document.querySelectorAll("[data-presentation-slide]"));
    const dotsContainer = document.querySelector(".presentation-dots");
    if (dotsContainer) {
      dotsContainer.textContent = "";
      slides.forEach((slide, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.role = "tab";
        dot.setAttribute("aria-selected", String(index === 0));
        dot.setAttribute("aria-label", `Go to presentation slide ${index + 1}`);
        dot.dataset.presentationDot = String(index);
        dot.tabIndex = index === 0 ? 0 : -1;
        dotsContainer.appendChild(dot);
      });
    }
    document.querySelectorAll("[data-presentation-open]").forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        openPresentation(0);
      });
    });
    document.querySelector("[data-presentation-close]")?.addEventListener("click", () => closePresentation());
    document.querySelector("[data-presentation-prev]")?.addEventListener("click", () => updatePresentation(presentationIndex - 1));
    document.querySelector("[data-presentation-next]")?.addEventListener("click", () => {
      const last = document.querySelectorAll("[data-presentation-slide]").length - 1;
      if (presentationIndex >= last) {
        closePresentation({ returnHash: "#system" });
      } else {
        updatePresentation(presentationIndex + 1);
      }
    });
    document.querySelectorAll("[data-presentation-dot]").forEach((dot) => {
      dot.addEventListener("click", () => updatePresentation(Number(dot.dataset.presentationDot)));
      dot.addEventListener("keydown", (event) => {
        if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
        const dots = Array.from(document.querySelectorAll("[data-presentation-dot]"));
        const current = Number(dot.dataset.presentationDot);
        let next = current;
        if (event.key === "ArrowRight") next = (current + 1) % dots.length;
        if (event.key === "ArrowLeft") next = (current - 1 + dots.length) % dots.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = dots.length - 1;
        event.preventDefault();
        event.stopPropagation();
        dots[next].focus();
        updatePresentation(next);
      });
    });
    document.addEventListener("keydown", (event) => {
      if (!document.body.classList.contains("is-presentation-open")) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closePresentation();
      }
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        updatePresentation(presentationIndex + 1);
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        updatePresentation(presentationIndex - 1);
      }
    });
  }

  function initNavigation() {
    const tabs = Array.from(document.querySelectorAll(".primary-tab"));
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => setView(tab.dataset.view));
      tab.addEventListener("keydown", (event) => {
        if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        let next = index;
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = tabs.length - 1;
        tabs[next].focus();
        setView(tabs[next].dataset.view);
      });
    });

    document.querySelectorAll("[data-view-link]").forEach((link) => {
      link.addEventListener("click", (event) => {
        const view = link.dataset.viewLink;
        if (!views.includes(view)) return;
        event.preventDefault();
        setView(view);
      });
    });

    const documentTabs = Array.from(document.querySelectorAll(".doc-tab"));
    documentTabs.forEach((button, index) => {
      button.addEventListener("click", () => {
        activateDocument(button.dataset.doc, true);
        setView("deliverables", { updateUrl: false, scroll: true });
      });
      button.addEventListener("keydown", (event) => {
        if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        let next = index;
        if (event.key === "ArrowDown") next = (index + 1) % documentTabs.length;
        if (event.key === "ArrowUp") next = (index - 1 + documentTabs.length) % documentTabs.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = documentTabs.length - 1;
        documentTabs[next].focus();
        activateDocument(documentTabs[next].dataset.doc, true);
        setView("deliverables", { updateUrl: false, scroll: true });
      });
    });

    window.addEventListener("hashchange", syncUrlState);
    window.addEventListener("popstate", syncUrlState);
  }

  function disableSignalForReducedMotion() {
    if (!reduceMotion()) return;
    document.querySelectorAll("animateMotion").forEach((element) => element.remove());
  }

  function start() {
    moveDeliverables();
    initJourney();
    initWorkflowLab();
    initPresentation();
    initNavigation();
    disableSignalForReducedMotion();
    const state = getHashState();
    if (state.presentation) {
      openPresentation(state.presentationIndex, { updateUrl: false, focus: false });
    } else {
      if (state.documentId) activeDocument = state.documentId;
      setView(state.view, { replace: true, scroll: state.view !== "tour" });
    }
    refreshIcons();
    window.setTimeout(refreshIcons, 80);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();

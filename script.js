(() => {
  "use strict";

  const views = ["problem", "solution", "build", "evidence", "measurement"];
  const aliases = {
    "": "problem",
    problem: "problem",
    tour: "problem",
    "quick-tour": "problem",
    "beginner-path": "problem",
    solution: "solution",
    system: "solution",
    board: "solution",
    build: "build",
    implementation: "build",
    process: "build",
    evidence: "evidence",
    deliverables: "evidence",
    documents: "evidence",
    measurement: "measurement",
    results: "measurement"
  };

  const presentationChapters = [
    { name: "What Was Going Wrong", start: 0, end: 3 },
    { name: "Helping People Ask", start: 4, end: 7 },
    { name: "Helping People Book", start: 8, end: 11 },
    { name: "Helping People Show Up", start: 12, end: 15 },
    { name: "Helping the Clinic Follow Up", start: 16, end: 19 },
    { name: "Learning What Works", start: 20, end: 24 }
  ];

  const presentationSlideOrder = [
    "presentation-slide-1",
    "presentation-slide-3",
    "presentation-slide-b2b-bridge",
    "presentation-slide-2",
    "presentation-slide-marketing-martech",
    "presentation-slide-four-decisions",
    "presentation-slide-4",
    "presentation-slide-funnel-math",
    "presentation-slide-journey-funnel",
    "presentation-slide-6",
    "presentation-slide-7",
    "presentation-slide-12",
    "presentation-slide-dtc-realities",
    "presentation-slide-13",
    "presentation-slide-14",
    "presentation-slide-15",
    "presentation-slide-5",
    "presentation-slide-analyst-lens",
    "presentation-slide-11",
    "presentation-slide-9",
    "presentation-slide-16",
    "presentation-slide-10",
    "presentation-slide-8",
    "presentation-slide-17",
    "presentation-slide-18"
  ];

  const problemStories = [
    {
      id: "conversion",
      number: "01",
      shortLabel: "Ask for help",
      customerStep: "See the offer → ask for help",
      simpleProblem: "People could see the offer without understanding the next step.",
      simpleCause: "The message did not explain the consultation clearly enough for someone new to the clinic.",
      customerImpact: "Sam could leave without knowing what the visit was for or what would happen next.",
      simpleFix: "Explain the free consultation in plain language and use the same promise everywhere.",
      whatSystemDoes: "The page and form give Sam one clear action and ask only for useful context.",
      simpleMeasure: "Of the people who opened the page, how many completed the form?",
      example: "Sam sees a smile consultation ad. The page makes the offer feel clear and low pressure.",
      technical: {
        problem: "Interest was not becoming qualified intent.",
        implementation: "GHL funnel page, consultation copy, inquiry form, source tags, and UTM campaign values.",
        ghlLocation: "Sites > Funnels, Forms, Tags, and campaign tracking values",
        events: "ad_click → landing_page_view → form_submit",
        formula: "form_submit / landing_page_view",
        phases: ["01", "02", "04"],
        evidence: ["strategy-doc", "campaign-doc", "copy-doc"],
        diagnosticKey: "capture"
      }
    },
    {
      id: "booking",
      number: "02",
      shortLabel: "Choose a time",
      customerStep: "Ask for help → choose a time",
      simpleProblem: "Someone could complete the form and still leave without booking.",
      simpleCause: "The form and calendar did not feel like one connected next step.",
      customerImpact: "Sam could share information but still not know how to schedule the consultation.",
      simpleFix: "Show the calendar right after the form and follow up when a time is still missing.",
      whatSystemDoes: "The form saves Sam’s answers, then the calendar offers a 30-minute consultation.",
      simpleMeasure: "Of the people who completed the form, how many chose a time?",
      example: "Sam finishes the questions and immediately sees available consultation times.",
      technical: {
        problem: "Qualified intent was not becoming a booking.",
        implementation: "Mapped form fields, a 30-minute calendar, appointment settings, and New Lead-to-Booked stage movement.",
        ghlLocation: "Forms, Calendars, Opportunities, and Automation > Workflows",
        events: "form_submit → booking_created",
        formula: "booking_created / form_submit",
        phases: ["03", "06", "07"],
        evidence: ["funnel-doc", "copy-doc", "checklist-doc"],
        diagnosticKey: "booking"
      }
    },
    {
      id: "attendance",
      number: "03",
      shortLabel: "Show up",
      customerStep: "Choose a time → show up",
      simpleProblem: "A booked appointment could be forgotten or missed.",
      simpleCause: "Confirmation, reminders, permission, and rebooking rules were not connected.",
      customerImpact: "Sam could miss the visit, while the clinic loses time reserved for the consultation.",
      simpleFix: "Confirm the appointment, send respectful reminders, and offer a clear way to rebook.",
      whatSystemDoes: "The system checks the appointment status and stops or changes the messages when needed.",
      simpleMeasure: "Of the appointments whose dates passed, how many were attended?",
      example: "Sam gets a confirmation, a reminder, and a simple way to ask for another time.",
      technical: {
        problem: "Bookings were not reliably becoming attended consultations.",
        implementation: "Confirmation email, consent-gated SMS, reminder waits, appointment-status branches, and recovery exits.",
        ghlLocation: "Automation > Workflows, Email templates, Snippets, and Calendars",
        events: "booking_created → show_completed or no_show",
        formula: "no_show / mature_booking",
        phases: ["08", "10"],
        evidence: ["messages-doc", "workflow-doc", "checklist-doc"],
        diagnosticKey: "attendance"
      }
    },
    {
      id: "continuity",
      number: "04",
      shortLabel: "Take the next step",
      customerStep: "Attend → take the next step",
      simpleProblem: "The clinic could lose track of what happened after the consultation.",
      simpleCause: "The team did not have one shared place for the person, outcome, and next action.",
      customerImpact: "Sam could receive the wrong message or be forgotten after the visit.",
      simpleFix: "Record the outcome and place each person in the correct next step.",
      whatSystemDoes: "The record tells the team whether to follow up about whitening, payment, recall, or nothing yet.",
      simpleMeasure: "Of completed consultations, how many produced the appropriate next step?",
      example: "After Sam’s visit, the clinic records the outcome so the next message matches the conversation.",
      technical: {
        problem: "Customer outcomes were not producing coordinated follow-up.",
        implementation: "Contact fields, source and consent tags, opportunity stages, and six modular GHL workflows.",
        ghlLocation: "Contacts, Custom Fields, Tags, Opportunities, and Automation > Workflows",
        events: "show_completed → whitening_booked or whitening_paid → recall_due",
        formula: "whitening_booked / show_completed; recall_booked / contact_due",
        phases: ["05", "08"],
        evidence: ["funnel-doc", "workflow-doc", "checklist-doc"],
        diagnosticKey: "value"
      }
    },
    {
      id: "learning",
      number: "05",
      shortLabel: "Learn what worked",
      customerStep: "Take the next step → learn what worked",
      simpleProblem: "Activity numbers alone could not explain where people got stuck.",
      simpleCause: "The team had not agreed on what to count, who to compare, or when to review it.",
      customerImpact: "The team could change the wrong part of the journey or mistake a target for a result.",
      simpleFix: "Count each step separately and review the first place where people drop away.",
      whatSystemDoes: "The dashboard connects each customer step to one question and one next test.",
      simpleMeasure: "Which step loses the largest share of the people who reached it?",
      example: "The team sees that many people opened the page but fewer completed the form, then tests the page copy.",
      technical: {
        problem: "Marketing activity was not producing clear optimization decisions.",
        implementation: "UTMs, funnel events, GHL reporting surfaces, KPI tree, weekly review, and simulation QA checklist.",
        ghlLocation: "Dashboard, Opportunities, Appointments, message reporting, and campaign tracking",
        events: "ad_click → landing_page_view → form_submit → booking_created → show_completed",
        formula: "first material drop → evidence check → one next test",
        phases: ["09", "10"],
        evidence: ["kpi-doc", "checklist-doc"],
        diagnosticKey: "arrival"
      }
    }
  ];

  const presentationNarrative = [
    { id: "presentation-slide-1", topic: "START HERE", title: "People were interested, but the process could lose them.", body: "This project connects one person’s journey from an ad to an appointment and follow-up. You can inspect each decision as we go.", minutes: 1, note: "Main idea: The project fixes the path between interest and care. Explain: A person can like an ad and still get lost before booking. Example: Sam sees the offer but needs clear help. Ask: Where might Sam stop? Technical backup: The complete system uses GHL to store the person, appointment, messages, and progress.", transition: "First, explain what the simulation can and cannot prove." },
    { id: "presentation-slide-3", topic: "WHAT THIS IS", title: "This is a finished practice project, not a live campaign report.", body: "The workshop gave us example numbers. I used them to design and test the system.", minutes: 2, note: "Main idea: This project shows how I think and build. Explain: The clinic was a workshop scenario, so no real campaign ran. Example: The 35% no-show figure is an input, not a result. Ask: What would we need before calling a number real? Technical backup: Targets, source tracking, sender setup, compliance, and live data remain launch dependencies.", transition: "Now connect this customer example to familiar data work." },
    { id: "presentation-slide-b2b-bridge", topic: "FROM B2B TO DTC", title: "The data habits transfer. The person’s journey is faster.", body: "We still track people, steps, timing, and outcomes. Here, one person may move in minutes or days.", minutes: 2, note: "Main idea: B2B analytics skills still apply. Explain: We ask what happened, when it happened, and what happened next. Example: A lead can move from page view to form to booking in one session. Ask: Which parts of your current data work already follow this pattern? Technical backup: Identity, lifecycle, event time, source, and mature groups remain useful concepts.", transition: "With that bridge, we can name the five places the journey may break." },
    { id: "presentation-slide-2", topic: "MEET SAM", title: "Meet Sam, our fictional example visitor.", body: "Sam sees an ad, asks for help, chooses a time, gets reminders, attends, and helps the team learn what to check next.", minutes: 2, note: "Main idea: One fictional visitor makes the system easy to follow. Explain: Sam is not a real patient or a reported result. Example: We will follow Sam from the first ad through the appointment and the team’s review. Ask: Which step would you want to make easiest for Sam? Technical backup: Use the canonical journey model to connect events, records, workflows, phases, deliverables, and measures.", transition: "Start with the first moment: Sam sees the offer." },
    { id: "presentation-slide-marketing-martech", topic: "1 / ASK FOR HELP", title: "Sam sees an ad, but seeing is not asking.", body: "An ad can get attention without making the next step feel clear or safe. That gap is the first problem this project addresses.", minutes: 1, note: "Main idea: Attention is only the beginning. Explain: The clinic needs Sam to understand what help is available. Example: Sam may like the idea of a better smile but still wonder about cost, pressure, or the first visit. Ask: What question might stop Sam? Technical backup: A click is not yet a lead or business outcome.", transition: "The cause is uncertainty, so the offer must answer simple questions." , problem: "conversion" },
    { id: "presentation-slide-four-decisions", topic: "1 / WHY IT HAPPENS", title: "The offer must answer questions before it asks for action.", body: "Sam needs to know who the visit is for, what happens there, and what is not required.", minutes: 2, note: "Main idea: Clear words reduce uncertainty. Explain: A person is more likely to ask for help when the visit feels specific and low pressure. Example: ‘Talk about your options first’ feels different from ‘Buy whitening now.’ Ask: Which message would make you more comfortable? Technical backup: Audience, offer, channel, and message must stay aligned.", transition: "That leads to the first response: a clear consultation offer." },
    { id: "presentation-slide-4", topic: "1 / THE FIX", title: "Make the first step easy to understand.", body: "The page explains the free consultation, repeats the same promise, and asks for useful information. The goal is clarity before commitment.", minutes: 2, note: "Main idea: The first action is a conversation, not a treatment sale. Explain: The page, form, and follow-up use the same calm message. Example: Sam knows what the consultation is for before sharing details. Ask: What would you want to know before asking a clinic for help? Technical backup: The GHL funnel page, form, tags, and tracking values support the message path.", transition: "Next, show how we would know the page is helping." },
    { id: "presentation-slide-funnel-math", topic: "1 / HOW WE CHECK", title: "Count each step so we can find the first weak point.", body: "We separate page visits from form answers. That tells us where people stop. The question is about the page, not the whole ad.", minutes: 2, note: "Main idea: One big number cannot explain a journey. Explain: We count page views, then form completions, instead of calling both ‘leads.’ Example: If many people open the page but few complete the form, test the page first. Ask: What should we change if the first drop is here? Technical backup: The detailed rates are CTR, arrival rate, and landing conversion.", transition: "Once Sam asks for help, the next question is whether Sam chooses a time." },
    { id: "presentation-slide-journey-funnel", topic: "2 / CHOOSE A TIME", title: "Sam fills in the form, but may still leave without a time.", body: "Sharing information and choosing an appointment are two different actions. The project treats both actions as important.", minutes: 1, note: "Main idea: A completed form is not a booked appointment. Explain: Sam can answer questions and still stop before scheduling. Example: The clinic knows Sam is interested but does not know when to expect the visit. Ask: What should Sam see immediately after submitting? Technical backup: Form submission and appointment creation are separate events.", transition: "The fix connects those two actions without hiding either one." , problem: "booking" },
    { id: "presentation-slide-6", topic: "2 / WHY IT HAPPENS", title: "A form and a calendar can feel like two unrelated tasks.", body: "The person can lose momentum, and the clinic can lose useful context. The next action should be visible.", minutes: 2, note: "Main idea: The gap between form and calendar is a real customer problem. Explain: Sam has already made an effort, so the next step should be obvious. Example: A vague thank-you page makes Sam wonder what to do now. Ask: What would make the next action impossible to miss? Technical backup: The system must preserve context while moving the contact toward an appointment.", transition: "That leads to a form-first path." },
    { id: "presentation-slide-7", topic: "2 / THE FIX", title: "Ask a few useful questions, then show the calendar.", body: "The form saves Sam’s goal and permission. The calendar then offers a 30-minute consultation. This keeps the journey simple for Sam and the clinic.", minutes: 2, note: "Main idea: Ask first, schedule next. Explain: The form gives the clinic context and gives Sam a clear next action. Example: Sam explains what to improve, then sees available times right away. Ask: Which questions help the conversation, and which only add work? Technical backup: Mapped fields, calendar settings, and the New Lead-to-Booked stage support the handoff.", transition: "Now connect the path to one simple booking check." },
    { id: "presentation-slide-12", topic: "2 / HOW WE CHECK", title: "Ask one clear booking question.", body: "Of the people who completed the form, how many chose a time? This is the booking check. It tells us where to look next.", minutes: 2, note: "Main idea: Measure booking from the people who could actually book. Explain: We do not divide bookings by everyone who saw the ad. Example: Sam belongs in this group only after completing the form. Ask: What evidence would show that the calendar handoff failed? Technical backup: Lead-to-booking is booking_created divided by form_submit, reviewed by source and time.", transition: "A chosen time is progress, but Sam still needs to show up." },
    { id: "presentation-slide-dtc-realities", topic: "3 / SHOW UP", title: "A booked visit can still be missed.", body: "The workshop used a 35% no-show pattern as a problem to plan for, not a live result. This is a planning input for the reminder design.", minutes: 1, note: "Main idea: Booking is not the same as attendance. Explain: People get busy, forget, or need another time. Example: Sam may want the consultation and still miss Tuesday’s appointment. Ask: What kind of reminder would help without becoming annoying? Technical backup: No-show rates use only appointments whose dates have passed.", transition: "The next question is how reminders can help without creating new problems.", problem: "attendance" },
    { id: "presentation-slide-13", topic: "3 / WHY IT HAPPENS", title: "Reminders need timing, permission, and stop rules.", body: "A message sent at the wrong time, or after a change, can hurt trust. Good timing protects both sides of the appointment.", minutes: 2, note: "Main idea: More messages are not automatically better. Explain: The system must know when to send, which channel is allowed, and when to stop. Example: Sam should not receive a ‘please book’ reminder after already booking. Ask: What should stop a reminder? Technical backup: Separate workflows use triggers, waits, conditions, appointment status, and consent.", transition: "That is why the response uses small automatic helpers." },
    { id: "presentation-slide-14", topic: "3 / THE FIX", title: "Confirm, remind, check, and help Sam rebook.", body: "Each automatic helper has one job and stops when the appointment changes. Good timing protects both sides of the appointment.", minutes: 2, note: "Main idea: Small rules are easier to understand and fix. Explain: One helper confirms, another reminds, and another helps after a missed visit. Example: If Sam books, the booking reminder stops. If Sam misses, recovery begins. Ask: Which rule protects the customer experience most? Technical backup: Consent-gated email and SMS actions use branches, waits, and exits.", transition: "Now show how attendance becomes a checkable outcome." },
    { id: "presentation-slide-15", topic: "3 / HOW WE CHECK", title: "Compare attended visits with appointments that were ready to happen.", body: "We do not count future, cancelled, or rescheduled appointments as no-shows. The same rule keeps the measure honest.", minutes: 2, note: "Main idea: Use the right group before calculating a rate. Explain: An appointment must reach its date before we know if it was attended. Example: Tomorrow’s appointment cannot be called a success or failure today. Ask: Which appointments should be left out? Technical backup: Show rate and no-show rate use mature bookings and appointment-status evidence.", transition: "After the visit, the clinic needs to know what should happen next." },
    { id: "presentation-slide-5", topic: "4 / TAKE THE NEXT STEP", title: "After the visit, the next step must be clear.", body: "Sam may need whitening information, payment follow-up, future care, or no message yet. Follow-up should match the conversation.", minutes: 1, note: "Main idea: A completed visit is not the end of the relationship. Explain: The next message should match what happened. Example: Sam should not receive a whitening message if the conversation did not lead there. Ask: What should the clinic remember after a visit? Technical backup: GHL records, stages, fields, tags, and workflows preserve customer state.", transition: "To solve this, separate what the record knows from what the system does.", problem: "continuity" },
    { id: "presentation-slide-analyst-lens", topic: "4 / WHY IT HAPPENS", title: "The clinic needs one shared place to remember the story.", body: "Without shared information, different people may make different guesses about what happens next. A shared record makes the next step easier to see.", minutes: 2, note: "Main idea: Good follow-up starts with a clear record. Explain: The team needs to know who Sam is, what happened, and who owns the next action. Example: One person sees ‘interested’ while another sees ‘already booked.’ Ask: Which fact would you save first? Technical backup: Contacts store context, pipeline stages show progress, and events prove change.", transition: "The fix is a small shared record connected to clear actions." },
    { id: "presentation-slide-11", topic: "4 / THE FIX", title: "Give every outcome a record and a next action.", body: "The system remembers the person, the appointment result, the current step, and the rule that should run next.", minutes: 2, note: "Main idea: The right next action comes from the latest known outcome. Explain: The clinic can see whether Sam is new, booked, complete, interested, paid, or due for future care. Example: A completed consultation can start a relevant follow-up, while an opt-out stops a message. Ask: What should the system never guess? Technical backup: Contact fields, tags, opportunities, pipeline stages, and six workflows form the operating model.", transition: "Now connect the model to the outcomes we would check." },
    { id: "presentation-slide-9", topic: "4 / HOW WE CHECK", title: "Check whether one outcome leads to the right next step.", body: "Whitening and six-month recall are future paths, not proof that a sale happened. The answer depends on the outcome we are measuring.", minutes: 2, note: "Main idea: Downstream numbers need eligibility rules. Explain: We only count whitening after a completed consultation, and recall after the six-month date is due. Example: Sam cannot belong to the recall group on the day of the first ad. Ask: Who is allowed into each group? Technical backup: Attach rate uses completed consultations; recall rate uses contacts due.", transition: "The final problem is learning from the whole path." },
    { id: "presentation-slide-16", topic: "5 / LEARN WHAT WORKED", title: "The team needs more than activity counts.", body: "It needs to know where people stopped and what to try next. The next test should follow the first weak step.", minutes: 1, note: "Main idea: A dashboard should help someone make a decision. Explain: ‘We had clicks’ does not tell us why bookings were low. Example: The page may load well, but the form may be confusing. Ask: What is the first weak step you would inspect? Technical backup: A measurement model needs events, sources, timing rules, and ownership.", transition: "The cause is mixing different events and time windows.", problem: "learning" },
    { id: "presentation-slide-10", topic: "5 / WHY IT HAPPENS", title: "Different steps need different questions and different clocks.", body: "A page view, a form answer, a booking, and a six-month recall are not the same event.", minutes: 2, note: "Main idea: Do not place every number in one bucket. Explain: We measure the launch path over 60 days, appointment outcomes after their dates pass, and recall much later. Example: A future recall appointment cannot explain this week’s ad. Ask: Which time window belongs to this question? Technical backup: Separate acquisition, appointment maturity, and retention cohorts.", transition: "The fix is a simple event path with a question at every step." },
    { id: "presentation-slide-8", topic: "5 / THE FIX", title: "Count each step, then choose one next test.", body: "The plan connects page views, forms, bookings, visits, follow-up, and future care. That turns a report into a decision.", minutes: 2, note: "Main idea: Measurement should lead to action. Explain: The team finds the first meaningful drop, checks the related evidence, and changes one thing. Example: If form completion is weak, test the page promise before changing the ads. Ask: What single test would you run first? Technical backup: Events, formulas, UTM values, dashboard widgets, and review cadence make the learning loop usable.", transition: "Before live traffic, the model must be checked from end to end." },
    { id: "presentation-slide-17", topic: "READY FOR A REAL TEST", title: "The practice build is complete. A real launch still has gates.", body: "The system is documented and ready for the next checks, but it has no live results yet.", minutes: 2, note: "Main idea: Complete design is not the same as live performance. Explain: The workshop build can be reviewed, but sender setup, compliance, tracking, traffic, and real data are still needed. Example: 10/10 means the simulation path is complete. Ask: Which launch gate would you check first? Technical backup: QA covers routes, branches, consent, stages, formulas, stop conditions, and mobile behavior.", transition: "Close by returning to Sam and the work I contributed." },
    { id: "presentation-slide-18", topic: "CLOSE / WHAT I CONTRIBUTED", title: "I turned five customer problems into one clear system.", body: "I connected the message, page, form, calendar, follow-up, records, and measurement plan. I would launch with a small test and learn from it.", minutes: 3, note: "Main idea: My contribution was the reasoning chain, not just a set of screens. Explain: I translated the situation into a customer path, built the GHL logic, wrote the communication layer, defined what to count, and documented QA. Example: Sam can now be followed from first interest to the next responsible action. Ask: Which part would you like to inspect? Technical backup: The portfolio contains the strategy, funnel, copy, messages, workflows, analytics plan, and implementation checklist. Transition: The first live experiment should find the earliest meaningful drop after the page loads.", transition: "Invite questions about the decisions, evidence, tradeoffs, or first live experiment." }
  ];

  const documentTitles = {
    "strategy-doc": "Marketing Strategy",
    "campaign-doc": "Integrated Campaign Plan",
    "funnel-doc": "Funnel Map + GHL Blueprint",
    "copy-doc": "Landing Page Copy Deck",
    "messages-doc": "Email + SMS Sequence",
    "workflow-doc": "GHL Workflow Specification",
    "kpi-doc": "Analytics + KPI Plan",
    "checklist-doc": "Implementation Checklist"
  };

  const beginnerDocumentCopy = {
    "strategy-doc": { label: "Campaign reasoning", question: "What problem should the campaign solve?", why: "The team needs a clear reason for the offer before building pages or messages.", learn: "How the audience, offer, concerns, and projected goals shaped the build.", journey: "Before Sam sees the offer" },
    "campaign-doc": { label: "Promotion plan", question: "How will people first hear about Bloom Dental?", why: "The same helpful promise should appear in the promotion and on the page.", learn: "How the audience, channel, message, and first action fit together.", journey: "Sam sees the offer" },
    "funnel-doc": { label: "Customer path", question: "What should happen from the first click to follow-up?", why: "A drawn path makes missing steps visible before anything is built.", learn: "How the page, questions, calendar, progress record, and helpers connect.", journey: "Sam moves through the full path" },
    "copy-doc": { label: "Page wording", question: "What should Sam read before asking for help?", why: "Clear words lower worry and make the next action easier to understand.", learn: "How the page, form, FAQs, and calls to action guide the first step.", journey: "Sam understands the offer and asks for help" },
    "messages-doc": { label: "Follow-up messages", question: "What should Sam receive after each important moment?", why: "Useful messages help people remember, prepare, rebook, or continue.", learn: "How timing, permission, tone, and stop rules shape the messages.", journey: "Sam gets reminders and follow-up" },
    "workflow-doc": { label: "Automatic rules", question: "Which repeat tasks should happen without manual chasing?", why: "Writing each rule down makes the system easier to build and check.", learn: "How the six helpers notice events, wait, branch, act, and stop.", journey: "Sam is reminded and followed up" },
    "kpi-doc": { label: "Numbers to check", question: "How will the team know where people stop?", why: "A number is useful only when it answers a clear question.", learn: "How events, formulas, time windows, and tests turn activity into learning.", journey: "The team learns what worked" },
    "checklist-doc": { label: "Build checklist", question: "What must be built and tested before launch?", why: "A checklist turns the plan into a repeatable review.", learn: "How to check the records, page, calendar, messages, helpers, and measurement plan.", journey: "The whole Sam journey" }
  };

  function prepareDocuments() {
    document.querySelectorAll(".native-deliverable").forEach((panel) => {
      if (panel.dataset.beginnerReady === "true") return;
      const documentId = panel.id.replace(/^docs-panel-/, "");
      const copy = beginnerDocumentCopy[documentId];
      const layout = panel.querySelector(".document-layout");
      const aside = layout?.querySelector(":scope > aside");
      const content = layout?.querySelector(":scope > .document-content");
      if (!copy || !layout || !aside || !content) return;
      panel.dataset.beginnerReady = "true";

      const officialTitle = documentTitles[documentId] || aside.querySelector("h3")?.textContent?.trim() || "Workshop document";
      const title = aside.querySelector("h3");
      const description = aside.querySelector("p:last-child");
      if (title) title.textContent = copy.label;
      if (description) description.textContent = copy.question;
      const originalContent = Array.from(content.children);
      content.textContent = "";
      const beginner = document.createElement("div");
      beginner.className = "document-beginner-intro";
      beginner.innerHTML = `<span class="section-label">START HERE</span><h3>${copy.label}</h3><p class="document-official-title">Official workshop document: ${officialTitle}</p><div class="document-learning-grid"><div><span>QUESTION THIS ANSWERS</span><p>${copy.question}</p></div><div><span>WHY IT WAS NEEDED</span><p>${copy.why}</p></div><div><span>WHAT YOU CAN LEARN HERE</span><p>${copy.learn}</p></div><div><span>PART OF SAM’S JOURNEY</span><p>${copy.journey}</p></div></div>`;

      const complete = document.createElement("details");
      complete.className = "full-document";
      const summary = document.createElement("summary");
      summary.textContent = "Read the complete workshop document";
      const completeBody = document.createElement("div");
      completeBody.className = "full-document-body";
      originalContent.forEach((child) => completeBody.appendChild(child));
      complete.append(summary, completeBody);
      content.append(beginner, complete);
    });
  }

  function prepareMeasurementView() {
    const view = document.getElementById("view-measurement");
    if (!view || view.dataset.beginnerReady === "true") return;
    view.dataset.beginnerReady = "true";

    const heading = view.querySelector(".view-heading");
    const headingLabel = heading?.querySelector(".section-label");
    const headingTitle = heading?.querySelector("h2");
    const headingCopy = heading?.querySelector(":scope > p");
    if (headingLabel) headingLabel.textContent = "HOW WE’D KNOW";
    if (headingTitle) headingTitle.textContent = "We count each step so the team knows where to help.";
    if (headingCopy) headingCopy.textContent = "Because this is a simulation, there are no campaign results. This section explains what the team would count after launch.";

    const bridgeTitle = view.querySelector("#measurement-problem-title");
    const bridgeCopy = bridgeTitle?.parentElement?.querySelector("p");
    if (bridgeTitle) bridgeTitle.textContent = "Choose the question before looking at the number.";
    if (bridgeCopy) bridgeCopy.textContent = "Each step in Sam’s journey has one simple question and one next check.";
    view.querySelectorAll(".measurement-problem-panel [data-problem-field]").forEach((field) => {
      if (field.textContent.trim() === "DECISION QUESTION") field.textContent = "QUESTION";
      if (field.textContent.trim() === "EVIDENCE") field.textContent = "WHY IT HELPS";
    });

    const path = document.createElement("section");
    path.className = "measurement-path";
    path.setAttribute("aria-labelledby", "measurement-path-title");
    path.dataset.reveal = "";
    path.innerHTML = `<div class="section-intro"><span class="section-label">THE SIX THINGS WE COUNT</span><h2 id="measurement-path-title">Follow people, not just numbers.</h2><p>We count people as they move through the journey. Each count tells the team what to check next.</p></div><div class="measurement-path-grid"><article><span>01 / OPENED</span><h3>People who opened the page</h3><p><strong>Question:</strong> Did people reach the page after the ad?</p><p><strong>If low:</strong> The link or page may not be reaching people.</p><p><strong>Check next:</strong> The ad link, page load, and phone experience.</p></article><article><span>02 / ASKED</span><h3>People who completed the form</h3><p><strong>Question:</strong> Did the page make Sam comfortable asking for help?</p><p><strong>If low:</strong> The words or questions may feel unclear.</p><p><strong>Check next:</strong> The promise, page order, and form length.</p></article><article><span>03 / CHOSE</span><h3>People who chose a time</h3><p><strong>Question:</strong> Did people book after answering the questions?</p><p><strong>If low:</strong> The calendar step may be easy to miss.</p><p><strong>Check next:</strong> The confirmation page, booking link, and available times.</p></article><article><span>04 / ATTENDED</span><h3>People who attended</h3><p><strong>Question:</strong> Did booked visits happen after their dates passed?</p><p><strong>If low:</strong> People may forget, need a new time, or miss a reminder.</p><p><strong>Check next:</strong> Message timing, permission, and rebooking.</p></article><article><span>05 / CONTINUED</span><h3>People who booked whitening</h3><p><strong>Question:</strong> Did completed visits lead to a suitable next step?</p><p><strong>If low:</strong> The offer or follow-up may not match the conversation.</p><p><strong>Check next:</strong> The recorded outcome, fit, price clarity, and message.</p></article><article><span>06 / RETURNED</span><h3>People who returned for future care</h3><p><strong>Question:</strong> Did people due for care choose another visit?</p><p><strong>If low:</strong> The reminder may arrive late or make booking hard.</p><p><strong>Check next:</strong> The six-month timing, message, and booking path.</p></article></div>`;
    const targetGrid = view.querySelector(".target-grid");
    targetGrid?.before(path);

    const horizonCopy = [
      ["FIRST 60 DAYS", "The launch path", "Count page visits, questions, and bookings."],
      ["AFTER THE VISIT DATE", "The appointment outcome", "Count attendance only after the scheduled date passes."],
      ["SIX MONTHS LATER", "Future care", "Keep future-care reminders separate from the first launch." ]
    ];
    view.querySelectorAll(".measurement-horizons > div").forEach((item, index) => {
      const copy = horizonCopy[index];
      if (!copy) return;
      const label = item.querySelector("span");
      const title = item.querySelector("strong");
      const paragraph = item.querySelector("p");
      if (label) label.textContent = copy[0];
      if (title) title.textContent = copy[1];
      if (paragraph) paragraph.textContent = copy[2];
    });

    const technicalSections = [".measurement-grid", ".dashboard-plan", ".kpi-diagnostic", ".review-plan"]
      .map((selector) => view.querySelector(selector))
      .filter(Boolean);
    const boundary = view.querySelector(".measurement-boundary");
    if (technicalSections.length && boundary) {
      const details = document.createElement("details");
      details.className = "analyst-details";
      const summary = document.createElement("summary");
      summary.textContent = "Analyst details";
      const body = document.createElement("div");
      body.className = "analyst-details-body";
      details.append(summary, body);
      boundary.before(details);
      technicalSections.forEach((section) => body.appendChild(section));
    }

    const boundaryLabel = view.querySelector(".measurement-boundary .section-label");
    const boundaryTitle = view.querySelector(".measurement-boundary h2");
    const boundaryCopy = view.querySelector(".measurement-boundary p");
    if (boundaryLabel) boundaryLabel.textContent = "ONE IMPORTANT NOTE";
    if (boundaryTitle) boundaryTitle.textContent = "The goals become real numbers only after launch.";
    if (boundaryCopy) boundaryCopy.textContent = "The campaign was not launched. The three figures above are projected goals, not results.";
  }

  const phaseAnnotations = [
    { name: "Understand the situation", summary: "Find out where people could get lost.", problems: ["conversion"], solution: "Make the first request feel clear and safe.", needed: "Understand Bloom Dental, its people, its offer, and the current journey.", decided: "Focus on a free smile consultation for busy BGC and Makati professionals.", made: "A clear problem statement, audience notes, offer guardrails, and first questions.", journey: "Before Sam sees the offer", source: "Discovery transcript and workshop brief" },
    { name: "Choose the campaign direction", summary: "Choose one message and one audience.", problems: ["conversion"], solution: "Keep the same helpful promise from the ad to the page.", needed: "Turn the situation into a message that feels useful and calm.", decided: "Lead with help and options before asking Sam to choose treatment.", made: "The campaign brief, channel plan, message direction, and projected goals.", journey: "Sam sees the offer", source: "GHL Setup Guide 01 and campaign planning documents" },
    { name: "Draw the customer path", summary: "Draw the full path before building it.", problems: ["booking"], solution: "Join the questions and the time choice into one path.", needed: "See every step between an ad, a question, a time, and follow-up.", decided: "Ask questions first, then show the calendar immediately.", made: "The customer path and the system map for every handoff.", journey: "Sam moves from the page to the calendar", source: "Funnel Map and GHL Automation Blueprint" },
    { name: "Write what people will see", summary: "Write clear words for every moment.", problems: ["conversion"], solution: "Use simple words that answer Sam’s first questions.", needed: "Give Sam enough context to feel ready for the first conversation.", decided: "Explain what the visit is, what it is not, and what happens next.", made: "Page wording, form prompts, FAQs, email messages, and SMS messages.", journey: "Sam understands, asks, and receives help", source: "Landing Page Copy Deck and Email + SMS Sequence" },
    { name: "Decide what GHL must remember", summary: "Choose the few details the team needs.", problems: ["continuity"], solution: "Give the team one shared record of what Sam needs.", needed: "Make sure the system can remember the person, permission, need, and progress.", decided: "Use a small shared record instead of collecting everything.", made: "The record fields, labels, progress steps, and naming rules.", journey: "The team sees where Sam is", source: "CRM Configuration guide" },
    { name: "Build the inquiry form", summary: "Build the first useful question set.", problems: ["booking"], solution: "Ask only for details that help the visit or the next message.", needed: "Collect Sam’s goal, contact details, source, and message permission.", decided: "Ask only questions that help the consultation or follow-up.", made: "A working inquiry form connected to the next step.", journey: "Sam asks for help", source: "CRM Configuration and Landing Page Build guides" },
    { name: "Build the booking calendar", summary: "Make choosing a time simple.", problems: ["booking"], solution: "Make the next available time easy to find and choose.", needed: "Offer a clear 30-minute consultation with realistic availability.", decided: "Use buffers, notice, and a direct next step after the form.", made: "A testable calendar, booking copy, and confirmation path.", journey: "Sam chooses a time", source: "Calendar for Booking guide" },
    { name: "Build the automatic follow-up", summary: "Make repeat messages happen at the right time.", problems: ["attendance", "continuity"], solution: "Send the right message at the right moment, then stop when the path changes.", needed: "Protect the appointment and guide the next step without manual chasing.", decided: "Use six small helpers with clear starts, checks, waits, and stops.", made: "Confirmation, reminder, missed-visit, follow-up, payment, and recall rules.", journey: "Sam gets reminders and follow-up", source: "Email, SMS, and Workflow Builder guides" },
    { name: "Decide what to measure", summary: "Choose the numbers that answer real questions.", problems: ["learning"], solution: "Give every step one simple question and one number to check.", needed: "Know where people move forward and where they stop.", decided: "Count each step separately and review the first meaningful drop.", made: "The event list, formulas, dashboard plan, review rhythm, and next-test rules.", journey: "The team learns what worked", source: "Analytics Dashboard guide and KPI Plan" },
    { name: "Test the complete journey", summary: "Walk through the whole practice build.", problems: ["attendance", "learning"], solution: "Walk through the happy path and the paths where Sam needs help.", needed: "Check the normal path and the moments where Sam needs another option.", decided: "Call the simulation complete only after routes, rules, consent, and mobile behavior are checked.", made: "The QA checklist, documented test paths, and launch dependency list.", journey: "The whole Sam journey", source: "Implementation Checklist and all seven setup guides" }
  ];

  const kpiDiagnostics = {
    arrival: {
      label: "ARRIVAL RATE",
      name: "Are ad clicks becoming page views?",
      formula: "landing_page_view / ad_click",
      signal: "Clicks are recorded, but fewer sessions reach a usable landing page.",
      evidence: "Compare Meta clicks with funnel page views by UTM campaign and device.",
      test: "Validate link routing and mobile load behavior before changing the offer."
    },
    capture: {
      label: "LANDING CONVERSION",
      name: "Are page views becoming identifiable leads?",
      formula: "form_submit / landing_page_view",
      signal: "Visitors reach the page but do not complete the inquiry form.",
      evidence: "Inspect funnel views, form submissions, field completion, and mobile abandonment.",
      test: "Clarify the consultation promise or remove one nonessential form field."
    },
    booking: {
      label: "LEAD-TO-BOOKING RATE",
      name: "Are submitted inquiries choosing a time?",
      formula: "booking_created / form_submit",
      signal: "The form succeeds, but the calendar handoff loses momentum.",
      evidence: "Compare form contacts with appointments and New Lead opportunities after 24 hours.",
      test: "Test a clearer confirmation step and booking invitation before changing acquisition."
    },
    attendance: {
      label: "NO-SHOW RATE",
      name: "Are mature bookings becoming completed consultations?",
      formula: "no_show / mature_booking",
      signal: "Scheduled appointments reach their date but are marked no-show.",
      evidence: "Review appointment outcomes, reminder delivery, consent, timing, and reschedule use.",
      test: "Change one reminder timing or clarity variable for the next mature appointment cohort."
    },
    value: {
      label: "WHITENING ATTACH RATE",
      name: "Are completed consultations creating a relevant next step?",
      formula: "whitening_booked / show_completed",
      signal: "Consultations complete, but appropriate whitening interest rarely becomes a booking.",
      evidence: "Inspect completed appointments, whitening-interest values, follow-up delivery, and stage moves.",
      test: "Improve fit and price clarity in the post-consultation handoff without increasing pressure."
    },
    retention: {
      label: "RECALL BOOKING RATE",
      name: "Are eligible six-month contacts scheduling future care?",
      formula: "recall_booked / contact_due",
      signal: "Contacts reach the recall date but do not create a future-care appointment.",
      evidence: "Check recall-due tags, cohort eligibility, message delivery, opt-outs, and appointment creation.",
      test: "Test one recall message or scheduling path within the eligible cohort only."
    }
  };

  const nodeDetails = {
    ad: {
      title: "Sam sees the offer.",
      plain: "Sam sees a clear consultation message designed for busy professionals.",
      detail: "UTM source and campaign values identify where the click came from before the contact record exists.",
      technical: "Source: Meta ad / UTM campaign parameters"
    },
    page: {
      title: "Sam understands the offer.",
      plain: "The page explains what the consultation is, who it is for, and what happens next.",
      detail: "A GHL funnel step holds the hero, benefit block, FAQ, booking handoff, and footer CTA.",
      technical: "Sites > Funnels > Bloom Dental - Free Consultation"
    },
    form: {
      title: "Sam asks for help.",
      plain: "Sam shares what needs help and gives the team enough context to respond well.",
      detail: "Form submission maps contact fields, preferred date, referral source, whitening interest, and SMS consent.",
      technical: "Sites > Forms > Bloom Dental Smile Consultation"
    },
    calendar: {
      title: "Sam chooses a time.",
      plain: "After the questions, Sam chooses a 30-minute consultation slot that fits the day.",
      detail: "The Simple Calendar uses Asia/Manila time, buffers, notice, availability, and a booking confirmation trigger.",
      technical: "Calendars > Bloom Dental - Free Consultation"
    },
    pipeline: {
      title: "The clinic records what happened.",
      plain: "The team saves whether Sam is new, booked, finished, interested in whitening, paid, or done.",
      detail: "An opportunity is created in the Free Consultation Funnel with a consistent name, source, value, and stage.",
      technical: "Opportunities > Free Consultation Funnel"
    },
    reminders: {
      title: "Sam gets reminders.",
      plain: "The system confirms the appointment and sends respectful reminders with permission.",
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
      title: "The team learns what worked.",
      plain: "The team reviews where people move forward or drop, then chooses one improvement to test next.",
      detail: "Opportunity stages, appointments, delivery stats, UTMs, and downstream events populate the measurement plan.",
      technical: "Reporting > Dashboard widgets / KPI event model"
    }
  };

  const presentationNotes = [
    {
      title: "Set the contract for the presentation",
      paragraphs: [
        "I begin by setting a clear contract with the audience. Bloom Dental Studio is a fictional workshop scenario, and this is a completed simulation rather than a live client performance report. The purpose of the case study is to show the quality of the reasoning, the completeness of the operating model, and the way I would prepare a campaign for controlled launch.",
        "The project starts with a business problem and follows it all the way through customer experience, GoHighLevel configuration, automation, measurement, and quality assurance. That end-to-end chain is the main portfolio evidence. The interface you are seeing is also part of the work: it translates a technical build into something a hiring manager, analyst, or non-marketing reviewer can understand without needing access to the original GHL account."
      ],
      bullets: [
        "Ten phases describe how the system was made from discovery through simulation QA.",
        "Six reconstructed workflows expose the automation logic one node at a time.",
        "Eight complete deliverables preserve the actual workshop content inside the website.",
        "Every numeric campaign target remains labeled as projected until real traffic exists."
      ],
      transition: "With that boundary established, the next slide explains the business value of the system in one view."
    },
    {
      title: "Explain the project as an operating model",
      paragraphs: [
        "The executive summary is simple: interest is valuable only when the handoffs after the click are dependable. A person may like an ad but still be uncertain about treatment, pricing, or what happens during a consultation. If the page, form, calendar, and follow-up are disconnected, that uncertainty becomes invisible drop-off.",
        "I treated the project as one operating model instead of separate marketing assets. The front end explains the offer and captures useful context. The middle creates a contact, appointment, and opportunity stage. The back end sends the appropriate message, stops when the person acts, and records enough evidence to diagnose the funnel later. Measurement is therefore designed into the journey rather than added after launch."
      ],
      bullets: [
        "The business problem is lost movement between interest and booked care.",
        "The system response is a connected form, calendar, pipeline, and workflow model.",
        "The analytics response is an event trail that reveals the first meaningful drop.",
        "The operating principle is one customer state, one responsible next action, and one observable signal."
      ],
      transition: "To understand why those choices matter, I will go back to the discovery information that shaped the brief."
    },
    {
      title: "Turn discovery inputs into a precise problem",
      paragraphs: [
        "The workshop discovery transcript described a BGC dental studio serving busy professionals who care about appearance but do not want a high-pressure treatment conversation. The training baseline suggested around twenty leads per month, only thirty percent reaching a consultation booking, and a thirty-five percent no-show pattern. Those figures are scenario inputs, not verified clinic performance.",
        "Instead of immediately building pages or workflows, I translated the conversation into a bottleneck: the clinic needed a clearer and more reliable handoff from initial interest to a completed consultation. This matters because an automation can efficiently repeat the wrong process. Discovery decides which behavior is worth automating and which information the team needs at each step."
      ],
      bullets: [
        "Audience: time-poor BGC and Makati professionals seeking clarity before treatment.",
        "Friction: uncertainty, disconnected booking, inconsistent follow-up, and missed appointments.",
        "Opportunity: use the consultation to create trust before discussing whitening or veneers.",
        "Guardrail: never describe fictional baseline or target figures as achieved results."
      ],
      transition: "Once the bottleneck was specific, the next decision was the offer and message that could lower that friction."
    },
    {
      title: "Show why the consultation is the correct front-end offer",
      paragraphs: [
        "The campaign does not lead cold traffic with a whitening sale. It leads with a free thirty-minute smile consultation because the audience first needs help understanding options, suitability, timing, and likely next steps. This offer reduces the perceived commitment while still creating a meaningful action for the clinic.",
        "The message architecture stays consistent from ad to page to form to calendar. It says who the consultation is for, what the patient can discuss, and what the appointment does not require. The wording avoids invented testimonials, guaranteed outcomes, and aggressive urgency. That consistency is conversion design: each handoff confirms the same promise instead of surprising the person with a different request."
      ],
      bullets: [
        "Primary promise: understand your smile options before committing to treatment.",
        "Audience fit: busy professionals who value clarity, convenience, and a calm clinical tone.",
        "Conversion action: submit useful context, then choose a consultation time.",
        "Value path: whitening can be discussed after trust and suitability are established."
      ],
      transition: "Before following the customer path, I will decode the small set of GHL objects that make the journey work."
    },
    {
      title: "Translate GHL into familiar business objects",
      paragraphs: [
        "For someone new to GoHighLevel, the platform can sound more complicated than the business process. I explain it as a shared record plus a set of rules. The contact is the person. The form is what they told us. The calendar is when they can meet. The opportunity is the business path connected to that person, and the pipeline shows where that path currently sits.",
        "Tags and custom fields help the system remember facts such as source, service interest, and SMS permission. Workflows watch for a meaningful event, apply conditions, wait when appropriate, perform an action, and stop when the desired state already exists. That distinction between data and behavior is important: fields describe the contact, while workflows decide what the system should do with that information."
      ],
      bullets: [
        "Contacts prevent the page, calendar, and messages from creating disconnected identities.",
        "Opportunities make commercial movement visible without confusing it with contact activity.",
        "Consent is stored as data and checked again at the point of an SMS action.",
        "Workflow stop conditions prevent reminders from continuing after a booking or opt-out."
      ],
      transition: "With those objects defined, we can follow one prospective patient through the entire system."
    },
    {
      title: "Follow one person instead of memorizing features",
      paragraphs: [
        "The customer journey is the simplest way to understand the project. A person encounters a focused Meta ad and reaches a landing page that explains the consultation. The inquiry form captures their goal, service interest, source, and permission choices. The calendar then turns interest into a scheduled time, while the pipeline gives the team a visible stage to manage.",
        "After booking, reminders support attendance. The consultation becomes the first human value moment, not merely another conversion event. A relevant whitening conversation may follow, and a six-month recall path can support future care. Finally, the KPI review examines where people moved forward or stopped. Each handoff asks what happens next, what the system must remember, and what evidence will prove the event occurred."
      ],
      bullets: [
        "The path contains ten observable moments from ad exposure to KPI review.",
        "Plain English explains the business meaning before the interface names the GHL location.",
        "The form-first decision separates initial interest from an actual calendar commitment.",
        "The recall step belongs to a later retention horizon, not the initial sixty-day campaign window."
      ],
      transition: "The next slide shows how that journey was converted into a buildable funnel blueprint."
    },
    {
      title: "Map every handoff before opening the page builder",
      paragraphs: [
        "The funnel blueprint was created before the landing page and workflows because it forces the important implementation questions into the open. For every step, I identified the customer action, the data captured, the GHL object affected, the message that follows, and the condition that ends or changes the path.",
        "One deliberate departure from the workshop template was the form-first handoff. A direct calendar can be faster, but it gives the team less context and makes form submission impossible to measure separately from booking. In this simulation, the landing page leads to the inquiry form, the form confirmation presents the calendar, and a workflow follows up if a time is not selected. That creates two observable conversion points and a more useful consultation record."
      ],
      bullets: [
        "Entry evidence comes from campaign and UTM values.",
        "Capture evidence comes from the contact and mapped form fields.",
        "Booking evidence comes from the appointment and opportunity stage.",
        "Operational evidence comes from workflow execution, message delivery, and status changes."
      ],
      transition: "The blueprint then became eight concrete deliverables that another builder could inspect and implement."
    },
    {
      title: "Explain what the deliverables prove",
      paragraphs: [
        "The eight deliverables are not decorative attachments. Each one resolves a different implementation question. The marketing strategy explains the problem, audience, offer, positioning, and projected goals. The integrated campaign plan assigns channel roles and required assets. The funnel blueprint describes the system handoffs before configuration begins.",
        "The landing-page copy and email plus SMS sequence define what the prospective patient sees. The workflow specification defines the triggers, conditions, waits, actions, branches, and stop logic. The analytics plan defines events, formulas, dashboard questions, and review cadence. Finally, the implementation checklist turns the design into a repeatable build and QA path. The website preserves their full content so a reviewer can inspect the decisions without downloading Markdown or relying on screenshots."
      ],
      bullets: [
        "Strategy answers why the campaign should exist.",
        "Blueprint and copy answer where the journey goes and what the person experiences.",
        "Workflow specifications answer what the system does after each event.",
        "Analytics and QA answer how readiness and future performance will be evaluated."
      ],
      transition: "Next I will compress the first five implementation phases into the decisions that created the system foundation."
    },
    {
      title: "Walk through phases one to five",
      paragraphs: [
        "Phase one translated discovery into a problem statement, audience, objections, and measurement questions. Phase two chose the consultation offer, campaign message, channel roles, and projected goals. Phase three mapped the customer path and system handoffs before any interface was configured. These phases reduced ambiguity before implementation effort began.",
        "Phase four produced the conversion content: landing-page sections, form prompts, FAQs, confirmation language, email templates, and consent-aware SMS snippets. Phase five defined the data model with a focused pipeline, custom fields, tags, opportunity naming, and source conventions. I kept the model deliberately small because every extra field creates maintenance and reporting cost. By the end of phase five, the team knows what the system must remember and what each later workflow can reliably check."
      ],
      bullets: [
        "Inputs came from the discovery transcript and the first strategy deliverables.",
        "Decisions were recorded before implementation so later changes remain explainable.",
        "Outputs formed a shared vocabulary across copy, GHL configuration, and reporting.",
        "The business purpose was to prevent random automation from replacing clear process design."
      ],
      transition: "The second half of the build converts that foundation into working capture, booking, automation, measurement, and QA."
    },
    {
      title: "Walk through phases six to ten",
      paragraphs: [
        "Phase six built the lead-capture form and mapped only the information that improves the consultation or follow-up decision. Phase seven configured the thirty-minute calendar, availability, buffers, notice, and form-to-booking handoff. Phase eight assembled six modular workflows so each operational behavior could be tested without one enormous automation controlling everything.",
        "Phase nine defined the event model, formulas, source tracking, dashboard widgets, and weekly diagnostic cadence. Phase ten walked the simulation path using test contacts and documented the expected evidence for form submission, booking, consent branches, stage changes, no-show recovery, completed consultation, downstream interest, and workflow exits. Ten out of ten therefore means the workshop build and test logic are documented. It does not mean sender infrastructure, compliance review, paid traffic, or live campaign performance exist."
      ],
      bullets: [
        "Lead capture turns anonymous interest into a usable contact record.",
        "Booking creates a calendar event and visible pipeline movement.",
        "Automation handles repeatable timing while preserving channel consent.",
        "Measurement and QA make the next decision and launch boundary explicit."
      ],
      transition: "The next slide looks more closely at the data model that allows those phases to work together."
    },
    {
      title: "Separate identity, lifecycle, and business state",
      paragraphs: [
        "The data model has three related layers. The contact holds identity and durable facts such as email, phone, source, service interest, and SMS consent. The opportunity represents the consultation value path and moves through New Lead, Booked Consultation, Consultation Complete, Whitening Booked, Whitening Paid, or Lost. The appointment records the selected time and attendance outcome.",
        "Tags are used for reusable lifecycle signals such as new lead, consultation booked, no-show, whitening paid, or recall due. Custom fields hold information that should be reported or checked as a value, while tags indicate a recognizable state or permission. Consistent opportunity names and source values make filters and dashboards less fragile. This structure is intentionally modest: the goal is enough context for automation and analysis without building a CRM that the team cannot maintain."
      ],
      bullets: [
        "Contact answers who the person is and what they have told us.",
        "Appointment answers when the interaction should happen and what its outcome was.",
        "Opportunity answers where the commercial journey currently sits.",
        "Tags and fields give workflows dependable conditions instead of guessing from message activity."
      ],
      transition: "With the model in place, the first operational handoff connects the page, form, calendar, and pipeline."
    },
    {
      title: "Explain the first conversion handoff",
      paragraphs: [
        "The landing page lowers uncertainty before asking for information. It introduces the free consultation, explains the audience fit and benefits, addresses common objections, and uses a clear request action. The form then captures contact details, smile goals, relevant interest, source information, and explicit SMS consent. It does not ask questions that add friction without improving the next conversation.",
        "After submission, the person receives a clear path to the consultation calendar. The calendar uses the correct location time zone, a thirty-minute duration, buffers, booking notice, availability, and confirmation language. Once a time is selected, the opportunity moves to the booked stage and the reminder workflow begins. If the person submits the form but does not book, the first workflow can send a measured invitation and one reminder without creating duplicate opportunities or sending unauthorized SMS."
      ],
      bullets: [
        "Page view, form submission, and booking are treated as three separate events.",
        "The form gives the clinical team context before the appointment begins.",
        "The calendar creates a real commitment and the timing reference for reminders.",
        "The pipeline lets staff see the state without opening every contact activity log."
      ],
      transition: "That handoff starts a set of six automations, each responsible for one clear behavior."
    },
    {
      title: "Introduce the six-workflow architecture",
      paragraphs: [
        "The original journey could have been placed into one very long workflow, but that would make testing, troubleshooting, and ownership harder. I separated the system into six automations with explicit triggers and stop conditions. New Lead to Booking owns the gap between inquiry and calendar. Consultation Booking owns confirmation, reminders, and appointment outcome routing.",
        "No-Show Recovery owns respectful rebooking. Post-Consultation Whitening owns relevant education after an attended consultation. Whitening Payment Update records the verified downstream payment state and hands off to retention. Six-Month Recall owns the later care reminder. Modular design makes execution logs easier to read, limits accidental re-enrollment, and allows one behavior to change without risking the entire customer journey. The interactive Workflow Lab reconstructs every node without pretending to be a screenshot of the GHL interface."
      ],
      bullets: [
        "Each workflow has one primary trigger, responsibility, and stop condition.",
        "Cross-workflow handoffs occur only after an observable state change.",
        "Consent is checked at SMS actions rather than assumed from enrollment.",
        "Appointment and pipeline events stop messages that are no longer relevant."
      ],
      transition: "I will use the new-lead and booking path to show what an individual workflow node contributes."
    },
    {
      title: "Read the automation as a decision tree",
      paragraphs: [
        "A workflow begins with a trigger, but the trigger alone is not the automation. In the New Lead to Booking workflow, form submission adds the lifecycle tag, creates or updates the opportunity, stores useful interest data, and sends the booking invitation. A consent condition determines whether the optional SMS path is allowed. A wait gives the person time to act before the workflow checks booking status again.",
        "In the Consultation Booking workflow, the appointment event confirms the correct calendar, advances the opportunity, and sends confirmation. Time-relative waits place reminders twenty-four hours and two hours before the appointment. After the appointment, an outcome condition routes completed consultations to the whitening follow-up and no-shows to recovery. These checks are important because time alone does not prove state. The workflow must look at the appointment or pipeline evidence before deciding what message or handoff is still appropriate."
      ],
      bullets: [
        "Triggers identify when the workflow becomes relevant.",
        "Conditions protect consent, relevance, and correct routing.",
        "Waits control timing without replacing a later state check.",
        "Actions update records or communicate, while stop logic prevents duplicate outreach."
      ],
      transition: "The automation only works operationally when ownership, exceptions, and manual updates are also clear."
    },
    {
      title: "Connect automation to human operations",
      paragraphs: [
        "Automation does not remove the need for human ownership. Staff still need to update appointment outcomes, confirm payment events, respond to replies, and correct records when reality differs from the expected path. The system should reduce repeated administration while making exceptions more visible, not hide the customer behind a workflow.",
        "The decision log captures several operating choices. The form comes before the calendar to preserve context. Testimonials were excluded because the scenario has no legitimate patient proof. SMS is gated by explicit consent and should follow approved hours and provider requirements. Free GHL-hosted URLs are acceptable for simulation, while a production sender domain and compliance review remain launch dependencies. Manual payment or stage updates are used only where a verified business event must enter the system."
      ],
      bullets: [
        "Clinic staff own appointment outcomes and conversations that need judgment.",
        "Marketing operations owns workflow health, templates, source values, and exceptions.",
        "Analytics owns metric definitions, data checks, and the weekly diagnostic question.",
        "A production owner must approve sender, advertising, healthcare, and SMS compliance before launch."
      ],
      transition: "Once the operating responsibilities are clear, the event model can connect activity to business questions."
    },
    {
      title: "Define metrics that lead to an action",
      paragraphs: [
        "The measurement plan separates acquisition, on-page capture, booking, attendance, downstream value, and retention. Impressions and ad clicks describe acquisition. Landing-page views create the denominator for on-page conversion. Form submissions identify leads, bookings represent scheduled consultations, and completed appointments show delivered consultation value. Whitening bookings and later recall bookings belong to downstream and retention horizons.",
        "The projected goals are sixty bookings in sixty days, a no-show rate below fifteen percent, and a forty-percent whitening attach rate. They are planning goals from the workshop brief, not observations. The dashboard should therefore emphasize definitions and diagnostic relationships rather than celebratory charts. Each weekly review checks volume and delivery health, locates the first meaningful drop, forms a cause hypothesis, changes one variable, and records the expected evidence for the next review."
      ],
      bullets: [
        "CTR equals ad clicks divided by impressions.",
        "Landing conversion equals form submissions divided by landing-page views.",
        "Lead-to-booking equals consultation bookings divided by form submissions.",
        "Attach rate equals whitening bookings divided by completed consultations."
      ],
      transition: "The final readiness step is to distinguish what the simulation proves from what only a live pilot can prove."
    },
    {
      title: "Close the build honestly",
      paragraphs: [
        "Simulation QA checks that the intended objects, branches, messages, and evidence are documented and testable. A test contact should submit the form, create or update the correct opportunity, receive only permitted messages, book the correct calendar, move through the expected stages, and stop workflows after a relevant outcome. No-show and completed-appointment paths need separate tests because they create different downstream behavior.",
        "Ten out of ten means all ten workshop phases are represented and the full journey has a defined QA path. Four production gates remain: a verified sender domain and delivery configuration, live advertising and UTM validation, local and provider compliance review, and a real-data pilot with mature appointment outcomes. Only after those gates can the projected goals be compared with observed performance or the portfolio include real results."
      ],
      bullets: [
        "Check positive paths, no-show recovery, opt-out handling, duplicate prevention, and workflow exits.",
        "Check responsive landing-page behavior and the complete form-to-calendar handoff.",
        "Check event definitions before relying on dashboard widgets.",
        "Replace targets with actuals only when the source, denominator, and observation window are trustworthy."
      ],
      transition: "I will end by summarizing what this project demonstrates about my approach and the next live test I would run."
    },
    {
      title: "End on contribution, judgment, and next action",
      paragraphs: [
        "My contribution spans the full reasoning chain: I synthesized the discovery information, chose the offer and audience position, mapped the funnel, wrote the conversion and lifecycle content, configured the GHL data model, assembled the workflow logic, defined the measurement framework, and documented simulation QA. The value is not familiarity with one interface. It is the ability to connect customer experience, operational behavior, and analytical evidence.",
        "The strongest design decision was capturing useful context before asking for a booking. The most important unresolved risk is production delivery and compliance, because a correct workflow cannot create value if messages do not reach eligible contacts. My first live analysis would compare landing-page views, form submissions, bookings, and mature appointment outcomes to find the earliest material drop. I would change one variable at that point, document the hypothesis, and review the same event sequence again."
      ],
      bullets: [
        "Strategy establishes why the system should exist.",
        "Implementation makes the customer and staff journey repeatable.",
        "Analytics makes friction visible and gives the next test a denominator.",
        "Truthful boundaries make the portfolio evidence more credible, not less ambitious."
      ],
      transition: "The presentation is complete. The System, Build, Deliverables, and Measurement views remain available as supporting evidence for questions."
    }
  ];

  const presentationPrompts = [
    "Pause on the simulation label and ask the audience to judge the system design, not invented outcomes.",
    "Point to the connected handoffs and emphasize that measurement was designed with the operating journey.",
    "Distinguish scenario inputs from verified performance before explaining how the bottleneck was selected.",
    "Ask which feels easier to accept from cold traffic: treatment now, or clarity before deciding.",
    "Use one audience member as the example contact and translate each GHL object around that person.",
    "Trace the journey left to right and name the evidence created at every meaningful handoff.",
    "Compare direct-to-calendar and form-first paths, then explain why this simulation chose richer context.",
    "Invite the audience to treat each deliverable as an answer to one implementation question.",
    "Slow down through the first five phases and show how each decision reduces later rework.",
    "Clarify that completion means documented build and QA coverage, not production launch or performance.",
    "Give one example of a fact stored on the contact versus a stage stored on the opportunity.",
    "Describe the difference between submitting interest and committing to a time on the calendar.",
    "Ask which workflow should own a reminder, then use ownership to explain the modular structure.",
    "Choose one branch and narrate trigger, condition, wait, action, evidence, and stop in order.",
    "Name one exception that needs human judgment so automation is never presented as unattended care.",
    "Read each denominator aloud and explain how a wrong denominator would lead to a wrong test.",
    "Pause on the four launch gates and reinforce that they protect credibility as well as operations.",
    "Close by connecting strategy, systems thinking, and analytics to the kind of role being discussed."
  ];

  const teachingPresentationNotes = {
    "presentation-slide-b2b-bridge": {
      title: "Connect familiar analytical work to a new customer motion",
      paragraphs: [
        "Begin with reassurance: the analytical discipline does not disappear when moving from B2B into direct-to-consumer marketing. We still define a business outcome, identify stages, observe events, compare cohorts, and ask what changed. What changes is the unit of analysis and the speed of the journey. B2B work often follows an account, buying committee, sales opportunity, and a cycle measured in weeks or months. DTC work usually follows an individual through behavioral signals that can occur within one session or a few days.",
        "That faster rhythm creates both opportunity and risk. The team receives more signals sooner, but those signals can be mistaken for value if the funnel is poorly defined. A click is not a lead, a lead is not a booking, and a booking is not an attended consultation. The martech system must preserve those distinctions so analysts can see where movement actually occurred. This presentation uses the Bloom Dental simulation to make that translation concrete.",
        "A useful mental model is to compare the B2B sales process with a DTC service journey. An account stage and a pipeline opportunity still describe state; the difference is that the customer may create the next state themselves by submitting a form or selecting a calendar time. That means the interface, the CRM record, and the event taxonomy must agree. When they do, analysts can segment the journey, identify leakage, and recommend an experiment without treating every platform interaction as an outcome."
      ],
      bullets: [
        "B2B buying units are often accounts; DTC buying units are usually people or households.",
        "B2B conversion states may be MQL, meeting, and opportunity; DTC states may be form, booking, show, and purchase.",
        "DTC feedback arrives faster, so event definitions and consent checks must be ready before traffic.",
        "The transferable skill is turning business movement into observable states and trustworthy denominators."
      ],
      transition: "Now that the audience can see what transfers, define the three disciplines that operate the customer journey together."
    },
    "presentation-slide-marketing-martech": {
      title: "Separate the responsibilities without separating the experience",
      paragraphs: [
        "Marketing, martech, and analytics are easiest to understand as one loop. Marketing decides which problem matters, who experiences it, what next step is valuable, and where the message should appear. Martech turns those decisions into a working journey: pages, forms, customer records, calendars, messages, rules, and handoffs. Analytics checks whether people moved as expected and identifies the first place where the evidence disagrees with the plan.",
        "A weak implementation often treats these as disconnected deliverables. A campaign is launched, automation is added later, and reporting is asked to reconstruct the journey after the fact. This project follows the opposite sequence. The business question shapes the journey, the journey shapes the data model, and the data model makes the later KPI possible. For analysts, that means measurement is part of system design rather than a dashboard request at the end."
      ],
      bullets: [
        "Marketing asks why this audience should take this action.",
        "Martech asks what the system should remember and do next.",
        "Analytics asks where movement changed and which test would produce useful evidence.",
        "The customer experiences one journey even when different teams own parts of it."
      ],
      transition: "With the three responsibilities clear, reduce marketing strategy to four decisions the whole team can inspect."
    },
    "presentation-slide-four-decisions": {
      title: "Teach the minimum viable marketing strategy",
      paragraphs: [
        "A campaign should not begin with a tool, creative format, or automation. It begins with four connected decisions. The problem defines the friction worth solving. The audience defines who experiences that friction and in what context. The offer defines the useful next step that reduces uncertainty. The channel defines where the team can reach that person with enough context for the offer to make sense.",
        "These decisions behave like upstream dimensions in a data model: changing one alters everything downstream. A different audience changes language and objections. A different offer changes the conversion event. A different channel changes attribution and intent. When campaign performance looks weak, the team should diagnose which assumption is failing instead of changing every asset at once. Bloom Dental will later show how a booking bottleneck becomes a consultation offer, a form-first journey, and specific funnel events."
      ],
      bullets: [
        "Problem: the customer or business friction the campaign is meant to reduce.",
        "Audience: the people, context, and constraints that shape relevance.",
        "Offer: the exchange of value that earns the next meaningful action.",
        "Channel: the environment that delivers the message and creates source evidence."
      ],
      transition: "The next distinction prevents three common terms from collapsing into the same vague diagram."
    },
    "presentation-slide-journey-funnel": {
      title: "Give journey, funnel, and campaign separate jobs",
      paragraphs: [
        "The customer journey is the human story. It includes what the person sees, understands, worries about, submits, books, and experiences. The funnel is the measurement model placed over that journey. It defines which transitions count, which denominator belongs to each rate, and where drop-off can be observed. The campaign is the coordinated work that attempts to create the movement: audience selection, creative, landing experience, follow-up, and measurement.",
        "Keeping the terms separate improves cross-functional conversations. A journey problem may be unclear expectations. A funnel problem may be a large drop between page view and form submission. A campaign problem may be an audience or message mismatch. Those require different responses. Analysts contribute by linking the measured symptom back to the customer moment and the campaign assumption that produced it."
      ],
      bullets: [
        "Journey language is experiential: see, understand, trust, ask, book, attend.",
        "Funnel language is quantitative: entered, converted, dropped, matured, retained.",
        "Campaign language is operational: audience, creative, channel, landing page, follow-up.",
        "One diagram can show all three only when its labels make the layers explicit."
      ],
      transition: "Next, use a small fictional funnel to show how those layers become rates without confusing the denominator."
    },
    "presentation-slide-funnel-math": {
      title: "Calculate the handoffs before interpreting them",
      paragraphs: [
        "This is a fictional teaching dataset, intentionally separate from Bloom Dental. One thousand impressions create fifty clicks, so click-through rate is five percent. Forty of those clicks become usable landing-page views, so arrival rate is eighty percent. Eight visitors submit the form, producing a twenty-percent landing conversion rate. Four leads book, so lead-to-booking is fifty percent. Three mature bookings attend, producing a seventy-five-percent show rate and a twenty-five-percent no-show rate.",
        "The important lesson is not whether any of those rates are good. The lesson is that every rate describes one handoff and points to different evidence. A weak arrival rate suggests routing or load problems. Weak landing conversion suggests offer, copy, or form friction. Weak booking suggests the calendar handoff. Weak attendance suggests confirmation, reminders, or expectation setting. Analysts should locate the first material loss before recommending a test."
      ],
      bullets: [
        "CTR = clicks / impressions = 50 / 1,000 = 5%.",
        "Arrival rate = landing-page views / clicks = 40 / 50 = 80%.",
        "Landing conversion = forms / page views = 8 / 40 = 20%.",
        "Lead-to-booking = bookings / forms = 4 / 8 = 50%; show rate = 3 / 4 = 75%."
      ],
      transition: "Those fast handoffs make DTC measurable, but they also make permission and message relevance operational requirements."
    },
    "presentation-slide-dtc-realities": {
      title: "Frame speed as responsibility, not only opportunity",
      paragraphs: [
        "Direct-to-consumer journeys can move from impression to booking in minutes. That speed allows rapid learning, but it also means a poorly designed system can send the wrong message just as quickly. The contact record must preserve identity and source. The journey must check whether a booking already exists. SMS must depend on explicit consent. Timing must reflect the person’s current state rather than a generic sequence.",
        "Trust matters because the buyer is also the person receiving the experience. In healthcare-adjacent marketing, a conversion goal cannot override clarity, relevance, or appropriate review. Automation should reduce repeated administration and make exceptions visible. It should never create the impression that every response, recommendation, or care decision can be handled unattended."
      ],
      bullets: [
        "Fast signals support weekly learning only when event quality is stable.",
        "Identity resolution prevents one person from becoming disconnected records.",
        "Consent and opt-out state belong inside workflow conditions.",
        "Human ownership remains necessary for judgment, exceptions, and care conversations."
      ],
      transition: "Now translate these responsibilities into the record, state, and event model analysts already know."
    },
    "presentation-slide-analyst-lens": {
      title: "Use an analytical model to decode GHL",
      paragraphs: [
        "GHL becomes easier to reason about when its objects are grouped into records, states, and events. The contact is the durable person record. Fields preserve values such as source, service interest, and consent. The opportunity and appointment expose current business and scheduling state. Events record what changed: a form was submitted, a booking was created, an appointment was completed, or a payment was verified.",
        "This model prevents several reporting mistakes. Message activity should not be used as proof of booking. A pipeline stage should not replace the appointment outcome unless the operating process keeps both synchronized. Attribution needs source values before the anonymous visitor becomes a contact. Metric denominators need observation windows: a future appointment should not be counted as a show or no-show until its scheduled date has passed. GHL configuration is therefore part of data quality."
      ],
      bullets: [
        "Record answers who the person is and what context persists.",
        "State answers where the current journey or appointment sits.",
        "Event answers what changed, when it changed, and what triggered the next rule.",
        "Attribution and maturity windows determine whether later rates are interpretable."
      ],
      transition: "With that model established, the Bloom Dental scenario can be presented as a worked system rather than a collection of platform features."
    }
  };

  const teachingPresentationPrompts = {
    "presentation-slide-b2b-bridge": "Ask the team to name one B2B stage they already analyze, then translate it into a DTC event.",
    "presentation-slide-marketing-martech": "Point to the three responsibilities and emphasize that the customer experiences one connected loop.",
    "presentation-slide-four-decisions": "Use a familiar campaign and ask which of the four decisions would change first if the audience changed.",
    "presentation-slide-journey-funnel": "Read one row across all three layers so the distinction becomes concrete.",
    "presentation-slide-funnel-math": "Click each stage and ask which evidence source and owner would diagnose that handoff.",
    "presentation-slide-dtc-realities": "Pause on consent and relevance before introducing any automation feature.",
    "presentation-slide-analyst-lens": "Ask for one example each of a record, state, and event from the team’s current B2B work."
  };

  const presentationNotesBySlide = Object.fromEntries(
    Array.from({ length: 18 }, (_, index) => [`presentation-slide-${index + 1}`, presentationNotes[index]])
  );
  Object.assign(presentationNotesBySlide, teachingPresentationNotes);

  const presentationPromptsBySlide = Object.fromEntries(
    Array.from({ length: 18 }, (_, index) => [`presentation-slide-${index + 1}`, presentationPrompts[index]])
  );
  Object.assign(presentationPromptsBySlide, teachingPresentationPrompts);

  const teachingFunnelDetails = {
    impressions: ["PEOPLE WHO COULD SEE IT", "1,000 example people could see the message", "The group used for the first comparison"],
    clicks: ["PEOPLE WHO CAME TO THE PAGE", "50 example people clicked from 1,000 views", "50 / 1,000"],
    views: ["PEOPLE WHO OPENED THE PAGE", "40 example people reached a usable page", "40 / 50"],
    forms: ["PEOPLE WHO ASKED FOR HELP", "8 example people completed the questions", "8 / 40"],
    bookings: ["PEOPLE WHO CHOSE A TIME", "4 example people booked from 8 questions", "4 / 8"],
    shows: ["PEOPLE WHO ATTENDED", "3 example people attended from 4 ready appointments", "3 / 4"]
  };

  const presentationWorkflowDetails = {
    trigger: ["WHAT STARTS IT", "Sam sends the questions", "The helper begins after the inquiry form is sent.", "GHL trigger: Form Submitted"],
    record: ["SAVE THE STORY", "Remember what Sam said", "The system saves the answers and gives the team a clear place to follow the person.", "GHL actions: tag and opportunity"],
    invite: ["SEND THE NEXT STEP", "Invite Sam to choose a time", "Email sends the calendar link. A text only sends when Sam gave permission.", "GHL actions: email, consent check, and SMS"],
    wait: ["GIVE IT TIME", "Wait before reminding", "The system gives Sam time to choose a time before checking again.", "GHL wait: 24 hours"],
    condition: ["CHECK THE PATH", "Did Sam choose a time?", "If yes, stop. If no, send one helpful reminder.", "GHL condition: appointment status"]
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

  let activeView = "problem";
  let activeProblem = "conversion";
  let activeDocument = "strategy-doc";
  let explanationMode = "plain";
  let systemTrigger = null;
  let revealObserver = null;
  let activeWorkflow = "new-lead-booking";
  let activeWorkflowNode = 0;
  let presentationIndex = 0;
  let presentationReturnHash = "#problem";
  let presentationPreviousFocus = null;
  let presentationNotesOpen = false;
  let presentationOutlineOpen = false;
  let presentationGlossaryOpen = false;

  const reduceMotion = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function getHashState() {
    const raw = window.location.hash.replace(/^#/, "");
    const parts = raw.split("/");
    if (parts[0] === "present") {
      const requested = Number.parseInt(parts[1] || "1", 10);
      const slideCount = Math.max(1, document.querySelectorAll("[data-presentation-slide]").length);
      const slide = Number.isFinite(requested) ? Math.max(1, Math.min(slideCount, requested)) : 1;
      return { view: "problem", documentId: null, presentation: true, presentationIndex: slide - 1 };
    }
    const view = aliases[parts[0]] || "problem";
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
    document.querySelectorAll("[data-reading-step]").forEach((link) => {
      const selected = link.dataset.readingStep === view;
      link.classList.toggle("is-active", selected);
      if (selected) link.setAttribute("aria-current", "step");
      else link.removeAttribute("aria-current");
    });
    document.querySelectorAll(".primary-tab").forEach((tab) => {
      const selected = tab.dataset.view === view;
      tab.classList.toggle("is-active", selected);
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    const revealActiveTab = () => {
      const selectedTab = document.querySelector(".primary-tab.is-active");
      const primaryNav = selectedTab?.closest(".primary-nav");
      if (!selectedTab || !primaryNav || primaryNav.scrollWidth <= primaryNav.clientWidth) return;
      const tabRect = selectedTab.getBoundingClientRect();
      const navRect = primaryNav.getBoundingClientRect();
      const currentLeft = tabRect.left - navRect.left;
      const edgePadding = 10;
      let targetLeft = primaryNav.scrollLeft;
      if (currentLeft < edgePadding) targetLeft += currentLeft - edgePadding;
      if (currentLeft + tabRect.width > primaryNav.clientWidth - edgePadding) {
        targetLeft += currentLeft + tabRect.width - (primaryNav.clientWidth - edgePadding);
      }
      const maxScroll = primaryNav.scrollWidth - primaryNav.clientWidth;
      primaryNav.scrollTo({ left: Math.min(maxScroll, Math.max(0, targetLeft)), behavior: reduceMotion() ? "auto" : "smooth" });
    };
    revealActiveTab();
    window.requestAnimationFrame(revealActiveTab);
    document.fonts?.ready.then(revealActiveTab);
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
    if (updateUrl) writeHash("evidence", requested, false);
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
    label.textContent = explanationMode === "plain" ? "Simple explanation" : "GHL setup shown";
    if (counter) counter.textContent = `${index.padStart(2, "0")} / ${String(document.querySelectorAll(".journey-node").length).padStart(2, "0")}`;
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
        renderProblemStory(activeProblem, { syncKpi: false });
      });
    });
    renderNode("ad");
  }

  function problemStory(id) {
    return problemStories.find((story) => story.id === id) || problemStories[0];
  }

  function renderProblemStory(id, options = {}) {
    const story = problemStory(id);
    activeProblem = story.id;
    document.body.dataset.problem = story.id;

    document.querySelectorAll("[data-problem-selector] button").forEach((button) => {
      const selected = button.dataset.problemSelect === story.id;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });

    document.querySelectorAll("[data-problem-panel]").forEach((panel) => {
      const explorer = panel.closest("[data-problem-explorer]");
      const scope = explorer?.dataset.problemExplorer || "brief";
      const activeTab = explorer?.querySelector(`[data-problem-select="${story.id}"]`);
      if (activeTab) panel.setAttribute("aria-labelledby", activeTab.id);
      panel.querySelectorAll("[data-problem-field]").forEach((field) => {
        const key = field.dataset.problemField;
        const technical = story.technical;
        const simpleValues = {
          number: `${story.number} / ${story.shortLabel.toUpperCase()}`,
          label: story.shortLabel,
          step: story.customerStep,
          problem: story.simpleProblem,
          cause: story.simpleCause,
          impact: story.customerImpact,
          solution: story.simpleFix,
          system: story.whatSystemDoes,
          measure: story.simpleMeasure,
          example: story.example,
          implementation: story.whatSystemDoes,
          proof: `I made: ${technical.evidence.map((doc) => beginnerDocumentCopy[doc]?.label || documentTitles[doc]).join(", ")}`,
          kpi: story.simpleMeasure,
          phases: `This improves build steps ${technical.phases.join(", ")}`,
          evidence: `Related items: ${technical.evidence.map((doc) => beginnerDocumentCopy[doc]?.label || documentTitles[doc]).join(", ")}`,
          events: technical.events,
          formula: technical.formula,
          location: technical.ghlLocation,
          technicalProblem: technical.problem
        };
        const detailValues = {
          number: `${story.number} / ${story.shortLabel.toUpperCase()}`,
          label: story.shortLabel,
          step: story.customerStep,
          problem: technical.problem,
          cause: technical.problem,
          impact: story.customerImpact,
          solution: story.simpleFix,
          system: technical.implementation,
          measure: technical.formula,
          example: story.example,
          implementation: technical.implementation,
          proof: technical.evidence.map((doc) => documentTitles[doc]).join(", "),
          kpi: technical.formula,
          phases: `Build phases: ${technical.phases.join(", ")}`,
          evidence: `Evidence: ${technical.evidence.map((doc) => documentTitles[doc]).join(", ")}`,
          events: technical.events,
          formula: technical.formula,
          location: technical.ghlLocation,
          technicalProblem: technical.problem
        };
        const values = (scope === "brief" || scope === "measurement") ? simpleValues : (explanationMode === "detail" ? detailValues : simpleValues);
        field.textContent = values[key] || "";
      });
      panel.dataset.activeProblem = story.id;
      panel.classList.remove("is-switching");
      if (!reduceMotion()) window.requestAnimationFrame(() => panel.classList.add("is-switching"));
      window.setTimeout(() => panel.classList.remove("is-switching"), 380);
      if (scope === "measurement" && options.syncKpi !== false) renderKpiDiagnostic(story.technical.diagnosticKey);
    });

    document.querySelectorAll("[data-evidence-problem]").forEach((item) => {
      item.classList.toggle("is-active", item.dataset.evidenceProblem === story.id);
    });
  }

  function buildProblemSelectors() {
    document.querySelectorAll("[data-problem-selector]").forEach((selector, selectorIndex) => {
      const explorer = selector.closest("[data-problem-explorer]");
      const scope = explorer?.dataset.problemExplorer || `scope-${selectorIndex + 1}`;
      const panel = explorer?.querySelector("[data-problem-panel]");
      if (panel && !panel.id) panel.id = `problem-panel-${scope}`;
      selector.textContent = "";
      problemStories.forEach((story, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.id = `problem-tab-${scope}-${story.id}`;
        button.role = "tab";
        button.dataset.problemSelect = story.id;
        button.setAttribute("aria-selected", String(index === 0));
        if (panel) button.setAttribute("aria-controls", panel.id);
        button.tabIndex = index === 0 ? 0 : -1;
        button.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span><strong>${story.shortLabel}</strong>`;
        button.addEventListener("click", () => renderProblemStory(story.id));
        button.addEventListener("keydown", (event) => {
          if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          let next = index;
          if (["ArrowRight", "ArrowDown"].includes(event.key)) next = (index + 1) % problemStories.length;
          if (["ArrowLeft", "ArrowUp"].includes(event.key)) next = (index - 1 + problemStories.length) % problemStories.length;
          if (event.key === "Home") next = 0;
          if (event.key === "End") next = problemStories.length - 1;
          const nextButton = selector.querySelectorAll("button")[next];
          nextButton?.focus();
          renderProblemStory(problemStories[next].id);
        });
        selector.appendChild(button);
      });
    });
  }

  function buildEvidenceMatrix() {
    const matrix = document.querySelector("[data-problem-evidence-matrix]");
    if (!matrix) return;
    matrix.innerHTML = `<div class="evidence-matrix-heading"><span>WHICH ITEM HELPED WITH EACH STEP?</span><h3>Every part of Sam’s journey has a document behind it.</h3><p>Use this map to see why each item exists. Open a document below for the beginner guide and the full workshop content.</p></div>${problemStories.map((story) => `
      <article data-evidence-problem="${story.id}">
        <span>${story.number} / ${story.shortLabel.toUpperCase()}</span>
        <h3>${story.simpleProblem}</h3>
        <p>${story.simpleFix}</p>
        <div>${story.technical.evidence.map((doc) => `<a href="#evidence/${doc}">${beginnerDocumentCopy[doc]?.label || documentTitles[doc]}</a>`).join("")}</div>
      </article>`).join("")}`;

    const inverse = {};
    problemStories.forEach((story) => story.technical.evidence.forEach((doc) => {
      inverse[doc] = [...(inverse[doc] || []), story.shortLabel];
    }));
    document.querySelectorAll(".doc-tab").forEach((button) => {
      const existing = button.querySelector(".doc-problem-tags");
      if (existing) existing.remove();
      const tags = document.createElement("small");
      tags.className = "doc-problem-tags";
      tags.textContent = (inverse[button.dataset.doc] || []).join(" + ");
      button.appendChild(tags);
    });
  }

  function annotateBuildPhases() {
    document.querySelectorAll(".phase-row").forEach((row, index) => {
      const annotation = phaseAnnotations[index];
      const copy = annotation;
      if (!annotation || !copy || row.dataset.beginnerReady === "true") return;
      row.dataset.beginnerReady = "true";

      const phaseName = row.querySelector("summary strong");
      const phaseSummary = row.querySelector("summary small");
      if (phaseName) phaseName.textContent = copy.name;
      if (phaseSummary) phaseSummary.textContent = copy.summary;

      const technicalGrid = row.querySelector(".phase-grid");
      if (!technicalGrid) return;

      const beginnerGrid = document.createElement("div");
      beginnerGrid.className = "phase-beginner-grid";
      beginnerGrid.innerHTML = `<div><span>WHAT I NEEDED</span><p>${copy.needed}</p></div><div><span>WHAT I DECIDED</span><p>${copy.decided}</p></div><div><span>WHAT I PRODUCED</span><p>${copy.made}</p></div><div><span>PART OF SAM’S JOURNEY</span><p>${copy.journey}</p></div>`;

      const summary = document.createElement("div");
      summary.className = "phase-problem-summary";
      const problems = annotation.problems.map((id) => problemStory(id));
      summary.innerHTML = `<div><span>WHAT THIS IMPROVES</span><p>${problems.map((story) => story.simpleFix).join(" ")}</p></div>`;
      beginnerGrid.appendChild(summary);

      const technical = document.createElement("details");
      technical.className = "inline-technical phase-technical-setup";
      technical.innerHTML = `<summary>Technical setup</summary>`;
      const technicalIntro = document.createElement("p");
      technicalIntro.className = "phase-technical-intro";
      technicalIntro.textContent = `Official workshop detail for phase ${String(index + 1).padStart(2, "0")}.`;
      technical.appendChild(technicalIntro);
      technical.appendChild(technicalGrid);
      const source = document.createElement("p");
      source.className = "phase-source-note";
      source.textContent = `Source guide: ${copy.source}`;
      technical.appendChild(source);
      row.append(beginnerGrid, technical);
    });
    refreshIcons();
  }

  function configureProblemCentricPresentation() {
    presentationNarrative.forEach((entry) => {
      const slide = document.getElementById(entry.id);
      if (!slide) return;
      slide.dataset.presentationMinutes = String(entry.minutes);
      slide.dataset.problem = entry.problem || "setup";
      const label = slide.querySelector(".presentation-label");
      const heading = slide.querySelector(".presentation-copy h1, .presentation-copy h2");
      const body = slide.querySelector(".presentation-copy > p");
      if (label) {
        label.dataset.topic = entry.topic;
        label.textContent = entry.topic;
      }
      if (heading) heading.textContent = entry.title;
      if (body) body.textContent = entry.body;
    });

    const openingRoute = document.querySelector("#presentation-slide-1 .present-route");
    if (openingRoute) openingRoute.innerHTML = problemStories.map((story, index) => `${index ? '<i data-lucide="arrow-right" aria-hidden="true"></i>' : ""}<span>${story.shortLabel.toUpperCase()}</span>`).join("");
    const mapVisual = document.querySelector("#presentation-slide-2 .presentation-visual");
    if (mapVisual) {
      mapVisual.className = "presentation-visual presentation-problem-map";
      const samJourney = [
        ["See an ad", "Sam notices the offer"],
        ["Ask for help", "Sam explains the goal"],
        ["Choose a time", "Sam picks a visit"],
        ["Show up", "Sam gets reminders"],
        ["Learn what worked", "The team reviews the path"]
      ];
      mapVisual.setAttribute("aria-label", "Sam's five-step example journey");
      mapVisual.innerHTML = samJourney.map(([label, detail], index) => `<div><span>${String(index + 1).padStart(2, "0")}</span><strong>${label}</strong><small>${detail}</small></div>`).join("");
    }
    const closeGrid = document.querySelector("#presentation-slide-18 .presentation-close-grid");
    if (closeGrid) closeGrid.innerHTML = problemStories.map((story) => `<div><span>${story.number}</span><strong>${story.shortLabel}</strong></div>`).join("");
  }

  function framePresentationNotes() {
    presentationNarrative.forEach((entry) => {
      const talk = document.querySelector(`#${entry.id} .presentation-talk`);
      if (!talk) return;
      const title = talk.querySelector("h3");
      if (title) title.textContent = entry.title;
      const originalNodes = Array.from(talk.children).filter((node) => node !== title);
      const technicalExcerpt = originalNodes
        .map((node) => node.textContent || "")
        .join(" ")
        .replace(/\s+/g, " ")
        .trim()
        .split(/\s+/)
        .slice(0, 70)
        .join(" ");
      const guide = document.createElement("div");
      guide.className = "presentation-beginner-guide";
      const guideLabel = document.createElement("span");
      guideLabel.textContent = "BEGINNER SPEAKER GUIDE";
      const guideCopy = document.createElement("p");
      guideCopy.textContent = entry.note
        .replace("Explain:", "Beginner explanation:")
        .replace("Example:", "Sam example:")
        .replace("Ask:", "Audience question:")
        .replace("Technical backup:", "Technical detail if asked:");
      const prompt = document.createElement("p");
      prompt.className = "presentation-prompt";
      prompt.textContent = `Audience question: ${presentationPromptsBySlide[entry.id] || "Where could Sam get stuck here?"}`;
      const transition = document.createElement("p");
      transition.className = "presentation-transition";
      transition.textContent = `Transition: ${entry.transition}`;
      const evidence = document.createElement("p");
      evidence.className = "presentation-evidence-walkthrough";
      evidence.textContent = `Evidence walkthrough: ${technicalExcerpt || "Use the linked build, document, and measurement views to show how this decision becomes inspectable."}`;
      guide.append(guideLabel, guideCopy, evidence, prompt, transition);
      talk.textContent = "";
      talk.append(title, guide);
    });
  }

  function initProblemStory() {
    buildProblemSelectors();
    buildEvidenceMatrix();
    annotateBuildPhases();
    renderProblemStory(activeProblem, { syncKpi: false });
  }

  const workflowTypeLabels = {
    trigger: "START",
    action: "DO",
    condition: "CHECK",
    wait: "WAIT",
    handoff: "PASS ON",
    stop: "FINISH"
  };

  const workflowBeginnerCopy = {
    "new-lead-booking": { name: "Help a new person choose a time", summary: "After Sam asks for help, save the answers and make choosing a time easy.", trigger: "Starts when the inquiry form is sent", stop: "Stops when a time is booked" },
    "consultation-booking": { name: "Confirm the appointment and send reminders", summary: "After Sam chooses a time, protect that appointment with clear messages.", trigger: "Starts when a consultation is booked", stop: "Stops when the appointment reaches its outcome" },
    "no-show-recovery": { name: "Help someone rebook after a missed visit", summary: "If Sam misses the visit, offer a respectful way to choose another time.", trigger: "Starts when an appointment is marked missed", stop: "Stops when Sam rebooks or the follow-up ends" },
    "post-consult-whitening": { name: "Follow up after the consultation", summary: "After the visit, send useful information about a possible next step.", trigger: "Starts when a consultation is completed", stop: "Stops when the next step is booked or the sequence ends" },
    "whitening-payment": { name: "Record that payment was completed", summary: "When the team confirms payment, save it and start the future-care timer.", trigger: "Starts when payment is confirmed", stop: "Stops after the payment is recorded" },
    "six-month-recall": { name: "Remind the person about future care", summary: "After enough time passes, remind Sam about a future check-up or cleaning.", trigger: "Starts after a completed care event", stop: "Stops when care is booked or Sam opts out" }
  };

  function beginnerNodeTitle(node) {
    if (node.beginnerTitle) return node.beginnerTitle;
    if (node.type === "trigger") return "Something happens";
    if (node.type === "condition") return "Check what is true";
    if (node.type === "wait") return "Give the person time";
    if (node.type === "handoff") return "Pass to the next helper";
    if (node.type === "stop") return "Finish this path";
    if (/send/i.test(node.title)) return "Send a helpful message";
    if (/tag/i.test(node.title)) return "Save a label";
    if (/move|create|update|save|add/i.test(node.title)) return "Update the record";
    return "Take the next action";
  }

  function beginnerNodeWhy(node) {
    if (node.why) return node.why;
    if (node.type === "trigger") return "It starts the right part of Sam’s journey.";
    if (node.type === "condition") return "It keeps the person from receiving the wrong message or path.";
    if (node.type === "wait") return "It gives the person time before the system checks again.";
    if (node.type === "handoff") return "It passes the result to the helper that owns the next step.";
    if (node.type === "stop") return "It prevents more follow-up when the path is complete.";
    return "It keeps the team record and the next step up to date.";
  }

  function beginnerNodeNotice(node) {
    if (node.type === "trigger") return "Sam reaches this moment in the journey.";
    if (node.type === "condition") return "The system checks whether the next step is still needed.";
    if (node.type === "wait") return "The system waits until the useful time.";
    if (node.type === "handoff") return "The current helper finishes and passes the person onward.";
    if (node.type === "stop") return "The journey reaches an ending point.";
    if (/send/i.test(node.title)) return "A message is ready for the person.";
    if (/tag/i.test(node.title)) return "A small label needs to be saved.";
    return "The team record needs an update.";
  }

  function beginnerNodeAction(node) {
    if (node.type === "trigger") return "Starts the right helper for Sam’s next step.";
    if (node.type === "condition") return "Chooses the correct path so Sam gets the right next action.";
    if (node.type === "wait") return "Pauses before checking or sending anything else.";
    if (node.type === "handoff") return "Lets the next helper own the next part of the journey.";
    if (node.type === "stop") return "Ends follow-up when the intended path is complete.";
    if (/send/i.test(node.title)) return "Sends a useful message at this moment.";
    if (/tag/i.test(node.title)) return "Saves a label so the next step can be understood.";
    return "Updates the shared record so the team can see what happened.";
  }

  function beginnerOutcomeText(outcome) {
    const text = String(outcome.text || "");
    if (/stop|no.?show|lost|skip/i.test(text)) return "Stop this path or leave the optional message out.";
    if (/start|continue|send|add|move|keep|create|update/i.test(text)) return "Continue to the next helpful step.";
    return text;
  }

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
    const whyCopy = document.getElementById("workflow-node-why");
    const technicalTitle = document.getElementById("workflow-node-technical-title");
    const ghl = document.getElementById("workflow-node-ghl");
    const branch = document.getElementById("workflow-node-branch");
    const outcomes = document.getElementById("workflow-node-outcomes");
    if (type) type.textContent = workflowTypeLabels[node.type] || "STEP";
    if (position) position.textContent = String(nodeIndex + 1).padStart(2, "0") + " / " + String(workflow.nodes.length).padStart(2, "0");
    if (title) title.textContent = beginnerNodeTitle(node);
    if (description) description.textContent = beginnerNodeNotice(node);
    if (functionCopy) functionCopy.textContent = beginnerNodeAction(node);
    if (whyCopy) whyCopy.textContent = beginnerNodeWhy(node);
    if (technicalTitle) technicalTitle.textContent = node.title;
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
          copy.textContent = beginnerOutcomeText(outcome);
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

    const beginner = workflowBeginnerCopy[workflowId] || {};
    const values = {
      "workflow-number": workflow.number,
      "workflow-title": beginner.name || workflow.name,
      "workflow-summary": beginner.summary || workflow.summary,
      "workflow-trigger": beginner.trigger || workflow.trigger,
      "workflow-location": "The shared customer record",
      "workflow-technical-location": workflow.location,
      "workflow-stop": beginner.stop || workflow.stop,
      "workflow-count": String(workflow.nodes.length).padStart(2, "0") + " steps",
      "workflow-canvas-label": String(workflow.nodes.length).padStart(2, "0") + " STEP PATH"
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
      const displayTitle = beginnerNodeTitle(node);
      button.setAttribute("aria-label", String(nodeIndex + 1).padStart(2, "0") + ". " + displayTitle + ". " + (workflowTypeLabels[node.type] || "Step"));

      const index = document.createElement("span");
      index.className = "workflow-node-index";
      index.textContent = String(nodeIndex + 1).padStart(2, "0");
      const kind = document.createElement("span");
      kind.className = "workflow-node-kind";
      kind.textContent = workflowTypeLabels[node.type] || "STEP";
      const title = document.createElement("strong");
      title.textContent = displayTitle;
      const summary = document.createElement("p");
      summary.textContent = beginnerNodeNotice(node);
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
          scrub: 0.8,
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
    if (view === "problem" && !document.body.dataset.heroAnimated) {
      setupHeroMotion();
      document.body.dataset.heroAnimated = "true";
    }
    if (view === "solution") setupSystemMotion();
  }

  function setView(view, options = {}) {
    const nextView = views.includes(view) ? view : "problem";
    activeView = nextView;
    document.querySelectorAll("[data-view-panel]").forEach((panel) => {
      panel.hidden = panel.dataset.viewPanel !== nextView;
      panel.classList.toggle("is-active", panel.dataset.viewPanel === nextView);
    });
    updateTabs(nextView);
    document.body.dataset.view = nextView;
    if (nextView === "evidence") activateDocument(activeDocument, false);
    if (nextView !== "solution" && systemTrigger) {
      systemTrigger.kill();
      systemTrigger = null;
    }
    if (options.updateUrl !== false) writeHash(nextView, nextView === "evidence" ? activeDocument : null, options.replace === true);
    initMotion(nextView);
    if (options.scroll !== false) {
      window.requestAnimationFrame(() => {
        const behavior = options.replace ? "auto" : (reduceMotion() ? "auto" : "smooth");
        if (nextView === "problem") {
          window.scrollTo({ top: 0, behavior });
        } else {
          const target = document.getElementById(`view-${nextView}`);
          if (!target) return;
          const scrollMargin = Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0;
          const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - scrollMargin);
          window.scrollTo({ top, behavior });
        }
      });
    }
    if (options.focus) document.getElementById(`view-${nextView}`)?.focus({ preventScroll: true });
  }

  function arrangePresentationSlides() {
    const stage = document.getElementById("presentation-stage");
    if (!stage) return;
    presentationSlideOrder.forEach((id) => {
      const slide = document.getElementById(id);
      if (slide) stage.appendChild(slide);
    });
    stage.querySelectorAll("[data-presentation-slide]").forEach((slide, index) => {
      slide.dataset.presentationSlide = String(index);
      const label = slide.querySelector(".presentation-label");
      if (!label) return;
      const topic = label.dataset.topic || label.textContent.replace(/^\d+\s*\/\s*/, "").trim();
      label.dataset.topic = topic;
      label.textContent = `${String(index + 1).padStart(2, "0")} / ${topic}`;
    });
  }

  function hydratePresentationNotes() {
    document.querySelectorAll(".presentation-message").forEach((message) => {
      const slide = message.closest("[data-presentation-slide]");
      const notes = slide ? presentationNotesBySlide[slide.id] : null;
      const narrative = slide ? presentationNarrative.find((entry) => entry.id === slide.id) : null;
      if (!slide || (!notes && !narrative)) return;
      message.textContent = "";
      message.hidden = true;

      const label = document.createElement("span");
      label.textContent = "PRESENTER NOTES";
      const talk = document.createElement("div");
      talk.className = "presentation-talk";
      const title = document.createElement("h3");
      title.textContent = notes?.title || narrative.title;
      talk.appendChild(title);
      (notes?.paragraphs || [narrative.body]).forEach((copy) => {
        const paragraph = document.createElement("p");
        paragraph.textContent = copy;
        talk.appendChild(paragraph);
      });
      const list = document.createElement("ul");
      (notes?.bullets || []).forEach((copy) => {
        const item = document.createElement("li");
        item.textContent = copy;
        list.appendChild(item);
      });
      talk.appendChild(list);
      const prompt = document.createElement("p");
      prompt.className = "presentation-prompt";
      prompt.textContent = `Speaking prompt: ${presentationPromptsBySlide[slide.id] || "Connect this slide to the next customer or system decision."}`;
      talk.appendChild(prompt);
      const transition = document.createElement("p");
      transition.className = "presentation-transition";
      transition.textContent = `Transition: ${notes?.transition || narrative.transition}`;
      talk.appendChild(transition);
      message.append(label, talk);
    });
  }

  function currentChapterIndex(index = presentationIndex) {
    return Math.max(0, presentationChapters.findIndex((chapter) => index >= chapter.start && index <= chapter.end));
  }

  function syncPresentationNotes() {
    document.body.classList.toggle("is-presentation-notes-open", presentationNotesOpen);
    document.querySelectorAll("[data-presentation-slide]").forEach((slide, index) => {
      const notes = slide.querySelector(".presentation-message");
      if (notes) notes.hidden = !(presentationNotesOpen && index === presentationIndex);
    });
    const toggle = document.getElementById("presentation-notes-toggle");
    if (toggle) {
      toggle.setAttribute("aria-pressed", String(presentationNotesOpen));
      toggle.classList.toggle("is-active", presentationNotesOpen);
    }
  }

  function setPresentationNotes(open) {
    presentationNotesOpen = Boolean(open);
    syncPresentationNotes();
  }

  function setPresentationOutline(open) {
    presentationOutlineOpen = Boolean(open);
    const outline = document.getElementById("presentation-outline");
    const toggle = document.getElementById("presentation-outline-toggle");
    if (outline) outline.hidden = !presentationOutlineOpen;
    if (toggle) {
      toggle.setAttribute("aria-expanded", String(presentationOutlineOpen));
      toggle.classList.toggle("is-active", presentationOutlineOpen);
    }
  }

  function setPresentationGlossary(open) {
    presentationGlossaryOpen = Boolean(open);
    const glossary = document.getElementById("presentation-glossary");
    const toggle = document.getElementById("presentation-glossary-toggle");
    if (glossary) glossary.hidden = !presentationGlossaryOpen;
    if (toggle) {
      toggle.setAttribute("aria-expanded", String(presentationGlossaryOpen));
      toggle.classList.toggle("is-active", presentationGlossaryOpen);
    }
  }

  function renderTeachingFunnel(key) {
    const detail = teachingFunnelDetails[key] || teachingFunnelDetails.impressions;
    document.querySelectorAll("[data-funnel-stage]").forEach((button) => {
      const selected = button.dataset.funnelStage === key;
      button.setAttribute("aria-pressed", String(selected));
      button.classList.toggle("is-active", selected);
    });
    const panel = document.getElementById("teaching-funnel-detail");
    if (!panel) return;
    panel.innerHTML = `<span>${detail[0]}</span><strong>${detail[1]}</strong><details class="inline-technical"><summary>Show the analyst detail</summary><code>${detail[2]}</code></details>`;
  }

  function initTeachingFunnel() {
    const buttons = Array.from(document.querySelectorAll("[data-funnel-stage]"));
    buttons.forEach((button, index) => {
      button.addEventListener("click", () => renderTeachingFunnel(button.dataset.funnelStage));
      button.addEventListener("keydown", (event) => {
        if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        event.stopPropagation();
        let next = index;
        if (event.key === "ArrowRight") next = Math.min(buttons.length - 1, index + 1);
        if (event.key === "ArrowLeft") next = Math.max(0, index - 1);
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = buttons.length - 1;
        buttons[next].focus();
        renderTeachingFunnel(buttons[next].dataset.funnelStage);
      });
    });
    renderTeachingFunnel("impressions");
  }

  function renderPresentationJourney(key) {
    const detail = nodeDetails[key] || nodeDetails.ad;
    document.querySelectorAll("[data-journey-teach-node]").forEach((button) => {
      const selected = button.dataset.journeyTeachNode === key;
      button.setAttribute("aria-pressed", String(selected));
      button.classList.toggle("is-active", selected);
    });
    const panel = document.getElementById("presentation-journey-detail");
    if (panel) panel.innerHTML = `<span>WHY IT EXISTS</span><strong>${detail.title}</strong><p>${detail.plain}</p><details class="inline-technical"><summary>Show the GHL setup</summary><code>${detail.technical}</code></details>`;
  }

  function renderPresentationWorkflow(key) {
    const detail = presentationWorkflowDetails[key] || presentationWorkflowDetails.trigger;
    document.querySelectorAll("[data-workflow-teach-node]").forEach((button) => {
      const selected = button.dataset.workflowTeachNode === key;
      button.setAttribute("aria-pressed", String(selected));
      button.classList.toggle("is-active", selected);
    });
    const panel = document.getElementById("presentation-workflow-node-detail");
    if (panel) panel.innerHTML = `<span>${detail[0]}</span><strong>${detail[1]}</strong><p>${detail[2]}</p><details class="inline-technical"><summary>Show the GHL setup</summary><p>${detail[3]}</p></details>`;
  }

  function initPresentationTeachingGroup(selector, keyName, render, initialKey) {
    const buttons = Array.from(document.querySelectorAll(selector));
    buttons.forEach((button, index) => {
      button.addEventListener("click", () => render(button.dataset[keyName]));
      button.addEventListener("keydown", (event) => {
        if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        event.stopPropagation();
        let next = index;
        if (event.key === "ArrowRight") next = Math.min(buttons.length - 1, index + 1);
        if (event.key === "ArrowLeft") next = Math.max(0, index - 1);
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = buttons.length - 1;
        buttons[next].focus();
        render(buttons[next].dataset[keyName]);
      });
    });
    if (buttons.length) render(initialKey);
  }

  function setPresentationBackgroundInert(inert) {
    document.querySelectorAll(".skip-link, .redesign-header, #case-study").forEach((element) => {
      element.inert = inert;
      if (inert) {
        element.dataset.presentationBackground = "true";
        element.setAttribute("aria-hidden", "true");
      } else if (element.dataset.presentationBackground === "true") {
        delete element.dataset.presentationBackground;
        element.removeAttribute("aria-hidden");
      }
    });
  }

  function trapPresentationFocus(event) {
    if (event.key !== "Tab") return;
    const overlay = document.getElementById("presentation-mode");
    if (!overlay) return;
    const focusable = Array.from(overlay.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'))
      .filter((element) => !element.hidden && element.getClientRects().length > 0);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!overlay.contains(document.activeElement)) {
      event.preventDefault();
      first.focus();
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
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

    const activeSlide = slides[presentationIndex];
    const chapterIndex = currentChapterIndex();
    const chapter = presentationChapters[chapterIndex];
    const step = document.getElementById("presentation-step");
    const total = document.getElementById("presentation-total");
    const progress = document.querySelector(".presentation-progress");
    const timing = document.getElementById("presentation-timing");
    const runtime = document.getElementById("presentation-runtime");
    const previous = document.getElementById("presentation-prev");
    const next = document.getElementById("presentation-next");
    const stage = document.getElementById("presentation-stage");
    const announcer = document.getElementById("presentation-announcer");
    if (step) step.textContent = String(presentationIndex + 1).padStart(2, "0");
    if (total) total.textContent = String(slides.length).padStart(2, "0");
    if (progress) {
      progress.max = slides.length;
      progress.value = presentationIndex + 1;
      progress.setAttribute("aria-valuemax", String(slides.length));
      progress.setAttribute("aria-valuenow", String(presentationIndex + 1));
      progress.setAttribute("aria-valuetext", `${chapter.name}, slide ${presentationIndex + 1} of ${slides.length}`);
      progress.textContent = `Slide ${presentationIndex + 1} of ${slides.length}`;
    }
    if (timing) timing.textContent = `~${activeSlide.dataset.presentationMinutes || "2"} MIN`;
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
      next.setAttribute("title", isLast ? "Open the full case study" : "Next presentation slide");
    }
    document.querySelectorAll("[data-presentation-chapter]").forEach((button) => {
      const selected = Number(button.dataset.presentationChapter) === chapterIndex;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
      button.classList.toggle("is-active", selected);
    });
    document.querySelectorAll("[data-presentation-outline-slide]").forEach((button) => {
      const selected = Number(button.dataset.presentationOutlineSlide) === presentationIndex;
      button.setAttribute("aria-current", selected ? "step" : "false");
      button.classList.toggle("is-active", selected);
    });
    if (stage) {
      stage.dataset.chapter = String(chapterIndex + 1);
      stage.scrollTop = 0;
    }
    if (announcer) {
      const heading = activeSlide.querySelector("h1, h2")?.textContent?.trim() || "Presentation slide";
      announcer.textContent = `${chapter.name}. Slide ${presentationIndex + 1} of ${slides.length}. ${heading}`;
    }
    syncPresentationNotes();
    refreshIcons();

    if (options.updateUrl !== false) writePresentationHash(presentationIndex, options.replace === true);
    if (options.focus) stage?.focus({ preventScroll: true });
  }

  function openPresentation(index = 0, options = {}) {
    const overlay = document.getElementById("presentation-mode");
    if (!overlay) return;

    const alreadyOpen = document.body.classList.contains("is-presentation-open");
    if (!alreadyOpen) {
      presentationPreviousFocus = document.activeElement;
      if (!window.location.hash.startsWith("#present")) presentationReturnHash = window.location.hash || "#problem";
      overlay.hidden = false;
      overlay.setAttribute("aria-hidden", "false");
      document.body.classList.add("is-presentation-open");
      setPresentationBackgroundInert(true);
      setPresentationNotes(false);
      setPresentationOutline(false);
      setPresentationGlossary(false);
    }

    updatePresentation(index, { updateUrl: options.updateUrl !== false, replace: options.replace === true });
    if (options.focus !== false && !alreadyOpen) document.getElementById("presentation-close")?.focus();
  }

  function closePresentation(options = {}) {
    const overlay = document.getElementById("presentation-mode");
    if (!overlay || !document.body.classList.contains("is-presentation-open")) return;

    overlay.hidden = true;
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-presentation-open", "is-presentation-notes-open");
    setPresentationBackgroundInert(false);
    setPresentationOutline(false);
    setPresentationGlossary(false);

    const returnHash = options.returnHash || presentationReturnHash || "#problem";
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
      closePresentation({ updateUrl: false, returnHash: window.location.hash || "#problem" });
      return;
    }
    if (state.documentId) activeDocument = state.documentId;
    setView(state.view, { updateUrl: false });
  }

  function initPresentation() {
    configureProblemCentricPresentation();
    arrangePresentationSlides();
    const slides = Array.from(document.querySelectorAll("[data-presentation-slide]"));
    hydratePresentationNotes();
    framePresentationNotes();
    initTeachingFunnel();
    initPresentationTeachingGroup("[data-journey-teach-node]", "journeyTeachNode", renderPresentationJourney, "ad");
    initPresentationTeachingGroup("[data-workflow-teach-node]", "workflowTeachNode", renderPresentationWorkflow, "trigger");
    const chapterContainer = document.getElementById("presentation-chapters");
    if (chapterContainer) {
      chapterContainer.textContent = "";
      presentationChapters.forEach((chapter, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.role = "tab";
        button.setAttribute("aria-selected", String(index === 0));
        button.setAttribute("aria-controls", slides[chapter.start]?.id || "presentation-stage");
        button.dataset.presentationChapter = String(index);
        button.tabIndex = index === 0 ? 0 : -1;
        const number = document.createElement("span");
        number.textContent = String(index + 1).padStart(2, "0");
        const name = document.createElement("strong");
        name.textContent = chapter.name;
        button.append(number, name);
        chapterContainer.appendChild(button);
      });
    }
    const outlineList = document.getElementById("presentation-outline-list");
    if (outlineList) {
      outlineList.textContent = "";
      slides.forEach((slide, index) => {
        const button = document.createElement("button");
        const label = slide.querySelector(".presentation-label")?.textContent?.trim() || `Slide ${index + 1}`;
        const heading = slide.querySelector("h1, h2")?.textContent?.trim() || "Untitled slide";
        button.type = "button";
        button.dataset.presentationOutlineSlide = String(index);
        button.innerHTML = `<span>${label}</span><strong>${heading}</strong>`;
        outlineList.appendChild(button);
      });
    }
    document.querySelectorAll("[data-presentation-open]").forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        openPresentation(0);
      });
    });
    document.getElementById("presentation-notes-toggle")?.addEventListener("click", () => setPresentationNotes(!presentationNotesOpen));
    document.getElementById("presentation-glossary-toggle")?.addEventListener("click", () => {
      const next = !presentationGlossaryOpen;
      if (next) setPresentationOutline(false);
      setPresentationGlossary(next);
    });
    document.getElementById("presentation-outline-toggle")?.addEventListener("click", () => {
      const next = !presentationOutlineOpen;
      if (next) setPresentationGlossary(false);
      setPresentationOutline(next);
    });
    document.querySelector("[data-presentation-close]")?.addEventListener("click", () => closePresentation());
    document.querySelector("[data-presentation-prev]")?.addEventListener("click", () => updatePresentation(presentationIndex - 1));
    document.querySelector("[data-presentation-next]")?.addEventListener("click", () => {
      const last = document.querySelectorAll("[data-presentation-slide]").length - 1;
      if (presentationIndex >= last) {
        closePresentation({ returnHash: "#solution" });
      } else {
        updatePresentation(presentationIndex + 1);
      }
    });
    document.querySelectorAll("[data-presentation-chapter]").forEach((button) => {
      button.addEventListener("click", () => updatePresentation(presentationChapters[Number(button.dataset.presentationChapter)].start));
      button.addEventListener("keydown", (event) => {
        if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
        const chapterButtons = Array.from(document.querySelectorAll("[data-presentation-chapter]"));
        const current = Number(button.dataset.presentationChapter);
        let next = current;
        if (event.key === "ArrowRight") next = (current + 1) % chapterButtons.length;
        if (event.key === "ArrowLeft") next = (current - 1 + chapterButtons.length) % chapterButtons.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = chapterButtons.length - 1;
        event.preventDefault();
        event.stopPropagation();
        chapterButtons[next].focus();
        updatePresentation(presentationChapters[next].start);
      });
    });
    document.querySelectorAll("[data-presentation-outline-slide]").forEach((button) => {
      button.addEventListener("click", () => {
        updatePresentation(Number(button.dataset.presentationOutlineSlide));
        setPresentationOutline(false);
        document.getElementById("presentation-stage")?.focus({ preventScroll: true });
      });
    });
    document.addEventListener("keydown", (event) => {
      if (!document.body.classList.contains("is-presentation-open")) return;
      trapPresentationFocus(event);
      if (event.key === "Escape") {
        event.preventDefault();
        if (presentationGlossaryOpen) {
          setPresentationGlossary(false);
          document.getElementById("presentation-glossary-toggle")?.focus();
        } else if (presentationOutlineOpen) {
          setPresentationOutline(false);
          document.getElementById("presentation-outline-toggle")?.focus();
        } else {
          closePresentation();
        }
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

    document.querySelectorAll("[data-tour-start]").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        setView("problem", { scroll: false });
        window.requestAnimationFrame(() => {
          document.getElementById("view-problem")?.scrollIntoView({ block: "start", behavior: reduceMotion() ? "auto" : "smooth" });
        });
      });
    });

    const documentTabs = Array.from(document.querySelectorAll(".doc-tab"));
    documentTabs.forEach((button, index) => {
      button.addEventListener("click", () => {
        activateDocument(button.dataset.doc, true);
        setView("evidence", { updateUrl: false, scroll: true });
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
        setView("evidence", { updateUrl: false, scroll: true });
      });
    });

    window.addEventListener("hashchange", syncUrlState);
    window.addEventListener("popstate", syncUrlState);
  }

  function renderKpiDiagnostic(key) {
    const diagnostic = kpiDiagnostics[key] || kpiDiagnostics.arrival;
    const activeKey = kpiDiagnostics[key] ? key : "arrival";
    const panel = document.getElementById("kpi-diagnostic-panel");
    const activeTab = document.querySelector(`[data-kpi="${activeKey}"]`);
    document.querySelectorAll("[data-kpi]").forEach((button) => {
      const selected = button.dataset.kpi === activeKey;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    if (panel && activeTab) {
      panel.setAttribute("aria-labelledby", activeTab.id);
      panel.classList.remove("is-switching");
      window.requestAnimationFrame(() => panel.classList.add("is-switching"));
    }
    const values = {
      "kpi-diagnostic-label": diagnostic.label,
      "kpi-diagnostic-name": diagnostic.name,
      "kpi-diagnostic-formula": diagnostic.formula,
      "kpi-diagnostic-signal": diagnostic.signal,
      "kpi-diagnostic-evidence": diagnostic.evidence,
      "kpi-diagnostic-test": diagnostic.test
    };
    Object.entries(values).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) element.textContent = value;
    });
  }

  function initKpiDiagnostics() {
    const tabs = Array.from(document.querySelectorAll("[data-kpi]"));
    tabs.forEach((button, index) => {
      button.addEventListener("click", () => renderKpiDiagnostic(button.dataset.kpi));
      button.addEventListener("keydown", (event) => {
        if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        let next = index;
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = tabs.length - 1;
        tabs[next].focus();
        renderKpiDiagnostic(tabs[next].dataset.kpi);
      });
    });
    renderKpiDiagnostic("arrival");
  }

  function disableSignalForReducedMotion() {
    if (!reduceMotion()) return;
    document.querySelectorAll("animateMotion").forEach((element) => element.remove());
  }

  function start() {
    prepareDocuments();
    prepareMeasurementView();
    initProblemStory();
    initJourney();
    initWorkflowLab();
    initPresentation();
    initNavigation();
    initKpiDiagnostics();
    disableSignalForReducedMotion();
    const state = getHashState();
    if (state.presentation) {
      openPresentation(state.presentationIndex, { updateUrl: false, focus: false });
    } else {
      if (state.documentId) activeDocument = state.documentId;
      setView(state.view, { replace: true, scroll: state.view !== "problem" });
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

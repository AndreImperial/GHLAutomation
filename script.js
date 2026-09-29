(() => {
  "use strict";

  const views = ["problem", "solution", "build", "measurement", "conclusion", "evidence"];
  const routeDefinitions = {
    "": { view: "problem" },
    overview: { view: "problem" },
    system: { view: "solution" },
    build: { view: "build" },
    deliverables: { view: "evidence" },
    measurement: { view: "measurement" },
    conclusion: { view: "conclusion" },
    automation: { view: "solution", anchor: "automation-workflows" },
    contact: { view: "conclusion", anchor: "contact" },
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

  const presentationChapters = [
    { name: "What Was Going Wrong", start: 0, end: 3 },
    { name: "Helping People Ask", start: 4, end: 7 },
    { name: "Helping People Book", start: 8, end: 11 },
    { name: "Helping People Show Up", start: 12, end: 15 },
    { name: "Helping the Clinic Follow Up", start: 16, end: 19 },
    { name: "Learning What Works", start: 20, end: 24 }
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
        evidence: ["business-case-intake", "strategy-doc", "campaign-doc", "copy-doc"],
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
        evidence: ["kpi-scorecard", "kpi-doc", "checklist-doc"],
        diagnosticKey: "arrival"
      }
    }
  ];

  const documentTitles = {
    "strategy-doc": "Marketing Strategy Document",
    "campaign-doc": "Integrated Campaign Plan",
    "funnel-doc": "Funnel Map and GHL Blueprint",
    "copy-doc": "Landing Page Copy Deck",
    "messages-doc": "Email and SMS Sequence",
    "workflow-doc": "GHL Workflow Specification",
    "kpi-doc": "Analytics and KPI Plan",
    "checklist-doc": "GHL Build Checklist",
    "business-case-intake": "Business Case Intake Worksheet",
    "kpi-scorecard": "KPI Scorecard"
  };

  const beginnerDocumentCopy = {
    "strategy-doc": { label: "Marketing Strategy Document", question: "What problem should the campaign solve?", why: "The team needs a clear reason for the offer before building pages or messages.", learn: "How the audience, offer, concerns, and projected goals shaped the build.", journey: "Before Sam sees the offer" },
    "campaign-doc": { label: "Integrated Campaign Plan", question: "How will people first hear about Bloom Dental?", why: "The same helpful promise should appear in the promotion and on the page.", learn: "How the audience, channel, message, and first action fit together.", journey: "Sam sees the offer" },
    "funnel-doc": { label: "Funnel Map and GHL Blueprint", question: "What should happen from the first click to follow-up?", why: "A drawn path makes missing steps visible before anything is built.", learn: "How the page, questions, calendar, progress record, and helpers connect.", journey: "Sam moves through the full path" },
    "copy-doc": { label: "Landing Page Copy Deck", question: "What should Sam read before asking for help?", why: "Clear words lower worry and make the next action easier to understand.", learn: "How the page, form, FAQs, and calls to action guide the first step.", journey: "Sam understands the offer and asks for help" },
    "messages-doc": { label: "Email and SMS Sequence", question: "What should Sam receive after each important moment?", why: "Useful messages help people remember, prepare, rebook, or continue.", learn: "How timing, permission, tone, and stop rules shape the messages.", journey: "Sam gets reminders and follow-up" },
    "workflow-doc": { label: "GHL Workflow Specification", question: "Which repeat tasks should happen without manual chasing?", why: "Writing each rule down makes the system easier to build and check.", learn: "How the six helpers notice events, wait, branch, act, and stop.", journey: "Sam is reminded and followed up" },
    "kpi-doc": { label: "Analytics and KPI Plan", question: "How will the team know where people stop?", why: "A number is useful only when it answers a clear question.", learn: "How events, formulas, time windows, and tests turn activity into learning.", journey: "The team learns what worked" },
    "checklist-doc": { label: "GHL Build Checklist", question: "What must be built and tested before launch?", why: "A checklist turns the plan into a repeatable review.", learn: "How to check the records, page, calendar, messages, helpers, and measurement plan.", journey: "The whole Sam journey" },
    "business-case-intake": { label: "Business Case Intake Worksheet", question: "What did we know before making the strategy?", why: "The workshop needed one reliable place for the business, offer, audience, bottleneck, goal, and voice.", learn: "How raw discovery notes become clear inputs for campaign decisions.", journey: "Before Sam sees the offer" },
    "kpi-scorecard": { label: "KPI Scorecard", question: "Where would the team enter results and compare them with the plan?", why: "A measurement plan needs a repeatable place for weekly actuals, formulas, and status checks.", learn: "How the campaign setup, eight-week tracker, and progress formulas work together.", journey: "After launch, when the team reviews what happened" }
  };

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

  const customerJourney = [
    { id: "ad", label: "Meta ad", short: "A person sees the consultation offer.", plain: "A person sees the consultation offer.", detail: "Campaign source and UTM values identify the visit.", icon: "megaphone" },
    { id: "page", label: "Landing page", short: "The offer and next step become clear.", plain: "The page explains the offer and next step.", detail: "A successful landing-page view starts the measurable onsite path.", icon: "layout-template" },
    { id: "form", label: "Inquiry form", short: "Useful context and permission are captured.", plain: "The person shares useful context and consent.", detail: "The form creates or updates the contact and starts lead capture.", icon: "file-input" },
    { id: "calendar", label: "Booking calendar", short: "An available consultation time is chosen.", plain: "The person chooses an available time.", detail: "The appointment updates the opportunity and booking workflow.", icon: "calendar-check-2" },
    { id: "reminders", label: "Confirmation and reminders", short: "The appointment stays easy to remember.", plain: "Useful messages protect the appointment.", detail: "Timed email and SMS actions honor consent and stop rules.", icon: "message-circle-more" },
    { id: "consultation", label: "Consultation outcome", short: "The clinic records what happened.", plain: "The clinic records what happened.", detail: "Appointment status and pipeline stage route the next workflow.", icon: "clipboard-check" },
    { id: "whitening", label: "Whitening follow-up", short: "The next message matches the outcome.", plain: "The next message matches the consultation outcome.", detail: "A modular workflow handles offer, booking, and payment state.", icon: "sparkles" },
    { id: "recall", label: "Six-month recall", short: "Future care is remembered at the right time.", plain: "Future-care reminders happen at the planned time.", detail: "Long waits and eligibility checks protect relevance and consent.", icon: "history" },
    { id: "kpi", label: "KPI review", short: "The team finds where people stopped.", plain: "The team checks where people moved forward or stopped.", detail: "Events, formulas, and windows support one diagnostic next test.", icon: "chart-no-axes-combined" }
  ];



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
      journeyStep: "form",
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
        { type: "action", title: "Send booking reminder email", description: "Sends one follow-up reminder with the consultation booking link.", function: "Recovers unfinished intent without starting a new workflow or creating duplicate opportunities.", ghl: "Send Email > BD Email - Booking Reminder" }
      ]
    },
    "consultation-booking": {
      number: "02",
      journeyStep: "calendar",
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
      journeyStep: "reminders",
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
        { type: "action", title: "Send final rebooking SMS", description: "Sends the last short reminder with the calendar link.", function: "Closes the active outreach sequence with one clear action.", ghl: "Send SMS > BD SMS - No-Show Final" },
        { type: "condition", title: "Still no appointment?", description: "Checks whether the contact remains inactive after recovery.", function: "Creates a clean end state instead of keeping the opportunity in an ambiguous follow-up loop.", ghl: "If/Else > Appointment status is not Booked", outcomes: [{ label: "YES", text: "Move the opportunity to Lost and add bd-lost." }, { label: "NO", text: "Keep the booked appointment path." }] },
        { type: "action", title: "Move opportunity to Lost", description: "Closes the recovery attempt when no booking occurs.", function: "Makes the funnel drop-off visible for later diagnosis and reporting.", ghl: "Opportunities > Free Consultation Funnel > Lost" }
      ]
    },
    "post-consult-whitening": {
      number: "04",
      journeyStep: "whitening",
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
      journeyStep: "whitening",
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
      journeyStep: "recall",
      name: "Six-Month Recall",
      summary: "Start recall early, then send one optional text as the six-month visit approaches. Timing note: this map follows the v2.0 message sequence (30 days, then 120 days). The workflow specification uses a single six-month wait.",
      trigger: "Consultation completed, whitening paid, or cleaning completed",
      location: "Automation > Workflows",
      stop: "Appointment booked, contact opts out, or both reminders are complete",
      nodes: [
        { type: "trigger", title: "Care event completed", description: "A consultation, whitening payment, or cleaning completion qualifies the contact for recall.", function: "Starts the long-term timer from a meaningful service event.", ghl: "Automation > Workflows > Trigger: Tag or service event" },
        { type: "wait", title: "Wait 30 days", description: "Pauses for one month after the completed care event.", function: "Begins the recall conversation early enough for the patient to plan ahead.", ghl: "Wait > 30 days" },
        { type: "condition", title: "Recall appointment already booked?", description: "Checks whether the person scheduled care during the first month.", function: "Prevents recall messages after the person has already booked.", ghl: "If/Else > Recall appointment status = Booked", outcomes: [{ label: "YES", text: "Stop recall messages; keep the booking record." }, { label: "NO", text: "Add the recall tag and send the first email." }] },
        { type: "action", title: "Add tag: bd-recall-due", description: "Marks the contact as entering the recall sequence.", function: "Creates a clear segment for follow-up and later reporting.", ghl: "Contacts > Tags > bd-recall-due" },
        { type: "action", title: "Send six-month recall email", description: "Invites the contact to plan a cleaning and check-up.", function: "Makes the future-care step visible without assuming a treatment is needed.", ghl: "Send Email > BD Email - Six Month Recall" },
        { type: "wait", title: "Wait 120 days", description: "Pauses four more months after the email; 150 days total since the care event.", function: "Places the optional text near the six-month recall window described by the source sequence.", ghl: "Wait > 120 days" },
        { type: "condition", title: "Still unbooked and SMS consent present?", description: "Checks the latest booking state and permission before the text.", function: "Skips the reminder if care is already booked or SMS is not allowed.", ghl: "If/Else > Recall status is not Booked AND bd-sms-opt-in", outcomes: [{ label: "YES", text: "Send the recall SMS." }, { label: "NO", text: "Skip SMS and end the sequence." }] },
        { type: "action", title: "Send six-month recall SMS", description: "Sends a short booking prompt to a contact who opted in.", function: "Adds one mobile reminder while honoring the contact's consent choice.", ghl: "Send SMS > BD SMS - Six Month Recall" },
        { type: "condition", title: "Recall appointment booked?", description: "Checks whether the contact scheduled after the reminders.", function: "Separates a booked return visit from an unanswered reminder sequence.", ghl: "If/Else > Recall appointment status = Booked", outcomes: [{ label: "YES", text: "Create or update the recall opportunity." }, { label: "NO", text: "End after the planned messages; do not keep chasing." }] },
        { type: "action", title: "Create or update recall opportunity", description: "Creates a visible opportunity when the contact books care.", function: "Makes recall bookings count as a separate, traceable business event.", ghl: "Opportunities > Create or update recall opportunity" },
        { type: "stop", title: "Stop on booking, opt-out, or completion", description: "Ends the recall sequence when care is booked, permission changes, or both reminders have run.", function: "Prevents unnecessary outreach after the intended action or a clear preference change.", ghl: "Workflow settings > Stop / remove from workflow" }
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
  let presentationReturnHash = "#overview";
  let presentationPreviousFocus = null;
  let presentationReturnScroll = null;
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
    const route = routeDefinitions[parts[0]] || routeDefinitions.overview;
    const view = route.view;
    const documentId = parts[1] || null;
    const anchor = route.anchor || null;
    return { view, documentId, anchor, presentation: false, presentationIndex: 0 };
  }

  function writeHash(view, documentId, replace) {
    const route = canonicalRoutes[view] || canonicalRoutes.problem;
    const next = documentId ? `#${route}/${documentId}` : `#${route}`;
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
    const journeyItem = customerJourney.find((item) => item.id === nodeId) || customerJourney[0];
    const title = document.getElementById("node-detail-title");
    const copy = document.getElementById("node-detail-copy");
    const technical = document.getElementById("node-detail-technical");
    const label = document.getElementById("node-detail-label");
    const counter = document.getElementById("journey-counter");
    const node = document.querySelector(`.journey-node[data-node="${nodeId}"]`);
    if (!title || !copy || !technical || !label || !node) return;
    const index = node.querySelector(".node-index")?.textContent || "01";
    title.textContent = detail.title;
    copy.textContent = explanationMode === "plain" ? journeyItem.plain : journeyItem.detail;
    technical.textContent = detail.technical;
    label.textContent = explanationMode === "plain" ? "Simple explanation" : "GHL setup shown";
    if (counter) counter.textContent = `${index.padStart(2, "0")} / ${String(document.querySelectorAll(".journey-node").length).padStart(2, "0")}`;
    const journeySignal = document.getElementById("journey-signal");
    if (journeySignal && !systemTrigger) {
      const progress = Math.max(0, Math.min(1, (Number.parseInt(index, 10) - 1) / (customerJourney.length - 1)));
      journeySignal.setAttribute("cx", String(55 + (850 * progress)));
      journeySignal.style.opacity = "0.9";
    }
    document.querySelectorAll(".journey-node").forEach((button) => {
      const selected = button === node;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    const detailPanel = document.getElementById("journey-node-detail");
    if (detailPanel) detailPanel.setAttribute("aria-labelledby", node.id);
  }

  function initJourney() {
    const journey = document.querySelector("[data-customer-journey]");
    if (journey) {
      journey.insertAdjacentHTML("beforeend", customerJourney.map((item, index) => `
        <button id="journey-step-${item.id}" class="journey-node${index === 0 ? " is-selected" : ""}" type="button" role="tab" aria-selected="${index === 0}" aria-controls="journey-node-detail" tabindex="${index === 0 ? "0" : "-1"}" data-node="${item.id}" data-customer-journey-step>
          <span class="node-index">${String(index + 1).padStart(2, "0")}</span>
          <i data-lucide="${item.icon}" aria-hidden="true"></i>
          <strong>${item.label}</strong>
          <small>${item.short}</small>
        </button>
      `).join(""));
    }
    const nodes = Array.from(document.querySelectorAll(".journey-node"));
    nodes.forEach((node, index) => {
      node.addEventListener("click", () => renderNode(node.dataset.node));
      node.addEventListener("keydown", (event) => {
        if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        let next = index;
        if (["ArrowRight", "ArrowDown"].includes(event.key)) next = (index + 1) % nodes.length;
        if (["ArrowLeft", "ArrowUp"].includes(event.key)) next = (index - 1 + nodes.length) % nodes.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = nodes.length - 1;
        nodes[next].focus();
        renderNode(nodes[next].dataset.node);
      });
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
    refreshIcons();
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
    const journeyEvidence = {
      ad: ["business-case-intake", "strategy-doc", "campaign-doc"],
      page: ["copy-doc", "campaign-doc"],
      form: ["funnel-doc", "copy-doc", "workflow-doc"],
      calendar: ["funnel-doc", "workflow-doc"],
      reminders: ["messages-doc", "workflow-doc"],
      consultation: ["workflow-doc", "checklist-doc"],
      whitening: ["messages-doc", "workflow-doc"],
      recall: ["messages-doc", "workflow-doc"],
      kpi: ["kpi-doc", "kpi-scorecard", "checklist-doc"]
    };
    matrix.innerHTML = `<div class="evidence-matrix-heading"><span>PROJECT ASSET MAP</span><h3>How the project assets support the system.</h3><p>Each customer step links to the completed outputs that define its message, logic, or measurement.</p></div>${customerJourney.map((step, index) => `
      <article data-evidence-step="${step.id}">
        <span>${String(index + 1).padStart(2, "0")} / ${step.label.toUpperCase()}</span>
        <h3>${step.label}</h3>
        <p>${step.plain}</p>
        <div>${journeyEvidence[step.id].map((doc) => `<a href="#deliverables/${doc}">${beginnerDocumentCopy[doc]?.label || documentTitles[doc]}</a>`).join("")}</div>
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

  function initProblemStory() {
    buildProblemSelectors();
    buildEvidenceMatrix();
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
    return node.beginnerTitle || node.title;
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
    const title = node.title;
    const tag = title.match(/tag:\s*(\S+)/i);
    if (node.type === "trigger") return `This workflow starts when: ${title.toLowerCase()}.`;
    if (node.type === "condition") return "Splits into yes and no paths so each contact gets only the step that applies.";
    if (node.type === "wait") return `Pauses the contact (${title.toLowerCase()}) before the next check.`;
    if (node.type === "handoff") return `Hands the contact to the ${title.replace(/^Start\s+/i, "")} workflow.`;
    if (node.type === "stop") return "Ends this workflow so no further messages go out.";
    if (tag) return `Tags the contact ${tag[1]} so later rules and reports can filter on it.`;
    if (/sms/i.test(title) && /send/i.test(title)) return "Sends a text, only to contacts with SMS consent.";
    if (/email/i.test(title) && /send/i.test(title)) return "Sends an email from the approved message set.";
    if (/opportunity/i.test(title)) return "Updates the consultation pipeline so the team sees the current stage.";
    return "Updates the contact record so the next rule has what it needs.";
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
    if (workflow.journeyStep) renderNode(workflow.journeyStep);

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
        if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        let next = index;
        if (["ArrowRight", "ArrowDown"].includes(event.key)) next = (index + 1) % tabs.length;
        if (["ArrowLeft", "ArrowUp"].includes(event.key)) next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = tabs.length - 1;
        tabs[next].focus();
        renderWorkflow(tabs[next].dataset.workflow);
      });
    });
    renderWorkflow(activeWorkflow);
  }

  const countedElements = new WeakSet();
  let countObserver = null;

  function runCountUp(element) {
    if (countedElements.has(element)) return;
    countedElements.add(element);
    const match = element.textContent.match(/^(\D*)(\d+)(.*)$/s);
    if (!match || reduceMotion()) return;
    const [, prefix, digits, suffix] = match;
    const target = Number(digits);
    const duration = Math.min(1100, 500 + target * 12);
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = `${prefix}${Math.round(target * eased)}${suffix}`;
      if (progress < 1) window.requestAnimationFrame(step);
    };
    element.textContent = `${prefix}0${suffix}`;
    window.requestAnimationFrame(step);
  }

  function setupCountUps() {
    if (reduceMotion() || !("IntersectionObserver" in window)) return;
    if (!countObserver) {
      countObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          countObserver.unobserve(entry.target);
          runCountUp(entry.target);
        });
      }, { threshold: 0.6 });
    }
    document.querySelectorAll(".orientation-strip strong, .target-card > strong").forEach((element) => {
      if (!countedElements.has(element) && element.offsetParent !== null) countObserver.observe(element);
    });
  }

  function setupFunnelChart() {
    const chart = document.querySelector(".funnel-chart");
    const plot = chart?.querySelector(".funnel-plot");
    const tooltip = plot?.querySelector(".funnel-tooltip");
    if (!plot || !tooltip) return;
    const show = (bar) => {
      const series = bar.dataset.series === "projected" ? "PROJECTED GOAL" : "WORKSHOP BASELINE";
      tooltip.textContent = "";
      const title = document.createElement("strong");
      title.textContent = `${series} · ${bar.querySelector(".funnel-value")?.textContent || ""}`;
      const note = document.createElement("span");
      note.textContent = bar.dataset.tip || "";
      tooltip.append(title, note);
      tooltip.hidden = false;
      const plotBox = plot.getBoundingClientRect();
      const barBox = bar.querySelector("i").getBoundingClientRect();
      const left = Math.min(Math.max(0, barBox.right - plotBox.left + 12), plotBox.width - tooltip.offsetWidth);
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${barBox.top - plotBox.top - tooltip.offsetHeight - 8}px`;
    };
    const hide = () => { tooltip.hidden = true; };
    plot.querySelectorAll(".funnel-bar[data-tip]").forEach((bar) => {
      bar.addEventListener("mouseenter", () => show(bar));
      bar.addEventListener("focus", () => show(bar));
      bar.addEventListener("mouseleave", hide);
      bar.addEventListener("blur", hide);
    });
    if (reduceMotion() || !("IntersectionObserver" in window)) {
      chart.classList.add("is-drawn");
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      chart.classList.add("is-drawn");
      observer.disconnect();
    }, { threshold: 0.35 });
    observer.observe(chart);
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
    window.gsap.fromTo(".scene-segment:not([data-wf=\"no-show-recovery\"])", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, stagger: 0.12, delay: 0.3, ease: "power1.inOut" });
    window.gsap.from(".scene-node", { scale: 0.6, transformOrigin: "center", opacity: 0, duration: 0.4, stagger: 0.1, delay: 0.3, ease: "back.out(1.6)" });
    window.gsap.from(".scene-badge", { opacity: 0, y: 6, duration: 0.35, stagger: 0.08, delay: 1.3, ease: "power2.out" });
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

  // The most recent navigation request. A view transition that is skipped because a newer
  // one started still runs its update, so every update applies the latest request.
  let latestViewRequest = null;

  function setView(view, options = {}) {
    const nextView = views.includes(view) ? view : "problem";
    const canTransition = typeof document.startViewTransition === "function"
      && !reduceMotion()
      && options.replace !== true
      && options.transition !== false
      && nextView !== activeView;
    if (canTransition) {
      if (options.updateUrl !== false) {
        writeViewUrl(nextView, options);
      }
      // Tabs and title reflect the destination immediately; the panel swap animates.
      updateTabs(nextView);
      document.title = viewTitles[nextView] || viewTitles.problem;
      latestViewRequest = { view: nextView, options: { ...options, updateUrl: false } };
      const transition = document.startViewTransition(() => {
        if (latestViewRequest) applyView(latestViewRequest.view, latestViewRequest.options);
      });
      // A newer navigation skips this transition; that is expected, not an error.
      transition.ready.catch(() => {});
      transition.finished.catch(() => {});
      return;
    }
    latestViewRequest = { view: nextView, options: { ...options, updateUrl: false } };
    applyView(nextView, options);
  }

  const anchorHashes = { "automation-workflows": "#automation", contact: "#contact" };

  function writeViewUrl(nextView, options) {
    const anchorHash = anchorHashes[options.anchor];
    if (anchorHash) {
      if (options.replace === true) window.history.replaceState(null, "", anchorHash);
      else if (window.location.hash !== anchorHash) window.history.pushState(null, "", anchorHash);
    } else {
      writeHash(nextView, nextView === "evidence" ? activeDocument : null, options.replace === true);
    }
  }

  const viewTitles = {
    problem: "Andre Imperial | GHL Consultation Funnel & Automation Case Study",
    solution: "System · Andre Imperial, GHL automation case study",
    build: "Build process · Andre Imperial, GHL automation case study",
    measurement: "Measurement · Andre Imperial, GHL automation case study",
    conclusion: "Conclusion · Andre Imperial, GHL automation case study",
    evidence: "Deliverables · Andre Imperial, GHL automation case study"
  };

  function applyView(nextView, options = {}) {
    activeView = nextView;
    document.title = viewTitles[nextView] || viewTitles.problem;
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
    if (options.updateUrl !== false) writeViewUrl(nextView, options);
    initMotion(nextView);
    setupCountUps();
    if (options.scroll !== false) {
      window.requestAnimationFrame(() => {
        const behavior = options.replace ? "auto" : (reduceMotion() ? "auto" : "smooth");
        if (options.anchor) {
          const target = document.getElementById(options.anchor);
          if (!target) return;
          const scrollMargin = Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0;
          const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - scrollMargin);
          window.scrollTo({ top, behavior });
          if (options.focus) target.focus({ preventScroll: true });
        } else if (nextView === "problem") {
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
      const strip = button.parentElement;
      if (selected && strip && strip.scrollWidth > strip.clientWidth) {
        const left = button.offsetLeft - strip.offsetLeft;
        if (left < strip.scrollLeft || left + button.offsetWidth > strip.scrollLeft + strip.clientWidth) {
          strip.scrollTo({ left: Math.max(0, left - 16), behavior: reduceMotion() ? "auto" : "smooth" });
        }
      }
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
      presentationReturnScroll = window.location.hash.startsWith("#present") ? null : window.scrollY;
      if (!window.location.hash.startsWith("#present")) presentationReturnHash = window.location.hash || "#overview";
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

    const returnHash = options.returnHash || presentationReturnHash || "#overview";
    if (options.updateUrl !== false && window.location.hash !== returnHash) window.history.replaceState(null, "", returnHash);
    const state = getHashState();
    if (state.documentId) activeDocument = state.documentId;
    const returnToScroll = presentationReturnScroll !== null && state.view === activeView;
    setView(state.view, { updateUrl: false, scroll: options.scroll !== false && !returnToScroll, anchor: returnToScroll ? null : state.anchor });
    if (returnToScroll) window.scrollTo(0, presentationReturnScroll);
    if (options.restoreFocus !== false) presentationPreviousFocus?.focus?.({ preventScroll: true });
    presentationPreviousFocus = null;
    presentationReturnScroll = null;
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
      closePresentation({ updateUrl: false, returnHash: window.location.hash || "#overview" });
      return;
    }
    if (state.documentId) activeDocument = state.documentId;
    const documentAnchor = state.view === "evidence" && state.documentId ? `docs-panel-${state.documentId}` : null;
    setView(state.view, { updateUrl: false, anchor: state.anchor || documentAnchor });
  }

  function initPresentation() {
    const slides = Array.from(document.querySelectorAll("[data-presentation-slide]"));
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
        closePresentation({ returnHash: "#system" });
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

    const heroScene = document.querySelector(".hero-scene");
    document.querySelectorAll("[data-workflow-link]").forEach((link) => {
      const workflowId = link.dataset.workflowLink;
      const highlight = (on) => {
        heroScene?.classList.toggle("is-highlighting", on);
        heroScene?.querySelectorAll(`[data-wf="${workflowId}"]`).forEach((part) => part.classList.toggle("is-highlighted", on));
      };
      link.addEventListener("mouseenter", () => highlight(true));
      link.addEventListener("mouseleave", () => highlight(false));
      link.addEventListener("focus", () => highlight(true));
      link.addEventListener("blur", () => highlight(false));
      link.addEventListener("click", (event) => {
        event.preventDefault();
        highlight(false);
        renderWorkflow(workflowId);
        setView("solution", { anchor: "automation-workflows" });
      });
    });

    document.querySelectorAll('a[href="#contact"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        if (window.location.hash !== "#contact") window.history.pushState(null, "", "#contact");
        setView("conclusion", { updateUrl: false, anchor: "contact", focus: true });
      });
    });

    document.querySelectorAll("[data-tour-start]").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        setView("problem", { scroll: false });
        window.requestAnimationFrame(() => {
          document.getElementById("at-a-glance")?.scrollIntoView({ block: "start", behavior: reduceMotion() ? "auto" : "smooth" });
        });
      });
    });

    const documentTabs = Array.from(document.querySelectorAll(".doc-tab"));
    documentTabs.forEach((button, index) => {
      button.addEventListener("click", () => {
        activateDocument(button.dataset.doc, true);
        setView("evidence", { updateUrl: false, anchor: `docs-panel-${button.dataset.doc}` });
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
        setView("evidence", { updateUrl: false, anchor: "deliverables-layout" });
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

  function watchNavOverflow() {
    const nav = document.querySelector(".primary-nav");
    if (!nav) return;
    const update = () => {
      const overflow = nav.scrollWidth - nav.clientWidth;
      nav.classList.toggle("is-overflowing", overflow > 1 && nav.scrollLeft < overflow - 1);
    };
    nav.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  function start() {
    setupFunnelChart();
    initProblemStory();
    initJourney();
    initWorkflowLab();
    initPresentation();
    initNavigation();
    watchNavOverflow();
    initKpiDiagnostics();
    disableSignalForReducedMotion();
    const state = getHashState();
    if (state.presentation) {
      openPresentation(state.presentationIndex, { updateUrl: false, focus: false });
    } else {
      if (state.documentId) activeDocument = state.documentId;
      setView(state.view, { replace: true, scroll: state.view !== "problem", anchor: state.anchor });
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

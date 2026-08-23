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

  const presentationChapters = [
    { name: "Context", start: 0, end: 3 },
    { name: "Journey", start: 4, end: 7 },
    { name: "Build", start: 8, end: 11 },
    { name: "Automation", start: 12, end: 14 },
    { name: "Measurement", start: 15, end: 17 }
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
  let presentationNotesOpen = false;
  let presentationOutlineOpen = false;

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
    if (updateUrl) writeHash("deliverables", requested, false);
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

  function hydratePresentationNotes() {
    document.querySelectorAll(".presentation-message").forEach((message, index) => {
      const notes = presentationNotes[index];
      if (!notes) return;
      message.textContent = "";
      message.hidden = true;

      const label = document.createElement("span");
      label.textContent = "PRESENTER NOTES";
      const talk = document.createElement("div");
      talk.className = "presentation-talk";
      const title = document.createElement("h3");
      title.textContent = notes.title;
      talk.appendChild(title);
      notes.paragraphs.forEach((copy) => {
        const paragraph = document.createElement("p");
        paragraph.textContent = copy;
        talk.appendChild(paragraph);
      });
      const list = document.createElement("ul");
      notes.bullets.forEach((copy) => {
        const item = document.createElement("li");
        item.textContent = copy;
        list.appendChild(item);
      });
      talk.appendChild(list);
      const prompt = document.createElement("p");
      prompt.className = "presentation-prompt";
      prompt.textContent = `Speaking prompt: ${presentationPrompts[index]}`;
      talk.appendChild(prompt);
      const transition = document.createElement("p");
      transition.className = "presentation-transition";
      transition.textContent = `Transition: ${notes.transition}`;
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
      if (!window.location.hash.startsWith("#present")) presentationReturnHash = window.location.hash || "#tour";
      overlay.hidden = false;
      overlay.setAttribute("aria-hidden", "false");
      document.body.classList.add("is-presentation-open");
      setPresentationBackgroundInert(true);
      setPresentationNotes(false);
      setPresentationOutline(false);
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
    hydratePresentationNotes();
    const chapterContainer = document.getElementById("presentation-chapters");
    if (chapterContainer) {
      chapterContainer.textContent = "";
      presentationChapters.forEach((chapter, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.role = "tab";
        button.setAttribute("aria-selected", String(index === 0));
        button.setAttribute("aria-controls", `presentation-slide-${chapter.start + 1}`);
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
    document.getElementById("presentation-outline-toggle")?.addEventListener("click", () => setPresentationOutline(!presentationOutlineOpen));
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
        if (presentationOutlineOpen) {
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
        setView("tour", { scroll: false });
        window.requestAnimationFrame(() => {
          document.getElementById("view-tour")?.scrollIntoView({ block: "start", behavior: reduceMotion() ? "auto" : "smooth" });
        });
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

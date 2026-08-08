const tabGroups = new Map();

document.querySelectorAll("[data-tab-group]").forEach((group) => {
  const groupName = group.dataset.tabGroup;
  const tabs = Array.from(group.querySelectorAll('[role="tab"]'));
  const panels = tabs
    .map((tab) => document.getElementById(tab.getAttribute("aria-controls")))
    .filter(Boolean);
  const validTabs = new Set(tabs.map((tab) => tab.dataset.tab));
  const defaultTab = tabs.find((tab) => tab.getAttribute("aria-selected") === "true")?.dataset.tab || tabs[0]?.dataset.tab;

  function activate(tabName, options = {}) {
    const nextName = validTabs.has(tabName) ? tabName : defaultTab;

    tabs.forEach((tab) => {
      const isActive = tab.dataset.tab === nextName;
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });

    const activePanelId = tabs.find((tab) => tab.dataset.tab === nextName)?.getAttribute("aria-controls");
    panels.forEach((panel) => {
      panel.hidden = panel.id !== activePanelId;
    });

    if (options.focus) {
      tabs.find((tab) => tab.dataset.tab === nextName)?.focus();
    }

    if (options.updateHash) {
      history.pushState({ group: groupName, tab: nextName }, "", `#${nextName}`);
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(tab.dataset.tab, { updateHash: groupName === "case" }));
    tab.addEventListener("keydown", (event) => {
      const lastIndex = tabs.length - 1;
      let nextIndex = index;

      if (event.key === "ArrowRight") nextIndex = index === lastIndex ? 0 : index + 1;
      if (event.key === "ArrowLeft") nextIndex = index === 0 ? lastIndex : index - 1;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = lastIndex;

      if (nextIndex !== index) {
        event.preventDefault();
        activate(tabs[nextIndex].dataset.tab, { focus: true, updateHash: groupName === "case" });
      }
    });
  });

  activate(defaultTab);
  tabGroups.set(groupName, { activate, validTabs, defaultTab });
});

const caseViewTabs = Array.from(document.querySelectorAll("[data-case-view-tab]"));
const caseViewPanels = Array.from(document.querySelectorAll("[data-case-panel]"));
const caseViewTargets = new Map(caseViewTabs.map((tab) => [tab.dataset.caseViewTab, tab.dataset.caseTarget]));

function caseViewForHash(hash) {
  if (!hash) return "overview";

  const matchingPanel = caseViewPanels.find((panel) => panel.id === hash || panel.querySelector(`#${CSS.escape(hash)}`));
  if (matchingPanel) return matchingPanel.dataset.casePanel;

  if (tabGroups.get("case")?.validTabs.has(hash)) return "overview";
  if (hash.startsWith("docs-panel-") || tabGroups.get("docs")?.validTabs.has(hash)) return "documents";

  return "overview";
}

function activateCaseView(viewName, options = {}) {
  if (!caseViewTabs.length || !caseViewPanels.length) return;

  const nextView = caseViewTargets.has(viewName) ? viewName : "overview";

  caseViewTabs.forEach((tab) => {
    const isActive = tab.dataset.caseViewTab === nextView;
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  });

  caseViewPanels.forEach((panel) => {
    panel.hidden = panel.dataset.casePanel !== nextView;
  });

  if (options.updateHash) {
    const target = options.target || caseViewTargets.get(nextView);
    if (target) {
      history.pushState({ caseView: nextView }, "", `#${target}`);
      document.getElementById(target)?.scrollIntoView({ block: "start" });
    }
  }

  if (options.focus) {
    caseViewTabs.find((tab) => tab.dataset.caseViewTab === nextView)?.focus();
  }
}

caseViewTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateCaseView(tab.dataset.caseViewTab, { updateHash: true }));
  tab.addEventListener("keydown", (event) => {
    const lastIndex = caseViewTabs.length - 1;
    let nextIndex = index;

    if (event.key === "ArrowRight") nextIndex = index === lastIndex ? 0 : index + 1;
    if (event.key === "ArrowLeft") nextIndex = index === 0 ? lastIndex : index - 1;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = lastIndex;

    if (nextIndex !== index) {
      event.preventDefault();
      activateCaseView(caseViewTabs[nextIndex].dataset.caseViewTab, { focus: true, updateHash: true });
    }
  });
});

function activateFromHash() {
  const hash = window.location.hash.slice(1);
  activateCaseView(caseViewForHash(hash));

  const caseTabs = tabGroups.get("case");
  let scrollTarget = hash;
  if (caseTabs?.validTabs.has(hash)) {
    caseTabs.activate(hash);
    scrollTarget = document.getElementById(hash) ? hash : "strategy";
  } else {
    caseTabs?.activate(caseTabs.defaultTab);
  }

  const docsTabs = tabGroups.get("docs");
  if (caseViewForHash(hash) === "documents" && docsTabs) {
    const nestedDocMatch = hash.match(/^docs-panel-(.+?)(?:-section-\d+)?$/);
    const docName = docsTabs.validTabs.has(hash)
      ? hash
      : nestedDocMatch && docsTabs.validTabs.has(nestedDocMatch[1])
        ? nestedDocMatch[1]
        : docsTabs.defaultTab;
    docsTabs.activate(docName);
    scrollTarget = document.getElementById(hash) ? hash : "documents";
  }

  if (scrollTarget) {
    window.requestAnimationFrame(() => {
      const target = document.getElementById(scrollTarget);
      if (!target) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const top = target.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
    });
  }
}

window.addEventListener("popstate", activateFromHash);
window.addEventListener("hashchange", activateFromHash);
activateFromHash();

const documentProfiles = {
  "docs-panel-strategy-doc": {
    type: "Strategy",
    output: "Diagnosis, positioning, KPIs",
    buildState: "Foundation",
    context: "This explains the clinic, the audience, the bottleneck, and why the campaign should focus on booking and follow-up instead of broad awareness.",
    question: "What is stopping interested people from becoming attended consultations?",
    flow: ["Clinic facts", "Audience", "Bottleneck", "Offer", "Goals"],
    handoff: "The campaign plan receives a defined audience, offer, positioning, and measurable goal."
  },
  "docs-panel-campaign-doc": {
    type: "Campaign",
    output: "Channel roles, flow, risks",
    buildState: "Operating plan",
    context: "This turns the strategy into a 60-day campaign plan: where traffic comes from, what each channel does, and what could go wrong.",
    question: "How will the offer reach the right people and move them toward booking?",
    flow: ["Goal", "Audience", "Channel", "Message", "60-day plan"],
    handoff: "The funnel blueprint receives the traffic source, offer promise, campaign timing, and conversion target."
  },
  "docs-panel-funnel-doc": {
    type: "Funnel",
    output: "Lead path and GHL handoff",
    buildState: "Journey map",
    context: "This shows the exact journey a prospective patient would follow, from seeing an ad to booking, attending, receiving whitening follow-up, and entering recall.",
    question: "What should happen at every step after someone clicks the ad?",
    flow: ["Ad", "Page", "Form", "Calendar", "Consult", "Follow-up"],
    handoff: "The copy and automation documents receive an exact list of pages, messages, decisions, and customer states."
  },
  "docs-panel-copy-doc": {
    type: "Conversion",
    output: "Landing page and objections",
    buildState: "Copy system",
    context: "This is the patient-facing page copy. It explains the offer, reduces concerns about time, price, and pressure, and guides people toward booking.",
    question: "What does a visitor need to understand and believe before submitting the form?",
    flow: ["Problem", "Promise", "Benefits", "Trust", "FAQ", "CTA"],
    handoff: "The finished page copy moves into the GHL landing-page builder and connects to the inquiry form."
  },
  "docs-panel-messages-doc": {
    type: "Messaging",
    output: "Email and SMS sequence",
    buildState: "Nurture layer",
    context: "This contains the automated messages that confirm bookings, remind patients, recover no-shows, and follow up after consultations.",
    question: "What should the lead hear at each moment so they keep moving?",
    flow: ["Form reply", "Booking", "24h reminder", "2h reminder", "Recovery", "Upsell"],
    handoff: "The workflow specification receives approved messages matched to triggers, waiting periods, and appointment outcomes."
  },
  "docs-panel-workflow-doc": {
    type: "Automation",
    output: "Triggers, branches, stop rules",
    buildState: "GHL spec",
    context: "This translates the patient journey into automation logic: what starts each workflow, what message sends, when the system waits, and when it stops.",
    question: "What should GoHighLevel do automatically when a lead takes an action?",
    flow: ["Trigger", "Action", "Wait", "Condition", "Branch", "Stop"],
    handoff: "The build checklist receives exact GHL objects and rules that can be configured and tested."
  },
  "docs-panel-kpi-doc": {
    type: "Analytics",
    output: "Metrics, formulas, actions",
    buildState: "Measurement loop",
    context: "This explains how the campaign would be judged after launch, including the core metrics, formulas, dashboard widgets, and weekly improvement rules.",
    question: "Which number tells us where the customer journey is leaking?",
    flow: ["Ad clicks", "Leads", "Bookings", "Shows", "Whitening", "Recall"],
    handoff: "A weekly review receives clear metrics and a rule for choosing which stage to improve first."
  },
  "docs-panel-checklist-doc": {
    type: "Implementation",
    output: "Paste-ready build tasks",
    buildState: "Launch checklist",
    context: "This is the practical setup list for building the system in GoHighLevel: pipeline, tags, fields, calendar, form, messages, workflows, and dashboard.",
    question: "What must be built, connected, and tested before this system is launch-ready?",
    flow: ["Foundation", "Capture", "Schedule", "Automate", "Measure", "Test"],
    handoff: "The finished checklist becomes the implementation and QA record for the complete GHL build."
  }
};

document.querySelectorAll(".document-panel").forEach((panel) => {
  const article = panel.querySelector(".document-markdown");
  const aside = panel.querySelector(".document-layout aside");
  const content = panel.querySelector(".document-content");
  if (!article || !aside) return;

  const title = article.querySelector("h4");
  const sectionHeadings = Array.from(article.querySelectorAll("h5"));
  if (!sectionHeadings.length) return;

  if (title) {
    title.classList.add("document-title");
  }

  const progress = document.createElement("div");
  progress.className = "doc-progress";
  progress.innerHTML = '<span style="width: 0%"></span>';
  article.prepend(progress);

  const toc = document.createElement("nav");
  toc.className = "doc-mini-toc";
  toc.setAttribute("aria-label", "Deliverable sections");
  toc.innerHTML = "<strong>Module jump list</strong>";
  const tocList = document.createElement("ol");
  toc.append(tocList);
  aside.append(toc);

  sectionHeadings.forEach((heading, index) => {
    const section = document.createElement("section");
    section.className = "doc-section";
    section.id = `${panel.id}-section-${index + 1}`;
    heading.before(section);
    section.append(heading);

    let sibling = section.nextSibling;
    while (sibling && !(sibling.nodeType === Node.ELEMENT_NODE && sibling.matches("h5"))) {
      const next = sibling.nextSibling;
      section.append(sibling);
      sibling = next;
    }

    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = `#${section.id}`;
    link.textContent = heading.textContent;
    item.append(link);
    tocList.append(item);
  });

  const profile = documentProfiles[panel.id] || {
    type: "Deliverable",
    output: "Workshop artifact",
    buildState: "Reference",
    question: "What decision does this deliverable make easier?",
    flow: ["Input", "Decision", "Output"],
    handoff: "The next phase receives a clear, usable output."
  };
  const callout = panel.querySelector(".doc-callout");
  const calloutText = callout?.querySelector("p")?.textContent.trim() || "Review the core decisions and implementation details for this deliverable.";
  const sourceNote = content?.querySelector(".source-note");
  if (sourceNote) {
    sourceNote.textContent = "Full deliverable content, organized into scannable modules";
  }

  const dashboard = document.createElement("div");
  dashboard.className = "doc-interface";
  dashboard.setAttribute("aria-label", "Deliverable interface summary");
  dashboard.innerHTML = `
    <div class="doc-interface-main">
      <span>${profile.type}</span>
      <strong>${profile.output}</strong>
      <p>${calloutText}</p>
      <p class="doc-context-note">${profile.context}</p>
    </div>
    <div class="doc-blueprint" aria-label="Visual deliverable blueprint">
      <div class="doc-blueprint-heading">
        <span>Question this document answers</span>
        <strong>${profile.question}</strong>
      </div>
      <div class="doc-flow" aria-label="Deliverable logic flow">
        ${profile.flow.map((step, index) => `<div><span>${String(index + 1).padStart(2, "0")}</span><strong>${step}</strong></div>`).join("")}
      </div>
      <div class="doc-decision-grid">
        <div>
          <span>Key decision</span>
          <p>${calloutText}</p>
        </div>
        <div>
          <span>What the next phase receives</span>
          <p>${profile.handoff}</p>
        </div>
      </div>
    </div>
    <div class="doc-stat-grid" aria-label="Deliverable facts">
      <div>
        <span>Modules</span>
        <strong>${sectionHeadings.length}</strong>
      </div>
      <div>
        <span>Status</span>
        <strong>${profile.buildState}</strong>
      </div>
      <div>
        <span>Use</span>
        <strong>Review + build</strong>
      </div>
    </div>
    <div class="doc-module-launcher" aria-label="Open deliverable modules">
      ${sectionHeadings
        .slice(0, 6)
        .map((heading, index) => `<a href="#${heading.parentElement.id}"><span>${String(index + 1).padStart(2, "0")}</span>${heading.textContent}</a>`)
        .join("")}
    </div>
  `;

  article.id = `${panel.id}-full-document`;
  article.hidden = true;

  const evidenceControl = document.createElement("div");
  evidenceControl.className = "doc-evidence-control";
  evidenceControl.innerHTML = `
    <div>
      <span>Full working document</span>
      <strong>${sectionHeadings.length} detailed modules are available as supporting evidence.</strong>
    </div>
    <button type="button" aria-expanded="false" aria-controls="${article.id}">Open full document</button>
  `;

  const evidenceButton = evidenceControl.querySelector("button");
  const setDocumentExpanded = (expanded) => {
    article.hidden = !expanded;
    evidenceButton.setAttribute("aria-expanded", String(expanded));
    evidenceButton.textContent = expanded ? "Hide full document" : "Open full document";
  };

  evidenceButton.addEventListener("click", () => {
    const expanded = evidenceButton.getAttribute("aria-expanded") !== "true";
    setDocumentExpanded(expanded);
    if (expanded) {
      window.requestAnimationFrame(() => article.scrollIntoView({ block: "start" }));
    }
  });

  const openDocumentSection = (event) => {
    const targetId = event.currentTarget.getAttribute("href")?.slice(1);
    const target = targetId ? document.getElementById(targetId) : null;
    if (!target) return;

    event.preventDefault();
    setDocumentExpanded(true);
    history.pushState({}, "", `#${targetId}`);
    window.requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
  };

  dashboard.querySelectorAll(".doc-module-launcher a").forEach((link) => link.addEventListener("click", openDocumentSection));
  toc.querySelectorAll("a").forEach((link) => link.addEventListener("click", openDocumentSection));

  const initialSectionId = window.location.hash.slice(1);
  if (initialSectionId.startsWith(`${panel.id}-section-`)) {
    setDocumentExpanded(true);
    window.requestAnimationFrame(() => document.getElementById(initialSectionId)?.scrollIntoView({ block: "start" }));
  }

  callout?.remove();
  if (sourceNote) {
    sourceNote.before(dashboard);
    sourceNote.replaceWith(evidenceControl);
  } else {
    article.before(dashboard);
    dashboard.after(evidenceControl);
  }

  article.addEventListener("scroll", () => {
    const max = article.scrollHeight - article.clientHeight;
    const percent = max > 0 ? (article.scrollTop / max) * 100 : 0;
    progress.querySelector("span").style.width = `${Math.min(100, Math.max(0, percent))}%`;
  });
});

document.querySelectorAll("[data-open-doc]").forEach((link) => {
  link.addEventListener("click", () => {
    const docTab = link.dataset.openDoc;
    activateCaseView("documents");
    window.setTimeout(() => {
      tabGroups.get("docs")?.activate(docTab);
      document.getElementById("documents")?.scrollIntoView({ block: "start" });
    }, 0);
  });
});

const phaseFilterButtons = Array.from(document.querySelectorAll("[data-phase-filter]"));
const implementationCards = Array.from(document.querySelectorAll("[data-phase-status]"));
const phaseFilterStatus = document.querySelector(".filter-status");

phaseFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.phaseFilter;
    let visibleCount = 0;

    phaseFilterButtons.forEach((item) => {
      item.setAttribute("aria-pressed", String(item === button));
    });

    implementationCards.forEach((card) => {
      const isVisible = filter === "all" || card.dataset.phaseStatus === filter;
      card.hidden = !isVisible;
      if (!isVisible) card.open = false;
      if (isVisible) visibleCount += 1;
    });

    if (phaseFilterStatus) {
      const label = button.firstChild?.textContent.trim().toLowerCase() || filter;
      phaseFilterStatus.textContent = `Showing ${visibleCount} ${label === "all" ? "project" : label} phase${visibleCount === 1 ? "" : "s"}.`;
    }
  });
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

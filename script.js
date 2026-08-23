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

  let activeView = "tour";
  let activeDocument = "strategy-doc";
  let explanationMode = "plain";
  let systemTrigger = null;
  let revealObserver = null;
  let presentationIndex = 0;
  let presentationReturnHash = "#tour";
  let presentationPreviousFocus = null;

  const reduceMotion = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function getHashState() {
    const raw = window.location.hash.replace(/^#/, "");
    const parts = raw.split("/");
    if (parts[0] === "present") {
      const requested = Number.parseInt(parts[1] || "1", 10);
      const slide = Number.isFinite(requested) ? Math.max(1, Math.min(7, requested)) : 1;
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
    window.gsap.set(path, { strokeDashoffset: 1 });
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
          onUpdate: (self) => { path.style.strokeDashoffset = String(1 - self.progress); }
        });
      } else {
        window.gsap.to(path, { strokeDashoffset: 0, duration: 1.2, ease: "power2.out" });
      }
    } else {
      window.gsap.to(path, { strokeDashoffset: 0, duration: 1.2, ease: "power2.out" });
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
    const previous = document.getElementById("presentation-prev");
    const next = document.getElementById("presentation-next");
    if (step) step.textContent = String(presentationIndex + 1).padStart(2, "0");
    if (total) total.textContent = String(slides.length).padStart(2, "0");
    if (progress) progress.setAttribute("aria-valuenow", String(presentationIndex + 1));
    if (progressFill) progressFill.style.transform = `scaleX(${(presentationIndex + 1) / slides.length})`;
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

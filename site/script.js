const signalData = {
  repetition: {
    kicker: "WORKFLOW FRICTION",
    title: "Reduce the steps that keep repeating.",
    copy: "A focused workflow can reduce copying, checking or re-keying while keeping the team in control.",
    flow: ["Input", "Useful system", "Human review"]
  },
  decisions: {
    kicker: "DECISION FRICTION",
    title: "Turn scattered information into a clearer view.",
    copy: "Analysis can bring customer, campaign or operating data together so the next question is easier to answer.",
    flow: ["Data", "Clearer view", "Decision"]
  },
  confidence: {
    kicker: "ADOPTION FRICTION",
    title: "Build confidence through guided practice.",
    copy: "Applied training helps people understand where AI fits into their work and practise using it in context.",
    flow: ["Real task", "Guided practice", "Repeatable method"]
  }
};

const projectData = {
  reviews: {
    kicker: "REVIEW INTELLIGENCE",
    title: "Google review collection and categorisation",
    summary: "A workflow concept that gathers public reviews, groups recurring themes and makes qualitative feedback easier to scan before a deeper analysis.",
    situation: "Reviews sit across separate profiles and take time to check consistently.",
    thinking: "Bring the information into a familiar view before adding unnecessary software.",
    output: "A consolidated review dataset organised for scanning and deeper analysis.",
    bars: [42, 67, 53, 82, 62, 91]
  },
  assistants: {
    kicker: "AI SYSTEMS · TEAM ENABLEMENT",
    title: "Role-specific AI assistants",
    summary: "Assistants designed around a defined department workflow—such as HR, marketing or operations—with clear boundaries and human review.",
    situation: "Teams need consistent support inside a specific workflow.",
    thinking: "Define the role, source material and review boundaries before choosing the tool.",
    output: "A scoped assistant pattern with clear human checkpoints.",
    bars: [78, 45, 86, 58, 72, 52]
  },
  content: {
    kicker: "CONTENT OPERATIONS",
    title: "Long-form to short-form workflow",
    summary: "A repeatable process for identifying useful moments in long-form video and preparing shorter assets for different channels.",
    situation: "Long-form material contains useful moments that are difficult to find and repurpose consistently.",
    thinking: "Separate selection, preparation and channel adaptation into clear steps.",
    output: "A repeatable content-operations workflow.",
    bars: [32, 54, 88, 46, 74, 64]
  },
  training: {
    kicker: "APPLIED AI TRAINING",
    title: "Live automation session",
    summary: "A live beginner-friendly session where participants built a workflow that turns a form submission into a personalised PDF and email response.",
    situation: "Beginners need to connect AI and automation concepts to something tangible.",
    thinking: "Learn through a guided build using a practical end-to-end example.",
    output: "A working form-to-PDF-and-email workflow completed during the session.",
    bars: [24, 43, 60, 71, 83, 94]
  }
};

const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");
if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }));
}

const header = document.querySelector("[data-header]");
const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 20);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const signalTabs = [...document.querySelectorAll(".signal-tab")];
const signalResult = document.querySelector(".signal-result");
const signalCard = document.querySelector(".system-card");
let signalIndex = 0;
let signalTimer;

const selectSignal = (tab, resetTimer = false) => {
  const data = signalData[tab?.dataset.signal];
  if (!data) return;
  signalIndex = signalTabs.indexOf(tab);
  signalTabs.forEach((item) => {
    const active = item === tab;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-selected", String(active));
  });
  signalResult.dataset.activeSignal = tab.dataset.signal;
  signalResult.classList.remove("is-changing");
  void signalResult.offsetWidth;
  signalResult.classList.add("is-changing");
  document.querySelector("[data-signal-kicker]").textContent = data.kicker;
  document.querySelector("[data-signal-title]").textContent = data.title;
  document.querySelector("[data-signal-copy]").textContent = data.copy;
  const flow = document.querySelector(".signal-flow");
  flow.innerHTML = data.flow.map((item, index) => `${index ? "<b>→</b>" : ""}<span>${item}</span>`).join("");
  if (resetTimer) startSignalCarousel();
};

const stopSignalCarousel = () => window.clearInterval(signalTimer);
const startSignalCarousel = () => {
  stopSignalCarousel();
  if (reducedMotion || signalTabs.length < 2) return;
  signalTimer = window.setInterval(() => {
    signalIndex = (signalIndex + 1) % signalTabs.length;
    selectSignal(signalTabs[signalIndex]);
  }, 3500);
};

signalTabs.forEach((tab) => tab.addEventListener("click", () => selectSignal(tab, true)));
if (signalCard) {
  signalCard.addEventListener("mouseenter", stopSignalCarousel);
  signalCard.addEventListener("mouseleave", startSignalCarousel);
  signalCard.addEventListener("focusin", stopSignalCarousel);
  signalCard.addEventListener("focusout", (event) => {
    if (!signalCard.contains(event.relatedTarget)) startSignalCarousel();
  });
}

document.querySelectorAll(".work-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const key = tab.dataset.project;
    const data = projectData[key];
    if (!data) return;
    document.querySelectorAll(".work-tab").forEach((item) => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    });
    document.querySelector("[data-project-kicker]").textContent = data.kicker;
    document.querySelector("[data-project-title]").textContent = data.title;
    document.querySelector("[data-project-summary]").textContent = data.summary;
    document.querySelector("[data-project-situation]").textContent = data.situation;
    document.querySelector("[data-project-thinking]").textContent = data.thinking;
    document.querySelector("[data-project-output]").textContent = data.output;
    const visual = document.querySelector("[data-project-visual]");
    visual.dataset.projectVisual = key;
    visual.querySelectorAll(".project-bars span").forEach((bar, index) => bar.style.height = `${data.bars[index]}%`);
  });
});

document.querySelectorAll("[data-year]").forEach((item) => item.textContent = new Date().getFullYear());

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
startSignalCarousel();

document.querySelectorAll("[data-auto-method]").forEach((visual) => {
  const controls = [...visual.querySelectorAll("[data-method-control]")];
  let activeIndex = Math.max(0, controls.findIndex((control) => control.classList.contains("is-active")));
  let methodTimer;

  const selectMethod = (index) => {
    activeIndex = index;
    controls.forEach((control, controlIndex) => {
      const active = controlIndex === activeIndex;
      control.classList.toggle("is-active", active);
      control.setAttribute("aria-pressed", String(active));
    });
  };

  const stopMethod = () => window.clearInterval(methodTimer);
  const startMethod = () => {
    stopMethod();
    if (reducedMotion || controls.length < 2) return;
    methodTimer = window.setInterval(() => selectMethod((activeIndex + 1) % controls.length), 2800);
  };

  controls.forEach((control, index) => control.addEventListener("click", () => {
    selectMethod(index);
    startMethod();
  }));
  visual.addEventListener("mouseenter", stopMethod);
  visual.addEventListener("mouseleave", startMethod);
  visual.addEventListener("focusin", stopMethod);
  visual.addEventListener("focusout", (event) => {
    if (!visual.contains(event.relatedTarget)) startMethod();
  });
  selectMethod(activeIndex);
  startMethod();
});

const reveals = document.querySelectorAll(".reveal");
if (reducedMotion || !("IntersectionObserver" in window)) {
  reveals.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  reveals.forEach((item) => observer.observe(item));
}

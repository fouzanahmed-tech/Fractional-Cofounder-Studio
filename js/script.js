// ── Dark / light theme toggle ──
const html = document.documentElement;
const themeBtn = document.getElementById("theme-toggle");

const saved = localStorage.getItem("fcs-theme");
if (saved) html.setAttribute("data-theme", saved);

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
    html.setAttribute("data-theme", next);
    localStorage.setItem("fcs-theme", next);
  });
}

// ── Nav scroll ──
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

// ── Mobile drawer ──
const burger = document.querySelector(".burger");
const drawer = document.getElementById("drawer");
if (burger && drawer) {
  burger.addEventListener("click", () => {
    const open = drawer.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
  });
  drawer.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      drawer.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    });
  });
}

// ── Scroll reveal ──
const revealEls = document.querySelectorAll(".reveal");
if (revealEls.length) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: "0px 0px -36px 0px" });
  revealEls.forEach(el => obs.observe(el));
}

// ── Diagnostic widget ──
const guidance = {
  "Sales entry":        "Customer definition, tight pitch, outreach list, and first meeting targets.",
  "Digital marketing":  "Simple channel plan, content rhythm, email capture, and one measurable campaign.",
  "Hiring":             "Skill gap map, first role definition, candidate sourcing, and onboarding path.",
  "Tech presence":      "Ship the page, CRM, or automation that makes the next motion possible.",
  "Operations":         "Turn recurring work into workflows, SOPs, and founder-friendly rhythms.",
  "Fundraising prep":   "Traction clarity, deck narrative, investor list, and basic data room setup."
};

const opts = document.querySelectorAll(".widget-opt");
const resultText = document.getElementById("result-text");
if (opts.length && resultText) {
  opts.forEach(btn => {
    btn.addEventListener("click", () => {
      opts.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      resultText.style.opacity = "0";
      setTimeout(() => {
        resultText.textContent = guidance[btn.dataset.key] || "";
        resultText.style.opacity = "1";
      }, 160);
    });
  });
}

// ── Form submission (Formspree) ──
const FORMSPREE = "https://formspree.io/f/xnjyglql";

const form = document.getElementById("intake-form");
const submitBtn = document.getElementById("form-submit");
const status = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", async e => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    try {
      const res = await fetch(FORMSPREE, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const reason = data?.errors?.[0]?.message || data?.error || `HTTP ${res.status}`;
        console.error("Formspree error:", reason, data);
        throw new Error(reason);
      }
      form.reset();
      submitBtn.textContent = "Sent ✓";
      status.className = "form-note success";
      status.textContent = "Got it — we'll review your bottleneck and be in touch within 1–2 business days.";
      if (typeof gtag !== "undefined") gtag("event", "form_submit", { event_category: "intake" });
    } catch (err) {
      console.error("Form submission failed:", err.message);
      submitBtn.disabled = false;
      submitBtn.textContent = "Send my bottleneck for review";
      status.className = "form-note error";
      status.textContent = "Something went wrong. Please try again or email us directly.";
    }
  });
}

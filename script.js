// Configure an adult-managed destination here before publishing. Keep access private.
// Example: const ADULT_EMAIL = "ideas@example.com";
const ADULT_EMAIL = "";

const heroCopy = document.querySelector(".hero-copy");
const portrait = document.querySelector(".portrait-card");
let frameRequested = false;
function fadeHeroOnScroll() {
  if ((!heroCopy && !portrait) || frameRequested) return;
  frameRequested = true;
  requestAnimationFrame(() => {
    const fade = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.72)));
    heroCopy.style.opacity = String(1 - fade * 0.88);
    heroCopy.style.transform = `translateY(${fade * 24}px)`;
    if (portrait) portrait.style.setProperty("--portrait-shift", `${fade * -38}px`);
    frameRequested = false;
  });
}
window.addEventListener("scroll", fadeHeroOnScroll, { passive: true });
fadeHeroOnScroll();
function updateProgress() {
  const range = document.documentElement.scrollHeight - window.innerHeight;
  const progress = range > 0 ? (window.scrollY / range) * 100 : 0;
  document.documentElement.style.setProperty("--page-progress", `${progress}%`);
}
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
updateProgress();

// Reveal each chapter and its contents as the reader arrives, while keeping
// everything visible for browsers without IntersectionObserver.
const revealTargets = document.querySelectorAll(".section-kicker, .story h2, .story-copy, .playful-strip, .ideas-intro, .idea-form, footer > *");
revealTargets.forEach((item, index) => {
  item.classList.add("scroll-reveal");
  item.style.setProperty("--reveal-delay", `${(index % 3) * 90}ms`);
});
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  revealTargets.forEach((item) => revealObserver.observe(item));
} else {
  revealTargets.forEach((item) => item.classList.add("is-visible"));
}

const idea = document.querySelector("#idea");
const counter = document.querySelector("#char-count");
idea.addEventListener("input", () => { counter.textContent = `${idea.value.length} / 700`; });

document.querySelector("#idea-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const status = document.querySelector("#form-status");
  if (!ADULT_EMAIL) {
    status.textContent = "This idea box is not connected yet. Please ask your grown-up to set up a private way to send ideas.";
    return;
  }
  const name = document.querySelector("#name").value.trim();
  const message = idea.value.trim();
  if (!message) {
    status.textContent = "Add your idea first, then press Send idea.";
    idea.focus();
    return;
  }
  const subject = encodeURIComponent("A new idea for Melvin & Dad");
  const body = encodeURIComponent(`From: ${name}\n\n${message}`);
  status.textContent = "Your email app is opening. Ask a grown-up to check it before sending.";
  window.location.href = `mailto:${ADULT_EMAIL}?subject=${subject}&body=${body}`;
});

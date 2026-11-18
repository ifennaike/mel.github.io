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

// Add the new chapters to the reveal system.
const extraRevealTargets = document.querySelectorAll(".mission-heading, .method-card, .planet-copy, .planet-art");
extraRevealTargets.forEach((item, index) => {
  item.classList.add("scroll-reveal");
  item.style.setProperty("--reveal-delay", `${(index % 3) * 100}ms`);
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
    observer.observe(item);
  } else {
    item.classList.add("is-visible");
  }
});

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

// Gentle, pointer-led tilt for the idea cards.
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(700px) rotateX(${y * -5}deg) rotateY(${x * 5}deg) translateY(-8px)`;
    });
    card.addEventListener("pointerleave", () => { card.style.transform = ""; });
  });
}

// Scroll-position scene engine.
const sceneElements = [...document.querySelectorAll(".hero, .story, .mission, .planet, .ideas")];
let sceneFrame = 0;

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function ease(value) {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
}

function updateScenes() {
  if (sceneFrame) return;
  sceneFrame = requestAnimationFrame(() => {
    const viewport = window.innerHeight;

    sceneElements.forEach((scene) => {
      const rect = scene.getBoundingClientRect();
      const distance = Math.max(1, rect.height - viewport);
      const progress = clamp((viewport - rect.top) / (distance + viewport));
      const entrance = ease(clamp((viewport * 0.82 - rect.top) / (viewport * 0.55)));
      const exit = ease(clamp((viewport - rect.top) / (distance * 0.78)));

      scene.style.setProperty("--scene-p", progress.toFixed(3));
      scene.style.setProperty("--scene-in", entrance.toFixed(3));
      scene.style.setProperty("--scene-out", exit.toFixed(3));

      if (scene.classList.contains("hero")) {
        const heroShift = clamp(-rect.top / viewport);
        scene.style.setProperty("--portrait-shift", `${heroShift * -90}px`);
        scene.style.setProperty("--hero-tilt", `${heroShift * -3}deg`);
      }

      if (scene.classList.contains("story") || scene.classList.contains("mission") || scene.classList.contains("planet") || scene.classList.contains("ideas")) {
        scene.style.setProperty("--scene-enter", entrance.toFixed(3));
      }
    });

    document.body.classList.toggle("scene-active", window.scrollY > 24);
    sceneFrame = 0;
  });
}

window.addEventListener("scroll", updateScenes, { passive: true });
window.addEventListener("resize", updateScenes);
updateScenes();

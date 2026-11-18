// Configure an adult-managed destination here before publishing. Keep access private.
// Example: const ADULT_EMAIL = "ideas@example.com";
const ADULT_EMAIL = "";

const heroCopy = document.querySelector(".hero-copy");
let frameRequested = false;
function fadeHeroOnScroll() {
  if (!heroCopy || frameRequested) return;
  frameRequested = true;
  requestAnimationFrame(() => {
    const fade = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.72)));
    heroCopy.style.opacity = String(1 - fade * 0.88);
    heroCopy.style.transform = `translateY(${fade * 24}px)`;
    frameRequested = false;
  });
}
window.addEventListener("scroll", fadeHeroOnScroll, { passive: true });

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

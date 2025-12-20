(function () {
  "use strict";

  const SPAWN_INTERVAL = 260; // ms
  const MIN_DURATION = 6;    // s
  const MAX_DURATION = 10;   // s
  const MAX_SEED = 30;

  function prefersReducedMotion() {
    return window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function getOverlay() {
    let el = document.getElementById("flower-overlay");
    if (!el) {
      el = document.createElement("div");
      el.id = "flower-overlay";
      document.body.appendChild(el);
    }
    return el;
  }

  function spawnFlower(overlay, age = 0) {
    const f = document.createElement("div");
    f.className = "falling-flower";
    f.textContent = "🌸";

    f.style.left = Math.random() * 100 + "vw";
    f.style.fontSize = 14 + Math.random() * 20 + "px";

    const dur = MIN_DURATION + Math.random() * (MAX_DURATION - MIN_DURATION);
    f.style.animationDuration = dur + "s";
    f.style.animationDelay = age ? -age + "s" : "0s";

    overlay.appendChild(f);

    const remain = Math.max(dur - age, 0);
    setTimeout(() => f.remove(), remain * 1000 + 1200);
  }

  function startRain() {
    if (window.__flowerRainRunning) return;
    window.__flowerRainRunning = true;
    if (prefersReducedMotion()) return;

    const overlay = getOverlay();

    // continuity
    const now = performance.now();
    let start = Number(sessionStorage.getItem("flowerRainStart"));
    if (!start) {
      start = now;
      sessionStorage.setItem("flowerRainStart", start);
    }

    const elapsed = (now - start) / 1000;
    const seed = Math.min(Math.floor(elapsed * 0.8), MAX_SEED);
    for (let i = 0; i < seed; i++) {
      spawnFlower(overlay, Math.random() * MAX_DURATION);
    }

    // 🔑 STABLE LOOP
    let last = performance.now();
    function loop(t) {
      const delta = t - last;
      if (delta >= SPAWN_INTERVAL) {
        const count = Math.floor(delta / SPAWN_INTERVAL);
        for (let i = 0; i < count; i++) {
          spawnFlower(overlay, 0);
        }
        last = t;
      }
      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startRain);
  } else {
    startRain();
  }
})();

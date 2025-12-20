(function () {
  "use strict";

  /* ======================
     CONFIG
  ====================== */
  const SPAWN_INTERVAL = 260; // ms
  const MIN_DUR = 6;         // s
  const MAX_DUR = 10;        // s
  const MAX_SEED = 35;

  /* ======================
     ACCESSIBILITY
  ====================== */
  function reduceMotion() {
    return window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /* ======================
     OVERLAY
  ====================== */
  function getOverlay() {
    let o = document.getElementById("flower-overlay");
    if (!o) {
      o = document.createElement("div");
      o.id = "flower-overlay";
      document.body.appendChild(o);
    }
    return o;
  }

  /* ======================
     SPAWN FLOWER
  ====================== */
  function spawnFlower(overlay, age = 0) {
    const f = document.createElement("div");
    f.className = "falling-flower";
    f.textContent = "🌸";

    f.style.left = Math.random() * 100 + "vw";
    f.style.fontSize = 14 + Math.random() * 20 + "px";

    const dur = MIN_DUR + Math.random() * (MAX_DUR - MIN_DUR);
    f.style.animationDuration = dur + "s";
    f.style.animationDelay = age ? -age + "s" : "0s";

    overlay.appendChild(f);

    const remain = Math.max(dur - age, 0);
    setTimeout(() => f.remove(), remain * 1000 + 1500);
  }

  /* ======================
     START RAIN
  ====================== */
  function startRain() {
    if (window.__FLOWER_RAIN_RUNNING) return;
    window.__FLOWER_RAIN_RUNNING = true;

    if (reduceMotion()) return;

    const overlay = getOverlay();

    /* ---- SESSION CONTINUITY ---- */
    const now = performance.now();
    let start = Number(sessionStorage.getItem("FLOWER_RAIN_START"));
    if (!start) {
      start = now;
      sessionStorage.setItem("FLOWER_RAIN_START", start);
    }

    const elapsed = (now - start) / 1000;
    const seed = Math.min(Math.floor(elapsed * 0.9), MAX_SEED);
    for (let i = 0; i < seed; i++) {
      spawnFlower(overlay, Math.random() * MAX_DUR);
    }

    /* ---- UNSTOPPABLE LOOP ---- */
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

  /* ======================
     INIT
  ====================== */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startRain);
  } else {
    startRain();
  }
})();

(function () {
  "use strict";

  /* ==========================
     CONFIG
  ========================== */
  const SPAWN_INTERVAL = 260;   // ms — nə qədər tez-tez düşsün
  const MIN_DURATION = 6;       // s — minimum düşmə vaxtı
  const MAX_DURATION = 10;      // s — maksimum düşmə vaxtı
  const MAX_SEEDED = 28;        // page load zamanı maksimum seed

  /* ==========================
     ACCESSIBILITY
  ========================== */
  function prefersReducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  /* ==========================
     OVERLAY
  ========================== */
  function getOverlay() {
    let overlay = document.getElementById("flower-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "flower-overlay";
      document.body.appendChild(overlay);
    }
    return overlay;
  }

  /* ==========================
     SPAWN ONE FLOWER
  ========================== */
  function spawnFlower(overlay, ageSeconds = 0) {
    const flower = document.createElement("div");
    flower.className = "falling-flower";
    flower.textContent = "🌸";

    // position & size
    flower.style.left = Math.random() * 100 + "vw";
    flower.style.fontSize = 14 + Math.random() * 20 + "px";

    // duration
    const duration =
      MIN_DURATION + Math.random() * (MAX_DURATION - MIN_DURATION);
    flower.style.animationDuration = duration + "s";

    // continuity: negative delay → mid-fall
    flower.style.animationDelay = ageSeconds
      ? -Math.min(ageSeconds, duration) + "s"
      : "0s";

    overlay.appendChild(flower);

    // cleanup
    const remaining = Math.max(duration - ageSeconds, 0);
    setTimeout(() => {
      try {
        flower.remove();
      } catch (e) {}
    }, remaining * 1000 + 1200);
  }

  /* ==========================
     START RAIN
  ========================== */
  function startRain() {
    if (window.__flowerRainRunning) return;
    window.__flowerRainRunning = true;

    if (prefersReducedMotion()) return;

    const overlay = getOverlay();

    /* -------- SESSION CONTINUITY -------- */
    const now = Date.now();
    let start = Number(sessionStorage.getItem("flowerRainStart"));

    if (!start || isNaN(start)) {
      start = now;
      sessionStorage.setItem("flowerRainStart", String(start));
    }

    const elapsedSeconds = (now - start) / 1000;

    // seed mid-fall flowers
    const seedCount = Math.min(
      Math.max(Math.floor(elapsedSeconds * 0.8), 6),
      MAX_SEEDED
    );

    for (let i = 0; i < seedCount; i++) {
      spawnFlower(overlay, Math.random() * MAX_DURATION);
    }

    /* -------- STABLE SPAWN LOOP -------- */
    setInterval(() => {
      spawnFlower(overlay, 0);
    }, SPAWN_INTERVAL);

    /* -------- TAB VISIBILITY FIX -------- */
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        // boşluq hissini gizlət
        for (let i = 0; i < 6; i++) {
          spawnFlower(overlay, Math.random() * 2);
        }
      }
    });
  }

  /* ==========================
     INIT
  ========================== */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startRain);
  } else {
    startRain();
  }
})();

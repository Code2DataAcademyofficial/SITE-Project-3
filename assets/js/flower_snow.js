(function () {
  // Continuous flower rain that visually persists across page navigations
  // within the same tab. Uses sessionStorage to remember a session start time
  // and seeds mid-fall flowers on each page load so the rain appears
  // uninterrupted.

  const SPAWN_DELAY = 280; // ms between new spawns
  const MIN_DUR = 6; // seconds (min fall duration)
  const MAX_DUR = 10; // seconds (max fall duration)
  const MAX_INITIAL = 30; // max seeded flowers on page load

  function prefersReduce() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function createOverlayIfMissing() {
    let overlay = document.getElementById('flower-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'flower-overlay';
      document.body.appendChild(overlay);
    }
    return overlay;
  }

  function spawnFlower(overlay, ageSeconds = 0, forcedDuration) {
    const flower = document.createElement('div');
    flower.className = 'falling-flower';
    flower.textContent = '🌸';

    flower.style.left = (Math.random() * 100) + '%';
    flower.style.fontSize = (14 + Math.random() * 20) + 'px';

    const duration = forcedDuration || (MIN_DUR + Math.random() * (MAX_DUR - MIN_DUR));
    flower.style.animationDuration = duration + 's';

    // negative delay makes the flower appear mid-fall (continuity)
    const delay = ageSeconds ? -Math.abs(ageSeconds) : 0;
    flower.style.animationDelay = delay + 's';

    overlay.appendChild(flower);

    // Remove after remaining time in its animation
    const ageMod = ((ageSeconds % duration) + duration) % duration; // [0, duration)
    const remaining = duration - ageMod;
    setTimeout(() => { try { flower.remove(); } catch (e) {} }, (remaining * 1000) + 1200);
  }

  function startFlowerRain() {
    if (window.__flowerRainStarted) return;
    window.__flowerRainStarted = true;

    if (prefersReduce()) return;

    const overlay = createOverlayIfMissing();

    // Set or read session start time so each load can seed based on elapsed time
    const now = Date.now();
    let start = parseInt(sessionStorage.getItem('flowerRainStart'), 10);
    if (!start || isNaN(start)) {
      start = now;
      sessionStorage.setItem('flowerRainStart', String(start));
    }

    const elapsed = now - start;
    const estimatedSpawns = Math.floor(elapsed / SPAWN_DELAY);
    // seed a modest fraction so it doesn't overload the DOM
    const initialCount = Math.min(Math.max(Math.floor(estimatedSpawns * 0.2), 6), MAX_INITIAL);

    for (let i = 0; i < initialCount; i++) {
      const dur = MIN_DUR + Math.random() * (MAX_DUR - MIN_DUR);
      const age = Math.random() * dur; // seconds
      spawnFlower(overlay, age, dur);
    }

    let lastSpawn = now;
    function loop(time) {
      if (time - lastSpawn > SPAWN_DELAY) {
        lastSpawn = time;
        spawnFlower(overlay, 0);
      }
      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startFlowerRain);
  } else {
    startFlowerRain();
  }
})();

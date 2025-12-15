let lastSpawn = 0;
const spawnDelay = 280; // yağış sürəti (ms)
let started = false;

function startFlowerRain() {
  if (started) return;
  started = true;

  const overlay = document.getElementById("flower-overlay");
  if (!overlay) return;

  function loop(time) {
    if (time - lastSpawn > spawnDelay) {
      lastSpawn = time;

      const flower = document.createElement("div");
      flower.className = "falling-flower";
      flower.textContent = "🌸";

      flower.style.left = Math.random() * 100 + "%";
      flower.style.fontSize = 14 + Math.random() * 20 + "px";
      flower.style.animationDuration = 6 + Math.random() * 4 + "s";

      overlay.appendChild(flower);

      setTimeout(() => flower.remove(), 15000);
    }

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

window.addEventListener("load", startFlowerRain);

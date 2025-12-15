document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("flower-overlay");
  if (!overlay) {
    console.error("flower-overlay tapilmadi");
    return;
  }

  let created = 0;
  const maxFlowers = 35;

  const interval = setInterval(() => {
    const flower = document.createElement("div");
    flower.className = "flower";
    flower.innerText = "🌸";

    flower.style.left = Math.random() * 100 + "vw";
    flower.style.fontSize = 16 + Math.random() * 16 + "px";
    flower.style.animationDuration = 4 + Math.random() * 3 + "s";

    overlay.appendChild(flower);

    setTimeout(() => flower.remove(), 8000);

    created++;
    if (created >= maxFlowers) {
      clearInterval(interval);
    }
  }, 200);
});

document.addEventListener("DOMContentLoaded", () => {
  const MAX_FLOWERS = 30;
  const DURATION = 4000; // 4 saniyə sonra zəifləsin
  let active = true;

  function createFlower() {
    if (!active) return;

    const flower = document.createElement("div");
    flower.className = "falling-flower";
    flower.innerText = "🌸";

    flower.style.left = Math.random() * window.innerWidth + "px";
    flower.style.fontSize = 16 + Math.random() * 22 + "px";
    flower.style.animationDuration = 5 + Math.random() * 4 + "s";
    flower.style.opacity = Math.random() * 0.6 + 0.4;

    document.body.appendChild(flower);

    setTimeout(() => flower.remove(), 9000);
  }

  const interval = setInterval(() => {
    if (document.querySelectorAll(".falling-flower").length < MAX_FLOWERS) {
      createFlower();
    }
  }, 250);

  // 🌸 4 saniyədən sonra zəifləyərək dayansın
  setTimeout(() => {
    active = false;
    clearInterval(interval);

    document.querySelectorAll(".falling-flower").forEach(flower => {
      flower.classList.add("fade-out");
    });
  }, DURATION);
});

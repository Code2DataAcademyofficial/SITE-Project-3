document.addEventListener("DOMContentLoaded", () => {
  const maxFlowers = 50;
  const overlay = document.getElementById("flower-overlay");

  if (!overlay) return; // təhlükəsizlik

  function createFlower() {
    const flower = document.createElement("div");
    flower.classList.add("flower");

    flower.innerText = "🌸";

    // EKRAN ENİNƏ GÖRƏ
    flower.style.left = Math.random() * 100 + "vw";

    flower.style.animationDuration = 8 + Math.random() * 6 + "s";
    flower.style.fontSize = 18 + Math.random() * 22 + "px";
    flower.style.opacity = 0.6 + Math.random() * 0.4;

    // ❌ body YOX
    // document.body.appendChild(flower);

    // ✅ OVERLAY
    overlay.appendChild(flower);

    setTimeout(() => {
      flower.remove();
    }, 15000);
  }

  const interval = setInterval(() => {
    if (overlay.children.length < maxFlowers) {
      createFlower();
    }
  }, 250);

  // 🌸 4 saniyədən sonra yumşaq sönsün
  setTimeout(() => {
    clearInterval(interval);
    overlay.querySelectorAll(".flower").forEach(f => {
      f.style.transition = "opacity 2.5s ease";
      f.style.opacity = "0";
    });
  }, 4000);
});

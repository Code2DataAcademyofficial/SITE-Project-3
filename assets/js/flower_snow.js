// əvvəlki interval varsa, sil
if (window.flowerInterval) {
  clearInterval(window.flowerInterval);
}

// overlay tap
const overlay = document.getElementById("flower-overlay");
if (!overlay) {
  console.error("flower-overlay tapılmadı");
}

// təmiz start
overlay.innerHTML = "";

const maxFlowers = 45;

function createFlower() {
  const flower = document.createElement("div");
  flower.className = "flower";
  flower.textContent = "🌸";

  flower.style.left = Math.random() * 100 + "vw";
  flower.style.fontSize = 18 + Math.random() * 22 + "px";
  flower.style.opacity = 0.6 + Math.random() * 0.4;
  flower.style.animationDuration = 8 + Math.random() * 6 + "s";

  overlay.appendChild(flower);

  setTimeout(() => flower.remove(), 15000);
}

window.flowerInterval = setInterval(() => {
  if (overlay.children.length < maxFlowers) {
    createFlower();
  }
}, 250);

// 4 saniyədən sonra yumşaq sönsün
setTimeout(() => {
  clearInterval(window.flowerInterval);
  [...overlay.children].forEach(f => {
    f.style.transition = "opacity 2.5s ease";
    f.style.opacity = "0";
  });
}, 4000);

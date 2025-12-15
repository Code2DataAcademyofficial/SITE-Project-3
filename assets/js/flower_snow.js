document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("flower-overlay");
  if (!overlay) return;

  // əvvəlki interval varsa, təmizlə
  if (window.flowerInterval) {
    clearInterval(window.flowerInterval);
  }

  let intensity = 300; // başlanğıcda sıx yağış
  const minIntensity = 1200; // sonda çox seyrək
  const decreaseRate = 120; // neçə ms-də bir zəifləsin

  function createFlower() {
    const flower = document.createElement("div");
    flower.className = "flower";
    flower.innerText = "🌸";

    flower.style.left = Math.random() * 100 + "vw";
    flower.style.animationDuration = 4 + Math.random() * 3 + "s";
    flower.style.fontSize = 16 + Math.random() * 14 + "px";

    overlay.appendChild(flower);

    // animasiya bitəndə silinsin
    setTimeout(() => {
      flower.remove();
    }, 8000);
  }

  // interval ilə gül yarat
  window.flowerInterval = setInterval(() => {
    createFlower();
  }, intensity);

  // tədricən zəiflət
  const weaken = setInterval(() => {
    intensity += 200;

    clearInterval(window.flowerInterval);
    window.flowerInterval = setInterval(() => {
      createFlower();
    }, intensity);

    if (intensity >= minIntensity) {
      clearInterval(window.flowerInterval);
      clearInterval(weaken);
    }
  }, decreaseRate);
});

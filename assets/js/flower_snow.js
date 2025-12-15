let flowerInterval = null;

function startFlowerRain() {
  // Əgər artıq işləyirsə, bir də başlatma
  if (flowerInterval !== null) return;

  const overlay = document.getElementById("flower-overlay");
  if (!overlay) return;

  flowerInterval = setInterval(() => {
    const petal = document.createElement("div");
    petal.className = "flower-petal";
    petal.textContent = "🌸";

    petal.style.left = Math.random() * 100 + "%";
    petal.style.fontSize = 14 + Math.random() * 18 + "px";
    petal.style.animationDuration = 6 + Math.random() * 4 + "s";

    overlay.appendChild(petal);

    // ekrandan çıxandan sonra silinsin
    setTimeout(() => {
      petal.remove();
    }, 15000);

  }, 300); // YAĞIŞ SÜRƏTİ
}

// ❗ YALNIZ BİR DƏFƏ — SAYT AÇILANDA
window.addEventListener("load", startFlowerRain);

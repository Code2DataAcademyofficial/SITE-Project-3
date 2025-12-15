function startFlowerRain() {
  const overlay = document.getElementById("flower-overlay");
  if (!overlay) return;

  // hər page keçidində əvvəlkiləri təmizləmirik,
  // çünki artıq davamlı yağış istəyirik

  setInterval(() => {
    const petal = document.createElement("div");
    petal.className = "flower-petal";
    petal.textContent = "🌸";

    petal.style.left = Math.random() * 100 + "%";
    petal.style.fontSize = 14 + Math.random() * 18 + "px";
    petal.style.animationDuration = 6 + Math.random() * 4 + "s";

    overlay.appendChild(petal);

    // performans üçün avtomatik silinsin
    setTimeout(() => {
      petal.remove();
    }, 12000);

  }, 300); // sürəti burdan tənzimləyə bilərsən
}

/* 🚀 SAYT AÇILANDA */
window.addEventListener("load", startFlowerRain);

/* 🔁 PAGE CHANGE (Safari FIX) */
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    startFlowerRain();
  }
});

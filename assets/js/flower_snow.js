document.addEventListener("DOMContentLoaded", () => {
  const maxFlowers = 50; // əvvəl 25 idi → daha intensiv

  function createFlower() {
    const flower = document.createElement("div");
    flower.classList.add("flower");

    flower.innerText = "🌸";

    flower.style.left = Math.random() * window.innerWidth + "px";

    // Daha uzun düşmə
    flower.style.animationDuration = 8 + Math.random() * 6 + "s";

    // Ölçü variasiyası
    flower.style.fontSize = 18 + Math.random() * 22 + "px";

    // Daha stabil görünüş
    flower.style.opacity = 0.6 + Math.random() * 0.4;

    document.body.appendChild(flower);

    // DOM-da daha uzun qalsın
    setTimeout(() => {
      flower.remove();
    }, 15000);
  }

  // Daha tez-tez yaransın
  setInterval(() => {
    if (document.querySelectorAll(".flower").length < maxFlowers) {
      createFlower();
    }
  }, 250); // əvvəl 400 ms idi
});

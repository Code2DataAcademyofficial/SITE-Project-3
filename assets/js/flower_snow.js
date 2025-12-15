document.addEventListener("DOMContentLoaded", () => {
  const maxFlowers = 25;

  function createFlower() {
    const flower = document.createElement("div");
    flower.classList.add("flower");

    flower.innerText = "🌸";

    flower.style.left = Math.random() * window.innerWidth + "px";
    flower.style.animationDuration = 5 + Math.random() * 5 + "s";
    flower.style.fontSize = 16 + Math.random() * 20 + "px";
    flower.style.opacity = Math.random();

    document.body.appendChild(flower);

    setTimeout(() => {
      flower.remove();
    }, 10000);
  }

  setInterval(() => {
    if (document.querySelectorAll(".flower").length < maxFlowers) {
      createFlower();
    }
  }, 400);
});

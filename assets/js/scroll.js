document.addEventListener("scroll", () => {
  const backBtn = document.querySelector(".mobile-back-btn");
  if (!backBtn) return;

  // Desktop-da işləməsin
  if (window.innerWidth > 768) return;

  if (window.scrollY > 40) {
    backBtn.style.opacity = "0";
    backBtn.style.pointerEvents = "none";
  } else {
    backBtn.style.opacity = "0.85";
    backBtn.style.pointerEvents = "auto";
  }
});

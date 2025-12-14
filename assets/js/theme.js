document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  const body = document.body;

  // default / saved theme
  let theme = localStorage.getItem("theme") || "light";
  body.classList.add(`theme-${theme}`);
  btn.textContent = theme === "light" ? "🌙" : "☀️";

  btn.addEventListener("click", () => {
    theme = theme === "light" ? "dark" : "light";

    body.classList.remove("theme-light", "theme-dark");
    body.classList.add(`theme-${theme}`);

    btn.textContent = theme === "light" ? "🌙" : "☀️";
    localStorage.setItem("theme", theme);
  });
});

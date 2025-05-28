const toggleBtn = document.getElementById("theme__toggle");
const htmlEl = document.documentElement;

toggleBtn.addEventListener("click", () => {
  htmlEl.classList.toggle("dark");

  const icon = toggleBtn.querySelector("i");
  icon.classList.toggle("fa-sun-bright");
  icon.classList.toggle("fa-moon");

  // Optional: store preference
  if (htmlEl.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// Apply stored theme on load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    htmlEl.classList.add("dark");
    toggleBtn.querySelector("i").classList.replace("fa-sun-bright", "fa-moon");
  }
});

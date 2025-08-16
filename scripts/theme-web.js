const toggleBtn = document.querySelector(".button-theme");

// Cargar preferencia guardada
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  toggleBtn.textContent = "Modo claro"
}else{
    toggleBtn.textContent = "Modo oscuro"
}

// Cambiar tema al pulsar
toggleBtn.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const isDark = currentTheme === "dark";

  if (isDark) {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
    toggleBtn.textContent = "Modo oscuro";
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    toggleBtn.textContent = "Modo claro";
  }
});

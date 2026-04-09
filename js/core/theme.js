(function () {
  "use strict";

  window.AMA = window.AMA || {};

  function detectTheme() {
    try {
      var savedTheme = localStorage.getItem("ama_theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
      }
    } catch (error) {
      /* localStorage may be unavailable */
    }

    var prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    return prefersLight ? "light" : "dark";
  }

  function syncThemeButtons(theme) {
    var buttons = Array.prototype.slice.call(document.querySelectorAll("[data-theme-toggle]"));
    var label = theme === "light" ? "Включить тёмную тему" : "Включить светлую тему";

    buttons.forEach(function (button) {
      button.setAttribute("aria-label", label);
      button.setAttribute("title", label);

      var icon = button.querySelector("[data-theme-icon]");
      if (icon) {
        icon.textContent = theme === "dark" ? "☾" : "☀";
      }
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    try {
      localStorage.setItem("ama_theme", theme);
    } catch (error) {
      /* localStorage may be unavailable */
    }

    syncThemeButtons(theme);
  }

  function initThemeToggle() {
    syncThemeButtons(detectTheme());

    var buttons = Array.prototype.slice.call(document.querySelectorAll("[data-theme-toggle]"));
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        var currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
        applyTheme(currentTheme === "dark" ? "light" : "dark");
      });
    });
  }

  window.AMA.theme = {
    detectTheme: detectTheme,
    applyTheme: applyTheme,
    syncButtons: syncThemeButtons,
    init: initThemeToggle,
  };
})();

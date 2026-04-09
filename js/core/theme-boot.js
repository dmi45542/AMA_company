(function () {
  "use strict";

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

  document.documentElement.setAttribute("data-theme", detectTheme());
})();

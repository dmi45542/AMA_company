(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    if (window.AMA && window.AMA.theme) {
      window.AMA.theme.init();
    }

    if (window.AMA && window.AMA.topbar) {
      window.AMA.topbar.init();
    }

    if (window.AMA && window.AMA.drawer) {
      window.AMA.drawer.init();
    }

    if (window.AMA && window.AMA.bubbles) {
      window.AMA.bubbles.init();
    }

    if (window.AMA && window.AMA.home) {
      window.AMA.home.init();
    }

    if (window.AMA && window.AMA.seriesPage) {
      window.AMA.seriesPage.init();
    }

    if (window.AMA && window.AMA.supportPage) {
      window.AMA.supportPage.init();
    }
  });
})();

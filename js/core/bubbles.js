(function () { 
  "use strict";

  window.AMA = window.AMA || {};
  window.AMA.ui = window.AMA.ui || {};

  function initBubbles() {
    var upBubble = document.getElementById("upBubble");
    var navBubble = document.getElementById("navBubble");
    var drawer = document.getElementById("drawer");
    var visibilityThreshold = 80;

    function syncBubbles() {
      var isVisible = (window.scrollY || 0) > visibilityThreshold;

      if (upBubble) {
        upBubble.classList.toggle("is-visible", isVisible);
      }

      if (navBubble) {
        navBubble.classList.toggle("is-visible", isVisible);
      }
    }

    if (upBubble) {
      upBubble.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    if (navBubble && drawer) {
      navBubble.addEventListener("click", function () {
        if (typeof window.AMA.ui.setDrawer === "function") {
          window.AMA.ui.setDrawer(!drawer.classList.contains("open"));
        }
      });
    }

    syncBubbles();
    window.addEventListener("scroll", syncBubbles, { passive: true });
  }

  window.AMA.bubbles = {
    init: initBubbles,
  };
})();

(function () {
  "use strict";

  window.AMA = window.AMA || {};

  function initTopbar() {
    var topbar = document.querySelector(".topbar");
    if (!topbar) {
      return;
    }

    var shouldHideHeader = false;
    var hideThreshold = 80;

    function syncTopbarHeight() {
      document.documentElement.style.setProperty("--topbar-h", (topbar.offsetHeight || 78) + "px");
    }

    function syncTopbarState() {
      var scrollY = window.scrollY || 0;
      topbar.classList.toggle("scrolled", scrollY > 18);

      if (!shouldHideHeader) {
        return;
      }

      if (scrollY < 6) {
        topbar.classList.remove("is-hidden");
      } else if (scrollY > hideThreshold) {
        topbar.classList.add("is-hidden");
      } else {
        topbar.classList.remove("is-hidden");
      }
    }

    syncTopbarHeight();
    syncTopbarState();

    window.addEventListener("resize", syncTopbarHeight);
    window.addEventListener("load", syncTopbarHeight);
    window.addEventListener("scroll", syncTopbarState, { passive: true });
  }

  window.AMA.topbar = {
    init: initTopbar,
  };
})();

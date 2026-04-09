(function () {
  "use strict";

  window.AMA = window.AMA || {};
  window.AMA.ui = window.AMA.ui || {};

  function setDrawerState(drawer, isOpen) {
    drawer.classList.toggle("open", isOpen);
    drawer.setAttribute("aria-hidden", String(!isOpen));
    document.body.classList.toggle("drawer-open", isOpen);
  }

  function initDrawer() {
    var drawer = document.getElementById("drawer");
    var openMenuButton = document.getElementById("openMenu");
    var closeMenuButton = document.getElementById("closeMenu");
    var mobileLinks = Array.prototype.slice.call(document.querySelectorAll(".mLink"));

    if (!drawer) {
      return;
    }

    window.AMA.ui.setDrawer = function setDrawer(forceOpen) {
      var isOpen = typeof forceOpen === "boolean" ? forceOpen : !drawer.classList.contains("open");
      setDrawerState(drawer, isOpen);
    };

    if (openMenuButton) {
      openMenuButton.addEventListener("click", function () {
        window.AMA.ui.setDrawer(true);
      });
    }

    if (closeMenuButton) {
      closeMenuButton.addEventListener("click", function () {
        window.AMA.ui.setDrawer(false);
      });
    }

    drawer.addEventListener("click", function (event) {
      if (event.target === drawer) {
        window.AMA.ui.setDrawer(false);
      }
    });

    mobileLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        window.AMA.ui.setDrawer(false);
      });
    });
  }

  window.AMA.drawer = {
    init: initDrawer,
  };
})();

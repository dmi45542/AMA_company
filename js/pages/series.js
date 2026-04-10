(function () {
  "use strict"; 

  window.AMA = window.AMA || {};

  function initSeriesPage() {
    if (!document.body.classList.contains("page-series")) {
      return;
    }

    var seriesName = document.body.getAttribute("data-series") || "";
    var mailButton = document.getElementById("mailBtn");

    if (mailButton) {
      var subject = encodeURIComponent("Запрос по серии " + seriesName);
      mailButton.href = "mailto:pump@oooama.ru?subject=" + subject;
    }

    var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));
    var panels = Array.prototype.slice.call(document.querySelectorAll(".tab-panel"));

    function showTab(name) { 
      tabs.forEach(function (tab) {
        var isActive = tab.dataset.tab === name; 
        tab.classList.toggle("active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
      });

      panels.forEach(function (panel) {
        var isActive = panel.dataset.panel === name;
        panel.classList.toggle("is-active", isActive);
        panel.hidden = !isActive;
      });
    }

    // ========== НУЖНЫЙ КОД ==========
    // Навешиваем обработчики
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function (e) {
        e.preventDefault();
        var tabName = tab.getAttribute("data-tab");
        if (tabName) {
          showTab(tabName);
        }
      });
    });

    // Показываем активную вкладку при загрузке
    var activeTab = tabs.find(function (tab) {
      return tab.classList.contains("active");
    });

    if (activeTab) {
      var activeTabName = activeTab.getAttribute("data-tab");
      if (activeTabName) {
        showTab(activeTabName);
      }
    } else if (tabs.length > 0) {
      var firstTabName = tabs[0].getAttribute("data-tab");
      if (firstTabName) {
        showTab(firstTabName);
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSeriesPage);
  } else {
    initSeriesPage();
  }
})();
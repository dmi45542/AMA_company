(function () {
  "use strict";

  window.AMA = window.AMA || {};

  function initSupportPage() {
    if (!document.body.classList.contains("page-support")) {
      return;
    }

    var yearElement = document.getElementById("supportYear");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }

    var supportMailButton = document.getElementById("supportMail");
    if (supportMailButton) {
      supportMailButton.addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "mailto:pump@oooama.ru?subject=" + encodeURIComponent("Запрос в AMA");
      });
    }
  }

  window.AMA.supportPage = {
    init: initSupportPage,
  };
})();

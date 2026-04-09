(function () {
  "use strict";

  window.AMA = window.AMA || {};
  window.AMA.request = window.AMA.request || {};

  function setSeries(name) {
    var hiddenField = document.getElementById("seriesSel");
    var visibleField = document.getElementById("seriesField");
    var notesField = document.getElementById("notes");

    if (hiddenField) {
      hiddenField.value = name || "";
    }

    if (visibleField) {
      visibleField.value = name || "";
    }

    if (notesField && name) {
      var seriesLabel = "Серия: " + name;
      if (!notesField.value.includes(seriesLabel)) {
        notesField.value = (seriesLabel + "\n" + (notesField.value || "")).trim();
      }
    }
  }

  function buildMailtoLink() {
    function getValue(id) {
      var field = document.getElementById(id);
      return field ? (field.value || "").trim() : "";
    }

    var subject = encodeURIComponent("Запрос на подбор насоса AMA");
    var body = encodeURIComponent(
      "Здравствуйте!\n\n" +
      "Прошу подобрать насос/исполнение.\n\n" +
      "Контакт: " + (getValue("name") || "-") + "\n" +
      "Телефон: " + (getValue("phone") || "-") + "\n" +
      "Email: " + (getValue("email") || "-") + "\n\n" +
      "Параметры:\n" +
      "- Серия: " + (getValue("seriesField") || "-") + "\n" +
      "- Производительность: " + (getValue("flow") || "-") + " м³/ч\n" +
      "- Напор: " + (getValue("head") || "-") + " м\n" +
      "- Температура: " + (getValue("temp") || "-") + " °C\n" +
      "- Среда: " + (getValue("media") || "-") + "\n\n" +
      "Комментарий:\n" +
      (getValue("notes") || "-") + "\n\n" +
      "Спасибо!"
    );

    return "mailto:pump@oooama.ru?subject=" + subject + "&body=" + body;
  }

  window.AMA.request.setSeries = setSeries;
  window.AMA.request.buildMailtoLink = buildMailtoLink;
})();

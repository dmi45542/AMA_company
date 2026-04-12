(function () {
  "use strict";

  window.AMA = window.AMA || {};

  function initHomePage() {
    if (!document.body.classList.contains("page-home")) {
      return;
    }

    var seriesList = window.AMA_SERIES || [];
    var orderedGroups = ["Все", "Магнитные", "Центробежные", "Самовсасывающие", "Прочие", "Вертикальные", "Объемные"];

    var filtersElement = document.getElementById("filters");
    var gridElement = document.getElementById("seriesGrid");
    var searchInput = document.getElementById("seriesSearch");
    var clearSearchButton = document.getElementById("clearSearch");
    var quickMailButton = document.getElementById("mailtoQuick");
    var sendButton = document.getElementById("sendBtn");
    var yearElement = document.getElementById("year");
    var navLinks = Array.prototype.slice.call(document.querySelectorAll(".navItems a[href^='#']"));

    var activeGroup = "Все";
    var searchTerm = "";

    function iconFor(group) {
      switch (group) {
        case "Все": return "✨";
        case "Магнитные": return "🧲";
        case "Центробежные": return "⚙️";
        case "Самовсасывающие": return "↺";
        case "Прочие": return "📦";
        case "Вертикальные": return "⬆️";
        case "Объемные": return "🌀";
        default: return "📦";
      }
    }

    function renderFilters() {
      if (!filtersElement) {
        return;
      }

      var groups = orderedGroups.filter(function (group) {
        return group === "Все" || seriesList.some(function (item) {
          return item.group === group;
        });
      });

      filtersElement.innerHTML = "";

      groups.forEach(function (group) {
        var button = document.createElement("button");
        button.className = "pill" + (group === activeGroup ? " active" : "");
        button.type = "button";
        button.textContent = iconFor(group) + " " + group;

        button.addEventListener("click", function () {
          activeGroup = group;
          renderFilters();
          renderGrid();
        });

        filtersElement.appendChild(button);
      });
    }

function createCard(item) {
  var metaItems = (item.meta || []).map(function (meta) {
    return '<span class="meta">' + meta + '</span>';
  }).join("");

  return (
    '<article class="pCard" tabindex="0" data-series="' + item.name + '">' +
      '<div class="thumbWrap">' +
        '<img class="thumb" src="' + item.img + '" alt="Серия ' + item.name + '" loading="lazy">' +
      '</div>' +
      '<div class="pBody">' +
        '<div class="pTop">' +
          '<div>' +
            '<h3>' + item.name + '</h3>' +
            '<div class="pTag">' + (item.tag || "") + '</div>' +
          '</div>' +
          '<span class="badge">' + item.group + '</span>' +
        '</div>' +
        '<p class="pText">' + (item.desc || "") + '</p>' +
        '<div class="pMeta">' + metaItems + '</div>' +
        '<div class="pActions">' +
          '<a class="btn" href="' + item.page + '">Подробнее</a>' +
          '<a class="btn primary" href="../pages/requestTitle.html?series=' + encodeURIComponent(item.name) + '">Запросить</a>' +
        '</div>' +
      '</div>' +
    '</article>'
  );
}

    function renderGrid() {
      if (!gridElement) {
        return;
      }

      var normalizedTerm = searchTerm.toLowerCase();
      var items = seriesList.filter(function (item) {
        var matchesGroup = activeGroup === "Все" || item.group === activeGroup;
        var searchIndex = [item.name, item.group, item.tag, item.desc].concat(item.meta || []).join(" ").toLowerCase();
        return matchesGroup && (!normalizedTerm || searchIndex.includes(normalizedTerm));
      });

      gridElement.innerHTML = items.map(createCard).join("");
    }

    function setSearch(value) {
      searchTerm = (value || "").trim();
      renderGrid();
    }

    if (searchInput) {
      searchInput.addEventListener("input", function (event) {
        setSearch(event.target.value);
      });
    }

    if (clearSearchButton) {
      clearSearchButton.addEventListener("click", function () {
        if (searchInput) {
          searchInput.value = "";
        }
        setSearch("");
      });
    }

    if (sendButton) {
      sendButton.addEventListener("click", function () {
        window.location.href = window.AMA.request.buildMailtoLink();
      });
    }

    if (quickMailButton) {
      quickMailButton.addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "mailto:pump@oooama.ru?subject=" + encodeURIComponent("Запрос в AMA");
      });
    }

    function setActiveLink(activeLink) {
      navLinks.forEach(function (link) {
        link.classList.toggle("is-active", link === activeLink);
        link.classList.toggle("active", link === activeLink);
      });
    }

    var sections = navLinks
      .map(function (link) {
        return document.querySelector(link.getAttribute("href"));
      })
      .filter(Boolean);

    if ("IntersectionObserver" in window && sections.length) {
      var observer = new IntersectionObserver(function (entries) {
        var visible = entries
          .filter(function (entry) { return entry.isIntersecting; })
          .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];

        if (!visible) {
          return;
        }

        var activeLink = navLinks.find(function (navLink) {
          return navLink.getAttribute("href") === "#" + visible.target.id;
        });

        if (activeLink) {
          setActiveLink(activeLink);
        }
      }, { rootMargin: "-35% 0px -55% 0px", threshold: [0.01, 0.08, 0.15, 0.25] });

      sections.forEach(function (section) {
        observer.observe(section);
      });
    }

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        setActiveLink(link);
      });
    });

    var modal = document.getElementById("seriesModal");
    var modalImage = document.getElementById("modalImg");
    var modalPlaceholder = document.getElementById("modalPh");
    var modalName = document.getElementById("modalName");
    var modalTag = document.getElementById("modalTag");
    var modalDescription = document.getElementById("modalDesc");
    var modalMeta = document.getElementById("modalMeta");
    var modalCloseButton = document.getElementById("modalClose");
    var modalRequestButton = document.getElementById("modalRequest");
    var modalCopyButton = document.getElementById("modalCopy");

    function openModal(name) {
      var item = seriesList.find(function (seriesItem) {
        return seriesItem.name === name;
      });

      if (!item || !modal) {
        return;
      }

      if (item.img) {
        modalImage.src = item.img;
        modalImage.alt = "Серия " + item.name;
        modalImage.style.display = "block";
        modalPlaceholder.style.display = "none";
        modalPlaceholder.textContent = "";
      } else {
        modalImage.src = "";
        modalImage.style.display = "none";
        modalPlaceholder.style.display = "flex";
        modalPlaceholder.textContent = item.name;
      }

      modalName.textContent = item.name;
      modalTag.textContent = item.tag || "";
      modalDescription.textContent = item.desc || "";
      modalMeta.innerHTML = (item.meta || []).map(function (meta) {
        return '<span class="meta">' + meta + '</span>';
      }).join("");

      modal.dataset.series = item.name;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      if (!modal) {
        return;
      }

      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    if (modalCloseButton) {
      modalCloseButton.addEventListener("click", closeModal);
    }

    if (modal) {
      modal.addEventListener("click", function (event) {
        if (event.target && event.target.dataset && event.target.dataset.close) {
          closeModal();
        }
      });
    }

    window.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeModal();
      }
    });

    if (gridElement) {
      gridElement.addEventListener("click", function (event) {
        var card = event.target.closest(".pCard");
        if (!card) {
          return;
        }

        var seriesName = card.getAttribute("data-series");

        if (event.target.closest("[data-request='1']")) {
          window.AMA.request.setSeries(seriesName || "");
          return;
        }

        if (event.target.tagName === "A") {
          return;
        }

        openModal(seriesName);
      });

      gridElement.addEventListener("keydown", function (event) {
        if (event.key !== "Enter" && event.key !== " ") {
          return;
        }

        var card = event.target.closest(".pCard");
        if (!card) {
          return;
        }

        event.preventDefault();
        openModal(card.getAttribute("data-series"));
      });
    }

    if (modalRequestButton) {
      modalRequestButton.addEventListener("click", function () {
        var seriesName = modal && modal.dataset ? modal.dataset.series : "";
        window.AMA.request.setSeries(seriesName || "");
        closeModal();
      });
    }

    if (modalCopyButton) {
      modalCopyButton.addEventListener("click", async function () {
        var seriesName = modal && modal.dataset ? modal.dataset.series : "";

        try {
          await navigator.clipboard.writeText(seriesName);
          modalCopyButton.textContent = "Скопировано ✓";
          setTimeout(function () {
            modalCopyButton.textContent = "Скопировать название";
          }, 1200);
        } catch (error) {
          /* clipboard may be unavailable */
        }
      });
    }

    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }

    renderFilters();
    renderGrid();
  }

  window.AMA.home = {
    init: initHomePage,
  };
})();

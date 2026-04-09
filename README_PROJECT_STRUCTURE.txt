СТРУКТУРА ПРОЕКТА

index.html                — главная страница
main.css                  — главный файл подключения всех стилей

base/
  reset.css               — базовый сброс
  variables.css           — CSS-переменные

theme/
  theme.css               — светлая/тёмная тема

page-style/
  shared.css              — глобальные и утилитарные стили
  head-page.css           — стили главной страницы
  series-page.css         — стили внутренних страниц серий

js/
  script.js               — общий JavaScript проекта

pages/
  *.html                  — отдельные страницы серий

supportPage/
  support.html            — отдельная страница поддержки
  support.css             — стили страницы поддержки

images/
  brand/                  — логотипы
  series-cards/           — карточки серий
  series-pages/           — изображения внутренних страниц

docs/
  catalog.pdf             — каталог


Обновление:
- Папка js разделена на подкаталоги core, data, utils, pages.
- Общий script.js удалён, логика разнесена по отдельным файлам с понятными названиями и комментариями.

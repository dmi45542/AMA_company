// Управление скрытием хедера и появлением кнопки меню при скролле
(function() {
  const header = document.querySelector('.topbar');
  const menuButton = document.querySelector('.navBubble');
  
  // Если кнопки нет на странице — создаём
  let bubble = menuButton;
  if (!bubble) {
    bubble = document.createElement('button');
    bubble.className = 'navBubble';
    bubble.setAttribute('aria-label', 'Открыть меню');
    bubble.setAttribute('type', 'button');
    bubble.innerHTML = '☰';
    document.body.appendChild(bubble);
  }
  
  let lastScrollY = window.scrollY;
  let ticking = false;
  let headerHidden = false;
  
  function updateScrollDirection() {
    const currentScrollY = window.scrollY;
    
    // Скролл вниз и не в самом верху
    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      if (!headerHidden) {
        header.classList.add('header-hidden');
        bubble.classList.add('visible');
        headerHidden = true;
      }
    } 
    // Скролл вверх
    else if (currentScrollY < lastScrollY) {
      if (headerHidden) {
        header.classList.remove('header-hidden');
        bubble.classList.remove('visible');
        headerHidden = false;
      }
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
  }
  
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateScrollDirection);
      ticking = true;
    }
  }
  
  // Открытие меню по кнопке
  if (bubble) {
    bubble.addEventListener('click', function() {
      const drawer = document.getElementById('drawer');
      if (drawer) {
        drawer.classList.add('open');
      }
    });
  }
  
  window.addEventListener('scroll', onScroll);
})();
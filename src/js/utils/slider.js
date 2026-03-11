export function initSlider() {
  const list = document.querySelector('.bestseller-list');
  const items = document.querySelectorAll('.bestseller-item');
  const leftBtn = document.querySelectorAll('.btn-arrow')[0];
  const rightBtn = document.querySelectorAll('.btn-arrow')[1];
  const dots = document.querySelectorAll('.slide-item');

  if (!list || !leftBtn || !rightBtn || !dots.length) return;

  const TOTAL_PAGES = 6;

  // Функция для обновления состояния кнопок и точек
  function updateUI() {
    const scrollLeft = list.scrollLeft;
    const maxScroll = list.scrollWidth - list.clientWidth;

    // Вычисляем текущий индекс (0-5) на основе процента прокрутки
    // Это позволяет точкам переключаться, даже когда скроллишь пальцем
    const scrollPercentage = maxScroll > 0 ? scrollLeft / maxScroll : 0;
    const currentIndex = Math.min(
      Math.round(scrollPercentage * (TOTAL_PAGES - 1)),
      TOTAL_PAGES - 1
    );

    // Обновляем активную точку
    dots.forEach((dot, index) => {
      dot.classList.toggle('slide-active', index === currentIndex);
    });

    // Валидация кнопок (с небольшим запасом в 5px для точности браузеров)
    leftBtn.disabled = scrollLeft <= 5;
    leftBtn.style.opacity = leftBtn.disabled ? '0.3' : '1';
    leftBtn.style.cursor = leftBtn.disabled ? 'default' : 'pointer';

    rightBtn.disabled = scrollLeft >= maxScroll - 5;
    rightBtn.style.opacity = rightBtn.disabled ? '0.3' : '1';
    rightBtn.style.cursor = rightBtn.disabled ? 'default' : 'pointer';
  }

  // Функция для перемещения к конкретной "странице"
  function scrollToPage(pageIndex) {
    const maxScroll = list.scrollWidth - list.clientWidth;
    const targetScroll = (maxScroll / (TOTAL_PAGES - 1)) * pageIndex;

    list.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  }

  // Слушатели для стрелок
  leftBtn.addEventListener('click', () => {
    const maxScroll = list.scrollWidth - list.clientWidth;
    const scrollStep = maxScroll / (TOTAL_PAGES - 1);
    // Определяем текущую страницу и вычитаем 1
    const currentPage = Math.round(list.scrollLeft / scrollStep);
    scrollToPage(currentPage - 1);
  });

  rightBtn.addEventListener('click', () => {
    const maxScroll = list.scrollWidth - list.clientWidth;
    const scrollStep = maxScroll / (TOTAL_PAGES - 1);
    // Определяем текущую страницу и прибавляем 1
    const currentPage = Math.round(list.scrollLeft / scrollStep);
    scrollToPage(currentPage + 1);
  });

  // Слушатели для точек
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => scrollToPage(index));
  });

  // Главное: обновляем интерфейс при любом скролле (кнопки, пальцы, Resize)
  list.addEventListener('scroll', updateUI);
  window.addEventListener('resize', updateUI);

  // Инициализация при загрузке
  updateUI();
}

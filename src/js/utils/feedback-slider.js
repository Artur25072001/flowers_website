export function initFeedbackSlider() {
  const list = document.querySelector('.feedback-list');
  const items = document.querySelectorAll('.feedback-item');
  const container = document.querySelector('.feedback-arrow_container');
  const leftBtn = container.querySelectorAll('.btn-arrow')[0];
  const rightBtn = container.querySelectorAll('.btn-arrow')[1];

  if (!list || !items.length || !leftBtn || !rightBtn) return;

  function getScrollStep() {
    const containerWidth = list.clientWidth;
    const itemWidth = items[0].offsetWidth + 24;
    return Math.max(1, Math.floor(containerWidth / itemWidth)) || 1;
  }

  function updateArrows() {
    const scrollLeft = list.scrollLeft;
    const maxScroll = list.scrollWidth - list.clientWidth;

    leftBtn.disabled = scrollLeft <= 5;
    leftBtn.style.opacity = leftBtn.disabled ? '0.3' : '1';

    rightBtn.disabled = scrollLeft >= maxScroll - 5;
    rightBtn.style.opacity = rightBtn.disabled ? '0.3' : '1';
  }

  rightBtn.addEventListener('click', () => {
    const nextItem = Array.from(items).find(
      item => item.offsetLeft > list.scrollLeft + list.clientWidth - 50
    );

    if (nextItem) {
      list.scrollTo({
        left: nextItem.offsetLeft,
        behavior: 'smooth',
      });
    } else {
      list.scrollTo({ left: list.scrollWidth, behavior: 'smooth' });
    }
  });

  leftBtn.addEventListener('click', () => {
    const prevItem = Array.from(items)
      .reverse()
      .find(item => item.offsetLeft < list.scrollLeft - 10);

    if (prevItem) {
      const step = getScrollStep();
      const targetIndex = Math.max(
        0,
        Array.from(items).indexOf(prevItem) - step + 1
      );

      list.scrollTo({
        left: items[targetIndex].offsetLeft,
        behavior: 'smooth',
      });
    }
  });

  list.addEventListener('scroll', updateArrows);
  window.addEventListener('resize', updateArrows);

  updateArrows();
}

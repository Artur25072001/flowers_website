export function initMenu() {
  const modalOpenBtn = document.querySelector('.modal-open_btn');
  const MenuContainer = document.querySelector('.menu-container');
  const modalCloseBtn = document.querySelector('.modal-close_btn');

  modalCloseBtn.addEventListener('click', () => {
    MenuContainer.classList.remove('is-active');
  });

  modalOpenBtn.addEventListener('click', () => {
    MenuContainer.classList.toggle('is-active');
  });
}

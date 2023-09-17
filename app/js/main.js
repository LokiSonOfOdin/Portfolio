const headerMenuBtn = document.querySelector('.header__button');
const headerCloseBtn = document.querySelector('.header__rigth-button');
const headerMenu = document.querySelector('.header__right');

headerMenuBtn.addEventListener('click', openMenu);
headerCloseBtn.addEventListener('click', closeMenu);

function openMenu(e) {
      headerMenu.classList.add('active');
  }
  
  function closeMenu() {
    headerMenu.classList.remove('active');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        closeMenu()
    }
});

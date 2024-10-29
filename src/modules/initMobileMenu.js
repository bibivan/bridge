export default () => {
  const menu = document.querySelector('.mobile-menu')
  const links = document.querySelectorAll('.mobile-menu__link')
  const burger = document.querySelector('.burger')
  const closeMenuBtn = document.querySelector('.mobile-menu__btn')
  const overlay = document.querySelector('.mobile-menu__overlay')

  const openMenu = () => {
    document.body.classList.add('no-scroll')
    menu.classList.add('mobile-menu_open')
  }
  const closeMenu = () => {
    document.body.classList.remove('no-scroll')
    menu.classList.remove('mobile-menu_open')
  }

  burger.addEventListener('click', openMenu)
  closeMenuBtn.addEventListener('click', closeMenu)
  overlay.addEventListener('click', closeMenu)
  links.forEach((link) => {
    link.addEventListener('click', closeMenu)
  })
}

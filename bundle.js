import initMainScripts from './src/modules/main.js'
import initHoverAnimations from './src/modules/hoverAnimations.js'
import initMobileMenu from '@/modules/initMobileMenu.js'
import 'normalize.css'
import '@/assets/scss/main.scss'

document.addEventListener('DOMContentLoaded', function () {
  initMobileMenu()
  initMainScripts()
  initHoverAnimations()
})

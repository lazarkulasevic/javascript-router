import router from './router/index.js'

const navLinks = document.querySelectorAll('.nav__link')

const addActiveClassToNav = () => {
    navLinks.forEach(navLink => {
        if (navLink.dataset.link === location.pathname) {
            navLink.classList.add('active')
        } else {
            navLink.classList.remove('active')
        }
    })
}

document.querySelector('.navbar').addEventListener('click', event => {
    if (event.target.classList.contains('nav__link') || event.target.classList.contains('logo')) {
        if (event.target.classList.contains('active')) return

        setTimeout(() => {
            addActiveClassToNav()
        }, 0)
    }
})

document.addEventListener('DOMContentLoaded', addActiveClassToNav)

const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.getElementById('site-navigation');
if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
        const isOpen = siteNav.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', isOpen);
    });
}

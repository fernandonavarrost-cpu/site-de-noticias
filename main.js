/* Shared layout and behavior for all pages of the site. */

const NAV_LINKS = [
    { href: 'home.html', label: 'Início' },
    { href: 'noticiarecente.html', label: 'Notícias recentes' },
    { href: 'contato.html', label: 'Contato' },
];

function renderHeader() {
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    const links = NAV_LINKS.map(
        ({ href, label }) => `<a href="${href}"${href === currentPage ? ' aria-current="page"' : ''}>${label}</a>`
    ).join('\n            ');

    return `
        <h1>Site de Notícias</h1>
        <button class="menu-toggle" aria-expanded="false" aria-controls="site-navigation" aria-label="Abrir menu">☰</button>
        <nav id="site-navigation">
            ${links}
        </nav>`;
}

function renderFooter() {
    const year = new Date().getFullYear();
    return `<p>&copy; ${year} Site de Notícias</p>`;
}

function setupMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const siteNav = document.getElementById('site-navigation');
    if (menuToggle && siteNav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = siteNav.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', isOpen);
        });
    }
}

function initLayout() {
    const header = document.querySelector('header');
    if (header) {
        header.innerHTML = renderHeader();
    }

    const footer = document.querySelector('footer');
    if (footer) {
        footer.innerHTML = renderFooter();
    }

    setupMenuToggle();
}

document.addEventListener('DOMContentLoaded', initLayout);

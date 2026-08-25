// French is the public default. The unlisted Latin version remains available
// through ?lang=la and is explicitly excluded from search indexes.
function switchLanguage(lang) {
    document.querySelectorAll('[data-fr][data-la]').forEach(el => {
        el.textContent = el.dataset[lang];
    });
}

const requestedLanguage = new URLSearchParams(window.location.search).get('lang');

if (requestedLanguage === 'la') {
    document.documentElement.lang = 'la';
    document.title = 'Jules Deret — Litterae Humaniores';
    document.querySelector('meta[name="robots"]').content = 'noindex, follow';
    document.querySelector('meta[name="description"]').content =
        'Jules Deret, litterarum humaniorum magister: lingua Latina et Graeca antiqua, paedagogia et humanitates digitales.';
    switchLanguage('la');
}

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navRight = document.querySelector('.nav-right');

hamburger.addEventListener('click', () => {
    navRight.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', navRight.classList.contains('open'));
});

// Close mobile menu on link click
navRight.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navRight.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navRight.classList.contains('open')) {
        navRight.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.focus();
    }
});

// Language switching
let currentLang = 'fr';

const langBtn = document.getElementById('lang-btn');
const dropdown = document.querySelector('.lang-dropdown');

langBtn.addEventListener('click', () => {
    dropdown.classList.toggle('open');
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.lang-switch')) {
        dropdown.classList.remove('open');
    }
});

dropdown.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        if (lang === currentLang) return;
        currentLang = lang;
        langBtn.textContent = (lang === 'fr' ? 'FR' : 'LAT') + ' ▾';
        document.documentElement.lang = lang === 'fr' ? 'fr' : 'la';
        switchLanguage(lang);
        dropdown.classList.remove('open');
    });
});

function switchLanguage(lang) {
    document.querySelectorAll('[data-fr][data-la]').forEach(el => {
        el.textContent = el.dataset[lang];
    });
}

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navRight = document.querySelector('.nav-right');

hamburger.addEventListener('click', () => {
    navRight.classList.toggle('open');
});

// Close mobile menu on link click
navRight.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navRight.classList.remove('open');
    });
});

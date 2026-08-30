(() => {
    const toggle = document.querySelector('nav > button');
    const stored = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    function applyTheme(light) {
        document.body.classList.toggle('light', light);
        toggle.setAttribute('aria-pressed', String(light));
    }

    applyTheme(stored ? stored === 'light' : prefersLight);

    toggle.addEventListener('click', () => {
        const light = !document.body.classList.contains('light');
        applyTheme(light);
        localStorage.setItem('theme', light ? 'light' : 'dark');
    });

    const hero = document.querySelector('header h1');

    if (localStorage.getItem('logo') === 'wordmark') {
        document.body.removeAttribute('data-logo');
    }

    hero.addEventListener('click', () => {
        const ascii = document.body.dataset.logo !== 'ascii';
        if (ascii) {
            document.body.dataset.logo = 'ascii';
        } else {
            document.body.removeAttribute('data-logo');
        }
        localStorage.setItem('logo', ascii ? 'ascii' : 'wordmark');
    });

    document.querySelector('footer time').textContent = new Date().getFullYear();
})();

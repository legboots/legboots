(() => {
    const EFFECTS = ['grain', 'hexdump', 'lattice', 'scanlines', 'vignette'];
    const dropdown = document.querySelector('nav details');
    const menu = dropdown.querySelector('menu');
    const stored = localStorage.getItem('effects');

    let active = stored ? JSON.parse(stored) : EFFECTS.slice();

    function apply() {
        document.querySelectorAll('[data-layer]').forEach(layer => layer.remove());

        EFFECTS.filter(name => active.includes(name)).forEach(name => {
            const layer = document.createElement('div');
            layer.dataset.layer = name;
            document.body.appendChild(layer);
        });

        menu.querySelectorAll('button').forEach(button => {
            const name = button.textContent;
            const on = name === 'none' ? active.length === 0 : active.includes(name);
            button.setAttribute('aria-pressed', String(on));
        });

        localStorage.setItem('effects', JSON.stringify(active));
    }

    ['none'].concat(EFFECTS).forEach(name => {
        const item = document.createElement('li');
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = name;
        button.addEventListener('click', () => {
            if (name === 'none') {
                active = [];
            } else if (active.includes(name)) {
                active = active.filter(other => other !== name);
            } else {
                active = active.concat(name);
            }
            apply();
        });
        item.appendChild(button);
        menu.appendChild(item);
    });

    apply();

    document.addEventListener('click', event => {
        if (dropdown.open && !dropdown.contains(event.target)) {
            dropdown.open = false;
        }
    });
})();

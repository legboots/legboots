(() => {
    const data = JSON.parse(document.querySelector('script[type="application/json"]').textContent);
    const list = document.querySelector('main ul');

    data.items.forEach(item => {
        const entry = document.createElement('li');

        const link = document.createElement('a');
        link.href = item.websiteUrl || item.projectUrl;
        link.rel = 'noopener';
        link.target = '_blank';

        const icon = document.createElement('img');
        icon.src = item.icon;
        icon.alt = '';
        icon.width = 680;
        icon.height = 680;

        const name = document.createElement('strong');
        name.textContent = item.name;

        link.append(icon, name);

        const tag = document.createElement('small');
        tag.textContent = item.tag;

        const blurb = document.createElement('p');
        blurb.textContent = item.blurb;

        if (item.websiteUrl) {
            const source = document.createElement('a');
            source.href = item.projectUrl;
            source.rel = 'noopener';
            source.target = '_blank';
            source.textContent = 'source';
            blurb.append(' ', source);
        }

        entry.append(link, tag, blurb);
        list.appendChild(entry);
    });
})();

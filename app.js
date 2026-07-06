// ---------- Header scroll & mobile nav ----------
const header = document.getElementById('site-header');
const burgerBtn = document.getElementById('burger-btn');
const mobileNav = document.getElementById('mobile-nav');

window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10 ? '0 10px 30px rgba(0,0,0,0.3)' : 'none';
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) scrollTopBtn.classList.toggle('show', window.scrollY > 500);
});

burgerBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
});
mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileNav.classList.remove('open'));
});

// ---------- Scroll to top ----------
document.getElementById('scroll-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---------- Menu render ----------
const CATEGORY_ICONS = {
    'Теплі салати': '🥗',
    'Перші страви': '🍲',
    'Хачапурі': '🫓',
    'Хінкалі': '🥟',
    'Гарніри': '🍟',
    'Пасти': '🍝',
    'Соуси, додатки': '🧂',
    'Піца': '🍕',
    'Закуски': '🧀',
    'Салати': '🥙',
    'Десерти': '🍰',
    'Дитяче меню': '🧒',
    'Гриль-меню': '🔥',
    'Гарячі страви': '🍖',
};

const menuTabsEl = document.getElementById('menu-tabs');
const menuGridEl = document.getElementById('menu-grid');

function renderTabs(activeCategory) {
    menuTabsEl.innerHTML = MENU_DATA.categories.map(cat => `
        <button class="menu-tab ${cat === activeCategory ? 'active' : ''}" data-cat="${cat}">
            ${CATEGORY_ICONS[cat] || '🍽️'} ${cat.trim()}
        </button>
    `).join('');

    menuTabsEl.querySelectorAll('.menu-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            renderTabs(btn.dataset.cat);
            renderGrid(btn.dataset.cat);
        });
    });
}

function renderGrid(category) {
    const items = MENU_DATA.items[category] || [];
    menuGridEl.innerHTML = items.map(item => `
        <div class="menu-card">
            ${item.img
                ? `<div class="menu-card-img"><img src="${item.img}" alt="${item.name}" loading="lazy"></div>`
                : `<div class="menu-card-noimg">${CATEGORY_ICONS[category] || '🍽️'}</div>`
            }
            <div class="menu-card-body">
                <div class="menu-card-top">
                    <h4>${item.name}</h4>
                    <span class="menu-card-price">${item.price} ₴</span>
                </div>
                ${item.weight ? `<div class="menu-card-weight">${item.weight}</div>` : ''}
                ${item.desc ? `<div class="menu-card-desc">${item.desc}</div>` : ''}
            </div>
        </div>
    `).join('');
}

if (typeof MENU_DATA !== 'undefined') {
    const firstCategory = MENU_DATA.categories[0];
    renderTabs(firstCategory);
    renderGrid(firstCategory);

    // ---------- Gallery from menu images ----------
    const galleryGrid = document.getElementById('gallery-grid');
    const allImages = Object.values(MENU_DATA.items)
        .flat()
        .filter(i => i.img)
        .map(i => ({ img: i.img, name: i.name }));

    // Pick a spread of ~12 images across the menu
    const step = Math.max(1, Math.floor(allImages.length / 12));
    const picked = [];
    for (let i = 0; i < allImages.length && picked.length < 12; i += step) {
        picked.push(allImages[i]);
    }
    galleryGrid.innerHTML = picked.map((item, idx) => `
        <div class="gallery-item ${idx % 5 === 0 ? 'tall' : ''}">
            <img src="${item.img}" alt="${item.name}" loading="lazy">
        </div>
    `).join('');
}

// ---------- Booking form ----------
const bookingForm = document.getElementById('booking-form');
const formSuccess = document.getElementById('form-success');

// default the date input to today, min = today
const dateInput = document.getElementById('b-date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
}

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formSuccess.classList.add('show');
    bookingForm.querySelector('button[type="submit"]').disabled = true;
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

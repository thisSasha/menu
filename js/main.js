import { renderMenu } from "./render.js";
import { dishesData } from "./store.js";


const cartButton = document.querySelector('.nav__cart');
const cart = document.querySelector('.cart');
const navTheme = document.querySelector('.nav__theme');

document.addEventListener('DOMContentLoaded', () => {
    renderMenu(dishesData);
    observeSections();
});

window.addEventListener('scroll', () => {
    observeSections();
});

function observeSections() {
    const sections = document.querySelectorAll('.dishes__section');
    const links = document.querySelectorAll('.dishes__link');
    let closestSection = null;
    let closestDistance = Infinity;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const screenCenter = window.innerHeight / 2;
        const distance = Math.abs(sectionCenter - screenCenter);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestSection = section;
        };
    });

    if (closestSection) {
        links.forEach(link => {
            link.classList.remove('_active');
        });
        const activeLink = document.querySelector(`.dishes__link[href="#${closestSection.id}"]`);
        if (activeLink) {
            activeLink.classList.add('_active');
        };
    };
};

cartButton.onclick = function () {
    cartButton.classList.toggle('_active');
    cart.classList.toggle('_active');
    document.body.classList.toggle('_whenCart');
};


navTheme.onclick = function () {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
}

let theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

document.body.classList.add(theme + '-theme');

if (theme != 'light' && theme != 'dark') {
    document.body.classList.add('light-theme')
};
import { dishesData, data, cartData, languageData } from "./store.js";

export function renderMenu() {
    const dishesContainer = document.querySelector('.dishes');
    const navContainer = document.querySelector('.dishes__nav');
    navContainer.innerHTML = '';

    Object.keys(dishesData).forEach(categoryKey => {
        const category = dishesData[categoryKey];
        const navLink = document.createElement('a');
        navLink.href = `#${categoryKey}`;
        navLink.textContent = category.name[data.language];
        navLink.classList.add('dishes__link');
        navLink.onclick = (e) => {
            e.preventDefault();
            document.querySelectorAll('.dishes__link').forEach(link => {
                link.classList.remove('_active');
            });
            navLink.classList.add('_active');
            document.querySelector(`#${categoryKey}`).scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        };
        navContainer.appendChild(navLink);

        const section = document.createElement('section');
        section.classList.add('section');
        section.id = categoryKey;
        section.innerHTML = `<h2>${category.name[data.language]}</h2>`;

        const dishesList = document.createElement('div');
        dishesList.classList.add('section__list');

        category.items.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('card', `card-num_${index}`, `${categoryKey}-${index}`);
            card.id = `dish-${index}`;

            if (cartData[categoryKey] && cartData[categoryKey].items.some(cartItem =>
                cartItem.name[data.language] === item.name[data.language] &&
                Object.values(cartItem.count).some(count => count > 0)
            )) {
                card.classList.add('_inCart');
            }
            card.innerHTML = `
                <div class="card__img">
                    <img src="./img/menu/${item.name.ru}.jpg" alt="">
                </div>
                <div class="card__content">
                    <div class="card__info">
                        <h3 class="card__name">${item.name[data.language]}</h3>
                        <p class="card__description">${item.description[data.language]}</p>
                    </div>
                    <div class="card__price">
                        ${Object.keys(item.price).map(key => `
                            <div class="card__portion">
                                <p class="portion__name">
                                    ${languageData[data.language].forJs.portion } <span class="portion__size">${key}</span> — <span class="portion__price">${item.price[key]}</span>$
                                </p>
                                <div class="portion__management">
                                    <button class="portion__remove ${categoryKey}-${index} size-${key}">-</button> 
                                    <input type="number" disabled max="" step="1" min="0" id="_input-${categoryKey}-${index}-${key}" class="portion__count size-${key}" value="0">
                                    <button class="portion__add ${categoryKey}-${index} size-${key}">+</button> 
                                </div>
                            </div>`).join('')}
                    </div>
                </div>`;

            card.querySelectorAll('.portion__add').forEach(button => {
                button.addEventListener('click', (e) => {
                    updateMenu(e.target, 'add');
                });
            });

            card.querySelectorAll('.portion__remove').forEach(button => {
                button.addEventListener('click', (e) => {
                    updateMenu(e.target, 'remove');
                });
            });

            dishesList.appendChild(card);
        });

        section.appendChild(dishesList);
        dishesContainer.appendChild(section);
    });

    document.querySelector('.dishes__link').classList.add('_active');
};

function updateMenu(button, action) {
    let elData = {
        categoryKey: button.className.split(' ')[1].split('-')[0],
        index: button.className.split(' ')[1].split('-')[1],
        size: button.className.split(' ')[2].split('-')[1],
    };
    let input = button.parentElement.querySelector('input');
    let card = document.querySelector(`.${elData.categoryKey}-${elData.index}`);

    if (action === 'add') {
        input.value++;
    } else if (action === 'remove') {
        if (input.value > 0) {
            input.value--;
        }
    }

    const allPortions = card.querySelectorAll('.portion__count');
    const allZero = Array.from(allPortions).every(input => input.value == 0);

    if (allZero) {
        card.classList.remove('_selected');
    } else {
        card.classList.add('_selected');
    }

    if (card.classList.contains('_selected')) {
        let isCategoryInCart = cartData[elData.categoryKey];
        if (!isCategoryInCart) {
            cartData[elData.categoryKey] = {
                items: [],
                name: dishesData[elData.categoryKey].name,
            };
        }

        let isItemExit = cartData[elData.categoryKey].items.some(item => item.name[data.language] === dishesData[elData.categoryKey].items[elData.index].name[data.language]);
        if (!isItemExit) {
            let newItem = { ...dishesData[elData.categoryKey].items[elData.index], count: {} };
            Object.keys(dishesData[elData.categoryKey].items[elData.index].price).forEach(size => {
                newItem.count[size] = 0;
            });
            cartData[elData.categoryKey].items.push(newItem);
        }

        let item = cartData[elData.categoryKey].items.find(item => item.name[data.language] === dishesData[elData.categoryKey].items[elData.index].name[data.language]);
        item.count[elData.size] = parseInt(input.value);
    } else {
        let item = cartData[elData.categoryKey]?.items.find(item => item.name[data.language] === dishesData[elData.categoryKey].items[elData.index].name[data.language]);
        if (item) {
            item.count[elData.size] = parseInt(input.value);
            if (item.count[elData.size] <= 0) {
                cartData[elData.categoryKey].items = cartData[elData.categoryKey].items.filter(cartItem => cartItem.name[data.language] !== item.name[data.language]);
            }
        }
    }

    cleanCartData();
    renderCart();
};

function cleanCartData() {
    Object.keys(cartData).forEach(categoryKey => {
        if (cartData[categoryKey].items.length === 0) {
            delete cartData[categoryKey];
        } else {
            cartData[categoryKey].items = cartData[categoryKey].items.filter(item => {
                return Object.values(item.count).some(count => count > 0);
            });
        }
    });
};

function renderCart() {
    const cartList = document.querySelector('.cart__list');
    cartList.innerHTML = '';

    Object.keys(cartData).forEach(categoryKey => {
        const category = cartData[categoryKey];
        const categorySection = document.createElement('section');
        categorySection.classList.add('section');
        categorySection.id = categoryKey;

        const header = document.createElement('h2');
        header.textContent = category.name[data.language];

        const itemsList = document.createElement('div');
        itemsList.classList.add('section__list');

        category.items.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.classList.add('card');
            itemCard.innerHTML = `
                <div class="card__img">
                    <img src="./img/menu/${item.name.ru}.jpg" alt="">
                </div>
                <div class="card__content">
                    <div class="card__info">
                        <h3 class="card__name">${item.name[data.language]}</h3>
                        <p class="card__description">${item.description[data.language]}</p>
                    </div>
                    <div class="card__price">
                    ${Object.keys(item.price).map(size => `
                        <div class="card__portion _${item.count[size]}">
                            <p class="portion__name">
                                ${languageData[data.language].forJs.portion} <span class="portion__size">${size}</span> — <span class="portion__price">${item.price[size]}</span>$
                            </p>
                            <p class="portion__count">${languageData[data.language].forJs.count}: <span>${item.count[size]}</span></p>
                        </div>
                    `).join('')}
                    </div>
                </div>
            `;
            itemsList.appendChild(itemCard);
        });

        categorySection.appendChild(header);
        categorySection.appendChild(itemsList);
        cartList.appendChild(categorySection);
    });

    const totalPrice = calculateTotalPrice();
    const totalElement = document.createElement('div');
    totalElement.classList.add('cart__total');
    totalElement.innerHTML = `<h2>${languageData[data.language]['forJs'].total} ${totalPrice}${data.valute}</h2>`;
    cartList.appendChild(totalElement);
};

function calculateTotalPrice() {
    let total = 0;
    Object.keys(cartData).forEach(categoryKey => {
        cartData[categoryKey].items.forEach(item => {
            Object.keys(item.price).forEach(size => {
                total += item.price[size] * item.count[size];
            });
        });
    });
    return total;
};

function renderText() {
    Object.keys(languageData[data.language]).forEach(el => {
        if (el != 'forJs') {
            document.querySelector(el).innerHTML = languageData[data.language][el];
        }
    });
};

document.addEventListener('DOMContentLoaded', renderMenu);
document.addEventListener('DOMContentLoaded', renderText);
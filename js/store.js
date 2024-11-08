export let data = {
    valute: '$',
    language: document.documentElement.lang,
    name: 'Shakespeare'
};


export let languageData = {
    ru: {
        'title': 'Меню | ' + data.name,
        '#menuTitle': 'Меню',
        '#orderTitle': 'Ваш заказ',
        'forJs': {
            total: 'Итого',
            portion: 'Порция',
            count: 'Количество'
        },
    },
    en: {
        'title': 'Menu | ' + data.name,
        '#menuTitle': 'Menu',
        '#orderTitle': 'Your Order',
        'forJs': {
            total: 'Total',
            portion: 'Portion',
            count: 'Count'
        },
    },
    de: {
        'title': 'Menü | ' + data.name,
        '#menuTitle': 'Menü',
        '#orderTitle': 'Ihre Bestellung',
        'forJs': {
            total: 'Gesamt',
            portion: 'Portion',
            count: 'Count'
        },
    },
};




export let dishesData = {
    'category1': {
        name: {
            ru: 'Напитки',
            en: 'Drinks',
            de: 'Getränke',
        },
        items: [
            {
                name: {
                    ru: 'Лимонад',
                    en: 'Lemonade',
                    de: 'Limonade',
                },
                price: {
                    '200ml': 5,
                    '500ml': 10,
                },
                description: {
                    ru: 'Освежающий напиток с лимонным вкусом',
                    en: 'Refreshing drink with lemon flavor',
                    de: 'Erfrischungsgetränk mit Zitronengeschmack',
                },
            },
            {
                name: {
                    ru: 'Мохито безалкогольный',
                    en: 'Non-alcoholic Mojito',
                    de: 'Alkoholfreier Mojito',
                },
                price: {
                    '200ml': 7,
                    '400ml': 13,
                },
                description: {
                    ru: 'Освежающий мятный коктейль с лаймом',
                    en: 'Refreshing mint cocktail with lime',
                    de: 'Erfrischender Minzcocktail mit Limette',
                },
            },
            {
                name: {
                    ru: 'Чай с лимоном',
                    en: 'Lemon Tea',
                    de: 'Zitronentee',
                },
                price: {
                    '200ml': 4,
                    '400ml': 8,
                },
                description: {
                    ru: 'Горячий чай с лимоном',
                    en: 'Hot tea with lemon',
                    de: 'Heißer Tee mit Zitrone',
                },
            },
        ],
    },
    'category2': {
        name: {
            ru: 'Булочные изделия',
            en: 'Bakery products',
            de: 'Backwaren',
        },
        items: [
            {
                name: {
                    ru: 'Круассан',
                    en: 'Croissant',
                    de: 'Croissant',
                },
                price: {
                    '100g': 4,
                    '200g': 7,
                },
                description: {
                    ru: 'Классический французский круассан',
                    en: 'Classic French croissant',
                    de: 'Klassisches französisches Croissant',
                },
            },
            {
                name: {
                    ru: 'Слойка с яблоком',
                    en: 'Apple Puff',
                    de: 'Apfeltasche',
                },
                price: {
                    '100g': 5,
                    '200g': 9,
                },
                description: {
                    ru: 'Слойка с начинкой из яблок',
                    en: 'Puff pastry with apple filling',
                    de: 'Blätterteig mit Apfelfüllung',
                },
            },
            {
                name: {
                    ru: 'Багет',
                    en: 'Baguette',
                    de: 'Baguette',
                },
                price: {
                    '100g': 3,
                    '200g': 5,
                },
                description: {
                    ru: 'Французский хлеб с хрустящей корочкой',
                    en: 'French bread with a crispy crust',
                    de: 'Französisches Brot mit knuspriger Kruste',
                },
            },
        ],
    },
    'category3': {
        name: {
            ru: 'Десерты',
            en: 'Desserts',
            de: 'Nachspeisen',
        },
        items: [
            {
                name: {
                    ru: 'Чизкейк',
                    en: 'Cheesecake',
                    de: 'Käsekuchen',
                },
                price: {
                    '100g': 6,
                    '200g': 12,
                    '300g': 16,
                },
                description: {
                    ru: 'Лёгкий сырный торт с клубничным соусом',
                    en: 'Light cheese cake with strawberry sauce',
                    de: 'Leichter Käsekuchen mit Erdbeersoße',
                },
            },
            {
                name: {
                    ru: 'Шоколадный мусс',
                    en: 'Chocolate Mousse',
                    de: 'Schokoladenmousse',
                },
                price: {
                    '100g': 8,
                    '200g': 15,
                },
                description: {
                    ru: 'Воздушный шоколадный десерт',
                    en: 'Airy chocolate dessert',
                    de: 'Luftiges Schokoladen-Dessert',
                },
            },
            {
                name: {
                    ru: 'Тирамису',
                    en: 'Tiramisu',
                    de: 'Tiramisu',
                },
                price: {
                    '100g': 10,
                    '200g': 18,
                },
                description: {
                    ru: 'Итальянский десерт с маскарпоне и кофе',
                    en: 'Italian dessert with mascarpone and coffee',
                    de: 'Italienisches Dessert mit Mascarpone und Kaffee',
                },
            },
        ],
    },
};


export let cartData = {
    
};

// if (localStorage.getItem('cartData')) {
//     cartData = JSON.parse(localStorage.getItem('cartData'));
// };


export function setCartData(newData) {
    cartData = newData;
    // localStorage.setItem('cartData', JSON.stringify(cartData));
};
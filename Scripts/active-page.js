// document.addEventListener("DOMContentLoaded", function() {
//     let location = window.location.href;
//     let cur_url = location.split('/').pop();
// console.log(cur_url)
//     let menuItems = document.querySelectorAll('.header-menu__site-navigation ul li, .header-menu__middle ul li ');
//     menuItems.forEach(function(item) {
//         let link = item.querySelector('a').getAttribute('href');
// console.log(link)
//         console.log(cur_url===link)
//         if (cur_url === link) {
//             item.classList.add('active');
//         }
//     });
// });

window.addEventListener('load', () => {
    let location = window.location.href;
    let menuItems = document.querySelectorAll('.header-menu__site-navigation ul li, .header-menu__middle ul .cart, .header-menu__basic-info ul .header-menu__basic-info__registration-entry, .header-menu__middle ul .postponed');

    console.log(location);
    menuItems.forEach(function (item) {
        let link = item.querySelector('a').href; // Получаем абсолютный путь напрямую
        if (location === link) {
            console.log(link);
            item.classList.add('active');
        }
    });
});

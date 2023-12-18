// Функция substringMatcher создает алгоритм поиска подстроки в заданном наборе строк
var substringMatcher = function(strs) {
    // Функция для проверки каждой строки из strs на наличие подстроки `q`
    return function findMatches(q, cb) {
        var matches;

        // массив, который будет заполнен строками, содержащими подстроку `q`
        matches = [];

        // регулярное выражение для определения наличия подстроки `q` в строке
        let substrRegex = new RegExp(q, 'i');

        // перебор набора строк и добавление строк, содержащие подстроку `q`, в массив `matches`
        $.each(strs, function(i, str) {
            if (substrRegex.test(str)) {
                matches.push(str);
            }
        });

        // вызов функции обратного вызова с найденными совпадениями
        cb(matches);
    };
};

// Слова среди которых будет происходить поиск. Подстроки для поиска в строках
var products = ['монстр', 'monster', 'вода', 'святой источник'];

// инициализируем Typeahead.js для элемента с id `search`
$('#search').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    },
    {
        name: 'products', // наш массив с подстроками
        source: substringMatcher(products) // использование функции substringMatcher в качестве источника данных
    });

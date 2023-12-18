document.addEventListener('DOMContentLoaded', function () {
    const preloader = document.getElementById('preloader');
    const photoCatalog = document.getElementById('photoCatalog');
    const photoTemplate = document.getElementById('photoTemplate');
    const filterButton = document.getElementById('toggleButton');

    let evenIdFilter = false;

    preloader.style.display = 'block';

    function checkNetworkStatus() {
        if (!navigator.onLine) {
            preloader.style.display = 'none';
            photoCatalog.innerHTML = '⚠ Отсутствует подключение к интернету';
            alert('Отсутствует подключение к интернету');
            return false;
        }
        return true;
    }

    filterButton.addEventListener('click', () => {
        evenIdFilter = !evenIdFilter;
        fetchData();
    });

    function fetchData() {
        if (checkNetworkStatus()) {
            const url = `https://jsonplaceholder.typicode.com/photos?_limit=10${evenIdFilter ? '&id_gte=2&_start=0' : '&id_lte=10'}`;
            preloader.style.display = 'block';

            const fetchTimeout = setTimeout(() => {
                preloader.style.display = 'none';
                photoCatalog.innerHTML = '⚠ Запрос занял слишком много времени';
                alert('Запрос занял слишком много времени');
            }, 5000); // 5 секунд

            fetch(url)
                .then(response => {
                    clearTimeout(fetchTimeout);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    preloader.style.display = 'none';
                    renderPhotoCatalog(data);
                })
                .catch(error => {
                    clearTimeout(fetchTimeout);
                    preloader.style.display = 'none';
                    photoCatalog.innerHTML = '⚠ Что-то пошло не так';
                    console.error('There has been a problem with your fetch operation:', error);
                });
        }
    }

    function renderPhotoCatalog(photos) {
        photoCatalog.innerHTML = '';
        photos.forEach(photo => {
            const template = photoTemplate.content.cloneNode(true);
            const photoElement = template.querySelector('.photo');
            photoElement.querySelector('.photo-thumbnail').src = photo.thumbnailUrl;
            photoElement.querySelector('.photo-title').textContent = photo.title;
            photoCatalog.appendChild(photoElement);
        });
    }

    window.addEventListener('online', checkNetworkStatus);
    window.addEventListener('offline', checkNetworkStatus);

    // Выполните запрос при загрузке страницы
    fetchData();
});

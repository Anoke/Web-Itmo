// document.addEventListener('DOMContentLoaded', function() {
//     let filterId = 1;
//
//     fetchUsers(filterId);
//
//     function fetchUsers(id) {
//         fetch(`https://jsonplaceholder.typicode.com/users?id=${id <= 5 ? id : '>5'}`)
//             .then(response => {
//                 document.querySelector('.preloader').style.display = 'none';
//                 return response.json();
//             })
//             .then(users => {
//                 renderUserData(users);
//             })
//             .catch(error => {
//                 console.error('Ошибка:', error);
//                 document.getElementById('userData').innerText = '? Что-то пошло не так';
//             });
//     }
//
//     document.getElementById('userProfile').addEventListener('click', function() {
//         filterId = filterId === 1 ? 10 : 1;
//         fetchUsers(filterId);
//     });
// });
//
// function renderUserData(users) {
//     const userDataContainer = document.getElementById('userData');
//     userDataContainer.innerHTML = ''; // Очищаем контейнер перед отрисовкой новых данных
//
//     const userTemplate = document.getElementById('userTemplate');
//
//     users.forEach(user => {
//         const templateContent = userTemplate.content.cloneNode(true);
//
//         templateContent.querySelector('.user-name').innerText = user.name;
//         templateContent.querySelector('.user-email').innerText = user.email;
//         templateContent.querySelector('.user-address').innerText = `${user.address.street}, ${user.address.city}`;
//         templateContent.querySelector('.user-phone').innerText = user.phone;
//
//         userDataContainer.appendChild(templateContent);
//     });
// }
//
// // document.addEventListener('DOMContentLoaded', function(){
// //     fetch('https://jsonplaceholder.typicode.com/users')
// //         .then(response =>{
// //             document.querySelector('.preloader').style.display = 'none';
// //             return response.json();
// //         })
// //         .then(data =>{
// //             console.log(data);
// //             document.getElementById('content').innerText = JSON.stringify(data);
// //             renderData(data);
// //         })
// //         .catch(error =>{
// //             console.error('errorererer', error);
// //             document.getElementById('content').innerText = 'sth went wrong'
// //         })
// // })
// // function renderdata(data){
// //     document.getElementById('content').innerText = JSON.stringify(data);
// // }

window.addEventListener('load', () => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId_lte=2`)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const template = document.querySelector('template');
                const clone = document.importNode(template.content, true);
                const divElem = clone.querySelector('.div-review');
                divElem.classList.add('div-review');

                const divName = clone.querySelector('.div-review-name');
                divName.innerHTML = `Name: ${item.name}`;

                const divEmail = clone.querySelector('.div-review-email');
                divEmail.innerHTML = `Email: ${item.email}`;

                const divBody = clone.querySelector('.div-review-body');
                divBody.innerHTML = `Body: ${item.body}`;

                document.querySelector('.reviews').appendChild(clone);
            })
        })
        .catch(error => console.log('error', error))
})


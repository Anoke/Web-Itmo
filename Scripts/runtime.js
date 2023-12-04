// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById('form');
//     const resultContainer = document.getElementById('resultContainer');
//
//     form.addEventListener('submit', (event) => {
//         event.preventDefault(); // ������������� ������������ ��������
//
//         // �������� �������� �� �����
//         const maxLessons = document.getElementById('maxLessons').value;
//         const language = document.getElementById('language').value;
//         const weekType = document.getElementById('weekType').value;
//
//         // ��������� ���������� (����� �������� �� ��������� ������� ��� ��������)
//         const result = `
//       <p>Max Lessons: ${maxLessons}</p>
//       <p>Language: ${language}</p>
//       <p>Week Type: ${weekType === 'fiveDay' ? 'Five-day week' : 'Six-day week'}</p>
//     `;
//
//         resultContainer.innerHTML = result;
//
//         // ���������� ������ � ��������� ���������
//         const formData   = {
//             maxLessons,
//             language,
//             weekType
//         };
//         localStorage.setItem('formData', JSON.stringify(formData));
//     });
//
//     // �������� ������ �� ���������� ��������� ��� �������� ��������
//     const savedFormData = localStorage.getItem('formData');
//     if (savedFormData) {
//         const parsedData = JSON.parse(savedFormData);
//         document.getElementById('maxLessons').value = parsedData.maxLessons;
//         document.getElementById('language').value = parsedData.language;
//         document.getElementById('weekType').value = parsedData.weekType;
//     }
// });
// document.addEventListener('DOMContentLoaded', () => {
//     const noteForm = document.getElementById('noteForm');
//     const noteInput = document.getElementById('noteInput');
//     const noteList = document.getElementById('noteList');
//
//     // �������� ������� �� localStorage ��� �������� ��������
//     const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
//     savedNotes.forEach(note => addNoteToList(note.text, note.completed));
//
//     // ������� ���������� ������� � ������
//     function addNoteToList(noteText, completed = false) {
//         const listItem = document.createElement('li');
//         listItem.textContent = noteText;
//         const deleteButton = document.createElement('button');
//         deleteButton.textContent = 'delete';
//         deleteButton.classList.add('deleteButton');
//         listItem.appendChild(deleteButton);
//         noteList.appendChild(listItem);
//
//         if (completed) {
//             listItem.classList.add('completed');
//         }
//
//         // ���������� ����������� ������� ��� ������������ ������ �� �����
//         listItem.addEventListener('click', () => {
//             listItem.classList.toggle('completed');
//             updateLocalStorage();
//         });
//
//         // ���������� ����������� ������� ��� �������� �������
//         deleteButton.addEventListener('click', () => {
//             listItem.remove();
//             updateLocalStorage();
//         });
//
//         // ��������� ������� � localStorage
//         updateLocalStorage();
//     }
//
//     // ��������� �������� ����� ��� ���������� �������
//     noteForm.addEventListener('submit', event => {
//         event.preventDefault(); // ������������� ����������� ��������� �����
//
//         const noteText = noteInput.value.trim();
//         if (noteText !== '') {
//             addNoteToList(noteText);
//             noteInput.value = ''; // ������� ���� �����
//         }
//     });
//
//     // ���������� ������ � localStorage
//     function updateLocalStorage() {
//         const notes = [];
//         document.querySelectorAll('#noteList li').forEach(note => {
//             notes.push({
//                 text: note.textContent,
//                 completed: note.classList.contains('completed')
//             });
//         });
//         localStorage.setItem('notes', JSON.stringify(notes));
//     }
// });
document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.getElementById('noteForm');
    const noteInput = document.getElementById('noteInput');
    const noteList = document.getElementById('noteList');
    const noteTemplate = document.getElementById('noteTemplate');
    const completedTasksElement = document.getElementById('completedTasks');
    const inProcessTasksElement = document.getElementById('inProcessTasks');
    const allTasksElement = document.getElementById('allTasks');

    noteForm.addEventListener('submit', event => {
        event.preventDefault();

        const noteText = noteInput.value.trim();
        if (noteText !== '') {
            addNoteToList(noteText);
            noteInput.value = '';
        }
    });

    function addNoteToList(noteText, completed = false) {
        const clone = document.importNode(noteTemplate.content, true);
        const noteElement = clone.querySelector('li');
        const noteSpan = clone.querySelector('span');
        const deleteButton = clone.querySelector('.deleteButton');

        noteSpan.textContent = noteText;
        if (completed) {
            noteElement.classList.add('completed');
        }

        deleteButton.addEventListener('click', () => {
            noteElement.remove();
            updateLocalStorage();
            updateCategories();
        });

        // ���������� ����������� ������� ��� ������������ ������ �� ����� �� span
        noteSpan.addEventListener('click', () => {
            noteElement.classList.toggle('completed');
            updateLocalStorage();
            updateCategories();
        });

        noteList.appendChild(clone);
        updateLocalStorage();
        updateCategories();
    }

    function updateLocalStorage() {
        const notes = [];
        noteList.querySelectorAll('li span').forEach(note => {
            const completed = note.parentElement.classList.contains('completed');
            notes.push({ text: note.textContent, completed });
        });
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function updateCategories() {
        const completedTasks = noteList.querySelectorAll('li.completed').length || 0;
        const inProcessTasks = noteList.querySelectorAll('li:not(.completed)').length || 0;
        const allTasks = noteList.querySelectorAll('li').length || 0;

        completedTasksElement.textContent = `${completedTasks}`;
        inProcessTasksElement.textContent = `${inProcessTasks}`;
        allTasksElement.textContent = `${allTasks}`;
    }

    // Load notes from local storage on page load
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    savedNotes.forEach(note => addNoteToList(note.text, note.completed));

    // Update categories on page load
    updateCategories();
});

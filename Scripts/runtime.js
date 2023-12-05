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

    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    savedNotes.forEach(note => addNoteToList(note.text, note.completed));

    updateCategories();
});

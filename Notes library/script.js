let noteCount = 0;

const addBtn = document.querySelector("#add-btn");
const clearBtn = document.querySelector("#clear-btn");
const statsBtn = document.querySelector("#stats-btn");

const notesContainer = document.querySelector("#notes-container");
const statsPanel = document.querySelector("#stats-panel");

const filter = document.querySelector("#filter");
const filterSelect = document.querySelector("#noteFilter");
const items = document.querySelectorAll(".item");

const edited = new Map();

filterSelect.addEventListener("change", function () {
  filterNotes(+this.value);
});

function checkEmpty() {
  const allNotes = document.querySelectorAll(".note");

  if (allNotes.length === 0) {
    notesContainer.innerHTML = "Заметок нет. Добавьте первую!";
    noteCount = 0;
    statsPanel.innerHTML = "";
  } else {
    filter.style.display = "flex";
    filterNotes(+filterSelect.value);
  }
}

function filterNotes(filter) {
  for (const [note, state] of edited) {
    note.style.display = filter === 0 || state === filter ? "block" : "none";
  }
}
function createNoteHTML(number) {
  return `
    <div class="note">
        <div class="note-header">
            <span class="note-title">Заметка #${number}</span>
            <div class="note-actions">
                <div class="action-btn edit-btn">Редактировать</div>
                <div class="action-btn delete-btn">Удалить</div>
            </div>
        </div>
        <div class="note-content">Содержание заметки #${number}</div>
    </div>`;
}

function addNoteEventListener() {
  const editBtn = document.querySelector(".note:last-child .edit-btn");
  const deleteBtn = document.querySelector(".note:last-child .delete-btn");

  editBtn.addEventListener("click", function () {
    const note = editBtn.closest(".note");
    const noteTitle = note.querySelector(".note-title");
    const noteContent = note.querySelector(".note-content");
    const number = noteTitle.textContent.split("#")[1];

    if (this.textContent === "Редактировать") {
      noteContent.textContent = `Отредактированная заметка #${number}`;
      this.textContent = "Сохранить";
      edited.set(note, 2);
    } else {
      noteContent.textContent = `Сохраненная заметка #${number}`;
      this.textContent = "Редактировать";
      edited.set(note, 1);
    }
  });

  deleteBtn.addEventListener("click", function () {
    const note = deleteBtn.closest(".note");
    edited.delete(note);
    note.remove();
    checkEmpty();
  });
}

addBtn.addEventListener("click", function () {
  noteCount++;

  if (noteCount === 1) {
    notesContainer.innerHTML = "";
  }

  notesContainer.insertAdjacentHTML("beforeend", createNoteHTML(noteCount));

  const lastNote = document.querySelector(".note:last-child");
  edited.set(lastNote, 0);

  addNoteEventListener();

  checkEmpty();
});

clearBtn.addEventListener("click", function () {
  notesContainer.innerHTML = "Заметок нет. Добавьте первую!";
  noteCount = 0;
  statsPanel.innerHTML = "";
});

statsBtn.addEventListener("click", function () {
  const totalCount = edited.size;

  let editedCount = 0;
  let savedCount = 0;

  for (const state of edited.values()) {
    if (state === 2) {
      editedCount++;
    }
    if (state === 1) {
      savedCount++;
    }
  }

  statsPanel.innerHTML = `
    <div class="stats-panel">
        <p>Всего заметок: ${totalCount}</p>
        <p>Редактированных заметок: ${editedCount}</p>
        <p>Сохраненных заметок: ${savedCount}</p>
    </div>`;
});

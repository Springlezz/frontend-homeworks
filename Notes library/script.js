let noteCount = 0;

const addBtn = document.querySelector("#add-btn");
const clearBtn = document.querySelector("#clear-btn");
const statsBtn = document.querySelector("#stats-btn");

const notesContainer = document.querySelector("#notes-container");
const statsPanel = document.querySelector("#stats-panel");

function checkEmpty() {
  const allNotes = document.querySelectorAll(".note");

  if (allNotes.length === 0) {
    notesContainer.innerHTML = "Заметок нет. Добавьте первую!";

    noteCount = 0;

    statsPanel.innerHTML = "";
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

function addNoteEventListeners() {
  const editBtns = document.querySelectorAll(".edit-btn");
  const deleteBtns = document.querySelectorAll(".delete-btn");

  for (let btn of editBtns) {
    btn.onClick = null;

    btn.addEventListener("click", function () {
      const note = btn.closest(".note");
      const noteTitle = note.querySelector(".note-title");
      const noteContent = note.querySelector(".note-content");
      const number = noteTitle.textContent.split("#")[1];

      if (this.textContent === "Редактировать") {
        noteContent.textContent = `Отредактированная заметка #${number}`;
        this.textContent = "Сохранить";
      } else {
        noteContent.textContent = `Сохраненная заметка #${number}`;
        this.textContent = "Редактировать";
      }
    });
  }
  for (let btn of deleteBtns) {
    btn.onClick = null;
    btn.addEventListener("click", function () {
      const note = btn.closest(".note");
      note.outerHTML = "";
      checkEmpty();
    });
  }
}

addBtn.addEventListener("click", function () {
  noteCount++;

  if (noteCount === 1) {
    notesContainer.innerHTML = "";
  }

  notesContainer.innerHTML += createNoteHTML(noteCount);

  addNoteEventListeners();
});

clearBtn.addEventListener("click", function () {
  notesContainer.innerHTML = "Заметок нет. Добавьте первую!";
  noteCount = 0;
  statsPanel.innerHTML = "";
});

statsBtn.addEventListener("click", function () {
  const allNotes = document.querySelectorAll(".note");
  const totalCount = allNotes.length;

  let editedCount = 0;
  let savedCount = 0;

  for (let note of allNotes) {
    const text = note.querySelector(".note-content").textContent;

    if (text.includes("отредактированная")) {
      editedCount++;
    }

    if (text.includes("Сохраненная")) {
      savedCount++;
    }
  }

  statsPanel.innerHTML = `
    <div>
        <p>Всего заметок: ${totalCount}</p>
        <p>Редактированных заметок: ${editedCount}</p>
        <p>Сохраненных заметок: ${savedCount}</p>
    </div>`;
});

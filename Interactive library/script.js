document.addEventListener("DOMContentLoaded", initApp);

const buttonsConfig = [
  { id: "add", text: "Добавить книгу" },
  { id: "filter-all", text: "Все книги" },
  { id: "filter-read", text: "Прочитанные" },
  { id: "clear", text: "Очистить библиотеку" },
];

function createInterface() {
  const bookList = document.querySelector("#book-list");
  const controls = document.querySelector("#controls");

  for (const buttons of buttonsConfig) {
    const button = document.createElement("button");

    button.id = buttons.id;
    button.textContent = buttons.text;

    controls.appendChild(button);
  }

  bookList.innerHTML = `
  <h2>Список книг</h2>
  <ol id="books"></ol>
  `;
}

function footerUpdate() {
  const counter = document.querySelector("#total-counter");
  counter.textContent = library.books.length;
}

function initData() {
  library.books = [];
  library.nextId = 4;
  library.activeFilter = "all";

  library.books.push(
    {
      id: 1,
      title: "Властелин колец",
      author: "Дж. Толкин",
      year: 1954,
      read: false,
    },
    {
      id: 2,
      title: "Гарри Поттер и философский камень",
      author: "Дж. К. Роулинг",
      year: 1997,
      read: true,
    },
    {
      id: 3,
      title: "Гарри Поттер и узник Азкабана",
      author: "Дж. К. Роулинг",
      year: 2004,
      read: false,
    },
  );
}

function renderBooks() {
  const bookList = document.querySelector("#books");

  bookList.innerHTML = "";

  if (library.books.length === 0) {
    showEmptyLibraryMessage();
    return;
  }

  removeEmptyLibraryMessage();

  let booksToShow = library.books;

  if (library.activeFilter === "read") {
    booksToShow = library.books.filter((book) => book.read);
    if (addRandomBook) {
      library.activeFilter = "all";
    }
  }

  for (const book of booksToShow) {
    const li = document.createElement("li");

    li.className = "book-item";
    li.dataset.bookId = book.id;

    if (book.read) {
      li.classList.add("book-read");
    }

    li.innerHTML = `
      ${book.title} - ${book.author} (${book.year})
      ${book.read ? "[ПРОЧИТАНО]" : ""}
      <button title="Удалить книгу" class="delete-button">Удалить</button>
      <button title="Изменить статус" class="read-button">${book.read ? "Не прочитано" : "Прочитано"}</button>
    `;

    bookList.appendChild(li);
  }
}

function clearLibrary() {
  const confirmed = confirm(`Удалить все книги (${library.books.length})?`);
  const bookCount = library.books.length;

  if (library.books.length === 0) {
    return;
  } else if (confirmed) {
    library.books = [];

    removeEmptyLibraryMessage();

    showEmptyLibraryMessage();

    showMessage("Библиотека очищена", "info");
    showMessage("Удалено " + bookCount + " книг.", "warning");

    renderBooks();
    renderStats();
    footerUpdate();
  }
}

function showEmptyLibraryMessage() {
  removeEmptyLibraryMessage();

  const bookList = document.querySelector("#book-list");
  const messageDiv = document.createElement("div");
  messageDiv.id = "message-without-books";
  messageDiv.textContent = "Библиотека пуста. Добавьте первую книгу.";
  bookList.appendChild(messageDiv);
}

function removeEmptyLibraryMessage() {
  const existingMessage = document.querySelector("#message-without-books");
  if (existingMessage) {
    existingMessage.remove();
  }
}

function renderStats() {
  const container = document.querySelector("#statistics");
  container.innerHTML = `
    <h2>Статистика</h2>
    <p>Всего книг: ${library.books.length}</p>
    <p>Прочитано книг: ${library.books.filter((book) => book.read).length}</p>
    <p>Не прочитано книг: ${library.books.filter((book) => !book.read).length}</p>
    `;
}

document.addEventListener("click", function (event) {
  const target = event.target;

  if (event.target.classList.contains("delete-button")) {
    const bookElement = event.target.closest(".book-item");
    const id = parseInt(bookElement.dataset.bookId);

    deleteBook(id);
  }

  if (target.id === "add") {
    addRandomBook();
  }

  if (target.id === "clear") {
    clearLibrary();
  }

  if (target.id === "filter-all") {
    library.activeFilter = "all";
    renderBooks();
  }

  if (target.id === "filter-read") {
    library.activeFilter = "read";
    renderBooks();
  }

  if (target.classList.contains("read-button")) {
    const bookElement = event.target.closest(".book-item");
    const id = parseInt(bookElement.dataset.bookId);
    toggleRead(id);
  }
});

function deleteBook(id) {
  const index = library.books.findIndex((book) => book.id === id);
  if (index !== -1) {
    const removedBook = library.books.splice(index, 1)[0];
    renderBooks();
    renderStats();
    footerUpdate();
    showMessage('Книга "' + removedBook.title + '" удалена', "info");
  }
}

document.getElementById("searchInput").addEventListener("input", function (e) {
  let query = e.target.value.toLowerCase();
  let items = document.querySelectorAll("#books .book-item");

  items.forEach((item) => {
    if (item.textContent.toLowerCase().includes(query)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
});

function addRandomBook() {
  removeEmptyLibraryMessage();

  //должно совпадать название, автор и год
  const availableBooks = books_database.filter(
    (dbBook) =>
      !library.books.some(
        (book) => book.title === dbBook.title && book.author === dbBook.author,
      ),
  );

  if (availableBooks.length === 0) {
    showMessage("Превышен лимит добавления книг", "error");
    return;
  }

  if (availableBooks.length > 0) {
    const randomBook =
      availableBooks[Math.floor(Math.random() * availableBooks.length)];

    const newBook = {
      id: library.nextId++,
      title: randomBook.title,
      author: randomBook.author,
      year: randomBook.year,
      genre: randomBook.genre,
      read: false,
    };

    library.books.push(newBook);

    renderBooks();
    renderStats();
    footerUpdate();

    showMessage("Добавлена книга " + newBook.title, "success");

    const newBookElement = document.querySelector(
      `[data-book-id="${newBook.id}"]`,
    );
    if (newBookElement) {
      newBookElement.scrollIntoView({ behavior: "smooth", block: "center" });
      newBookElement.style.transition = "background-color 0.5s";
      newBookElement.style.backgroundColor = "#a5d6ff";
      setTimeout(() => {
        newBookElement.style.backgroundColor = "";
      }, 1000);
    }
  }
}

function toggleRead(id) {
  const book = library.books.find((book) => book.id === id);

  if (book) {
    book.read = !book.read;
    renderBooks();
    renderStats();
    footerUpdate();

    showMessage('Cтатус книги "' + book.title + '" изменен', "success");
  }
}

function showMessage(text, type) {
  const container = document.querySelector("#message-container");

  const message = document.createElement("div");

  message.textContent = text;

  Object.assign(message.style, typeStyles[type]);

  container.appendChild(message);

  setTimeout(() => {
    message.remove();
  }, 3000);
}
function initApp() {
  createInterface();
  initData();
  renderBooks();
  renderStats();
  footerUpdate();
  showMessage("Библиотека загружена", "info");
}

let library = {
  books: [],
  nextId: 1,
  activeFilter: "all",
};

const books_database = [
  {
    title: "Мастер и Маргарита",
    author: "Михаил Булгаков",
    year: 1967,
    genre: "Роман",
  },
  {
    title: "Преступление и наказание",
    author: "Фёдор Достоевский",
    year: 1866,
    genre: "Роман",
  },
  { title: "Война и мир", author: "Лев Толстой", year: 1869, genre: "Роман" },
  { title: "Анна Каренина", author: "Лев Толстой", year: 1877, genre: "Роман" },
  {
    title: "Мёртвые души",
    author: "Николай Гоголь",
    year: 1842,
    genre: "Поэма",
  },
  {
    title: "Евгений Онегин",
    author: "Александр Пушкин",
    year: 1833,
    genre: "Поэма",
  },
  { title: "Отцы и дети", author: "Иван Тургенев", year: 1862, genre: "Роман" },
  {
    title: "Герой нашего времени",
    author: "Михаил Лермонтов",
    year: 1840,
    genre: "Роман",
  },
  { title: "Идиот", author: "Фёдор Достоевский", year: 1869, genre: "Роман" },
  {
    title: "Братья Карамазовы",
    author: "Фёдор Достоевский",
    year: 1880,
    genre: "Роман",
  },
  { title: "Тихий Дон", author: "Михаил Шолохов", year: 1928, genre: "Роман" },
  {
    title: "Доктор Живаго",
    author: "Борис Пастернак",
    year: 1957,
    genre: "Роман",
  },
  { title: "1984", author: "Джордж Оруэлл", year: 1949, genre: "Антиутопия" },
  {
    title: "Убить пересмешника",
    author: "Харпер Ли",
    year: 1960,
    genre: "Роман",
  },
  {
    title: "Великий Гэтсби",
    author: "Фрэнсис Скотт Фицджеральд",
    year: 1925,
    genre: "Роман",
  },
  {
    title: "Над пропастью во ржи",
    author: "Джером Сэлинджер",
    year: 1951,
    genre: "Роман",
  },
  {
    title: "Повелитель мух",
    author: "Уильям Голдинг",
    year: 1954,
    genre: "Роман",
  },
  { title: "Фауст", author: "Иоганн Гёте", year: 1808, genre: "Трагедия" },
  {
    title: "Дон Кихот",
    author: "Мигель де Сервантес",
    year: 1605,
    genre: "Роман",
  },
  { title: "Гамлет", author: "Уильям Шекспир", year: 1603, genre: "Трагедия" },
  { title: "Моби Дик", author: "Герман Мелвилл", year: 1851, genre: "Роман" },
  {
    title: "Гордость и предубеждение",
    author: "Джейн Остин",
    year: 1813,
    genre: "Роман",
  },
  {
    title: "Ярмарка тщеславия",
    author: "Уильям Теккерей",
    year: 1847,
    genre: "Роман",
  },
  {
    title: "Маленькие женщины",
    author: "Луиза Мэй Олкотт",
    year: 1868,
    genre: "Роман",
  },
];

const typeStyles = {
  success: {
    backgroundColor: "#d4edda",
    color: "#155724",
    borderColor: "#c3e6cb",
  },
  error: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
    borderColor: "#f5c6cb",
  },
  info: {
    backgroundColor: "#d1ecf1",
    color: "#0c5460",
    borderColor: "#bee5eb",
  },
  warning: {
    backgroundColor: "#fff3cd",
    color: "#856404",
    borderColor: "#ffeeba",
  },
};

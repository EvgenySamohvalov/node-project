const express = require("express");
const router = express.Router();
const store = require("../stors/store");
const Book = require("../classes/book");
const file = require("../middleware/file");
const path = require("path");

router.get("/", (req, res) => {
  res.json("Домашняя страница");
});

/* Получаем все книги */
router.get("/api/books", (req, res) => {
  const { books } = store;
  res.json(books);
});

/* Получаем одну конкретную книгу */
router.get("/api/books/:id", (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex((book) => book.id === id);

  if (idx !== -1) {
    res.json(books[idx]);
  } else {
    res.status(404);
    res.json("Книга не найдена (404)");
  }
});

/* Скачиваем книгу */
router.get("/api/books/:id/download", async (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex((book) => book.id === id);

  if (idx !== -1) {
    const file = path.join(__dirname, '..', '..', books[idx].fileBook)
    res.sendFile(file)
  } else {
    res.status(404);
    res.json("Книга не найдена (404)");
  }
});

/* Записываем книгу */
router.post("/api/books", file.single("book"), (req, res) => {
  if (req.file) {
    const { books } = store;
    const { title, description, authors, favorite, fileCover, fileName } =
      req.body;
    const { path } = req.file;

    const newBook = new Book(
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      path
    );
    books.push(newBook);

    res.status(200);
    res.json(newBook);
  } else {
    res.json();
  }
});

/* Обновляем книгу */
router.put("/api/books/:id", file.single("book"), (req, res) => {
  const { books } = store;
  const { title, description, authors, favorite, fileCover, fileName} =
    req.body;
  const fileBook = req.file.path
  const { id } = req.params;
  const idx = books.findIndex((book) => book.id === id);

  if (idx !== -1) {
    books[idx] = {
      ...books[idx],
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook
    };

    res.json(books[idx]);
  } else {
    res.status(404);
    res.json("Книга не найдена (404)");
  }
});

/* Удаление книги */
router.delete("/api/books/:id", (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex((book) => book.id === id);

  if (idx !== -1) {
    books.splice(idx, 1);
    res.json("ok");
  } else {
    res.status(404);
    res.json("Книга не найдена (404)");
  }
});

module.exports = router;

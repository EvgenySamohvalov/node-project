const express = require("express");
const router = express.Router();
const store = require("../stors/store");
const Book = require("../classes/book");
const file = require("../middleware/file");

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

/* Записываем книгу */
router.post("/api/books", file.single("user-book"), (req, res) => {
  if (req.file) {
    const { books } = store;
    const { title, description, authors, favorite, fileCover, fileName } =
      req.body;
    const { fileBook } = req.file;

    const newBook = new Book(
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook
    );
    books.push(newBook);

    res.status(200);
    res.json(newBook);
  } else {
    res.json();
  }
});

/* Обновляем книгу */
router.put("/api/books/:id", (req, res) => {
  const { books } = store;
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;
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

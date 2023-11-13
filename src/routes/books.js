const express = require("express");
const router = express.Router();
const store = require("../stors/store");
const Book = require("../classes/book");
const file = require("../middleware/file");
const path = require("path");

router.get("/", (req, res) => {
  const { books } = store;
  res.render("books/index", {
    title: "Книги",
    books: books,
  });
});

router.get("/books/create", (req, res) => {
  res.render("books/create", {
    title: "ToDo | create",
    books: {},
  });
});

router.post("/create", (req, res) => {
  const { books } = store;
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;

  const newBook = new Book(
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName
  );
  books.push(newBook);

  res.redirect("/");
});

router.get("/:id", (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx === -1) {
    res.redirect("/404");
  }

  res.render("books/view", {
    title: "ToDo | view",
    books: books[idx],
  });
});

router.get("/update/:id", (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx === -1) {
    res.redirect("/404");
  }

  res.render("books/update", {
    title: "ToDo | view",
    books: books[idx],
  });
});

router.post("/update/:id", (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;
  const idx = books.findIndex((el) => el.id === id);

  if (idx === -1) {
    res.redirect("/404");
  }

  books[idx] = {
    ...books[idx],
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
  };
  res.redirect(`/todo/${id}`);
});

router.post("/delete/:id", (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx === -1) {
    res.redirect("/404");
  }

  books.splice(idx, 1);
  res.redirect(`/`);
});

module.exports = router;

const express = require('express');
const { v4: uuid } = require('uuid');

class Book {
    constructor(
        id = uuid(),
        title = '',
        description = '',
        authors = '',
        favorite = '',
        fileCover = '',
        fileName = '',
    ) {
        this.id = id,
        this.title = title,
        this.description = description,
        this.authors = authors,
        this.favorite = favorite,
        this.fileCover = fileCover,
        this.fileName = fileName
    }
}

const stor = {
    books: []
}

const app = express()
app.use(express.json())

/* Авторизация пользователя */
app.post('/api/user/login', (req, res) => {
    const user = { id: 1, mail: "test@mail.ru" }

    res.status(201)
    res.json(user)
})

/* Получаем все книги */
app.get('/api/books', (req, res) => {
    const {books} = stor
    res.json(books)
})

/* Получаем одну конкретную книгу */
app.get('/api/books/:id', (req, res) => {
    const {books} = stor
    const {id} = req.params
    const idx = books.findIndex(book => book.id === id)

    if( idx !== -1) {
        res.json(books[idx])
    } else {
        res.status(404)
        res.json('Книга не найдена (404)')
    }
})

/* Записываем книгу */
app.post('/api/books', (req, res) => {
    const {books} = stor
    const {title, description, authors, favorite, fileCover, fileName} = req.body;

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName)
    books.push(newBook)

    res.status(200)
    res.json(newBook)
})

/* Обновляем книгу */
app.put('/api/books/:id', (req, res) => {
    const {books} = stor
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const {id} = req.params
    const idx = books.findIndex(book => book.id === id)

    if( idx !== -1) {
        books[idx] = {
            ...books[idx],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
        }

        res.json(books[idx])
    } else {
        res.status(404)
        res.json('Книга не найдена (404)')
    }
})

/* Удаление книги */
app.delete('/api/books/:id', (req, res) => {
    const {books} = stor
    const {id} = req.params
    const idx = books.findIndex(book => book.id === id)

    if( idx !== -1) {
        books.splice(idx, 1)
        res.json('ok')
    } else {
        res.status(404)
        res.json('Книга не найдена (404)')
    }
})

const POSR = process.env || 3000
app.listen(PORT)

const express = require("express");

const authorization = require("./routes/authorization");
const books = require("./routes/books");
const error404 = require("./middleware/error-404");

const app = express();
// app.use('/api/books/:id/download', express.static(__dirname + '/public'))
app.use("/api/user/login", authorization);
app.use("/api/books/:id/download", books);
app.use("/api/books/:id", books);
app.use("/api/books", books);
app.use(error404);

const PORT = process.env.PORT || 3000;
app.listen(PORT);

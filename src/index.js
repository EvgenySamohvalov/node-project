const express = require("express");

const authorization = require("./routes/authorization");
const books = require("./routes/books");
const error404 = require("./middleware/error-404");
const bodyParser = require("body-parser");

const app = express();

app.use(express.urlencoded());
app.set('views', './src/views');
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", books);
app.use('/create', books);
app.use('/:id', books);
app.use('/update/:id', books);
app.use('/delete/:id', books);
app.use(error404);

const PORT = process.env.PORT || 3000;
app.listen(PORT);

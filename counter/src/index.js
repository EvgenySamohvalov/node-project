const express = require('express');
const apiCounterRouter = require('./routes/counter');
const errorMiddleware = require('./middleware/error404');
const { port } = require("./config");

const app = express();
app.use(express.json());
app.use('/counter', apiCounterRouter);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

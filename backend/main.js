const express = require("express");
const cors = require("cors");
const path = require('path')
const { createHandler } = require("graphql-http/lib/use/express");

const schema = require('./graphql/schema')
const handlers = require('./graphql/handlers')

const app = express();

app.use(express.static(path.join(__dirname, 'view')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});
app.use(cors());
app.all(
  "/graphql",
  createHandler({ schema, rootValue: handlers })
);

app.listen(8080, () => console.log("Сервер запущен"));

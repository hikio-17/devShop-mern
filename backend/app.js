const express = require("express");
const errorMiddleware = require("./middlewares/errors");
const products = require("./routes/product");

const app = express();

app.use(express.json());

app.use("/api/v1", products);

// middlewares to handle errors
app.use(errorMiddleware);

module.exports = app;

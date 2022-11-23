const express = require("express");
const app = express();

app.use(express.json());

// // import all route
// const products = require("./routes/product");

app.use("/api/v1", (req, res) => {
  res.send("Api is running");
});

module.exports = app;

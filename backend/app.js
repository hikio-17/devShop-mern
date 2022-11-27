const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const errorMiddleware = require("./middlewares/errors");

const products = require("./routes/product");
const auth = require("./routes/auth");
const order = require("./routes/order");

const options = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

const app = express();
app.use(morgan("dev"));
app.use(cors(options));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", order);

// middlewares to handle errors
app.use(errorMiddleware);

module.exports = app;

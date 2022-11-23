const app = require("./app");
const connectDatabase = require("./config/database");

const dotenv = require("dotenv");

// set up konfigurasi env
dotenv.config({
  path: "backend/config/config.env",
});

// connecting to database
connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(
    `Server running at http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

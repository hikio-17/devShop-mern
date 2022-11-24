const app = require("./app");
const connectDatabase = require("./config/database");

const dotenv = require("dotenv");

// handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR ==> ${err.message}`);
  console.log("Shutting down the server due to uncaught exceptions");
  process.exit(1);
});

// set up konfigurasi env
dotenv.config({
  path: "backend/config/config.env",
});
console.log(a);

// connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server running at http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// Handle Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error ==> ${err.message}`);
  console.log(`Shutting down the server due to unhandled Promise rejections`);
  server.close(() => {
    process.exit(1);
  });
});

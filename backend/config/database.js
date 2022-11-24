const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_LOCAL_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((conn) => {
      console.log(
        `MongoDB Database Connected with HOST: ${conn.connection.host}`
      );
    });
};

module.exports = connectDatabase;

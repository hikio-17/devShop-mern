const connectDatabase = require("../config/database");
const Product = require("../models/product");
const data = require("../data/products.json");

const dotenv = require("dotenv");

// setting env konfigurasi
dotenv.config({
  path: "backend/config/config.env",
});

connectDatabase();

const seeder = async () => {
  try {
    await Product.deleteMany();
    console.log("Products are deleted");

    await Product.insertMany(data);
    console.log("All products are added");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seeder();

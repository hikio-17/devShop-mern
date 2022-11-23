const router = require("express").Router();

// controller
const { getProducts } = require("../controllers/productsController");

router.get("/products", getProducts);

module.exports = router;

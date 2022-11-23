const router = require("express").Router();

// controller
const {
  getProducts,
  newProduct,
} = require("../controllers/productsController");

router.get("/products", getProducts);
router.post("/product/new", newProduct);

module.exports = router;

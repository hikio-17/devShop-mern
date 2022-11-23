const router = require("express").Router();

// controller
const {
  getProducts,
  newProduct,
  getSingleProduct,
} = require("../controllers/productsController");

router.get("/products", getProducts);
router.get("/product/:id", getSingleProduct);

router.post("/product/new", newProduct);

module.exports = router;

const router = require("express").Router();

// controller
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsController");
const { isAuthenticatedUser } = require("../middlewares/auth");

router.get("/products", getProducts);
router.get("/product/:id", getSingleProduct);

router.post("/admin/product/new", isAuthenticatedUser, newProduct);
router.put("/admin/product/:id", isAuthenticatedUser, updateProduct);
router.delete("/admin/product/:id", isAuthenticatedUser, deleteProduct);

module.exports = router;

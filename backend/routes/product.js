const router = require("express").Router();

// controller
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsController");
const { isAuthenticatedUser, authorizedRoles } = require("../middlewares/auth");

router.get("/products", getProducts);
router.get("/product/:id", getSingleProduct);

router.post(
  "/admin/product/new",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  newProduct
);
router.put(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  updateProduct
);
router.delete(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  deleteProduct
);

module.exports = router;

const express = require("express");
const router = express.Router();

const { newOrder, getSingleOrder, myOrders } = require("../controllers/order");
const { isAuthenticatedUser, authorizedRoles } = require("../middlewares/auth");

router.post("/order/new", isAuthenticatedUser, newOrder);
router.get("/order/:id", isAuthenticatedUser, getSingleOrder);
router.get("/orders/me", isAuthenticatedUser, myOrders);

module.exports = router;
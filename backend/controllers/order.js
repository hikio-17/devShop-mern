const Order = require("../models/order");

const cathAsyncErrors = require("../middlewares/cathAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const order = require("../models/order");

exports.newOrder = cathAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.user.id,
    paidAt: Date.now(),
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// Get single orders ==> /api/v1/order/:id
exports.getSingleOrder = cathAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get Logged In user orders ==> /api/v1/orders/me
exports.myOrders = cathAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get all orders ==> /api/v1/admin/orders
exports.allOrders = cathAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();
  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
    return;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

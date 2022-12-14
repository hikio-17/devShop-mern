const Order = require("../models/order");
const Product = require("../models/product");

const cathAsyncErrors = require("../middlewares/cathAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

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

// Update Order --admin ==> /api/v1/order/:id
exports.updateOrder = cathAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === "Delivered") {
    return next(
      new ErrorHandler("You have already delivered this product", 400)
    );
  }
  // update stock product
  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock = product.stock - quantity;

  await product.save({ validateBeforeSave: false });
}

// Delete Order ==> /api/v1/admin/order/:id
exports.deleteOrder = cathAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this ID", 400));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});

const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrors");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "bier4r8qnemu171srnkh",
      url: "https://res.cloudinary.com/hikio-17/image/upload/v1665713641/bier4r8qnemu171srnkh.jpg",
    },
  });

  res.status(201).json({
    success: true,
    user,
  });
});

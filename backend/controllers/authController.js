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

  const token = user.getJwtToken();

  res.status(201).json({
    success: true,
    token,
  });
});

// user login ==> /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Silahkan masukkan Email dan Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new ErrorHandler("Email dan password yang anda gunakan invalid", 401)
    );
  }

  // Checks password correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(
      new ErrorHandler("Email dan password yang anda gunakan invalid", 401)
    );
  }

  const token = user.getJwtToken();

  res.status(200).json({
    status: true,
    token,
  });
});

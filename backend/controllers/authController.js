const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrors");
const sendToken = require("../utils/jwtToken");
const { now } = require("mongoose");
const sendEmail = require("../utils/sendEmail");

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
  sendToken(user, 200, res);
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
  sendToken(user, 200, res);
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("User not found with this emal", 404));
  }

  // Generate token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset password link
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}
  `;

  const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email. then ignored it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "devShop Recovery Password",
      message,
    });

    res.status(200).json({
      status: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

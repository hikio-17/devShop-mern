const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: [30, "Nama tidak boleh melebihi 30 karakter"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Masukkan alamat email yang valid"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password harus melebihi 6 karakter"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Encrypting password before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//  Return JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

// Generate passwrod reset token
userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // hash token and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // set resetPasswordExpire
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);

const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = error.message;
    // Wrong mongoose Object ID errors
    if (err.name == "CastError") {
      const message = `Resource not found. Invalid path: ${err.path}`;
      err = new ErrorHandler(message, 400);
    }

    // Wrong Mongoose Validation Error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    // Handling Mongoose duplicate key errors
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new ErrorHandler(message, 400);
    }

    // Handling JWT Token errors
    if (err.name === "JsonWebTokenError") {
      const message = "JSON Web Token is invalid. try again!!!";
      error = new ErrorHandler(message, 400);
    }

    if (err.name === "TokenExpiredError") {
      const message = "JSON Web Token is Expired. try again!!!";
      error = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDetail,
  updateUser,
  deleteUser,
} = require("../controllers/authController");
const { isAuthenticatedUser, authorizedRoles } = require("../middlewares/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/password/forgot", forgotPassword);

router.put("/password/reset/:token", resetPassword);
router.put("/password/update", isAuthenticatedUser, updatePassword);

router.put("/me/update", isAuthenticatedUser, updateProfile);
router.get("/me", isAuthenticatedUser, getUserProfile);
router.get("/logout", logout);

router.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  allUsers
);
router.get(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  getUserDetail
);
router.put(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  updateUser
);
router.delete(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizedRoles("admin"),
  deleteUser
);

module.exports = router;

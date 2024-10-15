const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");

router.post("/login", authController.handleLogin);
router.post("/verify", authController.handleVerify);
router.post("/signup", authController.handleSignup);
router.post("/updatePassword", authController.handleUpdatePassword);
router.post("/forgotPassword", authController.handleForgetPassword);
router.post(
  "/forgotPasswordForTesting",
  authController.handleForgetPasswordForTesting
);
router.post("/resetPassword", authController.handleResetPassword);

module.exports = router;

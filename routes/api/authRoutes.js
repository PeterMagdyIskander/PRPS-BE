import { Router } from "express";
const router = Router();
import { handleLogin } from "../../controllers/authController.js";

router.post("/login", handleLogin);
// router.post("/verify", handleVerify);
// router.post("/signup", handleSignup);
// router.post("/updatePassword", handleUpdatePassword);
// router.post("/forgotPassword", handleForgetPassword);
// router.post(
//   "/forgotPasswordForTesting",
//   handleForgetPasswordForTesting
// );
// router.post("/resetPassword", handleResetPassword);

export default router;

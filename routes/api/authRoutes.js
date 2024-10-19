import { Router } from "express";
const router = Router();
import { handleLogin, handleForgotPassword, handleUpdatePassword, handleSignup } from "../../controllers/authController.js";

router.post("/signup", handleSignup);
router.post("/login", handleLogin);
router.post("/updatePassword", handleUpdatePassword);
router.post("/forgotPassword", handleForgotPassword);

export default router;

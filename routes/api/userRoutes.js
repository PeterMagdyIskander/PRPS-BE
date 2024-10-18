 import { Router } from "express";
 const router = Router();
 import {handleSignup} from "../../controllers/usersController.js";

// router.route("/:email").get(usersController.getUser);
// router.route("/:email").delete(usersController.deleteUser);
router.route("/signup").post(handleSignup);
// router.route("/updatePassword").post(usersController.handleUpdatePassword);
// router.route("/updateEmail").post(usersController.handleUpdateEmail);
// router.route("/updateName").post(usersController.handleUpdateName);
// router.route("/getUserInfo/:email").get(usersController.getUserInfo);
// router.route("/updateProfileData").post(usersController.handleUpdateProfileData);
// router.route("/getImage/:userId").get(usersController.getImage);

// module.exports = router;

export default router;
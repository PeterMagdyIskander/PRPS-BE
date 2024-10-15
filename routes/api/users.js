const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");

router.route("/:email").get(usersController.getUser);
router.route("/:email").delete(usersController.deleteUser);
router.route("/signup").post(usersController.createAccount);
router.route("/updatePassword").post(usersController.handleUpdatePassword);
router.route("/updateEmail").post(usersController.handleUpdateEmail);
router.route("/updateName").post(usersController.handleUpdateName);
router.route("/getUserInfo/:email").get(usersController.getUserInfo);
router.route("/updateProfileData").post(usersController.handleUpdateProfileData);
router.route("/getImage/:userId").get(usersController.getImage);

module.exports = router;

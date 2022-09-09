const express = require("express");
const userController = require("../../controllers/userController");
const router = express.Router();
const TokenHelper = require('../../utils/tokenHelper')
const auth = require('../../utils/auth');




router.get("/address", TokenHelper.authenticateToekn, auth.authUser, userController.getAllAddress);

router.get("/user-address", TokenHelper.authenticateToekn, auth.authUser, userController.getUserAddress);

router.get("/:userId", TokenHelper.authenticateToekn, auth.authUser, userController.getUser)

router.get("/", TokenHelper.authenticateToekn, auth.authUser, userController.getAllUsers);

router.post("/signup", userController.createUser);

router.post("/login", userController.loginUser);

router.post("/add-address", TokenHelper.authenticateToekn, auth.authUser, userController.createAddress);

router.post("/edit-address", TokenHelper.authenticateToekn, auth.authUser, userController.updateAddress);

router.post("/delete-address", TokenHelper.authenticateToekn, auth.authUser, userController.deleteAddress);

router.post("/change-password", TokenHelper.authenticateToekn, auth.authUser, userController.changePassword)

router.post("/update-profile", TokenHelper.authenticateToekn, auth.authUser, userController.updateUser)

router.patch("/:userId", TokenHelper.authenticateToekn, auth.authUser, userController.updateUser);

router.delete("/:userId", TokenHelper.authenticateToekn, auth.authUser, userController.deleteUser);

module.exports = router;

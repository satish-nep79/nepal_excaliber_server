const express = require("express");
const userController = require("../../controllers/userController");
const router = express.Router();
const TokenHelper = require('../../utils/tokenHelper')
const auth = require('../../utils/auth');

router.get("/", TokenHelper.authenticateToekn, auth.authUser, userController.getAllUsers);

router.get("/:userId",TokenHelper.authenticateToekn, auth.authUser, userController.getUser)

router.post("/signup", userController.createUser);

router.post("/login", userController.loginUser);

router.post("/change-password",TokenHelper.authenticateToekn, auth.authUser, userController.changePassword)

router.patch("/:userId",TokenHelper.authenticateToekn, auth.authUser, userController.updateUser);

router.delete("/:userId",TokenHelper.authenticateToekn, auth.authUser, userController.deleteUser);

module.exports = router;

const express = require("express");
const passwordController = require("../../controllers/passwordController");
const router = express.Router();

router.post("/forget-password", passwordController.forgetPassword);
router.post("/send-otp", passwordController.sendOTP);


module.exports = router;

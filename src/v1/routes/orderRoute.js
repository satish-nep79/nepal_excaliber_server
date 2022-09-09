const express = require("express");
const orderController = require("../../controllers/orderController");
const router = express.Router();
const TokenHelper = require('../../utils/tokenHelper');
const auth = require('../../utils/auth');

router.post("/get-order/", TokenHelper.authenticateToekn , auth.authUser, orderController.getOrder);

router.get("/", TokenHelper.authenticateToekn , auth.authUser, orderController.getOrders);

router.post("/place-orders", TokenHelper.authenticateToekn , auth.authUser, orderController.createOrder)

module.exports = router;
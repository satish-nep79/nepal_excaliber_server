const express = require("express");

const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoute");
const categoryRouter = require("./routes/categoryRoutes");
const passwordRouter = require("./routes/passwordRoute");
const orderRouter = require('../v1/routes/orderRoute');

const router = express.Router();

router.use("/products", productRouter);
router.use("/user", userRouter);
router.use("/auth", passwordRouter);
router.use("/category", categoryRouter);
router.use("/order", orderRouter);

module.exports = router;
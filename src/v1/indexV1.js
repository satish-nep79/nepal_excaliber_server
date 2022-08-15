const express = require("express");

const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoute");
const categoryRouter = require("./routes/categoryRoutes");
const passwordRouter = require("./routes/passwordRoute");

const router = express.Router();

router.use("/products", productRouter);
router.use("/user", userRouter);
router.use("/auth", passwordRouter);
router.use("/category", categoryRouter);

module.exports = router;
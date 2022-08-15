const express = require("express");
const productController = require("../../controllers/productController");
const router = express.Router();
const TokenHelper = require('../../utils/tokenHelper');
const auth = require('../../utils/auth');

router.get("/", TokenHelper.authenticateToekn, auth.authUser, productController.getAllProducts);

router.get("/latest/", TokenHelper.authenticateToekn, auth.authUser, productController.getLatestProduct)

router.get("/on-sale/", TokenHelper.authenticateToekn, auth.authUser, productController.getOnSaleProducts);

router.get("/featured-products/", TokenHelper.authenticateToekn, auth.authUser, productController.getFeaturedProducts)

router.get("/id=?:productId",TokenHelper.authenticateToekn, auth.authUser, productController.getProduct)

router.post('/in-wishlist/', TokenHelper.authenticateToekn, auth.authUser, productController.isInWishList);

router.post('/wishlist/', TokenHelper.authenticateToekn, auth.authUser, productController.getWishListProducts);

router.post('/toogle-wishlist/', TokenHelper.authenticateToekn, auth.authUser, productController.toogleProductWishList);

router.post("/",TokenHelper.authenticateToekn, auth.authAdmin, productController.createOneProduct);

router.patch("/:productId",TokenHelper.authenticateToekn, auth.authAdmin, productController.updateOneProduct);

router.delete("/:productId",TokenHelper.authenticateToekn, auth.authAdmin, productController.deleteOneProduct);

module.exports = router;

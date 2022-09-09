const express = require("express");
const categoryCOntroller = require("../../controllers/categoryController");
const router = express.Router();
const TokenHelper = require('../../utils/tokenHelper');
const auth = require('../../utils/auth');

router.get("/", TokenHelper.authenticateToekn , auth.authUser, categoryCOntroller.getAllCategories);

router.get("/products/", TokenHelper.authenticateToekn, auth.authUser, categoryCOntroller.getCategory);

router.get("/search-products/", TokenHelper.authenticateToekn, auth.authUser, categoryCOntroller.searchCategoryProducts);

module.exports = router;
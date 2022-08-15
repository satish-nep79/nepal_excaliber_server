const Wishlist = require("../database/wishlist")

const getWishList = async (object) => {
    return await Wishlist.getWishList(object);
}

const isInWishList = async (userId, productId) => {
    return await Wishlist.isInWishList(userId, productId);
}

const toogleProduct = async (wishList, product) => {
    return await Wishlist.toogleProduct(wishList, product);
}

const getWishListProducts = async (userId) => {
    return await Wishlist.getWishListProducts(userId);
}


module.exports = {
    getWishList,
    toogleProduct,
    isInWishList,
    getWishListProducts
}
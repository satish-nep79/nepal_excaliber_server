const sequelize = require("../database/db");
const Models = require("../model/models");

const getWishList = async (object) => {

    return await Models.Wishlist.findOrCreate(object)
        .then(wishList => {
            return wishList;
        })
        .catch(error => {
            console.log(error);
            throw "Error adding wishList";
        });
}

const getWishListProducts = async (userId) => {

    const fetchedWishList = await Models.Wishlist.findOne({ "userId": userId })
        .then(fetchedWishList => {
            return fetchedWishList;
        }).catch(error => {
            console.log(error);
        })

    if (!fetchedWishList) {
        return false;
    }

    const fetchedProducts = await fetchedWishList.getProducts({include: [{ model: Models.Category }]})
        .then(fetchedProducts => {
            return fetchedProducts;
        }).catch(error => {
            console.log(error);
        });
    return fetchedProducts;
}

const isInWishList = async (userId, productId) => {

    const fetchedWishList = await Models.Wishlist.findOne({ "userId": userId })
        .then(fetchedWishList => {
            return fetchedWishList;
        }).catch(error => {
            console.log(error);
        })

    if (!fetchedWishList) {
        return false;
    }

    const fetchedProducts = await fetchedWishList.getProducts({ where: { id: productId } })
        .then(fetchedProducts => {
            return fetchedProducts;
        }).catch(error => {
            console.log(error);
        });

    if (fetchedProducts.length === 1) {
        return true;
    } else {
        return false;
    }

}

const toogleProduct = async (wishList, product) => {
    console.log(wishList);
    const fetchedWishList = await Models.Wishlist.findOne(
        { where: wishList })
        .then(fetchedWishList => {
            return fetchedWishList
        })
        .catch(error => {
            console.log(error);
            throw "Error fetching wish list";
        })

    if (fetchedWishList) {
        const fetchedProducts = await fetchedWishList.getProducts({ where: { id: product.id } })
            .then(fetchedProducts => {
                return fetchedProducts;
            }).catch(error => {
                console.log(error);
            });
        console.log(fetchedProducts.length);
        if (fetchedProducts.length === 1) {
            console.log("Removing");
            await fetchedWishList.removeProducts(product);
            return "Product removed from wishlist";
        } else {
            console.log("Adding");
            await fetchedWishList.addProducts(product);
            return "Product added from wishlist";
        }
    }
}

module.exports = {
    getWishList,
    toogleProduct,
    isInWishList,
    getWishListProducts
}
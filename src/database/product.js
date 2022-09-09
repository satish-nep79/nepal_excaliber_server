const { condition } = require("sequelize");
const sequelize = require("../database/db");
const Models = require("../model/models");

const getAllProducts = async () => {
    const products = await Models.Product.findAll({ order: [['createdAt', 'DESC']] });
    return products;
}

const getProducts = async (condition) => {
    const products = await Models.Product.findAndCountAll(condition);
    return products;
}

const getProduct = async (product) => {
    const fetchedProduct = await Models.Product.findOne({ where: product });
    return fetchedProduct;
}

const getProductsFor = async (product) => {
    const products = await Models.Product.findAll({ where: product, order: [['createdAt', 'DESC']] });
    return products;
}

const createProduct = async (newProduct) => {
    return await Models.Product.create(newProduct)
        .then(product => {
            console.log("Product Created");
            return product;
        }).catch(error => {
            console.log(error);
            throw error;
        });
}

module.exports = {
    getAllProducts,
    getProduct,
    getProductsFor,
    createProduct,
    getProducts,
}

const Product  = require('../database/product');

const getAllProducts = async () => {
    const products = await Product.getAllProducts();
    return products;
}

const getProduct = async (product) => {
    return await Product.getProduct(product);
}

const createOneProduct = async (newProduct) => {
    try{
        const productToInsert = newProduct;

        const createdProduct = await Product.createProduct(productToInsert);
        return createdProduct;
    }catch (error) {
        throw error;
    }
};

const getProducts = async (condition) => {
    const products  = await Product.getProducts(condition);
    return products;
}

const updateOneProduct = () => {
    return;
}

const deleteOneProduct = () => {
    return;
}

module.exports = {
    getAllProducts,
    getProduct,
    createOneProduct,
    updateOneProduct,
    deleteOneProduct,
    getProducts,
}
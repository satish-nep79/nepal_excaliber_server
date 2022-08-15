const productService = require("../services/productService");
const wishListService = require('../services/wishlist-service');
const Models = require("../model/models");

const getAllProducts = async (req, res) => {
    try {
        const allProducts = await productService.getAllProducts();
        res.send({ status: true, data: allProducts });
    } catch (error) {
        console.log(error);
        res.send({ status: false, message: "Error fetching products" });
    }
};

const getProduct = async (req, res) => {
    const productId = req.params.productId;
    console.log(productId + " dasdas");
    const product = await productService.getProduct({ id: productId });
    if (product !== null) {
        res.send({ status: true, data: product });
    } else {
        res.send({ status: false, message: "No product found" });
    }
};

const createOneProduct = async (req, res) => {

    console.log("Creating Product ....");
    const { body } = req;

    if (!body.title) {
        res.send({ status: false, message: "Title field is required" });
        return;
    } else if (!body.price) {
        res.send({ status: false, message: "Price field is required" });
        return;
    } else if (!body.description) {
        res.send({ status: false, message: "Description field is required" });
        return;
    } else if (!body.image) {
        res.send({ status: false, message: "Image field is required" });
        return;
    } else if (!body.categoryId) {
        res.send({ status: false, message: "Category Id field is required" });
        return;
    } else if (!body.quantity) {
        res.send({ status: false, message: "Quantity field is required" });
        return;
    }

    const newProduct = {
        title: body.title,
        price: body.price,
        description: body.description,
        imageUrl: body.image,
        categoryId: body.categoryId,
        quantity: body.quantity,
        sizes: body.sizes,
        colors: body.colors
    };
    try {
        const createProduct = await productService.createOneProduct(newProduct);
        res.status(201).send({ status: true, data: newProduct });

    } catch (error) {
        res.status(500).send({ status: false, message: `${error.message}` });
    }
};

const getLatestProduct = async (req, res) => {
    try {
        let limit = parseInt(req.query.limit);
        let page = parseInt(req.query.page);

        if (!page) {
            page = 1;
        }
        if (!limit) {
            limit = 10
        }

        const object = {
            offset: (page - 1) * limit,
            limit: limit,
            order: [['createdAt', 'DESC']],
            include: [{ model: Models.Category }]
        };
        console.log(object);
        const allProducts = await productService.getProducts(object);
        console.log(allProducts['count'])
        res.send({ status: true, data: { hasNextPage: ((page) * limit) < allProducts['count'], products: allProducts['rows'] } });
    } catch (error) {
        console.log(error);
        res.send({ status: false, message: "Error fetching products" });
    }
}

const getFeaturedProducts = async (req, res) => {

    let limit = req.query.limit;
    let order = req.query.order;
    let page = parseInt(req.query.page);

    if(!limit){
        limit = 10;
    }
    limit = parseInt(limit);
    if (!page) {
        page = 1;
    }
    if(!order){
        order = "desc";
    }

    const object = {
        where: {
            isFeatures: true
        },
        offset: (page - 1) * limit,
        limit: limit,
        order: [['createdAt', order.toUpperCase()]],
        include: [{ model: Models.Category }]
    };
    console.log(object);

    try {
        const allProducts = await productService.getProducts(object);
        res.send({ 
            status: true, 
            data: { 
                hasNextPage: ((page) * limit) < allProducts['count'], 
                products: allProducts['rows']
            }
        });
    } catch (error) {
        console.log(error);
        res.send({ status: false, message: "Error fetching products" });
    }

}

const getOnSaleProducts = async (req, res) => {
    try {
        let limit = parseInt(req.query.limit);
        let order = req.query.order;
        let page = parseInt(req.query.page);

        if (!page) {
            page = 1;
        }
        if (!limit) {
            limit = 10;
        }
        if (!order) {
            order = "DESC";
        }

        const object = {
            where: {
                hasOffer: true
            },
            offset: (page - 1) * limit,
            limit: limit,
            order: [['createdAt', order.toUpperCase()]],
            include: [{ model: Models.Category }]
        };

        const allProducts = await productService.getProducts(object);
        res.send({ status: true, data: { hasNextPage: ((page) * limit) < allProducts['count'], products: allProducts['rows'] } });
    } catch (error) {
        console.log(error);
        res.send({ status: false, message: "Error fetching products" });
    }

}

const isInWishList = async (req, res) => {
    try{
        const user = req.user;
        const productId = req.query.productId;
        if(!productId) return res.send({status:false, message: "Product id is must"});
        const inWishList = await wishListService.isInWishList(user.id, productId);
        res.send({status:true, inWishlist: inWishList});
    }catch(error){
        console.log(error);
        res.send({status:false, message: "Something went wrong"});
    };
}

const toogleProductWishList = async (req, res) => {
    try{
        const user = req.user;
        const wishList = await wishListService.getWishList({where:{userId: user.id}});
        console.log(wishList);
        const productId = req.query.productId;
        if(!productId) return res.send({status:false, message: "Product id is must"});
        const product = await productService.getProduct({id: productId});
        const message = await wishListService.toogleProduct({id: wishList[0].id}, product);
        res.send({status:true, message: message});
    }catch(error) {
        res.send({status:false, message: "Something went wrong"});
    };
}

const getWishListProducts = async (req, res) => {
    try{
        const user = req.user;
        const products = await wishListService.getWishListProducts(user.id);
        res.send({status:true, products: products});
    }catch(error){
        console.log(error);
        res.send({status:false, message: "Something went wrong"});
    };
}

const updateOneProduct = (req, res) => {
    const updateOneProduct = productService.updateOneProduct();
    res.send("Update an existing product");
};

const deleteOneProduct = (req, res) => {
    productService.deleteOneProduct();
    res.send("Delete an existing product");
};


module.exports = {
    getAllProducts,
    getProduct,
    createOneProduct,
    updateOneProduct,
    deleteOneProduct,
    getLatestProduct,
    getFeaturedProducts,
    getOnSaleProducts,
    toogleProductWishList,
    isInWishList,
    getWishListProducts
};
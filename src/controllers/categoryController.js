const categoryService = require('../services/categoryService');
const productService = require("../services/productService");
const Models = require("../model/models");
const Sequelize = require('sequelize');

const getAllCategories = async (req, res) => {
    const categories = await categoryService.getAllCategory();
    res.send({status: true, data: categories});
}

const getCategory = async (req, res) => {
    const categoryId = req.query.categoryId;
    let page = parseInt(req.query.page);
    const limit = 10;

    if(!categoryId){
        return res.send("CategoryId is required");
    }

    if (!page) {
        page = 1;
    }

    const object = {
        where: {categoryId: categoryId},
        offset: (page - 1) * limit,
        limit: limit,
        order: [['createdAt', 'DESC']],
        include: [{ model: Models.Category }]
    };

    const category = await categoryService.getCategory({id:categoryId});
    
    const products = await productService.getProducts(object);
    
    if(category !== null){
        res.send({status:true, data: {category: category, products: products['rows'], hasNextPage:((page) * limit) < products['count']}});
    }else{
        res.send({status:false, message: "No category found"});
    }
}

const searchCategoryProducts = async (req, res) => {
    try{
        const categoryId = req.query.id;
        const searchQuery = req.query.q;
        const Op = Sequelize.Op;

        const searchCondition = {
            where: {
                categoryId: categoryId,
                [Op.or]:[
                    {title: {
                        [Op.like]: `%${searchQuery}%`
                    }},
                    {title: {
                        [Op.like]: `%${searchQuery}%`
                    }},
                ]
            }
        }

        const products = await productService.getProducts(searchCondition);

        res.send({status: true, data: products});

    }catch(e){
        console.log(e);
        res.send({status:false, message: "Unexpected Error"});
    }
}

module.exports = {
    getAllCategories,
    getCategory,
    searchCategoryProducts
}
const sequelize = require("../database/db");
const Models = require("../model/models");

const getAllCategories = async () => {
    const categories = await Models.Category.findAll()
    return categories;
}

const getCategory = async (category) => {
    const foundCategory = await  Models.Category.findOne({where: category});
    return foundCategory;
}

module.exports = {
    getAllCategories,
    getCategory
}
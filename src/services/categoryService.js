const Category = require('../database/category');

const getAllCategory = () => {
    const categories = Category.getAllCategories();
    console.log("Categories === >" + categories); 
    return categories;
}

const getCategory = async (category) => {
    return Category.getCategory(category);
}

module.exports = {
    getAllCategory,
    getCategory
}
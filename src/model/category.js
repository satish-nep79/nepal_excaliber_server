const Sequelize = require("sequelize");
const sequelizeDb = require("../database/db");

const Category = sequelizeDb.sequelizeDb.define('category',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        },
        imageUrl: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }
);

module.exports = Category;
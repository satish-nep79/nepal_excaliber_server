const Sequelize = require("sequelize");
const sequelizeDb = require("../database/db");

const Wishlist = sequelizeDb.sequelizeDb.define('wishlist',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        }
    }
);

module.exports = Wishlist;
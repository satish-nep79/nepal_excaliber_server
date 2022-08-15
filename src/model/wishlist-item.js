const Sequelize = require("sequelize");
const sequelizeDb = require("../database/db");

const WishlistItem = sequelizeDb.sequelizeDb.define('widhlistItem',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        }
    }
);

module.exports = WishlistItem;
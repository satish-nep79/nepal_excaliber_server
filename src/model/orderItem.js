const Sequelize = require("sequelize");
const sequelizeDb = require("../database/db");

const OrderItem = sequelizeDb.sequelizeDb.define('orderItem',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        size: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        color: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        price : {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
    }
);

module.exports = OrderItem;
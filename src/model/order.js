const Sequelize = require("sequelize");
const sequelizeDb = require("../database/db");

const Order = sequelizeDb.sequelizeDb.define('order',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        totalCost: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        deliveryStatus: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        orderDate:{
            type: Sequelize.DATE,
            allowNull: false
        },
        orderCompleteDate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        paymentToken: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "Cash on delovery"
        },
        paymentStatus: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "Pending"
        },
    }
);

module.exports = Order;
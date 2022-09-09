const Sequelize = require("sequelize");
const sequelizeDb = require("../database/db");

const Address = sequelizeDb.sequelizeDb.define('address',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        label: {
            type: Sequelize.STRING,
            allowNull: false
        },
        contactName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        contact: {
            type: Sequelize.STRING,
            allowNull: false
        },
        country: {
            type: Sequelize.STRING,
            allowNull: false
        },
        provision: {
            type: Sequelize.STRING,
            allowNull: false
        },
        district: {
            type: Sequelize.STRING,
            allowNull: false
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false
        },
        street: {
            type: Sequelize.STRING,
            allowNull: false
        },
        area: {
            type: Sequelize.STRING,
            allowNull: false
        },
        zipCode: {
            type: Sequelize.STRING,
            allowNull: false
        },
    }
);

module.exports = Address;
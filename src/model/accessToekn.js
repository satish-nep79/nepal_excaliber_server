const Sequelize = require("sequelize");
const sequelizeDb = require("../database/db");

const AccessToekn = sequelizeDb.sequelizeDb.define('accessToken',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        token: {
            type: Sequelize.TEXT('long'),
            allowNull: false
        },
        expiresAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
    }
);

module.exports = AccessToekn;
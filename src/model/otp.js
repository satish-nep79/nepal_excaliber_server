const Sequelize = require("sequelize");
const sequelizeDb = require("../database/db");

const OTP = sequelizeDb.sequelizeDb.define('otp',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        otp: {
            type: Sequelize.STRING,
            allowNull: false
        },
        expiresAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        isValid: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }
);

module.exports = OTP;
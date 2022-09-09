const Sequelize = require("sequelize");
const sequelizeDb = require("../database/db");

const Product = sequelizeDb.sequelizeDb.define('product',
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
        price: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT('long'),
            allowNull: true,
        },
        quantity : {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        imageUrl: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        sizes : {
            type: Sequelize.STRING,
            get: function(){
                try{
                    return JSON.parse(this.getDataValue('sizes'));
                }catch{
                    return this.getDataValue('sizes');
                }
            },
            set: function(val){
                return this.setDataValue('sizes', JSON.stringify(val));
            },
            allowNull: true
        },
        colors : {
            type: Sequelize.STRING,
            get: function(){
                try{
                    return JSON.parse(this.getDataValue('colors'));
                }catch{
                    return this.getDataValue('colors');
                }
            },
            set: function(val){
                console.log(val);
                return this.setDataValue('colors', JSON.stringify(val));
            },
            allowNull: true
        },
        hasOffer: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        discount: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        isFeatures: {
            type: Sequelize.BOOLEAN,
            allowNull:false,
            defaultValue: false
        }
    }
);

module.exports = Product;
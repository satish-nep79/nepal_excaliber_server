const Sequelize = require("sequelize");

// const sequelizeDb = new Sequelize(
//     "b2wzj8jw6fqkhchlfuof",
//     "uomvxe14tnin7ujt",
//     "hqodN5f2Zqb063Zt18EG",
//     {
//         dialect: 'mysql',
//         host: "b2wzj8jw6fqkhchlfuof-mysql.services.clever-cloud.com",
//         port: 3306
//     }
// );

const sequelizeDb = new Sequelize(
    "nepal_xcaliber",
    "root",
    "",
    {
        dialect: 'mysql',
        host: "localhost",
    }
);

module.exports = {
    sequelizeDb
};
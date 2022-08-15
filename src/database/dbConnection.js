const defineRelations = require("./relations");
const sequelize = require('./db');
const passwordHelper = require('../utils/passwordHelper');
const User = require('./user');

const createConnection = async () => {

    await defineRelations();

    try{
        await sequelize.sequelizeDb.authenticate()
        console.log("Connection has been established succesfully");
    }catch(error){
        console.error('Unable to connect to the database:', error);
    }

    return await sequelize.sequelizeDb
    .sync()
    .then(result => {
        console.log("Database synced succesfully");
        createSuperAdmin();
        return true;
    })
    .catch( error => {
        console.log("Sync failed ", error);
        return false;
    })
}

const createSuperAdmin = async () => {

    superAdmin = {
        email: "superadmin@nepalexcaliber.com",
        username: "superadmin",
        phone: "9746306006",
        password: await passwordHelper.hashPassword("12345678"),
        name: "Super Admin",
        userType: "Admin",
        dob: "2000-02-19",
        gender: "Male"
    }
    
    const existingUser = await User.getUser({email:"superadmin@nepalexcaliber.com"});

    if(!existingUser){
        await User.createUser(superAdmin);
        console.log("Super Admin Created");
    }
}

module.exports = {createConnection};
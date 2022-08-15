const sequelize = require("../database/db");
const Models = require("../model/models");


const getAllUsers = async () => {
    const users = await  Models.User.findAll();
    return users;
}

const getUser = async (user) => {
    const founduser = await  Models.User.findOne({where: user})
    return founduser;
}

const createUser = async (newUser) => {
    
    return await Models.User.create(newUser)
    .then(user => {
        return user;
    }).catch(error => {
        console.log(error);
        return "Error creating user";
    });

}

const updateUser = async (newUser, userId) => {
    return await Models.User.update(newUser, {where: {Id:userId}})
        .then(newUser => {
            console.log("User updated");
            return newUser;
        })
        .catch(error => {
            console.log(error);
            throw "Error updating user";
        })
}

module.exports = { 
    getAllUsers,
    getUser,
    createUser,
    updateUser
};
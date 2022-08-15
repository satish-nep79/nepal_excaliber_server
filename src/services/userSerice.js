const User = require("../database/user");

const getAllUsers = () => {
    const allUsers = User.getAllUsers();
    return allUsers;
}

const getUser = async (user) => {
    return User.getUser(user);
}

const createUser = async (newUser) => {
    const userToInsert = newUser;

    const createdUser = await User.createUser(userToInsert);
    return createdUser;
};

const updateUser = async (newUser, userId) => {
    const user = await User.updateUser(newUser, userId); 
    return user;
}

const deleteUser = () => {
    return;
}

const checkEmail = async (email) => {
    const user = await User.getUser({ email: email });
    return (user !== null);
}

const checkUsername = async (username) => {
    const user = await User.getUser({ username: username });
    return (user !== null);
}

const checkPhone = async (phone) => {
    const user = await User.getUser({ phone: phone });
    return (user !== null);
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    checkEmail,
    checkUsername,
    checkPhone,
}
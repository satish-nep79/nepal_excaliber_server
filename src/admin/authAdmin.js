const userService = require('../services/userSerice');
const passwordHelper = require('../utils/passwordHelper');

const authAdmin = async (email, password) => {

    const user = await userService.getUser({ email: email, userType: "Admin"});

    try {
        if (await passwordHelper.comparePassword(password, user.password)) {
            return user;
        }
        return false;
    } catch (error){
        return false;
    }

}

module.exports = {
    authAdmin
}
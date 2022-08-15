const bcrypt = require("bcrypt");

const hashPassword = async (password) => {

    try{
        const hashedPassword = await bcrypt.hash(password,10);
        return hashedPassword;
    }catch{
        return null;
    }
    
}

const comparePassword = async (password, hashedPassword) => {

    try{
        return await bcrypt.compare(password, hashedPassword);
    }catch{
        throw "Failed to compare"
    }

}

const checkPasswordStrength = async(password) => {
    if(password.length < 8){
        return "Password cannot be less than 8";
    }else{
        return true;
    }
}

module.exports = {
    hashPassword,
    comparePassword,
    checkPasswordStrength
}
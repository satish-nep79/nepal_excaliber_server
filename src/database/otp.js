const sequelize = require("../database/db");
const Models = require("../model/models");

const addOTP = async (otp) => {

    return await Models.OTP.create(otp)
        .then(addedOTP => {
            console.log("Added Access token");
            return addedOTP;
        }
        )
        .catch(error => {
            console.log(error);
            throw "Error adding otp";
        })
}

const getOTP = async (otp) => {
    return await Models.OTP.findOne({where: otp})
    .then(fetchedOtp => {
        console.log("Otp fetched");
        return fetchedOtp;
    })
    .catch(error => {
        console.log(error);
        throw error;
    })
}

module.exports = {
    addOTP,
    getOTP
}


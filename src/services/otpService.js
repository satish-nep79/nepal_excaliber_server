const OTP  = require('../database/otp');

const createOTP = async (newOTP) => {
    const otp = await OTP.addOTP(newOTP); 
    return otp;
}

const getOTP = async (otp) => {
    const fetchedOTP = await OTP.getOTP(otp);
    return fetchedOTP;
}

module.exports = {
    createOTP,
    getOTP
}
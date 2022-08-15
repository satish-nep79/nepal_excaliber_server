const userService = require("../services/userSerice");
const otpService = require("../services/otpService");
const passwordHelper = require("../utils/passwordHelper");
const otpGenerator = require('otp-generator')
const emailjs = require('@emailjs/browser');

const forgetPassword = async (req, res) => {
    const { body } = req;

    if (!body.username) {
        res.send({ status: false, message: "Username field is required" });
        return;
    }

    const user = await userService.getUser({ username: body.username });

    if (user === null) return res.send({ status: false, message: "User not found" });
    if (user.userType === "Admin") return res.send({ status: false, message: "Sorry no user found" });

    fetchedUser = {
        id: user.id,
        email: user.email,
        username: user.username,
        phone: user.phone,
        imageUrl: user.imageUrl
    }

    return res.send({ status: true, data: fetchedUser })

};

const sendOTP = async (req, res) => {
    
    const { body } = req;

    if (!body.user) {
        res.send({ status: false, message: "User field is required" });
        return;
    }
    
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    let currentdate = new Date();
    const expireDate = new Date(currentdate.getTime() + 15*60000);
    const otpData = {
        otp: otp,
        expiresAt: expireDate,
        isValid:true,
        userId: body.user.id
    }

    await otpService.createOTP(otpData)

    res.send({status:true, message: "Otp send succesfully"});

}

module.exports = {
    forgetPassword,
    sendOTP
}
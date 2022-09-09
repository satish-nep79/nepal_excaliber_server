const userService = require("../services/userSerice");
const addressService = require("../services/addressService");
const passwordHelper = require("../utils/passwordHelper");
const tokenHelper = require('../utils/tokenHelper');
const accessTokenService = require('../services/accessTokenService');
const imageHandler = require('../images/imageHandler')

const getAllUsers = (req, res) => {
    const allUsers = userService.getAllUsers();
    res.send({ status: true, data: allUsers });
};

const getUser = (req, res) => {
    const user = userService.getUser();
    res.send({ status: false, message: "Get an existing user" });
};

const loginUser = async (req, res) => {
    const { body } = req;

    console.log(req);

    if (!body.email) {
        res.send({ status: false, message: "Email field is required" });
        return;
    } else if (!body.password) {
        res.send({ status: false, message: "Password field is required" });
        return;
    }

    const user = await userService.getUser({ email: body.email });

    if (user === null) {
        res.status(400).send({ status: false, message: "Cannot find user" });
        return;
    }

    try {
        if (await passwordHelper.comparePassword(body.password, user.password)) {
            var responseUser = user.dataValues;
            delete responseUser.password
            const accessToken = tokenHelper.generateToken(user);
            let currentdate = new Date();
            const expireDate = currentdate.setDate(currentdate.getDate() + 1);
            const tokenToUpdate = {
                type: "Bearer",
                token: accessToken,
                expiresAt: expireDate
            }
            await accessTokenService.updateOrCreateAccessToken(tokenToUpdate, user.id);
            res.send({ status: true, message: "Login successful", data: { user: responseUser, accessToken: tokenToUpdate } });
        } else {
            res.send({ status: false, message: "Password does not match" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: false, message: "Something went wrong" });
    }
}

const createUser = async (req, res) => {

    const { body } = req;
    let imageUrl = '';


    if (!body.email) {
        res.send({ status: false, message: "Email field is required" });
        return;
    } else if (!body.username) {
        res.send({ status: false, message: "Username field is required" });
        return;
    } else if (!body.phone) {
        res.send({ status: false, message: "Phone field is required" });
        return;
    } else if (!body.name) {
        res.send({ status: false, message: "Name field is required" });
        return;
    } else if (!body.password) {
        res.send({ status: false, message: "Password field is required" });
        return;
    } else if (!body.gender) {
        res.send({ status: false, message: "Gender field is required" });
        return;
    } else if (!body.userType) {
        res.send({ status: false, message: "UserType field is required" });
        return;
    } else if (body.userType.toLowerCase() !== "user") {
        res.send({ status: false, message: "No acces to register as admin" });
        return;
    }

    if (await userService.checkEmail(body.email)) {
        res.send({ status: false, message: "Email already exists" });
        return;
    } else if (await userService.checkUsername(body.username)) {
        res.send({ status: false, message: "Username already exists" });
        return;
    } else if (await userService.checkPhone(body.phone)) {
        res.send({ status: false, message: "Phone already exists" });
        return;
    }
    try {
        if (body.image) {
            console.log("image ");
            imageUrl = await imageHandler.saveToCloudinary(body.image, body.username);
        }
    } catch (error) {
        console.log("Image Upload Failed");
        res.send({ status: false, message: "Failed to save image" });
        return;
    }

    const hashedPassword = await passwordHelper.hashPassword(body.password);


    const newUser = {
        name: body.name,
        username: body.username,
        phone: body.phone,
        email: body.email,
        password: hashedPassword,
        imageUrl: imageUrl,
        gender: body.gender,
        userType: body.userType
    };

    const createUser = await userService.createUser(newUser);
    const accessToken = tokenHelper.generateToken(createUser);
    let currentdate = new Date();
    const expireDate = currentdate.setDate(currentdate.getDate() + 1);
    const tokenToInsert = {
        type: "Bearer",
        token: accessToken,
        expiresAt: expireDate,
        userId: createUser.id
    }
    await accessTokenService.createAccessToken(tokenToInsert);
    const cretedUser = {
        name: newUser.name,
        username: newUser.username,
        phone: newUser.phone,
        email: newUser.email,
        imageUrl: imageUrl,
        gender: newUser.gender,
        userType: newUser.userType
    }
    res.status(201).send({ status: true, data: { user: newUser, accessToken: tokenToInsert } });
};

const updateUser = async (req, res) => {

    const { body } = req;
    let newUser = {};

    if (body.email) {
        newUser['email'] = body.email
    }
    if (body.username) {
        newUser['username'] = body.username
    }
    if (body.phone) {
        newUser['phone'] = body.phone
    }
    if (body.name) {
        newUser['name'] = body.name;
    }
    if (body.gender) {
        newUser['gender'] = body.gender;
    }
    if (body.dob) {
        newUser['dob'] = body.dob;
    }
    try {
        if (body.image) {
            console.log("image ");
            newUser['imageUrl'] = await imageHandler.saveToCloudinary(body.image, body.username);
        }
    } catch (error) {
        console.log("Image Upload Failed");
        res.send({ status: false, message: "Failed to save image" });
        return;
    }

    const user = req.user;
    const userUpdated = await userService.updateUser(newUser, user.id);
    const userData = await userService.getUser({ email: user.email });
    if (userUpdated) {
        const updatedUser = {
            id: userData.id,
            name: userData.name,
            username: userData.username,
            phone: userData.phone,
            email: userData.email,
            imageUrl: userData.imageUrl,
            gender: userData.gender,
            dob: userData.dob,
            userType: userData.userType,
            deviceToken: userUpdated.deviceToken,
            createAt: userData.createAt,
            updatedAt: userData.updatedAt
        }
        const accessToken = tokenHelper.generateToken(userData);
        let currentdate = new Date();
        const expireDate = currentdate.setDate(currentdate.getDate() + 1);
        const tokenToInsert = {
            type: "Bearer",
            token: accessToken,
            expiresAt: expireDate,
            userId: createUser.id
        }
        await accessTokenService.createAccessToken(tokenToInsert);
        res.send({
            status: true,
            message: "Profile updated Succesfully",
            data: { user: updatedUser, accessToken: tokenToInsert }
        });
    } else {
        res.send({ status: false, message: "Failed to update profile" });
    }

};

const changePassword = async (req, res) => {
    const { body } = req;

    if (!body.oldPassword) {
        res.send({ status: false, message: "Old Password field is required" });
        return;
    } else if (!body.newPassword) {
        res.send({ status: false, message: "New Password field is required" });
        return;
    }

    const oldPassword = body.oldPassword;
    const newPassword = body.newPassword;
    const user = req.user;

    const userData = await userService.getUser({ email: user.email });

    if (await passwordHelper.comparePassword(oldPassword, userData.password)) {
        const hashedPassword = await passwordHelper.hashPassword(newPassword);
        const newUser = { password: hashedPassword }
        const updatedUser = await userService.updateUser(newUser, user.id);
        // const passwordStength = await passwordHelper.checkPasswordStrength(newPassword)

        // if(passwordStength != true){
        //     return res.send({status:false, message: passwordStength})
        // }

        // if(newPassword === oldPassword){
        //     return res.send({status: false, message:"New password cannot be same as old password"});
        // }

        if (updatedUser) {
            res.send({ status: true, message: "Password change Succesfully" });
        } else {
            res.send({ status: false, message: "Failed to change password" });
        }
    } else {
        res.send({ status: false, message: "Old password doesnot match" });
    }

}

const getAllAddress = async (req, res) => {
    const allAddress = await addressService.getAllAddress();
    res.send({ status: true, data: allAddress });
};

const getUserAddress = async (req, res) => {
    const user = req.user;
    const allAddress = await addressService.getUserAddress({ userId: user.id });
    res.send({ status: true, data: allAddress });
}

const createAddress = async (req, res) => {

    try {
        const { body } = req;
        const user = req.user;


        if (!body.country) {
            res.send({ status: false, message: "Conuntry field is required" });
            return;
        } else if (!body.provision) {
            res.send({ status: false, message: "Provision field is required" });
            return;
        } else if (!body.city) {
            res.send({ status: false, message: "City field is required" });
            return;
        } else if (!body.district) {
            res.send({ status: false, message: "District field is required" });
            return;
        } else if (!body.street) {
            res.send({ status: false, message: "Street field is required" });
            return;
        } else if (!body.zipCode) {
            res.send({ status: false, message: "Zip Code field is required" });
            return;
        } else if (!body.area) {
            res.send({ status: false, message: "Area field is required" });
            return;
        }

        const newAddress = {
            country: body.country,
            city: body.city,
            zipCode: body.zipCode,
            street: body.street,
            provision: body.provision,
            district: body.district,
            area: body.area,
            userId: user.id
        };

        const createAddress = await addressService.createAddress(newAddress);
        res.status(201).send({ status: true, data: { address: newAddress }, message: "Address succesfully created" });
    } catch (e) {
        console.log(e);
        res.send({ status: false, message: "Unexpected Error" })
    }
};

const updateAddress = async (req, res) => {

    try {
        const { body } = req;


        if (!body.address) {
            res.send({ status: false, message: "Address field is required" });
            return;
        }

        const address = body.address

        console.log(address);

        const updatedAddress = await addressService.updateAddress(address, address.id);

        if (updatedAddress === true) {
            res.status(201).send({ status: true, message: "Address succesfully updated" });
        } else {
            res.status(201).send({ status: false, message: updatedAddress });
        }
    } catch (e) {
        console.log(e);
        res.send({ status: false, message: "Unexpected Error" })
    }
};

const deleteAddress = async (req, res) => {
    try {
        const { body } = req;
        if (!body.address) {
            res.send({ status: false, message: "Address field is required" });
            return;
        }

        const deleteAddress = await addressService.deleteAddress(body.address);

        if (deleteAddress === true) {
            res.status(201).send({ status: true, message: "Address removed succesfully" });
        } else {
            res.status(201).send({ status: false, message: deleteAddress });
        }

    } catch (e) {
        console.log(e);
        res.send({ status: false, message: "Unexpected Error" })
    }
}

const deleteUser = (req, res) => {
    userService.deleteUser();
    res.send("Delete an existing user");
};



module.exports = {
    getAllUsers,
    getUser,
    loginUser,
    createUser,
    updateUser,
    deleteUser,
    changePassword,
    createAddress,
    getAllAddress,
    getUserAddress,
    updateAddress,
    deleteAddress
};
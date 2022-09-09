const sequelize = require("../database/db");
const Models = require("../model/models");

const getAllAddress = async () => {
    const address = await Models.Address.findAll()
    return address;
}

const getAddress = async (address) => {
    const foundAddress = await Models.Address.findOne({ where: address });
    return foundAddress;
}

const getUserAddress = async (address) => {
    const foundAddress = await Models.Address.findAll({ where: address });
    return foundAddress;
}

const createAddress = async (newAddress) => {
    return await Models.Address.create(newAddress)
        .then(address => {
            console.log("Address Created");
            return address;
        }).catch(error => {
            console.log(error);
            throw error;
        });
}

const updateAddress = async (newAddress, addressId) => {
    return await Models.Address.update(newAddress, { where: { id: addressId } })
        .then(newAddress => {
            if(newAddress > 0){
                return true
            }else{
                return "Address not found"
            }
        })
        .catch(error => {
            console.log(error);
            throw "Error updating Address";
            return false;
        })
}

const deleteAddress = async (address) => {
    return await Models.Address.destroy({ where: address })
    .then(deleteAddress => {
        if(deleteAddress > 0){
            return true
        }else{
            return "Address not found"
        }
    })
    .catch(error => {
        console.log(error);
        throw "Error when removing Address";
        return false;
    })
}

module.exports = {
    getAllAddress,
    getAddress,
    getUserAddress,
    createAddress,
    updateAddress,
    deleteAddress
}
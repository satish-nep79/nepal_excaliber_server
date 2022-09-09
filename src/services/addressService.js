const Address = require("../database/address");

const getAllAddress = () => {
    const allAddress = Address.getAllAddress();
    return allAddress;
}

const getAddress = async (address) => {
    return await Address.getAddress(address);
}

const getUserAddress = async (address) => {
    return await Address.getUserAddress(address);
}

const createAddress = async (newAddress) => {
    try {
        const addressToInsert = newAddress;

        const createdAddress = await Address.createAddress(addressToInsert);
        return createdAddress;
    } catch (e) {
        throw e
    }
};

const updateAddress = async (newAddress, addressId) => {
    const address = await Address.updateAddress(newAddress, addressId);
    return address;
}

const deleteAddress = async (address) => {
    return await Address.deleteAddress(address)
}


module.exports = {
    getAllAddress,
    getAddress,
    getUserAddress,
    createAddress,
    updateAddress,
    deleteAddress
}
const sequelize = require("../database/db");
const Models = require("../model/models");

const addAccessToken = async (newAccessToken) => {

    return Models.AccessToekn.create(newAccessToken)
        .then(accessToken => {
            console.log("Added Access token");
            return accessToken;
        }
        )
        .catch(error => {
            console.log(error);
            throw "Error adding token";
        })

}

const updateAccessToken = async (newAccessToken, userId) => {

    return await Models.AccessToekn.update(newAccessToken, {where: {userId:userId}})
        .then(accessToken => {
            console.log("Acess token updated");
            return accessToken;
        })
        .catch(error => {
            console.log(error);
            throw "Error updating token";
        })
}

const getAccessToken = async (accessToken) => {
    const foundAccessToken = await  Models.AccessToekn.findOne({where: accessToken})
    return foundAccessToken;
}

const updateOrCreateAccessToken = async (accessToken, userId) => {
    const fetchAccessToken = await getAccessToken({userId: userId});
    if(fetchAccessToken){
        return await updateAccessToken(accessToken, userId);
    }else{
        accessToken["userId"] = userId;
        console.log(accessToken);
        return await addAccessToken(accessToken);
    }
}

module.exports = {
    addAccessToken,
    updateAccessToken,
    getAccessToken,
    updateOrCreateAccessToken
}
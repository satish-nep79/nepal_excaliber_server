const AccessToken  = require('../database/accessToken');

const createAccessToken = async (newAccessToken) => {
    const accessToken = await AccessToken.addAccessToken(newAccessToken); 
    return accessToken;
}

const updateAccessToken = async (newAccessToken, userId) => {
    const accessToken = await AccessToken.updateAccessToken(newAccessToken, userId); 
    return accessToken;
}

const getAccessToken = async (accessToken) => {
    const fetchedAccessToekn = await AccessToken.getAccessToken(accessToken);
    return accessToken;
}

const updateOrCreateAccessToken = async (accessToken, userId) => {
    const newAccessToken = await AccessToken.updateOrCreateAccessToken(accessToken, userId);
    return newAccessToken;
}

module.exports = {
    createAccessToken,
    updateAccessToken,
    getAccessToken,
    updateOrCreateAccessToken
}
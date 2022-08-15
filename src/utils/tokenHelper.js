require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    try{
        const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '24h'});
        return accessToken;
    }catch (error) {
        console.log(error);
    }
}

const authenticateToekn = (req, res, next) => {

    const authHeader = req.headers['authorization']
    console.log(req.url)
    try{
        const tokenType = authHeader && authHeader.split(' ')[0];
        const token = authHeader && authHeader.split(' ')[1];
        if(tokenType == null || tokenType !== "Bearer") return res.status(403).send({status:false, message:"Invalid Token Header"})
        if(token == null) return res.status(403).send({status:false, message:"Authorzation missing"});
        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, object) =>{
            if(err) res.status(401).send({status:false, message:"Token Exired"});
            req.user = object.user;
            next();
        })

    }catch(error){
        return res.status(401).send({status:false, message:"Invalid Toekn"});
    }

}

module.exports = {
    generateToken,
    authenticateToekn,
}
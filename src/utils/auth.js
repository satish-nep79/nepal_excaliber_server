const authAdmin = (req, res, next) => {

    const user = req.user;

    console.log(user.userType);

    if(user === null){
        return res.status(401).send({status: false, message:"Unauthorized Access"});
    }else if( user.userType === "Admin"){
        next();
    }else{
        return res.status(401).send({status: false, message:"Unauthorized Access"});
    }

}

const authUser = (req, res, next) => {

    const user = req.user;

    if(user === null){
        res.status(401).send({status: false, message:"Unauthorized Access"});
        return;
    }else {
        
        next();
    }
}

module.exports = {
    authAdmin,
    authUser
}
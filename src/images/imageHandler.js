require('dotenv').config();
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const saveToCloudinary = async (imageBase64, username) => {

    const imageName = `${username}-${Date.now()}.jpeg`;
    const imagePath = `${__dirname}/${imageName}`;

    try{
        console.log("Current directory: ", __dirname);
        const buffer = Buffer.from(imageBase64, "base64")
        fs.writeFileSync(imagePath, buffer)//save image
        
        const uploadedResponse = await cloudinary.uploader.upload(imagePath,
            { public_id: imageName, folder: 'nepal excaliber'},
            function (error, result) {
                fs.unlinkSync(imagePath)
                if(!error){ // delete Image
                    console.log(result.secure_url);   
                }else{
                    console.log(error);
                    return error;
                }
            });
        return uploadedResponse.secure_url;
    }catch(error){
        console.log(error);
        throw error;
    }

}

module.exports = {
    saveToCloudinary,
}
import { v2 as cloudinary} from "cloudinary";
import fs from "fs"


cloudinary.config({
    cloud_name: process.env.CLOOUDINARY_NAME,
    api_key:process.env.CLOOUDINARY_API_KEY,
    api_secret:process.env.CLOOUDINARY_API_SECRET
})


const uploadOnCloudinary = async (localFilePath) => {
    try {
        // console.log(cloudinary);
        
        // console.log("local file path : ",localFilePath);
        
        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        // console.log("Response from cloudinary : ",response);
        
        // console.log(" file is uploaded on cloudinary ",response.url);
        fs.unlinkSync(localFilePath)
        return response
        
    } catch (error) {
        console.log(error);
        
        fs.unlinkSync(localFilePath)
        return null
    }
}

export {uploadOnCloudinary}





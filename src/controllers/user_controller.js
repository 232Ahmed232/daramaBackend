import { asyncHandeler } from "../utils/asyncHandler.js";

const registerUser = asyncHandeler(async(req,res)=>{

    const {fullName, email,username,password} = req.body
    console.log("Email: ",email);
    

    res.status(200).json({
        message:"ok"
    })
})


export {
    registerUser,
}
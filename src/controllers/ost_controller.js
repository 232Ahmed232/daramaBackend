import { asyncHandeler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { OST } from "../models/ost_model.js";


const addOST = asyncHandeler(async(req,res)=>{
    const {username,fullName,img} = req.body

    if (
        [fullName,username].some((field)=> field?.trim()==="")
    ) {
        throw new ApiError(400,"Fields are missing")
    }

    const ost = await OST.create({
        username,
        fullName,
        img
    })

    if (!ost) {
        throw new ApiError(500,"OST is Not SAVED")
    }

    return res.status(200).json(
        new ApiResponse(200,ost,"ost is created")
    )

})


export {
    addOST
}



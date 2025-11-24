import { asyncHandeler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Writer } from "../models/writer_model.js";


const addWriter = asyncHandeler(async(req,res)=>{
    const {username,fullName,img} = req.body

    if (
        [fullName,username].some((field)=> field?.trim()==="")
    ) {
        throw new ApiError(400,"Fields are missing")
    }

    const writer = await Writer.create({
        username,
        fullName,
        img
    })

    if (!writer) {
        throw new ApiError(500,"writer is Not SAVED")
    }

    return res.status(200).json(
        new ApiResponse(200,writer,"writer is created")
    )

})


export {
    addWriter
}



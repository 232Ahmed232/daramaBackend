import { asyncHandeler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Female_actor } from "../models/Female_actor.js";

const addFemaleActor = asyncHandeler(async(req,res)=>{
    const {username,fullName,img} = req.body

      const existedFemale = await Female_actor.findOne({
        $or:[{username},{fullName}]
    })

    if (existedFemale) {
        throw new ApiError(409,"Female Actors exist")
    }

    if (
        [fullName,username].some((field)=> field?.trim()==="")
    ) {
        throw new ApiError(400,"Fields are missing")
    }

    const Female = await Female_actor.create({
        username,
        fullName,
        img
    })

    if (!Female) {
        throw new ApiError(500,"Female Actor is Not SAVED")
    }

    return res.status(200).json(
        new ApiResponse(200,Female,"Female Actor is created")
    )

})


export {
    addFemaleActor
}



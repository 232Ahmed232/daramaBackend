import { asyncHandeler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {  Female_actor } from "../models/Female_actor.js";


const addFemaleActor = asyncHandeler(async(req,res)=>{
    const {username,fullName,img} = req.body

    if (
        [fullName,username].some((field)=> field?.trim()==="")
    ) {
        throw new ApiError(400,"Fields are missing")
    }

    const Female_actor = await Female_actor.create({
        username,
        fullName,
        img
    })

    if (!Female_actor) {
        throw new ApiError(500,"Female Actor is Not SAVED")
    }

    return res.status(200).json(
        new ApiResponse(200,Female_actor,"Female Actor is created")
    )

})


export {
    addFemaleActor
}



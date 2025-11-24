import { asyncHandeler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Actor } from "../models/actor_model.js";


const addActor = asyncHandeler(async(req,res)=>{
    const {username,fullName,img} = req.body

      const existedActor = await Actor.findOne({
        $or:[{username},{fullName}]
    })

    if (existedActor) {
        throw new ApiError(409,"Actor  exist")
    }

    if (
        [fullName,username].some((field)=> field?.trim()==="")
    ) {
        throw new ApiError(400,"Fields are missing")
    }

    const actor = await Actor.create({
        username,
        fullName,
        img
    })

    if (!actor) {
        throw new ApiError(500,"Actor is Not SAVED")
    }

    return res.status(200).json(
        new ApiResponse(200,actor,"Actor is created")
    )

})


export {
    addActor
}



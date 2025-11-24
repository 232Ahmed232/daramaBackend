import { asyncHandeler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Director } from "../models/director_model.js";


const addDirector = asyncHandeler(async(req,res)=>{
    const {username,fullName,img} = req.body

      const existedDirector = await Director.findOne({
        $or:[{username},{fullName}]
    })

    if (existedDirector) {
        throw new ApiError(409,"dIRECTOR exist")
    }

    if (
        [fullName,username].some((field)=> field?.trim()==="")
    ) {
        throw new ApiError(400,"Fields are missing")
    }

    const director = await Director.create({
        username,
        fullName,
        img
    })

    if (!director) {
        throw new ApiError(500,"director is Not SAVED")
    }

    return res.status(200).json(
        new ApiResponse(200,director,"director is created")
    )

})


export {
    addDirector
}



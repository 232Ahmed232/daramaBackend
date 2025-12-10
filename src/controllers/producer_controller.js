import { asyncHandeler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Darama } from "../models/darama_model.js";
import { getDirectorsWithDramas } from "../db/Db_aggregation.js";
import { User } from "../models/user_model.js";
import { Producer } from "../models/producer_model.js";


const addProducer = asyncHandeler(async(req,res)=>{
    const {fullName,img} = req.body

      const existedProducer = await Producer.findOne({
       fullName
    })

    if (existedProducer) {
        throw new ApiError(409,"Producer exist")
    }

    if (
        [fullName].some((field)=> field?.trim()==="")
    ) {
        throw new ApiError(400,"Fields are missing")
    }

    const producer = await Producer.create({
        fullName,
        img
    })

    if (!producer) {
        throw new ApiError(500,"producer is Not SAVED")
    }

    return res.status(200).json(
        new ApiResponse(200,producer,"producer is created")
    )

})

export {
    addProducer
}
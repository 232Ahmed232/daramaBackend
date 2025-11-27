import { asyncHandeler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Female_actor } from "../models/Female_actor.js";
import { Darama } from "../models/darama_model.js";
import { getFemaleActorsWithDramas } from "../db/Db_aggregation.js";

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


const  popularDramaFemale = asyncHandeler(async(req,res)=>{
    const drama = await Darama.find({name:{$in:['Tere Bin']}})
        
    const changeFemale_actor = await Female_actor.findOneAndUpdate(
                {
                    fullName:"Yumna Zaidi"
                },
                {
                    $set:{
                    popularDarams:drama.map(darm => darm)
                    }
                },
                { new: true },
            )   
            await changeFemale_actor.save()
            res.status(200).json(
                    new ApiResponse(200,changeFemale_actor, "Updated actors")
                )
})


const getFemalewithDrama = asyncHandeler(async(req,res)=>{
    const gettingFemaleActors = await getFemaleActorsWithDramas()
    res.status(200).json(
                    new ApiResponse(200,gettingFemaleActors, "Getting Female Actors")
                )
})



export {
    addFemaleActor,
    popularDramaFemale,
    getFemalewithDrama
}



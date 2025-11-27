import { asyncHandeler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Actor } from "../models/actor_model.js";
import { getActorsWithDramas } from "../db/Db_aggregation.js";
import { Darama } from "../models/darama_model.js";


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

const addingPopulardarams = asyncHandeler(async(req,res)=>{
    const drama = await Darama.find({name:{$in:['Tere Bin']}})

    const changeActor = await Actor.findOneAndUpdate(
        {
            fullName:"Wahaj Ali"
        },
        {
            $set:{
            popularDarams:drama.map(darm => darm)
            }
        },
        { new: true },
    )   
    await changeActor.save()
     
        res.status(200).json(
        new ApiResponse(200,changeActor, "Updated actors")
      )
})


const getActor = asyncHandeler(async(req,res)=>{
    const gettingActors = await getActorsWithDramas()
    res.status(200).json(
        new ApiResponse(200,gettingActors, "Actors with Daramas")
      )
})



export {
    addActor,
    getActor,
    addingPopulardarams
}



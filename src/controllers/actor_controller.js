import { asyncHandeler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Actor } from "../models/actor_model.js";
import { getActorsWithDramas } from "../db/Db_aggregation.js";
import { Darama } from "../models/darama_model.js";
import { User } from "../models/user_model.js";


const addActor = asyncHandeler(async(req,res)=>{
    const {fullName,img} = req.body

      const existedActor = await Actor.findOne({
        fullName
    })

    if (existedActor) {
        throw new ApiError(409,"Actor  exist")
    }

    if (
        [fullName].some((field)=> field?.trim()==="")
    ) {
        throw new ApiError(400,"Fields are missing")
    }

    const actor = await Actor.create({
        username:"",
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


const addChar = asyncHandeler(async(req,res)=>{
    const {username,fullName} = req.body

    const changeActor = await Actor.findOneAndUpdate(
        {
            fullName
        },
        {
            $set:{
                username:username
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

const getActorVoted = asyncHandeler(async(req,res)=>{
    const userId = req.user?._id
    const userAlreadyVoted = await User.findById(userId)
    if (userAlreadyVoted.isVotedActor) {
       throw new ApiError(409,"User already voted")
    }

    const actorId = req.params._id
    // console.log(actorId);
    
   const VotedActor =  await Actor.findById(actorId)
        
    if (VotedActor) {
        VotedActor.votedBy.push({user:userId})
        VotedActor.votes +=1 

        await VotedActor.save()

        userAlreadyVoted.isVotedActor = true
        await userAlreadyVoted.save()
        res.status(200).json(
        new ApiResponse(200,VotedActor, "Actors with votes")
      )
    }else{
        throw new ApiError(409,"User Not  voted")
    }    

})



export {
    addActor,
    getActor,
    addingPopulardarams,
    getActorVoted,
    addChar
}



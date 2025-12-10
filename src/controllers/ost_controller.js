import { asyncHandeler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { OST } from "../models/ost_model.js";
import { User } from "../models/user_model.js";


const addOST = asyncHandeler(async(req,res)=>{
    const {fullName,singer,Link} = req.body

      const existedost = await OST.findOne({
        $or:[{fullName}]
    })

    if (existedost) {
        throw new ApiError(409,"ost exist")
    }

    if (
        [fullName,singer].some((field)=> field?.trim()==="")
    ) {
        throw new ApiError(400,"Fields are missing")
    }

    const ost = await OST.create({
        
        fullName,
        singer,
        Link
    })

    if (!ost) {
        throw new ApiError(500,"OST is Not SAVED")
    }

    return res.status(200).json(
        new ApiResponse(200,ost,"ost is created")
    )

})


const getOstVoted = asyncHandeler(async(req,res)=>{
    const userId = req.user?._id
    console.log(req.user);
    
    const userAlreadyVoted = await User.findById(userId)
    if (userAlreadyVoted.isVotedOst) {
       throw new ApiError(409,"User already voted")
    }

    const OstId = req.params._id
    // console.log(actorId);
    
   const VotedOst =  await OST.findById(OstId)
        
    if (VotedOst) {
        VotedOst.votedBy.push({user:userId})
        VotedOst.votes +=1 

        await VotedOst.save()

        userAlreadyVoted.isVotedOst = true
        await userAlreadyVoted.save()
        res.status(200).json(
        new ApiResponse(200,VotedOst, "Ost with votes")
      )
    }else{
        throw new ApiError(409,"User Not  voted")
    }    

})

export {
    addOST,
    getOstVoted
}



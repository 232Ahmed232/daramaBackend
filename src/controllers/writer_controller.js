import { asyncHandeler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Writer } from "../models/writer_model.js";
import { Darama } from "../models/darama_model.js";


const addWriter = asyncHandeler(async(req,res)=>{
    const {username,fullName,img} = req.body


      const existedWriter = await Writer.findOne({
        $or:[{username},{fullName}]
    })

    if (existedWriter) {
        throw new ApiError(409,"Writer exist")
    }

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

const popularDramaswithWriter = asyncHandeler(async(req,res)=>{
        const drama = await Darama.find({name:{$in:['Tere Bin']}})
    
        const changeWriter = await Writer.findOneAndUpdate(
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
                await changeWriter.save()
                res.status(200).json(
                        new ApiResponse(200,changeWriter, "Updated")
                    )
    })

    
const getWriterwithDrama = asyncHandeler(async(req,res)=>{
    const gettingWriters = await getWriterwithDrama()

    res.status(200).json(
                        new ApiResponse(200,gettingWriters, "Updated Writers")
                    )
})

export {
    addWriter,
    popularDramaswithWriter
}



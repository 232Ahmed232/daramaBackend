import mongoose from "mongoose";

const ostSchema = new mongoose.Schema({
    
    
    fullName:{
        type:String,
        required :true,
        trim:true,
        index:true      
    },

    Link:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
    },
    popularDarams:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Darama"
            }
    ],


    votes:{
        type:Number,
        default:0
    },
    isActive:{
        type:Boolean,
        default:false
    }

},{timestamps:true})

export const OST = mongoose.model("Ost",ostSchema)
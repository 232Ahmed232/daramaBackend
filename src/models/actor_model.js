import mongoose from "mongoose";

const actorSchema = new mongoose.Schema({
     username:{
        type:String,
        required :true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    
    fullName:{
        type:String,
        required :true,
        trim:true,
        index:true      
    },

    img:{
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

export const Actor = mongoose.model("Actor",actorSchema)
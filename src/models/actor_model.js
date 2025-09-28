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
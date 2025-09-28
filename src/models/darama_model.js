import mongoose,{Schema} from "mongoose";

const daramaSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    
    plot:{
        type:String,
        
    },
    ost:{
        type:String,
        
    },
    year:{
        type:Number,
        required:true
    },
    channel:{
        type:String,
        required:true
    },
    NoofEpisodes:{
        type:String,
    },
    writers:[
        {
        type:String,
    },
    ],
    directors:[
        {
        type:String,
    },
    ],
    producers:[
        {
        type:String,
    },
    ],
    generes:[
        {
        type:String,
    },
    ],
    actors:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Actor"
        }
    ],
    
    
},{timestamps:true})

export const Darama = mongoose.model("Darama",daramaSchema)
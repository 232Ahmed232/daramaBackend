import mongoose,{Schema} from "mongoose";

const daramaSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    poster:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
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
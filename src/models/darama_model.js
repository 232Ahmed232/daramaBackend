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
    ost:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"OST"
        }
    ],
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
            type:mongoose.Schema.Types.ObjectId,
            ref:"Writer"
        }
    ],
    directors:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Director"
        }
    ],
    producers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Director"
        }
    ],
   genres: {
    type: [String],
    required: true
  },
    actors:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Actor"
        }
    ],
    Female_actors:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Female_actor"
        }
    ],
    
    
},{timestamps:true})

export const Darama = mongoose.model("Darama",daramaSchema)
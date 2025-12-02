import mongoose from "mongoose";

const directorSchema = new mongoose.Schema({
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
    votedBy:[
           { 
            user : {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
             votedAt: {
                    type: Date,
                    default: Date.now()
                }
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

export const Director = mongoose.model("Director",directorSchema)
import mongoose,{Schema} from "mongoose";

const ratingSchema = new Schema({
    stars : {
        type :Number,
        default:0,
        required:true
    },
    score : {
        type :Number,
        default:0,
        required:true
    },
    comment : {
        type :String,
        required:true
    },
},{timestamps:true})


export const Rating = mongoose.model("Rating",ratingSchema)
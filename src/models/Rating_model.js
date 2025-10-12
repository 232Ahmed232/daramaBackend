import mongoose, { Schema } from "mongoose";

const ratingSchema = new Schema({
    stars: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
        required: true
    },
    score: {
        type: Number,
        default: 0,
        required: true
    },
    comment: {
        type: String,
        required: true

    },
    drama: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Drama",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })


export const Rating = mongoose.model("Rating", ratingSchema)
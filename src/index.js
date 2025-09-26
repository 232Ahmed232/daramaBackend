// require("dotenv").config({path:'./env'})
import dotenv from "dotenv"

import connectDB from "./db/DBconnection.js"
import { app } from "./app.js"


dotenv.config({
    path:'./env'
})

// import express from "express"
// const app = express()

// ;(async ()=> {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//     } catch (error) {
//         console.error("ERROR: ",error);
//         throw error
//     }
// })()

connectDB().then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log("Server is Running: ",process.env.PORT); 
    })
}).catch((err)=>{
    console.log("MONGODB connection failed: ",err);
    
})
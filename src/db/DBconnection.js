import mongoose from "mongoose";

import { DB_NAME } from "../constant.js";



const connectDB = async ()=>{
    try {
        const connectionOBJ = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\nMONGODB is connected and HOST on ${connectionOBJ.connection.host}`);
        
    } catch (error) {
        console.log("MONGODB connection error ",error);
        process.exit(1)
        
    }
}


export default connectDB;
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(cors(
    {
        origin:process.env.CORS_ORIGIN,
        credentials:true
    }
))


app.use(express.json({limit:"16kb"})) 
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes 
import userRouter from "./routes/user_routes.js"

import actorRoutes from "./routes/actor_routes.js"

import daramaRoutes from "./routes/darama_route.js"


app.use("/api/v1/users",userRouter)
app.use("/api/v1/actors",actorRoutes)
app.use("/api/v1/daramas",daramaRoutes)

export {app}
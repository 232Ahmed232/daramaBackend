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

import ratingRoute from "./routes/rating_route.js"

import Femaleactorroutes from "./routes/Female_actor_routes.js"

import writerroutes from "./routes/writer_routes.js"

import director_routes from "./routes/director_routes.js"

import ost_routes from "./routes/ost_routes.js"


app.use("/api/v1/users",userRouter)

app.use("/api/v1/actors",actorRoutes)

app.use("/api/v1/ost",ost_routes)

app.use("/api/v1/Femaleactors",Femaleactorroutes)

app.use("/api/v1/writer",writerroutes)

app.use("/api/v1/director",director_routes)

app.use("/api/v1/daramas",daramaRoutes)

app.use("/api/v1/ratings",ratingRoute)

export {app}
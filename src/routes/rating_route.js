import { Router } from "express";
import { addRating } from "../controllers/rating_controller.js";
import { veriftJWT } from "../middlewares/auth_middlewear.js";



const router = Router()

router.route("/add").post(veriftJWT ,addRating)



export default router
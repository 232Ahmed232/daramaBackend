import { Router } from "express";
import { veriftJWT } from "../middlewares/auth_middlewear.js";
import { addProducer } from "../controllers/producer_controller.js";


const router = Router()


router.route("/add").post(addProducer)



export default router
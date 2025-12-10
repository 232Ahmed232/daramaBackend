import { Router } from "express";
import { addFemaleActor, getFemaleVoted, getFemalewithDrama, popularDramaFemale } from "../controllers/Female_controller.js";
import { veriftJWT } from "../middlewares/auth_middlewear.js";


const router = Router()


router.route("/add").post(addFemaleActor)
router.route("/popular").get(popularDramaFemale)
router.route("/get").get(getFemalewithDrama)
router.route("/getVoted/:_id").post(veriftJWT,getFemaleVoted)

export default router
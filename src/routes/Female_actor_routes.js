import { Router } from "express";
import { addFemaleActor, getFemalewithDrama, popularDramaFemale } from "../controllers/Female_controller.js";


const router = Router()


router.route("/add").post(addFemaleActor)
router.route("/popular").get(popularDramaFemale)
router.route("/get").get(getFemalewithDrama)

export default router
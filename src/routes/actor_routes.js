import { Router } from "express";
import { addActor, addingPopulardarams, getActor } from "../controllers/actor_controller.js";



const router = Router()


router.route("/add").post(addActor)
router.route("/get").get(getActor)
router.route("/popular").get(addingPopulardarams)

export default router
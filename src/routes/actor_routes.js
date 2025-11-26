import { Router } from "express";
import { addActor, getActor } from "../controllers/actor_controller.js";



const router = Router()


router.route("/add").post(addActor)
router.route("/get").get(getActor)

export default router
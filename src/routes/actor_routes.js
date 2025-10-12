import { Router } from "express";
import { addActor } from "../controllers/actor_controller.js";



const router = Router()


router.route("/add").get(addActor)

export default router
import { Router } from "express";
import { addFemaleActor } from "../controllers/Female_controller.js";


const router = Router()


router.route("/add").get(addFemaleActor)

export default router
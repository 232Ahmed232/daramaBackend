import { Router } from "express";
import { addFemaleActor } from "../controllers/Female_controller.js";


const router = Router()


router.route("/add").post(addFemaleActor)

export default router
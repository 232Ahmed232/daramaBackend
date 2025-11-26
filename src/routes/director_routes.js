import { Router } from "express";
import { addDirector } from "../controllers/director_controller.js";


const router = Router()


router.route("/add").post(addDirector)

export default router
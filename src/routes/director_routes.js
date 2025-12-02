import { Router } from "express";
import { addDirector, getDirector, getDirectorVoted, popularDramaDirector } from "../controllers/director_controller.js";


const router = Router()


router.route("/add").post(addDirector)
router.route("/popular").get(popularDramaDirector)
router.route("/get").get(getDirector)
router.route("/getvoted").post(getDirectorVoted)


export default router
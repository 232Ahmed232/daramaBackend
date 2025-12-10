import { Router } from "express";
import { addDirector, getDirector, getDirectorVoted, popularDramaDirector } from "../controllers/director_controller.js";
import { veriftJWT } from "../middlewares/auth_middlewear.js";


const router = Router()


router.route("/add").post(addDirector)
router.route("/popular").get(popularDramaDirector)
router.route("/get").get(getDirector)
router.route("/getVoted/:_id").post(veriftJWT,getDirectorVoted)


export default router
import { Router } from "express";
import { addActor, addChar, addingPopulardarams, getActor, getActorVoted } from "../controllers/actor_controller.js";
import { veriftJWT } from "../middlewares/auth_middlewear.js";



const router = Router()


router.route("/add").post(addActor)
router.route("/addchar").post(addChar)
router.route("/get").get(getActor)
router.route("/popular").get(addingPopulardarams)
router.route("/getvoted/:_id").post(veriftJWT,getActorVoted)

export default router
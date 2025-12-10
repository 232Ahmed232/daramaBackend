import { Router } from "express";
import { addWriter, getWritersVoted, popularDramaswithWriter } from "../controllers/writer_controller.js";
import { getWritersWithDramas } from "../db/Db_aggregation.js";
import { veriftJWT } from "../middlewares/auth_middlewear.js";


const router = Router()


router.route("/add").post(addWriter)
router.route("/popular").post(popularDramaswithWriter)
router.route("/get").post(getWritersWithDramas)
router.route("/getVoted/:_id").post(veriftJWT,getWritersVoted)

export default router
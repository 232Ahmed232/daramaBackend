import { Router } from "express";
import { addWriter, popularDramaswithWriter } from "../controllers/writer_controller.js";
import { getWritersWithDramas } from "../db/Db_aggregation.js";


const router = Router()


router.route("/add").post(addWriter)
router.route("/popular").post(popularDramaswithWriter)
router.route("/get").post(getWritersWithDramas)

export default router
import { Router } from "express";
import { addDarama, ratedDaramas } from "../controllers/darama_controller.js";


const router = Router()

router.route("/add").get(addDarama)
router.route("/rated").get(ratedDaramas)


export default router
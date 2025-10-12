import { Router } from "express";
import { addDarama } from "../controllers/darama_controller.js";


const router = Router()

router.route("/add").get(addDarama)

export default router
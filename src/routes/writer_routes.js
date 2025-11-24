import { Router } from "express";
import { addWriter } from "../controllers/writer_controller.js";


const router = Router()


router.route("/add").get(addWriter)

export default router
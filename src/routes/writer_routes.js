import { Router } from "express";
import { addWriter } from "../controllers/writer_controller.js";


const router = Router()


router.route("/add").post(addWriter)

export default router
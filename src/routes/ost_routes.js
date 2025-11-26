import { Router } from "express";
import { addOST } from "../controllers/ost_controller.js";

const router = Router()


router.route("/add").post(addOST)

export default router
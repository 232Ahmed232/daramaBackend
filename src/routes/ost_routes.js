import { Router } from "express";
import { addOST } from "../controllers/ost_controller.js";

const router = Router()


router.route("/add").get(addOST)

export default router
import { Router } from "express";
import { addOST, getOstVoted } from "../controllers/ost_controller.js";
import { veriftJWT } from "../middlewares/auth_middlewear.js";

const router = Router()


router.route("/add").post(addOST)
router.route("/getVoted/:_id").post(veriftJWT,getOstVoted)

export default router
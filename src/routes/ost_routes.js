import { Router } from "express";
import { addOST, getOstVoted } from "../controllers/ost_controller.js";

const router = Router()


router.route("/add").post(addOST)
router.route("getVoted").post(getOstVoted)

export default router
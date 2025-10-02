import { Router } from "express";
import { registerUser } from "../controllers/user_controller.js";
import { upload } from "../middlewares/multer_middlewear.js";

const router = Router()


router.route("/register").post(registerUser)

export default router;
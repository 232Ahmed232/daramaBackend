import { Router } from "express";
import { loginUser, logOut, refreshTokenAccess, registerUser } from "../controllers/user_controller.js";
import { upload } from "../middlewares/multer_middlewear.js";
import { veriftJWT } from "../middlewares/auth_middlewear.js";

const router = Router()


router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser)

router.route("/logout").post(veriftJWT ,logOut)

router.route("/refresh-Token").post(refreshTokenAccess)

export default router;
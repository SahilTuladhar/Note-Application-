import { Router } from "express";
import { getUserRecords, loginUser, logoutUser, refreshToken, registerUser } from "../controllers/users.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const userRouter = Router()

userRouter.post("/register" , registerUser)
userRouter.post("/login-user" , loginUser)
userRouter.post("/logout-user" , logoutUser)
userRouter.get("/home-page" , verifyJWT , getUserRecords )
userRouter.post("/refresh-token" , refreshToken)


export default userRouter
import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/users.controller.js";

const userRouter = Router()

userRouter.post("/register" , registerUser)
userRouter.post("/login-user" , loginUser)
userRouter.post("/logout-user" , logoutUser)

export default userRouter
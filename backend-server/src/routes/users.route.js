import { Router } from "express";
import { loginUser, registerUser } from "../controllers/users.controller.js";

const userRouter = Router()

userRouter.post("/register" , registerUser)
userRouter.post("/login-user" , loginUser)

export default userRouter
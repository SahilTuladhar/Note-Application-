import { Router } from "express";
import { registerUser } from "../controllers/users.controller.js";

const userRouter = Router()

userRouter.post("/register" , registerUser)

export default userRouter
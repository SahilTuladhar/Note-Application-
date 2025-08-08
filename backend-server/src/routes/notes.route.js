import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { createNote } from "../controllers/notes.controller.js";

const noteRouter = Router()

noteRouter.post("/create-note" , verifyJWT , createNote)


export default noteRouter
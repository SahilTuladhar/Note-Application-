import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { completeNote, createNote, incompleteNote } from "../controllers/notes.controller.js";

const noteRouter = Router()

noteRouter.post("/create-note" , verifyJWT , createNote)
noteRouter.patch('/complete-note' , completeNote)
noteRouter.patch('/incomplete-note' , incompleteNote)

export default noteRouter
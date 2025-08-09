import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { completeNote, createNote, incompleteNote , deleteNote } from "../controllers/notes.controller.js";
import { deleteNoteQuery } from "../models/notes.model.js";

const noteRouter = Router()

noteRouter.post("/create-note" , verifyJWT , createNote)
noteRouter.patch('/complete-note' , completeNote)
noteRouter.patch('/incomplete-note' , incompleteNote)
noteRouter.delete("/delete-note", deleteNote)

export default noteRouter
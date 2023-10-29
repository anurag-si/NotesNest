import express from "express"
import { addNote } from "../Controllers/Notes/AddNote"
import { updateNote } from "../Controllers/Notes/UpdateNote"
import { readNote } from "../Controllers/Notes/ReadNote"
import { deleteNote } from "../Controllers/Notes/DeleteNote"
import { verifyToken } from "../Utilities/jwtToken"

const notesRouter = express.Router()

notesRouter.get("/get",verifyToken, readNote)
notesRouter.post("/addNote",verifyToken, addNote)
// notesRouter.post("/update", updateNote)
notesRouter.delete("/delete", deleteNote)

export default notesRouter;

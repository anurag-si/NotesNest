import express from "express";
import { addNote } from "../Controllers/Notes/AddNote";
import { updateNote } from "../Controllers/Notes/UpdateNote";
import { readNote } from "../Controllers/Notes/ReadNote";
import { deleteNote } from "../Controllers/Notes/DeleteNote";
import TokenUtils from "Utilities/tokenUtils";

const notesRouter = express.Router();

notesRouter.get("/get", TokenUtils.verifyToken, readNote);
notesRouter.post("/addnote", TokenUtils.verifyToken, addNote);
notesRouter.post("/update", updateNote);
notesRouter.delete("/delete", TokenUtils.verifyToken, deleteNote);

export default notesRouter;

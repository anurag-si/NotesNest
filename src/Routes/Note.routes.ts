const express = require("express");
import { createNote, updateNote, fetchNotes, deleteNote } from "../Controllers/Notes/notes";
import TokenUtils from "../Utilities/tokenUtils";
const noteRoutes = express.Router();

noteRoutes.post("/create/:id", TokenUtils.verifyToken, createNote);
noteRoutes.put("/update/:id", TokenUtils.verifyToken, updateNote);
noteRoutes.get("/fetch/:id", TokenUtils.verifyToken, fetchNotes);
noteRoutes.delete("/delete/:id", TokenUtils.verifyToken, deleteNote);

export default noteRoutes;

import { Request, Response } from "express";
import TokenUtils from "../../Utilities/tokenUtils";
import Notes from "../../Models/Notes";

export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const labelId = req.params.id;

    if (!title) {
      return res.status(404).send("Missing required fields: note title");
    }

    if (!labelId) {
      return res
        .status(404)
        .send("Please provide label id for respective note");
    }

    let label;
    try {
      const labelResponse = await TokenUtils.getLabel(labelId);
      label = labelResponse;
    } catch (error) {
      return res.status(400).send("Could not find Label " + error);
    }

    const date = new Date();

    const newNote = new Notes({
      title: title,
      content: content,
      date_of_creation: date.getTime(),
      date_of_updation: date.getTime(),
    });

    await newNote.save();

    console.log("[INSERTED NOTE]");

    if (!label) {
      return res.status(400).send("Label Id Not found");
    }

    if (label.notes.length === 0) {
      label.notes = newNote._id;
    } else {
      label.notes.push(newNote._id);
    }

    await label.save();

    return res.status(201).send("Note Created Successfully");
  } catch (error) {
    console.error("Error in creating Note");
    return res.status(400).send("Could not create Note please try again");
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const noteId = req.params.id;

    if (!noteId) {
      return res
        .status(400)
        .send("Please provide note id for the note to update");
    }

    let note;
    try {
      note = await Notes.findById(noteId);
      if (!note) {
        return res.status(404).send("Note not found");
      }
    } catch (error) {
      console.error("Error finding note:", error);
      return res.status(500).send("Internal Server Error");
    }

    note.title = title;
    note.content = content;
    note.date_of_updation = new Date().getTime();

    await note.save();

    console.log("[UPDATED NOTE]");

    return res.status(200).send("Note Updated Successfully");
  } catch (error) {
    console.error("Error in updating Note:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const fetchNotes = async (req: Request, res: Response) => {
  try {
    const labelId = req.params.id;

    if (!labelId) {
      return res.status(400).send("Please provide label id");
    }

    let label;
    try {
      label = await TokenUtils.getLabel(labelId);
      if (!label) {
        return res.status(404).send("Label not found");
      }
    } catch (error) {
      console.error("Error finding label:", error);
      return res.status(500).send("Internal Server Error");
    }

    let notes;
    try {
      notes = await Notes.find({ _id: { $in: label.notes } });
    } catch (error) {
      console.error("Error finding notes:", error);
      return res.status(500).send("Internal Server Error");
    }

    return res.status(200).json(notes);
  } catch (error) {
    console.error("Error in fetching notes:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const noteId = req.params.id;

    if (!noteId) {
      return res.status(400).send("Please provide note id to delete");
    }

    let note;
    try {
      note = await Notes.findById(noteId);
      if (!note) {
        return res.status(404).send("Note not found");
      }
    } catch (error) {
      console.error("Error finding note:", error);
      return res.status(500).send("Internal Server Error");
    }

    await note.deleteOne();

    console.log("[DELETED NOTE]");

    return res.status(200).send("Note Deleted Successfully");
  } catch (error) {
    console.error("Error in deleting Note:", error);
    return res.status(500).send("Internal Server Error");
  }
};

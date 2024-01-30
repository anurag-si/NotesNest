import express, { Request, Response } from "express";
import User from "../../Models/User";
import { Utils } from "Utilities/utils";

interface UpdateNoteRequestBody {
  noteId: string;
  updatedLabel: string;
}

export const updateNote = async (req: any, res: any) => {
  const { noteId, updatedLabel } = req.body;
  const userId = await req.cookies.username;

  try {
    const existingUser = await findUser(userId);

    if (existingUser) {
      const noteIndex = existingUser.label.findIndex(
        (note) => note?._id?.toString() === noteId
      );

      if (noteIndex !== -1) {
        existingUser.label[noteIndex] = updatedLabel;
        await existingUser.save();
        res.status(200).json({ message: "Note updated successfully." });
      } else {
        res.status(404).json({ message: "Note not found" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error("Error updating note:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

async function findUser(userId: string) {
  if (Utils.validateEmail(userId)) {
    return await User.findOne({ email: userId });
  } else {
    return await User.findOne({ username: userId });
  }
}

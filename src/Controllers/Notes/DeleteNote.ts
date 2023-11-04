import express from "express";
import User from "../../Models/User";

export const deleteNote = async (req: any, res: any) => {
  const index = req.body;
  const username = await req.cookies.username;

  try {
    const existingUser = await User.findOne({ username });

    const id = existingUser?.username;
    if (id) {
      User.updateOne({
        $pop: { notes: 1 },
      });
      res.status(200).json({ message: "Note Deleted successfully." });
    } else {
      res.status(200).json({ message: "User not found" });
    }
  } catch (err: any) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

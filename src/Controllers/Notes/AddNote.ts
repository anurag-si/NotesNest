import express from "express";
import User from "../../Models/User";

export const addNote = async (req: any, res: any, next: any) => {
  const { note } = req.body;
  const username = await req.cookies.username;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      existingUser.notes.push({ note });
      await existingUser.save();
      res.status(200).json({ message: "Note added successfully." });
    } else {
      res.status(200).json({ message: "User not found" });
    }
  } catch (err: any) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

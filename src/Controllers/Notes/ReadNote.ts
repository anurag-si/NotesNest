import express from "express";
import User from "../../Models/User";

export const readNote = async (req: any, res: any) => {
  const username = await req.cookies.username;

  try {
    const existingUser = await User.findOne({ username });
    
    if (existingUser) {
      const notes = existingUser.notes;
      res.status(200).json({ message: "Notes", notes });
    } else {
      res.status(200).json({ message: "User not found" });
    }
  } catch (err: any) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

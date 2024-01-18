import express, { Request, Response } from "express";
import User from "../../Models/User";

export const readNote = async (req: any, res: any) => {
  const username = await req.cookies.username;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      const notes = existingUser.label;
      res.status(200).json({ message: "Notes retrieved successfully", notes });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error("Error reading notes:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

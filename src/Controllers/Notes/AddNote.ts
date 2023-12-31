import express from "express";
import User from "../../Models/User";
import { ValidateEmail } from "../../Utilities/regex";

export const addNote = async (req: any, res: any, next: any) => {
  const { label } = req.body;
  const userId = await req.cookies.username;

  try {
    let existingUser;
    if (ValidateEmail(userId)) {
      existingUser = await User.findOne({ email: userId });
    } else {
      existingUser = await User.findOne({ username: userId });
    }
    if (existingUser) {
      existingUser.label.push(label);
      await existingUser.save();
      res.status(200).json({ message: "Note added successfully." });
    } else {
      res.status(200).json({ message: "User not found" });
    }
  } catch (err: any) {
    res.status(500).send({
      message: err,
    });
  }
};

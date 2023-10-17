import express from "express";
import User from "../Models/User";
import bcrypt from "bcrypt";
// import user from "../Interface/LoginSignup.interface";

export const signUp = async (req: any, res: any, next: any) => {
  const { username, email, password, notes } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User Already Exists!" });
  }

  const newUser = new User({
    username,
    email,
    hashedPassword,
  });

  newUser.save();
};
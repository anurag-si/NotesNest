import express from "express";
import User from "../Models/User";
import bcrypt from "bcrypt";
import UserInterface from "../Interfaces/LoginSignup.interface";

export const signUp = async (req: UserInterface, res: any, next: any) => {
  const { username, email, password } = req.body;
  //verify if username or email exists
  const existingEmail = await User.findOne({ email });
  const existingUsername = await User.findOne({ username });
  if (existingEmail) {
    return res.status(400).json({ message: "Email Already Exists!" });
  }
  if (existingUsername) {
    return res.status(400).json({ message: "Username Already Exists!" });
  }

  //hash the password
  async function hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  //create new user
  hashPassword(password)
    .then((hashedPassword: any) => {
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      newUser
        .save()
        .then((result) => {
          res.status(201).send({
            message: "Registration Successful",
            result,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "User not created",
            error,
          });
        });
    })
    .catch((error: any) => {
      res.status(500).send({
        message: "Password not hashed",
        error,
      });
    });
};

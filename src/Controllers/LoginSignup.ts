import express from "express";
import User from "../Models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserInterface from "../Interfaces/LoginSignup.interface";
import { createToken, storeToken } from "../Utilities/jwtToken";

export const signUp = async (
  req: UserInterface,
  res: any,
  next: any
): Promise<void> => {
  const { username, email, password } = req.body;

  const existingEmail = await User.findOne({ email });
  const existingUsername = await User.findOne({ username });
  if (existingEmail) {
    return res.status(400).json({ message: "Email Already Exists!" });
  }
  if (existingUsername) {
    return res.status(400).json({ message: "Username Already Exists!" });
  }

  async function hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

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
          storeToken(email, res);
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

export const login = async (req: UserInterface, res: any, next: any):Promise<void> => {
  const { username, email, password } = req.body;
  const existingEmail = await User.findOne({ email });
  const existingUsername = await User.findOne({ username });

  if (!existingEmail || !existingUsername) {
    return res.status(400).json({ message: "Email or Username not found" });
  }
  storeToken(email,res)
  return res.status(200).json({ message: "Login Success" });
};
